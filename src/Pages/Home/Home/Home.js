import React from 'react';
import Categories from '../Categories/Categories';
import NewsLetter from '../NewsLetter/NewsLetter';
import Showcase from '../Showcase/Showcase';
import './Home.css';

const Home = () => {
    return (
        <div>
            <Showcase></Showcase>
            <Categories></Categories>
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;