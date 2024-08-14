import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./AgentsDepartment.scss";
import Link from "next/link";
function AgentsDepartment() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <React.Fragment>
      <div className="agentsDepartment">
        <div className="container">
          <div className="row">
            <div className="cardsBlock">
              <div className="row">
                <div className="col-md-4 my-2 my-md-3" data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="1000">
                  <span className="user">From idea to video in minutes 🔥</span>
                  <h3 className="heading">
                    <span>Agent for </span> <br />
                    every department
                  </h3>
                  <Link href="/auth/register" className="sheen">
                    Get Started <img src="/images_growstack/home/arrow.svg" alt="arrow" />
                  </Link>
                </div>
                <div className="col-md-4 my-2 my-md-3" data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="1000">
                  <div className="card">
                    <div className="card-body">
                      <div className="icon">
                        <img src="/images_growstack/salesMarketing/legal.svg" alt="icon" />
                      </div>
                      <h5 className="heading">
                        <span>Insight </span>
                        analysts
                      </h5>
                      <p className="card-text">
                        Ensure your business stays compliant with the ever-evolving legal landscape. Our Legal & Compliance AI Agents offer precise, real-time
                        insights and complex legal processes, reducing risks and safeguarding your organization's reputation."
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 my-2 my-md-3" data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="1000">
                  <div className="card">
                    <div className="card-body">
                      <div className="icon">
                        <img src="/images_growstack/salesMarketing/legal.svg" alt="icon" />
                      </div>
                      <h5 className="heading">
                        <span>Marketing & branding</span>
                        agents
                      </h5>
                      <p className="card-text">
                        Transform your marketing strategies with our AI-driven Marketing & Branding Agents. Leverage advanced analytics and personalized content
                        to captivate your audience, elevate your brand, and drive impactful campaigns."
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 my-2 my-md-3" data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="1000">
                  <div className="card">
                    <div className="card-body">
                      <div className="icon">
                        <img src="/images_growstack/salesMarketing/legal.svg" alt="icon" />
                      </div>
                      <h5 className="heading">
                        <span>Sales</span>
                        agents
                      </h5>
                      <p className="card-text">
                        Boost your sales performance with our cutting-edge Sales AI Agents. Our AI solutions streamline your sales processes, enhance customer
                        interactions, and maximize your revenue potential.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 my-2 my-md-3" data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="1000">
                  <div className="card">
                    <div className="card-body">
                      <div className="icon">
                        <img src="/images_growstack/salesMarketing/legal.svg" alt="icon" />
                      </div>
                      <h5 className="heading">
                        <span>Customer success</span>
                        architects
                      </h5>
                      <p className="card-text">
                        Optimize your executive workflows with our AI-powered C-Level Agents. Provide C-suite leaders with data-driven insights, and enhance
                        strategic decision-making for superior organizational leadership.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 my-2 my-md-3" data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="1000">
                  <div className="card">
                    <div className="card-body">
                      <div className="icon">
                        <img src="/images_growstack/salesMarketing/legal.svg" alt="icon" />
                      </div>
                      <h5 className="heading">
                        <span>Tech</span>
                        wizards
                      </h5>
                      <p className="card-text">
                        Elevate your human resources functions with our AI-enabled HR Agents. From recruitment to employee engagement, our intelligent solutions
                        streamline HR operations, foster a positive workplace culture, and enhance overall productivity.
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

export default AgentsDepartment;
