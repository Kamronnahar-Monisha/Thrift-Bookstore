import React, { useContext } from 'react';
import './AddAProduct.css';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../Context/AuthProvider';
import {format } from 'date-fns';
import toast from 'react-hot-toast';
import { useLogOutTheUser } from '../../../hooks/useLogOutTheUser';
import { useNavigate } from 'react-router-dom';

const AddAProduct = () => {
    const { register, reset, formState: { errors }, handleSubmit } = useForm();
    const {user} = useContext(AuthContext);
    const logOutUser = useLogOutTheUser();
    const navigate = useNavigate();

    const handleAddProduct = (data) => {
        const date = format(new Date(), 'PP');
        const product = {
            name: data.productName,
            img: data.productImgUrl,
            description:data.description,
            resalePrice: data.resalePrice,
            originalPrice: data.originalPrice,
            yearsOfUse: data.yearOfUse,
            yearOfPurchase: data.yearOfPurchase,
            location: data.location,
            postTime: date,
            sellerEmail: user.email,
            condition: data.productCondition,
            mobile: data.mobile,
            categoryName: data.categoryName,
            status: "available",
            advertised: false
        };
        reset();

        fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(product)
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error('Sorry!!Only seller can add a product.');
                }
                if (res.status === 401) {
                    toast.error('Unauthorized Access');
                    logOutUser();
                }
                return res.json()
            })
            .then(data => {
                if (data?.acknowledged) {
                    toast.success('Successfully added a product .');
                    navigate('/dashboard/myProduct');
                }
            });
    }

    return (
        <div className='my-5'>
            <div className='rounded p-5 theme-color-shadow w-75 mx-auto'>
                <h3 className='theme-color fw-bolder'>Add A Product</h3>
                <form onSubmit={handleSubmit(handleAddProduct)}>
                    <div className="mb-3">
                        <label htmlFor="productName" className="form-label text-muted fw-bold">Book Name</label>
                        <input type="text" {...register("productName", {
                            required: "Product Name is required"
                        })} className="form-control" id="productName" />
                        {errors.productName && <p className='text-danger'>{errors.productName?.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="author" className="form-label text-muted fw-bold">Author Name</label>
                        <input type="text" {...register("author", {
                            required: "Author Name is required"
                        })} className="form-control" id="author" />
                        {errors.author && <p className='text-danger'>{errors.author?.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productImgUrl" className="form-label text-muted fw-bold">Book Image Url</label>
                        <input type="text" {...register("productImgUrl", {
                            required: "Product Image Url is required"
                        })} className="form-control" id="productImgUrl" />
                        {errors.productImgUrl && <p className='text-danger'>{errors.productImgUrl?.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label text-muted fw-bold">Book Description</label>
                        <textarea  {...register("description", {
                            required: "Product Description is required"
                        })} className="form-control" id="description"></textarea>
                        {errors.description && <p className='text-danger'>{errors.description?.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="categoryName" className="form-label text-muted fw-bold">Category Name</label>
                        <select  {...register("categoryName", {
                            required: "Product Category is required"
                        })} className="form-select" aria-label="Default select" id="categoryName">
                            <option value="historical" selected>Historical</option>
                            <option value="literature">Literature</option>
                            <option value="mystery">Mystery</option>
                        </select>
                        {errors.categoryName && <p className='text-danger'>{errors.categoryName?.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productCondition" className="form-label text-muted fw-bold">Product Condition</label>
                        <select  {...register("productCondition", {
                            required: "Product Condition is required"
                        })} className="form-select" aria-label="Default select" id="productCondition">
                            <option value="excellent" selected>Excellent</option>
                            <option value="good">Good</option>
                            <option value="fair">Fair</option>
                        </select>
                        {errors.productCondition && <p className='text-danger'>{errors.productCondition?.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mobile" className="form-label text-muted fw-bold">Mobile Number</label>
                        <input type="text" {...register("mobile", {
                            required: "Mobile Number is required",
                            pattern: { value: /^[0-9]*$/, message: 'Mobile number should only contain number' }
                        })} className="form-control" id="mobile" />
                        {errors.mobile && <p className='text-danger'>{errors.mobile?.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label text-muted fw-bold">Location</label>
                        <input type="text" {...register("location", {
                            required: "Location is required"
                        })} className="form-control" id="location" />
                        {errors.location && <p className='text-danger'>{errors.location?.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="originalPrice" className="form-label text-muted fw-bold">Original Price In Dollar</label>
                        <input type="text" {...register("originalPrice", {
                            required: "Original Price is required",
                            pattern: { value: /^[0-9]*$/, message: 'price should be a number' }
                        })} className="form-control" id="originalPrice" />
                        {errors.originalPrice && <p className='text-danger'>{errors.originalPrice?.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="resalePrice" className="form-label text-muted fw-bold">Resale Price In Dollar</label>
                        <input type="text" {...register("resalePrice", {
                            required: "Resale Price is required",
                            pattern: { value: /^[0-9]*$/, message: 'price should be a number' }
                        })} className="form-control" id="resalePrice" />
                        {errors.resalePrice && <p className='text-danger'>{errors.resalePrice?.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="yearOfPurchase" className="form-label text-muted fw-bold">Year Of Purchase</label>
                        <input type="text" {...register("yearOfPurchase", {
                            required: "Year Of Purchase is required",
                            pattern: { value: /^[0-9]*$/, message: 'Year should be a number' }
                        })} className="form-control" id="yearOfPurchase" />
                        {errors.yearOfPurchase && <p className='text-danger'>{errors.yearOfPurchase?.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="yearOfUse" className="form-label text-muted fw-bold">Year of Use</label>
                        <input type="text" {...register("yearOfUse", {
                            required: "Year of use is required",
                            pattern: { value: /^[0-9]*$/, message: 'Year number should be a number' }
                        })} className="form-control" id="yearOfUse" />
                        {errors.yearOfUse && <p className='text-danger'>{errors.yearOfUse?.message}</p>}
                    </div>
                    <button type="submit" className="theme-button rounded form-control">Add Product</button>
                </form>
            </div>
        </div>
    );
};

export default AddAProduct;