import React from 'react'
import './AiTextSlider.scss'
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
function AiTextSlider() {
  return (
    <React.Fragment>
        <div className="aiTextSlider">
        <Swiper
          slidesPerView={4.5}
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
              slidesPerView: 4.5,
              spaceBetween: 10,
            },
            1000: {
              slidesPerView: 3.5,
              spaceBetween: 10,
            },
            600: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            0: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
          }}
        >
      {[...Array(20).keys()].map((index) => (
                        <SwiperSlide key={index}>
                            <div className="imgBlock">
                                <img src={`/images/textVideo/ais${(index % 5) + 1}.svg`} alt="ais" />
                            </div>
                        </SwiperSlide>
                    ))}
        </Swiper>
        </div>
    </React.Fragment>
  )
}

export default AiTextSlider
