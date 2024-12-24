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
      <div className="max-w-[1628px] rounded-b-[60px] bg-[#F4F6F6] flex flex-col justify-center items-center w-full mx-auto p-10 shadow-2xl">
        <TabLayout />
      </div>
    </div>
  );
};

export default SixCardTab;
