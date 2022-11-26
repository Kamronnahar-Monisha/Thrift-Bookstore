import React from 'react';
import { useParams } from 'react-router-dom';
import './CategoryProducts.css';
import { useQuery } from '@tanstack/react-query'
import Loader from '../Shared/Loader/Loader';

const CategoryProducts = () => {
    const { id: categoryId } = useParams();

    const { data: categoryProducts = [], refetch, isLoading } = useQuery({
        queryKey: ['categoryProducts', categoryId],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/categories/${categoryId}`);
            const data = await res.json();
            return data;
        }
    });

    return (
        <div className='categoryProducts'>
            <h3 className='theme-color-gray text-center'>Products Collection</h3>
            <hr className='custom-hr mt-3' />
            <div className="container">
                {
                    isLoading ?
                    <div className="loader-bottom-margin">
                        <Loader></Loader>
                    </div>
                    :
                    <div className="row">

                    </div>
                }
            </div>
        </div>
    );
};

export default CategoryProducts;