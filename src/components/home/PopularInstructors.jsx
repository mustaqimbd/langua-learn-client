import React, { useEffect, useState } from 'react';
import useAxios from '../../customHooks/useAxios';

const PopularInstructors = () => {
    const [instance] = useAxios()
    const [instructors, setInstructors] = useState([])
    useEffect(() => {
        instance.get(`/instructors`)
            .then(result => {
                setInstructors(result.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [])
    console.log(instructors);
    return (
        <div>
            <h1 className='text-center text-3xl font-bold mt-10 mb-4 '>Popular Instructors</h1>
            <div className='grid grid-cols-3 gap-5 mb-10'>
                {instructors.map(instructor => {
                    const { _id, name, email, photoURL } = instructor;
                    return (
                        <div key={_id} className="relative flex w-full flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                            <div className="relative mx-4 mt-4 h-[248px] overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
                                <img
                                    src={photoURL}
                                    className="h-full w-full"
                                />
                            </div>
                            <p className="block text-center mt-3 mb-5 text-xl font-bold text-blue-gray-900 antialiased">
                                {name}
                            </p>
                        </div>
                    )
                })
                }
            </div>
        </div>
    );
};

export default PopularInstructors;