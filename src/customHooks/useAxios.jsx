import { useEffect } from "react";
import axios from "axios";

const instance = axios.create({
        baseURL: 'http://localhost:5000',
    });

const useAxios = () => {
    
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
    }, []);

    return [instance]
};

export default useAxios;
