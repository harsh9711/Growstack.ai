import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./MarketingStreamline.scss";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const MarketingStreamline: React.FC = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <React.Fragment>
      <div className="marketingStreamline">
        <div className="container">
          <div
            className="title"
            data-aos="fade-right"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
          >
            <span className="user">Streamline</span>
            <h3 className="heading">
              <span>Your ultimate guide to optimizing </span> business processes
              with GrowStack
            </h3>
          </div>
        </div>
        <Swiper
          slidesPerView={3.5}
          spaceBetween={10}
          autoplay={{
            delay: 500,
            disableOnInteraction: false,
          }}
          loop
          speed={5000}
          // centeredSlides={true}
          modules={[Autoplay]}
          className="mySwiper"
          breakpoints={{
            1400: {
              slidesPerView: 3.5,
              spaceBetween: 10,
            },
            1000: {
              slidesPerView: 2.5,
              spaceBetween: 10,
            },
            600: {
              slidesPerView: 2,
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
              <span>01</span>
              <img
                src="/images_growstack/solutions/marketSol1.svg"
                alt="marketsolimg"
              />
              <h4>Strategic planning and ideation</h4>
              <p>
                Develop a comprehensive marketing strategy and plan that aligns
                with your business goals.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <span>02</span>
              <img
                src="/images_growstack/solutions/marketSol2.svg"
                alt="marketsolimg"
              />
              <h4>Content creation and development</h4>
              <p>
                Create engaging, high-quality content for various marketing
                channels.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <span>03</span>
              <img
                src="/images_growstack/solutions/marketSol3.svg"
                alt="marketsolimg"
              />
              <h4>Campaign management and execution</h4>
              <p>
                Execute marketing campaigns efficiently and nage day-to-day
                tasks.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <span>04</span>
              <img
                src="/images_growstack/solutions/marketSol4.svg"
                alt="marketsolimg"
              />
              <h4>Engaging with your audience</h4>
              <p>
                Analyze campaign performance and optimize strategies for better
                results.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <span>05</span>
              <img
                src="/images_growstack/solutions/marketSol5.svg"
                alt="marketsolimg"
              />
              <h4>Data analysis and optimization</h4>
              <p>
                Analyze campaign performance and optimize strategies for better
                results.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <span>06</span>
              <img
                src="/images_growstack/solutions/marketSol6.svg"
                alt="marketsolimg"
              />
              <h4>Integrating technologies and exploring new tools</h4>
              <p>
                Adopt new technologies and integrate tools for enhanced
                marketing capabilities.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </React.Fragment>
  );
};

export default MarketingStreamline;
