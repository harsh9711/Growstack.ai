"use client";
import React, { useEffect } from "react";
import ImageGalleryLine from "./components/ImageGalleryline";
import Navbar from "@/components/navbar/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import GridComponent from "./components/GridBoxes";
import ImageGalleryLineResponsive from "./components/ImageGallerylineresponsive";
import LoadingBar from "./components/Loading";
import Footer from "@/components/footer/Footer";
import GridComponentResponsive from "./components/GridBoxesresponsive";
import HeroSection from "./components/HeroSection";
import { CircleIcon } from "@/components/svgs/icons";
import { ArrowRight, ClockIcon } from "lucide-react";
import Box from "./components/Box";
import Link from "next/link";
import Demo from "./components/Demo";
import Faqs from "./components/Faq";

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
      <section className="sm:p-0 p-4 mt-20 sm:mt-0  ">
        <div className="relative mx-auto flex flex-col gap-y-10 rounded-t-[40px] items-center justify-center  ">
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
          <Box />
          <p className="sm:text-[18px] max-w-[1240px] w-full text-center flex items-center justify-center text-[12px] font-medium">
            With GrowStack, Sarah saves approximately 6.5 hours daily, enabling
            her to focus on high-level strategy, leadership, and growth, instead
            of manual tasks and fragmented data.
          </p>
        </div>
      </section>
      <section className="flex flex-col gap-y-10 sm:mt-40 mt-10">
      <Demo/>
      </section>
      <section className="p-4 sm:p-0"><Faqs/></section>
      <Footer />
    </main>
  );
};

export default page;
