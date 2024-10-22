"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import Navbar from "@/components/navbar/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroSection from "./components/HeroSection";
import Boxpage from "./components/Boxpage";
import SecondBox from "./components/SecondBox";
import SixCard from "./components/SixCard";
import Footer from "@/components/footer/Footer";
import Faq from "./components/Faq";
import Explore from "./components/Explore";

const page = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  return (
    <main className="bg-white overflow-hidden max-w-[1920px] w-full mx-auto">
      <section className=" w-full mb-10 2xl:mb-20  items-center justify-center mx-auto">
        <Navbar
          logoUrl="/white.png"
          logoAlt="Custom Logo"
          backgroundColor="white"
        />

        <HeroSection />
      </section>
      <section className="sm:p-0 px-6">
        <Boxpage />
      </section>
      {/* headline */}
      <section className="mx-auto flex items-center justify-center mt-10 sm:mt-40"></section>
      <section className="sm:px-0 px-6">
        <SecondBox />
      </section>
      <section className="pt-10 sm:px-0 px-6  sm:pt-32">
        <SixCard />
      </section>{" "}
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
