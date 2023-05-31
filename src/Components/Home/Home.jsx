import React from 'react';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import Categories from '../Categories/Categories';
import MainSlider from '../MainSlider/MainSlider';
import { Offline } from "react-detect-offline";
import { Helmet } from 'react-helmet';

export default function Home() {
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
                {/* <link rel="favicon" type="image/svg" imageSrcSet="./../../assets/images/freshcart-logo.svg" sizes="16x16" /> */}
                {/* <img rel="icon" src='./../../assets/images/freshcart-logo.svg' /> */}
            </Helmet>
            {/* <Online>
                <span className='network-status'>Only shown when you're online</span>
            </Online> */}
            <Offline>
                <span className='network-status'>No Internet Access</span>
            </Offline>
            <MainSlider />
            <Categories />
            <FeaturedProducts />
        </>
    );
}
