import React, { useEffect, useState } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import './MarketingInsights.scss';

const tabData = [
    { id: 'prospecting', title: 'Targeted prospecting', icon: '/images_growstack/solutions/datah1.svg', image: '/images_growstack/solutions/data1.svg' },
    { id: 'insights', title: 'Data insights', icon: '/images_growstack/solutions/datah2.svg',  image: '/images_growstack/solutions/data2.svg' },
    { id: 'monitoring', title: 'Brand monitoring', icon: '/images_growstack/solutions/datah3.svg', image: '/images_growstack/solutions/data3.svg' },
    { id: 'metrics', title: 'Performance metrics', icon: '/images_growstack/solutions/datah4.svg', image: '/images_growstack/solutions/data4.svg' },
];

const MarketingInsights: React.FC = () =>  {
    const [activeTab, setActiveTab] = useState(tabData[0].id);

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
    };

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <React.Fragment>
            <div className="marketingInsights">
                <div className="container">
                    <div data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="1000">
                        <span className="user">Insights</span>
                        <h2 className="heading mt-2"><span>Manage and analyze</span> data effectively</h2>
                    </div>
                    <div className="tabsBlock">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <ul className="nav flex-column nav-pills">
                                    {tabData.map((tab) => (
                                        <li className="nav-item" key={tab.id}>
                                            <button
                                                className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                                                onClick={() => handleTabClick(tab.id)}
                                            >
                                                <img className='tab-icon' src={tab.icon} alt="" />
                                                <span>{tab.title}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="col-md-6">
                                {tabData.map((tab) => (
                                    <div
                                        className={`tab-content ${activeTab === tab.id ? 'show active' : ''}`}
                                        key={tab.id}
                                    >
                                        <img src={tab.image} alt={tab.title} className="img-fluid" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default MarketingInsights;
