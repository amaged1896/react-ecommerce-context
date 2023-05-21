import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext(0);

export default function CartContextProvider(props) {
    // https://route-ecommerce-app.vercel.app/
    const [isLoading, setIsLoading] = useState(true);

    let vercel = `https://route-ecommerce-app.vercel.app`;
    let render = `https://route-ecommerce.onrender.com`;

    let headers = { token: localStorage.getItem('token') };

    async function createCart(productId) {
        return await axios.post(`https://route-ecommerce.onrender.com/api/v1/cart`, {
            productId
        },
            {
                headers: {
                    token: localStorage.getItem('token'),
                }
            }
        ).then(res => res).catch(err => err);
    }

    async function getCart() {
        return await axios.get(`${render}/api/v1/cart`, {
            headers: { token: localStorage.getItem('token') }
        }
        ).then(res => res).catch(err => err);
    }

    async function updateCart(id, count) {

        return await axios.put(`${render}/api/v1/cart/${id}`, { count },
            {
                headers,
            }
        ).then(res => res).catch(err => err);

    }

    async function removeCartItem(id) {
        return await axios.delete(`${render}/api/v1/cart/${id}`,
            {
                headers,
            }
        ).then(res => res).catch(err => err);
    }

    const [cart, setCart] = useState(0);

    return <CartContext.Provider value={{ cart, getCart, removeCartItem, updateCart, createCart, isLoading, setIsLoading }}>
        {props.children}
    </CartContext.Provider>;
}