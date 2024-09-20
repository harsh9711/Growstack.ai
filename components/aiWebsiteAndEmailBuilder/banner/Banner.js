import Link from "next/link";
import React from "react";
import "./Banner.scss";

function Banner() {
  return (
    <React.Fragment>
      <div className="emailBanner">
        <div className="container">
          <div className="row align-items-center">
            <div className="text-center">
              <div className="bannerContent">
                <div className="content">
                  <span className="user">Builder</span>
                  <h3 className="heading">
                    <span>AI website landing</span> page & email builder
                  </h3>
                  <p>
                    Elevate your digital presence and streamline your work effortlessly with our all-in-one AI Website, Landing Page, and Email Builder,
                    ensuring unmatched efficiency and fostering creativity throughout.
                  </p>
                  <div className="btns ebtn">
                    <Link href="/auth/register" className="sheen">
                      Get free trial{" "}
                      <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z"
                          fill="white"
                        />
                      </svg>
                    </Link>
                    <Link href="/demo" className="no-underline">                      See demo{" "}
                      <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z"
                          fill="#fff"
                        />
                      </svg>
                    </Link>
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

export default Banner;
