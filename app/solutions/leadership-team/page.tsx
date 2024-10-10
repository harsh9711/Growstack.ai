"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import ImageGalleryLine from "./components/ImageGalleryline";
import Navbar from "@/components/navbar/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import GridComponent from "./components/GridBoxes";
import GridComponentSecond from "./components/GridBoxes2";
import ImageGalleryLineResponsive from "./components/ImageGallerylineresponsive";
import LoadingBar from "./components/Loading";
import MarketingStreamline from "./components/marketingStreamline/MarketingStreamline";
import Footer from "@/components/footer/Footer";
import LoadingBarSecond from "./components/LoadingBar";
import Link from "next/link";
import GridComponentResponsive from "./components/GridBoxesresponsive";
import HeroSection from "./components/HeroSection";

const page = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  return (
    <main className="bg-white overflow-hidden max-w-[1920px] w-full mx-auto">
      <section className="bg-[#D2F1E6] w-full mb-10 2xl:mb-20 rounded-b-[60px] sm:rounded-b-[0px] items-center justify-center mx-auto">
        <Navbar
          logoUrl="/images/logo.png"
          logoAlt="Custom Logo"
          backgroundColor="transparent"
        />

        <HeroSection />
      </section>{" "}
      <section className=" sm:p-20">
        <div className="relative mx-auto rounded-t-[40px] items-center justify-center py-10 2xl:py-20 ">
          <div className="flex flex-col  items-center justify-center mx-auto gap-2">
            <div
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-offset="200"
              className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit"
            >
              Stay Ahead in a Data-Driven World
            </div>

            <div className="flex items-start justify-start">
              {" "}
              <h1
                data-aos="fade-up"
                data-aos-duration="1500"
                data-aos-delay="300"
                className="text-center  max-w-[700px] text-[26px] 2xl:text-[42px] leading-normal"
              >
                <span className="text-black font-extrabold">
                  Overcome leadership challenges
                </span>
                <span className="text-black font-extralight">
                  {" "}
                  with Growstack
                </span>
              </h1>
            </div>
          </div>
        </div>
      </section>
      <section className=" sm:p-20">
        <div className="relative mx-auto rounded-t-[40px] items-center justify-center py-10 2xl:py-20 bg-[#FAFBFC]">
          <div className="flex flex-col  items-center justify-center mx-auto gap-2">
            {/* <div
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-offset="200"
              className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit"
            >
              maintain
            </div> */}

            <div className="flex items-start justify-start">
              {" "}
              <h1
                data-aos="fade-up"
                data-aos-duration="1500"
                data-aos-delay="300"
                className="text-start  max-w-[700px] text-[26px] 2xl:text-[42px] leading-normal"
              >
                <span className="text-black font-extrabold">
                  Overcome leadership challenges
                </span>
                <span className="text-black font-extralight">
                  {" "}
                  with Growstack
                </span>
              </h1>
            </div>

            <div
              data-aos="fade-up"
              data-aos-duration="1800"
              data-aos-delay="600"
              className="items-center 2xl:flex xl:hidden flex justify-center mx-auto relative 2xl:right-12 "
            >
              <GridComponent />
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="1800"
              data-aos-delay="600"
              className="items-center xl:flex hidden 2xl:hidden justify-center mx-auto relative 2xl:right-12 "
            >
              <GridComponentResponsive />
            </div>
          </div>
        </div>
      </section>
      <section className=" mx-auto w-full flex items-center justify-center 2xl:mb-20 py-10 2xl:py-20 ">
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
        <div className="2xl:flex xl:flex hidden flex-col  2xl:max-w-[1921px] w-full 2xl:max-h-[973px] h-full justify-center mx-auto   items-center gap-4  ">
          <ImageGalleryLine />
        </div>
        <div className="2xl:hidden xl:hidden flex flex-col  2xl:max-w-[1921px] w-full 2xl:max-h-[973px] h-full justify-center mx-auto   items-center gap-4  ">
          <ImageGalleryLineResponsive />
        </div>
      </section>
      <section className=" ">
        <div className="relative mx-auto rounded-t-[40px] items-center justify-center  ">
          <div className="flex flex-col  items-center justify-center mx-auto gap-2">
            <div
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-offset="200"
              className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit"
            >
              USE CASE
            </div>

            <div className="flex items-start justify-start">
              {" "}
              <h1
                data-aos="fade-up"
                data-aos-duration="1500"
                data-aos-delay="300"
                className="text-center  max-w-[700px] text-[26px] 2xl:text-[42px] leading-normal"
              >
                <span className="text-black font-extrabold">
                  A day in the life of Sarah,
                </span>
                <span className="text-black font-extralight"> the CMO</span>
              </h1>
            </div>
          </div>
          <div>
            <div><h2 className="sm:text-[20px] text-[12px]">Before Growstack</h2>
            <div><span><h2 className="fonrb-dol">Action</h2>: Manually sorting through emails, reports, and notifications—data overload.</span></div></div>
            <div className="bg-[#EDEDED] max-w-[240px] max-h-[1174px] w-fu;; h-full rounded-2xl flex flex-col gap-y-6">
              <div className="max-w-[200px] p-4 text-[20px]">Timeline</div>
              <div className="rounded-full w-10 sm:text-[16px] text-[12px] h-10">
                <svg
                  width="5"
                  height="10"
                  viewBox="0 0 5 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1V6L4 9"
                    stroke="#14171B"
                    stroke-width="1.75"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <h2 className="font-bold">8:00 AM </h2>
                <p className="font-medium">Morning review</p>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default page;
