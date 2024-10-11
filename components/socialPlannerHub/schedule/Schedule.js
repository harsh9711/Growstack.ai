import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Schedule.scss";
import VideoBanner from "@/components/videoBanner/VideoBanner";
function Schedule() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <React.Fragment>
            <div className='schedule'>
                <div className='container'>
                    <div className='row'>
                        <div className='title' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                            <span className='user'>Schedule in under 1 minute</span>
                            <h3 className='heading'>
                                <span>Goodbye uncertainty, welcome </span> data-informed decisions
                            </h3>
                        </div>
                        <div className='cardsBlock'>
                            <div className='flex flex-col sm:grid grid-cols-3 gap-5'>
                                <div className='' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                                    <div className='card bg-white'>
                                        <div className='card-body'>
                                            <div className='icon'>
                                                <img src='/images_growstack/social/schedule1.svg' alt='icon' />
                                            </div>
                                            <h5 className='card-title'>
                                                Understand your <br />
                                                audience
                                            </h5>
                                            <p className='card-text'>
                                                Get to know your audience’s demographic details and analyze the segmentation of your followers by age,
                                                gender, country, and language.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                                    <div className='card bg-white'>
                                        <div className='card-body'>
                                            <div className='icon'>
                                                <img src='/images_growstack/social/schedule2.svg' alt='icon' />
                                            </div>
                                            <h5 className='card-title'>
                                                Measure your follower <br />
                                                growth
                                            </h5>
                                            <p className='card-text'>
                                                Evaluate the rate of your audience’s growth across various platforms, and pinpoint the channels in
                                                need of strategy refinement.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                                    <div className='card bg-white'>
                                        <div className='card-body'>
                                            <div className='icon'>
                                                <img src='/images_growstack/social/schedule3.svg' alt='icon' />
                                            </div>
                                            <h5 className='card-title'>
                                                Enjoy real-time <br />
                                                data
                                            </h5>
                                            <p className='card-text'>
                                                Monitor your reach and engagement, identify your best-performing posts, and gain insights into the
                                                strengths of your strategy.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <VideoBanner /> */}
        </React.Fragment>
    );
}

export default Schedule;
