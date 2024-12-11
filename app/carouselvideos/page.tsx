"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { teamvideos } from "@/types/data";
import { Pause } from "lucide-react";
import { Autoplay } from "swiper/modules";

function App() {
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(
    null
  );
  const swiperRef = useRef<any>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handlePlayVideo = (index: number) => {
    setPlayingVideoIndex(index);

    // Stop Swiper autoplay when a video is played
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
    }

    // Play the selected video and stop others
    videoRefs.current.forEach((video, idx) => {
      if (video) {
        if (idx === index) {
          video
            .play()
            .catch(error => console.error("Video play error:", error));
        } else {
          video.pause();
          video.currentTime = 0; // Reset other videos
        }
      }
    });
  };

  const handleStopVideo = () => {
    setPlayingVideoIndex(null);

    // Resume Swiper autoplay when video is stopped
    if (swiperRef.current) {
      swiperRef.current.autoplay.start();
    }

    // Pause all videos
    videoRefs.current.forEach(video => {
      if (video) {
        video.pause();
        video.currentTime = 0; // Reset video
      }
    });
  };

  return (
    <div className="bg-[url('/backd.svg')] bg-cover bg-no-repeat py-12">
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="flex justify-between items-center mb-12">
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
              0{playingVideoIndex !== null ? playingVideoIndex + 1 : 1}
            </span>{" "}
            / <span>{teamvideos.length}</span>
          </div>
        </div>

        <Swiper
          slidesPerView={4.5}
          loop
          spaceBetween={20}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          speed={1000}
          modules={[Autoplay]}
          onSwiper={swiper => {
            swiperRef.current = swiper;
          }}
          onSlideChange={({ activeIndex }) => setCurrentVideoIndex(activeIndex)}
          breakpoints={{
            320: { slidesPerView: 3.5 },
            640: { slidesPerView: 2.5 },
            768: { slidesPerView: 1.5 },
            1024: { slidesPerView: 3.5 },
          }}
          className="w-full"
        >
          {teamvideos.map((item, index) => (
            <SwiperSlide key={index}>
              <div
                className={`relative group transition-all duration-300 rounded-2xl ${
                  playingVideoIndex === index
                    ? "ring-4 ring-red-500 ring-opacity-75 scale-105"
                    : ""
                }`}
              >
                <video
                  ref={el => {
                    videoRefs.current[index] = el;
                  }}
                  loop
                  playsInline
                  className="w-full h-full sm:h-[500px] object-cover rounded-2xl"
                >
                  <source src={item.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                <div
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  onClick={() => handlePlayVideo(index)}
                >
                  {playingVideoIndex !== index && (
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
                </div>

                {playingVideoIndex === index && (
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    onClick={handleStopVideo}
                  >
                    <Pause
                      size={20}
                      color="white"
                      className="w-16 h-16 bg-[#2DA771] rounded-full ring-4 ring-white grid place-items-center hover:bg-[#2DA771]/90 transition-all duration-300"
                    />
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default App;
