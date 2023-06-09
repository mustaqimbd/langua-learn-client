import { useFormik } from 'formik';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAxios from '../customHooks/useAxios';
import Swal from 'sweetalert2';

const RegistrationForm = () => {
    const [instance] = useAxios()
    const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            photoUrl: '',
            gender: '',
            phoneNumber: '',
            address: '',
        },
        validate: (values) => {
            const errors = {};

            if (!values.name) {
                errors.name = 'Name is required';
            }

            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Password is required';
            } else if (values.password.length < 6) {
                errors.password = 'Password must be at least 6 characters';
            } else if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/.test(values.password)) {
                errors.password = 'Password must contain a capital letter and a special character'
            }

            if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Passwords do not match';
            }
            // Add more validation rules for other fields if needed

            return errors;
        },
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            values.role = 'student';
            createUser(values.email, values.password)
                .then(result => {
                    console.log(result.user);
                    updateUserProfile(values.name, values.photoUrl)
                        .then(() => {
                            instance.post('/user', values)
                                .then(res => {
                                    if (res.data.insertedId) {
                                        resetForm()
                                        Swal.fire({
                                            position: 'top-end',
                                            icon: 'success',
                                            title: 'Successfully Registered',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                    }
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
                .catch(err => {
                    console.log(err);
                })
        },
    });

    const handleGoogleSingIn = () => {
        googleSignIn()
            .then((result) => {
                console.log(result.user);
                const { displayName, email, photoURL } = result.user;
                instance.post('/user', { name: displayName, email, photoURL ,role:'student'})
                    .then(res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Successfully Registered',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="max-w-2xl mx-auto p-5 grid grid-cols-2 gap-5 rounded-lg my-5 shadow-lg border">
                <h1 className='text-3xl font-bold text-center col-span-2'>Registration</h1>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                        Name:
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        className="appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {formik.errors.name ? <div className="text-red-600">{formik.errors.name}</div> : null}
                </div>

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

                <div className="mb-4">
                    <label
                        htmlFor="confirmPassword"
                        className="block text-gray-700 font-bold mb-2"
                    >
                        Confirm Password:
                    </label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        className="appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {formik.errors.confirmPassword ? <div className="text-red-600">{formik.errors.confirmPassword}</div> : null}

                </div>

                <div className="mb-4">
                    <label htmlFor="photoUrl" className="block text-gray-700 font-bold mb-2">
                        Photo URL:
                    </label>
                    <input
                        id="photoUrl"
                        name="photoUrl"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.photoUrl}
                        className="appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="gender" className="block text-gray-700 font-bold mb-2">
                        Gender:
                    </label>
                    <div>
                        <label className="inline-flex items-center mr-4">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                checked={formik.values.gender === 'male'}
                                onChange={formik.handleChange}
                                className="form-radio h-4 w-4 text-indigo-600"
                            />
                            <span className="ml-2">Male</span>
                        </label>

                        <label className="inline-flex items-center mr-4">
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                checked={formik.values.gender === 'female'}
                                onChange={formik.handleChange}
                                className="form-radio h-4 w-4 text-indigo-600"
                            />
                            <span className="ml-2">Female</span>
                        </label>

                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="gender"
                                value="other"
                                checked={formik.values.gender === 'other'}
                                onChange={formik.handleChange}
                                className="form-radio h-4 w-4 text-indigo-600"
                            />
                            <span className="ml-2">Other</span>
                        </label>
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-gray-700 font-bold mb-2">
                        Phone Number:
                    </label>
                    <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.phoneNumber}
                        className="appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
                        Address:
                    </label>
                    <textarea
                        id="address"
                        name="address"
                        onChange={formik.handleChange}
                        value={formik.values.address}
                        className="appearance-none border border-slate-500 rounded w-full h-[40px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <div className='col-span-2 text-center'>
                    <button
                        type="submit"
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 w-[200px] rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                </div>
            </form>
            <div className='text-center mb-5'>
                <button onClick={handleGoogleSingIn} className='text-lg font-bold bg-blue-700 py-2 px-4 mb-2 rounded w-[300px]'>Registration with google</button>
                <p>Already have an account? <Link to='/login' className='text-lg font-bold text-blue-700'>Please Login</Link></p>
            </div>
        </div>
    );
};

export default RegistrationForm;
