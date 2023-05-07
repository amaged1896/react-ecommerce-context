import React from 'react';
import styles from './Register.module.css';
import { Formik, useFormik } from 'formik';

export default function Register() {

    function register(values) {
        console.log(values);
    }
    // input validation
    function validate(values) {
        let errors = {};
        // name
        if (!values.name) {
            errors.name = 'Required';
        } else if (values.name.length < 3) {
            errors.name = 'Must be at least 3 characters';
        }
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
        // rePassword
        if (!values.rePassword) {
            errors.rePassword = 'Required';
        } else if (values.rePassword != values.password) {
            errors.rePassword = 'Password and rePassword not match';
        }
        // phone
        if (!values.phone) {
            errors.phone = 'Required';
        } else if (!/^01[0125][0-9]{8}$/i.test(values.phone)) {
            errors.phone = 'Invalid phone number';
        }

        return errors;
    }


    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',
        }, validate,
        onSubmit: (values) => register(values)
    });

    return (
        <>
            <div className="container my-5">
                <h3>Register Now :</h3>

                <form className='w-75 mx-auto' onSubmit={formik.handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" className='form-control mb-2' id='name' name='name' value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.errors.name && formik.touched.name ? <div className="alert alert-danger">{formik.errors.name}</div> : ""}

                    <label htmlFor="email">Email</label>
                    <input type="email" className='form-control mb-2' name='email' id='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ""}

                    <label htmlFor="password">Password</label>
                    <input type="password" className='form-control mb-2' name='password' id='password' value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : ""}

                    <label htmlFor="rePassword">rePassword</label>
                    <input type="rePassword" className='form-control mb-2' name='rePassword' id='rePassword' value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger">{formik.errors.rePassword}</div> : ""}

                    <label htmlFor="phone">phone</label>
                    <input type="tel" className='form-control mb-2' name='phone' id='phone' value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} />
                    {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">{formik.errors.phone}</div> : ""}

                    <button className='btn bg-main text-white'>Register</button>
                </form >
            </div >
        </>
    );
}
