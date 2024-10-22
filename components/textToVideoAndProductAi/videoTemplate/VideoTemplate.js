import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./VideoTemplate.scss";
import Link from "next/link";
function VideoTemplate() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <React.Fragment>
      <div className="videoTemplate">
        <div className="container">
          <div
            className="title"
            data-aos="fade-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
          >
            <span className="user">Templates</span>
            <h3 className="heading">
              <span>Get started in minutes with 200+ </span>free video templates
            </h3>
          </div>
          <div className="templates">
            <div className="row">
              <div
                className=" my-2 my-md-2 px-2"
                data-aos="fade-up"
                data-aos-easing="ease-in-sine"
                data-aos-duration="1000"
              >
                <div className="block">
                  <img src="/images_growstack/textVideo/t1.svg" alt="icon" />
                  <h5>Customer service training</h5>
                </div>
              </div>
              <div
                className=" my-2 my-md-2 px-2"
                data-aos="fade-up"
                data-aos-easing="ease-in-sine"
                data-aos-duration="1000"
              >
                <div className="block">
                  <img src="/images_growstack/textVideo/t2.svg" alt="icon" />
                  <h5>Sales enablement training video</h5>
                </div>
              </div>
              <div
                className=" my-2 my-md-2 px-2"
                data-aos="fade-up"
                data-aos-easing="ease-in-sine"
                data-aos-duration="1000"
              >
                <div className="block">
                  <img src="/images_growstack/textVideo/t3.svg" alt="icon" />
                  <h5>App promo video</h5>
                </div>
              </div>
              <div
                className=" my-2 my-md-2 px-2"
                data-aos="fade-up"
                data-aos-easing="ease-in-sine"
                data-aos-duration="1000"
              >
                <div className="block">
                  <img src="/images_growstack/textVideo/t4.svg" alt="icon" />
                  <h5>Customer onboarding</h5>
                </div>
              </div>
              <div
                className=" my-2 my-md-2 px-2"
                data-aos="fade-up"
                data-aos-easing="ease-in-sine"
                data-aos-duration="1000"
              >
                <div className="block">
                  <img src="/images_growstack/textVideo/t5.svg" alt="icon" />
                  <h5>Workplace report - LinkedIn</h5>
                </div>
              </div>
              <div
                className=" my-2 my-md-2 px-2"
                data-aos="fade-up"
                data-aos-easing="ease-in-sine"
                data-aos-duration="1000"
              >
                <div className="block">
                  <img src="/images_growstack/textVideo/t6.svg" alt="icon" />
                  <h5>Conflict Of interest course</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default VideoTemplate;
