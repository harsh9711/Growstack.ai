import React from "react";
import "./ElevateBrand.scss";
function ElevateBrand() {
  return (
    <React.Fragment>
      <div className="elevateBrand">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center mb-0">
            <div
              className="w-full sm:w-1/2"
              data-aos="fade-right"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000"
            >
              <span className="user">Core Features</span>
              <h3 className="heading mt-2 mb-2 mb-md-0">
                <span>Elevate your brand with</span> AI-powered video innovation
              </h3>
            </div>
            <div
              className="w-full sm:w-1/2"
              data-aos="fade-left"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000"
            >
              <p>
                Transform your brand's presence and engagement with AI-powered
                videos, harnessing advanced technology to captivate audiences
                and elevate your market impact.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="cardsBlock">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div
                  className=""
                  data-aos="fade-up"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="1000"
                >
                  <div className="card">
                    <div className="card-body">
                      <div className="icon">
                        <img
                          src="/images_growstack/textVideo/elevate1.svg"
                          alt="icon"
                        />
                      </div>
                      <h5 className="card-title">
                        Set your brand up for social media success
                      </h5>
                      <p className="card-text">
                        Plan and execute a video content strategy that will
                        significantly increase your brand’s exposure, awareness
                        and engagement.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className=""
                  data-aos="fade-up"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="1000"
                >
                  <div className="card">
                    <div className="card-body">
                      <div className="icon">
                        <img
                          src="/images_growstack/textVideo/elevate2.svg"
                          alt="icon"
                        />
                      </div>
                      <h5 className="card-title">Start a new revenue stream</h5>
                      <p className="card-text">
                        Turn video into a monetizable asset that helps you gain
                        new customers and scale your business.
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className=""
                  data-aos="fade-up"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="1000"
                >
                  <div className="card">
                    <div className="card-body">
                      <div className="icon">
                        <img
                          src="/images_growstack/textVideo/elevate3.svg"
                          alt="icon"
                        />
                      </div>
                      <h5 className="card-title">
                        Save time and optimize your workflow
                      </h5>
                      <p className="card-text">
                        Increase the scale and speed of your video creation.
                        Save time, maximize resources and lower production
                        costs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ElevateBrand;
