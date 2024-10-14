import React, { useEffect, useState } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import './AiBuilder.scss';

const tabData = [
    { id: 'website', title: 'AI website builder' },
    { id: 'email', title: 'AI email builder' },
];

function AiBuilder() {
    const [activeTab, setActiveTab] = useState(tabData[0].id);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <React.Fragment>
            <div className="aiBuilder">
                <div className="container">
                    <div className="head">
                        <div className='content' data-aos="fade-right"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                            <span className="user">Both explain</span>
                            <h3 className="heading">
                                <span>Transform Your Ideas into </span> Stunning Websites with AI
                            </h3>
                        </div>
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist" data-aos="fade-left"
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
                    </div>
                    <div className="tabsBlock">
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
                                    {activeTab === 'website' && (
                                        <div className="contentBlock">
                                            <div className="row ">
                                                <div className="" data-aos="fade-right"
                                                    data-aos-easing="ease-in-sine"
                                                    data-aos-duration="1000">
                                                    <div className="block">
                                                        <h3>Create a website in minutes with AI</h3>
                                                        <div className="description">
                                                            <h5>Choose how to build</h5>
                                                            <p>Let AI generate a unique website for you or pick from 150 professional templates – fully customizable to your liking.</p>
                                                        </div>
                                                        <div className="description">
                                                            <h5>Customize Your website</h5>
                                                            <p>Let AI generate a unique website for you or pick from 150 professional templates – fully customizable to your liking.</p>
                                                        </div>
                                                        <div className="description">
                                                            <h5>Go Live</h5>
                                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam tempore commodi ex recusandae ipsum harum molestiae ea porro labore dicta?</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="" data-aos="fade-left"
                                                    data-aos-easing="ease-in-sine"
                                                    data-aos-duration="1000">
                                                    <img src="/images_growstack/emailBuilder/aiWeb.svg" alt="accord" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === 'email' && (
                                        <div className="contentBlock">
                                            <div className="row ">
                                                <div className="" data-aos="fade-right"
                                                    data-aos-easing="ease-in-sine"
                                                    data-aos-duration="1000">
                                                    <div className="block">
                                                        <h3>Create professional emails in minutes with AI</h3>
                                                        <div className="description">
                                                            <h5>Choose a template</h5>
                                                            <p>Pick from our library of professionally designed email templates or let AI generate a unique one for you.</p>
                                                        </div>
                                                        <div className="description">
                                                            <h5>Customize your email</h5>
                                                            <p>Use our drag-and-drop editor to customize your email. Add text, images, and more to make it your own.</p>
                                                        </div>
                                                        <div className="description">
                                                            <h5>Send and track</h5>
                                                            <p>Send your email with a single click and track its performance with our built-in analytics tools.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="" data-aos="fade-left"
                                                    data-aos-easing="ease-in-sine"
                                                    data-aos-duration="1000">
                                                    <img src="/images_growstack/emailBuilder/aiWeb.svg" alt="accord" />
                                                </div>
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

export default AiBuilder;
