import React from 'react';
import './Dashboard.css';
import dashboardImg from '../../../images/Social Dashboard.gif';

const Dashboard = () => {
    return (
        <div className='w-75 mx-auto'>
            <img src={dashboardImg} alt="" className='w-100'/>
        </div>
    );
};

export default Dashboard;