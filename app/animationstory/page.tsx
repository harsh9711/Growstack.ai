"use client"
import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const KeyPoints = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 p-4 sm:p-8">
      {[
        "Spot Social Trends and Generate Content Instantly",
        "Launch Campaigns in Clicks—Create, Publish, Manage",
        "SAI Agents for Smart Lead Gen and Engagement",
        "Streamline Sales and Marketing with AI Automation",
      ].map((point, index) => (
        <div key={index} className="flex flex-row items-start space-x-2">
          <span className="w-3 h-3 mt-2 bg-green-500 rounded-full" />
          <h2 className="text-sm sm:text-md md:text-lg font-semibold text-black">
            {point}
          </h2>
        </div>
      ))}
    </div>
  );
};

const AnimationStory = () => {
  const videoRef = useRef(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xRotation = ((clientY - innerHeight / 2) / innerHeight) * 20;
      const yRotation = ((clientX - innerWidth / 2) / innerWidth) * -20;
      (
        videoRef.current as HTMLVideoElement
      ).style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.05)`;
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      (videoRef.current as HTMLVideoElement).style.transform =
        "rotateX(0deg) rotateY(0deg) scale(1)";
    }
  };

  return (
    <div
      className="relative w-full h-screen max-h-[550px] sm:max-h-[1000px] border-none outline-none overflow-y-hidden bg-[#F5F5F5] text-white"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        className="absolute border-none outline-none top-0 left-0 right-0 w-full h-full hidden sm:block transition-transform duration-500 ease-out"
        style={{ border: "none", outline: "none", perspective: "1000px" }}
      >
        <source src="https://growstack-static-content.s3.us-east-1.amazonaws.com/234.mp4" type="video/mp4" className="w-full h-full" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 mx-auto flex flex-col sm:mt-2 max-w-[1320px] p-4">
        <div className="flex w-full flex-col gap-6 sm:flex-row items-center justify-between">
          <h1 className="text-black text-[16px] sm:text-[24px] md:text-[36px] lg:text-[42px] text-center sm:text-start max-w-[620px] w-full font-medium mb-1">
            AI for
            <span className="font-extrabold text-[#2DA771] px-2">
              Smarter Growth, Engagement, & Automation
            </span>
          </h1>
          <div className="flex flex-col text-center sm:text-start sm:text-[16px] md:text-[20px] font-semibold">
            <h2 className="text-[#2DA771]">
              No More <span className="text-black">Silos</span>
            </h2>
            <h2 className="text-[#2DA771]">
              No More <span className="text-black">Delays</span>
            </h2>
            <h2 className="text-[#2DA771]">
              No More <span className="text-black">Limits</span>
            </h2>
            <div className="mt-2">
              <Link href="/demo">
                <button className="border border-[#D9D9D9] flex bg-[#2DA771] items-center gap-2 text-white hover:font-bold font-medium py-3 sm:py-4 px-5 sm:px-7 rounded-xl shadow-lg shadow-[#00000025]">
                  Get demo <ArrowRight className="text-white" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Key Points Section */}
        <div className="flex sm:hidden  w-full mx-auto items-center justify-center max-w-[1320px] mt-6 sm:mt-10">
          <KeyPoints />
        </div>
      </div>
    </div>
  );
};

export default AnimationStory;
