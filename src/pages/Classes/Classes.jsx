import React from 'react';
import {Helmet} from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";

const Classes = () => {
    return (
        <div className="max-w-screen-xl mx-auto">
            <Helmet>
                <title>Classes | TranquilZen</title>
            </Helmet>
            <SectionTitle heading="Our Classes"></SectionTitle>
        </div>
    );
};

export default Classes;