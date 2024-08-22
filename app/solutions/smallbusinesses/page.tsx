"use client";
import Image from "next/image";
import React from "react";
import { useInView } from "react-intersection-observer";
import Navbar from "@/components/navbar/Navbar";
import "swiper/css/navigation";
import TestimonialsSlider from "./components/Slider";
import LoadingBar from "./components/Loading";
import HeroSection from "./components/Hero";
import GridComponent from "./components/GridBoxes";
import MarketingStreamline from "./components/marketingStreamline/MarketingStreamline";
import ImageGalleryLineResponsive from "./components/ImageGalleryline";
import ImageGalleryLineB from "./components/ImageGalleryline copy";
import Footer from "@/components/footer/Footer";

const Home = () => {
  const totalItems = 5;
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <main className="bg-white items-center justify-center">
      <Navbar logoUrl="/images/logo.png" logoAlt="Custom Logo" />
      <section className=" ">
        <HeroSection />
      </section>
      <section className="items-center justify-center mx-auto py-20   2xl:px-36">
        <div className="flex flex-col items-center gap-y-10  ">
          <div>
            <LoadingBar />
          </div>
        </div>
      </section>
      <section className=" 2xl:px-36 pt-20 overflow-hidden">
        <div className=" 2xl:flex hidden flex-col   max-h-[1163px] h-full justify-center mx-auto relative   bg-gradient-to-b to-[#ffffff]/30 from-[#61C453]/20  w-full   items-center gap-4  ">
          <ImageGalleryLineB />
        </div>
        <div className="2xl:hidden flex flex-col  2xl:max-w-[1921px] w-full 2xl:max-h-[973px]  bg-gradient-to-b to-[#ffffff]/30 from-[#61C453]/20 h-full justify-center mx-auto   items-center gap-4  ">
          <ImageGalleryLineResponsive />
        </div>
      </section>
      <section className="relative  mx-auto items-center justify-center pt-20 2xl:pt-0 pb-10  2xl:px-auto">
        <div className="flex flex-col items-center  xl:items-start 2xl:items-start justify-center mx-auto gap-2 ">
          <div className=" mx-auto justify-center 2xl:items-start xl:items-start items-center  flex flex-col gap-y-2">
            {" "}
            <h2 className="bg-[#03473714] py-2 px-3.5 flex xl:justify-start 2xl:justify-start xl:items-start justify-center items-center 2xl:items-start gap-3 rounded-full text-[12px] text-center 2xl:text-start font-semibold uppercase max-w-fit">
              efficiency{" "}
            </h2>
            <h1 className="text-center text-[42px] leading-normal">
              <span className="text-black  font-bold"> Do more with less:</span>
              <span className="text-black font-extralight ">
                {" "}
                efficient marketing for small teams
              </span>
            </h1>{" "}
          </div>

          <div className="items-center justify-center mx-auto relative   ">
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
            className="w-full 2xl:flex xl:flex hidden absolute h-[1000px]  transform scale-y-[-1]  translate-x-10  z-0 translate-y-[500px]"
            alt="image"
          />
        </div>
        <MarketingStreamline />{" "}
      </section>{" "}
      <Footer />
    </main>
  );
};

export default Home;
