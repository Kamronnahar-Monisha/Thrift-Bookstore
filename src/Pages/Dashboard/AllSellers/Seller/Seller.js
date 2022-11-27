import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../Context/AuthProvider';
import { useLogOutTheUser } from '../../../../hooks/useLogOutTheUser';
import './Seller.css';

const Seller = ({ seller, refetch }) => {
    const { name, email, _id, verified } = seller;
    const { user } = useContext(AuthContext);
    const logOutUser = useLogOutTheUser();

    const handleUserDelete = () => {
        const proceed = window.confirm("Are you sure you want to delete the User?");
        if (!proceed) {
            return;
        }
        fetch(`http://localhost:5000/users/${_id}?email=${user.email}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if ((res.status === 403) || (res.status === 401)) {
                    toast.error("Unauthorized Access.");
                    logOutUser();
                }
                return res.json()
            })
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('User Deleted Successfully.');
                    refetch();
                }
            });
    }

    const handleUserVerify = () => {

        fetch(`http://localhost:5000/users/${_id}?email=${user.email}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ verified: true })
        })
            .then(res => {
                if ((res.status === 403) || (res.status === 401)) {
                    toast.error("Unauthorized Access.");
                    logOutUser();
                }
                return res.json()
            })
            .then(data => {
                if (data?.acknowledged) {
                    toast.success('User Verified Successfully.');
                    refetch();
                }
            });
    }

    return (
        <tr className='text-muted'>
            <td>{name}</td>
            <td>{email}</td>
            <td>
                {
                    verified ?
                        <button className='btn-sm theme-button-outline' disabled>verified</button>
                        :
                        <button className='btn-sm theme-button-outline' onClick={handleUserVerify}>verify</button>
                }
            </td>
            <td>
                <button className='btn-sm theme-button' onClick={handleUserDelete}>Delete</button>
            </td>
        </tr>
    );
};

export default Seller;