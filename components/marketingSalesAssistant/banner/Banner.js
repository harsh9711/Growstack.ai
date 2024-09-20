import Link from "next/link";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Banner.scss";

function Banner() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <React.Fragment>
      <div className="marketBanner">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="bannerContent">
                <span className="user">AI assistants</span>
                <h2 className="mtitle">
                  <span>AI powered</span> <br /> <h2 className="assist">assistants</h2>
                </h2>
                <p>
                  Revolutionize your organization with our AI-powered assistants, offering tailored experiences, boosting efficiency, and achieving maximum ROI
                  across all departments.
                </p>
                <div className="btns">
                  <Link href="/auth/register" className="sheen">
                    Get free trial{" "}
                    <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z"
                        fill="#fff"
                      />
                    </svg>
                  </Link>
                  <Link href="/demo" className="no-underline">                    See demo{" "}
                    <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z"
                        fill="#fff"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="sale"></div>
                <div className="store">
                  <Link href="/auth/register">
                    <img src="/images_growstack/banner/playStore.svg" alt="banner" />
                  </Link>
                  <Link href="/auth/register">
                    <img src="/images_growstack/banner/apple.svg" alt="banner" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 bannerImg">
              <img src="/images_growstack/salesMarketing/banner.svg" alt="banner" />
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="underBanner" data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="1000">
          <img src="/aiassis.png" alt="salesMarketing" />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Banner;
