import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";
import "./MarketingTechnology.scss";

const MarketingTechnology: React.FC = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  const slideData = [
    {
      title: "Real-time insights",
      imageSrc: "/solutions/slideroperations/slider4.svg",
      subtitle: "Reduce decision-making time by 40% increase efficiency",
      tags: ["Social Media Analytics"],
      description:
        "Monitors market trends and customer feedback, providing insights into supply chain performance.",
      icon: "/solutions/slideroperations/slider1.svg",
    },
    {
      title: "Comprehensive view",
      imageSrc: "/solutions/slideroperations/slider5.svg",
      subtitle: "Boost productivity Optimize Return Of Invest by 20%",
      tags: ["AI Assistant - CRMIntegrator AI"],
      description:
        "Integrates various data sources for a comprehensive view of the supply chain, enhancing decision-making.",
      icon: "/solutions/slideroperations/slider2.svg",
    },
    {
      title: "Clear visualizations ",
      imageSrc: "/solutions/slideroperations/slider6.svg",
      subtitle: "Automate routine tasks Save employees time by 50%",
      tags: ["AI Assistant - Data Visualizer AI"],
      description:
        "Transforms complex supply chain data into clear visualizations for easier analysis.",
      icon: "/solutions/slideroperations/slider3.svg",
    },
    {
      title: "Real-time insights",
      imageSrc: "/solutions/slideroperations/slider4.svg",
      subtitle: "Reduce decision-making time by 40% increase efficiency",
      tags: ["Social Media Analytics"],
      description:
        "Monitors market trends and customer feedback, providing insights into supply chain performance.",
      icon: "/solutions/slideroperations/slider1.svg",
    },
    {
      title: "Comprehensive view",
      imageSrc: "/solutions/slideroperations/slider5.svg",
      subtitle: "Boost productivity Optimize Return Of Invest by 20%",
      tags: ["AI Assistant - CRMIntegrator AI"],
      description:
        "Integrates various data sources for a comprehensive view of the supply chain, enhancing decision-making.",
      icon: "/solutions/slideroperations/slider2.svg",
    },
    {
      title: "Clear visualizations ",
      imageSrc: "/solutions/slideroperations/slider6.svg",
      subtitle: "Automate routine tasks Save employees time by 50%",
      tags: ["AI Assistant - Data Visualizer AI"],
      description:
        "Transforms complex supply chain data into clear visualizations for easier analysis.",
      icon: "/solutions/slideroperations/slider3.svg",
    },
  ];
  const swiperRef = useRef(null);
  return (
    <React.Fragment>
      <div className="marketingTechnology">
        <div className="container">
          <div
            data-aos="flip-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
          >
            <Swiper
              ref={swiperRef}
              effect="coverflow"
              grabCursor
              centeredSlides
              loop
              slidesPerView={2.81}
              spaceBetween={-150}
              watchOverflow
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={{ el: ".swiper-pagination", clickable: true }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              speed={500}
              modules={[EffectCoverflow, Pagination, Navigation]}
              className="swiper_container"
              breakpoints={{
                1400: {
                  slidesPerView: 2.74,
                  spaceBetween: 10,
                },
                1000: {
                  slidesPerView: 2.74,
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
              {slideData.map((item, index) => (
                <SwiperSlide key={index} className="swiper-slide">
                  <div className="slide-content">
                    <h2 className="slide-title">{item.title}</h2>
                    <div className="image-wrapper">
                      <img src={item.imageSrc} alt={item.title} className="" />
                    </div>
                    <div className="tags-wrapper">
                      {item.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="tag">
                          <h2>{tag}</h2>
                        </span>
                      ))}
                      {/* <span >{item.icon}</span> */}
                      <img
                        className="icon"
                        src={String(item.icon)}
                        alt="icon"
                      />
                    </div>
                    <p className="slide-description">{item.description}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MarketingTechnology;
