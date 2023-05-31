import axios from "axios";
import { createContext } from "react";
export let ProductContext = createContext(null);

export default function ProductContextProvider(props) {

    let vercel = `https://route-ecommerce-app.vercel.app`;
    let render = `https://route-ecommerce.onrender.com`;


    async function getAllProducts() {
        return await axios.get('https://route-ecommerce-app.vercel.app/api/v1/products');
    }

    return <ProductContext.Provider value={{ getAllProducts }}>
        {props.children}
    </ProductContext.Provider>;
}