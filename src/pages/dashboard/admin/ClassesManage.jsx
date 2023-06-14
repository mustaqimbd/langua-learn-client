import { useEffect, useState } from "react";
import useAxios from "../../../customHooks/useAxios";
import Swal from "sweetalert2";

const ClassesManage = () => {
    const [allClasses, setAllClasses] = useState([])
    const [refetch, setRefetch] = useState(false);
    const [instance] = useAxios();

    useEffect(() => {
        instance.get('/all-classes')
            .then(result => {
                setAllClasses(result.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [refetch])

    console.log(allClasses);
    const changeStatus = (id, status) => {
        console.log(status, id);
        instance.patch(`/all-classes/${id}`, { status })
            .then(result => {
                console.log(result.data);
                if (result.data.modifiedCount > 0) {
                    setRefetch(!refetch)
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Successfully status changed.',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className='w-[95%] mx-auto'>
            <h1 className='text-3xl font-bold text-center mt-5 mb-4'>My classes</h1>
            <div>
                {
                    allClasses.map((singleClass) => {
                        const { _id, className, image, instructorName, instructorEmail, price, availableSeats, status } = singleClass;
                        return (
                            <div key={singleClass._id} className='flex flex-cols-3 gap-5 mb-10 bg-slate-200 rounded'>
                                <div className='w-[20%]my-auto'><img className='h-[200px] w-[200px] object-cover rounded' src={image} alt="" /></div>
                                <div className='space-y-3 w-[40%]'>
                                    <h1 className='text-2xl font-bold'>Class : {className}</h1>
                                    <p>Price : $ {price}</p>
                                    <p>Available seats :  {availableSeats}</p>
                                    <p>Instructor name: {instructorName}</p>
                                    <p>Email : {instructorEmail}</p>
                                </div>
                                <div className="w-[40%] flex flex-col justify-evenly">
                                    <p className='text-center my-2'><span className='font-bold'>Status :</span> {status}</p>
                                    <div className="flex justify-evenly">
                                        <button onClick={() => changeStatus(_id, 'Approved')} disabled={status == 'Approved' || status == 'Denied' ? true : false} className="bg-[#132160] text-white px-4 py-1 text-lg font-bold rounded-md">Approve</button>

                                        <button onClick={() => changeStatus(_id, 'Denied')} disabled={status == 'Approved' || status == 'Denied' ? true : false} className={`text-white bg-red-600 px-4 py-1 text-lg font-bold rounded-md`}>Deny</button>
                                    </div>
                                   
                                    <p className='text-center text-lg font-bold cursor-pointer'>Feedback </p>
                                </div>
                            </div>
                        );
                    })
                }

            </div>
        </div>
    );
};

export default ClassesManage;