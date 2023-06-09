import { useFormik } from 'formik';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAxios from '../customHooks/useAxios';
import Swal from 'sweetalert2';

const LoginForm = () => {
    const [instance] = useAxios()
    const { loginUser, googleSignIn } = useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate: (values) => {
            const errors = {};
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Password is required';
            }
            return errors;
        },
        onSubmit: (values,{ resetForm }) => {
            console.log(values);
            loginUser(values.email, values.password)
                .then(result => {
                    resetForm()
                    console.log(result.user);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Successfully Logged in',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch(err => {
                    console.log(err);
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Password or email wrong!',
                        showConfirmButton: false,
                        timer: 3000
                    })
                })
        },
    });

    const handleGoogleSingIn = () => {
        googleSignIn()
            .then((result) => {
                console.log(result.user);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Successfully Logged in',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto p-5 rounded-lg my-5 shadow-lg border">
                <h1 className='text-3xl font-bold text-center col-span-2'>Please Login</h1>


                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                        Email:
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        className="appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {formik.errors.email ? <div className="text-red-600">{formik.errors.email}</div> : null}

                </div>

                <div className="mb-4">
                    <label
                        htmlFor="password"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Password:
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        className="appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {formik.errors.password ? <div className="text-red-600">{formik.errors.password}</div> : null}

                </div>

                <div className='col-span-2 text-center'>
                    <button
                        type="submit"
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 w-[200px] rounded focus:outline-none focus:shadow-outline"
                    >
                        Login
                    </button>
                </div>
            </form>
            <div className='text-center mb-14'>
                <button onClick={handleGoogleSingIn} className='text-lg font-bold bg-blue-700 py-2 px-4 mb-2 rounded w-[200px]'>Log in with google</button>
                <p>Already have an account? <Link to='/registration' className='text-lg font-bold text-blue-700'>Please Registration</Link></p>
            </div>
        </div>
    );
};

export default LoginForm;
