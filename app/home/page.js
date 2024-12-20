"use client";
import React, { useState } from "react";
import Footer from "@/components/footer/Footer";
import DragFeatures from "@/components/home/drag-features/DragFeatures";
import Faqs from "@/components/home/faq/Faqs";
import FuturePlans from "@/components/home/futurePlans/FuturePlans";
import OurProcess from "@/components/home/ourProcessNew/OurProcess";
import Premium from "@/components/home/premium/Premium";
import WhyChoose from "@/components/home/whyChoose/WhyChoose";
import Navbar from "@/components/navbar/Navbar";
import Animation from "../animation/page";
import Cta2 from "../control/page";
import SixCard from "../cards/page";
import SixCardVideo from "../cardsvideo/page";
import SixCardTab from "../cardstab/page";
import SixCardSwitch from "../cardsswitch/page";
import AnimationStory from "../animationstory/page";
import Image from "next/image";
import Carousel from "../carouselvideos/page";

// I commented this bootstrapp CDN because of conflicting styles with tailwindcss, NB: I'll uncomment it as soon as reliable solution is found
function Page() {
  // floating components
  return (
    <React.Fragment>
      <Navbar
        logoUrl="/grey.svg"
        logoAlt="Custom Logo"
        backgroundColor="#f5f5f5"
      />
      <div className="bg-[#F5F5F5] w-full h-full">
        <AnimationStory />
        <div className="sm:flex hidden relative mx-auto p-6 sm:p-0  -translate-y-20 items-center justify-center flex-col sm:flex-row gap-4">
          <button className="flex items-center gap-4 bg-black rounded-xl py-2 px-4 w-fit">
            <div className="flex-shrink-0">
              <img
                src="/google-play.svg"
                alt="Google Play"
                className="w-10 h-10 object-contain"
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-white font-light text-[14px]">
                GET IT ON
              </span>
              <span className="text-white font-semibold text-[25px]">
                Google Play
              </span>
            </div>
          </button>

          <button className="flex items-center gap-4 bg-black rounded-xl py-2 px-4 w-fit">
            <div className="flex-shrink-0">
              <img
                src="/apple-home.svg"
                alt="Google Play"
                className="w-10 h-10 object-contain"
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-white font-light text-[14px]">
                DOWNLOAD ON THE
              </span>
              <span className="text-white font-semibold text-[25px]">
                App Store
              </span>
            </div>
          </button>
          <button className="flex items-center gap-4 bg-black rounded-xl py-2 px-4 w-fit">
            <div className="flex-shrink-0">
              <img
                src="/web-store.png"
                alt="Google Play"
                className="w-10 h-10 object-contain"
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-white font-light text-[14px]">
                GET IT ON
              </span>
              <span className="text-white font-semibold text-[25px]">
                Chrome Web Store
              </span>
            </div>
          </button>
        </div>
      </div>{" "}
      <div className="sm:px-10 sm:-translate-y-10 relative z-0">
        <DragFeatures />
      </div>
      {/* <Banner /> */}
      <OurProcess />
      {/* <Features /> */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-20"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source
            src="https://video.gumlet.io/673d77b6f3970d5c7faa5a64/673dc91294dde00045eb83bd/download.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Content */}
        <div className="2xl:p-0 xl:p-20 sm:p-10 relative z-10 flex flex-row sm:gap-x-20 mx-auto items-center justify-center h-full">
          <div className="hidden md:flex flex-col gap-y-28">
            <Image
              className="float-animation-1"
              src="/12.svg"
              width={110}
              height={110}
            />
            <Image
              className="float-animation-2"
              src="/13.svg"
              width={110}
              height={110}
            />
            <Image
              className="float-animation-3"
              src="/14.svg"
              width={110}
              height={110}
            />
          </div>
          <SixCard />
          <div className="hidden md:flex  flex-col gap-y-28">
            <Image
              className="float-animation-4"
              src="/15.svg"
              width={110}
              height={110}
            />
            <Image
              className="float-animation-5"
              src="/16.svg"
              width={110}
              height={110}
            />
            <Image
              className="float-animation-6"
              src="/17.svg"
              width={110}
              height={110}
            />
          </div>
        </div>
      </div>
      <SixCardVideo />
      <Carousel />
      <Animation />
      {/* <Facts /> */}
      {/* <Carousel /> */}
      {/* <PoweredBy /> */}
      <section className="sm:px-0 px-6 ">
        {" "}
        <Premium />
      </section>
      <SixCardTab />
      <SixCardSwitch />
      {/* <Capability /> */}
      {/* <Capability2 /> */}
      <section className="sm:px-0 px-6 py-10 sm:py-40 ">
        {" "}
        <WhyChoose />{" "}
      </section>
      <FuturePlans />
      <section className="sm:px-0 px-6 sm:mt-20 ">
        {" "}
        <Cta2 />{" "}
      </section>
      <Faqs />
      <Footer />
    </React.Fragment>
  );
}

export default Page;
