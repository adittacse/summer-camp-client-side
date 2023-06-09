import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet-async";
import SectionTitle from "../../components/SectionTitle/SectionTitle.jsx";
import useAxiosSecure from "../../hooks/useAxiosSecure.jsx";

const Instructors = () => {
    const [axiosSecure] = useAxiosSecure();
    
    const [instructors, setInstructors] = useState([]);
    
    useEffect( () => {
        const fetchDeniedClasses = async () => {
            try {
                // const response = await axiosSecure.get("/users/role/Instructor");
                const response = await axiosSecure.get("/users");
                setInstructors(response.data);
            } catch (error) {
                console.error('Error fetching denied classes:', error);
            }
        }
        
        fetchDeniedClasses()
            .then(res => {})
            .catch(error => {});
    }, []);
    
    return (
        <div className="max-w-screen-xl mx-auto">
            <Helmet>
                <title>Selected Classes | TranquilZen</title>
            </Helmet>
            <SectionTitle heading="Meet Our Instructors"></SectionTitle>
            
            <div className="grid md:grid-cols-3 gap-10 mt-16 mb-16">
                {
                    instructors.map(instructor => <div key={instructor._id}>
                            <div className="card w-96 bg-base-100 shadow-xl">
                                <figure><img className="w-80 h-72" src={instructor.image} alt="Shoes" /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{instructor.name}</h2>
                                    <p>{instructor.email}</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">See Classes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Instructors;