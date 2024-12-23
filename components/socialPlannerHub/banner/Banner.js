import Link from "next/link";
import React from "react";
import "./Banner.scss";
// import { Autoplay, Navigation } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';

function Banner() {
  return (
    <React.Fragment>
      <div className="plannerBanner">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="w-full sm:w-1/2 ">
              <div className="bannerContent">
                <span className="user">FEATURE</span>
                <h2>Social Planner Hub</h2>
                <p>
                  Create, schedule, publish, and track your social media growth
                  with GrowStack Social Media AI
                </p>
                <div className="btns pbtn">
                  <Link href="/auth/register" className="sheen">
                    Get a free trial{" "}
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
            </div>
            <div className="w-full  sm:w-1/2 bannerImg">
              <img src="/images_growstack/social/banner.svg" alt="banner" />
            </div>
          </div>
        </div>
        {/* <div className="company">
                    <Swiper
                        slidesPerView={12}
                        spaceBetween={10}
                        autoplay={{
                            delay: 500,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        speed={5000}
                        centeredSlides={true}
                        navigation={false}
                        modules={[Autoplay, Navigation]}
                        className="mySwiper"
                        breakpoints={{
                            1400: {
                                slidesPerView: 10,
                                spaceBetween: 10,
                            },
                            1000: {
                                slidesPerView: 8,
                                spaceBetween: 10,
                            },
                            600: {
                                slidesPerView: 4,
                                spaceBetween: 10,
                            },
                            0: {
                                slidesPerView: 3,
                                spaceBetween: 10,
                            },
                        }}
                    >
                        {[...Array(20).keys()].map((index) => (
                            <SwiperSlide key={index}>
                                <div className="imgBlock">
                                    <img src={`/images_growstack/aiMarket/aiPartner${(index % 12) + 1}.svg`} alt={`ai-partner-${index}`} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div> */}
      </div>
    </React.Fragment>
  );
}

export default Banner;
