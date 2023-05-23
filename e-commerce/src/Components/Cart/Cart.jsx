import React, { useContext, useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { CartContext } from '../../Context/CartContext';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

export default function Cart() {
    const [cartDetails, setCartDetails] = useState({});
    const [isCartDetailsLoaded, setIsCartDetailsLoaded] = useState(false);
    let { updateCart, removeCartItem, getCart, isLoading, setIsLoading, setNumOfCartItems } = useContext(CartContext);

    async function getCartDetails() {
        let response = await getCart();
        setCartDetails(response.data);
        setIsCartDetailsLoaded(true);
        setIsLoading(false);
    }

    async function updateCartHandler(id, count) {
        if (count == 0) {
            setIsLoading(true);
            await removeCartItem(id);
            setIsLoading(false);
        }
        let response = await updateCart(id, count);
        setCartDetails(response.data);
        setNumOfCartItems(response.data.numOfCartItems);
        setIsLoading(false);
    }

    async function removeItemHandler(id) {
        let response = await removeCartItem(id);
        setCartDetails(response.data);
        setNumOfCartItems(response.data.numOfCartItems);
        setIsLoading(false);
    }

    useEffect(() => {
        getCartDetails();
        setIsLoading(false);
    }, []);

    return (
        <>
            {(isLoading || !isCartDetailsLoaded) && <Loading />}

            {isCartDetailsLoaded && cartDetails?.numOfCartItems > 0 && (
                <div className="container py-5 my-5 bg-main-light p-5">
                    <h3>Cart Details</h3>
                    <h4 className="mb-5">Total Price : {cartDetails?.data?.totalCartPrice} EGP</h4>

                    {cartDetails?.data?.products?.map((product) => (
                        <div key={product?.product?._id} className="row border-bottom border-bottom-danger p2">
                            <div className="col-md-2">
                                <img src={product?.product?.imageCover} className="w-100 rounded" alt="" />
                            </div>
                            <div className="col-md-10 col-12 d-flex justify-content-between">
                                <div>
                                    <h4 className="h6 mt-1">{product?.product?.title}</h4>
                                    <p className="text-main">{product?.price} EGP</p>
                                    <button onClick={() => removeItemHandler(product?.product?._id)} className="btn text-danger">
                                        <i className="fa fa-trash"></i> Remove
                                    </button>
                                </div>
                                <div className="d-flex align-items-center">
                                    <button className="btn btn-success text-white" onClick={() => updateCartHandler(product?.product?._id, product?.count + 1)}>
                                        +
                                    </button>
                                    <p className="mx-3 mb-0">{product?.count}</p>
                                    <button className="btn btn-info text-white" onClick={() => updateCartHandler(product?.product?._id, product?.count - 1)}>
                                        -
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className='mt-5'>
                        <button className='btn btn-warning me-2'>Clear</button>
                        <Link to='checkout' className='btn btn-success'>Proceed To Payment </Link>
                    </div>
                </div>
            )}
            {cartDetails === undefined && <div className="d-flex justify-content-center align-items-center my-5"><h1 className='my-5'>Cart Is Empty</h1> </div>}
            {isCartDetailsLoaded && cartDetails?.numOfCartItems === 0 && (
                <div className="d-flex justify-content-center align-items-center my-5">
                    <h1>Cart Is Empty</h1>
                </div>
            )}
        </>
    );
}