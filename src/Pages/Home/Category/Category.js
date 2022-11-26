import React from 'react';
import { Link } from 'react-router-dom';
import './Category.css';

const Category = ({category}) => {
    const {name,url,_id}=category;
    return (
        <div className='col-lg-3'>
            <div className='shadow rounded'>
                <div className='p-3 text-center'>
                    <img src={url} alt="category" className='w-100 rounded' height="400px" />
                    <p className='fs-4 text-capitalize'>{name}</p>
                    <Link to={`/categories/${_id}`}>
                        <button className='btn-sm theme-button-outline'>Explore Books</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Category;