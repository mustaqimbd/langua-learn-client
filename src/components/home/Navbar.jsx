import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='grid grid-cols-3 items-center py-5 bg-slate-300'>
            <div className='flex items-center gap-5'>
                <span>logo</span>
                <h1 className='text-4xl font-bold'>LanguaLearn</h1>
            </div>
            <ul className='flex gap-10 text-lg font-bold'>
                <li><NavLink>Home</NavLink></li>
                <li><NavLink>Instructors</NavLink></li>
                <li><NavLink>Classes</NavLink></li>
                <li><NavLink>Dashboard</NavLink></li>
            </ul>
            <div className='flex'>
                <span className='ml-auto'>Profile</span>
            </div>
        </div>
    );
};

export default Navbar;