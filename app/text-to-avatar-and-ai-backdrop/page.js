"use client";
import Footer from "@/components/footer/Footer";
import Faqs from "@/components/home/faq/Faqs";
import Navbar from "@/components/navbar/Navbar";
import AiProduct from "@/components/textToVideoAndProductAi/aiProduct/AiProduct";
import AiSlider from "@/components/textToVideoAndProductAi/aiTextSlider/AiTextSlider";
import Banner from "@/components/textToVideoAndProductAi/banner/Banner";
import CoreProduct from "@/components/textToVideoAndProductAi/coreProduct/CoreProduct";
import Editing from "@/components/textToVideoAndProductAi/editing/Editing";
import ElevateBrand from "@/components/textToVideoAndProductAi/elevateBrand/ElevateBrand";
import VideoSolution from "@/components/textToVideoAndProductAi/VideoSolution/VideoSolution";
import React from "react";

function Page() {
  return (
    <React.Fragment>
      <Navbar />
      <Banner />
      <VideoSolution />
      <ElevateBrand />
      <AiProduct />
      <AiSlider />
      <CoreProduct />
      <Editing />
      <Faqs />
      <Footer />
    </React.Fragment>
  );
}

export default Page;
