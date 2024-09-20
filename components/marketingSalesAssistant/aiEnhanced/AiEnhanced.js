import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./AiEnhanced.scss";
function AiEnhanced() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <React.Fragment>
            <div className='aiEnhanced'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-8' data-aos='fade-right' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                            <span className='user'>Efficient techniques to elevate your customer support productivity</span>
                            <h3 className='heading'>
                                <span>Revolutionize Customer Support with </span> <br /> AI-Enhanced Productivity
                            </h3>
                        </div>
                        <div className='cardsBlock'>
                            <div className='flex flex-col sm:flex-row gap-6'>
                                <div className='col-md-4' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='icon'>
                                                <img src='/images_growstack/salesMarketing/aie1.svg' alt='icon' />
                                            </div>
                                            <h5 className='card-title'>
                                                Agent for
                                                <span>every department</span>
                                            </h5>
                                            <p className='card-text'>
                                                Deploy AI assistants across all departments to streamline operations and enhance team productivity.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='icon'>
                                                <img src='/images_growstack/salesMarketing/aie2.svg' alt='icon' />
                                            </div>
                                            <h5 className='card-title'>
                                                Tailored intelligence
                                                <span>for your business</span>
                                            </h5>
                                            <p className='card-text'>
                                                Utilize AI-powered insights customized to your business needs for smarter decision-making and
                                                strategic growth.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='icon'>
                                                <img src='/images_growstack/salesMarketing/aie3.svg' alt='icon' />
                                            </div>
                                            <h5 className='card-title'>
                                                Immediate results &<span>visible growth</span>
                                            </h5>
                                            <p className='card-text'>
                                                Achieve quick wins and tangible business growth with the immediate impact of AI-powered assistants.
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

export default AiEnhanced;
