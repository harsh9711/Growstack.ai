"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import GridComponent from "./components/GridBoxes";
import ImageGalleryLine from "./components/ImageGalleryline";
import Navbar from "@/components/navbar/Navbar";
import LoadingBar from "./components/Loading";
import AOS from "aos";
import "aos/dist/aos.css";
import GridComponentSecond from "./components/GridBoxes2";
import ImageGalleryLineResponsive from "./components/ImageGallerylineresponsive";
import ImageGallery from "./components/ZoomEffect";
import ImageGalleryResponsive from "./components/ZoomEffectrespopnsive";
import MarketingStreamline from "./components/marketingStreamline/MarketingStreamline";
import { motion, inView } from "framer-motion";
import MarketingTechnology from "../largeenterprise/components/marketingTechnology/MarketingTechnology";
import Footer from "@/app/(landing)/components/Footer";
import Banner from "./banner/Banner";
import HeroSection from "./components/HeroSection";
import ImageGallerySecond from "./components/ZoomEffect2";
import ImageGalleryResponsiveSecond from "./components/ZoomEffectrespopnsive2";
const page = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  return (
    <main className="bg-white">
    
<HeroSection/>
  <section className=" flex flex-col xl:mt-10 w-full mb-20 2xl:mb-10  items-center justify-center mx-auto">
        <div className="">
          <div className="2xl:flex hidden  w-full h-full items-center justify-center mx-auto">
            <ImageGallerySecond />
          </div>
          <div className="2xl:hidden flex flex-col  2xl:max-w-[1921px] w-full 2xl:max-h-[973px] h-full justify-center mx-auto   items-center gap-4  ">
            <ImageGalleryResponsiveSecond />
          </div>
        </div>
      </section>
      <section className="relative mx-auto items-center justify-center 2xl:py-20 bg-white overflow-hidden">
        <div className="flex flex-col items-center justify-center mx-auto gap-2">
          <div
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-offset="200"
            className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit"
          >
            Manage
          </div>

          <h1
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay="300"
            className="text-center text-[22px] 2xl:text-[42px] leading-normal"
          >
            <span className="text-black font-bold">Generate and manage </span>
            <span className="text-black font-extralight"> quality leads</span>
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
      </section>
      <section className="bg-[#034737] mx-auto w-full flex items-center justify-center py-10 2xl:py-20 2xl:mt-20">
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
      </section>

      <section className="relative w-full 2xl:mt-20">
        <div className="2xl:flex  xl:flex hidden overflow-hidden   2xl:max-w-[1921px] w-full h-full justify-center mx-auto   items-center gap-4  ">
          <ImageGalleryLine />
        </div>
        <div className="2xl:hidden  xl:hidden flex 2xl:max-w-[1921px] w-full h-full justify-center mx-auto   items-center gap-4  ">
          <ImageGalleryLineResponsive />
        </div>
      </section>
      <section className="relative mx-auto w-full items-center justify-center xl:mt-0 mt-10 2xl:mt-0 py-20 bg-[#E2F0CB4D]">
        <Image
          src="/solutions/background.svg"
          width={100}
          height={100}
          alt="design"
          className="w-full absolute"
        />
        <div className="flex flex-col items-center justify-center mx-auto gap-2">
          <div
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-offset="200"
            className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit"
          >
            track
          </div>

          <h1
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay="300"
            className="text-center text-[32px] 2xl:text-[42px] leading-normal"
          >
            <span className="text-black font-bold">Track and optimize</span>
            <span className="text-black font-extralight">
              {" "}
              sales performance
            </span>
          </h1>

          <div
            data-aos="fade-up"
            data-aos-duration="1800"
            data-aos-delay="600"
            className="items-center justify-center mx-auto relative 2xl:right-12 2xl:top-4 "
          >
            <GridComponentSecond />
          </div>
        </div>
      </section>
      <section className="items-center flex flex-col justify-center mx-auto w-full py-20">
        <div className="w-full gap-y-4 flex flex-col items-center justify-center mx-auto ">
          <div
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-offset="200"
            className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit"
          >
            competitive{" "}
          </div>

          <div className="items-center flex flex-col gap-y-4 justify-center mx-auto">
            <h1 className="text-[22px] 2xl:text-[42px] leading-12 flex flex-col xl:flex-row 2xl:flex-row gap-2 items-center justify-center text-black">
              <span className="font-semibold text-center">
                Gain a competitive
              </span>
              <span className="font-light text-center"> market edge</span>
            </h1>
          </div>
        </div>
       <div> <div className="2xl:flex xl:flex hidden mt-20 w-full h-full items-center justify-center mx-auto">
          <ImageGallery />
        </div>
        <div className="2xl:hidden xl:hidden flex flex-col  2xl:max-w-[1921px] w-full 2xl:max-h-[973px] h-full justify-center mx-auto   items-center gap-4  ">
          <ImageGalleryResponsive />
        </div></div>
      </section>
      <section className=" overflow-hidden  ">
        <div className="items-center justify-center flex flex-col gap-y-4  overflow-hidden ">
          <Image
            src="/desing.png"
            width={1200}
            height={1000}
            className="w-full absolute h-[1000px]  2xl:flex xl:flex hidden transform scale-y-[-1]  translate-x-10  z-0 translate-y-[500px] "
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
