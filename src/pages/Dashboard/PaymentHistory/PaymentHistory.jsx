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
            
            <div className="overflow-x-auto w-[95%] mx-auto mt-16">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th>Order</th>
                        <th>Your Classes</th>
                        <th className="text-center">Price & Quantity</th>
                        <th className="text-center">Date & Time</th>
                        <th className="text-center">Transaction ID</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        payments.map((payment, index) => <tr key={payment._id}>
                                <th>#{payments.length - index}</th>
                                <ul>
                                    {
                                        payment.itemName.map((className, index) => (
                                                <li className="text-[16px]" key={index}>{`${index + 1}. ${className}`}</li>
                                            )
                                        )
                                    }
                                </ul>
                                <td className="text-center">$ {payment.price} for {payment.quantity} item</td>
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