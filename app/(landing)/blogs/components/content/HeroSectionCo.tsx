"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

interface HeroSectionProps {
  title: string;
  description: string;
  lastUpdatedDate: string;
}

const HeroSectionCo: React.FC<HeroSectionProps> = ({
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
            AI Co-Pilots  :
          </h1>
          <h1 className="text-[16px] sm:text-[28px] md:text-[42px] max-w-xl sm:max-w-2xl md:max-w-4xl mx-auto leading-normal text-center font-light text-black">
            Are They Delivering Value to Your Revenue Expansion?
          </h1>
          <blockquote className="text-gray-600 italic  py-4 text-center rounded-2xl  ">
            “The sure way to make a future is to make it.” –
            <span className="font-bold ">Peter Drucker.</span>
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionCo;
