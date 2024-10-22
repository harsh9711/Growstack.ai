import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Marketing.scss";
import walletStackList from "./walletStackList.json";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

function Marketing() {
  const [tabs, setTabs] = useState(0);
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <React.Fragment>
      <div className="marketing">
        <div className="container">
          <div
            className="title"
            data-aos="fade-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
          >
            <span className="user">Complete Marketing Ecosystem</span>
            <h3 className="heading">
              <span>Streamline your marketing workflow from</span> planning to
              engagement with Growstack
            </h3>
          </div>
        </div>
        <div
          className="wallet_tech_wrap"
          data-aos="fade-up"
          data-aos-easing="ease-in-sine"
          data-aos-duration="1000"
        >
          <div className="container">
            <div className="wallet_tech">
              <ul>
                {walletStackList.map(({ tab_button, tab_img }, index) => (
                  <li key={`custom-${index}`}>
                    <button
                      onClick={() => setTabs(index)}
                      className={`${tabs === index ? "active" : ""}`}
                    >
                      <Image src={tab_img} alt="img" width={100} height={100} />{" "}
                      {tab_button}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="wallet_tech_list">
            <Swiper
              slidesPerView={1.5}
              spaceBetween={10}
              autoplay={{
                delay: 13000,
                disableOnInteraction: false,
              }}
              loop={true}
              speed={5000}
              centeredSlides={true}
              navigation={true}
              modules={[Autoplay, Navigation]}
              className="mySwiper"
              breakpoints={{
                1000: {
                  slidesPerView: 1.5,
                  spaceBetween: 10,
                },
                600: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                0: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
              }}
            >
              {walletStackList[tabs].slides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <div
                    className="card"
                    style={{ backgroundColor: slide.bgColor }}
                  >
                    <div className="row ">
                      <div className="">
                        <div className="writterImg">
                          <img
                            src="/images_growstack/home/marketSlider.svg"
                            alt="marketSlider"
                          />
                        </div>
                      </div>
                      <div className="">
                        <div className="content">
                          <h3>{slide.title}</h3>
                          <p>{slide.description}</p>
                          <ul>
                            <li>Features</li>
                            {slide.features.map((feature, i) => (
                              <li key={i}>
                                <img
                                  src="/images_growstack/home/check.svg"
                                  alt="check"
                                />{" "}
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Marketing;
