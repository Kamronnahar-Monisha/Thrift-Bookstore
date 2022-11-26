import React, { useContext } from 'react';
import { AuthContext } from '../../../Context/AuthProvider';
import './NewsLetter.css';
import discountImg from '../../../images/Discount.gif';

const NewsLetter = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="container">
            <div className='row justify-content-center align-items-center my-5 py-5'>
                <div className="col-lg-4">
                    <img src={discountImg} className="w-100" alt="" />
                </div>
                <div className="col-lg-4 text-center text-lg-start">
                    <h3 className='theme-color'>Get Discount Information</h3>
                    <input className='form-control text-muted contact-email' type="text" defaultValue={user ? user.email : ""} />
                    <br />
                    <button className='theme-button fs-6'>Contact Us</button>
                </div>
            </div>
        </div>
    );
};

export default NewsLetter;