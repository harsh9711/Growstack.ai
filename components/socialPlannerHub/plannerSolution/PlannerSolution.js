import React, { useEffect, useState } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import './PlannerSolution.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';

const tabData = [
    { id: 'scheduler', title: 'Scheduler pages', img: '/images_growstack/social/tab1.svg', description: 'Effortlessly plan and schedule your social media posts across platforms with our intuitive scheduler pages.' },
    { id: 'conversation', title: 'Social media conversation', img: '/images_growstack/social/tab3.svg', description: 'Effortlessly manage and engage in social media conversations across platforms.' },
    { id: 'ads', title: 'Ads analytics', img: '/images_growstack/social/tab2.svg', description: 'Analyze your social media ads performance with detailed analytics.' },
    { id: 'analytics', title: 'Social media analytics', img: '/images_growstack/social/tab2.svg', description: 'Gain insights into your social media performance with comprehensive analytics.' },
    { id: 'reputation', title: 'Reputation management', img: '/images_growstack/social/tab4.svg', description: 'Manage your social media reputation effectively across various platforms.' },
];

const accordionItems = [
    { eventKey: '0', header: 'Multi-Platform Management', body: 'Seamlessly schedule posts across various social media platforms. Simplify content management for streamlined execution.' },
    { eventKey: '1', header: 'Organised Calendar', body: 'Keep your content organized with our easy-to-use calendar view. Plan and track your social media strategy effortlessly.' },
];

function PlannerSolution() {
    const [activeTab, setActiveTab] = useState(tabData[0].id);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <div className="plannerSolution">
            <div className="container">
                <div className="head" data-aos="fade-right"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                    <span className="user">Schedule in under 1 minute</span>
                    <h3 className="heading mt-2"><span>Your all in one </span>social planner solution</h3>
                </div>
                <div className="tabsBlock">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                        {tabData.map((tab, index) => (
                            <li className="nav-item" role="presentation" key={index}>
                                <button
                                    className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                                    id={`pills-${tab.id}-tab`}
                                    type="button"
                                    role="tab"
                                    aria-controls={`pills-${tab.id}`}
                                    aria-selected={activeTab === tab.id}
                                    onClick={() => handleTabClick(tab.id)}
                                >
                                    <img src={tab.img} alt="img" /> {tab.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        {tabData.map((tab, index) => (
                            <div
                                className={`tab-pane fade ${activeTab === tab.id ? 'show active' : ''}`}
                                id={`pills-${tab.id}`}
                                role="tabpanel"
                                aria-labelledby={`pills-${tab.id}-tab`}
                                tabIndex="0"
                                key={index}
                            >
                                <div className="accordionBlock">
                                    <div className="row align-items-center">
                                        <div className="col-md-6" data-aos="fade-right"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                                            <div className="block">
                                                <p>{tab.description}</p>
                                                <Accordion defaultActiveKey="0">
                                                    {accordionItems.map((item) => (
                                                        <Accordion.Item eventKey={item.eventKey} key={item.eventKey}>
                                                            <Accordion.Header>{item.header}</Accordion.Header>
                                                            <Accordion.Body>{item.body}</Accordion.Body>
                                                        </Accordion.Item>
                                                    ))}
                                                </Accordion>
                                            </div>
                                        </div>
                                        <div className="col-md-6" data-aos="fade-left"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                                            <img src="/images_growstack/social/accord.svg" alt="accord" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlannerSolution;
