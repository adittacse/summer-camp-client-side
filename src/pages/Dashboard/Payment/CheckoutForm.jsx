import React, {useEffect, useState} from 'react';
import {CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import useAuth from "../../../hooks/useAuth.jsx";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import Swal from "sweetalert2";

const CheckoutForm = ({ cart, price }) => {
    const stripe = useStripe();
    const elements = useElements();
    const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [cardError, setCardError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState("");
    
    useEffect( () => {
        if (price > 0) {
            axiosSecure.post("/create-payment-intent", { price })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [price, axiosSecure]);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!stripe || !elements) {
            return;
        }
        
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }
        
        const {error} = await stripe.createPaymentMethod({
            type: "card",
            card
        });
        
        if (error) {
            setCardError(error.message);
        } else {
            setCardError("");
        }
        
        setProcessing(true);
        
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || "Anonymous User",
                        email: user?.email || "Unknown",
                    },
                },
            },
        );
        
        if (confirmError) {
            setCardError(confirmError.message);
        }
        
        setProcessing(false);
        
        try {
            if (paymentIntent.status === "succeeded") {
                setTransactionId(paymentIntent.id);
                // save payment information to the server
                const payment = {
                    email: user?.email,
                    transactionId: paymentIntent.id,
                    price,
                    date: new Date(),
                    quantity: cart.length,
                    cartItems: cart.map(item => item._id),
                    menuItems: cart.map(item => item.classId),
                    status: "Service Pending",
                    itemName: cart.map(item => item.className),
                }
                axiosSecure.post("/payments", payment)
                    .then(res => {
                        if (res.data.insertResult.insertedId) {
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Payment Succeed',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        }
                    })
            }
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Please type card information correctly!",
                footer: 'Something went wrong!',
            })
        }
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '20px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-primary px-28 mt-10 flex mx-auto" type="submit"
                        disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {
                cardError && <p className="text-warning text-center mt-8">{cardError}</p>
            }
            {
                transactionId && <p className="text-success text-center mt-8">Transaction complete with Transaction id {transactionId}</p>
            }
        </div>
    );
};

export default CheckoutForm;