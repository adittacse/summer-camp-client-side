import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";
import ClassCard from "./ClassCard.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth.jsx";

const Classes = () => {
    const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [approvedClasses, setApprovedClasses] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    
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
    
    const handleAddToCart = (myClass) => {
        if (!user) {
            navigate('/login', { state: { from: location } });
        } else {
            console.log(myClass.className)
            console.log(myClass.seats)
        }
    };
    
    return (
        <div className="max-w-screen-xl mx-auto">
            <Helmet>
                <title>Classes | TranquilZen</title>
            </Helmet>
            <SectionTitle heading="Our Classes"></SectionTitle>
            
            <div className="grid grid-cols-3 justify-items-center mt-16 mb-16">
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