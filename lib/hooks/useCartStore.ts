import { create } from "zustand";

import { round2 } from "../utils/utils";
import { OrderItem } from './../models/OrderModel';


type Cart = {
    items: OrderItem[],
    itemsPrice: number,
    taxPrice: number,
    shippingPrice: number,
    totalPrice: number,
}

const initialState: Cart = {
    items: [],
    itemsPrice: 0,
    taxPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
}


export const cartStore = create<Cart>(() => initialState);

export default function useCartService() {
    const { items, itemsPrice, taxPrice, shippingPrice, totalPrice } = cartStore();
    return {
        items, itemsPrice, taxPrice, shippingPrice, totalPrice,
        increase: (item: OrderItem) => {
            const existing = items.find((x) => x.slug === item.slug)
            const updatedCartItems = existing
                ? items.map((x) =>
                    x.slug === item.slug ? { ...existing, qty: existing.qty + 1 } : x
                )
                : [...items, { ...item, qty: 1 }]
            const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
                calcPrice(updatedCartItems)
            cartStore.setState({ 
                items: updatedCartItems,
                itemsPrice, shippingPrice, taxPrice, totalPrice
            })
        }
    }
}

const calcPrice = (items: OrderItem[]) => {
    const itemsPrice = round2(
        items.reduce((acc, item) => acc + item.price * item.qty, 0)
    ),
        shippingPrice = round2(itemsPrice > 150 ? 0 : 30),
        taxPrice = round2(Number(0.17 * itemsPrice)),
        totalPrice = round2(itemsPrice + shippingPrice + taxPrice)
    return { itemsPrice, shippingPrice, taxPrice, totalPrice }
}