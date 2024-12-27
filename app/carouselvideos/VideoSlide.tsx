// components/VideoSlide.tsx
import React, { useRef, useEffect, useState } from "react";
import { Pause } from "lucide-react";

interface VideoSlideProps {
  item: {
    videoUrl: string;
  };
  index: number;
  playingVideoIndex: number | null;
  videoRef: (el: HTMLVideoElement | null) => void;
  onPlayVideo: () => void;
  onStopVideo: () => void;
}

const VideoSlide: React.FC<VideoSlideProps> = ({
  item,
  index,
  playingVideoIndex,
  videoRef,
  onPlayVideo,
  onStopVideo,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);

  // Combine the local ref with the parent's ref
  const handleVideoRef = (el: HTMLVideoElement | null) => {
    localVideoRef.current = el;
    videoRef(el);
  };

  useEffect(() => {
    // Handle visibility for auto-pause when scrolling out
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (
        !entry.isIntersecting &&
        localVideoRef.current &&
        !localVideoRef.current.paused
      ) {
        localVideoRef.current.pause();
        setIsPlaying(false);
        onStopVideo();
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    if (localVideoRef.current) {
      observer.observe(localVideoRef.current);
    }

    return () => {
      if (localVideoRef.current) {
        observer.unobserve(localVideoRef.current);
      }
    };
  }, [onStopVideo]);

  // Override play video to set local playing state
  const handlePlayVideo = () => {
    onPlayVideo();
    setIsPlaying(true);
  };

  // Override stop video to set local playing state
  const handleStopVideo = () => {
    onStopVideo();
    setIsPlaying(false);
  };

  return (
    <div
      className={`relative group transition-all duration-300 rounded-2xl ${
        playingVideoIndex === index
          ? "ring-4 ring-red-500 ring-opacity-75 scale-105"
          : ""
      }`}
    >
      <video
        ref={handleVideoRef}
        loop
        playsInline
        className="w-full h-full sm:h-[500px] object-cover rounded-2xl"
      >
        <source src={item.videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div
        className="absolute inset-0 flex items-center justify-center cursor-pointer"
        onClick={handlePlayVideo}
      >
        {playingVideoIndex !== index && (
          <div className="w-10 h-10 bg-[#2DA771] rounded-full ring-3 ring-white grid place-items-center hover:bg-[#2DA771]/90 transition-all duration-300">
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
            size={10}
            color="white"
            className="w-10 h-10 bg-[#2DA771] rounded-full ring-3 ring-white grid place-items-center hover:bg-[#2DA771]/90 transition-all duration-300"
          />
        </div>
      )}
    </div>
  );
};

export default VideoSlide;
