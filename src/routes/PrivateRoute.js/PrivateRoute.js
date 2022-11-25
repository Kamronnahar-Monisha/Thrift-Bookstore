import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import './PrivateRoute.css';

const PrivateRoute = ({children}) => {
    const { loading, user } = useContext(AuthContext);
    let location = useLocation();
    if (loading) {
        return (<div className='d-flex justify-content-center private-route-spinner'>
            <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>);
    }
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;

};

export default PrivateRoute;