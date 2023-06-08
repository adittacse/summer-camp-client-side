import React from 'react';
import SectionTitle from "../../../components/SectionTitle/SectionTitle.jsx";
import {Helmet} from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import {useQuery} from "@tanstack/react-query";
import {MdAdminPanelSettings} from "react-icons/md";
import {FaUserTie} from "react-icons/fa";

const ManageUsers = () => {
    const [axiosSecure] = useAxiosSecure();
    
    const {data: users = [], refetch} = useQuery(["users"], async () => {
        const res = await axiosSecure.get("/users");
        return res.data;
    });
    
    return (
        <div className="w-[95%] mx-auto">
            <Helmet>
                <title>Home | TranquilZen</title>
            </Helmet>
            <SectionTitle heading="Manage Users"></SectionTitle>
            
            <div className="overflow-x-auto mt-12">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email / GitHub Name</th>
                        <th>Current Role</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.map((user, index) => <tr key={user._id}>
                            <th>{index + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button
                                    title="Make Admin"
                                    className={`btn bg-emerald-800 text-white mr-4 ${user.role === 'Admin' ? 'disabled' : ''}`}
                                    disabled={user.role === 'Admin'}
                                >
                                    <MdAdminPanelSettings></MdAdminPanelSettings> Make Admin
                                </button>
                                
                                <button
                                    title="Make Instructor"
                                    className={`btn bg-emerald-800 text-white mr-4 ${user.role === 'Instructor' ? 'disabled' : ''}`}
                                    disabled={user.role === 'Instructor'}
                                >
                                    <FaUserTie></FaUserTie> Make Instructor
                                </button>
                            </td>
                        </tr>
                        )
                    }
                    </tbody>
                
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;