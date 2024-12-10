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
        <div className="w-full xl:container">
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
                      <span className="text-[#00B783] ">May 25</span>
                    </div>
                    <div className="content-box1 ml-0">
                      <h3 className="px-4 py-2">May 2025</h3>
                      <div className="text-white w-full px-6 p-2 bg-[#8CBD3B]">
                        GTM Verticals
                      </div>
                      <ul className="mt-2 grid grid-cols-2 gap-x-6 text-black font-bold ">
                        <li>AAI Agri</li>
                        <li> AI Retail </li>
                        <li>AI Manufacturing</li>
                        <li> 2000+ Workflows</li>
                        <li> ++Work Offline++ </li>
                        {/* <li>Offline Mode Support</li> */}
                      </ul>
                      <br />
                      <h3 className="text-black px-4 py-0.5">
                        Offline Mode Support
                      </h3>
                    </div>
                  </div>
                  <div className="timeline-article timeline-article-top froze">
                    <div className="meta-date">
                      <span>Dec 24</span>
                    </div>
                    <div className="content-box2">
                      <h3 className="px-4 py-2  text-[#00B783]">
                        December 2024
                      </h3>
                      <div className="text-white w-full px-6 p-2 bg-[#06D2C2]">
                        GTM Business
                      </div>
                      <ul className="mt-2  text-black font-bold ">
                        <li>AI Finance</li>
                        <li>AI Customer Service</li>
                        <li>500+ Workflow Automation</li>
                        <li>++ Desktop Apps ++</li>
                      </ul>
                      <br />{" "}
                      <h3 className="text-black px-4 py-4">
                        Desktop Apps Release
                      </h3>
                    </div>
                  </div>
                  <div className="timeline-article timeline-article-bottom pink">
                    <div className="meta-date">
                      <span>Oct 24</span>
                    </div>
                    <div className="content-box3 ml-0">
                      <h3 className="text-[#00B783] p-4">October 2024</h3>{" "}
                      <div className="text-white w-full px-6 p-2 bg-[#D75395]">
                        GTM Sales
                      </div>
                      <ul className="grid  mt-2 grid-cols-2 gap-x-8 text-black font-bold ">
                        <li>AI-Assisted Lead Nurturing</li>
                        <li>AI Magic Ads</li>
                        <li>200+ Workflow Automations</li>
                        <li>++ Chrome Extension ++</li>
                      </ul>
                      <br />
                      <h3 className="text-black px-4 py-2 ">
                        Mobile App Launch
                      </h3>
                    </div>
                  </div>
                  <div className="timeline-article timeline-article-top yellow">
                    <div className="meta-date">
                      <span>Jul / Aug 24</span>
                    </div>
                    <div className="content-box4">
                      <h3 className="text-[#00B783] p-4">July/August 2024</h3>{" "}
                      <div className="text-white w-full px-6 p-2 bg-[#E7C226]">
                        GTM Marketing
                      </div>
                      <ul className="mt-2 text-black font-bold  ">
                        <li>AI Chat with Brand Integration</li>
                        <li>Secured Chat & Web Access</li>
                        <li>Workflow Builder</li>
                        <li>Image Generator & Text to Avatar</li>
                        <li>Social Media Integration</li>
                        <li> Scheduler, Conversation, Analytics</li>
                        <li>Chrome Extension Release</li>
                      </ul>
                      <br />{" "}
                      <h3 className="text-black px-4 py-2 ">Public Launch</h3>
                    </div>
                  </div>
                  <div className="timeline-article timeline-article-bottom dGreen">
                    <div className="meta-date">
                      <span>May 24</span>
                    </div>
                    <div className="content-box5 ml-0">
                      <h3 className="text-[#00B783] p-4">May 2024</h3>{" "}
                      <div className="text-white w-full px-6 p-2 bg-[#00B783]">
                        GTM Marketing
                      </div>
                      <ul className="grid grid-cols-3 mt-2 gap-x-8 text-black font-bold ">
                        <li>AI Chat</li>
                        <li>AI Content wizard</li>
                        <li>AI Assistants</li>
                        <li>AI Templates</li>
                        <li>Web App Launch</li>
                      </ul>
                      <br />
                      <h3 className="text-black px-4 py-2 ">
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
