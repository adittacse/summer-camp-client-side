import React from 'react';
import {Link} from "react-router-dom";

const BonusSection = () => {
    const img = "https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8eW9nYXxlbnwwfDF8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60";
    
    return (
        <div className="hero min-h-screen ">
            <div className="hero-content bg-base-200 rounded-3xl flex-col lg:flex-row-reverse justify-between px-20">
                <img src={img} className="max-w-sm rounded-lg shadow-2xl w-1/2" />
                <div className="w-1/2">
                    <h1 className="text-5xl font-bold">Discover Inner Harmony: Embrace Yoga and Meditation for Mind, Body, and Soul</h1>
                    <p className="py-6">Yoga is the journey of the self, through the self, to the self. It is a path of self-discovery, inner peace, and physical and mental well-being. Meditation, on the other hand, is the art of finding stillness and clarity within the chaos of life. Together, yoga and meditation offer a profound means to cultivate balance, harmony, and a deeper connection with oneself and the world around us.</p>
                    <Link to="">
                        <button className="btn btn-warning">See Classes</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BonusSection;