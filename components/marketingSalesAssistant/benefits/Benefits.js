import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Benefits.scss";
function Benefits() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <React.Fragment>
            <div className='benefits'>
                <div className='container'>
                    <div className='flex flex-col'>
                        <div className='title' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                            <span className='user'>Benefits</span>
                            <h3 className='heading'>
                                Best solutions <span>for your business</span>
                            </h3>
                        </div>
                        <div className='cardsBlock'>
                            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                                <div className='col-md-4' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='icon'>
                                                <img src='/images_growstack/home/choose1.svg' alt='icon' />
                                            </div>
                                            <h5 className='card-title'>
                                                Efficiency
                                                <span>Boost</span>
                                            </h5>
                                            <p className='card-text'>
                                                Automate tasks and streamline workflows with AI-powered tools, freeing up time for strategic planning
                                                and core business operations.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='icon'>
                                                <img src='/images_growstack/home/choose2.svg' alt='icon' />
                                            </div>
                                            <h5 className='card-title'>
                                                Enhanced
                                                <span>Engagement</span>
                                            </h5>
                                            <p className='card-text'>
                                                Personalize interactions and content to connect with customers on a deeper level, fostering stronger
                                                relationships and driving loyalty.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='icon'>
                                                <img src='/images_growstack/home/choose3.svg' alt='icon' />
                                            </div>
                                            <h5 className='card-title'>
                                                Competitive
                                                <span>Edge</span>
                                            </h5>
                                            <p className='card-text'>
                                                Harness the power of data-driven and innovative marketing strategies to outperform competitors, expand
                                                your market reach, and achieve growth.
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

export default Benefits;
