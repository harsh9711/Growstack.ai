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
     <section className="bg-[#034737] w-full mb-10 2xl:mb-20">
        <Navbar
          logoUrl="/white.png"
          logoAlt="Custom Logo"
          backgroundColor="transparent"
        />

  <Banner/>
  {/* <svg className="relativet" width="2020" height="164" viewBox="0 0 2020 164" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 0H1920V112L1799.85 142.356C1692.86 169.386 1580.94 170.209 1473.56 144.754L1115.11 59.7749C1044.86 43.121 971.851 41.8152 901.052 55.9464L528.328 130.341C353.181 165.301 172.301 159.021 0 112V0Z" fill="#034737"/>
</svg> */}
      </section>

      <section className=" mx-auto w-full flex items-center justify-center 2xl:mb-20 py-10 2xl:py-20 ">
        <div
       
       
        >
          <div className="2xl:flex hidden mt-20 w-full h-full items-center justify-center mx-auto">
          <ImageGallery />
        </div>
        <div className="2xl:hidden flex flex-col  2xl:max-w-[1921px] w-full 2xl:max-h-[973px] h-full justify-center mx-auto   items-center gap-4  ">
          <ImageGalleryResponsive />
        </div>
        </div>
      </section> 
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
    <section className=" p-20">
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
      </section>
      <Footer />
    </main>
  );
};

export default page;
