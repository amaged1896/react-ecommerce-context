
import React from 'react';
import styles from './MainSlider.module.css';
import Slider from "react-slick";
import slide1 from "./../../assets/images/grocery-banner.png";
import slide2 from "./../../assets/images/grocery-banner-2.jpeg";
import slide3 from "./../../assets/images/slider-2.jpeg";



export default function MainSlider() {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
    };
    return (
        <>
            <div className="mb-5">
                <Slider {...settings} >
                    <img className={`w-100 height ${styles.height}`} style={{ height: '50%' }} src={slide1} alt="" />
                    <img className={`w-100 height ${styles.height}`} style={{ height: '50%' }} src={slide2} alt="" />
                    <img className={`w-100 height ${styles.height}`} style={{ height: '50%' }} src={slide3} alt="" />
                    <img className={`w-100 height ${styles.height}`} style={{ height: '50%' }} src={slide1} alt="" />
                    <img className={`w-100 height ${styles.height}`} style={{ height: '50%' }} src={slide2} alt="" />
                    <img className={`w-100 height ${styles.height}`} style={{ height: '50%' }} src={slide3} alt="" />
                </Slider>
            </div>
        </>
    );
}
