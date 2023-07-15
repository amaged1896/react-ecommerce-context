import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import Loading from '../Loading/Loading';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function getCategories() {
        let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        setCategories(data.data);
        setIsLoading(false);
    }

    useEffect(() => {
        getCategories();

    }, []);
    let settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true
    };
    return (

        <>
            {isLoading ? <Loading /> :
                <>
                    <Slider {...settings} className='border-none'>
                        {categories.map((category) => <div className='col-4' key={category._id}>
                            <img height={300} width={'100%'} src={category.image} alt="" />
                            <h3 className='h6 text-center'>{category.name}</h3>
                        </div>)}
                    </Slider>
                </>
            }

        </>

    );
}
