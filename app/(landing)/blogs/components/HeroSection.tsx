"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface HeroSectionProps {
  title: string;
  description: string;
  lastUpdatedDate: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  description,
  lastUpdatedDate,
}) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section
      className="bg-[#FAE8F1] text-white w-full  items-center justify-center mx-auto"
      data-aos="fade-up"
    >
      <div
        className="mx-auto flex max-w-[715px] w-full text-white my-20 items-center justify-between"
        data-aos="fade-right"
      >
        <div className="flex flex-col items-center justify-center gap-4" data-aos="fade-up">
        <h1 className="text-[42px] max-w-4xl mx-auto leading-normal text-center font-semibold text-black">
        Learn from My Mistakes: 7 Digital</h1>
          <h1 className="text-[42px] max-w-4xl mx-auto leading-normal text-center font-light bg-gradient-to-b from-[#000000]/100 to to-[#ffffff]/100 bg-clip-text text-transparent">
            Course Pitfalls to Skip
          </h1>

          <p className="text-black text-center text-[18px] font-light max-w-[610px] ">
            Lorem ipsum dolor sit amet consectetur. Id arcu arcu commodo
            vestibulum ut ornare.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
