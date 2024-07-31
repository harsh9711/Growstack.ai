import React, { useEffect,useState } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import './Template.scss';

const tabData = [
    { id: 'creative', title: 'Creative' },
    { id: 'newsletters', title: 'Newsletters' },
    { id: 'trigger', title: 'Trigger' },
    { id: 'holidays', title: 'Holidays' },
    { id: 'events', title: 'Events' },
];

const tabContent = {
    creative: [
        '/images_growstack/emailBuilder/template1.svg',
        '/images_growstack/emailBuilder/template2.svg',
        '/images_growstack/emailBuilder/template3.svg',
        '/images_growstack/emailBuilder/template4.svg',
        '/images_growstack/emailBuilder/template5.svg',
        '/images_growstack/emailBuilder/template6.svg',
        '/images_growstack/emailBuilder/template7.svg',
        '/images_growstack/emailBuilder/template8.svg'
    ],
    newsletters: [
        '/images_growstack/emailBuilder/template3.svg',
        '/images_growstack/emailBuilder/template4.svg',
        '/images_growstack/emailBuilder/template5.svg',
        '/images_growstack/emailBuilder/template6.svg'
    ],
    trigger: [
        '/images_growstack/emailBuilder/template2.svg',
        '/images_growstack/emailBuilder/template3.svg',
        '/images_growstack/emailBuilder/template5.svg',
        '/images_growstack/emailBuilder/template7.svg'
    ],
    holidays: [
        '/images_growstack/emailBuilder/template1.svg',
        '/images_growstack/emailBuilder/template4.svg',
        '/images_growstack/emailBuilder/template6.svg',
        '/images_growstack/emailBuilder/template8.svg'
    ],
    events: [
        '/images_growstack/emailBuilder/template2.svg',
        '/images_growstack/emailBuilder/template4.svg',
        '/images_growstack/emailBuilder/template6.svg',
        '/images_growstack/emailBuilder/template8.svg'
    ],
};

function Template() {
    const [activeTab, setActiveTab] = useState(tabData[0].id);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <React.Fragment>
            <div className="template">
                <div className="container">
                    <div className="title" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                        <span className="user">Template</span>
                        <h3 className="heading"><span>1500+ free </span>HTML email templates</h3>
                    </div>
                    <div className="templateBlock">
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
                                        {tab.title}
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
                                    {activeTab === tab.id && (
                                        <div className="contentBlock">
                                            <div className="row">
                                                {tabContent[tab.id].map((image, imgIndex) => (
                                                    <div className="col-lg-3 col-md-4 my-2 my-md-2 px-2" data-aos="fade-up"
                                                    data-aos-easing="ease-in-sine"
                                                    data-aos-duration="1000" key={imgIndex}>
                                                        <img src={image} alt="template" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Template;
