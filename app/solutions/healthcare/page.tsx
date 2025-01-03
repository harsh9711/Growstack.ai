"use client";
import Image from "next/image";
import React, { useEffect, lazy, Suspense } from "react";
import Navbar from "@/components/navbar/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroSection from "./components/HeroSection";
const Benefits = lazy(() => import("./components/Benefits"));
const ButtonCard = lazy(() => import("./components/ButtonCard"));
const SecondBox2 = lazy(() => import("./components/SecondBox2"));
const SixCard = lazy(() => import("./components/SixCard"));
const Faq = lazy(() => import("./components/Faq"));
import Footer from "@/components/footer/Footer";

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
      <section className=" w-full  rounded-b-[60px] sm:rounded-b-[0px] items-center justify-center mx-auto">
        <Navbar
          logoUrl="/logo/growstack1.png"
          logoAlt="Custom Logo"
          backgroundColor="white"
        />

        <HeroSection />
      </section>
      <Suspense fallback={<LoadingSpinner />}>
        <section className="sm:px-0 px-6 pt-10  max-w-[1200px] mx-auto flex flex-col items-start  sm:pt-32">
          <div className="  flex flex-col  mb-4 sm:mb-10 w-full max-w-[1120px] gap-y-6 items-start">
            <div className="bg-[#03473714] py-2 px-3.5 flex sm:items-start items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit ">
              Customer stories
            </div>
            <div className="flex sm:text-start text-center max-w-[1140px] w-full flex-col gap-y-4">
              <h2 className="font-light text-[26px] xl:text-[40px]">
                <span className="font-bold">
                  Overcome industry challenges with{" "}
                </span>
                AI-driven solutions
              </h2>
            </div>{" "}
          </div>{" "}
          <SecondBox2 />
        </section>{" "}
        <section className="pt-10 sm:px-0 px-6  sm:pt-32">
          <Benefits />
        </section>{" "}
        <section className="pt-10 sm:px-0 px-6  sm:pt-32">
          <SixCard />
        </section>{" "}
        <section className="sm:p-0 px-6 mx-auto pt-10  sm:pt-32 flex flex-col items-center max-w-[1520px] w-full">
          <div className="  flex flex-col gap-y-8 items-center ">
            <div className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit ">
              Customer stories
            </div>
            <div className="flex max-w-[610px] w-full  text-center flex-col  items-center justify-center gap-y-4">
              <h1 className="text-[26px] xl:text-[40px] w-full gap-2 leading-tight font-semibold  text-black">
                See Growstack
                <span className="font-light"> in action! </span>
              </h1>
              <p className="sm:text-[18px] text-[16px] font-medium w-full">
                Interested in how Growstack can transform your media and
                publishing processes? Schedule a personalized demo with our
                experts to see our features in action.
              </p>
            </div>{" "}
            {/* <AboveFaq /> */}
            <ButtonCard />
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
      </Suspense>
      <Footer />
    </main>
  );
};

export default page;
