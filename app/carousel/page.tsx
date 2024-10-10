"use client";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { solutionsteams } from "@/types/data";
import Image from "next/image";
import Link from "next/link";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const Carousel = () => {
  const [hoveredIndex, setHoveredIndex] = useState<null | number>(2);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div className="bg-[#F4F6F6] rounded-[60px]">
      <div className="w-full bg-[#F4F6F6] rounded-[60px] py-10 gap-y-4 flex flex-col items-center justify-center mx-auto">
        <div className="flex flex-col gap-y-6 items-center justify-center mx-auto">
          <div className="bg-[#0347371A] text-[#034737] py-2 px-4 flex items-center gap-3 text-[10px] sm:text-[12px] rounded-full tracking-widest font-semibold uppercase max-w-[123px]">
            SOLUTIONS
          </div>
          <div className="flex sm:px-0 px-6 flex-col gap-y-4 justify-center items-center">
            <h1 className="text-[18px] sm:text-[24px] xl:text-[56px] font-semibold text-center">
              Enterprise-strong <span className="font-light">foundation</span>
            </h1>
          </div>
        </div>
      </div>

      <Swiper
        slidesPerView={7.25}
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
            slidesPerView: 7.25,
            spaceBetween: 10,
          },
          1300: {
            slidesPerView: 7.25,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 7.25,
            spaceBetween: 10,
          },
          1000: {
            slidesPerView: 6.25,
            spaceBetween: 10,
          },
          600: {
            slidesPerView: 5.25,
            spaceBetween: 10,
          },
          0: {
            slidesPerView: 2.25,
            spaceBetween: 10,
          },
        }}
      >
        {solutionsteams.map((item, index) => (
          <SwiperSlide key={index}>
            <Link key={index} href={item.href}>
              <div
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ backgroundColor: item.bgcolor }}
                className={`p-4 mb-14 flex border-2 border-primary-green  
                flex-col ${
                  item.id === 9 || item.id === 14 ? "ml-auto mr-4 " : ""
                } ${
                  item.id === 9 || item.id === 14
                    ? "max-w-[120px] 2xl:max-w-[130px]"
                    : "max-w-[190px] 2xl:max-w-[250px]"
                } 
                h-[160px] 2xl:h-[180px] transition-all duration-500 ease-in-out gap-4 2xl:gap-6 justify-between items-center text-white w-full rounded-[20px]`}
              >
                <div className="flex flex-col 2xl:gap-y-6 items-center justify-center">
                  <div
                    className={`max-w-[40px]  ${
                      item.id === 9 || item.id === 14 ? "hidden" : "flex"
                    } 2xl:max-w-[52px] w-full cursor-pointer`}
                  >
                    <Image
                      src={item.imageUrl}
                      width={100}
                      height={100}
                      alt="image"
                      className="w-96 transition-transform duration-500 transform hover:scale-105"
                    />
                  </div>
                </div>
                <div
                  style={{ color: item.textcolor }}
                  className={`flex flex-col gap-y-4 ${
                    hoveredIndex === index ? "items-start" : "items-center"
                  } w-full`}
                >
                  <span className={`flex flex-col items-center`}>
                    {hoveredIndex === index && (
                      <Link href={item.href}>
                        <svg
                          width="21"
                          height="16"
                          viewBox="0 0 21 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={`transition-transform duration-500 transform hover:scale-125 ${
                            item.id === 9 || item.id === 14 ? "hidden" : "flex"
                          }`}
                        >
                          <path
                            d="M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z"
                            fill="#A9FF9B"
                          />
                        </svg>
                      </Link>
                    )}
                    <h2
                      style={{ color: item.textcolor }}
                      className="text-[16px] flex flex-row items-center 2xl:text-[16px] text-center font-semibold"
                    >
                      {item.name}
                    </h2>
                    <p
                      style={{ color: item.textcolor }}
                      className={`text-[10px] 2xl:text-[12px] text-center overflow-hidden font-medium max-w-[260px]`}
                    >
                      {item.role}
                    </p>
                  </span>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Carousel;