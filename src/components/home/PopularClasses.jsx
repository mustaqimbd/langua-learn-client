import React, { useEffect, useState } from 'react';
import useAxios from '../../customHooks/useAxios';

const PopularClasses = () => {
    const [instance] = useAxios()
    const [totalClass, setTotalClass] = useState([])

    useEffect(() => {
        instance.get(`/all-classes`, { params: { status: 'Approved' } })
            .then(result => {
                setTotalClass(result.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [])
    
    return (
        <div>
            <h1 className='text-center text-3xl font-bold mt-10 mb-4 '>Popular Classes</h1>
            <div className='grid grid-cols-3 gap-5'>
                {totalClass.map(oneClass => {
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
                            <div className="p-6 pt-0">
                                <button
                                    className="block bg-[#132160] text-white w-full select-none rounded-lg  py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 "
                                    type="button"
                                >
                                    Enroll
                                </button>

                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    );
};

export default PopularClasses;