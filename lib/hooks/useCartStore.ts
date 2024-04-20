import { create } from "zustand";
import { persist } from "zustand/middleware";

import { round2 } from "../utils/utils";
import { OrderItem } from './../models/OrderModel';


type Cart = {
    items: OrderItem[],
    itemsPrice: number,
    taxPrice: number,
    shippingPrice: number,
    totalPrice: number,
    itemsPriceBeforeTax:number
}

const initialState: Cart = {
    items: [],
    itemsPrice: 0,
    taxPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
    itemsPriceBeforeTax:0
}


export const cartStore = create<Cart>()(
    persist(() => initialState, {
        name: 'cartStore',
    })
);

export default function useCartService() {
    const { items, itemsPrice, taxPrice, shippingPrice, totalPrice, itemsPriceBeforeTax } = cartStore();
    return {
        items, itemsPrice, taxPrice, shippingPrice, totalPrice, itemsPriceBeforeTax,

        increase: (item: OrderItem) => {
            const existing = items.find((x) => x.slug === item.slug)
            const updatedCartItems = existing
                ? items.map((x) =>
                    x.slug === item.slug ? { ...existing, qty: existing.qty + 1 } : x
                )
                : [...items, { ...item, qty: 1 }]
            const { itemsPrice, shippingPrice, taxPrice, totalPrice, itemsPriceBeforeTax } =
                calcPrice(updatedCartItems)
            cartStore.setState({
                items: updatedCartItems,
                itemsPrice, shippingPrice, taxPrice, totalPrice, itemsPriceBeforeTax
            })
        },


decrease: (item: OrderItem) => {
    const updatedCartItems = items.map((x: OrderItem) => {
        if (x.slug === item.slug) {
            if (x.qty === 1) {
                return null; // Removing the item from the array
            } else {
                return { ...x, qty: x.qty - 1 }; // Decreasing quantity
            }
        }
        return x;
    }).filter((x: OrderItem | null) => x !== null); // Filtering out null values
    const { itemsPrice, shippingPrice, taxPrice, totalPrice, itemsPriceBeforeTax } = calcPrice(updatedCartItems);
    cartStore.setState({
        items: updatedCartItems,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        itemsPriceBeforeTax
    });
}


    }
}

const calcPrice = (items: OrderItem[]) => {
    const itemsPriceBeforeTax = round2(
        items.reduce((acc, item) => acc + item.price * item.qty, 0)
    ),
    shippingPrice = round2(itemsPriceBeforeTax > 149 ? 0 : (30-30*0.17)),
    taxPrice = round2(Number(0.17 * (itemsPriceBeforeTax+(shippingPrice>0? 30:0)))),
    itemsPrice = round2(itemsPriceBeforeTax- itemsPriceBeforeTax*0.17),
    totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

    return { itemsPrice, shippingPrice, taxPrice, totalPrice, itemsPriceBeforeTax };
};




// const calcPrice = (items: OrderItem[]) => {
//     const itemsPrice = round2(
//         items.reduce((acc, item) => acc + (item.price - item.price * 0.17) * item.qty, 0)
//     ),
//         shippingPrice = round2(itemsPrice > 150 ? 0 : 30),
//         taxPrice = round2(Number(0.17 * itemsPrice)),

//         totalPrice = round2(itemsPrice + shippingPrice + taxPrice)
//     return { itemsPrice, shippingPrice, taxPrice, totalPrice }
// }