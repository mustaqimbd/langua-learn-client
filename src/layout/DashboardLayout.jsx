import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import useRole from '../customHooks/useRole';

const DashboardLayout = () => {
    const [role] = useRole()
    return (
        <div>
            <div className='flex'>
                <div className='w-[250px] bg-slate-400'>

                    {role == 'Student' &&
                        <ul className='p-5 flex flex-col gap-5'>
                            <li><NavLink>Student Home</NavLink></li>
                            <li><NavLink to='/dashboard/manage-classes'>Manage Classes</NavLink></li>
                            <li><NavLink to='/dashboard/manage-users'>Manage Users</NavLink></li>
                            <li><hr /></li>
                            <li><NavLink to='/'>Home</NavLink></li>
                            <li><NavLink>Instructors</NavLink></li>
                            <li><NavLink>Classes</NavLink></li>
                        </ul>
                    }
                    {role == 'Instructor' &&
                        <ul className='p-5 flex flex-col gap-5'>
                            <li>Instructor Home</li>
                            <li><NavLink to='/dashboard/addaclass'>Add a Class</NavLink></li>
                            <li><NavLink to='/dashboard/my-classes'>My Classes</NavLink></li>
                            <li><hr /></li>
                            <li><NavLink to='/'>Home</NavLink></li>
                            <li><NavLink>Instructors</NavLink></li>
                            <li><NavLink>Classes</NavLink></li>
                        </ul>
                    }
                    {role == 'Admin' &&
                        <ul className='p-5 flex flex-col gap-5'>
                            <li><NavLink>Admin Home</NavLink></li>
                            <li><NavLink to='/dashboard/manage-classes'>Manage Classes</NavLink></li>
                            <li><NavLink to='/dashboard/manage-users'>Manage Users</NavLink></li>
                            <li><hr /></li>
                            <li><NavLink to='/'>Home</NavLink></li>
                            <li><NavLink>Instructors</NavLink></li>
                            <li><NavLink>Classes</NavLink></li>
                        </ul>
                    }
                </div>
                <div className='w-full'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;