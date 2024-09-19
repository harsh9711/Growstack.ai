import React from 'react';
import "./spinner.css";

const Spinner2 = () => {
    return (
        <div className='flex justify-center h-screen items-center -mt-16'>
            <div className="container-spinner2">
                <div className="circle color-1"></div>
                <div className="circle color-2"></div>
                <div className="circle color-3"></div>
                <div className="circle color-4"></div>
                <div className="circle color-5"></div>
                <div className="circle color-6"></div>
                <div className="circle color-7"></div>
                <div className="circle color-8"></div>
            </div>
        </div>
    );
};

export default Spinner2;
