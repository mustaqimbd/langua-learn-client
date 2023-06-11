import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import useAxios from '../../../customHooks/useAxios';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const Myclasses = () => {
    const { user } = useContext(AuthContext)
    const [instance] = useAxios()
    const [classes, setClasses] = useState([])
    const [refetch, setRefetch] = useState(false)

    useEffect(() => {
        instance.get(`/my-classes/${user.email}`)
            .then(result => {
                setClasses(result.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [refetch])
    console.log(classes);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                instance.delete(`/delete-my-class/${id}`)
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            setRefetch(!refetch)
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        })
    }
    return (
        <div className='w-[95%] mx-auto'>
            <h1 className='text-3xl font-bold text-center mt-5 mb-4'>My classes</h1>
            <div>

                {
                    classes.map((myClass) => {
                        const { _id, className, image, price, availableSeats, status } = myClass;
                        return (
                            <div key={myClass._id} className='grid grid-cols-3 gap-5 mb-10 bg-slate-200 rounded'>
                                <div className='h-[200px] my-auto'><img className='w-full h-full rounded' src={image} alt="" /></div>
                                <div className='space-y-3'>
                                    <h1 className='text-2xl font-bold'>{className}</h1>
                                    <p>Price : $ {price}</p>
                                    <p>AvailableSeats :  {availableSeats}</p>
                                    <p>Total Enrolled Students : 0</p>
                                    <Link to={`/dashboard/update-class/${_id}`}>
                                        <button className='bg-blue-600 px-4 py-1 text-lg font-bold rounded-md'>Update class</button>
                                    </Link>
                                    <button onClick={() => handleDelete(_id)} className='bg-blue-600 px-4 py-1 text-lg font-bold rounded-md'>Delete class</button>
                                </div>
                                <div>
                                    <p className='text-center my-2'><span className='font-bold'>Status :</span> {status}</p>
                                    <p className='text-center text-lg font-bold'>Feedback </p>
                                </div>
                            </div>
                        );
                    })
                }

            </div>
        </div>
    );
};

export default Myclasses;