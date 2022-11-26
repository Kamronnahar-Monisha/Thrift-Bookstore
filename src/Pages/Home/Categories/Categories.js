import React, { useEffect, useState } from 'react';
import './Categories.css';
import axios from 'axios';
import Category from '../Category/Category';
import Loader from '../../Shared/Loader/Loader';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/categories')
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <div className='categories my-5'>
            <div className='pt-5'>
                <h3 className='text-center theme-color'>All Book Categories</h3>
                <p className='text-center text-muted'>
                    Secondhand books had so much life in them. They'd lived, sometimes in many homes, or maybe just one. <br /> Theyd been on airplanes, traveled to sunny beaches, or crowded into a <br /> backpack and taken high up on a mountain .
                </p>
            </div>
            <div className="container">
                {
                    categories.length ?
                        <div className="row justify-content-center align-items-center g-5">
                            {
                                categories.map(category => <Category
                                    key={category._id} category={category}
                                ></Category>)
                            }
                        </div>
                        :
                        <Loader></Loader>
                }
            </div>
        </div>
    );
};

export default Categories;