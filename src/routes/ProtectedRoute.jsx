import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useRole from '../customHooks/useRole';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation()
    if (loading) {
        return <h1 className='text-4xl text-center'>Loading...</h1>
    }
    if (user) {
        return children;
    }
    return <Navigate to='/login' state={location} />
};

export default ProtectedRoute;