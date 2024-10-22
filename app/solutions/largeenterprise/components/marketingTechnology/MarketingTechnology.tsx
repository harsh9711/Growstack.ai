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
      title: "Standardize communications",
      imageSrc: "/sliderimagesfolder/slider2.svg",
      subtitle: "Reduce decision-making time by 40% increase efficiency",
      tags: ["AI chat"],
      description:
        "Offers advanced market research capabilities and industry insights through top LLMs for in-depth, multi- region market analysis, competitive intelligence, and strategic global decision- making.",
      icon: "/solutionsmarketing/contacts.svg",
    },
    {
      title: "Unify messaging",
      imageSrc: "/sliderimagesfolder/slider1.svg",
      subtitle: "Boost productivity Optimize Return Of Invest by 20%",
      tags: ["AI APPS"],
      description:
        "Offers a broad suite of over 60 AI-powered applications with multi-modal functionality and advanced features for high-level content creation, lead generation, and sales forecasting.",
      icon: "/solutionsmarketing/aiPlay.svg",
    },
    {
      title: "Harmonize campaigns ",
      imageSrc: "/sliderimages/slider3.svg",
      subtitle: "Automate routine tasks Save employees time by 50%",
      tags: ["AI assistant"],
      description:
        "Customizable AI assistants for automating high-level research, routine tasks, data analysis, and operational efficiency, tailored to support various departments and scalable for enterprise-wide operations.",
      icon: "/solutionsmarketing/aiaWizard.svg",
    },
    {
      title: "Standardize communications",
      imageSrc: "/sliderimagesfolder/slider2.svg",
      subtitle: "Reduce decision-making time by 40% increase efficiency",
      tags: ["AI chat"],
      description:
        "Offers advanced market research capabilities and industry insights through top LLMs for in-depth, multi- region market analysis, competitive intelligence, and strategic global decision- making.",
      icon: "/solutionsmarketing/contacts.svg",
    },
    {
      title: "Unify messaging",
      imageSrc: "/sliderimagesfolder/slider1.svg",
      subtitle: "Boost productivity Optimize Return Of Invest by 20%",
      tags: ["AI APPS"],
      description:
        "Offers a broad suite of over 60 AI-powered applications with multi-modal functionality and advanced features for high-level content creation, lead generation, and sales forecasting.",
      icon: "/solutionsmarketing/aiPlay.svg",
    },
    {
      title: "Harmonize campaigns ",
      imageSrc: "/sliderimages/slider3.svg",
      subtitle: "Automate routine tasks Save employees time by 50%",
      tags: ["AI assistant"],
      description:
        "Customizable AI assistants for automating high-level research, routine tasks, data analysis, and operational efficiency, tailored to support various departments and scalable for enterprise-wide operations.",
      icon: "/solutionsmarketing/aiaWizard.svg",
    },
  ];
  const swiperRef = useRef(null);
  return (
    <React.Fragment>
      <div className="marketingTechnology">
        <div className="container">
          <div
            className="title"
            data-aos="fade-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
          >
            <span className="user">Consistency</span>
            <h2 className="heading mt-2">
              <span>Global alignment </span>and consistency
            </h2>
          </div>
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
                    <h2 className="slide-subtitle">{item.subtitle}</h2>
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
