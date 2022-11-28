import React, {useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../Context/AuthProvider';
import './AdvertiseCard.css';

const AdvertiseCard = ({advertiseItem}) => {
    const {img,name,description}= advertiseItem;
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
    return (
        <div className='col-lg-4'>
            <div className='shadow rounded'>
                <div className='p-3 text-center'>
                    <img src={img} alt="category" className='w-100 rounded' height="500px" />
                    <p className='fs-4 text-capitalize theme-color'>{name}</p>
                    <p>{(description.length > 250) ? description.substr(0, 250) + "...see more" : description}</p>
                    {
                        !user && <button onClick={() =>navigate('/login') } className='btn-sm theme-button'>Login For Book Item</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default AdvertiseCard;