import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../Context/AuthProvider';
import { useLogOutTheUser } from '../../../../hooks/useLogOutTheUser';
import Loader from '../../../Shared/Loader/Loader';
import WishListCard from '../WishListCard/WishListCard';
import './WishList.css';
import {Helmet} from 'react-helmet-async';

const WishList = () => {
    const { user } = useContext(AuthContext);
    const logOutUser = useLogOutTheUser();

    const { data: wishList = [], refetch, isLoading } = useQuery({
        queryKey: ['wishList', user.email],
        queryFn: async () => {
            const res = await fetch(`https://thrift-bookstore-server-side.vercel.app/wishList?email=${user.email}`, {
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
        <div className='container'>
            <Helmet>
                <title>Your Wish List</title>
            </Helmet>
            <div className="row justify-content-center align-items-center mb-5 mt-1 g-5">
                {
                    isLoading ?
                        <Loader></Loader>
                        :
                        <>
                            {
                                wishList.map(wishListItem => <WishListCard key={wishListItem._id} wishListItem={wishListItem} ></WishListCard>)
                            }
                        </>
                }
            </div>
        </div>
    );
};

export default WishList;