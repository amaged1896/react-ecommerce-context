import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext(0);

export default function CartContextProvider(props) {
    // https://route-ecommerce-app.vercel.app/
    const [isLoading, setIsLoading] = useState(true);
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [cartId, setCartId] = useState(null);

    let vercel = `https://route-ecommerce-app.vercel.app`;
    let render = `https://route-ecommerce.onrender.com`;

    let headers = { token: localStorage.getItem('token') };

    useEffect(() => {
        getInitialValues();
    }, [numOfCartItems]);

    async function getInitialValues() {
        let { data } = await getCart();
        if (data.status == "success") {
            setNumOfCartItems(data.numOfCartItems);
            setCartId(data.data._id);
        }
        console.log(data.numOfCartItems, data.data._id, "from context");
    }

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

    async function generateOnlinePayment(cartId, shippingAddress) {
        return await axios.post(`${render}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
            { shippingAddress: shippingAddress },
            {
                headers,
            }
        ).then(res => res).catch(err => err);
    }

    return <CartContext.Provider value={{ cartId, setCartId, numOfCartItems, setNumOfCartItems, getCart, removeCartItem, updateCart, createCart, generateOnlinePayment, isLoading, setIsLoading }}>
        {props.children}
    </CartContext.Provider>;
}