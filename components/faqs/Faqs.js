import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import Accordion from 'react-bootstrap/Accordion';
import './Faqs.scss';
import VideoBanner from '../videoBanner/VideoBanner';
function Faqs() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <React.Fragment>
            <div className="faqsSection">
                <div className="container">
                        <h3 className="heading m-0" data-aos="fade-UP"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                        <span>Frequently asked</span> questions
                        </h3>
                    <div className="row mt-5">
                        <div className="col-md-4" data-aos="fade-right"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                            <img className='image-fluid' src="/images/home/faqsBack.svg" alt="faqsBack" />
                        </div>
                        <div className="col-md-8" data-aos="fade-left"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                            <Accordion>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>How can GrowStack transform my business strategies into success stories?</Accordion.Header>
                                    <Accordion.Body>
                                        Sign up on our website and explore our AI-driven features. For personalized guidance, our customer support team is always ready to assist you.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Can I upgrade or downgrade my plan at any time?</Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>How does GrowStack address unique business challenges with tailored solutions?</Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="3">
                                    <Accordion.Header>What benefits does GrowStack offer for businesses seeking growth and efficiency?</Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat.
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="4">
                                    <Accordion.Header>Is my data secure with GrowStack?</Accordion.Header>
                                    <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                        aliquip ex ea commodo consequat.
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    </div>
                </div>
                {/* <VideoBanner /> */}
            </div>
        </React.Fragment>
    )
}

export default Faqs
