import React, { useEffect, useState } from 'react';
import styles from './Categories.module.css';
import Slider from "react-slick";
import axios from 'axios';
import Loading from '../Loading/Loading';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function getCategories() {
        let { data } = await axios.get('https://route-ecommerce.onrender.com/api/v1/categories');
        setCategories(data.data);
        console.log(data.data);
        setIsLoading(false);
    }

    useEffect(() => {
        getCategories();

    }, []);
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true
    };
    return (

        <>
            {isLoading ? <Loading /> :
                <>
                    <Slider {...settings}>
                        {categories.map((category) => <div key={category._id}>
                            <img height={300} width={'100%'} src={category.image} alt="" />
                            <h3 className='h6 text-center'>{category.name}</h3>
                        </div>)}
                    </Slider>
                </>
            }

        </>

    );
}
