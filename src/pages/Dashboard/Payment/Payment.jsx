import React from 'react';
import useCart from "../../../hooks/useCart.jsx";
import {Helmet} from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle/SectionTitle.jsx";
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm.jsx";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const [cart] = useCart();
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const price = parseFloat(total.toFixed(2));
    
    return (
        <div className="w-[95%] mx-auto">
            <Helmet>
                <title>Payment | Bistro Boss</title>
            </Helmet>
            <SectionTitle subHeading="Pay Now" heading="Payment"></SectionTitle>
            <div className="w-[50%] mx-auto mt-20">
                <Elements stripe={stripePromise}>
                    <CheckoutForm cart={cart} price={price}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;