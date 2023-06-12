import { NavLink, Outlet } from 'react-router-dom';
import useRole from '../customHooks/useRole';
import Navbar from '../components/home/navbar';

const DashboardLayout = () => {
    const { role } = useRole()
    console.log(role);
    return (
        <div>
            <Navbar />
            <div className='flex'>
                <div className='w-[250px] bg-slate-400'>

                    {role == 'Student' &&
                        <ul className='p-5 flex flex-col gap-5'>
                            <li><NavLink to='/dashboard/selected/classes'>My Selected Classes</NavLink></li>
                            <li><NavLink to='/dashboard/Enrolled/classes'>My Enrolled Classes</NavLink></li>
                            <li><NavLink to='/dashboard/payment'>Payment</NavLink></li>
                        </ul>
                    }
                    {role == 'Instructor' &&
                        <ul className='p-5 flex flex-col gap-5'>
                            <li><NavLink to='/dashboard/instructor'>Instructor Home</NavLink></li>
                            <li><NavLink to='/dashboard/addaclass'>Add a Class</NavLink></li>
                            <li><NavLink to='/dashboard/my-classes'>My Classes</NavLink></li>

                        </ul>
                    }
                    {role == 'Admin' &&
                        <ul className='p-5 flex flex-col gap-5'>
                            <li><NavLink to='/dashboard/home'>Admin Home</NavLink></li>
                            <li><NavLink to='/dashboard/manage-classes'>Manage Classes</NavLink></li>
                            <li><NavLink to='/dashboard/manage-users'>Manage Users</NavLink></li>
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