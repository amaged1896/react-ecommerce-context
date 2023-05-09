import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext(0);

export default function CartContextProvider(props) {

    let headers = { token: localStorage.getItem('token') };

    function createCart(productId) {
        return axios.post(
            'https://route-ecommerce.onrender.com/api/v1/cart',
            { productId: productId },
            {
                headers: {
                    token: localStorage.getItem('token'),
                }
            }
        ).then(res => res).catch(err => err);
    }

    function getCart() {
        return axios.get(
            'https://route-ecommerce.onrender.com/api/v1/cart',
            {
                headers,
            }
        ).then(res => res).catch(err => err);
    }

    function updateCart(id, count) {
        return axios.put(
            `https://route-ecommerce.onrender.com/api/v1/cart/${id}`, { count },
            {
                headers,
            }
        ).then(res => res).catch(err => err);
    }

    function removeCartItem(id) {
        return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`,
            {
                headers,
            }
        ).then(res => res).catch(err => err);
    }

    const [cart, setCart] = useState(0);

    return <CartContext.Provider value={{ cart, getCart, removeCartItem, updateCart, createCart }}>
        {props.children}
    </CartContext.Provider>;
}