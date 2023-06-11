import React from 'react';
import {Helmet} from "react-helmet-async";
import Slider from "../Slider/Slider.jsx";
import PopularClasses from "../PopularClasses/PopularClasses.jsx";

const Home = () => {
    return (
        <div className="max-w-screen-xl mx-auto">
            <Helmet>
                <title>Home | TranquilZen</title>
            </Helmet>
            
            <Slider></Slider>
            <PopularClasses></PopularClasses>
        </div>
    );
};

export default Home;