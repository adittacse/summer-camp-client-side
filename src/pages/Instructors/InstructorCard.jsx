import React from 'react';

const InstructorCard = ({ instructor }) => {
    const {image, name, email, totalClasses, classNames} = instructor;
    
    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <div className="flex">
                <figure><img className="rounded-xl w-72 h-72" src={image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{name} <div className="badge badge-secondary">{totalClasses} Classes</div></h2>
                    <p className="text-[16px] font-semibold mb-4">Email: {email}</p>
                    <ul>
                        <p className="text-base font-bold">Class Names:</p>
                        {
                            classNames.map((className, index) => (
                                    <li className="text-[16px]" key={index}>{`${index + 1}. ${className}`}</li>
                                )
                            )
                        }
                    </ul>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">See Classes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorCard;