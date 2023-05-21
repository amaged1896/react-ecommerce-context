import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import Loading from '../Loading/Loading';
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';

export default function ProductDetails() {
    let { createCart } = useContext(CartContext);
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    let { id } = useParams();

    async function getProduct() {
        let { data } = await axios.get(`https://route-ecommerce-app.vercel.app/api/v1/products/${id}`);
        setProduct(data.data);
        setIsLoading(false);
    }

    async function generateCart(productId) {
        let response = await createCart(productId);
        if (response?.data?.status === 'success') {
            toast.success(response.data.message, {
                position: 'top-right',
                className: "text-center border-success border-2 box-shadow"
            });
        } else if (response.message == 'error' || response.message == "Network Error") {
            toast.error('Failed to add product', {
                position: 'top-right',
                className: "text-center text-white bg-danger border-2 box-shadow"
            });
        }
    }


    useEffect(() => {
        getProduct();
    }, []);

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    return (
        <>
            <div className="container py-5">
                {isLoading ? <Loading /> : <div className="row align-items-center my-5">
                    <div className="col-md-4">
                        <Slider {...settings}>
                            {product?.images?.map((img) => <div key={product._id}>
                                <img className='w-100' src={img} alt="" />
                            </div>)}
                        </Slider>
                        {/* <img className='w-100' src={product.imageCover} alt="" /> */}
                    </div>

                    <div className="col-md-8">
                        <h1>{product.title}</h1>
                        <p>{product.description}</p>
                        <div className="d-flex justify-content-between">
                            <p>{product.price} EGP</p>
                            <div>
                                <i className='fa fa-star rating-color'></i>
                                {product.ratingsAverage}
                            </div>
                        </div>
                        <button onClick={() => { generateCart(product.id); }} className='btn bg-main text-white w-100'>+ Add</button>
                    </div>
                </div>}


            </div >
        </>
    );
}





