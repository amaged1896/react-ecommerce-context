import axios from "axios";
import { createContext } from "react";
export let ProductContext = createContext(null);

export default function ProductContextProvider(props) {

    let baseUrl = `https://ecommerce.routemisr.com`;


    async function getAllProducts() {
        return await axios.get(`${baseUrl}/api/v1/products`);
    }

    return <ProductContext.Provider value={{ getAllProducts }}>
        {props.children}
    </ProductContext.Provider>;
}