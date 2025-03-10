"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import HeroSection from "./components/HeroSection";
import Owner from "./components/owner";
import Carousel from "./components/carousel";
import Vision from "./components/vision";
import { team } from "@/types/data";
import Footer from "@/components/footer/Footer";
import Teams from "./components/teams";

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
          logoUrl="/logo/growstack1.png"
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
        <Vision />
      </section>
      <section className="px-20" data-aos="zoom-in">
        <Owner />
      </section>
      <section className="px-20 pb-20" data-aos="zoom-in">
        <Teams />
      </section>
      <Footer />
    </div>
  );
};

export default Company;
