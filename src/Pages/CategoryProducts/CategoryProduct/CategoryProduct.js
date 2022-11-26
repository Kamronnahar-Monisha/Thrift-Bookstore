import React from 'react';
import './CategoryProduct.css';
import { useQuery } from '@tanstack/react-query';

const CategoryProduct = ({categoryProduct,setModalProduct}) => {
    const {img,name,location,resalePrice,originalPrice,yearsOfUse,postTime,sellerEmail} = categoryProduct;

    const { data:seller = {}, refetch, isLoading } = useQuery({
        queryKey: ['seller', sellerEmail],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users?email=${sellerEmail}`);
            const data = await res.json();
            return data;
        }
    });

    return (
        <div className='col-lg-5'>
            <div className='shadow rounded'>
                <div className='p-3 text-center'>
                    <img src={img} alt="category" className='w-100 rounded' height="500px" />
                    <p className='fs-4 text-capitalize'>{name}</p>
                    <p className='text-capitalize text-muted'>Seller : {seller.name}</p>
                    <p className='text-capitalize text-muted'>location : {location}</p>
                    <p className='text-capitalize text-muted'>resalePrice : {resalePrice}$</p>
                    <p className='text-capitalize text-muted'>originalPrice : {originalPrice}$</p>
                    <p className='text-capitalize text-muted'>year of use : {yearsOfUse} years</p>
                    <p className='text-capitalize text-muted'>posted time : {postTime}</p>
                    <button  onClick={() => setModalProduct(categoryProduct)} className='btn-sm theme-button-outline' data-bs-toggle="modal" data-bs-target="#productBookingModal">Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default CategoryProduct;