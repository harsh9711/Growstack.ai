import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import './MarketingAutomate.scss';

const MarketingAutomate: React.FC = () => {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <React.Fragment>
            <div className="marketingAutomate">
                <div className="container">
                    <div className="title" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                        <span className="user">Automate</span>
                        <h2 className='heading mt-2'><span>Streamline complex </span>marketing workflows</h2>
                        <p>Marketing workflows, ensuring consistency and efficiency across all marketing activates and helping you manage both daily tasks and strategic initiatives.</p>
                    </div>
                    <div className='flipImg' data-aos="flip-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                    <img src="/images_growstack/solutions/automate.svg" alt="automate" />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default MarketingAutomate;
