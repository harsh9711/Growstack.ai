"use client";
import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Pause } from "lucide-react";

const Box = () => {
  const videoRef = useRef<HTMLVideoElement>(null); // Add explicit type
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-in-out",
      offset: 1,
    });
    AOS.refresh();
  }, []);

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (!isPlaying) {
        console.log("Playing video...");
        videoRef.current.play(); // Play video
        setIsPlaying(true);
      } else {
        console.log("Pausing video...");
        videoRef.current.pause(); // Pause video
        setIsPlaying(false);
      }
    } else {
      console.error("Video reference is not set!");
    }
  };

  return (
    <div className="sm:px-20">
      <div
        data-aos="fade-up"
        className="relative text-black bg-white hover:bg-[#F4F4F4] group rounded-[20px] shadow-lg hover:shadow-2xl text-center sm:text-start items-center sm:items-start transition-transform duration-500 ease-in-out max-w-fit w-full h-full flex flex-col gap-y-4 justify-center"
      >
        <div
          className="relative w-full h-full"
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          {/* Video */}
          <video
            ref={videoRef}
            className="w-full h-full max-w-fit rounded-sm sm:rounded-2xl border-none outline-none object-cover"
            src="https://video.gumlet.io/6736ff3173f4706c690ece0c/6736ffd073f4706c690ed072/download.mp4"
            poster="/staticvideo.svg"
            controls={false}
          />

          {/* Play Button */}
          <button
            className="absolute inset-0 flex items-center justify-center"
            onClick={handlePlayClick}
          >
            {isPlaying ? (
              isVisible && (
                <Pause
                  size={20}
                  color="white" // Ensure this is used by the component for the icon or background color
                  className="w-16 h-16 bg-[#2DA771] rounded-full ring-4 ring-white grid place-items-center hover:bg-[#2DA771]/90 transition-all duration-300"
                />
              )
            ) : (
              <div className="w-16 h-16 bg-[#2DA771] rounded-full ring-4 ring-white grid place-items-center hover:bg-[#2DA771]/90 transition-all duration-300">
                <svg
                  className="ml-1 w-6 h-6"
                  viewBox="0 0 16 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 7.26795C16.3333 8.03775 16.3333 9.96225 15 10.7321L3 17.6603C1.66667 18.4301 1.01267e-06 17.4678 1.07997e-06 15.9282L1.68565e-06 2.0718C1.75295e-06 0.532196 1.66667 -0.430054 3 0.339746L15 7.26795Z"
                    fill="white"
                  />
                </svg>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

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
