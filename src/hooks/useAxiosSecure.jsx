import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import useAuth from "./useAuth.jsx";

const axiosSecure = axios.create({
    baseURL: "https://summer-camp-new-test-adittacse.vercel.app",
});

const UseAxiosSecure = () => {
    const {logOut} = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        axiosSecure.interceptors.request.use((config) => {
            const token = localStorage.getItem("access-token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
        
        axiosSecure.interceptors.response.use((response) =>
            response, async (error) => {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                await logOut();
                navigate("/login");
            }
            return Promise.reject(error);
        });
    }, [logOut, navigate]);
    
    return [axiosSecure];
};

export default UseAxiosSecure;