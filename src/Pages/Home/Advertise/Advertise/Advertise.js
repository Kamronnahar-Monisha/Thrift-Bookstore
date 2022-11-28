import React, { useEffect, useState } from 'react';
import AdvertiseCard from '../AdvertiseCard/AdvertiseCard';
import './Advertise.css';

const Advertise = () => {
    const [advertiseItems, setAdvertiseItems] = useState([]);
    useEffect(() => {
        fetch('https://thrift-bookstore-server-side.vercel.app/advertise')
            .then(res => res.json())
            .then(data => setAdvertiseItems(data));
    }, [])
    return (
        <div>
            {
                (advertiseItems.length !== 0) &&
                <>
                    <div className="my-5">
                        <div>
                            <h3 className='text-center'>Advertisement</h3>
                            <hr className='custom-hr mt-2' />
                        </div>
                        <div className="container my-5">
                            <div className="row justify-content-center align-items-center g-5">
                                {
                                    advertiseItems.map(advertiseItem => <AdvertiseCard key={advertiseItem._id} advertiseItem={advertiseItem}></AdvertiseCard>)
                                }
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default Advertise;