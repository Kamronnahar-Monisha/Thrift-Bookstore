import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../Context/AuthProvider';
import { useLogOutTheUser } from '../../../../hooks/useLogOutTheUser';
import Loader from '../../../Shared/Loader/Loader';
import Seller from '../Seller/Seller';
import './AllSellers.css';

const AllSellers = () => {
    const { user } = useContext(AuthContext);
    const logOutUser = useLogOutTheUser();

    const { data: allSeller = [], refetch, isLoading } = useQuery({
        queryKey: ['allSeller', user.email],
        queryFn: async () => {
            const res = await fetch(`https://thrift-bookstore-server-side.vercel.app/users/role?email=${user.email}&role=seller`, {
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
            <table className="table table-hover table-responsive">
                <tbody>
                    {
                        isLoading?
                        <Loader></Loader>
                        :
                        <>
                            {
                                allSeller.map(seller=><Seller key={seller._id} seller={seller} refetch={refetch}></Seller>)
                            }
                        </>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllSellers;