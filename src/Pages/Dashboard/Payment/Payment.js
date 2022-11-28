import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLoaderData, useNavigation } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import { useLogOutTheUser } from '../../../hooks/useLogOutTheUser';
import Loader from '../../Shared/Loader/Loader';
import CheckoutForm from './CheckoutForm';



const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const order = useLoaderData();
    const navigation = useNavigation();
    const [product, setProduct] = useState({});
    const { productId } = order;
    const { user } = useContext(AuthContext);
    const logOutUser = useLogOutTheUser();

    useEffect(() => {
        fetch(`http://localhost:5000/products/${productId}?email=${user.email}`, {
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if ((res.status === 403) || (res.status === 401)) {
                    toast.error("Unauthorized Access.");
                    logOutUser();
                }
                return res.json()
            })
            .then(data=>setProduct(data));
    }, [productId,user.email])

    if (navigation.state === "loading") {
        return <Loader></Loader>
    }
    return (
        <div>
            <h3>Payment for {product.name}</h3>
            <p className="">Please pay <strong>${product.resalePrice}</strong> for purchasing your Order</p>
            <div className='w-75 my-5'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        order={order}
                        product={product}
                    />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;