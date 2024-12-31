"use client";
import React, { useRef, useState, useEffect } from "react";
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
  const [isIOS, setIsIOS] = useState(false);

  // Detect iOS device
  useEffect(() => {
    const iOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    setIsIOS(iOS);
  }, []);

  const handlePlayVideo = async (index: number) => {
    setPlayingVideoIndex(index);

    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
    }

    for (let i = 0; i < videoRefs.current.length; i++) {
      const video = videoRefs.current[i];
      if (video) {
        try {
          if (i === index) {
            if (isIOS) {
              video.load();
              await new Promise(resolve => setTimeout(resolve, 100));
            }
            await video.play();
          } else {
            video.pause();
            video.currentTime = 0;
          }
        } catch (error) {
          console.error("Video playback error:", error);
        }
      }
    }
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
        video.currentTime = 0;
      }
    });
  };

  // Handle video loading for iOS
  const handleVideoRef = (el: HTMLVideoElement | null, index: number) => {
    videoRefs.current[index] = el;
    if (el && isIOS) {
      el.load(); // Preload video for iOS
    }
  };

  const swiperBreakpoints = {
    320: {
      slidesPerView: 1.2,
      spaceBetween: 10,
    },
    480: {
      slidesPerView: 1.5,
      spaceBetween: 15,
    },
    640: {
      slidesPerView: 2.5,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 2.5,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3.5,
      spaceBetween: 20,
    },
    1280: {
      slidesPerView: 4.5,
      spaceBetween: 20,
    },
  };

  return (
    <div className="bg-[url('/backd.svg')] bg-cover bg-no-repeat py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-8 sm:mb-12">
          <div className="space-y-3 sm:space-y-4">
            <span className="bg-emerald-900/30 text-emerald-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm font-medium inline-block">
              GrowStack Facts
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Free up 10 hours <span className="font-light">every week</span>
            </h1>
          </div>
          <div className="bg-emerald-900/30 text-emerald-400 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
            <span>
              0{playingVideoIndex !== null ? playingVideoIndex + 1 : 1}/
              {teamvideos.length}
            </span>
          </div>
        </div>

        <Swiper
          slidesPerView={4.5}
          loop
          spaceBetween={20}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={1000}
          modules={[Autoplay]}
          onSwiper={swiper => {
            swiperRef.current = swiper;
          }}
          onSlideChange={({ activeIndex }) => {
            setCurrentVideoIndex(activeIndex);
            // Stop any playing video when sliding
            if (playingVideoIndex !== null) {
              handleStopVideo();
            }
          }}
          breakpoints={swiperBreakpoints}
          className="w-full"
          watchSlidesProgress={true}
          observer={true}
          observeParents={true}
        >
          {teamvideos.map((item, index) => (
            <SwiperSlide key={index}>
              <VideoSlide
                item={item}
                index={index}
                playingVideoIndex={playingVideoIndex}
                videoRef={el => handleVideoRef(el, index)}
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
