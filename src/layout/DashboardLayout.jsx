import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div>

            <div className='flex'>
                <div className='w-[300px] bg-slate-400'>
                    <ul>
                        <li><NavLink>Admin Home</NavLink></li>
                        <li><NavLink to='/dashboard/manage-classes'>Manage Classes</NavLink></li>
                        <li><NavLink to='/dashboard/manage-users'>Manage Users</NavLink></li>
                    </ul>
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;