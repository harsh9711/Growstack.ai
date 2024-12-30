// components/TeamVideosCarousel.tsx
"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { teamvideos } from "@/types/data";
import VideoSlide from "./VideoSlide";

const TeamVideosCarousel: React.FC = () => {
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
              0{playingVideoIndex !== null ? playingVideoIndex + 1 : 1}/
              {teamvideos.length}
            </span>
            {/* / <span>{teamvideos.length}</span> */}
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
              <VideoSlide
                item={item}
                index={index}
                playingVideoIndex={playingVideoIndex}
                videoRef={el => (videoRefs.current[index] = el)}
                onPlayVideo={() => handlePlayVideo(index)}
                onStopVideo={handleStopVideo}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TeamVideosCarousel;
