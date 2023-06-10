import { useEffect, useState } from 'react';
import useAxios from '../../customHooks/useAxios';
import Swal from 'sweetalert2';


const UsersManage = () => {
    const [refetch, setRefetch] = useState(false)
    const [users, setUsers] = useState([])
    const [instance] = useAxios()

    useEffect(() => {
        instance.get('/users')
            .then(result => {
                console.log(result.data);
                setUsers(result.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [refetch])

    const changeRole = (role, email) => {
        console.log(role, email);
        instance.patch(`/update/user/${role}`, { email })
            .then(result => {
                console.log(result.data);
                if (result.data.modifiedCount > 0) {
                    setRefetch(!refetch)
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Successfully user role updated',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

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
                instance.delete(`/user/${id}`)
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
        <div>
            <h1 className='text-3xl font-bold text-center my-4'>Manage User</h1>

            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900 text-center">#</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900 text-center">User</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900 text-center">Role</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900 text-center">Action</th>
                            <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {
                            users.map((user, index) => {
                                const { name, email, role, photoURL } = user;
                                return (
                                    <tr key={user._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                                            <div className="relative h-10 w-10">
                                                <img
                                                    className="h-full w-full rounded-full object-cover object-center"
                                                    src={photoURL}
                                                    alt=""
                                                />

                                            </div>
                                            <div className="text-sm">
                                                <div className="font-medium text-gray-700">{name}</div>
                                                <div className="text-gray-400">{email}</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">{role}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button onClick={() => changeRole('Admin', email)} disabled={role == 'Admin' ? true : false}
                                                    className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600 text-center"
                                                >
                                                    Make Admin
                                                </button>
                                                <button onClick={() => changeRole('Instructor', email)} disabled={role == 'Instructor' ? true : false}
                                                    className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600"
                                                >
                                                    Make Instructor
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-4">
                                                <button onClick={()=>handleDelete(user._id)}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="h-6 w-6"

                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
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

export default UsersManage;