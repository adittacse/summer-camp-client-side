import React from 'react';
import {Outlet} from "react-router-dom";
import NavBar from "../pages/Shared/NavBar/NavBar.jsx";
import Footer from "../pages/Shared/Footer/Footer.jsx";

const Main = () => {
    
    return (
        <div className="dark:text-gray-100 dark:bg-slate-800 duration-100">
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;