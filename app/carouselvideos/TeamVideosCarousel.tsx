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

  // Detect iOS device on component mount
  useEffect(() => {
    const iOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(iOS);
  }, []);

  const initializeVideo = async (video: HTMLVideoElement) => {
    if (isIOS) {
      try {
        // iOS specific initialization
        video.playsInline = true;
        video.muted = true;
        video.preload = "auto";
        await video.load();
        // Try to play immediately and mute to enable playback
        const playPromise = video.play();
        if (playPromise !== undefined) {
          await playPromise;
          video.pause(); // Pause immediately after successful play attempt
          video.currentTime = 0; // Reset to start
        }
      } catch (error) {
        console.error("iOS video initialization error:", error);
      }
    }
  };

  const handlePlayVideo = async (index: number) => {
    try {
      // Stop any currently playing video
      if (playingVideoIndex !== null && videoRefs.current[playingVideoIndex]) {
        videoRefs.current[playingVideoIndex]?.pause();
      }

      setPlayingVideoIndex(index);

      // Stop Swiper autoplay
      if (swiperRef.current) {
        swiperRef.current.autoplay.stop();
      }

      const videoElement = videoRefs.current[index];
      if (!videoElement) return;

      if (isIOS) {
        // iOS specific play handling
        videoElement.currentTime = 0;
        videoElement.muted = true; // Start muted on iOS
        await videoElement.load();
        await new Promise(resolve => setTimeout(resolve, 100)); // Small delay for iOS

        try {
          await videoElement.play();
          // After successful play, unmute if possible
          videoElement.muted = false;
        } catch (error) {
          console.error("iOS play error:", error);
          // If normal play fails, keep muted and try again
          videoElement.muted = true;
          await videoElement.play();
        }
      } else {
        // Android/other devices handling
        try {
          await videoElement.play();
        } catch (error) {
          console.error("Video play error:", error);
        }
      }

      // Pause all other videos
      videoRefs.current.forEach((video, idx) => {
        if (video && idx !== index) {
          video.pause();
          video.currentTime = 0;
        }
      });
    } catch (error) {
      console.error("Error in handlePlayVideo:", error);
    }
  };

  const handleStopVideo = () => {
    if (playingVideoIndex !== null && videoRefs.current[playingVideoIndex]) {
      const video = videoRefs.current[playingVideoIndex];
      video?.pause();
      if (video) video.currentTime = 0;
    }

    setPlayingVideoIndex(null);

    if (swiperRef.current) {
      swiperRef.current.autoplay.start();
    }
  };

  const handleVideoRef = (el: HTMLVideoElement | null, index: number) => {
    videoRefs.current[index] = el;
    if (el) {
      initializeVideo(el);
    }
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
          onSlideChange={({ activeIndex }) => {
            setCurrentVideoIndex(activeIndex);
            // Stop any playing video when sliding
            handleStopVideo();
          }}
          breakpoints={{
            320: { slidesPerView: 1.2, spaceBetween: 10 },
            480: { slidesPerView: 1.5, spaceBetween: 15 },
            640: { slidesPerView: 2.5, spaceBetween: 15 },
            768: { slidesPerView: 2.5, spaceBetween: 20 },
            1024: { slidesPerView: 3.5, spaceBetween: 20 },
            1280: { slidesPerView: 4.5, spaceBetween: 20 },
          }}
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
