"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/navbar/Navbar";
import HeroSection from "./components/HeroSection";
import ImageGalleryLineResponsive from "./components/ImageGallerylineresponsive";
import LoadingBarSecond from "./components/LoadingBar";
import MarketingStreamline from "./components/marketingStreamline/MarketingStreamline";
import Footer from "@/components/footer/Footer";
import GridComponent from "./components/GridBoxes";
import ImageGalleryLine from "./components/ImageGalleryline";
import GridComponentResponsive from "./components/GridBoxesresponsive";


const page = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  return (
    <main className="bg-white overflow-hidden max-w-[1920px] w-full mx-auto" >
      <Navbar
        logoUrl="/images/logo.png"
        logoAlt="Custom Logo"
        backgroundColor="transparent"
      />
      <HeroSection />
      <section className=" p-10 sm:p-20">
        <div className="relative mx-auto rounded-t-[40px] items-center justify-center py-10 ">
          <div className="flex flex-col 2xl:justify-start items-center justify-center mx-auto gap-2">
            <div className="2xl:-translate-x-10 text-black 2xl:items-start items-center justify-center flex flex-col gap-y-4 ">
              <div
                data-aos="fade-up"
                data-aos-duration="1000"
                className="bg-[#03473714]/10 text-[#034737] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit">
                {" "}
                manage
              </div>
              <h1
                data-aos="fade-up"
                data-aos-duration="1100"
                className="text-center tect-black items-center justify-center flex flex-wrap gap-4 text-[26px] 2xl:text-[42px] leading-normal"
              >
                <span className="relative text-black  font-semibold">
                  Maintain consistent
                </span>
                <span className=" text-black font-normal">
                  service standards                 </span>
              </h1>
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="1800"
              data-aos-delay="600"
              className="items-center 2xl:flex xl:hidden justify-center mx-auto relative 2xl:right-12 "
            >
              <GridComponent />
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="1800"
              data-aos-delay="600"
              className="items-center xl:flex hidden 2xl:hidden  justify-center mx-auto relative 2xl:right-12 "
            >
              <GridComponentResponsive />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-black sm:bg-[url('/linetop.png')] bg-cover relative w-full 2xl:mt-20">
        <div className="2xl:flex xl:flex hidden flex-col  2xl:max-w-[1921px] w-full 2xl:max-h-[973px] h-full justify-center mx-auto   items-center gap-4  ">
          <ImageGalleryLine />
        </div>
        <div className="2xl:hidden xl:hidden flex flex-col  2xl:max-w-[1921px] w-full 2xl:max-h-[973px] h-full justify-center mx-auto   items-center gap-4  ">
          <ImageGalleryLineResponsive />
        </div>
      </section>




      <section className="mx-auto w-full flex items-center justify-center py-10 2xl:py-40 ">
        <div
          data-aos="fade-up"
          data-aos-duration="1800"
          data-aos-delay="600"
          className="flex flex-col items-center justify-center gap-y-10"
        >
          <div>
            <LoadingBarSecond />
          </div>
        </div>
      </section>

      <section className=" overflow-x-hidden max-w-[1920px]  w-full ">
        <div className="2xl:flex hidden items-center justify-center flex-col gap-y-4  overflow-hidden ">
          <Image
            src="/desing.png"
            width={1200}
            height={1000}
            className="w-full absolute h-[1000px] 2xl:flex hidden  transform scale-y-[-1]  2xl:translate-x-10  z-0 translate-y-[500px] "
            alt="image"
          />
        </div>

        <MarketingStreamline />
      </section>
      <Footer />
    </main>
  );
};

export default page;
