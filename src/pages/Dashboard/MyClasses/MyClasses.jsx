import React from 'react';
import {Helmet} from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle.jsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import useAuth from "../../../hooks/useAuth.jsx";
import {useQuery} from "@tanstack/react-query";
import {Link} from "react-router-dom";

const MyClasses = () => {
    const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    
    const { data: classes = [], refetch } = useQuery(["class"], async () => {
        const res = await axiosSecure.get(`/class?instructorEmail=${user.email}`);
        return res.data;
    });
    
    return (
        <div className="w-[95%] mx-auto">
            <Helmet>
                <title>My Classes | TranquilZen</title>
            </Helmet>
            <SectionTitle heading="My Classes" />
            
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Class</th>
                        <th>Total Seats</th>
                        <th>Enrolled Students</th>
                        <th>Available Seats</th>
                        <th>Status</th>
                        <th>Admin Feedback</th>
                        <th>Action</th>
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
                                            <img src={item.image} alt="Class image" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{item.className}</div>
                                        <div className="text-sm opacity-50">Price: ${item.price}</div>
                                    </div>
                                </div>
                            </td>
                            <td>{item.seats}</td>
                            <td>{item.enrolledStudent}</td>
                            <td>{item.seats - item.enrolledStudent}</td>
                            <td>{item.status}</td>
                            <td>{item.feedback}</td>
                            <th>
                                <Link to={`/dashboard/update-class/${item._id}`}>
                                    <button className="btn btn-ghost btn-xs hover:bg-green-700 hover:text-white">Update Class</button>
                                </Link>
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

export default MyClasses;