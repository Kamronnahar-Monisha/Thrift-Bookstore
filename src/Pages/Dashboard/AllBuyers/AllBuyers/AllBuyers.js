import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../Context/AuthProvider';
import { useLogOutTheUser } from '../../../../hooks/useLogOutTheUser';
import Loader from '../../../Shared/Loader/Loader';
import Buyer from '../Buyer/Buyer';
import './AllBuyers.css';
import {Helmet} from 'react-helmet-async';

const AllBuyers = () => {
    const { user } = useContext(AuthContext);
    const logOutUser = useLogOutTheUser();

    const { data: allBuyer = [], refetch, isLoading } = useQuery({
        queryKey: ['allBuyer', user.email],
        queryFn: async () => {
            const res = await fetch(`https://thrift-bookstore-server-side.vercel.app/users/role?email=${user.email}&role=buyer`, {
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
        <div className='my-5'>
            <Helmet>
                <title>All Buyers</title>
            </Helmet>
            <table className="table table-hover table-responsive">
                <tbody>
                    {
                        isLoading ?
                            <Loader></Loader>
                            :
                            <>
                                {
                                    allBuyer.map(buyer => <Buyer key={buyer._id} buyer={buyer} refetch={refetch}></Buyer>)
                                }
                            </>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllBuyers;