import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const CheckoutForm = ({ order, product }) => {
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [clientSecret, setClientSecret] = useState("");
    const [buyer, setBuyer] = useState({});
    const navigate = useNavigate();
    const [complete,setComplete]=useState(false);

    const stripe = useStripe();
    const elements = useElements();
    // const { price, email, patient, _id } = order;
    const { buyerEmail, _id: orderID } = order;
    const { resalePrice ,_id:productId} = product;

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("http://localhost:5000/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ resalePrice }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("fetch intent");
                setClientSecret(data.clientSecret)
            });
    }, [resalePrice]);

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch(`http://localhost:5000/users?email=${buyerEmail}`)
            .then((res) => res.json())
            .then((data) => setBuyer(data));
    }, [buyerEmail]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            console.log(error);
            setCardError(error.message);
        }
        else {
            setCardError('');
        }
        setSuccess('');
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: buyer.name,
                        email: buyerEmail
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }
        if (paymentIntent.status === "succeeded") {
            console.log('card info', card);
            // store payment info in the database
            const payment = {
                resalePrice,
                productId,
                transactionId: paymentIntent.id,
                buyerEmail,
                orderId: orderID
            }
            fetch('http://localhost:5000/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.insertedId) {
                        setSuccess('Congrats! your payment completed');
                        setTransactionId(paymentIntent.id);
                        setComplete(true);
                        toast.success("Payment complete successfully");
                        navigate('/dashboard/myOrders');
                    }
                })
        }


    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
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
                <button
                    className='btn-sm theme-button mt-4'
                    type="submit"
                    disabled={!stripe || !clientSecret}>
                    Pay
                </button>

            </form>
            <p className="text-danger">{cardError}</p>
            {
                success && <div>
                    <p className='text-success'>{success}</p>
                    <p>Your transactionId: <span className='fw-bold'>{transactionId}</span></p>
                </div>
            }
            {
                complete&& 
                <Link to='/dashboard/myOrders'>
                    <button className='btn-sm theme-button-outline mt-4'>Back to Your OrderList</button>
                </Link>
            }
        </>
    );
};

export default CheckoutForm;