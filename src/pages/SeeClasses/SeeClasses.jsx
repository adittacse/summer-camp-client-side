import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import SeeClassCard from "./SeeClassCard.jsx";
import {Helmet} from "react-helmet-async";
import Swal from "sweetalert2";
import useCart from "../../hooks/useCart.jsx";
import useAuth from "../../hooks/useAuth.jsx";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";

const SeeClasses = () => {
    const { id } = useParams();
    const [classes, setClasses] = useState([]);
    const [instructor, setInstructor] = useState(null);
    const {user} = useAuth();
    const [cart, refetch] = useCart();
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch(`http://localhost:3000/see-classes/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setClasses(data.classes);
                    setInstructor(data.instructor);
                } else {
                    console.error('Error:', response.status);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        
        fetchClasses();
    }, [id]);
    
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
                    title: 'SeeClasses already in the cart',
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
                <title>Instructor Classes | TranquilZen</title>
            </Helmet>
            
            <div className="hero-content flex-col lg:flex-row mx-auto items-center mt-10 mb-10">
                <div>
                    <img className="w-60 h-60 rounded-full" src={instructor?.image} alt="Instructor image"/>
                </div>
                <div>
                    <h3 className="text-3xl font-semibold">{instructor?.name}</h3>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20 items-center justify-items-center">
                {
                    classes.map(classItem => <SeeClassCard key={classItem._id}
                                                           classItem={classItem}
                                                           handleAddToCart={handleAddToCart}></SeeClassCard>)
                }
            </div>
        </div>
    );
};

export default SeeClasses;
