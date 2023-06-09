import React from 'react';
import useAuth from "./useAuth.jsx";
import {useQuery} from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure.jsx";

const UseCart = () => {
    const {user, loading} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    
    const { data: cart = [], refetch } = useQuery({
        queryKey: ['carts', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user?.email}`);
            return res.data;
        },
    })
    
    return [cart, refetch];
};

export default UseCart;