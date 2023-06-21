import React from 'react';

const TopInstructor = ({ instructor }) => {
    const {image, name, email, instructorClassCount} = instructor;
    
    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure>
                <img
                    className="rounded-xl w-60 h-60"
                    src={image}
                    alt="Instructor image"
                />
            </figure>
            <div className="card-body text-center">
                <h2 className="text-2xl font-semibold text-center">{name}</h2>
                <p className="text-[16px] font-semibold mb-4">{email}</p>
                <p className="text-[16px] font-semibold mb-4">Total Students: {instructorClassCount || 0}</p>
            </div>
        </div>
    );
};

export default TopInstructor;