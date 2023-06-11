import React from 'react';
import {Helmet} from "react-helmet-async";
import Slider from "../Slider/Slider.jsx";
import PopularClasses from "../PopularClasses/PopularClasses.jsx";
import PopularInstructors from "../PopularInstructors/PopularInstructors.jsx";

const Home = () => {
    return (
        <div className="max-w-screen-xl mx-auto">
            <Helmet>
                <title>Home | TranquilZen</title>
            </Helmet>
            
            <Slider></Slider>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
        </div>
    );
};

export default Home;