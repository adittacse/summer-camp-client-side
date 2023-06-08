import React from 'react';
import {Helmet} from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle.jsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import {useQuery} from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    
    const {data: classes = [], refetch} = useQuery(["classes"], async () => {
        const res = await axiosSecure.get("/class");
        return res.data;
    });
    
    const handleApproveClass = (item) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Approve ${item.className} class?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Approve Class!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.patch(`/class/approve/${item._id}`);
                    refetch();
                    await Swal.fire(
                        'Congratulations!',
                        `${item.className} is Approved`,
                        'success');
                } catch (error) {
                    await Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${error.message}`,
                        footer: 'Something went wrong!',
                    })
                }
            }
        });
    };
    
    return (
        <div className="w-[95%] mx-auto">
            <Helmet>
                <title>Home | TranquilZen</title>
            </Helmet>
            <SectionTitle heading="Manage Classes"></SectionTitle>
            
            <div className="overflow-x-auto mt-12">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr className="items-center">
                        <th>#</th>
                        <th>Class Name</th>
                        <th>Available Seats</th>
                        <th>Price</th>
                        <th>Instructor </th>
                        <th>Status</th>
                        <th className="text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        classes.map((item, index) => <tr key={item._id}>
                            <th>{index + 1}</th>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{item.className}</div>
                                    </div>
                                </div>
                            </td>
                            <td>{item.seats}</td>
                            <td>${item.price}</td>
                            <td>
                                <div>
                                    <div className="font-bold">{item.instructorName}</div>
                                    <div className="text-sm opacity-50">{item.instructorEmail}</div>
                                </div>
                            </td>
                            <td>{item.status}</td>
                            <th className="text-center hover:text-white">
                                <button onClick={() => handleApproveClass(item)} className="btn btn-ghost btn-xs hover:bg-green-700">Approve</button>
                                <button className="btn btn-ghost btn-xs hover:bg-red-700">Deny</button>
                                <button className="btn btn-ghost btn-xs hover:bg-secondary">Feedback</button>
                            </th>
                        </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageClasses;