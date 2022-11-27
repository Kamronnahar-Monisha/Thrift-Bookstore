import React, { useContext } from 'react';
import './ProductModal.css';
import { AuthContext } from '../../../Context/AuthProvider';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useLogOutTheUser } from '../../../hooks/useLogOutTheUser';

const ProductModal = ({ modalProduct }) => {
    const { name, resalePrice: price, _id, sellerEmail } = modalProduct;

    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const logOutUser = useLogOutTheUser();

    const handleModalSubmitButton = (data) => {
        const order = {
            productId: _id,
            buyerEmail: user.email,
            sellerEmail,
            buyerMobile: data.mobileNo,
            meetingLocation: data.meetingLocation,
            paid: false
        };
        reset();

        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(order)
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error('Sorry!!Only Buyer can book an item.');
                }
                if (res.status === 401) {
                    toast.error('Unauthorized Access');
                    logOutUser();
                }
                return res.json()
            })
            .then(data => {
                if (data?.acknowledged) {
                    toast.success('Successfully booked this item .');
                }
            });
    }

    console.log(user);
    return (
        <div>
            <div className="modal fade" id="productBookingModal" tabindex="-1" aria-labelledby="productBookingModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className='text-end'>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <h3 className='theme-color'>Please book your desire product</h3>
                            <form onSubmit={handleSubmit(handleModalSubmitButton)}>
                                <div className="mb-3">
                                    <label htmlFor="buyerName" className="form-label">Your Name</label>
                                    <input type="text" {...register("buyerName", {
                                        disabled: true
                                    })} className="form-control text-capitalize text-muted" id="buyerName" defaultValue={user.displayName} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="buyerEmail" className="form-label">Your Email</label>
                                    <input type="text" {...register("buyerEmail", {
                                        disabled: true
                                    })} className="form-control text-capitalize text-muted" id="buyerEmail" defaultValue={user.email} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="productName" className="form-label">Book Name</label>
                                    <input type="text" {...register("productName", {
                                        disabled: true
                                    })} className="form-control text-capitalize text-muted" id="productName" defaultValue={name} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="productPrice" className="form-label">Book's Price in Dollars</label>
                                    <input type="text" {...register("productPrice", {
                                        disabled: true
                                    })} className="form-control text-capitalize text-muted" id="productPrice" defaultValue={price} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="mobileNo" className="form-label text-muted fw-bold">Your Mobile Number</label>
                                    <input type="text" {...register("mobileNo", {
                                        required: "Mobile Number is Required"
                                    })} className="form-control" id="mobileNo" />
                                    {errors.mobileNo && <p className='text-danger'>{errors.mobileNo.message}</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="meetingLocation" className="form-label text-muted fw-bold">Meeting Location</label>
                                    <input type="text" {...register("meetingLocation", {
                                        required: "Meeting Location is Required"
                                    })} className="form-control" id="meetingLocation"/>
                                    {errors.meetingLocation && <p className='text-danger'>{errors.meetingLocation.message}</p>}
                                </div>
                                <div className='text-center'>
                                    <button type="submit" className="btn-sm theme-button-outline" data-bs-dismiss="modal">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;