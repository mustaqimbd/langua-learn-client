import { useEffect, useState } from "react";
import useAxios from "../customHooks/useAxios";

const Instructors = () => {
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
            <h1 className='text-3xl font-bold text-center my-4'>Our Instructors</h1>
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
                <table className="w-full border-collapse bg-white text-center text-gray-500">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900 text-center">#</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900">Image</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900 text-center">Name</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900 text-center">Email</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {
                            instructors.map((instructor, index) => {
                                const { name, email, photoURL } = instructor;
                                return (
                                    <tr key={instructor._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-center">{index + 1}</td>
                                        <td>
                                            <div className=" h-[200px] w-[200px] mx-auto">
                                                <img
                                                    className="h-full w-full rounded-full object-cover"
                                                    src={photoURL}
                                                    alt=""
                                                />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="font-medium text-gray-700">{name}</div>
                                        </td>
                                        <td>
                                            <div className="text-gray-700">{email}</div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Instructors;