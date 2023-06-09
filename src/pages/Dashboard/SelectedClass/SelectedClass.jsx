import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle.jsx";
import useAuth from "../../../hooks/useAuth.jsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import Swal from "sweetalert2";
import {RiDeleteBin5Line} from "react-icons/ri";

const SelectedClass = () => {
    const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [selectedClasses, setSelectedClasses] = useState([]);
    
    useEffect( () => {
        const fetchSelectedClasses = async () => {
            try {
                const response = await axiosSecure.get(`/carts?email=${user.email}`);
                setSelectedClasses(response.data);
            } catch (error) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message}`,
                    footer: 'Something went wrong!'
                })
            }
        }
        
        fetchSelectedClasses()
            .then(res => {})
            .catch(error => {});
    }, []);
    
    const handleDelete = (item) => {
        Swal.fire({
            title: `Are you want to delete ${item.className}?`,
            text: "You won't be able to restore this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/carts/${item._id}`)
                    .then(response => {
                        const data = response.data;
                        if (data.deletedCount > 0) {
                            // refetch();
                            Swal.fire(
                                'Deleted!',
                                'Class has been deleted.',
                                'success'
                            );
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `${error.message}`,
                            footer: 'Something went wrong!',
                        })
                    });
            }
        });
    }
    
    return (
        <div className="w-[95%] mx-auto">
            <Helmet>
                <title>Selected Classes | TranquilZen</title>
            </Helmet>
            <SectionTitle heading="My Selected Classes"></SectionTitle>
            
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Class</th>
                        <th>Instructor Name</th>
                        <th>Price</th>
                        <th className="text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        selectedClasses.map((selectedClass, index) => <tr key={selectedClass._id}>
                            <th>{index + 1}</th>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={selectedClass.image} alt="Selected class image" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{selectedClass.className}</div>
                                    </div>
                                </div>
                            </td>
                            <td>{selectedClass.instructorName}</td>
                            <td>${selectedClass.price}</td>
                            <th className="text-center">
                                <button onClick={() => handleDelete(selectedClass)} className="btn btn-sm bg-red-800 text-white">
                                    <RiDeleteBin5Line></RiDeleteBin5Line> Delete Class
                                </button>
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

export default SelectedClass;