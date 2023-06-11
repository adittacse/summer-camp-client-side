import React from 'react';
import {Helmet} from "react-helmet-async";
import Slider from "../Slider/Slider.jsx";
import PopularClasses from "../PopularClasses/PopularClasses.jsx";
import PopularInstructors from "../PopularInstructors/PopularInstructors.jsx";
import BonusSection from "../BonusSection/BonusSection.jsx";

const Home = () => {
    return (
        <div className="max-w-screen-xl mx-auto">
            <Helmet>
                <title>Home | TranquilZen</title>
            </Helmet>
            
            <Slider></Slider>
            <PopularClasses></PopularClasses>
            <PopularInstructors></PopularInstructors>
            <BonusSection></BonusSection>
        </div>
    );
};

export default Home;