import Link from "next/link";
import React, { useState } from "react";
import "./Banner.scss";
import Modals from "@/components/videoBanner/Modals";

function Banner() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const videoUrl = "/images_growstack/video/intoVideo.mp4";
  return (
    <React.Fragment>
      <div className="aiMarketBanner">
        <div className="container">
          <div className="row ">
            <div className="text-center">
              <div className="bannerContent">
                <div className="content">
                  <h3 className="heading mt-0">
                    <span>AI marketing &,</span> sales app
                  </h3>
                  <p>
                    "Revolutionize your marketing and sales strategy with our
                    AI-powered apps, driving personalized experiences, boosting
                    efficiency, and maximizing ROI."
                  </p>
                  <div className="btns btn">
                    <Link href="/auth/register" className="sheen">
                      Get free trial{" "}
                      <svg
                        width="21"
                        height="16"
                        viewBox="0 0 21 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z"
                          fill="white"
                        />
                      </svg>
                    </Link>
                    <Link href="/demo" className="no-underline">
                      {" "}
                      Get a demo{" "}
                      <svg
                        width="21"
                        height="16"
                        viewBox="0 0 21 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z"
                          fill="#fff"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
                <div className="poster">
                  <img
                    onClick={handleShow}
                    style={{ cursor: "pointer" }}
                    src="/images_growstack/aiMarket/videoPoster.svg"
                    alt="banner"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modals show={show} handleClose={handleClose} videoUrl={videoUrl} />
    </React.Fragment>
  );
}

export default Banner;
