"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, Suspense } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import dynamic from "next/dynamic";
import Link from "next/link";

// Lazy load components using dynamic import
const ImageGalleryLine = dynamic(
  () => import("./components/ImageGalleryline"),
  {
    loading: () => (
      <div className="w-full h-[200px] animate-pulse bg-gray-200 rounded-lg" />
    ),
    ssr: false,
  }
);

const Navbar = dynamic(() => import("@/components/navbar/Navbar"), {
  loading: () => <div className="w-full h-16 animate-pulse bg-gray-200" />,
  ssr: true,
});

const GridComponent = dynamic(() => import("./components/GridBoxes"), {
  loading: () => (
    <div className="w-full h-[400px] animate-pulse bg-gray-200 rounded-lg" />
  ),
  ssr: false,
});

const GridComponentSecond = dynamic(() => import("./components/GridBoxes2"), {
  loading: () => (
    <div className="w-full h-[400px] animate-pulse bg-gray-200 rounded-lg" />
  ),
  ssr: false,
});

const LoadingBar = dynamic(() => import("./components/Loading"), {
  loading: () => (
    <div className="w-full h-8 animate-pulse bg-gray-200 rounded-lg" />
  ),
  ssr: false,
});

const MarketingStreamline = dynamic(
  () => import("./components/marketingStreamline/MarketingStreamline"),
  {
    loading: () => (
      <div className="w-full h-[400px] animate-pulse bg-gray-200 rounded-lg" />
    ),
    ssr: false,
  }
);

const Footer = dynamic(() => import("@/components/footer/Footer"), {
  loading: () => <div className="w-full h-[200px] animate-pulse bg-gray-200" />,
  ssr: true,
});

const LoadingBarSecond = dynamic(() => import("./components/LoadingBar"), {
  loading: () => (
    <div className="w-full h-8 animate-pulse bg-gray-200 rounded-lg" />
  ),
  ssr: false,
});

const GridComponentResponsive = dynamic(
  () => import("./components/GridBoxesresponsive"),
  {
    loading: () => (
      <div className="w-full h-[400px] animate-pulse bg-gray-200 rounded-lg" />
    ),
    ssr: false,
  }
);

// Loading placeholder component
const LoadingPlaceholder = () => (
  <div className="w-full h-full animate-pulse bg-gray-200 rounded-lg" />
);

const Page = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  return (
    <main className="bg-white overflow-hidden max-w-[1920px] w-full mx-auto">
      <section className="bg-[#E2F0CB] w-full mb-10 2xl:mb-20 rounded-b-[60px] sm:rounded-b-[0px] items-center justify-center mx-auto">
        <Navbar
          logoUrl="/imagelogo.svg"
          logoAlt="Custom Logo"
          backgroundColor="transparent"
        />

        <div className="relative flex items-center max-w-[1220px] 2xl:max-w-[1350px] 2xl:p-0 p-4 w-full 2xl:max-h-[1112px] h-full justify-center mx-auto">
          <div className="w-full flex flex-row justify-between brightness-110 relative gap-x-20  items-center mt-2 mb-6 2xl:mt-32 2xl:mb-40">
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
                  className="text-[26px] xl:text-[40px] 2xl:text-[48px]   w-full leading-normal text-black"
                >
                  <span className="font-semibold">Revops</span>
                  <br />{" "}
                  <span className="font-light 2xl:whitespace-nowrap">
                    Optimize your revenue strategy with Growstack
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
                    className="flex flex-row items-center justify-center sm:items-start sm:justify-start gap-8 group text-[12px] 2xl:text-[18px]"
                  >
                    <Link href="/auth/register" className="no-underline">
                      {" "}
                      <button className="bg-white font-medium flex items-center gap-2 text-[#034737] 2xl:py-4 2xl:px-7  rounded-xl py-2 px-2 group-hover:font-bold shadow-md hover:shadow-">
                        Get a free trial <ArrowRight />
                      </button>
                    </Link>

                    <Link href="/demo" className="no-underline">
                      {" "}
                      <button className=" font-medium flex items-center gap-2 text-black 2xl:py-4 2xl:px-7 border border-black  rounded-xl py-2 px-2 group-hover:font-bold shadow-md hover:shadow-">
                        Get a demo
                        <ArrowRight className="text-black" />
                      </button>
                    </Link>
                  </div>
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
      <section className="mx-auto w-full flex items-center justify-center 2xl:mb-20 py-10 2xl:py-20">
        <div
          data-aos="fade-up"
          data-aos-duration="1800"
          data-aos-delay="600"
          className="flex flex-col items-center justify-center gap-y-10"
        >
          <Suspense
            fallback={
              <div className="w-full h-8 animate-pulse bg-gray-200 rounded-lg" />
            }
          >
            <LoadingBar />
          </Suspense>
        </div>
      </section>

      <section className="sm:p-20">
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
              className="text-center text-[26px] 2xl:text-[42px] leading-normal"
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
              className="items-center 2xl:flex xl:hidden flex justify-center mx-auto relative 2xl:right-12"
            >
              <Suspense fallback={<LoadingPlaceholder />}>
                <GridComponent />
              </Suspense>
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="1800"
              data-aos-delay="600"
              className="items-center xl:flex hidden 2xl:hidden justify-center mx-auto relative 2xl:right-12"
            >
              <Suspense fallback={<LoadingPlaceholder />}>
                <GridComponentResponsive />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      <section className="relative w-full 2xl:mt-20">
        <div className="2xl:flex xl:flex hidden flex-col 2xl:max-w-[1921px] w-full 2xl:max-h-[973px] h-full justify-center mx-auto items-center gap-4">
          <Suspense fallback={<LoadingPlaceholder />}>
            <ImageGalleryLine />
          </Suspense>
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
            className="items-center justify-center mx-auto relative 2xl:right-12"
          >
            <Suspense fallback={<LoadingPlaceholder />}>
              <GridComponentSecond />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full flex items-center justify-center py-10 2xl:py-40">
        <div
          data-aos="fade-up"
          data-aos-duration="1800"
          data-aos-delay="600"
          className="flex flex-col items-center justify-center gap-y-10"
        >
          <Suspense fallback={<LoadingPlaceholder />}>
            <LoadingBarSecond />
          </Suspense>
        </div>
      </section>

      <section className="overflow-hidden bg-[#E2F0CB]">
        <div className="items-center justify-center flex flex-col gap-y-4 overflow-hidden">
          <Image
            src="/desing.png"
            width={1200}
            height={1000}
            className="w-full xl:flex absolute h-[1000px] 2xl:flex hidden transform scale-y-[-1] translate-x-10 z-0 translate-y-[500px]"
            alt="image"
            loading="lazy"
            priority={false}
          />
        </div>

        <Suspense fallback={<LoadingPlaceholder />}>
          <MarketingStreamline />
        </Suspense>
      </section>

      <Suspense fallback={<LoadingPlaceholder />}>
        <Footer />
      </Suspense>
    </main>
  );
};

export default Page;
