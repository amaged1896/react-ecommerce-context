import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes(props) {

    if (localStorage.getItem('token')) {
        // navigate to path
        return props.children;
    } else {
        // navigate to login page
        return <Navigate to='/login' />;
    }
}
