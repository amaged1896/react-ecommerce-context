import React from 'react';
import styles from './Home.module.css';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import Categories from '../Categories/Categories';
import MainSlider from '../MainSlider/MainSlider';

export default function Home() {
    return (
        <>
            <MainSlider />
            <Categories />
            <FeaturedProducts />
        </>
    );
}
