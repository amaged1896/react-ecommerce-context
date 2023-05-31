import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { ProductContext } from '../../Context/ProductContext';

export default function FeaturedProducts() {
    const [products, setProducts] = useState([]);

    let { isLoading, setIsLoading, createCart, setNumOfCartItems } = useContext(CartContext);
    let { getAllProducts } = useContext(ProductContext);

    async function getProducts() {
        let { data } = await getAllProducts();
        console.log(data.data);
        setProducts(data.data);
        setIsLoading(false);
    }

    async function generateCart(productId) {

        let response = await createCart(productId);
        console.log(response, 'from featured component');

        if (response.message == 'error' || response.message == "Network Error") {
            toast.error('Failed to add product', {
                position: 'top-right',
                className: "text-center text-white bg-danger border-2 box-shadow"
            });
        } else if (response.data.status === 'success') {
            toast.success(response.data.message, {
                position: 'top-right',
                className: "text-center border-success border-2 box-shadow"
            });
            setNumOfCartItems(response.data.numOfCartItems);
        }
    }

    useEffect(() => {
        getProducts();

    }, []);
    return (
        <>
            <div className="container py-5">
                <div className="row">
                    {isLoading ? <Loading /> : <>
                        {products.map((product) => (
                            <div className=' col-6 col-md-2 ' key={product.id}>

                                <div className="product px-2 py-3">
                                    <Link to={`/product-details/${product.id}`}>
                                        <img loading='lazy' className='w-100' src={product.imageCover} alt="" />
                                        <p className='text-main'>{product.category.name}</p>
                                        <h3 className='h6'>{product.title.split(' ').splice(0, 2).join(' ')}</h3>
                                        <div className="d-flex justify-content-between">
                                            {product.priceAfterDiscount ? <p><s className='text-warning'>{product.price} EGP</s> <br /> {product.priceAfterDiscount} EGP</p> : <p>{product.price} EGP</p>}
                                            <div>
                                                <i className='fa fa-star rating-color'></i>
                                                {product.ratingsAverage}
                                            </div>
                                        </div>
                                    </Link>
                                    <button onClick={() => generateCart(product._id)} className='btn bg-main text-white w-100'>+ Add</button>
                                </div>
                            </div>))}
                    </>}
                </div>
            </div >
        </>
    );
}
