import React from 'react';
import {Outlet, useLocation} from "react-router-dom";
import NavBar from "../pages/Shared/NavBar/NavBar.jsx";
import Footer from "../pages/Shared/Footer/Footer.jsx";

const Main = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes("error");
    
    return (
        <div>
            { noHeaderFooter || <NavBar></NavBar> }
            <Outlet></Outlet>
            { noHeaderFooter || <Footer></Footer> }
        </div>
    );
};

export default Main;