import React, {useEffect, useState} from 'react';
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import InstructorCard from "../../Instructors/InstructorCard.jsx";
import TopInstructor from "./TopInstructor.jsx";
import Swal from "sweetalert2";

const PopularInstructors = () => {
    const [axiosSecure] = useAxiosSecure();
    const [instructors, setInstructors] = useState([]);
    
    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                const response = await axiosSecure.get('/api/instructors');
                setInstructors(response.data);
            } catch (error) {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${error.message}`,
                    footer: 'Something went wrong!',
                })
            }
        };
        
        fetchInstructors()
            .then(() => {})
            .catch(error => {})
    }, []);
    
    return (
        <div>
            <h2 className="text-3xl font-bold text-center mt-20">Popular Instructors</h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-10 mt-16 p-4">
                {
                    instructors.map(instructor => <TopInstructor key={instructor._id}
                                                                  instructor={instructor}></TopInstructor>)
                }
            </div>
        </div>
    );
};

export default PopularInstructors;