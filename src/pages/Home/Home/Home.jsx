import React from 'react';
import {Helmet} from "react-helmet-async";
import Slider from "../Slider/Slider.jsx";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | TranquilZen</title>
            </Helmet>
            
            <Slider></Slider>
        </div>
    );
};

export default Home;