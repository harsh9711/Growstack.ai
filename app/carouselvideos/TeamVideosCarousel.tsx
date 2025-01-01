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
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoScrollInterval = useRef<NodeJS.Timeout>();
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Calculate how many items to show based on screen size
  const getItemsPerView = () => {
    if (typeof window === "undefined") return 4;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    if (window.innerWidth < 1280) return 3;
    return 4;
  };

  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Create a duplicated array for infinite loop effect
  const extendedVideos = [...teamvideos, ...teamvideos, ...teamvideos];

  useEffect(() => {
    const iOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(iOS);
  }, []);

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, [playingVideoIndex]);

  const startAutoScroll = () => {
    stopAutoScroll();
    if (playingVideoIndex === null) {
      autoScrollInterval.current = setInterval(() => {
        handleScrollNext();
      }, 4000);
    }
  };

  const stopAutoScroll = () => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
    }
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentIndex >= teamvideos.length) {
      setCurrentIndex(0);
    } else if (currentIndex < 0) {
      setCurrentIndex(teamvideos.length - 1);
    }
  };

  const handleScrollNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handleScrollPrev = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev - 1);
    }
  };

  const initializeVideo = async (video: HTMLVideoElement) => {
    if (isIOS) {
      try {
        video.playsInline = true;
        video.muted = true;
        video.preload = "auto";
        await video.load();
        const playPromise = video.play();
        if (playPromise !== undefined) {
          await playPromise;
          video.pause();
          video.currentTime = 0;
        }
      } catch (error) {
        console.error("iOS video initialization error:", error);
      }
    }
  };

  const handlePlayVideo = async (index: number) => {
    try {
      stopAutoScroll();

      if (playingVideoIndex !== null && videoRefs.current[playingVideoIndex]) {
        videoRefs.current[playingVideoIndex]?.pause();
      }

      setPlayingVideoIndex(index);

      const videoElement = videoRefs.current[index];
      if (!videoElement) return;

      if (isIOS) {
        videoElement.currentTime = 0;
        videoElement.muted = true;
        await videoElement.load();
        await new Promise(resolve => setTimeout(resolve, 100));

        try {
          await videoElement.play();
          videoElement.muted = false;
        } catch (error) {
          videoElement.muted = true;
          await videoElement.play();
        }
      } else {
        try {
          await videoElement.play();
        } catch (error) {
          console.error("Video play error:", error);
        }
      }

      videoElement.onended = () => {
        handleStopVideo();
        handleScrollNext();
      };

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
    startAutoScroll();
  };

  const handleVideoRef = (el: HTMLVideoElement | null, index: number) => {
    videoRefs.current[index] = el;
    if (el) {
      initializeVideo(el);
    }
  };

  const getTransformValue = () => {
    const itemWidth = 100 / itemsPerView;
    return `translateX(-${currentIndex * itemWidth}%)`;
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
              0
              {playingVideoIndex !== null
                ? playingVideoIndex + 1
                : (currentIndex % teamvideos.length) + 1}
              /{teamvideos.length}
            </span>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <button
            onClick={handleScrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-emerald-900/30 text-emerald-400 p-2 rounded-full hover:bg-emerald-900/50 transition-colors"
          >
            ←
          </button>

          <div
            ref={containerRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: getTransformValue(),
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedVideos.map((item, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2`}
                style={{ transition: "opacity 0.3s ease-in-out" }}
              >
                <VideoSlide
                  item={item}
                  index={index}
                  playingVideoIndex={playingVideoIndex}
                  videoRef={el => handleVideoRef(el, index)}
                  onPlayVideo={() => handlePlayVideo(index)}
                  onStopVideo={handleStopVideo}
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleScrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-emerald-900/30 text-emerald-400 p-2 rounded-full hover:bg-emerald-900/50 transition-colors"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamVideosCarousel;
