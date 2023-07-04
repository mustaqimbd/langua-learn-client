import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxios from '../../../customHooks/useAxios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { useContext } from 'react';
import Swal from 'sweetalert2';
import { data } from 'autoprefixer';
import AddAClass from './AddAClass';
let getClass = {}
export const update = (data) => {
    return getClass = data
}
//TODO
const UpdateClass = () => {
    const [instance] = useAxios()
    // const [getClass, setGetClass] = useState({})
    const { user } = useContext(AuthContext)
    const [image, setImage] = useState('')
    const id = useParams()
    console.log(id);
    // useEffect(() => {
    //     instance.get(`/my-class/${id.id}`)
    //         .then(result => {
    //             setGetClass(result.data);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }, [instance, id.id])
    // console.log(getClass);

console.log(getClass);
    return (
        <div>
            <AddAClass getClass={getClass} />
        </div>
    );
};


export default UpdateClass;
