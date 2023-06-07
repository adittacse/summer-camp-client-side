import React from 'react';
import {Navigate, useLocation} from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";

const PrivateRoute = ({ children }) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    
    if (loading) {
        return <progress className="progress progress-error w-56 flex mx-auto"></progress>;
    }
    
    if (user) {
        return children;
    }
    
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;