import React from 'react';
import {Outlet, useLocation} from "react-router-dom";
import NavBar from "../pages/Shared/NavBar/NavBar.jsx";
import Footer from "../pages/Shared/Footer/Footer.jsx";

const Main = () => {
    
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;