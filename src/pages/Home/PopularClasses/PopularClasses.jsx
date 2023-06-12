import React, {useEffect, useState} from 'react';
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart.jsx";
import useAuth from "../../../hooks/useAuth.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import ClassCard from "../../Classes/ClassCard.jsx";

const PopularClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const [topClasses, setTopClasses] = useState([]);
    const {user} = useAuth();
    const [cart, refetch] = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        const fetchTopClasses = async () => {
            try {
                const response = await axiosSecure.get('/classes/top');
                setTopClasses(response.data);
            } catch (error) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message}`,
                    footer: 'Something went wrong!',
                })
            }
        };
        
        fetchTopClasses()
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
        <div>
            <h2 className="text-3xl font-bold text-center mt-16">Popular Classes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-10 mt-16 mb-16">
                
                {
                    topClasses.map(approvedClass => <ClassCard key={approvedClass._id}
                                                               approvedClass={approvedClass}
                                                               handleAddToCart={handleAddToCart}></ClassCard>)
                }
            </div>
        </div>
    );
};

export default PopularClasses;