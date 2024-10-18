import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./VideoCreated.scss";
import Link from "next/link";
function VideoCreated() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <React.Fragment>
      <div className="videoCreated">
        <div className="container">
          <div
            className="title"
            data-aos="fade-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
          >
            <span className="user">Video created today 🔥</span>
            <h3 className="heading">
              <span>What Video Will You </span>Create Today?
            </h3>
          </div>
          <div className="allArticles">
            <div
              className="card"
              data-aos="fade-up"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000"
            >
              <div className="flex flex-col sm:flex-row items-center">
                <div className="w-full sm:w-5/12">
                  <div className="imgBlock">
                    <img
                      src="/images_growstack/textVideo/create1.svg"
                      className="img-fluid"
                      alt="banner"
                    />
                  </div>
                </div>
                <div className="w-full sm:w-7/12">
                  <div className="card-body">
                    <h5>Script to video in just minutes</h5>
                    <p>
                      Professional quality videos from your script complete with
                      realistic AI voices, matching footage and music in just a
                      few clicks.
                    </p>
                    <div className="btns vbtn">
                      <Link href="/auth/register" className="sheen">
                        Read More{" "}
                        <svg
                          width="21"
                          height="16"
                          viewBox="0 0 21 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z"
                            fill="black"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="card"
              data-aos="fade-up"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000"
            >
              <div className="flex flex-col sm:flex-row items-center">
                <div className="w-full sm:w-5/12">
                  <div className="imgBlock">
                    <img
                      src="/images_growstack/textVideo/create2.svg"
                      className="img-fluid"
                      alt="banner"
                    />
                  </div>
                </div>
                <div className="w-full sm:w-7/12">
                  <div className="card-body">
                    <h5>
                      Turn blog posts into videos for better sEO and reduced
                      bounce rates
                    </h5>
                    <p>
                      Blog posts automatically become captivating videos both
                      that readers and search engines love.
                    </p>
                    <div className="btns">
                      <Link href="/auth/register" className="sheen">
                        Read More{" "}
                        <svg
                          width="21"
                          height="16"
                          viewBox="0 0 21 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z"
                            fill="black"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="card"
              data-aos="fade-up"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000"
            >
              <div className="flex flex-col sm:flex-row items-center">
                <div className="w-full sm:w-5/12">
                  <div className="imgBlock">
                    <img
                      src="/images_growstack/textVideo/create1.svg"
                      className="img-fluid"
                      alt="banner"
                    />
                  </div>
                </div>
                <div className="w-full sm:w-7/12">
                  <div className="card-body">
                    <h5>
                      Transform long-form videos into engaging branded clips for
                      social media
                    </h5>
                    <p>
                      Professional quality videos from your script complete with
                      realistic AI voices, matching footage and music in just a
                      few clicks.
                    </p>
                    <div className="btns">
                      <Link href="/auth/register" className="sheen">
                        Read More{" "}
                        <svg
                          width="21"
                          height="16"
                          viewBox="0 0 21 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z"
                            fill="black"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="laptopImg"
            data-aos="fade-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
          >
            <img
              src="/images_growstack/textVideo/laptop.svg"
              className="img-fluid"
              alt="laptop"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default VideoCreated;
