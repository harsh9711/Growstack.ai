"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import GridComponentSecond from "./components/GridBoxes2";
import LoadingBar from "./components/Loading";
import MarketingStreamline from "./components/marketingStreamline/MarketingStreamline";
import MarketingTechnology from "./components/marketingTechnology/MarketingTechnology";
import ImageGallerySecond from "./components/ZoomEffect2";
import ImageGalleryResponsiveSecond from "./components/ZoomEffectrespopnsive2";
import Footer from "@/app/(landing)/components/Footer";
import HeroSection from "./components/HeroSection";
import 'bootstrap/dist/css/bootstrap.min.css';

const page = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  return (
    <main  data-aos="fade-in"
    data-aos-duration="2000"
    data-aos-delay="500" className="2xl:bg-[url('/chain.png')] bg-no-repeat">
      <HeroSection />
      <section className=" mx-auto w-full flex items-center justify-center py-10 2xl:py-20 2xl:mt-60">
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
      <section className=" bg-[#FAFBFC] flex flex-col w-full mb-20 2xl:mb-10 2xl:pb-60 2xl:pt-20 items-center justify-center mx-auto">
        <div className="py-16">
          <div className="2xl:flex hidden  w-full h-full items-center justify-center mx-auto">
            <ImageGallerySecond />
          </div>
          <div className="2xl:hidden flex flex-col  2xl:max-w-[1921px] w-full 2xl:max-h-[973px] h-full justify-center mx-auto   items-center gap-4  ">
            <ImageGalleryResponsiveSecond />
          </div>
        </div>
      </section>
      <section className="flex flex-col 2xl:mt-40">
        <div className="w-full gap-y-4 flex flex-col items-center justify-center  mx-auto">
          <div className="bg-[#034737]/20 hover:shadow-md whitespace-nowrap text-black py-2 px-4 flex items-center gap-3 text-[12px] rounded-full tracking-widest font-semibold uppercase w-full max-w-[106px]">
            Visibility
          </div>

          <div className="flex flex-col items-start gap-y-4">
            <h1 className="text-[22px] xl:text-[42px] leading-12 flex flex-col justify-center  items-center  text-black">
              <span className="flex  gap-2">
                {" "}
                <span className="font-semibold text-left">
                  Enhance visibility and{" "}
                </span>{" "}
                <span className="font-light text-center flex">integrate</span>
              </span>
              <span className="font-light text-center items-center justify-center mx-auto">
                technologies
              </span>
            </h1>
          </div>
        </div>

        <MarketingTechnology />
      </section>
      <section className="relative mx-auto w-full items-center justify-center xl:mt-0 mt-8 2xl:mt-20 py-10 2xl:py-20 bg-[#FAFBFC]">
        <Image
          src="/solutions/background.svg"
          width={100}
          height={100}
          alt="design"
          className="w-full absolute"
        />
        <div className="flex flex-col items-center justify-center mx-auto gap-2">
          <div className="2xl:items-start  xl:p-0 px-6">
            {" "}
            <div
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-offset="200"
              className="bg-[#03473714] py-2 px-3.5  flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit"
            >
              Compliance
            </div>
            <h1
              data-aos="fade-up"
              data-aos-duration="1500"
              data-aos-delay="300"
              className="text-start text-[20px] mt-6 2xl:text-[42px] leading-normal"
            >
              <span className="text-black font-bold">
                Navigate compliance and{" "}
              </span>

              <span className="text-black font-extralight">
                {" "}
                implement sustainability{" "}
              </span>
            </h1>
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="1800"
            data-aos-delay="600"
            className="items-center justify-center mx-auto relative 2xl:right-12 2xl:top-2 "
          >
            <GridComponentSecond />
          </div>
        </div>
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
