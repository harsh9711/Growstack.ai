"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import Navbar from "@/components/navbar/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroSection from "./components/HeroSection";
import SecondBox2 from "./components/SecondBox2";
import Benefits from "./components/Benefits";
import AboveFaq from "./components/AboveFaq";
import Faq from "./components/Faq";
import SecondBox from "./components/SecondBox";
import SixCard from "./components/SixCard";
import Footer from "@/components/footer/Footer";

const page = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  return (
    <main className="bg-white overflow-hidden max-w-[1920px] w-full mx-auto">
      <section className=" w-full  rounded-b-[60px] sm:rounded-b-[0px] items-center justify-center mx-auto">
        <Navbar
          logoUrl="/white.png"
          logoAlt="Custom Logo"
          backgroundColor="white"
        />

        <HeroSection />
      </section>
      <section className="sm:p-0 px-6 sm:pt-32  pt-10 mx-auto flex flex-col items-center max-w-[1520px] w-full">
        <div className="  flex flex-col gap-y-6 items-center sm:items-start">
          <div className="bg-[#03473714] py-2 px-3.5 flex sm:items-start items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit ">
            Customer stories
          </div>
          <div className="flex sm:text-start text-center flex-col gap-y-4">
            <h2 className="font-light text-[26px] xl:text-[40px]">
              <span className="font-bold">Beat competition, </span>
              lower acquisition costs
            </h2>
          </div>{" "}
          <SecondBox />
        </div>
      </section>
      <section className="sm:px-0 px-6 pt-10 sm:pt-32">
        <SecondBox2 />
      </section>{" "}
      <section className="pt-10 sm:px-0 px-6  sm:pt-32">
        <Benefits />
      </section>{" "}
      <section className="sm:px-0 px-6"></section>
      <section className="pt-10 sm:px-0 px-6  sm:pt-32">
        <SixCard />
      </section>{" "}
      <section className="sm:p-0 px-6 mx-auto pt-10  sm:pt-32 flex flex-col items-center max-w-[1520px] w-full">
        <div className="  flex flex-col gap-y-6 items-center sm:items-start">
          <div className="bg-[#03473714] py-2 px-3.5 flex sm:items-start items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit ">
            Customer stories
          </div>
          <div className="flex sm:text-start text-center flex-col gap-y-4">
            <h2 className="font-light text-[26px] xl:text-[40px]">
              <span className="font-bold">Beat competition, </span>
              lower acquisition costs
            </h2>
          </div>{" "}
          <AboveFaq />
        </div>
      </section>
      <section className="items-center sm:px-0 px-6   justify-center flex flex-col  sm:py-20  overflow-hidden ">
        <div className="items-center justify-center flex flex-col gap-y-4  overflow-hidden ">
          <Image
            src="/solutions/design.svg"
            width={1000}
            height={1800}
            alt="arrow"
            className="w-full overflow-hidden  absolute translate-y-[500px] -rotate-6 z-0"
          />
        </div>
        <Faq />
      </section>{" "}
      <Footer />
    </main>
  );
};

export default page;
