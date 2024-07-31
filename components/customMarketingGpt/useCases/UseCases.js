import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import './UseCases.scss'
import Link from 'next/link'
function UseCases() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <React.Fragment>
            <div className="useCases">
                <div className="container">
                    <div className="row align-items-end">
                        <div className="col-md-4" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                            <span className="user">Cases</span>
                            <h3 className="heading">
                                <span>Use</span> casess
                            </h3>
                        </div>
                        <div className="col-md-8" data-aos="fade-left"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                            <p>Custom GPTs aim to help you develop safe AGI tailored for any role you need, whether it's for customer service, customer engagement, or document research</p>
                        </div>
                    </div>
                    <div className="cases">
                        <div className="row">
                            <div className="col-md-4" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                                <div className="block">
                                    <img src="/images_growstack/customMarketing/case1.svg" alt="case" />
                                    <p>Customer service</p>
                                </div>
                            </div>
                            <div className="col-md-4" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                                <div className="block">
                                    <img src="/images_growstack/customMarketing/case2.svg" alt="case" />
                                    <p>Customer engagement</p>
                                </div>
                            </div>
                            <div className="col-md-4" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                                <div className="block">
                                    <img src="/images_growstack/customMarketing/case3.svg" alt="case" />
                                    <p>Document research</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="try">
                        <div className="content" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                        <h4>Try GrowStack AI</h4>
                        <p>What if Custom GPT knew all your business
                            content?</p>
                       <div className="btns ubtn">
                       <Link href="/register" className='sheen'>Get started now <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z" fill="#fff" />
                        </svg>
                        </Link>
                       </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default UseCases
