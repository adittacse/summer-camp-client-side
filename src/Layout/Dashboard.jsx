import React from 'react';
import {NavLink, Outlet} from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import useAdmin from "../hooks/useAdmin.jsx";

const Dashboard = () => {
    const {user} = useAuth();
    const [isAdmin] = useAdmin();
    
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
                        isAdmin && <>
                            <li><NavLink to="/dashboard/manage-users">Manage Users</NavLink></li>
                        </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;