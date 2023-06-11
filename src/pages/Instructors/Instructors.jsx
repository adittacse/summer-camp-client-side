import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";
import InstructorCard from "./InstructorCard.jsx";
import Swal from "sweetalert2";

const Instructors = () => {
    const [axiosSecure] = useAxiosSecure();
    const [instructors, setInstructors] = useState([]);
    
    useEffect( () => {
        const fetchInstructors = async () => {
            try {
                const response = await axiosSecure.get("/users/role/Instructor");
                setInstructors(response.data);
            } catch (error) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message}`,
                    footer: 'Something went wrong!',
                })
            }
        }
        
        fetchInstructors()
            .then(res => {})
            .catch(error => {});
    }, []);
    
    return (
        <div className="max-w-screen-xl mx-auto">
            <Helmet>
                <title>Selected Classes | TranquilZen</title>
            </Helmet>
            <SectionTitle heading="Meet Our Instructors"></SectionTitle>
            
            <div className="grid md:grid-cols-2 gap-10 mt-8 mb-16">
                {
                    instructors.map(instructor => <InstructorCard
                        key={instructor._id}
                        instructor={instructor}></InstructorCard>)
                }
            </div>
        </div>
    );
};

export default Instructors;