import React from 'react';
import {Helmet} from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle.jsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import useAuth from "../../../hooks/useAuth.jsx";
import {useQuery} from "@tanstack/react-query";
import EnrolledClassRow from "./EnrolledClassRow.jsx";

const EnrolledClasses = () => {
    const [axiosSecure] = useAxiosSecure();
    const {user} = useAuth();
    
    const {data: enrolledClasses = []} = useQuery(["enrolledClasses"], async () => {
        const res = await axiosSecure.get(`/payments?email=${user.email}`);
        return res.data;
    });
    
    return (
        <div className="w-[95%] mx-auto">
            <Helmet>
                <title>Enrolled Classes | TranquilZen</title>
            </Helmet>
            <SectionTitle heading="My Enrolled Classes"></SectionTitle>
            
            <div className="overflow-x-auto w-[95%] mx-auto mt-8">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Class</th>
                        <th>Instructor</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {/*{*/}
                    {/*    enrolledClasses.map(items => console.log(items))*/}
                    {/*}*/}
                    {
                        enrolledClasses.map(enrolledClass => <EnrolledClassRow key={enrolledClass._id}
                                                                               enrolledClass={enrolledClass}></EnrolledClassRow>)
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EnrolledClasses;