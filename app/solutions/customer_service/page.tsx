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
import MarketingTechnology from "./components/marketingTechnology/MarketingTechnology";
import HeroSection from "./components/HeroSection";
import ImageGallerySecond from "./components/ZoomEffect2";
import ImageGalleryResponsiveSecond from "./components/ZoomEffectrespopnsive";

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

      <section className=" mx-auto w-full flex items-center justify-center 2xl:mb-24 py-10 2xl:py-10 ">
        <div>
          <div className="2xl:flex hidden  w-full h-full items-center justify-center mx-auto">
            <ImageGallery />
          </div>
          <div className="2xl:hidden flex flex-col  2xl:max-w-[1921px] w-full 2xl:max-h-[973px] h-full justify-center mx-auto   items-center gap-4  ">
            <ImageGalleryResponsive />
          </div>
        </div>
      </section>

      <section className="bg-[url('/black.png')] bg-cover mx-auto w-full flex items-center justify-center pt-20 py-10 2xl:pt-40">
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
      <section className="flex flex-col items-start justify-start max-w-[1500px] w-full mx-auto pt-10 pb-24">
        <div className="w-full gap-y-4 flex flex-col items-start justify-start  mx-auto">
          <div className="bg-[#0347371A] hover:shadow-md whitespace-nowrap text-[#034737] py-2 px-4 flex items-center gap-3 text-[12px] rounded-full tracking-widest font-semibold uppercase w-full max-w-[166px]">
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

        <div>
          <MarketingTechnology />
        </div>
      </section>

      <section className=" mx-auto w-full flex items-center justify-center 2xl:mb-24 py-10 2xl:py-10 ">
        <div>
          <div className="2xl:flex hidden  w-full h-full items-center justify-center mx-auto">
            <ImageGallerySecond />
          </div>
          <div className="2xl:hidden flex flex-col  2xl:max-w-[1921px] w-full 2xl:max-h-[973px] h-full justify-center mx-auto   items-center gap-4  ">
            <ImageGalleryResponsiveSecond />
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
