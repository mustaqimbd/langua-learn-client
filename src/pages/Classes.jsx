import { useContext, useEffect, useState } from 'react';
import useAxios from '../customHooks/useAxios';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useRole from '../customHooks/useRole';

const Classes = () => {
    const [instance] = useAxios()
    const [totalClass, setTotalClass] = useState([])
    const { user } = useContext(AuthContext)
    const { role, isLoading } = useRole()

    useEffect(() => {
        instance.get(`/all-classes`, { params: { status: 'Approved' } })
            .then(result => {
                setTotalClass(result.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [])
    console.log(totalClass, role, isLoading);
    return (
        <div>
            {
                isLoading ? <h1>Loading...</h1> :
                    <>
                        <h1 className='text-center text-3xl font-bold mt-5 mb-4'>Our Classes</h1>
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
                                            {
                                                user && role != 'Admin' && role != 'Instructor' && <button
                                                    className="block bg-blue-500 w-full select-none rounded-lg  py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 "
                                                    type="button"
                                                >
                                                    User
                                                </button>
                                            }
                                            {
                                                !user && < button
                                                    className="block bg-blue-500 w-full select-none rounded-lg  py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 "
                                                    type="button"
                                                >
                                                    not user
                                                </button>
                                            }
                                            {
                                                user && role == 'Admin' || role == "Instructor" && <button disabled
                                                    className="block bg-blue-500 w-full select-none rounded-lg  py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 "
                                                    type="button"
                                                >
                                                    admin or instructor
                                                </button>
                                            }
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </>
            }
        </div>
    );
};

export default Classes;