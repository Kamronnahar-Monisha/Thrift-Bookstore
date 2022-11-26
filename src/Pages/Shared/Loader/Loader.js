import React from 'react';
import './Loader.css';
import { Triangle } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className='row justify-content-center align-items-center'>
            <div className='loader col-2'>
                <Triangle
                    height="90"
                    width="90"
                    color="#ff9302"
                    ariaLabel="triangle-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                />
            </div>
        </div>
    );
};

export default Loader;