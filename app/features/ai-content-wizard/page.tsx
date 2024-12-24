"use client";
import { ArrowRight } from "lucide-react";
import React, { lazy, Suspense } from "react";
import Navbar from "@/components/navbar/Navbar";
import "../../../styles/myanimation.css";
import Link from "next/link";
import Faq from "./component/Faq";
import Image from "next/image";

const Cases = lazy(() => import("./component/Cases"));
const Benefits = lazy(() => import("./component/Benefits"));
const SixCard = lazy(() => import("./component/SixCard"));
const Footer = lazy(() => import("@/components/footer/Footer"));
const OneCard = lazy(() => import("./component/OneCard"));
const SecondLastCard = lazy(() => import("./component/SecondLastCard"));

interface ExpandableCardProps {
  heading: string;
  para: string;
}
const ExpandableCard: React.FC<ExpandableCardProps> = ({ heading, para }) => {
  return (
    <div className="border-2 rounded-2xl max-w-[295px] w-full p-4 bg-white  border-[#034737]">
      <div className="">
        <div className="text-[#5B5D60] sm:text-[16px] text-[12px]">
          {heading}
          <span className="font-bold">{para}</span>
        </div>
      </div>
    </div>
  );
};

const page = () => {
  return (
    <main className="flex flex-col relative w-full overflow-hidden overflow-y-scroll mx-auto">
      <span className="relatvie z-20">
        <Navbar logoUrl="/imagelogo.svg" logoAlt="Custom Logo" />
      </span>
      <section>
        <div className="bg-[#E2F0CB4D] rounded-b-[60px] sm:rounded-none w-full  ">
          <div className="relative flex items-center max-w-[1220px] 2xl:max-w-[1350px] 2xl:p-0 p-4 w-full 2xl:max-h-[895px] sm:max-h-[700px] h-full justify-center mx-auto">
            <div className="w-full flex flex-col lg:flex-row gap-10 justify-between brightness-110 relative items-start mt-10 mb-4 sm:mb-10 2xl:mt-32 2xl:mb-60">
              <div className="w-full max-w-[700px] items-center sm:items-start gap-y-4 flex flex-col">
                <div className="bg-[#03473714] text-[#034737] hover:shadow-md whitespace-nowrap justify-center py-2 px-4 flex items-center text-center text-[10px] rounded-full tracking-widest font-semibold uppercase w-full max-w-[140px]">
                  AI CONTENT WIZARD
                </div>
                <div className="w-full brightness-95" data-aos="fade-right">
                  <h1 className="text-[26px] max-w-[500px] xl:text-[40px]  leading-tight sm:!text-left !text-center text-black">
                    <span className="font-semibold">AI Content Wizard</span>
                    <br />
                    <span className="font-extralight">
                      From idea to minutes - powered by AI engaging content in
                    </span>
                  </h1>
                  <p className="text-[12px] sm:text-[18px] text-black mt-4 w-full lg:max-w-[600px] sm:!text-left !text-center gap-4 flex flex-col leading-tight font-light">
                    <span>
                      Whether it's for blogs, marketing or reports, create
                      engaging content faster than ever.
                    </span>
                  </p>

                  <ul className="pt-8 text-[12px] sm:hidden  text-center items-center  flex flex-col sm:text-[18px] text-black">
                    {" "}
                    <li>Instant ideas to jumpstart your writing.</li>
                    <li>Custom outlines to fit your style and tone.</li>
                    <li>AI images to enhance your content seamlessly.</li>
                    <li>Multilingual support to reach global audiences.</li>
                  </ul>

                  <div className="flex flex-col gap-20 items-center justify-center sm:justify-start sm:items-start mt-10">
                    <div className="flex flex-row gap-8 group text-[12px] sm:text-[18px]">
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
              <div className="lg:max-w-[848px] w-full flex items-center justify-center relative">
                <Image
                  src="/heroc.svg"
                  width={800}
                  height={400}
                  alt="image"
                  className="w-full max-w-[300px] lg:max-w-[900px] h-full flex"
                  data-aos="zoom-in"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="2xl:flex xl:flex hidden z-[40] relative -top-16  xl:max-w-[1240px] max-w-[700px] max-h-[131px] h-full w-full rounded-[20px] items-center justify-center mx-auto text-white">
          <div className="overflow-visible flex flex-row items-center gap-8 justify-center h-[131px] w-full">
            <ExpandableCard
              heading="Instant ideas to "
              para="jumpstart your writing."
              data-aos="fade-up"
            />
            <ExpandableCard
              heading="Custom outlines to fit your"
              para=" style and tone."
              data-aos="fade-up"
            />
            <ExpandableCard
              heading="AI images to"
              para=" enhance your content seamlessly."
              data-aos="fade-up"
            />
            <ExpandableCard
              heading="Multilingual support to "
              para="reach global audiences."
              data-aos="fade-up"
            />
          </div>
        </div>
      </section>

      <section className=" pt-6 sm:pt-10 sm:px-6 p-0 items-center justify-center mx-auto">
        <Suspense>
          <Cases />
        </Suspense>
      </section>

      <section className="px-6 sm:px-10  sm:pt-20">
        <Suspense>
          <Benefits />
        </Suspense>
      </section>
      <section className=" pt-40 sm:pt-20 sm:px-0 px-6 items-center justify-center mx-auto">
        <Suspense>
          <SixCard />
        </Suspense>
      </section>
      <section className="sm:pt-20 pt-10 sm:px-0 px-6  items-center justify-center mx-auto">
        <Suspense>
          <OneCard />
        </Suspense>
      </section>
      <section className="sm:pt-20 pt-10 sm:px-10 px-0  ">
        <Suspense>
          <SecondLastCard />
        </Suspense>
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
        <Suspense>
          <Faq />
        </Suspense>
      </section>
      <Suspense>
        <Footer />
      </Suspense>
    </main>
  );
};
export default page;
