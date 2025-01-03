"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { lazy, useEffect, Suspense } from "react";
import Footer from "@/components/footer/Footer";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/navbar/Navbar";

// import RepeatText from "./components/RepeatText";
// import GridComponent from "./components/GridBoxes";
// import ImageGalleryLine from "./components/ImageGalleryline";
// import LoadingBar from "./components/Loading";
// import MarketingStreamline from "./components/marketingStreamline/MarketingStreamline";
// import ImageGalleryLineResponsive from "./components/ImageGallerylineresponsive";

const RepeatText = lazy(() => import("./components/RepeatText"));
const GridComponent = lazy(() => import("./components/GridBoxes"));
const ImageGalleryLine = lazy(() => import("./components/ImageGalleryline"));
const LoadingBar = lazy(() => import("./components/Loading"));
const MarketingStreamline = lazy(
  () => import("./components/marketingStreamline/MarketingStreamline")
);
const ImageGalleryLineResponsive = lazy(
  () => import("./components/ImageGallerylineresponsive")
);

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2DA771]"></div>
  </div>
);

const page = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });
  }, []);

  return (
    <main className="flex flex-col relative overflow-hidden mx-auto">
      <span className="relatvie z-20">
        <Navbar logoUrl="/imagelogo.svg" logoAlt="Custom Logo" />
      </span>
      <section className="bg-[#2DA771] rounded-b-[60px] sm:rounded-b-[0px] w-full  mb-20">
        <div className="relative flex items-center max-w-[1220px] 2xl:max-w-[1350px] 2xl:p-0 p-4 w-full 2xl:max-h-[1112px] sm:max-h-[800px]  h-full justify-center mx-auto">
          <div className="w-full flex flex-row justify-between brightness-110 relative   items-center mt-10 mb-4 sm:mb-10  2xl:mt-32 2xl:mb-60">
            <div className="w-full max-w-[700px] gap-y-4 flex flex-col">
              <div className="bg-[#FFFFFF]/10 text-white py-2 px-4 text-center items-center justify-center flex   text-[12px] rounded-full font-semibold uppercase max-w-[377px] w-full tracking-widest">
                Growstack for Mid - Market Organization
              </div>

              <div className="max-w-3xl  brightness-95   ">
                <h1 className="text-[26px] xl:text-[40px] max-w-2xl leading-tight sm:!text-left !text-center text-white ">
                  <span className="font-semibold">MidMarket Enterprise</span>
                  <br />{" "}
                  <span className="font-light">
                    Conquer resources constraints with{" "}
                  </span>
                  <br />
                  <span className="font-light">AI tools </span>
                </h1>
                <p className="text-[18px] text-white mt-4 w-full lg:max-w-[600px] sm:!text-left !text-center leading-tight font-light ">
                  Growstack's versatile Al tools and integrated solutions
                  empower mid-market organizations to overcome resource
                  limitations. By streamlining marketing operations, enhancing
                  customer engagement and providing actionable insights,
                  Growstack ensures mid-market businesses can compete
                  effectively and scale efficiently.
                </p>
                <div className="flex flex-col gap-20  items-center justify-center sm:justify-start sm:items-start  mt-10">
                  <div className="flex flex-row gap-8  group text-[16px] sm:text-[18px]">
                    <Link href="/auth/register" className="no-underline">
                      {" "}
                      <button className="bg-white font-medium flex items-center gap-2 text-[#034737] sm:py-4 sm:px-7 rounded-xl p-2 group-hover:font-bold shadow-md hover:shadow-">
                        Free trial <ArrowRight />
                      </button>
                    </Link>
                    <Link href="/demo" className="no-underline">
                      {" "}
                      <button className="border border-white flex items-center gap-2 text-white hover:font-bold font-medium sm:py-4 sm:px-7 p-2 rounded-xl shadow-md shadow-[#00000025]">
                        Get a demo
                        <ArrowRight className="text-white" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="2xl:flex xl:flex flex items-center justify-center">
              <div data-aos="fade-out">
                <Image
                  className="w-full relative 2xl:flex xl:flex hidden z-0 top-10 xl:left-[360px] 2xl:left-[570px]"
                  src="/solutions/circle.svg"
                  alt="Center Image"
                  width={1048}
                  height={1000}
                />
              </div>
              <div
                className="absolute z-0 2xl:-right-60 2xl:top-96"
                data-aos="fade-out"
              >
                <Image
                  className="w-full"
                  src="/solutions/hero.svg"
                  alt="Center Image"
                  width={842}
                  height={463}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="2xl:flex xl:flex hidden flex-col bg-black z-[40] relative -top-40 xl:max-w-[1240px] max-w-[700px] max-h-[244px]  py-4 h-full w-full rounded-[20px] items-center justify-center mx-auto text-white">
        <h2 className="font-bold text-[24px] xl:text-[48px]  text-center">
          Innovative AI solutions
        </h2>
        <h2 className="font-light text-[24px] xl:text-[48px] text-center ">
          for mid-market growth and efficiency
        </h2>

        <p className="mt-2 text-white mb-4 text-center">
          Explore how GrowStack's innovative AI tools empower mid-market
          organizations to overcome challenges
        </p>
      </div>
      <div className="absolute max-w-[1920px] w-full 2xl:flex xl:flex hidden overflow-hidden top-[950px] 2xl:top-[1250px]">
        <Suspense fallback={<LoadingSpinner />}>
          <RepeatText />
        </Suspense>
      </div>
      <section className="relative sm:p-0 px-6 mx-auto items-center justify-center pb-6 sm:pb-48 ">
        <div className="flex flex-col items-center justify-center mx-auto gap-2 ">
          <div className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit">
            {" "}
            Resources
          </div>
          <h1 className="text-center text-[26px] sm:text-[42px] leading-tight">
            <span className="text-black  font-bold"> Overcome</span>
            <span className="text-black font-extralight ">
              {" "}
              resource constraints
            </span>
          </h1>

          <div className="items-center justify-center mx-auto relative   right-12">
            <Suspense fallback={<LoadingSpinner />}>
              <GridComponent />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="relative bg-[#FAFBFC] w-full">
        <div className="2xl:flex xl:flex hidden flex-col  max-w-[1921px] w-full py-10 h-full justify-center mx-auto   items-center gap-4  ">
          <Suspense fallback={<LoadingSpinner />}>
            <ImageGalleryLine />
          </Suspense>
        </div>
        <div className="2xl:hidden xl:hidden flex flex-col 2xl:max-w-[1921px] w-full 2xl:max-h-[973px] h-full justify-center mx-auto   items-center gap-4">
          <Suspense fallback={<LoadingSpinner />}>
            <ImageGalleryLineResponsive />
          </Suspense>
        </div>
      </section>
      <section className="items-center justify-center mx-auto py-10 sm:py-40 ">
        <div className="flex flex-col items-start gap-y-10  ">
          <Suspense fallback={<LoadingSpinner />}>
            <LoadingBar />
          </Suspense>
        </div>
      </section>
      <section className="bg-[#E2F0CB] overflow-hidden   ">
        <div className="items-center justify-center flex flex-col gap-y-4  overflow-hidden ">
          <Image
            src="/solutions/design.svg"
            width={1000}
            height={1800}
            alt="arrow"
            className="w-full overflow-hidden  absolute translate-y-[500px] -rotate-6 z-0"
          />
        </div>
        <Suspense fallback={<LoadingSpinner />}>
          <MarketingStreamline />
        </Suspense>
      </section>
      <Footer />
    </main>
  );
};

export default page;
