import React, { useState } from 'react';
import styles from './Login.module.css';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login({ saveUser }) {
    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function login(values) {
        console.log(values);
        setIsLoading(true);
        setError(null);
        let { data } = await axios.post('https://route-ecommerce-app.vercel.app/api/v1/auth/signin', values).catch((error) => {
            // error
            setError(error.response.data.message);
            setIsLoading(false);
            console.log(data);
        });

        if (data.message === 'success') {
            console.log(data);
            // navigate to login page
            setIsLoading(false);
            localStorage.setItem('token', data.token);

            saveUser();
            navigate('/');
        }
    }

    // input validation
    function validate(values) {
        let errors = {};
        // email
        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        // password
        if (!values.password) {
            errors.password = 'Required';
        } else if (!/^[A-Z][a-z0-9]{3,8}$/i.test(values.password)) {
            errors.password = 'Password must start with a capital letter';
        } else if (values.password.length < 3) {
            errors.password = 'Password must be at least 8 characters';
        }
        return errors;
    }

    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        }, validate,
        onSubmit: (values) => login(values)
    });

    return (
        <>
            <div className="container my-5">
                <h3>login Now :</h3>
                {error ? <div className='alert alert-danger'>{error}</div> : ""}
                <form className='mx-auto' onSubmit={formik.handleSubmit}>

                    <label htmlFor="email">Email</label>
                    <input type="email" className='form-control mb-2' name='email' id='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ""}

                    <label htmlFor="password">Password</label>
                    <input type="password" className='form-control mb-2' name='password' id='password' value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : ""}

                    {isLoading ? <button className='btn bg-main text-white'> <i className='fa fa-spin fa-spinner px-2'></i> </button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'> {isLoading ? <i className='fa fa-spin fa-spinner'></i> : 'Login'} </button>}                </form >
            </div >
        </>
    );
}
