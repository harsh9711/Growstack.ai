"use client";
import React, { useState } from "react";
import Facts from "/components/home/facts/facts";
import Carousel from "../carousel/page";
import Footer from "@/components/footer/Footer";
import Banner from "@/components/home/banner/Banner";
import Capability from "@/components/home/capability/Capability";
import DragFeatures from "@/components/home/drag-features/DragFeatures";
import Faqs from "@/components/home/faq/Faqs";
import Features from "@/components/home/featuresNew/Features";
import FuturePlans from "@/components/home/futurePlans/FuturePlans";
import Marketing from "@/components/home/marketing/Marketing";
import OurProcess from "@/components/home/ourProcessNew/OurProcess";
import PoweredBy from "@/components/home/poweredBy/PoweredBy";
import Premium from "@/components/home/premium/Premium";
import WhyChoose from "@/components/home/whyChoose/WhyChoose";
import Navbar from "@/components/navbar/Navbar";
// import 'bootstrap/dist/css/bootstrap.min.css';
import Animation from "../animation/page";
import Capability2 from "../colorBox/page";
import Cta2 from "../control/page";
import SixCard from "../cards/page";
import SixCardVideo from "../cardsvideo/page";
import SixCardTab from "../cardstab/page";
import SixCardSwitch from "../cardsswitch/page";
import AnimationStory from "../animationstory/page";
import Image from "next/image";

// I commented this bootstrapp CDN because of conflicting styles with tailwindcss, NB: I'll uncomment it as soon as reliable solution is found
function Page() {
  const [isFormFocused, setIsFormFocused] = useState(true);
  // floating components
  return (
    <React.Fragment>
      <Navbar
        logoUrl="/grey.svg"
        logoAlt="Custom Logo"
        backgroundColor="#f5f5f5"
      />
      <div className="bg-[#F5F5F5] w-full h-full">
        <AnimationStory />
        <div className="relative mx-auto p-6 sm:p-0  -translate-y-20 items-center justify-center flex  flex-col sm:flex-row gap-4">
          <button className="flex items-center gap-2 text-primary-green rounded-xl">
            <Image
              className="w-full h-full"
              src="/play2.png"
              alt="Play Store"
              width={180}
              height={400}
            />
          </button>
          <button className="flex items-center gap-2 text-primary-green rounded-xl">
            <Image
              className="w-full h-full"
              src="/apple2.png"
              alt="Apple Store"
              width={180}
              height={400}
            />
          </button>
          <button className="flex  w-full h-full  max-w-[330px] max-h-[159px] items-center gap-2 text-primary-green rounded-xl">
            <Image
              className="w-full h-full"
              src="/badge2.png"
              alt="Apple Store"
              width={280}
              height={600}
            />
          </button>
        </div>
      </div>{" "}
      <div className="sm:px-10 sm:-translate-y-10 relative z-0">
        <DragFeatures />
      </div>
      {/* <Banner /> */}
      <OurProcess />
      {/* <Features /> */}
      <div className="">
        <SixCard />
      </div>
      <SixCardVideo />
      <Animation />
      {/* <Facts /> */}
      {/* <Carousel /> */}
      {/* <PoweredBy /> */}
      <section className="sm:px-0 px-6 ">
        {" "}
        <Premium />
      </section>
      <SixCardTab />
      <SixCardSwitch />
      {/* <Capability /> */}
      {/* <Capability2 /> */}
      <section className="sm:px-0 px-6 py-10 sm:py-40 ">
        {" "}
        <WhyChoose />{" "}
      </section>
      <FuturePlans />
      <section className="sm:px-0 px-6 sm:mt-20 ">
        {" "}
        <Cta2 />{" "}
      </section>
      <Faqs />
      <Footer />
    </React.Fragment>
  );
}

export default Page;
