import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAxios from './useAxios';
import { useQuery } from 'react-query';

const useRole = () => {
    const { user } = useContext(AuthContext);
    const [instance] = useAxios();
    const [role, setRole] = useState();

    useQuery('role', () => {
        instance.get(`/user-role/${user.email}`)
            .then(result => {
                setRole(result.data.role);
            })
            .catch(err => {
                console.log(err);
            });
    });
    return [role];
};

export default useRole;
