import React, { useContext } from 'react';
import './MyProduct.css';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../../../Context/AuthProvider';
import { useLogOutTheUser } from '../../../../hooks/useLogOutTheUser';
import Loader from '../../../Shared/Loader/Loader';
import EachProduct from '../EachProduct/EachProduct';
import toast from 'react-hot-toast';

const MyProduct = () => {
    const {user}=useContext(AuthContext);
    const logOutUser = useLogOutTheUser();

    const { data: myProducts = [], refetch, isLoading } = useQuery({
        queryKey: ['myProducts', user.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products?email=${user.email}`,{
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
            <div className="row justify-content-center align-items-center mb-5 mt-1 g-5">
                {
                    isLoading?
                    <Loader></Loader>
                    :
                    <>
                        {
                            myProducts.map(product=><EachProduct key={product._id} product={product} refetch={refetch}></EachProduct>)
                        }
                    </>
                }
            </div>
        </div>
    );
};

export default MyProduct;