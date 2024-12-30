import React, { useEffect, useRef, useState } from "react";
import { Pause } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const Box: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Initialize AOS for animations
    AOS.init({
      duration: 500,
      easing: "ease-in-out",
      offset: 1,
    });
    AOS.refresh();

    // Handle visibility for auto-pause when scrolling out
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (
        !entry.isIntersecting &&
        videoRef.current &&
        !videoRef.current.paused
      ) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(prev => !prev);
    }
  };

  return (
    <div className="sm:px-20">
      <div
        data-aos="fade-up"
        className="relative bg-white text-black group hover:bg-[#F4F4F4] rounded-[20px] shadow-lg hover:shadow-2xl max-w-fit w-full h-full flex flex-col gap-y-4 justify-center transition-transform duration-500 ease-in-out"
      >
        <div
          className="relative w-full h-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <video
            ref={videoRef}
            className="w-full h-full max-w-fit rounded-sm sm:rounded-2xl object-cover"
            src="https://video.gumlet.io/6736ff3173f4706c690ece0c/6736ffd073f4706c690ed072/download.mp4"
            poster="/staticvideo.svg"
            controls={false}
          />
          

          <button
            className="absolute inset-0 flex items-center justify-center"
            onClick={handlePlayPause}
          >
            {isPlaying ? (
              isHovered && (
                <Pause
                  size={20}
                  color="white"
                  className="w-16 h-16 bg-[#2DA771] rounded-full ring-4 ring-white grid place-items-center hover:bg-[#2DA771]/90 transition-all duration-300"
                />
              )
            ) : (
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
          </button>
        </div>
        <div
          className="relative w-full h-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <video
            ref={videoRef}
            className="w-full h-full max-w-fit rounded-sm sm:rounded-2xl object-cover"
            src="https://video.gumlet.io/673d77b6f3970d5c7faa5a64/673d9044a1954734a552e434/download.mp4"
            poster="/staticvideo.svg"
            controls={false}
          />
          

          <button
            className="absolute inset-0 flex items-center justify-center"
            onClick={handlePlayPause}
          >
            {isPlaying ? (
              isHovered && (
                <Pause
                  size={20}
                  color="white"
                  className="w-16 h-16 bg-[#2DA771] rounded-full ring-4 ring-white grid place-items-center hover:bg-[#2DA771]/90 transition-all duration-300"
                />
              )
            ) : (
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
          </button>
        </div>
      </div>
    </div>
  );
};

export default Box;
