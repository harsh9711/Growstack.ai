"use client";
import React, { useRef, useState, useEffect } from "react";
import { teamvideos } from "@/types/data";
import VideoSlide from "./VideoSlide";

const TeamVideosCarousel = () => {
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(
    null
  );
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [isIOS, setIsIOS] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoScrollInterval = useRef<NodeJS.Timeout>();
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Calculate visible videos based on screen width
  const getVisibleCount = () => {
    if (typeof window === "undefined") return 4;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    if (window.innerWidth < 1280) return 3;
    return 4;
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  useEffect(() => {
    const iOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(iOS);

    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-scroll setup
  useEffect(() => {
    if (!isIOS) {
      // Disable auto-scroll on iOS for better performance
      startAutoScroll();
    }
    return () => stopAutoScroll();
  }, [playingVideoIndex, isIOS]);

  const stopAutoScroll = () => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }
  };

  const startAutoScroll = () => {
    stopAutoScroll();
    if (playingVideoIndex === null) {
      autoScrollInterval.current = setInterval(() => {
        handleScrollNext();
      }, 4000);
    }
  };
  const handleScrollNext = () => {
    setCurrentIndex(prev => (prev + 1) % teamvideos.length);
  };

  const handleScrollPrev = () => {
    setCurrentIndex(prev => (prev - 1 + teamvideos.length) % teamvideos.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;

    const currentTouch = e.touches[0].clientX;
    const diff = touchStart - currentTouch;

    if (Math.abs(diff) > 50) {
      // Minimum swipe distance
      if (diff > 0) {
        handleScrollNext();
      } else {
        handleScrollPrev();
      }
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  const initializeVideo = async (video: HTMLVideoElement) => {
    if (isIOS) {
      try {
        video.playsInline = true;
        video.muted = true;
        video.preload = "auto";
        await video.load();
      } catch (error) {
        console.error("iOS video initialization error:", error);
      }
    }
  };

  const handlePlayVideo = async (index: number) => {
    try {
      stopAutoScroll();

      // Stop any currently playing video
      if (playingVideoIndex !== null && videoRefs.current[playingVideoIndex]) {
        videoRefs.current[playingVideoIndex]?.pause();
      }

      setPlayingVideoIndex(index);

      const videoElement = videoRefs.current[index];
      if (!videoElement) return;

      if (isIOS) {
        try {
          videoElement.currentTime = 0;
          videoElement.muted = true;
          await videoElement.play();
          // Keep video muted on iOS for better playback reliability
        } catch (error) {
          console.error("iOS play error:", error);
        }
      } else {
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
    if (!isIOS) {
      startAutoScroll();
    }
  };

  const handleVideoRef = (el: HTMLVideoElement | null, index: number) => {
    videoRefs.current[index] = el;
    if (el) {
      initializeVideo(el);
    }
  };

  // Calculate which videos should be visible
  const visibleVideos = () => {
    const videos = [...teamvideos];
    const result = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % videos.length;
      result.push({ ...videos[index], originalIndex: index });
    }
    return result;
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
              0{currentIndex + 1}/{teamvideos.length}
            </span>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={handleScrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-emerald-900/30 text-emerald-400 p-2 rounded-full"
          >
            ←
          </button>

          <div
            className="flex gap-4 overflow-hidden touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {visibleVideos().map((item, index) => (
              <div
                key={item.originalIndex}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
              >
                <VideoSlide
                  item={item}
                  index={item.originalIndex}
                  playingVideoIndex={playingVideoIndex}
                  videoRef={el => handleVideoRef(el, item.originalIndex)}
                  onPlayVideo={() => handlePlayVideo(item.originalIndex)}
                  onStopVideo={handleStopVideo}
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleScrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-emerald-900/30 text-emerald-400 p-2 rounded-full"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamVideosCarousel;
