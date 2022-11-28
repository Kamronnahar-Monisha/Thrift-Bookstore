import React, { useContext } from 'react';
import './EachProduct.css';
import toast from 'react-hot-toast';
import { useLogOutTheUser } from '../../../../hooks/useLogOutTheUser';
import { AuthContext } from '../../../../Context/AuthProvider';

const EachProduct = ({ product, refetch }) => {
    const { _id, img, name, status, resalePrice, originalPrice, advertised } = product;
    const logOutUser = useLogOutTheUser();
    const { user } = useContext(AuthContext);


    const handleDeleteProduct = () => {
        const proceed = window.confirm("Are you sure you want to delete this Product?");
        if (!proceed) {
            return;
        }
        fetch(`https://thrift-bookstore-server-side.vercel.app/products/${_id}?email=${user.email}`, {
            method: "DELETE",
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
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Item Deleted Successfully.');
                    refetch();
                }
            });
    }


    const handleAdvertise = (value) => {
        const updateInfo = {
            advertised: value
        }

        fetch(`https://thrift-bookstore-server-side.vercel.app/products/${_id}?email=${user.email}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(updateInfo)
        })
            .then(res => {
                if ((res.status === 403) || (res.status === 401)) {
                    toast.error("Unauthorized Access.");
                    logOutUser();
                }
                return res.json()
            })
            .then(data => {
                if (data?.acknowledged) {
                    toast.success('Item Advertised Successfully.');
                    refetch();
                }
            });
    }
    return (
        <div className='col-lg-6'>
            <div className='shadow rounded'>
                <div className='p-3 text-center'>
                    <img src={img} alt="category" className='w-100 rounded' height="500px" />
                    <p className='fs-4 text-capitalize theme-color'>{name} </p>
                    <p className='text-capitalize text-muted'>Status : {status}</p>
                    <p className='text-capitalize text-muted'>resale Price : {resalePrice}$</p>
                    <p className='text-capitalize text-muted'>original Price : {originalPrice}$</p>
                    <button onClick={handleDeleteProduct} className='btn-sm theme-button-outline mb-3' >Delete</button><br />
                    {
                        ((status === 'available') && (advertised === false)) ?
                            <button className='btn-sm theme-button' onClick={()=>handleAdvertise(true)}>Advertise</button>
                            :
                            (advertised === true) ?
                                <button className='btn-sm theme-button' onClick={()=>handleAdvertise(false)}>Remove Advertised</button>
                                :
                                <button className='btn-sm theme-button' disabled> Sold Out</button>

                    }
                </div>
            </div>
        </div>
    );
};

export default EachProduct;