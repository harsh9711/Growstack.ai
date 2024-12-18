"use client";
import React from "react";
import "aos/dist/aos.css";
import dynamic from "next/dynamic";

// Update the import path to match your exact file name and location
const Box = dynamic(() => import("./videoBox"), {
  ssr: false,
});

const SixCardVideo = () => {
  return (
    <div className="sm:p-0 p-6">
      <div className="max-w-fit flex flex-col items-center gap-y-6 sm:gap-y-8 w-full mx-auto sm:pb-40">
        <div
          className="flex flex-col text-center gap-6 w-full justify-between items-center"
          data-aos="fade-right"
        >
          <div
            className="max-w-fit rounded-2xl flex items-center justify-center w-full px-4 py-2 text-primary-lightgreen bg-[#2DA77114]"
            data-aos="fade-in"
          >
            <h2 className="text-center leading-snug capitalize text-[12px] sm:text-[16px] font-extrabold">
              GROWSTACK FACTS
            </h2>
          </div>
          <h1 className="text-[16px] sm:text-[28px] xl:text-[40px] w-full leading-tight font-semibold text-black">
            Hit play and unlock 10x your growth{" "}
            <span className="font-light">in just 1/10th the time!</span>
          </h1>
        </div>
        <Box />
      </div>
    </div>
  );
};

export default SixCardVideo;
