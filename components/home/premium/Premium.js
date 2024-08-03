import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import './Premium.scss'

function Premium() {
  useEffect(() => {
    AOS.init();
}, []);
  return (
    <React.Fragment>
      <div className="premium">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-5 col-md-6" data-aos="fade-right"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                    <img src="/images_growstack/home/premium.png" alt="premium" />
                </div>
                <div className="col-lg-7 col-md-6" data-aos="fade-left"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                   <div className="content">
                   <span className="user">Security</span>
                    <h3>Security & data privacy of the 
                    highest degree </h3>
                    <p>We collaborate with all major LLMs, ensuring choice and flexibility while making sure your contact data is 100% secure and cannot be used for anyone else's purposes.</p>
                   </div>
                </div>
            </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Premium
