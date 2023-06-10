import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    if (loading) {
        return <h1 className='text-4xl text-center'>Loading...</h1>
    }
    if (user) {
        return children;
    }
    return <Navigate to='login' />
};

export default ProtectedRoute;