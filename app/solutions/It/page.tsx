"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import GridComponentSecond from "./components/GridBoxes2";
import MarketingStreamline from "./components/marketingStreamline/MarketingStreamline";
import MarketingTechnology from "./components/marketingTechnology/MarketingTechnology";
import ImageGallerySecond from "./components/ZoomEffect2";
import ImageGalleryResponsiveSecond from "./components/ZoomEffectrespopnsive2";
import Footer from "@/components/footer/Footer";
import HeroSection from "./components/HeroSection";
import LoadingBar from "./components/Loading";
import GridComponent from "./components/GridBoxes";
import ImageGallery from "./components/ZoomEffect";
import ImageGalleryResponsive from "./components/ZoomEffectrespopnsive";
import "../../../styles/myanimation.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const page = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  return (
    <main className="">
      <HeroSection />
      <section className="relative mx-auto w-full items-center justify-center xl:mt-0 mt-8  py-10 2xl:py-20 ">
        <div className="flex flex-col items-center justify-center mx-auto gap-2">
          <div className="2xl:items-start 2xl:-translate-x-36 xl:p-0 px-6">
            {" "}
            <div
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-offset="200"
              className="bg-[#03473714] py-2 px-3.5  flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit"
            >
              Security
            </div>
            <h1
              data-aos="fade-up"
              data-aos-duration="1500"
              data-aos-delay="300"
              className="text-start text-[20px] mt-6 2xl:text-[42px] leading-normal"
            >
              <span className="text-black font-bold">Protect data</span>

              <span className="text-black font-extralight">
                {" "}
                and ensure compliance
              </span>
            </h1>
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="1800"
            data-aos-delay="600"
            className="items-center justify-center mx-auto relative 2xl:right-12 2xl:top-4  "
          >
            <GridComponentSecond />
          </div>
        </div>
      </section>
      <section className="overlflow-hidden flex flex-col py-20 xl:mt-10 w-full mb-20 2xl:mb-10  items-center justify-center mx-auto bg-[#034737]">
        <div className="w-full gap-y-4 flex flex-col 2xl:p-0 p-4 items-center justify-center  mx-auto">
          <div className="bg-[#FFFFFF]/10 hover:shadow-md whitespace-nowrap text-white py-2 px-4 flex items-center gap-3 text-[12px] rounded-full tracking-widest font-semibold uppercase w-full max-w-[120px]">
            Integration
          </div>

          <div className="flex flex-col xl:flex-row  gap-y-4">
            <h1 className="text-[22px] xl:text-[42px] leading-12 text-center flex flex-wrap gap-2  items-center justify-start text-white">
              <span className="font-semibold text-left">
                Integrate new systems
              </span>
              <span className="font-light text-center flex">
                and stay updated
              </span>
            </h1>
          </div>
        </div>
        <svg
          className="absolute 2xl:opacity-100 xl:opacity-100 lg:opacity-100 md:opacity-100 opacity-0   z-0 drawing-effect4"
          width="1920"
          height="239"
          viewBox="0 0 1920 239"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 174.907C45.6014 119.512 155.354 29.4579 229.553 112.404C303.751 195.349 358.076 2.29992 448.671 112.404C539.267 222.507 567.157 -18.6331 623.734 39.6054C694.455 112.404 744.307 265.353 837.056 199.173C929.804 132.993 1072.41 -33.1928 1110.66 39.6054C1148.92 112.404 1225.44 324.18 1356.45 199.173C1487.45 74.1663 1543.1 -67.7535 1652.08 39.6054C1739.27 125.493 1866.95 123.924 1919.89 112.404"
            stroke="#DDB0EF"
            stroke-opacity="0.4"
            stroke-width="2"
          />
        </svg>
        <div className="py-16">
          <div className="2xl:flex hidden  w-full h-full items-center justify-center mx-auto">
            <ImageGallery />
          </div>
          <div className="2xl:hidden flex flex-col  2xl:max-w-[1921px] w-full 2xl:max-h-[973px] h-full justify-center mx-auto   items-center gap-4  ">
            <ImageGalleryResponsive />
          </div>
        </div>{" "}
        <svg
          className="drawing-effect4 absolute  translate-y-20"
          width="1920"
          height="151"
          viewBox="0 0 1920 151"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1919.9 40.8496C1874.3 75.6949 1764.54 132.342 1690.35 80.1662C1616.15 27.9907 1550.39 32.3703 1471.23 80.1661C1392.06 127.962 1352.74 162.592 1296.16 125.958C1225.44 80.1661 1175.59 -16.0439 1082.84 25.5854C990.094 67.2147 847.493 171.751 809.235 125.958C770.976 80.1661 694.458 -53.0478 563.451 25.5854C432.444 104.219 376.794 193.491 267.815 125.958C180.631 71.9327 52.9476 72.9194 0.00364054 80.166"
            stroke="#CCB0EF"
            stroke-opacity="0.2"
            stroke-width="2"
          />
        </svg>
      </section>
      <section className="2xl:px-20 xl:px-20">
        <div className="   mx-auto w-full flex items-center justify-center 2xl:py-28 py-16 ">
          <div className="flex flex-col items-center justify-center mx-auto gap-2">
            <div
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-offset="200"
              className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit"
            >
              Support
            </div>

            <h1
              data-aos="fade-up"
              data-aos-duration="1500"
              data-aos-delay="300"
              className="text-center text-[22px] 2xl:text-[42px] leading-normal"
            >
              <span className="text-black font-bold">Offer timely support</span>
              <span className="text-black font-extralight"> and training</span>
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
        </div>
      </section>
      <section className=" flex flex-col xl:mt-32 w-full mb-20 2xl:mb-10  items-center justify-center mx-auto bg-[#034737] pb-16">
        <div className="py-16">
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
