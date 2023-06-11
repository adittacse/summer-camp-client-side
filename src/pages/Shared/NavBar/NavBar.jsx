import React from 'react';
import logo from "../../../assets/TranquilZen.png";
import {Link} from "react-router-dom";
import useAuth from "../../../hooks/useAuth.jsx";
import useRole from "../../../hooks/useRole.jsx";
import {FaShoppingCart} from "react-icons/fa";
import useCart from "../../../hooks/useCart.jsx";

const NavBar = () => {
    const {user, logOut} = useAuth();
    const [role] = useRole();
    const [cart] = useCart();
    
    const handleLogout = () => {
        logOut()
            .then(() => {})
            .catch(error => {})
    }
    
    const navMenuItems = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/instructors">Instructors</Link></li>
        <li><Link to="/classes">Classes</Link></li>
        {
            role === "Admin" && <>
                <li><Link to="/dashboard/manage-classes">Dashboard</Link></li>
            </>
        }
        {
            role === "Instructor" && <>
                <li><Link to="/dashboard/my-classes">Dashboard</Link></li>
            </>
        }
        {
            role === "Student" && <>
                <li><Link to="/dashboard/selected-class">Dashboard</Link></li>
            </>
        }
        {
            role === "Student" && <li>
                <Link to="/dashboard/selected-class">
                    <button className="btn gap-2 text-[16px]">
                        <FaShoppingCart></FaShoppingCart>
                        <div className="badge badge-secondary text-[16px]">+{cart?.length || 0}</div>
                    </button>
                </Link>
            </li>
        }
        {
            user && <li><Link onClick={handleLogout} to="/">Logout</Link></li>
        }
    </>
    
    return (
        <div className="navbar bg-base-100 max-w-screen-xl mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navMenuItems}
                    </ul>
                </div>
                <Link to="/" className="normal-case text-xl">
                    <img className="w-52" src={logo} alt="Website Logo"/>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 items-center">
                    {navMenuItems}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ? <img className="w-16 h-14 rounded" src={user?.photoURL} alt="User Proile Picture" />
                        : <>
                            <Link className="btn mr-2" to="/login">Login</Link>
                            <Link className="btn" to="/signup">Signup</Link>
                        </>
                }
            </div>
        </div>
    );
};

export default NavBar;