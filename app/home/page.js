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
// I commented this bootstrapp CDN because of conflicting styles with tailwindcss, NB: I'll uncomment it as soon as reliable solution is found
function Page() {
  const [isFormFocused, setIsFormFocused] = useState(true);

  return (
    <React.Fragment>
      <Navbar logoUrl="/imagelogo.svg" logoAlt="Custom Logo" />
      <div>
        <AnimationStory/>
      </div>
      <div className="sm:px-20 relative z-0">
        {" "}
        <DragFeatures />
      </div>
      {/* <Banner /> */}
      <OurProcess />
      {/* <Features /> */} <SixCard />
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
      {/* <SixCardSwitch /> */}
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
