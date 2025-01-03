"use client";
import Image from "next/image";
import React, { useEffect, lazy, Suspense } from "react";

import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "@/components/footer/Footer";
import HeroSection from "./components/HeroSection";

const ImageGallerySecond = lazy(() => import("./components/ZoomEffect2"));
const ImageGalleryResponsiveSecond = lazy(
  () => import("./components/ZoomEffectrespopnsive2")
);
const GridComponentSecond = lazy(() => import("./components/GridBoxes2"));
const LoadingBar = lazy(() => import("./components/Loading"));
const MarketingStreamline = lazy(
  () => import("./components/marketingStreamline/MarketingStreamline")
);
const MarketingTechnology = lazy(
  () => import("./components/marketingTechnology/MarketingTechnology")
);

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2DA771]"></div>
  </div>
);

const page = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  return (
    <main className="bg-white overflow-hidden max-w-[1920px] w-full mx-auto">
      <HeroSection />
      <Suspense fallback={<LoadingSpinner />}>
        <section className=" flex flex-col xl:mt-10 w-full mb-20 2xl:mb-10  items-center justify-center mx-auto">
          <div className="py-16">
            <div className="2xl:flex xl:flex hidden  w-full h-full items-center justify-center mx-auto">
              <ImageGallerySecond />
            </div>
            <div className="2xl:hidden xl:hidden flex flex-col  2xl:max-w-[1921px] w-full 2xl:max-h-[973px] h-full justify-center mx-auto   items-center gap-4  ">
              <ImageGalleryResponsiveSecond />
            </div>
          </div>
        </section>
        <section className="relative mx-auto w-full items-center justify-center xl:mt-0 mt-8 2xl:mt-40 py-10 2xl:py-20 bg-[#FAFBFC]">
          <Image
            src="/solutions/background.svg"
            width={100}
            height={100}
            alt="design"
            className="w-full absolute"
          />
          <div className="flex flex-col items-center justify-center mx-auto gap-2">
            <div className="sm:items-start 2xl:translate-x-[450px] xl:p-0 px-6 w-full items-center xl:translate-x-48">
              {" "}
              <div
                data-aos="fade-up"
                data-aos-duration="1200"
                data-aos-offset="200"
                className="bg-[#03473714] py-2 px-3.5  flex items-center text-center  sm:justify-start justify-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit"
              >
                Optimization
              </div>
              <h1
                data-aos="fade-up"
                data-aos-duration="1500"
                data-aos-delay="300"
                className="sm:text-start text-center text-[26px] mt-6 2xl:text-[42px] leading-normal"
              >
                <span className="text-black font-bold">
                  Optimize resource allocation and
                </span>
                <br className="2xl:flex  hidden" />
                <span className="text-black font-extralight">
                  {" "}
                  maintain tight cost control
                </span>
              </h1>
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="1800"
              data-aos-delay="600"
              className="items-center justify-center mx-auto relative 2xl:right-12  "
            >
              <GridComponentSecond />
            </div>
          </div>
        </section>

        <section className=" mx-auto w-full flex items-center justify-center py-10 2xl:py-20 2xl:mt-20">
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
        <section className="flex flex-col py-10 xl:py-32 bg-black">
          <div className="w-full gap-y-4 flex flex-col items-center justify-center  mx-auto">
            <div className="bg-[#FFFFFF]/20 hover:shadow-md whitespace-nowrap text-white py-2 px-4 flex items-center gap-3 text-[12px] rounded-full tracking-widest font-semibold uppercase w-full max-w-[156px]">
              Communication
            </div>

            <div className="flex 2xl:flex-col items-start gap-y-4">
              <h1 className="text-[26px] 2xl:text-[42px] leading-12 text-center  items-center justify-start text-white">
                <span className="font-semibold text-left">
                  Enhance communication and ensure
                </span>
                <br className="2xl:flex hidden" />
                <span className="font-light text-center flex">
                  compliance with regulations
                </span>
              </h1>
            </div>
          </div>

          <MarketingTechnology />
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
      </Suspense>
      <Footer />
    </main>
  );
};

export default page;
