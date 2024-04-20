import Msg from '@/components/Msg'
import AddToCart from '@/components/products/AddToCart'
import data from '@/lib/data/data'
import Image from 'next/image'
import Link from 'next/link'

const ProductDetails = ({ params, }: { params: { slug: string } }) => {
    const product = data.products.find((x) => x.slug === params.slug)
    return (


        !product
            ? (<Msg color="crimson">Product Not Found!</Msg>)
            : (
                <>
                    <div className='my-2'>
                        <Link href='/'>⬅️ Back</Link>
                    </div>
                    <div className='grid md:grid-cols-4 md:gap-3 mb-4 '>
                        <div className='md:col-span-2'>
                            <Image src={product.image} alt={product.name}
                                width={640} height={640} sizes="100vw" priority
                                style={{ width: '100%', height: 'auto' }} />
                        </div>
                        <div>
                            <ul className='space-y-4'>
                                <li>
                                    <h1 className='text-xl'>{product.name}</h1>
                                </li>
                                <li>
                                    {product.brand}
                                </li>
                                <li>
                                    rating: {product.rating} ({product.numOfReviews})
                                </li>
                                <li>
                                    <div className='divider'></div>
                                </li>
                                <li>
                                    Description: <p>{product.desc}</p>
                                </li>
                            </ul>
                        </div>
                        <div className='card bg-base-300 shadow-xl mt-3  md:mt-0'>
                            <div className='card-body'>
                                <div className='mb-2 flex justify-between'>
                                    <div>Price:</div>
                                    <div>${product.price}</div>
                                </div>

                            <div className='mb-2 flex justify-between'>
                                <div>Status:</div>
                                <div>
                                        {product.countInStock > 0 ? `${product.countInStock} In Stock` : 'Out of Stock'}
                                </div>
                                </div>
                             
                                {product.countInStock > 0
                                    ? (<div className='card-actions justify-center'>
                                        <AddToCart item={{...product, qty:0, color:'', size:''} } />
                                    </div>) 
                                    :(<button className='btn ' disabled>Out of Stock</button>)
                                }
                                
                            </div>

                        </div>
                    </div>
                </>
            )
    )
}


export default ProductDetails