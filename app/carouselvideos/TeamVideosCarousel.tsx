"use client";
import React, { useRef, useState } from "react";
import "swiper/css";
import { teamvideos } from "@/types/data";
import VideoSwiper from "./VideoSwiper"; // Import the VideoSwiper component

function App() {
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(
    null
  );
  const swiperRef = useRef<any>(null);

  const handlePlayVideo = (index: number) => {
    setPlayingVideoIndex(index);
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleStopVideo = () => {
    setPlayingVideoIndex(null);
    if (swiperRef.current) {
      swiperRef.current.autoplay.start();
    }
  };

  return (
    <div className="bg-[url('/backd.svg')] bg-cover bg-no-repeat py-12">
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="space-y-4">
            <span className="bg-emerald-900/30 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium">
              GrowStack Facts
            </span>
            <h1 className="text-4xl font-bold text-white">
              Free up 10 hours <span className="font-light">every week</span>
            </h1>
          </div>
          <div className="bg-emerald-900/30 text-emerald-400 rounded-full px-4 py-2">
            <span>
              {playingVideoIndex !== null ? playingVideoIndex + 1 : 1}/
              {teamvideos.length}
            </span>
          </div>
        </div>

        <VideoSwiper
          teamvideos={teamvideos}
          playingVideoIndex={playingVideoIndex}
          onPlay={handlePlayVideo}
          onStop={handleStopVideo}
          swiperRef={swiperRef}
        />
      </div>
    </div>
  );
}

export default App;
