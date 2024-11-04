"use client";
import React from "react";
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
// I commented this bootstrapp CDN because of conflicting styles with tailwindcss, NB: I'll uncomment it as soon as reliable solution is found
function Page() {
  return (
    <React.Fragment>
      <Navbar logoUrl="/images/logo.png" logoAlt="Custom Logo" />
      <div className="sm:px-10 relative z-0">
        {" "}
        <DragFeatures />
      </div>
      {/* <Banner /> */}
      <OurProcess />
      {/* <Features /> */}
      <Animation />
  
      <Facts />
      <Carousel />

      <PoweredBy />
      <Premium />
      {/* <Capability /> */}
      <Capability2/>
      <WhyChoose />
      <FuturePlans />
       <Cta2 />
      <Faqs />
      <Footer />
    </React.Fragment>
  );
}

export default Page;
