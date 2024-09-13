"use client";
import React from "react";

import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Banner from "@/components/home/banner/Banner";
import DragFeatures from "@/components/home/drag-features/DragFeatures";
import OurProcess from "@/components/home/ourProcess/OurProcess";
import PoweredBy from "@/components/home/poweredBy/PoweredBy";
import Features from "@/components/home/features/Features";
import Marketing from "@/components/home/marketing/Marketing";
import Premium from "@/components/home/premium/Premium";
import Capability from "@/components/home/capability/Capability";
import WhyChoose from "@/components/home/whyChoose/WhyChoose";
import FuturePlans from "@/components/home/futurePlans/FuturePlans";
import Cta from "@/components/home/cta/Cta";
import Faqs from "@/components/home/faq/Faqs";
import 'bootstrap/dist/css/bootstrap.min.css';
// I commented this bootstrapp CDN because of conflicting styles with tailwindcss, NB: I'll uncomment it as soon as reliable solution is found

function Page() {
  return (
    <React.Fragment>
      <Navbar logoUrl="/images/logo.png" logoAlt="Custom Logo" />
      {/* <DragFeatures /> */}
      <Banner/>
      <OurProcess />
      <PoweredBy />
      <Features />
      {/* <Marketing/> */}
      <Premium />
      <Capability />
      <WhyChoose />
      <FuturePlans />
      <Cta />
      <Faqs />
      <Footer />
    </React.Fragment>
  );
}

export default Page;
