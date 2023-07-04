import { NavLink, Navigate, Outlet } from 'react-router-dom';
import useRole from '../customHooks/useRole';
import Navbar from '../components/home/navbar';

const DashboardLayout = () => {
    const { role } = useRole()

    return (
        <div>
            <Navbar />
            <div className='flex'>
                <div className='w-[250px] bg-gray-700 text-white text-lg font-bold min-h-[calc(100vh-76px)]'>

                    {role == 'Student' &&
                        <>
                            <ul className='p-5 flex flex-col gap-5'>
                                <li><NavLink to='/dashboard/selected/classes' className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-600"
                                        : ""}>Selected Classes</NavLink></li>
                                <li><NavLink to='/dashboard/Enrolled/classes' className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-600"
                                        : ""}>Enrolled Classes</NavLink></li>
                                <li><NavLink to='/dashboard/payment/history' className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-600"
                                        : ""}>Payment History</NavLink></li>
                            </ul>
                            <Navigate to='/dashboard/selected/classes' replace={true}></Navigate>
                        </>
                    }
                    {role == 'Instructor' &&
                        <>
                            <ul className='p-5 flex flex-col gap-5'>
                                <li>Instructor Home</li>
                                <li>
                                    <NavLink to='/dashboard/my-classes' className={({ isActive }) =>
                                        isActive
                                            ? "text-blue-600"
                                            : ""}>My Classes</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/add-a-class' className={({ isActive }) =>
                                        isActive
                                            ? "text-blue-600"
                                            : ""}>Add a Class</NavLink>
                                </li>
                            </ul>
                            <Navigate to='/dashboard/my-classes' replace={true}></Navigate>
                        </>
                    }
                    {role == 'Admin' &&
                        <>
                            <ul className='p-5 flex flex-col gap-5'>

                                <li><NavLink to='/dashboard/manage-classes' className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-600"
                                        : ""}
                                >Manage Classes</NavLink></li>
                                <li><NavLink to='/dashboard/manage-users' className={({ isActive }) =>
                                    isActive
                                        ? "text-blue-600"
                                        : ""}>Manage Users</NavLink></li>
                            </ul>
                            <Navigate to='/dashboard/manage-classes' replace={true} />
                        </>
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