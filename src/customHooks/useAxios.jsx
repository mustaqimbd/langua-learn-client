import { useEffect } from "react";
import axios from "axios";

const useAxios = () => {
    const instance = axios.create({
        baseURL: 'http://localhost:5000',
    });

    useEffect(() => {
        instance.interceptors.request.use(
            config => {
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );
        instance.interceptors.response.use(
            response => {
                return response;
            },
            error => {
                return Promise.reject(error);
            }
        );
    }, [instance]);

    return [instance]
};

export default useAxios;
