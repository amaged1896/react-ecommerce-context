import React from 'react';
import styles from './NotFound.module.css';
import { Link } from 'react-router-dom';
import errorImg from './../../assets/images/error.svg';
export default function NotFound() {
    return (
        <div className='my-5 text-center d-flex flex-column align-items-center justify-content-center'>
            <h1>Page Not Found</h1>
            <img src={errorImg} alt="" className='w-75' />
            <Link to="/" className={`btn btn-danger mt-5 ${styles.success}`}>Back To Home 🤔</Link>
        </div>
    );
}
