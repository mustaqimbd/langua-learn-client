import React from 'react';
import { Navigate } from 'react-router-dom';
import useRole from '../customHooks/useRole';

const Instructor = ({ children }) => {
    const { role } = useRole()
    if (!role) {
        return <h1 className='text-4xl text-center'>Loading...</h1>
    }

    if (role == 'Instructor') {
        return children
    }
    return <Navigate to='/' />

};

export default Instructor;