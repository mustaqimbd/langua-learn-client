import React from 'react';
import { Navigate } from 'react-router-dom';
import useRole from '../customHooks/useRole';

const Student = ({ children }) => {
    const { role } = useRole()
    if (!role) {
        return <h1 className='text-4xl text-center'>Loading...</h1>
    }

    if (role == 'Student') {
        return children
    }
    return <Navigate to='/' />

};

export default Student;