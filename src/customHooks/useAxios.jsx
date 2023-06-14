import { useEffect } from "react";
import axios from "axios";

const instance = axios.create({
        baseURL: 'https://langua-learn-server.vercel.app',
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
