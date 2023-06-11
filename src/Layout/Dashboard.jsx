import React, { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuth from '../hooks/useAuth.jsx';
import useRole from '../hooks/useRole.jsx';

const Dashboard = () => {
    const { user, logOut } = useAuth();
    const [role] = useRole();
    
    // use theme from local storage if available or set light theme
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    
    // update state on toggle
    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };
    
    // set theme state in localstorage on mount & also update localstorage on state change
    useEffect(() => {
        localStorage.setItem('theme', theme);
        const localTheme = localStorage.getItem('theme');
        // add custom data-theme attribute to html tag required to update theme using DaisyUI
        document.querySelector('html').setAttribute('data-theme', localTheme);
    }, [theme]);
    
    const handleLogout = () => {
        logOut()
            .then(() => {})
            .catch((error) => {});
    };
    
    const sidebarVariants = {
        hidden: { x: -50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                delay: 0.2,
                duration: 0.5,
            },
        },
    };
    
    const listItemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };
    
    return (
        <motion.div className="drawer lg:drawer-open" initial="hidden" animate="visible" variants={sidebarVariants} >
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <motion.div
                className="drawer-content flex flex-col items-center"
                variants={sidebarVariants}>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                    Open drawer
                </label>
                {/* Page content here */}
                <Outlet></Outlet>
            </motion.div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <motion.ul
                    className="menu p-4 w-80 h-full text-base-content bg-[#020c3a] text-white"
                    initial="hidden"
                    animate="visible"
                    variants={sidebarVariants}>
                    {/* Sidebar content here */}
                    {role === 'Admin' && (
                        <motion.h3
                            className="text-xl font-semibold text-center mb-3"
                            variants={listItemVariants}
                        >
                            Admin Dashboard
                        </motion.h3>
                    )}
                    {role === 'Instructor' && (
                        <motion.h3
                            className="text-xl font-semibold text-center mb-3"
                            variants={listItemVariants}
                        >
                            Instructor Dashboard
                        </motion.h3>
                    )}
                    {role === 'Student' && (
                        <motion.h3
                            className="text-xl font-semibold text-center mb-3"
                            variants={listItemVariants}
                        >
                            Student Dashboard
                        </motion.h3>
                    )}
                    {role === 'Admin' && (
                        <>
                            <motion.li variants={listItemVariants}>
                                <NavLink to="/dashboard/manage-classes">Manage Classes</NavLink>
                            </motion.li>
                            <motion.li variants={listItemVariants}>
                                <NavLink to="/dashboard/manage-users">Manage Users</NavLink>
                            </motion.li>
                        </>
                    )}
                    {role === 'Instructor' && (
                        <>
                            <motion.li variants={listItemVariants}>
                                <NavLink to="/dashboard/my-classes">My Classes</NavLink>
                            </motion.li>
                            <motion.li variants={listItemVariants}>
                                <NavLink to="/dashboard/add-class">Add A Class</NavLink>
                            </motion.li>
                        </>
                    )}
                    {role === 'Student' && (
                        <>
                            <motion.li variants={listItemVariants}>
                                <NavLink to="/dashboard/selected-class">My Selected Classes</NavLink>
                            </motion.li>
                            <motion.li variants={listItemVariants}>
                                <NavLink to="/dashboard/enrolled-class">Enrolled Classes</NavLink>
                            </motion.li>
                            <motion.li variants={listItemVariants}>
                                <NavLink to="/dashboard/payment-history">Payment History</NavLink>
                            </motion.li>
                        </>
                    )}
                    
                    <div className="border mt-4 mb-4"></div>
                    
                    <motion.button
                        className="btn btn-square btn-ghost flex mx-auto"
                        variants={listItemVariants}
                    >
                        <label className="swap swap-rotate w-12 h-12">
                            <input
                                type="checkbox"
                                onChange={handleToggle}
                                checked={theme === 'light' ? false : true}
                            />
                            <svg
                                className="swap-on fill-current w-10 h-10"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                            </svg>
                            <svg
                                className="swap-off fill-current w-10 h-10"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05a1,1,0,0,0-.36-.05Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                            </svg>
                        </label>
                    </motion.button>
                    <motion.li variants={listItemVariants}>
                        <NavLink to="/">Home</NavLink>
                    </motion.li>
                    {user && (
                        <motion.li variants={listItemVariants}>
                            <Link onClick={handleLogout} to="/">
                                Logout
                            </Link>
                        </motion.li>
                    )}
                </motion.ul>
            </div>
        </motion.div>
    );
};

export default Dashboard;
