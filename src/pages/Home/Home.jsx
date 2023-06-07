import React from 'react';
import {Helmet} from "react-helmet-async";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Home | TranquilZen</title>
            </Helmet>
            <h2 className="text-3xl">this is home</h2>
        </div>
    );
};

export default Home;