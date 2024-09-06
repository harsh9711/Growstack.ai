"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "@/components/footer/Footer";
import LoadingBar from "./components/Loading";
import GridComponent from "./components/GridBoxes";
import MarketingStreamline from "./components/marketingStreamline/MarketingStreamline";
import Navbar from "@/components/navbar/Navbar";
import ImageGallery from "./components/ZoomEffect";
import ImageGalleryResponsive from "./components/ZoomEffectrespopnsive";
import MarketingTechnology from "./components/marketingTechnology/MarketingTechnology";
import HeroSection from "./components/HeroSection";
import ImageGallerySecond from "./components/ZoomEffect2";
import ImageGalleryResponsiveSecond from "./components/ZoomEffectrespopnsive2";
import 'bootstrap/dist/css/bootstrap.min.css';

const page = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  return (
    <main className="bg-white overflow-hidden">
      <Navbar
        logoUrl="/white.png"
        logoAlt="Custom Logo"
        backgroundColor="white"
      />
      <HeroSection />

      <section className=" mx-auto w-full flex items-center justify-center 2xl:mb-24 py-10 xl:py-28 ">
        <div>
          <div className="2xl:flex xl:flex hidden  w-full h-full items-center justify-center mx-auto">
            <ImageGallery />
          </div>
          <div className="2xl:hidden  xl:hidden flex flex-col  2xl:max-w-[1921px] w-full 2xl:max-h-[973px] h-full justify-center mx-auto   items-center gap-4  ">
            <ImageGalleryResponsive />
          </div>
        </div>
      </section>

      <section className="bg-[url('/black.png')] bg-cover mx-auto w-full flex items-center justify-center pt-20 py-32 2xl:pt-40">
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
      <section className="flex flex-col pt-32">
        <div className="w-full gap-y-4 flex flex-col items-center justify-center  mx-auto">
          <div className="bg-[#0347371A] hover:shadow-md whitespace-nowrap text-[#034737] py-2 px-4 flex items-center gap-3 text-[12px] rounded-full tracking-widest font-semibold uppercase w-full max-w-[146px]">
            expectations
          </div>

          <div className="flex flex-col items-start gap-y-4">
            <h1 className="text-[22px] xl:text-[42px] leading-12 flex gap-2 items-center justify-start text-black">
              <span className="font-semibold text-left">
                Meet high customer
              </span>
              <span className="font-light">expectations</span>
            </h1>
          </div>
        </div>

        <MarketingTechnology />
      </section>

      <section className="bg-[url('/pink.png')] bg-cover flex flex-col 2xl:mt-40 w-full mb-20 2xl:mb-10  items-center justify-center mx-auto">
        <div className="xl:py-60">
          <div className="2xl:flex hidden  w-full h-full items-center justify-center mx-auto">
            <ImageGallerySecond />
          </div>
          <div className="2xl:hidden flex flex-col  2xl:max-w-[1921px] w-full 2xl:max-h-[973px] h-full justify-center mx-auto   items-center gap-4  ">
            <ImageGalleryResponsiveSecond />
          </div>
        </div>
      </section>
      <section className="relative mx-auto items-center justify-center xl:py-40 bg-white overflow-hidden  w-full">
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
            <span className="text-black font-bold">Adapt to technological </span>
            <span className="text-black font-extralight"> changes</span>
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
