import React, { useContext } from 'react';
import './MyOrder.css';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../Context/AuthProvider';
import { useLogOutTheUser } from '../../../../hooks/useLogOutTheUser';
import Loader from '../../../Shared/Loader/Loader';
import MyOrderCard from '../MyOrderCard/MyOrderCard';
import { Helmet} from 'react-helmet-async';

const MyOrder = () => {
    const {user}=useContext(AuthContext);
    const logOutUser = useLogOutTheUser();

    const { data: myOrder = [], refetch, isLoading } = useQuery({
        queryKey: ['myOrder', user.email],
        queryFn: async () => {
            const res = await fetch(`https://thrift-bookstore-server-side.vercel.app/orders?email=${user.email}`,{
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
            if((res.status === 403) || (res.status===401)){
                toast.error("Unauthorized Access.");
                logOutUser();
            }
            const data = await res.json();
            console.log(data);
            return data;
        }
    });
    return (
        <div className='container'>
            <Helmet>
                <title>Your Orders</title>
            </Helmet>
            <div className="row justify-content-center align-items-center mb-5 mt-1 g-5">
                {
                    isLoading?
                    <Loader></Loader>
                    :
                    <>
                        {
                            myOrder.map(order=><MyOrderCard key={order._id} order={order}></MyOrderCard>)
                        }
                    </>
                }
            </div>
        </div>
    );
};

export default MyOrder;