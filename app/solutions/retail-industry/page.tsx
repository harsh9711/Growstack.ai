"use client";
import Image from "next/image";
import React, { useEffect, lazy, Suspense } from "react";
import Navbar from "@/components/navbar/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroSection from "./components/HeroSection";

const Boxpage = lazy(() => import("./components/Boxpage"));
const SecondBox = lazy(() => import("./components/SecondBox"));
const SixCard = lazy(() => import("./components/SixCard"));
const Footer = lazy(() => import("@/components/footer/Footer"));
const Faq = lazy(() => import("./components/Faq"));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2DA771]"></div>
  </div>
);

const page = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  return (
    <main className="bg-white overflow-hidden max-w-[1920px] w-full mx-auto">
      <section className=" w-full mb-10 2xl:mb-20  items-center justify-center mx-auto">
        <Navbar
          logoUrl="/logo/growstack1.png"
          logoAlt="Custom Logo"
          backgroundColor="white"
        />

        <HeroSection />
      </section>
      <Suspense fallback={<LoadingSpinner />}>
        <section className="sm:p-0 px-6">
          <Boxpage />
        </section>
        {/* headline */}
        <section className="mx-auto flex items-center justify-center mt-10 sm:mt-40">
          <div className="max-w-[1287px] w-full flex flex-col gap-y-6 items-center sm:items-start">
            <div className="bg-[#03473714] py-2 px-3.5 flex sm:items-start items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit ">
              Challenges
            </div>
            <div className="flex sm:text-start text-center flex-col gap-y-4">
              <h2 className="font-light text-[26px] xl:text-[40px]">
                <span className="font-bold">
                  Overcoming Hurdles: The tech industry's{" "}
                </span>
                greatest challenges
              </h2>
            </div>
          </div>
        </section>
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
      </Suspense>
      <Footer />
    </main>
  );
};

export default page;
