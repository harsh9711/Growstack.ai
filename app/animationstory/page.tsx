"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

// Lazy load the KeyPoints component
const KeyPoints = dynamic(() => import("./KeyPoints"), {
  ssr: false,
});
const AnimationStory = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  useEffect(() => {
    const videoElement = videoRef.current;
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      setIsVideoLoaded(entry.isIntersecting);

      if (entry.isIntersecting && videoElement) {
        videoElement.play().catch((error) => {
          console.error("Autoplay was prevented:", error);
        });
      } else if (videoElement) {
        videoElement.pause();
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    if (videoElement) {
      observer.observe(videoElement);
    }

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen max-h-[550px] sm:max-h-[1000px] border-none outline-none overflow-y-hidden bg-[#F5F5F5] text-white">
      <video
        ref={videoRef}
        src="https://growstack-static-content.s3.us-east-1.amazonaws.com/landingpagevideos.mp4"
        autoPlay
        playsInline
        loop
        muted
        preload="auto"
        className={`absolute top-0 left-0 w-full h-full ease-out hidden sm:block border-none outline-none right-0 transition-opacity duration-700 ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 mx-auto flex flex-col sm:mt-2 max-w-[1320px] p-4">
        <div className="flex w-full flex-col gap-6 sm:flex-row items-center justify-between">
          <h1 className="text-black text-[16px] sm:text-[24px] md:text-[36px] lg:text-[42px] text-center sm:text-start max-w-[620px] w-full font-medium mb-1">
            AI for
            <span className="font-extrabold text-[#2DA771] px-2">
              Smarter Writing, Engagement & Automation
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
                  Get a demo <ArrowRight className="text-white" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Key Points Section */}
        <div className="flex sm:hidden w-full mx-auto items-center justify-center max-w-[1320px] mt-6 sm:mt-10">
          <KeyPoints />
        </div>
      </div>
    </div>
  );
};

export default AnimationStory;
