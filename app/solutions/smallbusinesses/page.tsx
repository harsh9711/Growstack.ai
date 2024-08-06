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
import ImageGalleryLine from "../midmarketenterprise/components/ImageGalleryline";

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
      <section className="items-center justify-center mx-auto py-20  px-36">
        <div className="flex flex-col items-center gap-y-10  ">
          <div>
            <LoadingBar />
          </div>
        </div>
      </section>
      <section className="px-36 pt-20">
        <div className="flex flex-col   max-h-[1163px] h-full justify-center mx-auto relative   bg-gradient-to-b to-[#ffffff]/30 from-[#61C453]/20  w-full   items-center gap-4  ">
          <ImageGalleryLine />
        </div>
      </section>
      <section className="relative  mx-auto items-center justify-center pb-10 px-36">
        <div className="flex flex-col items-start justify-center mx-auto gap-2 ">
          <div className=" mx-auto justify-center flex flex-col gap-y-2">
            {" "}
            <h2 className="bg-[#03473714] py-2 px-3.5 flex justify-start items-start gap-3 rounded-full text-[12px] text-start font-semibold uppercase max-w-fit">
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
        <div className="items-center justify-center flex flex-col gap-y-4 mt-24 overflow-hidden ">
          <Image
            src="/desing.png"
            width={1200}
            height={1000}
            className="w-full absolute h-[1000px]  transform scale-y-[-1]  translate-x-10  z-0 translate-y-72 "
            alt="image"
          />

          <div className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 z-20 rounded-full text-[12px] font-semibold text-[#034737] uppercase max-w-fit">
            {" "}
            optimize
          </div>
          <h1 className="text-center flex flex-col  text-[42px] leading-normal">
            <span className="relative text-black font-semibold">
            Your ultimate guide to optimizing 
            </span>
            <span className="text-black font-extralight  ">
              {" "}
              business processes with GrowStack
            </span>
          </h1>
        </div>
        <TestimonialsSlider />
      </section>
    </main>
  );
};

export default Home;
