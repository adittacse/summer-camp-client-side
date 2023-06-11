import React, {useEffect, useState} from 'react';
import useRole from "../../hooks/useRole.jsx";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";
import Swal from "sweetalert2";

const ClassCard = ({ approvedClass, handleAddToCart }) => {
    const [role] = useRole();
    const {image, className, instructorName, seats, price} = approvedClass;
    const [axiosSecure] = useAxiosSecure();
    const [classIdCount, setClassIdCount] = useState(0);
    const classId = approvedClass._id;
    const availableSeats = seats - classIdCount;
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosSecure.get(`/payments/count?classId=${classId}`);
                const { count } = response.data;
                setClassIdCount(count);
            } catch (error) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message}`,
                    footer: 'Something went wrong!',
                })
            }
        };
        
        fetchData()
            .then(() => {})
            .catch(error => {})
    }, [axiosSecure, classId]);
    
    
    // Add a CSS class based on the condition
    const cardClass = availableSeats == 0 ? "card w-96 bg-base-100 shadow-xl border-4 border-red-500" : "card w-96 bg-base-100 shadow-xl";
    
    return (
        <div className={cardClass}>
            <figure>
                <img src={image} alt="SeeClasses image" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {className}
                    <div className="badge badge-secondary">${price}</div>
                </h2>
                <p className="text-bold text-[17px]">Instructor: {instructorName}</p>
                <p className="text-bold text-[17px]">Total Seats: {seats}</p>
                <div className="card-actions justify-between flex items-center mt-4">
                    <div className="badge badge-outline text-[16px] p-4">{
                        availableSeats < 2 ? `${availableSeats} Seat Available` : `${availableSeats} Seats Available`
                    }</div>
                    <button onClick={() => handleAddToCart(approvedClass)} disabled={availableSeats == 0 || role === "Admin" || role === "Instructor"} className="btn btn-primary btn-sm">Select</button>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;