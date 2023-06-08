import React from 'react';
import useAuth from "../hooks/useAuth.jsx";
import useRole from "../hooks/useRole.jsx";
import {Navigate, useLocation} from "react-router-dom";

const InstructorRoute = ({ children }) => {
    const {user, loading} = useAuth();
    const [role] = useRole();
    const location = useLocation();
    
    if (loading || role !== "Instructor") {
        return <progress className="progress progress-error w-56 flex mx-auto"></progress>;
    }
    
    if (user && role === "Instructor") {
        return children;
    }
    
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default InstructorRoute;