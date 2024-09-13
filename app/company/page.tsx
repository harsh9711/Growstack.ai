"use client";
import React from "react";
import HeroSection from "./components/HeroSection";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Company = () => {
  return (
    <div>
      <div className="relative z-40">
        <Navbar
          logoUrl="/white.png"
          logoAlt="Custom Logo"
          backgroundColor="white"
        />
      </div>
      <HeroSection />
      <div>
        <Swiper
          slidesPerView={3.5}
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
          <SwiperSlide>
            <div className="">
              <div className="flex  rounded-2xl bg-[#034737] ">
                <div className="w-full max-w-[268px] items-center flex justify-between">
                  <div className="  max-w-[208px]  flex flex-col gap-y-4 items-start w-full">
                    <Image
                      src="/company/1.svg"
                      width={40}
                      height={4}
                       className="w-10 h-10"
                      alt="svg"
                    />
                    <h2 className="text-[28px] font-bold text-white">
                      Dianne Russell
                    </h2>
                    <h2 className="text-[18px] font-medium text-white">
                      Senior Developer
                    </h2>
                    <Image
                      src="/company/1.1.svg"
                      width={20}
                      height={20}
                      className="w-4 h-4 flex"
                      alt="svg"
                    />
                  </div>
                  <div className="border-white border-1 h-[58px] rotate-180 "></div>
                </div>
              </div>
            </div>
          </SwiperSlide>{" "}
        </Swiper>
      </div>
    </div>
  );
};

export default Company;
