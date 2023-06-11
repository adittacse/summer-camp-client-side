import React from 'react';

const InstructorCard = ({ instructor }) => {
    const {image, name, email, totalClasses, classNames} = instructor;
    
    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <div>
                <figure><img className="rounded-xl w-60 h-60" src={image} alt="Instructor image" /></figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {name}
                        <div className="badge badge-secondary">
                            {totalClasses >= 2 ? `${totalClasses} Classes` : `${totalClasses} Class`}
                        </div>
                    </h2>
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
                </div>
                <div className="card-actions justify-center pb-8">
                    <button className="btn btn-primary">See Classes</button>
                </div>
            </div>
        </div>
    );
};

export default InstructorCard;