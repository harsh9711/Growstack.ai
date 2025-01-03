"use client";

import Navbar from "@/components/navbar/Navbar";
import HeroSection from "./components/HeroSection";
import PricingNew from "./components/PricingNew";
import Footer from "@/components/footer/Footer";
// import TickIcon from "./TickIcon";
// import DashIcon from "./DashIcon";
import "aos/dist/aos.css";
import React from "react";
import "aos/dist/aos.css";

const PricingPage: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div className="relative z-40">
        <Navbar
          logoUrl="/logo/growstack1.png"
          logoAlt="Custom Logo"
          backgroundColor="white"
        />
      </div>
     
      <div className="w-full max-w-[1600px] px-4 mx-auto !mt-2 mb-40" style={{zoom: 0.6}}>
        <PricingNew />
      </div>

      <Footer />
    </div>
  );
};

export default PricingPage;
