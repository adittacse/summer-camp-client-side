import React from 'react';
import {Link, NavLink, Outlet} from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import useRole from "../hooks/useRole.jsx";

const Dashboard = () => {
    const {user, logOut} = useAuth();
    const [role] = useRole();
    
    const handleLogout = () => {
        logOut()
            .then(() => {})
            .catch(error => {})
    }
    
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center">
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                {/* Page content here */}
                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    {
                        role === "Admin" && <>
                            <li><NavLink to="/dashboard/manage-classes">Manage Classes</NavLink></li>
                            <li><NavLink to="/dashboard/manage-users">Manage Users</NavLink></li>
                        </>
                    }
                    {
                        role === "Instructor" && <>
                            <li><NavLink to="/dashboard/my-classes">My Classes</NavLink></li>
                            <li><NavLink to="/dashboard/add-class">Add A Class</NavLink></li>
                        </>
                    }
                    {
                        role === "Student" && <>
                            <li><NavLink to="/dashboard/selected-class">My Selected Class</NavLink></li>
                            <li><NavLink to="/dashboard/enrolled-class">Enrolled Classes</NavLink></li>
                            <li><NavLink to="/dashboard/payment-history">Payment History</NavLink></li>
                        </>
                    }
                    
                    <div className="border mt-4 mb-4"></div>
                    
                    <li><NavLink to="/">Home</NavLink></li>
                    {
                        user && <li><Link onClick={handleLogout} to="/">Logout</Link></li>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;