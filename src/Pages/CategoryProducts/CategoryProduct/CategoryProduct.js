import React, { useContext } from 'react';
import './CategoryProduct.css';
import { useQuery } from '@tanstack/react-query';
import { FaCheckCircle } from 'react-icons/fa';
import { AuthContext } from '../../../Context/AuthProvider';
import toast from 'react-hot-toast';

const CategoryProduct = ({ categoryProduct, setModalProduct }) => {
    const { img, name, location, resalePrice, originalPrice, yearsOfUse, postTime, sellerEmail, description ,_id} = categoryProduct;
    const { user } = useContext(AuthContext);
    const { data: seller = {}, refetch, isLoading } = useQuery({
        queryKey: ['seller', sellerEmail],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users?email=${sellerEmail}`);
            const data = await res.json();
            return data;
        }
    });
    const handleWishList = () => {
        const wishItem = {
            "productId": _id,
            "buyerEmail": user.email,
            sellerEmail
        };

        fetch('http://localhost:5000/wishList', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(wishItem)
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error('Sorry!!Only Buyer can add a item to wishlist.');
                }
                if (res.status === 401) {
                    toast.error('Unauthorized Access');
                }
                return res.json()
            })
            .then(data => {
                if (data?.acknowledged) {
                    toast.success('Product added to the wishList Successfully.');
                }
            });
    }
    return (
        <div className='col-lg-5'>
            <div className='shadow rounded'>
                <div className='p-3 text-center'>
                    <img src={img} alt="category" className='w-100 rounded' height="500px" />
                    <p className='fs-4 text-capitalize theme-color'>
                        {name}
                        {seller.verified && <FaCheckCircle className='text-primary ms-1' />}
                    </p>
                    <p>{(description.length > 150) ? description.substr(0, 150) + "...see more" : description}</p>
                    <p className='text-capitalize text-muted'>Seller : {seller.name}</p>
                    <p className='text-capitalize text-muted'>location : {location}</p>
                    <p className='text-capitalize text-muted'>resalePrice : {resalePrice}$</p>
                    <p className='text-capitalize text-muted'>originalPrice : {originalPrice}$</p>
                    <p className='text-capitalize text-muted'>year of use : {yearsOfUse} years</p>
                    <p className='text-capitalize text-muted'>posted time : {postTime}</p>
                    <button onClick={handleWishList} className='btn-sm theme-button-outline mb-3' >Add to Wishlist</button><br />
                    <button onClick={() => setModalProduct(categoryProduct)} className='btn-sm theme-button' data-bs-toggle="modal" data-bs-target="#productBookingModal">Book This item Now</button>
                </div>
            </div>
        </div>
    );
};

export default CategoryProduct;