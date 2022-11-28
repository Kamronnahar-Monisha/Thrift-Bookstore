import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import { useLogOutTheUser } from '../../../hooks/useLogOutTheUser';
import './DisplayError.css';
import { Helmet } from 'react-helmet-async';
import pageNotFoundImg from '../../../images/Computer troubleshooting.gif';

const DisplayError = () => {
    const error = useRouteError();
    const navigate = useNavigate();
    const logOut = useLogOutTheUser();

    const handleLogOut = ()=>{
        logOut();
        navigate('/login');
    }


    return (
        <div className="container">
            <Helmet>
                <title>Error Occur</title>
            </Helmet>
            <div className='row justify-content-center align-items-center'>
                <div className="col-lg-5 text-center">
                    <img src={pageNotFoundImg} alt="page not found" className='w-100' />
                    <h4 className='mt-5'>Something went wrong!!!</h4>
                    <h5 className='text-danger'>{error.statusText || error.message}</h5>
                    <h5 className=""> Please <button onClick={handleLogOut} className='theme-button btn-sm text-decoration-none theme-button-hover rounded'>Sign out</button> and log back in</h5>
                </div>
            </div>
        </div>
    );
};

export default DisplayError;