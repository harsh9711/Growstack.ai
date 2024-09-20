import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./PlannerSolution.scss";

const tabData = [
    {
        id: "scheduler",
        title: "Scheduler pages",
        img: "/images_growstack/social/tab1.svg",
        description: "Effortlessly plan and schedule your social media posts across platforms with our intuitive scheduler pages.",
    },
    {
        id: "conversation",
        title: "Social media conversation",
        img: "/images_growstack/social/tab3.svg",
        description: "Effortlessly manage and engage in social media conversations across platforms.",
    },
    {
        id: "ads",
        title: "Ads analytics",
        img: "/images_growstack/social/tab2.svg",
        description: "Analyze your social media ads performance with detailed analytics.",
    },
    {
        id: "analytics",
        title: "Social media analytics",
        img: "/images_growstack/social/tab2.svg",
        description: "Gain insights into your social media performance with comprehensive analytics.",
    },
    {
        id: "reputation",
        title: "Reputation management",
        img: "/images_growstack/social/tab4.svg",
        description: "Manage your social media reputation effectively across various platforms.",
    },
];

const accordionItems = [
    {
        eventKey: "0",
        header: "Multi-Platform Management",
        body: "Seamlessly schedule posts across various social media platforms. Simplify content management for streamlined execution.",
    },
    {
        eventKey: "1",
        header: "Organised Calendar",
        body: "Keep your content organized with our easy-to-use calendar view. Plan and track your social media strategy effortlessly.",
    },
];

function PlannerSolution() {
    const [activeTab, setActiveTab] = useState(tabData[0].id);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <div className='plannerSolution'>
            <div className='container'>
                <div className='head' data-aos='fade-right' data-aos-easing='ease-in-sine' data-aos-duration='300'>
                    <span className='user'>Schedule in under 1 minute</span>
                    <h3 className='heading mt-2'>
                        <span>Your all in one </span>social planner solution
                    </h3>
                </div>

                <div className='tabsBlock'>
                    <ul
                        className='flex w-full justify-between space-x-4 nav nav-pills mb-3'
                        id='pills-tab'
                        role='tablist'
                        data-aos='fade-up'
                        data-aos-easing='ease-in-sine'
                        data-aos-duration='100'
                    >
                        {tabData.map((tab) => (
                            <li key={tab.id}>
                                <button
                                    className={`nav-link px-4 py-2  ${activeTab === tab.id ? "active" : ""}`}
                                    onClick={() => handleTabClick(tab.id)}
                                >
                                    <img src={tab.img} alt={tab.title} className='inline-block mr-2' />
                                    {tab.title}
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className='tab-content mt-6'>
                        {tabData.map((tab) => (
                            <div key={tab.id} className={`${activeTab === tab.id ? "block" : "hidden"}`}>
                                <div className='accordionBlock'>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-center'>
                                        <div>
                                            <p>{tab.description}</p>
                                        </div>
                                        <div>
                                            <img src='/images_growstack/social/accord.svg' alt='accord' />
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
