import React from 'react';
import useAuth from "../hooks/useAuth.jsx";
import {Navigate, useLocation} from "react-router-dom";
import useRole from "../hooks/useRole.jsx";

const StudentRoute = ({ children }) => {
    const {user, loading} = useAuth();
    const [role] = useRole();
    const location = useLocation();
    
    if (loading || role !== "Student") {
        return <progress className="progress progress-error w-56 flex mx-auto"></progress>;
    }
    
    if (user && role === "Student") {
        return children;
    }
    
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default StudentRoute;