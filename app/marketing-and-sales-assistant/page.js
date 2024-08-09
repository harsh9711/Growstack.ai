"use client";
import React from "react";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Banner from "@/components/marketingSalesAssistant/banner/Banner";
import AiEnhanced from "@/components/marketingSalesAssistant/aiEnhanced/AiEnhanced";
import AiSlider from "@/components/marketingSalesAssistant/aiSlider/AiSlider";
import Interface from "@/components/marketingSalesAssistant/interface/Interface";
import Benefits from "@/components/marketingSalesAssistant/benefits/Benefits";
import AgentsDepartment from "@/components/marketingSalesAssistant/agentsDepartment/AgentsDepartment";
import 'bootstrap/dist/css/bootstrap.min.css';
// I commented this bootstrapp CDN because of conflicting styles with tailwindcss, NB: I'll uncomment it as soon as reliable solution is found

function Page() {
  return (
    <React.Fragment>
      <div className="transNav">
        <Navbar />
        <Banner />
        <AiEnhanced />
        <AiSlider />
        <Interface />
        <AgentsDepartment />
        <Benefits />
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default Page;
