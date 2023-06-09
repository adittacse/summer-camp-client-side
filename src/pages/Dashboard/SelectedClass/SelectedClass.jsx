import React from 'react';
import {Helmet} from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle.jsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import Swal from "sweetalert2";
import {RiDeleteBin5Line} from "react-icons/ri";
import useCart from "../../../hooks/useCart.jsx";
import {Link} from "react-router-dom";

const SelectedClass = () => {
    const [axiosSecure] = useAxiosSecure();
    const [cart, refetch] = useCart();
    
    const totalPrice = cart.reduce((sum, item) => item.price + sum, 0);
    
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
                            refetch();
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
            
            <div className="flex justify-evenly items-center w-[95%] mx-auto font-semibold mt-10">
                <h3 className="text-xl uppercase">Total Orders: {cart.length}</h3>
                <h3 className="text-xl uppercase">Total Price: ${totalPrice.toFixed(2)}</h3>
                <Link to="/dashboard/payment">
                    <button className="btn btn-warning">Pay</button>
                </Link>
            </div>
            
            <div className="overflow-x-auto w-[95%] mx-auto mt-10">
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
                        cart.map((selectedClass, index) => <tr key={selectedClass._id}>
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