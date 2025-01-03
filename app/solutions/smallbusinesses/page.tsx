"use client";
import Image from "next/image";
import React, { lazy, Suspense } from "react";
import { useInView } from "react-intersection-observer";
import Navbar from "@/components/navbar/Navbar";
import "swiper/css/navigation";
import Footer from "@/components/footer/Footer";

const HeroSection = lazy(() => import("./components/Hero"));
const LoadingBar = lazy(() => import("./components/Loading"));
const ImageGalleryLineB = lazy(
  () => import("./components/ImageGallerylineresponsive")
);
const ImageGalleryLineResponsive = lazy(
  () => import("./components/ImageGalleryline")
);
const GridComponent = lazy(() => import("./components/GridBoxes"));
const GridComponentResponsive = lazy(
  () => import("./components/GridBoxesResponsive")
);
const MarketingStreamline = lazy(
  () => import("./components/marketingStreamline/MarketingStreamline")
);

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2DA771]"></div>
  </div>
);

const Home = () => {
  const totalItems = 5;
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <main className="bg-white items-center justify-center mx-auto">
      <Navbar logoUrl="/imagelogo.svg" logoAlt="Custom Logo" />
      <section className=" ">
        <HeroSection />
      </section>
      <section className="items-center justify-center mx-auto py-20   2xl:px-36">
        <div className="flex flex-col items-center gap-y-10  ">
          <Suspense fallback={<LoadingSpinner />}>
            <LoadingBar />
          </Suspense>
        </div>
      </section>
      <section className="  pt-20 overflow-hidden">
        <div className=" 2xl:flex xl:flex hidden flex-col max-h-[1163px] h-full justify-center mx-auto relative   bg-gradient-to-b to-[#ffffff]/30 from-[#61C453]/20  w-full   items-center gap-4  ">
          <Suspense fallback={<LoadingSpinner />}>
            <ImageGalleryLineB />
          </Suspense>
        </div>
        <div className="2xl:hidden xl:hidden flex flex-col 2xl:max-w-[1921px] w-full 2xl:max-h-[973px]  bg-gradient-to-b to-[#ffffff]/30 from-[#61C453]/20 h-full justify-center mx-auto   items-center gap-4  ">
          <Suspense fallback={<LoadingSpinner />}>
            <ImageGalleryLineResponsive />
          </Suspense>
        </div>
      </section>
      <section className="relative  mx-auto items-center justify-center pt-6 2xl:pt-0 pb-10  2xl:px-auto">
        <div className="flex flex-col items-center  xl:items-start 2xl:items-start justify-center mx-auto gap-2 ">
          <div className=" mx-auto justify-center 2xl:items-start xl:items-start items-center  flex flex-col gap-y-2">
            {" "}
            <h2 className="bg-[#03473714] py-2 px-3.5 flex xl:justify-start 2xl:justify-start xl:items-start justify-center items-center 2xl:items-start gap-3 rounded-full text-[12px] text-center 2xl:text-start font-semibold uppercase max-w-fit">
              efficiency{" "}
            </h2>
            <h1 className="text-center text-[26px] xl:text-[42px] leading-normal">
              <span className="text-black  font-bold"> Do more with less:</span>
              <span className="text-black font-extralight ">
                {" "}
                efficient marketing for small teams
              </span>
            </h1>{" "}
          </div>

          <div className="flex xl:hidden items-center justify-center mx-auto relative">
            <Suspense fallback={<LoadingSpinner />}>
              <GridComponent />
            </Suspense>
          </div>
          <div className="items-center xl:flex hidden justify-center mx-auto relative">
            <Suspense fallback={<LoadingSpinner />}>
              <GridComponentResponsive />
            </Suspense>
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
        <Suspense fallback={<LoadingSpinner />}>
          <MarketingStreamline />
        </Suspense>
      </section>{" "}
      <Footer />
    </main>
  );
};

export default Home;
