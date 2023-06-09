import React from 'react';
import {Helmet} from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle.jsx";

const SelectedClass = () => {
    return (
        <div className="w-[95%] mx-auto">
            <Helmet>
                <title>Selected Classes | TranquilZen</title>
            </Helmet>
            <SectionTitle heading="My Selected Classes"></SectionTitle>
            
            
        </div>
    );
};

export default SelectedClass;