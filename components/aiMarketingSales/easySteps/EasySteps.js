import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import './EasySteps.scss'
function EasySteps() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <React.Fragment>
            <div className="easySteps" data-aos="fade-up"
                data-aos-easing="ease-in-sine"
                data-aos-duration="1000">
                <div className="aibannerCard">
                    <div className="container">
                        <div className="content">
                            <div className="block">
                                <h3>120,000+</h3>
                                <p>Registered users</p>
                            </div>
                            <div className="block">
                                <h3>24</h3>
                                <p>Expert Support Team</p>
                            </div>
                            <div className="block">
                                <h3>98</h3>
                                <p>Sales Count</p>
                            </div>
                            <div className="block">
                                <h3>208</h3>
                                <p>Client Worldwide</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row align-items-end">
                        <div className="col-md-6" data-aos="fade-right"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                            <span className="user">START WRITING IN 3 EASY STEPS</span>
                            <h3 className="heading mt-3">
                                <span>How does </span> it works
                            </h3>
                        </div>
                        <div className="col-md-6" data-aos="fade-left"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                            <p>How does it works: Explore how our Al-driven tools templates transform every aspect of your business strategy and propel your success forward</p>
                        </div>
                    </div>
                    <div className="steps" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="step step1">
                                    <span>1</span>
                                    <h5>Step 1</h5>
                                    <h3>Pick a writing tool</h3>
                                    <p>Discover a wide range of AI-powered templates designed to create compelling social media ads, captivating hero sections, engaging blog posts, insightful essays, and more..</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="step step2">
                                    <span>2</span>
                                    <h5>Step 2</h5>
                                    <h3>Describe your topic</h3>
                                    <p>Provide the AI with detailed information about the subject you want to write about..</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="step">
                                    <span>3</span>
                                    <h5>Step 3</h5>
                                    <h3>Create AI content</h3>
                                    <p>Our advanced AI comprehends your specifications and produces unique, human-like content within seconds.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default EasySteps
