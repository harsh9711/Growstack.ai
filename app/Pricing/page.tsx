import React from "react";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import Footer from "../(landing)/components/Footer";
import HeroSection from "./components/HeroSection";
import Pricing from "./components/Pricing";
import MainBox from "./components/MainBox";

const PricingPage: React.FC = () => { // Renamed component to avoid naming conflict
  return (
    <div className="flex flex-col">
      <div className="relative z-40">
        <Navbar
          logoUrl="/white.png"
          logoAlt="Custom Logo"
          backgroundColor="white"
        />
      </div>
      <HeroSection
        title="Get the AI copilot for better marketing results"
        description="Lorem ipsum dolor sit amet consectetur. Morbi est at odio elementum ornare."
      />
     <section className="mt-40 p-4 2xl:p-0  items-center justify-center mx-auto "><Pricing/></section> 
      <section className="bg-white mt-20">
        {/* <Image
          src="/1.svg"
          width={100}
          height={100}
          alt="image"
          className="absolute -translate-y-40 z-0 w-full h-full"
        /> */}
        <div className="max-w-[1000px] mb-20 relative z-20 w-full justify-center items-center mx-auto">
         <MainBox/>
        </div>
        {/* <Image
          src="/2.svg"
          width={100}
          height={100}
          alt="image"
          className="absolute -translate-y-[1000px] z-0 w-full h-full"
        /> */}
      </section>
      <Footer />
    </div>
  );
};

export default PricingPage;
