import React from 'react';
import './Dashboard.css';
import dashboardImg from '../../../images/Social Dashboard.gif';
import {Helmet} from 'react-helmet-async';

const Dashboard = () => {
    return (
        <div className='w-75 mx-auto'>
            <Helmet>
                <title>DashBoard</title>
            </Helmet>
            <img src={dashboardImg} alt="" className='w-100'/>
        </div>
    );
};

export default Dashboard;