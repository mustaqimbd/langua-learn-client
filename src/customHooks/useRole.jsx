import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import useAxios from './useAxios';
import { useQuery } from 'react-query';

const useRole = () => {
    const { user } = useContext(AuthContext);
    const [instance] = useAxios();
    const { data, isLoading, isError,refetch } = useQuery("role",
        async () => {
            const response = await instance.get(`/user-role/${user?.email}`);
            return response.data;
        });
    useEffect(() => {
    }, [isLoading, isError, data]);

    return { role: data?.role, user: data,isLoading, isError,refetch };
};

export default useRole;
