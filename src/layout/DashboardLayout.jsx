import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div>

            <div className='flex'>
                <div className='w-[250px] bg-slate-400'>
                    <ul className='p-5 flex flex-col gap-5'>
                        <li><NavLink>Admin Home</NavLink></li>
                        <li><NavLink to='/dashboard/manage-classes'>Manage Classes</NavLink></li>
                        <li><NavLink to='/dashboard/manage-users'>Manage Users</NavLink></li>
                        <li><hr /></li>
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink>Instructors</NavLink></li>
                        <li><NavLink>Classes</NavLink></li>
                    </ul>
                </div>
                <div className='w-full'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;