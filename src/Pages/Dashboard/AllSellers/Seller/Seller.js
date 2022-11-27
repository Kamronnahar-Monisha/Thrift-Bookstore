import React from 'react';
import './Seller.css';

const Seller = ({ seller, refetch }) => {
    const { name, email, _id, verified } = seller;
    return (
        <tr className='text-muted'>
            <td>{name}</td>
            <td>{email}</td>
            <td>
                {
                    verified ?
                        <button className='btn-sm theme-button-outline' disabled>verified</button>
                        :
                        <button className='btn-sm theme-button-outline'>verify</button>
                }
            </td>
            <td>
                <button className='btn-sm theme-button'>Delete</button>
            </td>
        </tr>
    );
};

export default Seller;