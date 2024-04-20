'use client'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { OrderItem } from "@/lib/models/OrderModel"
import useCartService from "@/lib/hooks/useCartStore"




export default function AddToCart({ item }: { item: OrderItem }) {
    const router = useRouter();
    const { items, increase } = useCartService();
    const [existItem, setExistItem] = useState<OrderItem | undefined>();

    useEffect(() => {
        setExistItem(items.find((x) => x.slug === item.slug))
    }, [items, item]);

    const addToCartHandler = () => {
        increase(item)
    }

    return (
        existItem
            ? (
                <div>
                    <button className='btn'>-</button>
                    <span className='px-4'>{existItem.qty}</span>
                    <button className='btn' onClick={() => increase(existItem)}>+</button>
                </div>
            )
            : (
                <button className='btn btn-secondary w-full' onClick={addToCartHandler}>
                    Add to Cart
                </button>
            )
    )
}