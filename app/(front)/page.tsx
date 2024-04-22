/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import ProductItem from "@/components/products/ProductItem";
import productService from "@/lib/services/productService";
import { convertDocToObj } from "@/lib/utils/utils";

export default async function Home() {

  const featuredProducts = await productService.getFeatured();
  const latestProducts = await productService.getLatest();

  return (
    <>

      <section className='w-full carousel rounded-box mt-4 h-[50vh]'>
        {featuredProducts.map((product, i) => (
          <div key={product._id} id={`slide${i}`}
            style={{ backgroundImage: `url(${product.banner})` }}
            className='carousel-item relative w-full bg-cover  overflow-y-hidden	'>
            <Link href={`/product/${product.slug}`} className='w-full'>
              <div className='w-full h-full'>.</div>
            </Link>

            <div className=' absolute flex justify-between transform-translate-y-1/2 left-5 right-5 top-[42%]'>
              <a href={`#slide${i === 0 ? featuredProducts.length - 1 : i - 1}`}
                className='btn btn-circle text-pink-600'>
                ❮
              </a>
              <a href={`#slide${i === featuredProducts.length - 1?0 : i + 1}`}
                className='btn btn-circle text-pink-600'>
                ❯
              </a>
            </div>
          </div>
        ))}

      </section>
      <h2 className='text-2xl py-2'>Latest Products</h2>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {
          latestProducts.map((product) => (
            <ProductItem key={product.slug} product={convertDocToObj(product)} />
          ))
        }
      </div>
    </>
  );
}
