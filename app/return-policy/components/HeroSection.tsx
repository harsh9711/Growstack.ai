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
      className="bg-[url('/tc.svg')] bg-cover bg-[100%] bg-no-repeat text-white w-full pt-40 pb-20 items-center justify-center mx-auto"
      data-aos="fade-up"
    >
      <div
        className="mx-auto flex max-w-[900px] w-full text-white mt-20 items-center justify-between"
        data-aos="fade-right"
      >
        <svg
          className="absolute"
          width="1920"
          height="276"
          viewBox="0 0 1920 276"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.3659"
            d="M-359.352 45.0313C-359.352 45.0313 153.537 -303.937 511.111 -303.937C868.686 -303.937 676.334 275.286 1127.59 275.286C1578.85 275.286 1672.56 -6.95275 2279.17 -6.95275"
            stroke="#F4F4F4"
            strokeWidth="0.3847"
            strokeMiterlimit="10"
          />
        </svg>

        <div className="flex flex-col gap-4" data-aos="fade-up">
          <h2 className="text-white max-w-[400px] font-bold xl:text-[42px] text-[24px] tracking-widest">
            {title}
          </h2>
          <p className="text-white text-[14px] font-light">
            Last updated on: {lastUpdatedDate}
          </p>
        </div>
        <div
          className="mt-6 max-w-[400px] w-full flex justify-end"
          data-aos="fade-left"
        >
          <p className="justify-end text-white text-[18px] font-extralight">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
