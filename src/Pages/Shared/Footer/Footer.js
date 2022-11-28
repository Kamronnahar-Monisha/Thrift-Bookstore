import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from '../../../images/favicon-32x32.png';
import { FaFacebookSquare, FaWhatsappSquare, FaInstagramSquare } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='footer bg-dark py-5 text-white text-center text-lg-start'>
            <div className="container">
                <div className="row justify-content-around align-items-center gy-5">
                    <div className="col-lg-4">
                        <Link className="navbar-brand" to="/home">
                            <img src={logo} alt="logo" className='logo col-3' />
                            <span className='logo-text'>hrift Bookstore</span>
                        </Link>
                        <p className='mt-3'>
                            Books are everywhere; and always the same sense of adventure fills us. Second-hand books are wild books, homeless books.
                        </p>
                        <div className='fs-3'>
                            <a href="https://www.facebook.com/kamronnahar.monisha/" target="_blank" rel="noreferrer">
                                <FaFacebookSquare className="text-white sicon" />
                            </a>
                            <a href="https://www.instagram.com/kamronnahar_monisha/" target="_blank" rel="noreferrer">
                                <FaWhatsappSquare className='text-white ms-4 sicon' />
                            </a>
                            <a href="https://www.instagram.com/kamronnahar_monisha/" target="_blank" rel="noreferrer">
                                <FaInstagramSquare className='text-white ms-4 sicon' />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-2">
                        <h4 className='mb-lg-4 mb-2'>Quick Link</h4>
                        <Link className="text-decoration-none text-white d-block mb-2" to='/'>Home</Link>
                        <Link className="text-decoration-none text-white d-block mb-2" to="/blog">Blog</Link>
                        <Link className="text-decoration-none text-white d-block mb-2">Products</Link>
                    </div>
                    <div className="col-lg-2">
                        <h4 className='mb-lg-4 mb-2'>BookStore</h4>
                        <Link className="text-decoration-none text-white d-block mb-2">About</Link>
                        <Link className="text-decoration-none text-white d-block mb-2">Customer Review</Link>
                        <Link className="text-decoration-none text-white d-block mb-2">Terms & Condition</Link>
                    </div>
                    <div className="col-lg-2">
                        <h4 className='mb-lg-4 mb-2'>HelpLine</h4>
                        <Link className="text-decoration-none text-white d-block mb-2">Support Center</Link>
                        <Link className="text-decoration-none text-white d-block mb-2">Feedback</Link>
                        <Link className="text-decoration-none text-white d-block mb-2">Accessability</Link>
                    </div>
                </div>
                <div className='text-center m-5'>
                    Copyright © 2022 <span className='theme-color'>Thirft Bookstore</span>. All Rights Reserved.
                </div>
            </div>
        </div>
    );
};

export default Footer;