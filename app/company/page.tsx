"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import HeroSection from "./components/HeroSection";
import Carousel from "./components/Carousel";
import Vision from "./components/Vision";
import Owner from "./components/owner";

const Company = () => {
  // Initialize AOS when the component mounts
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of animations
      once: true, // Only animate once on scroll
    });
  }, []);

  return (
    <div>
      <div className="relative z-40">
        <Navbar
          logoUrl="/white.png"
          logoAlt="Custom Logo"
          backgroundColor="white"
        />
      </div>

      <section data-aos="fade-up">
        <HeroSection />
      </section>

      <section className="p-20" data-aos="zoom-in">
        <Carousel />
      </section>

     <section className="p-20" data-aos="zoom-in">
        <Vision/>
      </section>
      <section className="px-20" data-aos="zoom-in">
        <Owner/>
      </section>
    </div>
  );
};

export default Company;
