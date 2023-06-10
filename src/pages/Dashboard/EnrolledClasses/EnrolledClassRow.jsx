import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure.jsx';
import { useQuery } from '@tanstack/react-query';

const EnrolledClassRow = ({ enrolledClass }) => {
    const [axiosSecure] = useAxiosSecure();
    
    const { data: classData = [] } = useQuery(['classData', enrolledClass.classesId], async () => {
        const res = await axiosSecure.get(`/class/enrolled?classesId=${enrolledClass.classesId}`);
        return res.data;
    });
    
    return (
        <>
            {classData.map((classItem, index) => (
                <tr key={classItem._id}>
                    <td>
                        <div className="flex items-center space-x-3">
                            <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img src={classItem.image} alt="Avatar Tailwind CSS Component" />
                                </div>
                            </div>
                            <div>
                                <div className="font-bold">{classItem.className}</div>
                            </div>
                        </div>
                    </td>
                    <td>{classItem.instructorName}</td>
                    <td>${classItem.price}</td>
                    <td className="text-center">{classItem.seats}</td>
                    <td className="text-center">{classItem.enrolledStudent}</td>
                </tr>
            ))}
        </>
    );
};

export default EnrolledClassRow;
