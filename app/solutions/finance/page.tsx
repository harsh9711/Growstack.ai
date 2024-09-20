"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "@/components/footer/Footer";
import LoadingBar from "./components/Loading";
import GridComponent from "./components/GridBoxes";
import MarketingStreamline from "./components/marketingStreamline/MarketingStreamline";
import Navbar from "@/components/navbar/Navbar";
import HeroSection from "./components/HeroSection";
import MarketingTechnology from "./components/marketingTechnology/MarketingTechnology";
import ImageGalleryLine from "./components/ImageGalleryline";
import ImageGalleryLineResponsive from "./components/ImageGallerylineresponsive";

const page = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  return (
    <main className="bg-white overflow-hidden">

      <HeroSection />

      <section className="flex flex-col 2xl:pt-20">
        <div className="w-full gap-y-4 flex flex-col 2xl:p-0 p-4 items-center justify-center  mx-auto">
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            className="bg-[#03473714] text-black py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit"
          >
            {" "}
            Data
          </div>

          <div className="flex flex-col 2xl:items-start xl:items-start items-center gap-y-4">
            <h1 className="text-[20px] xl:text-[42px]  leading-12  items-center  justify-center xl:justify-start 2xl:justify-start text-black">
              <span className="font-semibold xl:text-left text-center 2xl:text-left">
                Streamline data management and
              </span>
              <br className="2xl:flex xl:flex hidden " />
              <span className="font-light 2xl:ml-0 xl:ml-0 ml-2 xl:text-left text-center 2xl:text-left">
                seamlessly integrate technology
              </span>
            </h1>
          </div>
        </div>

        <MarketingTechnology />
      </section>
      <section className="2xl:pt-32 2xl:px-20 xl:px-20">
        {" "}
        <div className="  bg-[#FAFBFC] mx-auto w-full flex items-center justify-center 2xl:py-28 py-16 ">
          <div
            data-aos="fade-up"
            data-aos-duration="1800"
            data-aos-delay="600"
            className="flex flex-col items-center justify-center gap-y-10"
          >
            <div>
              <LoadingBar />
            </div>
          </div>
        </div>
      </section>
      <section className="relative w-full pt-20">
        <div className="2xl:flex xl:flex hidden  flex-col  max-w-[1921px] w-full h-full justify-center mx-auto   items-center gap-4  ">
          <ImageGalleryLine />
        </div>
        <div className="2xl:hidden xl:hidden flex flex-col  2xl:max-w-[1921px] w-full 2xl:max-h-[973px] h-full justify-center mx-auto   items-center gap-4  ">
          <ImageGalleryLineResponsive />
        </div>
      </section>
      <section className="2xl:px-20 xl:px-20">
        <div className="  bg-[#FAFBFC] mx-auto w-full flex items-center justify-center 2xl:py-64 py-16 ">
          <div className="flex flex-col items-center justify-center mx-auto gap-2">
            <div
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-offset="200"
              className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit"
            >
              Talent
            </div>

            <h1
              data-aos="fade-up"
              data-aos-duration="1500"
              data-aos-delay="300"
              className="text-center text-[22px] 2xl:text-[42px] leading-normal"
            >
              <span className="text-black font-bold">
                Adapt to technological{" "}
              </span>
              <span className="text-black font-extralight"> changes</span>
            </h1>

            <div
              data-aos="fade-up"
              data-aos-duration="1800"
              data-aos-delay="600"
              className="items-center justify-center mx-auto relative 2xl:right-12  2xl:top-4"
            >
              <GridComponent />
            </div>
          </div>
        </div>
      </section>
      <section className=" overflow-hidden  ">
        <div className="items-center justify-center flex flex-col gap-y-4  overflow-hidden ">
          <Image
            src="/desing.png"
            width={1200}
            height={1000}
            className="w-full absolute h-[1000px] 2xl:flex xl:flex hidden  transform scale-y-[-1]  translate-x-10  z-0 translate-y-[500px] "
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
