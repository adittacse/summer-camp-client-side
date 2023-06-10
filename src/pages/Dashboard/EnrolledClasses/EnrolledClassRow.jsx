import React from 'react';
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import {useQuery} from "@tanstack/react-query";

const EnrolledClassRow = ({ enrolledClass }) => {
    const [axiosSecure] = useAxiosSecure();
    
    // const { data: enrolledClassRow = [] } = useQuery(["enrolledClassRow"], async () => {
    //     const res = await axiosSecure.get("/class/enrolled", { params: { classesId: enrolledClass.classesId } });
    //     return res.data;
    // });
    
    const { data: enrolledClassRow = [] } = useQuery(["enrolledClassRow"], async () => {
        const res = await axiosSecure.get("/class/enrolled", { params: { classesId: enrolledClass.classesId } });
        return res.data;
    });
    
    return (
        <>
            {
                enrolledClassRow.map((enrolledClass, index) => <tr key={enrolledClass._id}>
                        <th>{index}</th>
                        <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={enrolledClass.image} alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">{enrolledClass.className}</div>
                                </div>
                            </div>
                        </td>
                        <td>{enrolledClass.instructorName}</td>
                        <td>${enrolledClass.price}</td>
                    </tr>
                )
            }
        </>
    );
};

export default EnrolledClassRow;