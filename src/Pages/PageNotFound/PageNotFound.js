import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './PageNotFound.css';
import pageNotFoundImg from '../../images/page-not-found-404.gif';

const PageNotFound = () => {
    return (
        <div className="container">
            <div className='row justify-content-center align-items-center'>
                <div className="col-lg-5 text-center">
                    <img src={pageNotFoundImg} alt="page not found" className='w-100'/>
                    <Link className='theme-button text-decoration-none theme-button-hover fw-bold rounded' to='/'>
                        <FaArrowLeft className='me-2' />
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;