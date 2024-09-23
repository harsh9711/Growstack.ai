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
      className="bg-[#FAE8F1] text-white w-full items-center justify-center mx-auto"
      data-aos="fade-up"
    >
      <div
        className="mx-auto flex max-w-[715px] w-full text-white my-8 md:my-20 items-center justify-center"
        data-aos="fade-right"
      >
        <div
          className="flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-4"
          data-aos="fade-up"
        >
          <h1 className="text-[16px] sm:text-[28px] md:text-[42px] max-w-xl sm:max-w-2xl md:max-w-4xl mx-auto leading-normal text-center font-semibold text-black">
            Learn from My Mistakes: 7 Digital
          </h1>
          <h1 className="text-[16px] sm:text-[28px] md:text-[42px] max-w-xl sm:max-w-2xl md:max-w-4xl mx-auto leading-normal text-center font-light text-black">
            Course Pitfalls to Skip
          </h1>
          <p className="text-black text-center text-[12px] sm:text-[16px] md:text-[18px] font-light max-w-[610px]">
            Lorem ipsum dolor sit amet consectetur. Id arcu arcu commodo
            vestibulum ut ornare.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
