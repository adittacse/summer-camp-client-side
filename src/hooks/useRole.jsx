import React, {useEffect, useState} from 'react';
import useAuth from "./useAuth.jsx";
import useAxiosSecure from "./useAxiosSecure.jsx";
import {useQuery} from "@tanstack/react-query";

const UseRole = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    
    // use axios secure with react query
    const {data: role, isLoading: isRoleLoading} = useQuery({
        queryKey: ["role", user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data.role;
        }
    });
    
    return [role, isRoleLoading];
};

export default UseRole;