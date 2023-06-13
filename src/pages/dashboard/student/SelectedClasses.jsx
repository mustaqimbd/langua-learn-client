import { useEffect, useState } from 'react';
import useRole from '../../../customHooks/useRole';
import useAxios from '../../../customHooks/useAxios';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';


const SelectedClasses = () => {
    const [instance] = useAxios()
    const { user, refetch } = useRole();
    const selectedClasses = user?.selectedClasses;
    const [classes, setClasses] = useState()

    useEffect(() => {
        instance.get(`/selected-classes`, { params: { selectedClasses: selectedClasses } })
            .then(result => {
                setClasses(result.data);
            })
            .catch(err => {
                console.log(err);
            });
        console.log('use effect', selectedClasses);
    }, [selectedClasses])

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
                instance.patch(`/selected-classes/${user.email}`, { id: id, deleteId: id })
                    .then((res) => {
                        console.log(res.data);
                        if (res.data.modifiedCount > 0) {
                            refetch()
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
        <div>
            {
                classes && <>

                    <div className='grid grid-cols-3 gap-5'>
                        {classes.map(oneClass => {
                            const { _id, className, image, instructorName, price, availableSeats, } = oneClass;
                            return (
                                <div key={_id} className="relative flex w-full flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                                    <div className="relative mx-4 mt-4 h-[248px] overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                                        <img
                                            src={image}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="mb-2 flex items-center justify-between">
                                            <p className="block text-xl font-bold text-blue-gray-900 antialiased">
                                                {className}
                                            </p>
                                            <p className="block text-2xl font-bold leading-relaxed text-blue-gray-900 antialiased">
                                                $ {price}
                                            </p>
                                        </div>
                                        <p className=' font-bold'>Instructor : {instructorName}</p>
                                        <p> Available seats :  <span className='font-bold'>{availableSeats}</span></p>
                                    </div>
                                    <div className="p-6 pt-0 text-white flex justify-between items-center">
                                        < button onClick={() => handleDelete(_id)}
                                            className="text-red-600 select-none rounded-lg text-center align-middle text-lg font-bold uppercase text-blue-gray-900 "
                                            type="button"
                                        >
                                            <FaTrashAlt />
                                        </button>
                                        < button
                                            className="bg-[#132160] select-none rounded-lg  py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 "
                                            type="button"
                                        >
                                            Pay
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>

                </>
            }
            {classes == "undefined" && < h1 > Loading...</h1>}
        </div >
    );
};

export default SelectedClasses;