import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Partnership.scss";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

function Partnership() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <React.Fragment>
      <div className="partnership">
        <div className="container">
          <div
            className="title"
            data-aos="fade-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
          >
            <p>
              <b>
                Trusted partnerships & integrations across leading platforms
              </b>
            </p>
          </div>
        </div>
        <div className="partnerSlider">
          <Swiper
            slidesPerView={18}
            spaceBetween={10}
            autoplay={{
              delay: 500,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={5000}
            navigation={false}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
            breakpoints={{
              1400: {
                slidesPerView: 15,
                spaceBetween: 10,
              },
              1000: {
                slidesPerView: 11,
                spaceBetween: 10,
              },
              600: {
                slidesPerView: 7,
                spaceBetween: 10,
              },
              0: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
            }}
          >
            {[...Array(20).keys()].map(index => (
              <SwiperSlide key={index}>
                <div className="imgBlock">
                  <img
                    src={`/images_growstack/social/partner${(index % 18) + 1}.svg`}
                    alt={`partner-${index}`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className="stats"
            data-aos="fade-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
          >
            <div className="container">
              <div className="aibannerCard">
                <div className="container">
                  <div className="content">
                    <div className="block">
                      <h3>80%+</h3>
                      <p>
                        Reduction in average time <br />
                        to first response
                      </p>
                    </div>
                    <div className="block">
                      <h3>1,002%</h3>
                      <p>
                        Increase in total <br />
                        social engagements
                      </p>
                    </div>
                    <div className="block">
                      <h3>2x</h3>
                      <p>
                        Increase in average <br />
                        client retainer
                      </p>
                    </div>
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

export default Partnership;
