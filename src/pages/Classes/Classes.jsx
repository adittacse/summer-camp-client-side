import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";
import ClassCard from "./ClassCard.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth.jsx";
import Swal from "sweetalert2";
import useCart from "../../hooks/useCart.jsx";

const Classes = () => {
    const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [approvedClasses, setApprovedClasses] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [cart, refetch] = useCart();
    
    useEffect( () => {
        const fetchInstructors = async () => {
            try {
                const response = await axiosSecure.get("/class?status=Approved");
                setApprovedClasses(response.data);
            } catch (error) {
                console.error('Error fetching approved classes:', error);
            }
        }
        
        fetchInstructors()
            .then(res => {})
            .catch(error => {});
    }, []);
    
    const handleAddToCart = (approvedClass) => {
        if (user && user.email) {
            const {_id, image, className, instructorName, price} = approvedClass;
            const mySelectedClass = {classId: _id, image, className, instructorName, price, email: user.email};
            
            // Check if the selected class already exists in the cart
            const existsInCart = cart.some(item => item.classId === mySelectedClass.classId);
            if (existsInCart) {
                // Handle the case when the class already exists in the cart
                Swal.fire({
                    icon: 'warning',
                    title: 'Class already in the cart',
                    text: `${className} is already in your cart.`,
                    footer: 'Please remove the existing item from the cart if you want to add it again.'
                });
                return;
            }
            
            axiosSecure.post('/carts', mySelectedClass)
                .then(response => {
                    const data = response.data;
                    if (data.insertedId) {
                        refetch();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: `${className} added to the cart!`,
                            showConfirmButton: false,
                            timer: 1500
                        });
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
        } else {
            Swal.fire({
                title: 'Please login to select the class',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", {state: {from: location}});
                }
            })
        }
    };
    
    return (
        <div className="max-w-screen-xl mx-auto">
            <Helmet>
                <title>Classes | TranquilZen</title>
            </Helmet>
            <SectionTitle heading="Our Classes"></SectionTitle>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mt-16 mb-16">
                {
                    approvedClasses.map(approvedClass => <ClassCard key={approvedClass._id}
                                                                    approvedClass={approvedClass}
                                                                    handleAddToCart={handleAddToCart}></ClassCard>)
                }
            </div>
        </div>
    );
};

export default Classes;