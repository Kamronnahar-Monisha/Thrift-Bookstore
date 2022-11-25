import React from 'react';
import './Showcase.css';
import {Carousel} from '3d-react-carousal';
import img1 from '../../../images/img1.jpg';
import img2 from '../../../images/img2.jpg';
import img3 from '../../../images/img3jpg.jpg';
import img4 from '../../../images/img4.jpg';
import img5 from '../../../images/img5.jpg';
import { Link } from 'react-router-dom';

const Showcase = () => {
    let slides = [
        <img  src={img1}  width="350px" height="500px" className='rounded' alt="1" /> ,
        <img  src={img3}  width="350px" height="500px" className='rounded' alt="2" /> ,
        <img  src={img2}  width="350px" height="500px" className='rounded' alt="3" /> ,
        <img  src={img4}  width="350px" height="500px" className='rounded' alt="4" /> ,
        <img  src={img5}  width="350px" height="500px" className='rounded' alt="5" /> ];

    return (
        <div className='showcase my-5'>
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-5">
                        <h3>Welcome To</h3>
                        <h3> <span>Thrift </span>Bookstore</h3>
                        <p className='text-muted'>
                            Books are everywhere and always the same sense of adventure fills us.Second-hand books are wild books, homeless books.Its always called someones trash may be another person's treasure.So lets help each other. 
                        </p>
                        <Link to="/products">
                            <button className='theme-button theme-button-hover'>Explore More</button>
                        </Link>
                    </div>
                    <div className="col-lg-6 slide">
                       <Carousel slides={slides} autoplay={true} interval={2000}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Showcase;