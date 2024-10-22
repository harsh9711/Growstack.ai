import Link from "next/link";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./CustomerStories.scss";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
function CustomerStories() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <React.Fragment>
      <div className="customerStories">
        <div className="container">
          <div className="head">
            <div
              data-aos="fade-right"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000"
            >
              <span className="user">Customer Stories</span>
              <h3 className="heading">
                <span>Don’t take our words </span> for it listen to our
                customers
              </h3>
            </div>
            <div
              className="btns"
              data-aos="fade-left"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000"
            >
              <Link href="/all-stories" className="sheen">
                See all stories{" "}
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
        <Swiper
          slidesPerView={4}
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
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1000: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            600: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
          }}
        >
          <SwiperSlide>
            <div className="card">
              <img
                className="logo"
                src="/images_growstack/aiMarket/logo.svg"
                alt="customer1"
              />
              <p className="text">
                <span>“</span>The reporting and analytics features are fantastic
                and have allowed us to stay on top of our projects and make
                data-driven decisions.<span>”</span>
              </p>
              <div className="  block">
                <div className="flex-shrink-0">
                  <img src="/images_growstack/verticals/user.svg" alt="user" />
                </div>
                <div className="flex-grow-1 ms-3">
                  <h4>Josh Gould</h4>
                  <p>February 13, 2024</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <img
                className="logo"
                src="/images_growstack/aiMarket/logo.svg"
                alt="customer1"
              />
              <p className="text">
                <span>“</span>The reporting and analytics features are fantastic
                and have allowed us to stay on top of our projects and make
                data-driven decisions.<span>”</span>
              </p>
              <div className="  block">
                <div className="flex-shrink-0">
                  <img src="/images_growstack/verticals/user.svg" alt="user" />
                </div>
                <div className="flex-grow-1 ms-3">
                  <h4>Josh Gould</h4>
                  <p>February 13, 2024</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <img
                className="logo"
                src="/images_growstack/aiMarket/logo.svg"
                alt="customer1"
              />
              <p className="text">
                <span>“</span>The reporting and analytics features are fantastic
                and have allowed us to stay on top of our projects and make
                data-driven decisions.<span>”</span>
              </p>
              <div className="  block">
                <div className="flex-shrink-0">
                  <img src="/images_growstack/verticals/user.svg" alt="user" />
                </div>
                <div className="flex-grow-1 ms-3">
                  <h4>Josh Gould</h4>
                  <p>February 13, 2024</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <img
                className="logo"
                src="/images_growstack/aiMarket/logo.svg"
                alt="customer1"
              />
              <p className="text">
                <span>“</span>The reporting and analytics features are fantastic
                and have allowed us to stay on top of our projects and make
                data-driven decisions.<span>”</span>
              </p>
              <div className="  block">
                <div className="flex-shrink-0">
                  <img src="/images_growstack/verticals/user.svg" alt="user" />
                </div>
                <div className="flex-grow-1 ms-3">
                  <h4>Josh Gould</h4>
                  <p>February 13, 2024</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <img
                className="logo"
                src="/images_growstack/aiMarket/logo.svg"
                alt="customer1"
              />
              <p className="text">
                <span>“</span>The reporting and analytics features are fantastic
                and have allowed us to stay on top of our projects and make
                data-driven decisions.<span>”</span>
              </p>
              <div className="  block">
                <div className="flex-shrink-0">
                  <img src="/images_growstack/verticals/user.svg" alt="user" />
                </div>
                <div className="flex-grow-1 ms-3">
                  <h4>Josh Gould</h4>
                  <p>February 13, 2024</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <img
                className="logo"
                src="/images_growstack/aiMarket/logo.svg"
                alt="customer1"
              />
              <p className="text">
                <span>“</span>The reporting and analytics features are fantastic
                and have allowed us to stay on top of our projects and make
                data-driven decisions.<span>”</span>
              </p>
              <div className="  block">
                <div className="flex-shrink-0">
                  <img src="/images_growstack/verticals/user.svg" alt="user" />
                </div>
                <div className="flex-grow-1 ms-3">
                  <h4>Josh Gould</h4>
                  <p>February 13, 2024</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <img
                className="logo"
                src="/images_growstack/aiMarket/logo.svg"
                alt="customer1"
              />
              <p className="text">
                <span>“</span>The reporting and analytics features are fantastic
                and have allowed us to stay on top of our projects and make
                data-driven decisions.<span>”</span>
              </p>
              <div className="  block">
                <div className="flex-shrink-0">
                  <img src="/images_growstack/verticals/user.svg" alt="user" />
                </div>
                <div className="flex-grow-1 ms-3">
                  <h4>Josh Gould</h4>
                  <p>February 13, 2024</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </React.Fragment>
  );
}

export default CustomerStories;
