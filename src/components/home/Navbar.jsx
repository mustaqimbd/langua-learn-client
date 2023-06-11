import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';

const Navbar = () => {
    const { user, logOut, loading } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Successfully signed out',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div className='grid grid-cols-4 items-center py-5 bg-blue-600'>
            <div className='flex items-center gap-5'>
                <span>logo</span>
                <h1 className='text-4xl font-bold'>LanguaLearn</h1>
            </div>
            <ul className='flex gap-10 justify-end text-lg font-bold col-span-2'>
                <li><NavLink>Home</NavLink></li>
                <li><NavLink to='/instructors'>Instructors</NavLink></li>
                <li><NavLink>Classes</NavLink></li>
                <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
            </ul>
            <div className='flex'>
                {user && !loading ?
                    <div className='flex items-center gap-5 ml-auto'>
                        <span title={user.displayName} className='ml-auto'><img className='w-10 h-10 rounded-full' src={user.photoURL} alt="" /></span> <button onClick={handleLogOut} className='px-4 py-2 bg-red-400 text-lg font-bold rounded-md'>Sing out</button>
                    </div>
                    : !loading &&
                    <Link to='/login' className='ml-auto px-4 py-2 bg-red-400 text-lg font-bold rounded-md'>Login</Link>
                }

            </div>
        </div>
    );
};

export default Navbar;