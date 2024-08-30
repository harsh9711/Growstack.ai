import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./MarketingStreamline.scss";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { testimonials, testimonialsdata } from "@/types/data";
import Image from "next/image";

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
            <h3 className="text-black font-light text-[24px] xl:text-[42px]">
              {" "}
              <span className="font-extrabold">Streamline your entire marketing process</span>
              from to execution and beyond
            </h3>
          </div>
        </div>
        <Swiper
          slidesPerView={3.5} // Default slides per view
          spaceBetween={10}
          autoplay={{
            delay: 500,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={5000}
          modules={[Autoplay]}
          className="mySwiper"
          breakpoints={{
            1400: {
              slidesPerView: 3.5,
              spaceBetween: 10,
            },
            1000: {
              slidesPerView: 3,
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
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="card">
                <div className="flex flex-col ">
                  <h1 className="text-[18px] text-black leading-normal font-light multi-line-ellipsis">
                    {item.id}
                  </h1>
                  <Image
                    width={10}
                    height={10}
                    src={`${item.imageUrl}`}
                    alt={`Image for ${item.id}`}
                    className="w-full rounded-full"
                  />
                </div>
                <h4>{item.name}</h4>
                <p>{item.role}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </React.Fragment>
  );
};

export default MarketingStreamline;
3.5;
