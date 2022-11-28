import React, { useContext } from 'react';
import './MyOrderCard.css';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useLogOutTheUser } from '../../../../hooks/useLogOutTheUser';
import { AuthContext } from '../../../../Context/AuthProvider';
import { Link } from 'react-router-dom';

const MyOrderCard = ({ order}) => {
    const { user } = useContext(AuthContext);
    const logOutUser = useLogOutTheUser();

    const { data: product = {}, isLoading } = useQuery({
        queryKey: ['product', user.email, order.productId],
        queryFn: async () => {
            const res = await fetch(`https://thrift-bookstore-server-side.vercel.app/products/${order.productId}?email=${user.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            if ((res.status === 403) || (res.status === 401)) {
                toast.error("Unauthorized Access.");
                logOutUser();
            }
            const data = await res.json();
            console.log(data);
            return data;
        }
    });

    return (
        <div className='col-lg-6'>
            <div className='shadow rounded'>
                <div className='p-3 text-center'>
                    <img src={product?.img} alt="category" className='w-100 rounded' height="500px" />
                    <p className='fs-4 text-capitalize theme-color'>{product?.name} </p>
                    <p className='text-capitalize text-muted'>resale Price : {product?.resalePrice}$</p>
                    <p className='text-capitalize text-muted'>original Price : {product?.originalPrice}$</p>
                    {
                        order.paid ?
                            <button className='btn-sm theme-button' disabled> Paid</button>
                            :
                            <Link to={`/dashboard/payment/${order._id}`}>
                                <button className='btn-sm theme-button'> Pay</button>
                            </Link>

                    }
                </div>
            </div>
        </div>
    );
};

export default MyOrderCard;