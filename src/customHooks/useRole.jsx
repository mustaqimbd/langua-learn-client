import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAxios from './useAxios';
import { useQuery } from 'react-query';

const useRole = () => {
    const { user } = useContext(AuthContext);
    const [instance] = useAxios();

    const { data: role, isLoading, isError } = useQuery("role",
        async () => {
            const response = await instance.get(`/user-role/${user?.email}`);
            return response.data.role;
        });
    useEffect(() => {
        if (!isLoading && !isError) {
            console.log('use role', role);
        }
    }, [isLoading, isError, role]);
    console.log(role);
    return { role, isLoading, isError };
};

export default useRole;
