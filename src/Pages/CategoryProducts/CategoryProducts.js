import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './CategoryProducts.css';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Shared/Loader/Loader';
import CategoryProduct from './CategoryProduct/CategoryProduct';
import ProductModal from './ProductModal/ProductModal';
import {Helmet} from 'react-helmet-async';

const CategoryProducts = () => {
    const { id: categoryId } = useParams();
    const [modalProduct, setModalProduct] = useState({});

    const { data: categoryProducts = [], refetch, isLoading } = useQuery({
        queryKey: ['categoryProducts', categoryId],
        queryFn: async () => {
            const res = await fetch(`https://thrift-bookstore-server-side.vercel.app/categories/${categoryId}`);
            const data = await res.json();
            return data;
        }
    });

    return (
        <div className='categoryProducts my-5'>
            <Helmet>
                <title>Products List</title>
            </Helmet>
            <h3 className='theme-color-gray text-center'>Products Collection</h3>
            <hr className='custom-hr mt-3' />
            <div className="container">
                {
                    isLoading ?
                        <div className="loader-bottom-margin">
                            <Loader></Loader>
                        </div>
                        :
                        <div className="row justify-content-center align-items-center g-5 my-1">
                            {
                                categoryProducts.map(categoryProduct => <CategoryProduct key={categoryProduct._id} categoryProduct={categoryProduct} setModalProduct={setModalProduct}></CategoryProduct>)
                            }
                        </div>
                }
            </div>

            <ProductModal modalProduct={modalProduct}></ProductModal>

        </div>
    );
};

export default CategoryProducts;