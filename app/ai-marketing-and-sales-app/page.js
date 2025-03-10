"use client";
import React from "react";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Banner from "@/components/aiMarketingSales/banner/Banner";
import EasySteps from "@/components/aiMarketingSales/easySteps/EasySteps";
import CreateUltimate from "@/components/aiMarketingSales/createUltimate/CreateUltimate";
import DetailFeatures from "@/components/aiMarketingSales/detailFeatures/DetailFeatures";
import AiPartner from "@/components/aiMarketingSales/aiPartner/AiPartner";
import UniqueModel from "@/components/aiMarketingSales/uniqueModel/UniqueModel";
import BusinessSolution from "@/components/aiMarketingSales/businessSolution/BusinessSolution";
import CustomerStories from "@/components/aiMarketingSales/customerStories/CustomerStories";
import Faqs from "@/components/home/faq/Faqs";
import Cta2 from "../control/page";

function Page() {
  return (
    <React.Fragment>
      <Navbar />
      <Banner />
      <EasySteps />
      <CreateUltimate />
      <DetailFeatures />
      {/* <AiPartner/> */}
      <UniqueModel />
      <BusinessSolution />
      {/* <CustomerStories /> */}
      <Cta2/>
      <Faqs />
      <Footer />
    </React.Fragment>
  );
}

export default Page;
