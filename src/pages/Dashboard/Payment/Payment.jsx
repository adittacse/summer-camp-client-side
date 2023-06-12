import React from 'react';
import {Helmet} from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle.jsx";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm.jsx";
import {useLocation} from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const location = useLocation();
    const { state: paymentProps } = location;
    const { myClass, price } = paymentProps;
    
    return (
        <div className="w-[95%] mx-auto">
            <Helmet>
                <title>Payment | Bistro Boss</title>
            </Helmet>
            <SectionTitle subHeading="Pay Now" heading="Payment"></SectionTitle>
            <div className="w-[50%] mx-auto mt-20">
                <Elements stripe={stripePromise}>
                    <CheckoutForm myClass={myClass} price={price}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;