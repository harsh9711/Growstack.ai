"use client";
import { ArrowRight } from "lucide-react";
import React from "react";
import Navbar from "@/components/navbar/Navbar";

import Footer from "@/components/footer/Footer";
import Link from "next/link";
import { ReactCompareSlider, ReactCompareSliderImage, } from "react-compare-slider";
import ExpandableCard from "./component/ExpandableCard";
import Card from "./component/Card";
import CardResponsive from "./component/CardResponsive";
import Benefits from "./component/Benefits";
import Cases from "./component/Cases";
import Faq from "./component/Faq";
import Image from "next/image";

const page = () => {
  return (
    <main className="flex flex-col relative w-full overflow-hidden overflow-y-scroll mx-auto">
      <span className="relatvie z-20">
        <Navbar logoUrl="/images/logo.png" logoAlt="Custom Logo" />
      </span>
      <section className="bg-[#F3F7F6] rounded-b-[60px] sm:rounded-b-[0px] w-full  mb-20">
        <div className="relative flex items-center max-w-[1220px] 2xl:max-w-[1350px] 2xl:p-0 p-4 w-full 2xl:max-h-[895px] sm:max-h-[700px]  h-full justify-center mx-auto">
          <div className="w-full flex flex-row justify-between brightness-110 relative   items-start mt-10 mb-4 sm:mb-10  2xl:mt-32 2xl:mb-60">
            <div className="w-full max-w-[700px] items-start gap-y-4 flex flex-col">
              <div className="max-w-3xl  brightness-95   ">
                <h1 className="text-[26px] xl:text-[40px] max-w-2xl leading-tight sm:text-left text-center text-black ">
                  <span className="font-semibold">Transform your lead </span>
                  <br /> <span className="font-semibold">generation with </span>
                  <br />
                  <span className="font-extralight">
                    advanced prospect scraping
                  </span>
                </h1>
                <p className="text-[18px] text-black mt-4 w-full lg:max-w-[600px] sm:text-left text-center leading-tight font-light ">
                  Unlock Detailed Business Insights from Google Maps for Smarter
                  Targeting and Growth
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
                      <button className="border border-black flex items-center gap-2 text-black hover:font-bold font-medium sm:py-4 sm:px-7 p-2 rounded-xl shadow-md shadow-[#00000025]">
                        Get demo
                        <ArrowRight className="text-black" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:flex hidden max-w-[848px] w-full items-center justify-center">
              {/* <Image width={100} height={100} alt="map" /> */}
              {/* <Image  width={100} height={100} alt="map" /> */}
              <div
                style={{
                  border: "4px solid gray",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                <ReactCompareSlider
                  transition="0.25s cubic-bezier(.17,.67,.83,.67)"
                  boundsPadding={0}
                  changePositionOnHover

                  itemOne={
                    <ReactCompareSliderImage
                      src=""
                      srcSet="/features/map2.svg"
                      alt="Image one"
                    />
                  }
                  itemTwo={
                    <ReactCompareSliderImage
                      src=""
                      srcSet="/features/map.svg"
                      alt="Image two"
                    />
                  }
                  keyboardIncrement="5%"
                  position={50}
                  style={{
                    flexGrow: 1,
                    width: '100%'
                  }}
                  handle={
                    <svg
                      width="40"
                      height="404"
                      viewBox="0 0 40 504"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line
                        x1="19.5"
                        y1="504"
                        x2="19.5"
                        y2="2.18557e-08"
                        stroke="#034737"
                      />
                      <circle
                        opacity="0.1"
                        cx="20"
                        cy="251.5"
                        r="20"
                        fill="#034737"
                      />
                      <circle
                        opacity="0.5"
                        cx="20"
                        cy="251.5"
                        r="17"
                        fill="#034737"
                      />
                      <circle cx="20" cy="251.5" r="14" fill="#034737" />
                      <path
                        d="M25.25 255L24.0833 256.167L24.0833 254.417C24.0833 252.161 22.2552 250.333 20 250.333C17.7448 250.333 15.9167 252.161 15.9167 254.417L15.9167 256.167L14.75 255"
                        stroke="white"
                        stroke-width="0.758333"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M20.3766 246.25C20.3766 246.041 20.2068 245.871 19.9974 245.871C19.788 245.871 19.6182 246.041 19.6182 246.25L20.3766 246.25ZM19.9974 256.75L19.6182 256.75C19.6182 256.903 19.7106 257.042 19.8523 257.1C19.994 257.159 20.1571 257.127 20.2655 257.018L19.9974 256.75ZM21.4322 255.851C21.5802 255.703 21.5802 255.463 21.4322 255.315C21.2841 255.167 21.044 255.167 20.896 255.315L21.4322 255.851ZM19.0988 255.315C18.9508 255.167 18.7107 255.167 18.5626 255.315C18.4145 255.463 18.4145 255.703 18.5626 255.851L19.0988 255.315ZM19.7293 257.018C19.8774 257.166 20.1174 257.166 20.2655 257.018C20.4136 256.87 20.4136 256.63 20.2655 256.482L19.7293 257.018ZM19.6182 246.25L19.6182 256.75L20.3766 256.75L20.3766 246.25L19.6182 246.25ZM20.2655 257.018L21.4322 255.851L20.896 255.315L19.7293 256.482L20.2655 257.018ZM18.5626 255.851L19.7293 257.018L20.2655 256.482L19.0988 255.315L18.5626 255.851Z"
                        fill="white"
                      />
                    </svg>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="2xl:flex xl:flex hidden bg-[#034737] z-[40] relative -top-40 xl:max-w-[1240px] max-w-[700px] max-h-[131px] h-full w-full rounded-[20px] items-center justify-center mx-auto text-white">
        <div className="overflow-visible flex flex-row items-center gap-8 justify-center h-[131px]  w-full">
          <ExpandableCard
            heading={"Essential data"}
            para={"Get key business details for informed decisions."}
          />
          <div className="border-white border-2 rounded-lg h-20"></div>
          <ExpandableCard
            heading={"Effortless collection"}
            para={"Get key business details for informed decisions."}
          />
          <div className="border-white border-2 rounded-lg h-20"></div>
          <ExpandableCard
            heading={"Boost efficiency"}
            para={"Get key business details for informed decisions."}
          />
          <div className="border-white border-2 rounded-lg h-20"></div>
          <ExpandableCard
            heading={"Strategic insights"}
            para={"Get key business details for informed decisions."}
          />
        </div>
      </div>
      <section className="2xl:flex xl:flex hidden  items-center justify-center mx-auto">
        <Card />
      </section>
      <section className="flex 2xl:hidden xl:hidden  items-center justify-center mx-auto p-6">
        <CardResponsive />
      </section>
      <section>
        <Benefits />
      </section>
      <section className="pt-44">
        <Cases />
      </section>
      <section className="items-center justify-center flex flex-col py-20  overflow-hidden ">
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
      </section>
      <Footer />
    </main>
  );
};
export default page;
