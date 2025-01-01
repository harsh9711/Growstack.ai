import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { VideoCard } from "./VideoCard";
import { teamvideos } from "@/types/data";

import "swiper/css";
import "swiper/css/effect-coverflow";

export const VideoSwiper: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType>();

  const handleVideoPlay = () => {
    setIsPlaying(true);
    // Disable autoplay when video starts playing
    swiperRef.current?.autoplay.stop();
    // Disable user interaction while video is playing
    if (swiperRef.current) {
      swiperRef.current.allowTouchMove = false;
      swiperRef.current.allowSlideNext = false;
      swiperRef.current.allowSlidePrev = false;
    }
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
    // Re-enable autoplay when video is paused
    swiperRef.current?.autoplay.start();
    // Re-enable user interaction
    if (swiperRef.current) {
      swiperRef.current.allowTouchMove = true;
      swiperRef.current.allowSlideNext = true;
      swiperRef.current.allowSlidePrev = true;
    }
  };

  return (
    <div className="w-full py-12">
      <Swiper
        onBeforeInit={swiper => {
          swiperRef.current = swiper;
        }}
        effect="coverflow"
        grabCursor={!isPlaying}
        centeredSlides={true}
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        modules={[Autoplay, EffectCoverflow]}
        onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
        className="w-full"
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {teamvideos.map((video, index) => (
          <SwiperSlide key={video.id} className="py-4">
            <VideoCard
              video={video}
              isActive={index === activeIndex}
              onVideoPlay={handleVideoPlay}
              onVideoPause={handleVideoPause}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
