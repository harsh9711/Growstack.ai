"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "@/components/footer/Footer";
import LoadingBar from "./components/Loading";
import GridComponent from "./components/GridBoxes";
import GridComponentSecond from "./components/GridBoxes2";
import ImageGalleryLine from "./components/ImageGalleryline";
import ImageGalleryLineResponsive from "./components/ImageGallerylineresponsive";
import LoadingBarSecond from "./components/LoadingBar";
import MarketingStreamline from "./components/marketingStreamline/MarketingStreamline";
import Banner from "./components/banner/Banner";
import Navbar from "@/components/navbar/Navbar";
import ImageGallery from "./components/ZoomEffect";
import ImageGalleryResponsive from "./components/ZoomEffectrespopnsive";

const page = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  return (
    <main className="bg-white">
     <section className="bg-[#034737] w-full mb-10 2xl:mb-20 z-0 relative">
        <Navbar
          logoUrl="/white.png"
          logoAlt="Custom Logo"
          backgroundColor="transparent"
        />

  <Banner/>
  <svg className="relative 2xl:flex xl:flex z-20 hidden translate-y-[120px] -translate-x-[200.5px] w-[2300px]" width="1945" height="139" viewBox="0 0 1945 139" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.617188 9.5L1945 0V87.0921L1823.32 117.834C1714.98 145.207 1601.63 146.04 1492.89 120.262L1129.89 34.2038C1058.75 17.3384 984.809 16.016 913.111 30.3267L535.654 105.666C358.283 141.069 175.106 134.71 0.617188 87.0921V87.0921V9.5Z" fill="#034737"/>
</svg>



      </section>

      <section className=" mx-auto w-full flex items-center justify-center 2xl:mb-0 py-10 2xl:py-40 ">
        <div
       
       
        >
          <div className="2xl:flex hidden mt-20 w-full h-full items-center justify-center mx-auto">
          <ImageGallery />
        </div>
        <div className="2xl:hidden flex flex-col  2xl:max-w-[1921px] w-full 2xl:max-h-[973px] h-full justify-center mx-auto   items-center gap-4  ">
          <ImageGalleryResponsive />
        </div>
        </div>
      </section> <svg className="w-full 2xl:flex xl:flex hidden translate-y-8" width="1920" height="128" viewBox="0 0 1920 128" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1920 128L-0.00012207 128L-0.000119154 94.6427L859.015 5.52817C926.49 -1.47178 994.509 -1.46814 1061.98 5.53904L1920 94.6428L1920 128Z" fill="#14171B"/>
</svg>

       <section className="bg-[#14171B] mx-auto w-full flex items-center justify-center 2xl:mb-20 py-10 2xl:py-20 ">
        <div
          data-aos="fade-up"
          data-aos-duration="1800"
          data-aos-delay="600"
          className="flex flex-col items-center justify-center gap-y-10"
        >
          <div>
      <LoadingBar/>
          </div>
        </div>
      </section>
    {/* <section className=" p-20">
        <div className="relative mx-auto rounded-t-[40px] items-center justify-center 2xl:py-20 bg-[#E2F0CB4D]/30">
        <div className="flex flex-col items-center justify-center mx-auto gap-2">
          <div
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-offset="200"
            className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit"
          >
           maintain
          </div>

          <h1
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay="300"
            className="text-center text-[22px] 2xl:text-[42px] leading-normal"
          >
            <span className="text-black font-extrabold">Maintain data quality  </span>
            <span className="text-black font-extralight">
              {" "}
              and management
            </span>
          </h1>

          <div
            data-aos="fade-up"
            data-aos-duration="1800"
            data-aos-delay="600"
            className="items-center justify-center mx-auto relative 2xl:right-12 "
          >
            <GridComponent />
          </div>
        </div>
      </div></section>
      <section className="relative w-full 2xl:mt-20">
        <div className="2xl:flex hidden flex-col  2xl:max-w-[1921px] w-full 2xl:max-h-[973px] h-full justify-center mx-auto   items-center gap-4  ">
          <ImageGalleryLine />
        </div>
        <div className="2xl:hidden flex flex-col  2xl:max-w-[1921px] w-full 2xl:max-h-[973px] h-full justify-center mx-auto   items-center gap-4  ">
          <ImageGalleryLineResponsive />
        </div>
      </section>

      <section className="relative mx-auto w-full items-center justify-center mt-10 2xl:mt-0 py-10 bg-[#FAFBFC]">
      
        <div className="flex flex-col items-center justify-center mx-auto gap-2">
          <div
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-offset="200"
            className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit"
          >
            analytics
          </div>

          <h1
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay="300"
            className="text-center text-[32px] 2xl:text-[42px] leading-normal"
          >
            <span className="text-black font-bold">Enhance</span>
            <span className="text-black font-extralight">
              {" "}
              reporting and analytics
            </span>
          </h1>

          <div
            data-aos="fade-up"
            data-aos-duration="1800"
            data-aos-delay="600"
            className="items-center justify-center mx-auto relative 2xl:right-12 "
          >
            <GridComponentSecond />
          </div>
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

      <section className=" overflow-hidden bg-[#E2F0CB]  ">
        <div className="items-center justify-center flex flex-col gap-y-4  overflow-hidden ">
          <Image
            src="/desing.png"
            width={1200}
            height={1000}
            className="w-full absolute h-[1000px] 2xl:flex hidden  transform scale-y-[-1]  translate-x-10  z-0 translate-y-[500px] "
            alt="image"
          />
        </div>

        <MarketingStreamline />
      </section> */}
      <Footer />
    </main>
  );
};

export default page;
