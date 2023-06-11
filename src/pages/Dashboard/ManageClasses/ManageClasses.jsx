import React, { useRef } from 'react';
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle.jsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageClasses = () => {
    const modalRefs = useRef({});
    const textareaRefs = useRef({});
    
    const [axiosSecure] = useAxiosSecure();
    
    const { data: classes = [], refetch } = useQuery(["classes"], async () => {
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
                    await Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${item.className} is Approved`,
                        showConfirmButton: false,
                        timer: 1500
                    })
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
    
    const handleDenyClass = (item) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Deny ${item.className} class?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Deny Class!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axiosSecure.patch(`/class/deny/${item._id}`);
                    refetch();
                    await Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${item.className} is Denied`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    handleModal(item);
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
    
    const handleModal = (item) => {
        // Open the modal using the showModal() method
        if (modalRefs.current[item._id]) {
            modalRefs.current[item._id].showModal();
        }
    };
    
    const handleSendFeedback = async (item) => {
        // Retrieve the value from the textarea
        const feedbackValue = textareaRefs.current[item._id].value;
        
        try {
            await axiosSecure.patch(`/class/feedback/${item._id}`, {
                feedback: feedbackValue
            });

            // Close the modal
            modalRefs.current[item._id]?.close();

            refetch();
            await Swal.fire(
                'Congratulations!',
                'Feedback sent successfully!',
                'success');

            // Clear the textarea
            textareaRefs.current[item._id].value = '';
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error.message}`,
                footer: 'Something went wrong!',
            })
        }
    };
    
    
    return (
        <div className="w-[95%] mx-auto">
            <Helmet>
                <title>Home | TranquilZen</title>
            </Helmet>
            <SectionTitle heading="Manage Classes" />
            
            <div className="overflow-x-auto mt-12">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr className="items-center">
                        <th>#</th>
                        <th>SeeClasses</th>
                        <th>Total Seats</th>
                        <th>Instructor </th>
                        <th>Status</th>
                        <th className="text-center">Actions</th>
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
                                            <img src={item.image} alt="SeeClasses image" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{item.className}</div>
                                        <div className="text-sm opacity-50">Price: ${item.price}</div>
                                    </div>
                                </div>
                            </td>
                            <td>{item.seats}</td>
                            <td>
                                <div>
                                    <div className="font-bold">{item.instructorName}</div>
                                    <div className="text-sm opacity-50">{item.instructorEmail}</div>
                                </div>
                            </td>
                            <td>{item.status}</td>
                            <th className="text-center">
                                <button onClick={() => handleApproveClass(item)}
                                        className={`btn btn-outline btn-success btn-xs mr-1 ${item.status === 'Approved' ? 'disabled' : ''}`}
                                        disabled={item.status === 'Approved'}>Approve</button>
                                <button onClick={() => handleDenyClass(item)}
                                        className={`btn btn-outline btn-error btn-xs mr-1 ${item.status === 'Denied' ? 'disabled' : ''}`}
                                        disabled={item.status === 'Denied'}>Deny</button>
                                <button onClick={() => handleModal(item)}
                                        className="btn btn-outline btn-info btn-xs hover:bg-secondary">Feedback</button>
                                
                                <dialog ref={ref => modalRefs.current[item._id] = ref} className="modal modal-bottom sm:modal-middle">
                                    <form method="dialog" className="modal-box">
                                        <h3 className="font-bold text-lg">Feedback!</h3>
                                        <textarea ref={ref => textareaRefs.current[item._id] = ref} className="w-full mt-6 p-2 border-black" name="feedback" id="feedback" cols="30" rows="10"></textarea>
                                        <p className="py-4">Press the ESC key or click the button below to close</p>
                                        <div className="modal-action flex justify-center">
                                            <input onClick={() => handleSendFeedback(item)} className="btn btn-primary" type="submit" value="Send Feedback" />
                                            {/* If there is a button in the form, it will close the modal */}
                                            <button className="btn" onClick={() => modalRefs.current[item._id]?.close()}>Close</button>
                                        </div>
                                    </form>
                                </dialog>
                            </th>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageClasses;
