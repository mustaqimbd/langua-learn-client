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
    //bg-[#289EB6] bg-[#5959F2] bg-[#453DC6] bg-[#5959F2]
    return (
        <div className='bg-[#132160]'>
            <div className='grid grid-cols-4 items-center py-4 mx-5  text-white'>
                <div className='flex items-center'>
                    <span ><img className='w-10 h-10 rounded-full mx-2' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKmuWkGsEwLup0TUSslEr86fVxf0tEjYw5A7VL9h9qYg&s" alt="" /></span>
                    <h1 className='text-4xl font-bold'>LanguaLearn</h1>
                </div>
                <ul className='flex gap-10 justify-end text-lg font-bold col-span-2'>
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/instructors'>Instructors</NavLink></li>
                    <li><NavLink to='/classes'>Classes</NavLink></li>
                    <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
                </ul>
                <div className='flex'>
                    {user && !loading ?
                        <div className='flex items-center gap-5 ml-auto'>
                            <span title={user.displayName} className='ml-auto'><img className='w-10 h-10 rounded-full' src={user.photoURL} alt="" /></span> <button onClick={handleLogOut} className='px-4 py-2 hover:bg-gray-700 text-lg font-bold rounded-md'>Sing out</button>
                        </div>
                        : !loading &&
                        <Link to='/login' className='ml-auto px-4 py-2 hover:bg-gray-700 text-lg font-bold rounded-md'>Login</Link>
                    }

                </div>
            </div>
        </div>

    );
};

export default Navbar;