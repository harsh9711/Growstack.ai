import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./FuturePlans.scss";

function FuturePlans() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <React.Fragment>
      <div className="futurePlans pb-3">
        <div className="container">
          <div className="row">
            <div
              className="title"
              data-aos="fade-up"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000"
            >
              <span className="user">Future plans</span>
              <h3 className="heading">
                <span>Growing with you: </span>Our exciting roadmap
              </h3>
              <p>
                We're committed to continually enhancing our platform with love
                and innovation.
              </p>
            </div>
            <div
              className="timeLine"
              data-aos="fade-up"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000"
            >
              <section className="main-timeline-section">
                <div className="conference-center-line"></div>
                <div className="conference-timeline-content">
                  <div className="timeline-article timeline-article-bottom green">
                    <div className="meta-date">
                      <span>May 2025</span>
                    </div>
                    <div className="content-box">
                      <h3>May 2025: GTM Advanced Capabilities</h3>
                      <ul>
                        <li>Agentic Workflows</li>
                        <li>AI-Powered Calling</li>
                        {/* <li>Offline Mode Support</li> */}
                      </ul>
                      <br />
                      <h3>Offline Mode Support</h3>
                    </div>
                  </div>
                  <div className="timeline-article timeline-article-top froze">
                    <div className="meta-date">
                      <span>Feb 2025</span>
                    </div>
                    <div className="content-box">
                      <h3>Feb 2025: GTM Marketing</h3>
                      <ul>
                        <li>Enterprise Launch</li>
                        <li>AI Magic Ads</li>
                        <li>AI-Assisted Lead Nurturing</li>
                        <li>AI-Assisted LinkedIn Automation</li>
                        <li>Integration with Sales Cloud</li>
                        {/* <li</li> */}
                      </ul>
                      <br /> <h3>Desktop Apps Release</h3>
                    </div>
                  </div>
                  <div className="timeline-article timeline-article-bottom pink">
                    <div className="meta-date">
                      <span>Dec 2024</span>
                    </div>
                    <div className="content-box">
                      <h3>Dec 2024: GTM LLM</h3>
                      <ul>
                        <li>GrowStack LLM</li>
                        <li>AI Parallel Workflows</li>
                        <li></li>
                      </ul>
                      <br />
                      <h3>Mobile App Launch</h3>
                    </div>
                  </div>
                  <div className="timeline-article timeline-article-top yellow">
                    <div className="meta-date">
                      <span>Oct 2024</span>
                    </div>
                    <div className="content-box">
                      <h3>Oct 2024: GTM Brand Awareness</h3>
                      <ul>
                        <li></li>
                        <li>AI Chat with Brand Integration</li>
                        <li>Secured Chat & Web Access</li>
                        <li>Workflow Builder</li>
                        <li>Image Generator & Text to Avatar</li>
                        <li>Social Media Integration</li>
                        <li> Scheduler, Conversation, Analytics</li>
                        <li>Chrome Extension Release</li>
                      </ul>
                      <br /> <h3>Public Launch</h3>
                    </div>
                  </div>
                  <div className="timeline-article timeline-article-bottom dGreen">
                    <div className="meta-date">
                      <span>May 24</span>
                    </div>
                    <div className="content-box">
                      <h3>May 24: GTM Content Generation</h3>{" "}
                      <ul>
                        <li>AI Chat</li>
                        <li>AI Content wizard</li>
                        <li>AI Assistants</li>
                        <li>AI Templates</li>
                        <li>Web App Launch</li>
                      </ul>
                      <br />
                      <h3 className="text-[12px]">
                        Friends & Family, Investor Preview
                      </h3>{" "}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FuturePlans;
