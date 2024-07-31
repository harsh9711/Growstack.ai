import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import './AiPartner.scss';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

function AiPartner() {
  useEffect(() => {
    AOS.init();
}, []);
  return (
    <React.Fragment>
      <div className="aiPartner">
        <div className="container">
          <div className="head" data-aos="fade-right"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
            <h3>Our trusted AI partners</h3>
            <span className="user">Partners</span>
          </div>
        </div>
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
                <img src={`/images/aiMarket/aiPartner${(index % 12) + 1}.svg`} alt={`ai-partner-${index}`} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </React.Fragment>
  );
}

export default AiPartner;
