import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./EasySteps.scss";
function EasySteps() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <React.Fragment>
            <div className='easySteps' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                <div className='aibannerCard'>
                    <div className='container'>
                        <div className='content'>
                            <div className='block'>
                                <h3>600+</h3>
                                <p>Hours of Development</p>
                            </div>
                            <div className='block'>
                                <h3>50+</h3>
                                <p>User Feedback Sessions</p>
                            </div>
                            <div className='block'>
                                <h3>20+</h3>
                                <p>Key Features Designed</p>
                            </div>
                            <div className='block'>
                                <h3>20+</h3>
                                <p>Years of Industry Experience</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='container'>
                    <div className='flex flex-col sm:flex-row items-center'>
                        <div className='w-full sm:w-1/2 ' data-aos='fade-right' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                            <span className='user'>START WRITING IN 3 EASY STEPS</span>
                            <h3 className='heading mt-3'>
                                <span>How does </span> it works
                            </h3>
                        </div>
                        <div className='w-full sm:w-1/2 ' data-aos='fade-left' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                            <p>
                                How does it works: Explore how our Al-driven tools templates transform every aspect of your business strategy and
                                propel your success forward
                            </p>
                        </div>
                    </div>
                    <div className='steps' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                        <div className='grid grid-cols-1 sm:grid-cols-3'>
                            <div className=''>
                                <div className='step step1'>
                                    <span>1</span>
                                    <h5>Step 1</h5>
                                    <h3>Pick a writing tool</h3>
                                    <p>
                                        Discover AI-powered templates for creating compelling social media ads, captivating hero sections, engaging
                                        blog posts, and more.
                                    </p>
                                </div>
                            </div>
                            <div className=''>
                                <div className='step step2'>
                                    <span>2</span>
                                    <h5>Step 2</h5>
                                    <h3>Describe your topic</h3>
                                    <p>Provide the AI with detailed information about the subject you want to write about..</p>
                                </div>
                            </div>
                            <div className=''>
                                <div className='step'>
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
    );
}

export default EasySteps;
