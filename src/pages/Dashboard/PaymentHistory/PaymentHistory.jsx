import React from 'react';
import {Helmet} from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle.jsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import {useQuery} from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth.jsx";
import moment from 'moment';

const PaymentHistory = () => {
    const [axiosSecure] = useAxiosSecure();
    const {user} = useAuth();
    
    const {data: payments = []} = useQuery(["payments"], async () => {
        const res = await axiosSecure.get(`/payments?email=${user.email}`);
        return res.data;
    });
    
    return (
        <div className="w-[95%] mx-auto">
            <Helmet>
                <title>Payment History | TranquilZen</title>
            </Helmet>
            <SectionTitle heading="My Payment History"></SectionTitle>
            
            <div className="overflow-x-auto w-[95%] mx-auto mt-8">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Class</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Date & Time</th>
                        <th className="text-center">Transaction ID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        payments.map((payment, index) => <tr key={payment._id}>
                                <td>{payments.length - index}</td>
                            <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={payment.classImage} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{payment.className}</div>
                                    </div>
                                </div>
                            </td>
                                <td className="text-center">${payment.price}</td>
                                <td className="text-center">
                                    {moment(payment.date).format("D MMMM, YYYY")}
                                    <br/>
                                    <span className="badge badge-ghost badge-sm">{moment(payment.date).format("h:mm A")}</span>
                                </td>
                                <td className="text-center">${payment.transactionId}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;