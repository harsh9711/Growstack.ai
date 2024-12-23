"use client";

import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import dynamic from "next/dynamic";

const TabLayout = dynamic(() => import("./components/TableLayout"), {
  ssr: false,
});

const SixCardTab: React.FC = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
      <div className="max-w-[1628px] rounded-b-[60px] bg-[#F4F6F6] flex flex-col justify-center items-center gap-10 w-full mx-auto p-10 shadow-2xl">
        <div
          className="max-w-[184px] rounded-2xl flex items-center justify-center w-full px-4 py-2 text-primary-lightgreen bg-[#2DA77114] shadow-md"
          data-aos="fade-in"
        >
          <h2 className="text-center leading-snug uppercase text-[14px] sm:text-[18px] font-extrabold">
            Solutions
          </h2>
        </div>
        <div
          className="flex flex-col justify-center text-center gap-6 w-full items-center"
          data-aos="fade-right"
        >
          <h1 className="text-[24px] xl:text-[42px] w-full leading-tight font-semibold text-gray-800">
            Enterprise-strong <span className="font-light">foundation</span>
          </h1>
        </div>
        <TabLayout />
      </div>
    </div>
  );
};

export default SixCardTab;
