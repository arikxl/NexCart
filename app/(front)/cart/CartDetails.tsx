'use client'

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import useCartService from "@/lib/hooks/useCartStore";

export default function CartDetails() {
    const router = useRouter();
    const { items, itemsPrice, decrease, increase, itemsPriceBeforeTax } = useCartService();

    const [mount, setMount] = useState(false);
    useEffect(() => {
        setMount(true)
    }, [])
    if (!mount) return <></>;

    return <>
        <div className='my-2'>
            <Link href='/'>⬅️ Back</Link>
        </div>
        <h1 className='text-pink-500 py-4 text-2xl'>Shopping Cart</h1>
        {
            items.length < 1
                ? (<div>
                    Your cart is empty. &nbsp;
                    <Link href='/' className="text-pink-500 underline">Go Shopping.</Link>
                </div>)
                : (<div className='grid md:grid-cols-4 md:gap-5'>
                    
                    <div className='overflow-x-auto md:col-span-3'>
                        <table className='table'>
                            <thead className='border-b-2 border-pink-500'>
                                <tr>
                                    <th>Item</th>
                                    <th >Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((i) => (
                                    <tr key={i.slug} className='hover:bg-pink-100'>
                                        <td>
                                            <Link href={`/product/${i.slug}`} className='flex items-center'>
                                                <Image src={i.image} alt={i.name} width={50} height={50} />
                                                <span className='px-2'>{i.name} (${i.price})</span>
                                            </Link>
                                        </td>

                                        <td >
                                            <button className='btn'  onClick={() => decrease(i)}>-</button>
                                            <span className='px-2'>{i.qty}</span>
                                            <button className='btn' disabled={i.qty >= i.countInStock}
                                                onClick={() => increase(i)}>+</button>
                                        </td>
                                        <td>${i.price * i.qty}</td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                    </div>
                    <section>
                        <div className='card bg-base-300'>
                            <div className='card-body'>
                                <ul>
                                    <li>
                                        <div className='pb-3 text-lg'>
                                            Subtotal ({items.reduce((a, c) => a + c.qty, 0)} items): ${itemsPriceBeforeTax}
                                        </div>
                                    </li>
                                    <li>
                                        <button onClick={() => router.push('/shipping')}
                                        className='btn btn-secondary w-full'>
                                            Checkout
                                        </button>
                                    </li>
                                    {/* <li>
                                        <div className='pb-3 text-lg'>
                                            Shipping: ${shippingPrice}
                                        </div>
                                    </li>
                                    <li>
                                        <div className='pb-3 text-lg'>
                                            Tax: ${taxPrice}
                                        </div>
                                    </li>
                                    <li>
                                        <div className='pb-3 text-lg font-bold'>
                                            Total: ${totalPrice}
                                        </div>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>)
        }
    </>
}

