import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { useContext, useState } from 'react';
import useAxios from '../../../customHooks/useAxios';
import Swal from 'sweetalert2';


const AddAClass = () => {
    const { user } = useContext(AuthContext)
    const [instance] = useAxios()
    const [image, setImage] = useState('')
    console.log(image);

    const initialValues = {
        className: '',
        image: image?.name,
        instructorName: user.displayName || '',
        instructorEmail: user.email || '',
        availableSeats: '',
        price: '',
        status: 'Pending'
    };

    const onSubmit = (values, { resetForm }) => {
        const image_hosting_token = import.meta.env.VITE_Image_upload_apiKey;
        const image_upload_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`
        const formData = new FormData();
        formData.append('image', image)

        fetch(image_upload_url, { method: 'POST', body: formData })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    values.image = result.data.display_url;
                    console.log(values);
                    instance.post('/newclass', values)
                        .then(data => {
                            if (data.data.insertedId) {
                                setImage('')
                                resetForm()
                                console.log(image);
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Class added successfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                }
            })
            .catch(err => { console.log(err) })
    };

    return (
        <div className="w-[95%] mx-auto">
            <h1 className='text-3xl font-bold text-center mt-6 mb-4'>Add a classes</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validate={(values) => {
                    const errors = {};

                    if (!values.className) {
                        errors.className = 'Required';
                    }

                    if (!values.instructorName) {
                        errors.instructorName = 'Required';
                    }

                    if (!values.instructorEmail) {
                        errors.instructorEmail = 'Required';
                    } else if (!/^\S+@\S+\.\S+$/.test(values.instructorEmail)) {
                        errors.instructorEmail = 'Invalid email address';
                    }

                    if (!values.availableSeats) {
                        errors.availableSeats = 'Required';
                    }

                    if (!values.price) {
                        errors.price = 'Required';
                    }

                    return errors;
                }}
            >
                <Form className="bg-white grid grid-cols-2 gap-5 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label
                            htmlFor="className"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Class Name
                        </label>
                        <Field
                            type="text"
                            id="className"
                            name="className"
                            className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage
                            name="className"
                            component="div"
                            className="text-red-500 text-xs italic"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="classImage"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Class Image
                        </label>
                        <Field
                            type="file"
                            id="classImage"
                            name="image"
                            onChange={(event) => {
                                return setImage(event.currentTarget.files[0])
                            }}
                            required
                            className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage
                            name="classImage"
                            component="div"
                            className="text-red-500 text-xs italic"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="instructorName"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Instructor Name
                        </label>
                        <Field
                            type="text"
                            id="instructorName"
                            name="instructorName"
                            readOnly
                            className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage
                            name="instructorName"
                            component="div"
                            className="text-red-500 text-xs italic"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="instructorEmail"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Instructor Email
                        </label>
                        <Field
                            type="email"
                            id="instructorEmail"
                            name="instructorEmail"
                            readOnly
                            className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage
                            name="instructorEmail"
                            component="div"
                            className="text-red-500 text-xs italic"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="availableSeats"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Available Seats
                        </label>
                        <Field
                            type="number"
                            id="availableSeats"
                            name="availableSeats"
                            className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage
                            name="availableSeats"
                            component="div"
                            className="text-red-500 text-xs italic"
                        />
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="price"
                            className="block text-gray-700 text-sm font-bold mb-2"
                        >
                            Price
                        </label>
                        <Field
                            type="number"
                            id="price"
                            name="price"
                            className="shadow appearance-none border border-slate-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        <ErrorMessage
                            name="price"
                            component="div"
                            className="text-red-500 text-xs italic"
                        />
                    </div>

                    <div className='flex items-center col-span-2'>
                        <button
                            type="submit"
                            className="h-[40px] w-[200px] mx-auto bg-[#132160] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Add
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default AddAClass;
