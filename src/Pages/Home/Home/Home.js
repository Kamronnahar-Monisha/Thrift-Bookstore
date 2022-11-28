import React from 'react';
import Advertise from '../Advertise/Advertise/Advertise';
import Categories from '../Categories/Categories';
import NewsLetter from '../NewsLetter/NewsLetter';
import Showcase from '../Showcase/Showcase';
import './Home.css';
import {Helmet} from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Thrift Bookstore</title>
            </Helmet>
            <Showcase></Showcase>
            <Categories></Categories>
            <NewsLetter></NewsLetter>
            <Advertise></Advertise>
        </div>
    );
};

export default Home;