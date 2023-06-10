import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../components/SectionTitle/SectionTitle.jsx';
import useAxiosSecure from '../../../hooks/useAxiosSecure.jsx';
import useAuth from '../../../hooks/useAuth.jsx';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyClasses = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [classes, setClasses] = useState([]);
    const [countEnrolledStudent, setCountEnrolledStudent] = useState([]);
    
    useEffect(() => {
        const fetchDeniedClasses = async () => {
            try {
                const response = await axiosSecure.get(`/class?instructorEmail=${user.email}`);
                setClasses(response.data);
            } catch (error) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message}`,
                    footer: 'Something went wrong!',
                });
            }
        };
        
        fetchDeniedClasses()
            .then((res) => {})
            .catch((error) => {});
    }, []);
    
    useEffect(() => {
        if (classes.length > 0) {
            const currentClassId = classes.map((item) => item._id);
            const counts = [];
            
            const fetchData = async () => {
                try {
                    for (let i = 0; i < currentClassId.length; i++) {
                        const response = await axiosSecure.get(
                            `/payments/count?classId=${currentClassId[i]}`
                        );
                        const { count } = response.data;
                        counts.push(count);
                    }
                    setCountEnrolledStudent(counts);
                } catch (error) {
                    await Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${error.message}`,
                        footer: 'Something went wrong!',
                    });
                }
            };
            
            fetchData()
                .then(() => {})
                .catch((error) => {});
        }
    }, [axiosSecure, classes]);
    
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
                    {classes.map((item, index) => (
                        <tr key={item._id}>
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
                            <td>{countEnrolledStudent[index] || 0}</td>
                            <td>{item.seats - countEnrolledStudent[index] || 0}</td>
                            <td>{item.status}</td>
                            <td>{item.feedback}</td>
                            <th>
                                <Link to={`/dashboard/update-class/${item._id}`}>
                                    <button className="btn btn-ghost btn-xs hover:bg-green-700 hover:text-white">
                                        Update Class
                                    </button>
                                </Link>
                            </th>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyClasses;
