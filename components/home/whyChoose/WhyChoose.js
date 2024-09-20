import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./WhyChoose.scss";
function WhyChoose() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <React.Fragment>
            <div className='whyChoose'>
                <div className='container'>
                    <div className='row'>
                        <div className='title' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                            <span className='user'>Why Choose GrowStack?</span>
                            <h3 className='heading'>
                                <span>Experience unparalleled growth with our cutting-edge </span> AI solutions designed to elevate your business.
                            </h3>
                        </div>
                        <div className='cardsBlock' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                                <div className='col-md-4'>
                                    <div className='card bg-white'>
                                        <div className='card-body'>
                                            <div className='icon'>
                                                <img src='/images_growstack/home/choose1.svg' alt='icon' />
                                            </div>
                                            <h5 className='card-title'>
                                                Supercharge Your
                                                <span>Efficiency</span>
                                            </h5>
                                            <p className='card-text'>
                                                Harness the power of AI to streamline your workflows and boost productivity, ensuring you achieve more
                                                with less effort.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='card bg-white'>
                                        <div className='card-body'>
                                            <div className='icon'>
                                                <img src='/images_growstack/home/choose2.svg' alt='icon' />
                                            </div>
                                            <h5 className='card-title'>
                                                Optimize Your
                                                <span>Revenue</span>
                                            </h5>
                                            <p className='card-text'>
                                                Leverage data-driven insights and AI tools to optimize your revenue streams, enhancing profitability
                                                and business growth.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='card bg-white'>
                                        <div className='card-body'>
                                            <div className='icon'>
                                                <img src='/images_growstack/home/choose3.svg' alt='icon' />
                                            </div>
                                            <h5 className='card-title'>
                                                Speed Up Your
                                                <span>Work</span>
                                            </h5>
                                            <p className='card-text'>
                                                Quickly integrate our AI solutions into your existing systems, accelerating your operations without
                                                disrupting daily activities.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default WhyChoose;
