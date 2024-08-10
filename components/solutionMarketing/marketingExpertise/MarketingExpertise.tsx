import React, { useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import './MarketingExpertise.scss';

const MarketingExpertise: React.FC = () => {
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <React.Fragment>
            <div className="marketingExpertise">
                <div className="container">
                    <div className="title" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                        <span className="user">Expertise</span>
                        <h2 className='heading mt-2'><span>Driving marketing excellence </span>with
                        proven expertise</h2>
                        <p>With ❤️ for marketing and over <b>10 years of experience</b>, our founder turns challenges into opportunities. Having faced marketing complexities firsthand, he created Growstack to address these challenges.</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default MarketingExpertise;
