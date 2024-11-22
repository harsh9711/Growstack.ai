"use client";
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { teamvideos } from '@/types/data';

// Mock data for videos

function App() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [manualHover, setManualHover] = useState(false);

  // Auto cycle through videos every 4 seconds
  useEffect(() => {
    if (!manualHover) {
      const interval = setInterval(() => {
        setHoveredIndex((prev) => {
          if (prev === null) return 0;
          return (prev + 1) % teamvideos.length;
        });
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [manualHover]);

  const handleVideoHover = (index: number) => {
    setManualHover(true);
    setHoveredIndex(index);
  };

  const handleVideoLeave = () => {
    setManualHover(false);
  };

  return (
    <div className=" bg-[url('/backd.svg')] bg-cover  bg-no-repeat py-12">
      {/* Header Section */}
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
            <span>0{currentVideoIndex + 1}</span> / <span>{teamvideos.length}</span>
          </div>
        </div>

        {/* Carousel Section */}
        <Swiper
          slidesPerView={4.5}
          spaceBetween={20}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop
          speed={1000}
          modules={[Autoplay]}
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
                  hoveredIndex === index
                    ? 'ring-4 ring-red-500 ring-opacity-75 scale-105 animate-pulse-border'
                    : ''
                }`}
                onMouseEnter={() => handleVideoHover(index)}
                onMouseLeave={handleVideoLeave}
              >
                <video
                  loop
                  muted
                  playsInline
                  className="w-full h-full sm:h-[500px] object-cover rounded-2xl"
                  ref={(el) => {
                    if (el) {
                      if (hoveredIndex === index) {
                        el.play();
                      } else {
                        el.pause();
                        el.currentTime = 0;
                      }
                    }
                  }}
                >
                  <source src={item.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Progress Bar */}
                {hoveredIndex === index && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-red-500/20">
                    <div className="h-full bg-red-500 animate-progress-bar"></div>
                  </div>
                )}

                {/* Hover Overlay */}
                <div
                  className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
                    hoveredIndex === index
                      ? 'bg-gradient-to-t from-black/50 to-transparent opacity-100'
                      : 'opacity-0'
                  }`}
                >
                  {/* <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                    {index + 1}
                  </div> */}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default App;