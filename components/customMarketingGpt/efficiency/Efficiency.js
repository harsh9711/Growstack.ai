import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Efficiency.scss";
function Efficiency() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <React.Fragment>
            <div className='efficiency'>
                <div className='container'>
                    <span className='user'>Efficiency unleashed</span>
                    <div className='flex flex-col sm:flex-row items-center gap-8'>
                        <div className='w-full  sm:w-1/2' data-aos='fade-right' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                            <h3 className='heading'>
                                <span>Tailor-made custom GPT for</span> all your business interactions
                            </h3>
                        </div>
                        <div className='w-full  sm:w-1/2' data-aos='fade-left' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                            <p>You don't need to integrate dozens of different services, since GrowStack has it all</p>
                        </div>
                    </div>
                    <div className='borderline'>
                        <div className='card'>
                            <div className='flex flex-col sm:flex-row items-center py-8 gap-8'>
                                <div className='w-full sm:w-1/2 '>
                                    <div className='flex flex-col gap-12 '>
                                        <div
                                            className='flex  items-center '
                                            data-aos='fade-up'
                                            data-aos-easing='ease-in-sine'
                                            data-aos-duration='1000'
                                        >
                                            <div className='flex-shrink-0'>
                                                <img src='/images_growstack/customMarketing/tailer1.svg' alt='tailer1' />
                                            </div>
                                            <div className='flex-grow-1 relative ms-3'>
                                                <h4>Chatbot</h4>
                                                <p>Multi-channel and visually built</p>
                                                <div className='w-full absolute -bottom-6 h-2 border-b border-[#EBEBEB]'></div>
                                            </div>
                                        </div>

                                        <div
                                            className='flex  items-center '
                                            data-aos='fade-up'
                                            data-aos-easing='ease-in-sine'
                                            data-aos-duration='1000'
                                        >
                                            <div className='flex-shrink-0'>
                                                <img src='/images_growstack/customMarketing/tailer2.svg' alt='tailer1' />
                                            </div>
                                            <div className='flex-grow-1 relative ms-3'>
                                                <h4>Large language models</h4>
                                                <p>GPT, Gemini, PaLM, Llama, and others</p>
                                                <div className='w-full absolute -bottom-6 h-2 border-b border-[#EBEBEB]'></div>
                                            </div>
                                        </div>

                                        <div
                                            className='flex  items-center '
                                            data-aos='fade-up'
                                            data-aos-easing='ease-in-sine'
                                            data-aos-duration='1000'
                                        >
                                            <div className='flex-shrink-0'>
                                                <img src='/images_growstack/customMarketing/tailer3.svg' alt='tailer1' />
                                            </div>
                                            <div className='flex-grow-1 relative ms-3'>
                                                <h4>Productivity</h4>
                                                <p>Effortlessly design anything</p>
                                                <div className='w-full absolute -bottom-6 h-2 border-b border-[#EBEBEB]'></div>
                                            </div>
                                        </div>

                                        <div
                                            className='flex  items-center '
                                            data-aos='fade-up'
                                            data-aos-easing='ease-in-sine'
                                            data-aos-duration='1000'
                                        >
                                            <div className='flex-shrink-0'>
                                                <img src='/images_growstack/customMarketing/tailer4.svg' alt='tailer1' />
                                            </div>
                                            <div className='flex-grow-1 relative ms-3'>
                                                <h4>Educations</h4>
                                                <p>Fastest way to learn anything</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full sm:w-1/2 '>
                                    <div className='flex flex-col gap-12 '>
                                        <div
                                            className='flex  items-center '
                                            data-aos='fade-up'
                                            data-aos-easing='ease-in-sine'
                                            data-aos-duration='1000'
                                        >
                                            <div className='flex-shrink-0'>
                                                <img src='/images_growstack/customMarketing/tailer5.svg' alt='tailer1' />
                                            </div>
                                            <div className='flex-grow-1 relative ms-3'>
                                                <h4>Scenarios</h4>
                                                <p>For complex interactions and SOPs</p>
                                                <div className='w-full absolute -bottom-6 h-2 border-b border-[#EBEBEB]'></div>
                                            </div>
                                        </div>

                                        <div
                                            className='flex  items-center '
                                            data-aos='fade-up'
                                            data-aos-easing='ease-in-sine'
                                            data-aos-duration='1000'
                                        >
                                            <div className='flex-shrink-0'>
                                                <img src='/images_growstack/customMarketing/tailer6.svg' alt='tailer1' />
                                            </div>
                                            <div className='flex-grow-1 relative ms-3'>
                                                <h4>Writing</h4>
                                                <p>Write tailored and engaging content</p>
                                                <div className='w-full absolute -bottom-6 h-2 border-b border-[#EBEBEB]'></div>
                                            </div>
                                        </div>

                                        <div
                                            className='flex  items-center '
                                            data-aos='fade-up'
                                            data-aos-easing='ease-in-sine'
                                            data-aos-duration='1000'
                                        >
                                            <div className='flex-shrink-0'>
                                                <img src='/images_growstack/customMarketing/tailer7.svg' alt='tailer1' />
                                            </div>
                                            <div className='flex-grow-1 relative ms-3'>
                                                <h4>Research & Analysis</h4>
                                                <p>Do hours worth of research in minutes</p>
                                                <div className='w-full absolute -bottom-6 h-2 border-b border-[#EBEBEB]'></div>
                                            </div>
                                        </div>

                                        <div
                                            className='flex  items-center '
                                            data-aos='fade-up'
                                            data-aos-easing='ease-in-sine'
                                            data-aos-duration='1000'
                                        >
                                            <div className='flex-shrink-0'>
                                                <img src='/images_growstack/customMarketing/tailer8.svg' alt='tailer1' />
                                            </div>
                                            <div className='flex-grow-1 relative ms-3'>
                                                <h4>Programming</h4>
                                                <p>Write code, debug, test and run</p>
                                            </div>
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

export default Efficiency;
