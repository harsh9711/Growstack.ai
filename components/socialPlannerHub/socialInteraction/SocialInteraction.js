import Link from "next/link";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./SocialInteraction.scss";

function SocialInteraction() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <React.Fragment>
      <div className="socialInteraction">
        <div className="container">
          <div className="block">
            <div className="row align-items-center">
              <div className="col-md-6" data-aos="fade-right" data-aos-easing="ease-in-sine" data-aos-duration="1000">
                <div className="imgBlock">
                  <img src="/images_growstack/social/s1.svg" alt="img" />
                </div>
              </div>
              <div className="col-md-6" data-aos="fade-left" data-aos-easing="ease-in-sine" data-aos-duration="1000">
                <div className="content">
                  <h3>WhatsApp automation revolutionizes customer interaction</h3>
                  <ul>
                    <li>
                      <img src="/images_growstack/social/check.svg" alt="img" /> Boosts efficiency on WhatsApp’s messaging platform through automation
                    </li>
                    <li>
                      <img src="/images_growstack/social/check.svg" alt="img" /> Automates routine communication tasks for various industries
                    </li>
                    <li>
                      <img src="/images_growstack/social/check.svg" alt="img" /> Significantly enhances customer service and engagement
                    </li>
                    <div className="btns">
                      <Link href="/auth/register" className="sheen">
                        Get Started{" "}
                        <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z"
                            fill="black"
                          />
                        </svg>
                      </Link>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="block">
            <div className="row align-items-center">
              <div className="col-md-6" data-aos="fade-right" data-aos-easing="ease-in-sine" data-aos-duration="1000">
                <div className="content">
                  <h3>Telegram automation streamlines business operations</h3>
                  <ul>
                    <li>
                      <img src="/images_growstack/social/check.svg" alt="img" /> Enhances operational efficiency with automated workflows on Telegram's platform
                    </li>
                    <li>
                      <img src="/images_growstack/social/check.svg" alt="img" /> Integrates seamlessly with various industry-specific applications
                    </li>
                    <li>
                      <img src="/images_growstack/social/check.svg" alt="img" /> Facilitates real-time updates and notifications, boosting responsiveness and
                      service quality
                    </li>
                    <div className="btns">
                      <Link href="/auth/register" className="sheen">
                        Get Started{" "}
                        <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z"
                            fill="black"
                          />
                        </svg>
                      </Link>
                    </div>
                  </ul>
                </div>
              </div>
              <div className="col-md-6" data-aos="fade-left" data-aos-easing="ease-in-sine" data-aos-duration="1000">
                <div className="imgBlock">
                  <img src="/images_growstack/social/s2.svg" alt="img" />
                </div>
              </div>
            </div>
          </div>
          <div className="block">
            <div className="row align-items-center">
              <div className="col-md-6" data-aos="fade-right" data-aos-easing="ease-in-sine" data-aos-duration="1000">
                <div className="imgBlock">
                  <img src="/images_growstack/social/s3.svg" alt="img" />
                </div>
              </div>
              <div className="col-md-6" data-aos="fade-left" data-aos-easing="ease-in-sine" data-aos-duration="1000">
                <div className="content">
                  <h3>Social media analytics</h3>
                  <p>
                    Effortlessly transform your videos with our AI-powered voiceover tool, allowing you to change the voiceover from one language to another.
                  </p>
                  <p>
                    Enhance your global reach by converting your original audio into high-quality, natural-sounding voiceovers in multiple languages, perfect
                    for engaging a diverse audience and expanding your content's impact.
                  </p>
                  <ul>
                    <li>
                      <img src="/images_growstack/social/check.svg" alt="img" /> Boosts efficiency on WhatsApp’s messaging platform through automation
                    </li>
                    <li>
                      <img src="/images_growstack/social/check.svg" alt="img" /> Automates routine communication tasks for various industries
                    </li>
                    <li>
                      <img src="/images_growstack/social/check.svg" alt="img" /> Significantly enhances customer service and engagement
                    </li>
                    <div className="btns">
                      <Link href="/auth/register" className="sheen">
                        Get Started{" "}
                        <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z"
                            fill="black"
                          />
                        </svg>
                      </Link>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="block">
            <div className="row align-items-center">
              <div className="col-md-6" data-aos="fade-right" data-aos-easing="ease-in-sine" data-aos-duration="1000">
                <div className="content">
                  <h3>Ads analytics</h3>
                  <p>
                    Effortlessly transform your videos with our AI-powered voiceover tool, allowing you to change the voiceover from one language to another.{" "}
                  </p>
                  <p>
                    Enhance your global reach by converting your original audio into high-quality, natural-sounding voiceovers in multiple languages, perfect
                    for engaging a diverse audience and expanding your content's impact.
                  </p>
                  <ul>
                    <li>
                      <img src="/images_growstack/social/check.svg" alt="img" /> Dolor duis lorem enim eu turpis potenti nulla semper{" "}
                    </li>
                    <li>
                      <img src="/images_growstack/social/check.svg" alt="img" /> Automates routine communication tasks for various industries
                    </li>
                    <li>
                      <img src="/images_growstack/social/check.svg" alt="img" /> Significantly enhances customer service and engagement
                    </li>
                    <div className="btns">
                      <Link href="/auth/register" className="sheen">
                        Get Started{" "}
                        <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z"
                            fill="black"
                          />
                        </svg>
                      </Link>
                    </div>
                  </ul>
                </div>
              </div>
              <div className="col-md-6" data-aos="fade-left" data-aos-easing="ease-in-sine" data-aos-duration="1000">
                <div className="imgBlock">
                  <img src="/images_growstack/social/s4.svg" alt="img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SocialInteraction;
