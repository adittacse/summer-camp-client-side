import React from 'react';
import useRole from "../../hooks/useRole.jsx";

const ClassCard = ({ approvedClass }) => {
    const [role] = useRole();
    const {image, className, instructorName, seats, price} = approvedClass;
    
    // Add a CSS class based on the condition
    const cardClass = seats == 0 ? "card w-96 bg-base-100 shadow-xl mt-8 mb-16 border-4 border-red-500" : "card w-96 bg-base-100 shadow-xl mt-8 mb-16";
    
    return (
        <div className={cardClass}>
            <figure><img src={image} alt="Class image" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {className}
                    <div className="badge badge-secondary">${price}</div>
                </h2>
                <p className="text-bold text-[17px]">Instructor: {instructorName}</p>
                <div className="card-actions justify-between flex items-center mt-4">
                    <div className="badge badge-outline text-[16px] p-4">{
                        seats < 2 ? `${seats} Seat Available` : `${seats} Seats Available`
                    }</div>
                    <button disabled={seats == 0 || role === "Admin" || role === "Instructor"} className="btn btn-primary btn-sm">Select</button>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;