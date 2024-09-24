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

const page = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  return (
    <main className="">
      <section className="bg-[#E2F0CB] w-full mb-10 2xl:mb-20 items-center justify-center mx-auto">
        <Navbar
          logoUrl="/images/logo.png"
          logoAlt="Custom Logo"
          backgroundColor="transparent"
        />

        <div className="relative flex items-center max-w-[1220px] 2xl:max-w-[1350px] 2xl:p-0 p-4 w-full 2xl:max-h-[1112px] h-full justify-center mx-auto">
          <div className="w-full flex flex-row justify-between brightness-110 relative gap-x-20  items-center mt-10 mb-10 2xl:mt-32 2xl:mb-40">
            <div className="w-full max-w-[700px] gap-y-4 flex flex-col">
              <div
                data-aos="fade-right"
                data-aos-duration="1200"
                className="bg-white text-black py-2 2xl:px-4 text-center items-center justify-center flex text-[10px] 2xl:text-[12px] rounded-full font-semibold uppercase max-w-[300px] 2xl:max-w-[352px] shadow-lg w-full tracking-widest"
              >
                Growstack for Revenue operations Team
              </div>

              <div className="2xl:max-w-3xl w-full brightness-95">
                <h1
                  data-aos="fade-right"
                  data-aos-duration="1500"
                  className="text-[26px] xl:text-[48px]   w-full leading-normal text-black"
                >
                  <span className="font-semibold">Optimize your revenue </span>
                  <br />{" "}
                  <span className="font-light 2xl:whitespace-nowrap">
                    strategy with Growstack
                  </span>
                </h1>
                <p
                  data-aos="fade-right"
                  data-aos-duration="1500"
                  className="text-[16px] 2xl:text-[18px] text-black mt-4 w-full max-w-[600px] leading-normal font-light"
                >
                  Take your revenue operations to the next level with
                  Growstack’s cutting-edge tools and solutions. From optimizing
                  data management to enhancing team alignment, our platform
                  addresses your key challenges and drives your team towards
                  achieving exceptional results.
                </p>

                <div className="flex flex-col gap-20 mt-10">
                  <div
                    data-aos="fade-right"
                    data-aos-duration="1500"
                    className="flex flex-row gap-8 group text-[12px] 2xl:text-[18px]"
                  >
                    <Link href="/auth/register" className="no-underline">    <button className="bg-white font-medium flex items-center gap-2 text-[#034737] 2xl:py-4 2xl:px-7 rounded-xl py-2 px-2 group-hover:font-bold shadow-md hover:shadow-">
                      Get free trial <ArrowRight />
                    </button></Link>
                    <Link href="/demo" className="no-underline">
                      {" "}
                      <button className="border border-black flex items-center gap-2 text-black hover:font-bold font-medium 2xl:py-4 py-2 px-2  2xl:px-7 rounded-xl shadow-md shadow-[#00000025]">
                        Get demo
                        <ArrowRight className="text-black" />
                      </button>
                    </Link>
                  </div>

                  {/* <div
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
                  </div> */}
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
                  className="xl:w-[1500px] w-full 2xl:w-[1500px]  h-full"
                  src="/solutions/herorevops.svg"
                  alt="Center Image"
                  width={842}
                  height={463}
                />
              </div>
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
      <section className=" p-20">
        <div className="relative mx-auto rounded-t-[40px] items-center justify-center py-10 2xl:py-20 bg-[#E2F0CB4D]/30">
          <div className="flex flex-col items-center justify-center mx-auto gap-2">
            <div
              data-aos="fade-up"
              data-aos-duration="1200"
              data-aos-offset="200"
              className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit"
            >
              maintain
            </div>

            <h1
              data-aos="fade-up"
              data-aos-duration="1500"
              data-aos-delay="300"
              className="text-center text-[22px] 2xl:text-[42px] leading-normal"
            >
              <span className="text-black font-extrabold">
                Maintain data quality{" "}
              </span>
              <span className="text-black font-extralight">
                {" "}
                and management
              </span>
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

      <section className="relative mx-auto w-full items-center justify-center xl:mt-0 mt-10 2xl:mt-0 py-10 bg-[#FAFBFC]">
        <div className="flex flex-col items-center justify-center mx-auto gap-2">
          <div
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-offset="200"
            className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit"
          >
            analytics
          </div>

          <h1
            data-aos="fade-up"
            data-aos-duration="1500"
            data-aos-delay="300"
            className="text-center text-[32px] 2xl:text-[42px] leading-normal"
          >
            <span className="text-black font-bold">Enhance</span>
            <span className="text-black font-extralight">
              {" "}
              reporting and analytics
            </span>
          </h1>

          <div
            data-aos="fade-up"
            data-aos-duration="1800"
            data-aos-delay="600"
            className="items-center justify-center mx-auto relative 2xl:right-12 "
          >
            <GridComponentSecond />
          </div>
        </div>
      </section>
      <section className="mx-auto w-full flex items-center justify-center py-10 2xl:py-40 ">
        <div
          data-aos="fade-up"
          data-aos-duration="1800"
          data-aos-delay="600"
          className="flex flex-col items-center justify-center gap-y-10"
        >
          <div>
            <LoadingBarSecond />
          </div>
        </div>
      </section>

      <section className=" overflow-hidden bg-[#E2F0CB]  ">
        <div className="items-center justify-center flex flex-col gap-y-4  overflow-hidden ">
          <Image
            src="/desing.png"
            width={1200}
            height={1000}
            className="w-full  xl:flex  absolute h-[1000px] 2xl:flex hidden  transform scale-y-[-1]  translate-x-10  z-0 translate-y-[500px] "
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
