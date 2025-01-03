"use client";
import Image from "next/image";
import React, { useEffect, Suspense, lazy } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import HeroSection from "./components/HeroSection";

const GridComponent = lazy(() => import("./components/GridBoxes"));
const GridComponentResponsive = lazy(
  () => import("./components/GridBoxesresponsive")
);
const ImageGalleryLine = lazy(() => import("./components/ImageGalleryline"));
const ImageGalleryLineResponsive = lazy(
  () => import("./components/ImageGallerylineresponsive")
);
const LoadingBarSecond = lazy(() => import("./components/LoadingBar"));
const MarketingStreamline = lazy(
  () => import("./components/marketingStreamline/MarketingStreamline")
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
      <Navbar
        logoUrl="/imagelogo.svg"
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
                className="bg-[#03473714]/10 text-[#034737] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit"
              >
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
                  service standards{" "}
                </span>
              </h1>
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="1800"
              data-aos-delay="600"
              className="items-center 2xl:flex xl:hidden justify-center mx-auto relative 2xl:right-12 "
            >
              <Suspense fallback={<LoadingSpinner />}>
                <GridComponent />
              </Suspense>
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="1800"
              data-aos-delay="600"
              className="items-center xl:flex hidden 2xl:hidden  justify-center mx-auto relative 2xl:right-12 "
            >
              <Suspense fallback={<LoadingSpinner />}>
                <GridComponentResponsive />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-black sm:bg-[url('/linetop.png')] bg-cover relative w-full 2xl:mt-20">
        <div className="2xl:flex xl:flex hidden flex-col  2xl:max-w-[1921px] w-full 2xl:max-h-[973px] h-full justify-center mx-auto   items-center gap-4  ">
          <Suspense fallback={<LoadingSpinner />}>
            <ImageGalleryLine />
          </Suspense>
        </div>
        <div className="2xl:hidden xl:hidden flex flex-col  2xl:max-w-[1921px] w-full 2xl:max-h-[973px] h-full justify-center mx-auto   items-center gap-4  ">
          <Suspense fallback={<LoadingSpinner />}>
            <ImageGalleryLineResponsive />
          </Suspense>
        </div>
      </section>

      <section className="mx-auto w-full flex items-center justify-center py-10 2xl:py-40 ">
        <div
          data-aos="fade-up"
          data-aos-duration="1800"
          data-aos-delay="600"
          className="flex flex-col items-center justify-center gap-y-10"
        >
          <Suspense fallback={<LoadingSpinner />}>
            <LoadingBarSecond />
          </Suspense>
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
        <Suspense fallback={<LoadingSpinner />}>
          <MarketingStreamline />
        </Suspense>
      </section>
      <Footer />
    </main>
  );
};

export default page;
