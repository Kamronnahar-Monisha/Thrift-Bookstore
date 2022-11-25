import React from 'react';
import Categories from '../Categories/Categories';
import Showcase from '../Showcase/Showcase';
import './Home.css';

const Home = () => {
    return (
        <div>
            <Showcase></Showcase>
            <Categories></Categories>
        </div>
    );
};

export default Home;