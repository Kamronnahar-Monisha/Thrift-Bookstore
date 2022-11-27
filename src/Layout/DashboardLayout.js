import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import Footer from '../Pages/Shared/Footer/Footer';
import Header from '../Pages/Shared/Header/Header';
import useAdmin from '../hooks/useAdmin';
import useBuyer from '../hooks/useBuyer';
import useSeller from '../hooks/useSeller';
import './DashboardLayout.css';
import { FaYelp } from 'react-icons/fa';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email);
    const [isBuyer] = useBuyer(user?.email);
    const [isSeller] = useSeller(user?.email);

    return (
        <div>
            <Header></Header>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-2 side-nav py-5">
                        <ul>
                            {
                                isAdmin && <>
                                    <li className='py-3 fs-5'>
                                        <FaYelp className="theme-color me-2" />
                                        <Link to="/dashboard/allSellers" className='text-decoration-none text-dark'>All Sellers</Link>
                                    </li >
                                    <li className='py-3 fs-5'>
                                        <FaYelp className="theme-color me-2" />
                                        <Link to="/dashboard/allBuyers" className='text-decoration-none text-dark'>All Buyers</Link>
                                    </li>
                                </>
                            }

                            {
                                isSeller && <>
                                    <li className='py-3 fs-5'>
                                        <FaYelp className="theme-color me-2" />
                                        <Link to="/dashboard/addAProduct" className='text-decoration-none text-dark'>Add a Product</Link>
                                    </li>
                                    <li className='py-3 fs-5'>
                                        <FaYelp className="theme-color me-2" />
                                        <Link to="/dashboard/myProduct" className='text-decoration-none text-dark'>My Product</Link>
                                    </li>
                                    <li className='py-3 fs-5'>
                                        <FaYelp className="theme-color me-2" />
                                        <Link to="/dashboard/myBuyers" className='text-decoration-none text-dark'>My Buyers</Link>
                                    </li>
                                </>
                            }
                            {
                                isBuyer && <>
                                    <li className='py-3 fs-5'>
                                        <FaYelp className="theme-color me-2" />
                                        <Link to="/dashboard/myOrders" className='text-decoration-none text-dark'>My Orders</Link>
                                    </li>
                                    <li className='py-3 fs-5'>
                                        <FaYelp className="theme-color me-2" />
                                        <Link to="/dashboard/myWishlist" className='text-decoration-none text-dark'>My Wishlist</Link>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                    <div className="col-lg-8">
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;