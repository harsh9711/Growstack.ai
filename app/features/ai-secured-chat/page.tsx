"use client";
import { ArrowRight } from "lucide-react";
import React, { lazy, Suspense } from "react";
import Navbar from "@/components/navbar/Navbar";
import Link from "next/link";
import Image from "next/image";

const Footer = lazy(() => import("@/components/footer/Footer"));
const Card = lazy(() => import("./component/Card"));
const CardResponsive = lazy(() => import("./component/CardResponsive"));
const Benefits = lazy(() => import("./component/Benefits"));
const Faq = lazy(() => import("./component/Faq"));

const LoadingSpinner = () => (
  <div className="flex items-center justify-center w-full h-40">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#034737]"></div>
  </div>
);

const page = () => {
  return (
    <main className="flex flex-col relative w-full overflow-hidden overflow-y-scroll mx-auto">
      <span className="relatvie z-20">
        <Navbar logoUrl="/imagelogo.svg" logoAlt="Custom Logo" />
      </span>

      <section className="bg-gradient-to-br from-[#C5E8C6] via-[#D6F6E9] to-[#FAF7F6]  rounded-b-[60px] sm:rounded-b-[0px] w-full sm:mb-20">
        <div className="relative flex items-center max-w-[1220px] 2xl:max-w-[1350px] 2xl:p-0 p-4 w-full 2xl:max-h-[895px] sm:max-h-[700px] h-full justify-center mx-auto">
          <div
            className="w-full flex flex-row justify-between brightness-110 relative items-start mt-10 mb-4 sm:mb-10 2xl:mt-32 2xl:mb-60"
            data-aos="fade-up"
          >
            <div className="w-full max-w-[700px] items-start gap-y-4 flex flex-col">
              <div className="max-w-3xl brightness-95" data-aos="fade-right">
                <h1 className="text-[26px] xl:text-[40px] max-w-xl leading-tight sm:!text-left !text-center text-black">
                  <span className="font-semibold">AI Secured Chat</span>
                  <br></br>
                  <span className="font-extralight">
                    Keep your conversations private with AI-driven security
                  </span>
                </h1>
                <p className="text-[18px] text-black mt-4 flex gap-6 flex-col w-full lg:max-w-[600px] sm:!text-left !text-center leading-tight font-light">
                  <span>
                    In today's rapidly evolving digital landscape, secure
                    communication is more important than ever.
                  </span>
                  <span>
                    Growstack's AI Secure Chat leverages cutting-edge AI
                    technology to ensure your conversations remain private,
                    confidential, and free from external threats.
                  </span>
                </p>
                <div
                  className="flex flex-col gap-20 items-center justify-center sm:justify-start sm:items-start mt-10"
                  data-aos="zoom-in"
                >
                  <div className="flex flex-row gap-8 group text-[16px] sm:text-[18px]">
                    <Link href="/auth/register" className="no-underline">
                      <button className="bg-white font-medium flex items-center gap-2 text-[#034737] sm:py-4 sm:px-7 rounded-xl p-2 group-hover:font-bold shadow-md hover:shadow-">
                        Free trial <ArrowRight />
                      </button>
                    </Link>
                    <Link href="/demo" className="no-underline">
                      <button className="border border-black flex items-center gap-2 text-black hover:font-bold font-medium sm:py-4 sm:px-7 p-2 rounded-xl shadow-md shadow-[#00000025]">
                        Get a demo
                        <ArrowRight className="text-black" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="sm:flex hidden max-w-[648px] w-full items-center justify-center"
              data-aos="fade-left"
            >
              <Image
                src="/features/hero.svg"
                width={600}
                height={800}
                alt="map"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <Suspense fallback={<LoadingSpinner />}>
          <Benefits />
        </Suspense>
      </section>

      <section className="2xl:flex xl:flex hidden sm:pt-32 items-center justify-center mx-auto">
        <Suspense fallback={<LoadingSpinner />}>
          <Card />
        </Suspense>
      </section>

      <section className="flex 2xl:hidden xl:hidden pt-20 sm:pt-0 items-center justify-center mx-auto p-6">
        <Suspense fallback={<LoadingSpinner />}>
          <CardResponsive />
        </Suspense>
      </section>

      <section className="items-center justify-center flex flex-col sm:py-20 overflow-hidden">
        <div className="items-center justify-center flex flex-col gap-y-4 overflow-hidden">
          <Image
            src="/solutions/design.svg"
            width={1000}
            height={1800}
            alt="arrow"
            className="w-full overflow-hidden absolute translate-y-[500px] -rotate-6 z-0"
            loading="lazy"
          />
        </div>
        <Suspense fallback={<LoadingSpinner />}>
          <Faq />
        </Suspense>
      </section>

      <Suspense fallback={<LoadingSpinner />}>
        <Footer />
      </Suspense>
    </main>
  );
};
export default page;
