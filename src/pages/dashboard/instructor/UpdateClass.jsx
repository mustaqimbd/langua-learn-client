import React, { useEffect, useState } from 'react';
import AddAClass from './AddAClass';
import { useParams } from 'react-router-dom';
import useAxios from '../../../customHooks/useAxios';
//TODO
const UpdateClass = () => {
    const [instance] = useAxios()
    const [getClass, setGetClass] = useState({})
    const id = useParams()
    console.log(id);
    useEffect(() => {
        instance.get(`/my-class/${id.id}`)
            .then(result => {
                setGetClass(result.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [])
   console.log(getClass);

    return (
        <div>
            <AddAClass id={id} />
        </div>
    );
};

export default UpdateClass;