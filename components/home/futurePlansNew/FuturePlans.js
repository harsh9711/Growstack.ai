import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import './FuturePlans.scss';

function FuturePlans() {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div className="futurePlans">
            <div className="container">
                <div className="title" data-aos="fade-up"
                    data-aos-easing="ease-in-sine"
                    data-aos-duration="1000">
                    <span className="user">Future plans</span>
                    <h3 className="heading">
                        <span>Growing with you: </span>Our exciting roadmap
                    </h3>
                    <p>We're committed to continually enhancing our platform with love and innovation.</p>
                </div>

                <div className="plan-card-block">
                    <div className="plan-card-flex">
                        <div className="cards-flex">
                        {/* May 2024 Section */}
                        <div className="plan-card" data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="1000" style={{ backgroundColor: '#e6edeb4d', borderLeft:"4px solid #00B783" }}>
                            <h4>May 2024: <br /> GTM marketing</h4>
                            <ul>
                                <li>AI content generation</li>
                                <li>Article writer</li>
                                <li>Code generator</li>
                                <li>AI assistants</li>
                                <li>++Web app++</li>
                            </ul>
                        </div>

                    {/* July/August 2024 Section */}
                        <div className="plan-card" data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="1000" style={{ backgroundColor: '#fef6d44d', borderRight:"4px solid #E7C226" }}>
                            <h4>July/August 2024: <br /> GTM marketing</h4>
                            <ul>
                                <li>Workflow builder (20+ workflows)</li>
                                <li>Image generator</li>
                                <li>Text to Videos</li>
                                <li>Website & Email builder</li>
                                <li>Social media advocacy & management</li>
                                <li>Performance analytics</li>
                                <li>++Web app++</li>
                            </ul>
                        </div>
                        </div>
                        <img src="/images_growstack/home/roadmapLine.svg" alt="roadmapLine" />
                        <div className="cards-flex">
                    {/* October 2024 Section */}
                    <div className="plan-card" data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="1000" style={{ backgroundColor: '#fae8f14d', borderLeft:"4px solid #D75395" }}>
                            <h4>October 2024: <br /> GTM sales</h4>
                            <ul>
                                <li>AI-assisted lead nurturing</li>
                                <li>AI magic ads</li>
                                <li>200+ workflow automations</li>
                                <li>AI assistants</li>
                                <li>++Chrome extension++</li>
                            </ul>
                        </div>

                    {/* December 2024 Section */}
                        <div className="plan-card" data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="1000" style={{ backgroundColor: '#e1faf84d', borderRight:"4px solid #06D2C2" }}>
                            <h4>December 2024: <br /> GTM business</h4>
                            <ul>
                                <li>AI finance</li>
                                <li>AI customer service</li>
                                <li>500+ workflow automation</li>
                                <li>++Web app++</li>
                            </ul>
                        </div>
                        </div>
                    </div>

                    {/* May 2025 Section */}
                        <div className="plan-card verticalCard" data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="1000" style={{ backgroundColor: '#e2f0cb4d', borderTop:"4px solid #8CBD3B" }}>
                            <h4>May 2025: <br /> GTM Verticals</h4>
                            <img src="/images_growstack/home/verticalArrow.svg" alt="verticalArrow" />
                            <ul>
                                <li>AI agri</li>
                                <li>AI retail</li>
                                <li>AI Manufacturing</li>
                                <li>2000+ workflows</li>
                                <li>++Work Offline++</li>
                            </ul>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default FuturePlans;
