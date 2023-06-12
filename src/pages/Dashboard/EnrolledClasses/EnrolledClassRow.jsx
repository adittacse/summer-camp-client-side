import React from 'react';

const EnrolledClassRow = ({ enrolledClass, index }) => {
    const {_id, classImage, className, instructorName, price, seats} = enrolledClass;
    
    return (
        <>
            {
                <tr key={_id}>
                    <td>{index +1}</td>
                    <td>
                        <div className="flex items-center space-x-3">
                            <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img src={classImage} alt="Avatar Tailwind CSS Component" />
                                </div>
                            </div>
                            <div>
                                <div className="font-bold">{className}</div>
                            </div>
                        </div>
                    </td>
                    <td>{instructorName}</td>
                    <td>${price}</td>
                </tr>
            }
        </>
    );
};

export default EnrolledClassRow;
