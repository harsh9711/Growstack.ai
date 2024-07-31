import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import './FuturePlans.scss';

function FuturePlans() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <React.Fragment>
            <div className="futurePlans">
                <div className="container">
                    <div className="row">
                        <div className="title" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                            <span className="user">Future plans</span>
                            <h3 className="heading">
                                <span>Growing with you: </span>Our exciting roadmap
                            </h3>
                            <p>We're committed to continually enhancing our platform with love and innovation.</p>
                        </div>
                        <div className="timeLine" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                            <section className="main-timeline-section">
                                <div className="conference-center-line"></div>
                                <div className="conference-timeline-content">
                                    <div className="timeline-article timeline-article-bottom green">
                                        <div className="meta-date">
                                            <span>May 25</span>
                                        </div>
                                        <div className="content-box">
                                            <h3>May2025: GTM Verticals</h3>
                                            <ul>
                                                <li>AI Agri</li>
                                                <li>AI Retail</li>
                                                <li>AI Manufacturing</li>
                                                <li>2000+ Workflows</li>
                                                <li>++Work Offline++</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="timeline-article timeline-article-top froze">
                                        <div className="meta-date">
                                            <span>Dec 24</span>
                                        </div>
                                        <div className="content-box">
                                            <h3>December 2024: GTM Business</h3>
                                            <ul>
                                                <li>AI Finance</li>
                                                <li>AI Customer Service</li>
                                                <li>500+ Workflow Automation</li>
                                                <li>++ Desktop Apps++</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="timeline-article timeline-article-bottom pink">
                                        <div className="meta-date">
                                            <span>Oct 24</span>
                                        </div>
                                        <div className="content-box">
                                            <h3>October 2024: GTM Sales</h3>
                                            <ul>
                                                <li>AI-Assisted Lead Nurturing</li>
                                                <li>AI Magic Ads</li>
                                                <li>200+ Workflow Automations</li>
                                                <li>++ Chrome Extension ++</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="timeline-article timeline-article-top yellow">
                                        <div className="meta-date">
                                            <span>July / Aug 24</span>
                                        </div>
                                        <div className="content-box">
                                            <h3>July/August 2024: GTM Marketing</h3>
                                            <ul>
                                                <li>Workflow Builder (20+ Workflows)</li>
                                                <li>Image Generator, Text To Videos</li>
                                                <li>Website & Email Builder</li>
                                                <li>Social Media Advocacy & Management</li>
                                                <li>Performance Analytics</li>
                                                <li>++Web App++</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="timeline-article timeline-article-bottom dGreen">
                                        <div className="meta-date">
                                            <span>May 24</span>
                                        </div>
                                        <div className="content-box">
                                            <h3>May 2024: GTM Marketing</h3>
                                            <ul>
                                                <li>AI Content Generation</li>
                                                <li>Article Writer</li>
                                                <li>Code Generator</li>
                                                <li>AI Assistants</li>
                                                <li>++Web App++</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default FuturePlans;
