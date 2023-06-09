import React from 'react';

const ClassCard = ({ approvedClass }) => {
    const {image, className, instructorName, seats, price} = approvedClass;
    
    return (
        <div className="card w-96 bg-base-100 shadow-xl mt-8 mb-16">
            <figure><img src={image} alt="Class image" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {className}
                    <div className="badge badge-secondary">${price}</div>
                </h2>
                <p className="text-bold text-[17px]">Instructor: {instructorName}</p>
                <div className="card-actions justify-between flex items-center mt-4">
                    <div className="badge badge-outline text-[16px] p-4">{seats} Seats Available</div>
                    <button className="btn btn-primary btn-sm">Select</button>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;