import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';
import Loader from '../../Pages/Shared/Loader/Loader';
import './PrivateRoute.css';

const PrivateRoute = ({children}) => {
    const { loading, user } = useContext(AuthContext);
    let location = useLocation();
    if (loading) {
        return (<div className='private-route-spinner'>
            <Loader></Loader>
        </div>);
    }
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;

};

export default PrivateRoute;