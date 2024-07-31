import React, { useEffect } from 'react'
import './OurProcess.scss'
import AOS from "aos";
import "aos/dist/aos.css";

function OurProcess() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <React.Fragment>
      <div className="ourProcess">
        <div className="container">
          <div className="content">
            <div className="title" data-aos="fade-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000">
              <span className='user'>Our process</span>
              <h2 className='heading'><span>Effortlessly create</span> AI magicflow!</h2>
              <p>Build AI-driven workflows with ease. Automate tasks and collaborate seamlessly with our fun no-code tool.</p>
            </div>
            <div data-aos="fade-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000">
            <img src="/images_growstack/home/process.svg" alt="process" />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default OurProcess
