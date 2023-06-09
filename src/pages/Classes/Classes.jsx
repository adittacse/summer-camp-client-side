import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";
import ClassCard from "./ClassCard.jsx";

const Classes = () => {
    const [axiosSecure] = useAxiosSecure();
    const [approvedClasses, setApprovedClasses] = useState([]);
    
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
    
    return (
        <div className="max-w-screen-xl mx-auto">
            <Helmet>
                <title>Classes | TranquilZen</title>
            </Helmet>
            <SectionTitle heading="Our Classes"></SectionTitle>
            
            <div className="grid grid-cols-3 justify-items-center">
                {
                    approvedClasses.map(approvedClass => <ClassCard key={approvedClass._id} approvedClass={approvedClass}></ClassCard>)
                }
            </div>
        </div>
    );
};

export default Classes;