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
const page = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  return (
    <main className="bg-white">
      <section className="bg-gradient-to-r to-[#FFF4CB]/100 via-[#E6FFE2]/100 from-[#A9FF9B]/50 w-full mb-10 2xl:mb-20 overflow-hidden">
        <Navbar
          logoUrl="/images/logo.png"
          logoAlt="Custom Logo"
          backgroundColor="transparent"
        />

        <div className="relative flex items-center max-w-[1220px] 2xl:max-w-[1350px] 2xl:p-0 p-4 w-full 2xl:max-h-[1112px] h-full justify-center mx-auto">
          <div className="w-full flex flex-row justify-between brightness-110 relative   items-center mt-10 mb-10 2xl:mt-32 2xl:mb-60">
            <div className="w-full max-w-[700px] gap-y-4 flex flex-col">
              <div
                data-aos="fade-right"
                data-aos-duration="1200"
                className="bg-white text-black py-2 2xl:px-4 text-center items-center justify-center flex text-[10px] 2xl:text-[12px] rounded-full font-semibold uppercase max-w-[200px] 2xl:max-w-[252px] shadow-lg w-full tracking-widest"
              >
                Growstack for Sales Team
              </div>

              <div className="2xl:max-w-3xl w-full brightness-95">
                <h1
                  data-aos="fade-right"
                  data-aos-duration="1500"
                  className="text-[26px] xl:text-[48px] 2xl:text-[56px] w-full leading-normal text-black"
                >
                  <span className="font-semibold">Transform your sales</span>
                  <br />{" "}
                  <span className="font-light 2xl:whitespace-nowrap">
                    process with Growstack
                  </span>
                </h1>
                <p
                  data-aos="fade-right"
                  data-aos-duration="1500"
                  className="text-[16px] 2xl:text-[18px] text-black mt-4 w-full max-w-[600px] leading-normal font-light"
                >
                  Unlock the full potential of your sales team with Growstack's
                  advanced suite of tools and features. Our platform addresses
                  your biggest challenges and empowers your team to achieve and
                  exceed their goals.
                </p>

                <div className="flex flex-col gap-20 mt-10">
                  <div
                    data-aos="fade-right"
                    data-aos-duration="1500"
                    className="flex flex-row gap-8 group text-[12px] 2xl:text-[18px]"
                  >
                    <button className="bg-white font-medium flex items-center gap-2 text-[#034737] 2xl:py-4 2xl:px-7 rounded-xl py-2 px-2 group-hover:font-bold shadow-md hover:shadow-">
                      Get free trial <ArrowRight />
                    </button>
                    <button className="border border-black flex items-center gap-2 text-black hover:font-bold font-medium 2xl:py-4 py-2 px-2  2xl:px-7 rounded-xl shadow-md shadow-[#00000025]">
                      See demo
                      <ArrowRight className="text-black" />
                    </button>
                  </div>

                  <div
                    data-aos="fade-right"
                    data-aos-duration="1500"
                    className="flex  flex-wrap gap-4"
                  >
                  
                    <button className="flex items-center gap-2   text-primary-green rounded-xl">
                      <Image
                        className="w-full  h-full"
                        src="/play2.png"
                        alt="Apple"
                        width={180}
                        height={400}
                      />
                    </button>
                    <button className="flex items-center gap-2   text-primary-green rounded-xl">
                      <Image
                        className="w-full  h-full "
                        src="/apple2.png"
                        alt="Apple"
                        width={180}
                        height={400}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="2xl:flex xl:flex lg:flex md:flex hidden items-end relative w-full  justify-end ">
              <div
                data-aos="fade-left"
                data-aos-duration="1500"
                className="w-full relative z-0 "
              >
                <Image
                  className="xl:w-[1500px] w-full 2xl:w-[1500px] 2xl:translate-x-72 xl:translate-x-72 h-full"
                  src="/solutions/herosales.svg"
                  alt="Center Image"
                  width={842}
                  height={463}
                />
              </div>
            </div>
          </div>
        </div>
        {/* <Banner /> */}
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
        <div className="2xl:flex  hidden   2xl:max-w-[1921px] w-full h-full justify-center mx-auto   items-center gap-4  ">
          <ImageGalleryLine />
        </div>
        <div className="2xl:hidden  flex 2xl:max-w-[1921px] w-full h-full justify-center mx-auto   items-center gap-4  ">
          <ImageGalleryLineResponsive />
        </div>
      </section>
      <section className="relative mx-auto w-full items-center justify-center mt-10 2xl:mt-0 py-20 bg-[#E2F0CB4D]">
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
      <section className="items-center justify-center mx-auto w-full py-20">
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
        <div className="2xl:flex xl:flex hidden mt-20 xl:mt-0 items-center justify-center mx-auto">
          <ImageGallery />
        </div>
        <div className="2xl:hidden xl:hidden flex flex-col  2xl:max-w-[1921px] w-full 2xl:max-h-[973px] h-full justify-center mx-auto   items-center gap-4  ">
          <ImageGalleryResponsive />
        </div>
      </section>
      <section className=" overflow-hidden  ">
        <div className="items-center justify-center flex flex-col gap-y-4  overflow-hidden ">
          {/* <Image
            src="/desing.png"
            width={1200}
            height={1000}
            className="w-full absolute h-[1000px]  transform scale-y-[-1]  translate-x-10  z-0 translate-y-[500px] "
            alt="image"
          /> */}
        </div>

        <MarketingStreamline />
      </section>
      <Footer />
    </main>
  );
};

export default page;
