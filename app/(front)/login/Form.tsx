'use client'

import { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';


type Inputs = {
    email: string,
    password: string
}


const Form = () => {
    const { data: session } = useSession();
    const params = useSearchParams();

    let callbackUrl = params.get('callbackUrl') || '/';
    const router = useRouter();


    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }, } = useForm<Inputs>({
            defaultValues: {
                email: '',
                password: ''
            }
        })

    useEffect(() => {
        if (session && session.user) {
            router.push(callbackUrl)
        }
    }, [callbackUrl, session, router, params])


    const formSubmit: SubmitHandler<Inputs> = async (form) => {
        const { email, password } = form;
        signIn('credentials', {
            email, password
        })
    }

    return (
        <section className='max-w-sm mx-auto card bg-base-300 my-4'>
            <div className='card-body'>
                <h1 className='card-title underline text-pink-500'>Login</h1>
                {params.get('error') && (
                    <div className='alert text-error'>
                        {params.get('error') === 'CredentialsSignin'
                            ? 'Invalid email or password'
                            : params.get('error')
                        }
                    </div>
                )}
                {params.get('success') && (
                    <div className='alert text-success'>{params.get('success')}</div>
                )}
                <form onSubmit={handleSubmit(formSubmit)}>
                    <div className=' my-2'>
                        <label className='label' htmlFor='email'>Email:</label>
                        <input id='email' type='email' className='input input-bordered w-full max-w-sm'
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                    message: 'Email is invalid'
                                }
                            })}
                        />
                        {errors.email?.message && (
                            <div className='text-error mt-2'>{errors.email.message}</div>
                        )}
                    </div>

                    <div className=' my-2'>
                        <label className='label' htmlFor='password'>Password:</label>
                        <input id='password' type='password' className='input input-bordered w-full max-w-sm'
                            {...register('password', {
                                required: 'Password is required',
                            })}
                        />
                        {errors.password?.message && (
                            <div className='text-error mt-2'>{errors.password.message}</div>
                        )}
                    </div>

                    <div className='my-4'>
                        <button className='btn btn-secondary w-full'
                            type='submit' disabled={isSubmitting}>
                            {isSubmitting && (
                                <span className='loading loading-spinner'></span>
                            )}
                            Login
                        </button>
                    </div>
                </form>

                <div>
                    Need an account? &nbsp;
                    <Link className="link text-pink-500" href={`/register?callbackUrl=${callbackUrl}`}>
                        Register
                    </Link>
                </div>

            </div>
        </section>
    )
}

export default Form