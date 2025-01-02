import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Pause } from "lucide-react";

interface VideoSwiperProps {
  teamvideos: Array<{ videoUrl: string; poster: string }>;
  playingVideoIndex: number | null;
  onPlay: (index: number) => void;
  onStop: () => void;
  swiperRef: React.MutableRefObject<any>;
}

const VideoSwiper: React.FC<VideoSwiperProps> = ({
  teamvideos,
  playingVideoIndex,
  onPlay,
  onStop,
  swiperRef,
}) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [visibleIndices, setVisibleIndices] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean[]>(
    new Array(teamvideos.length).fill(false)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisibleIndices(prev => [...prev, index]);
          } else {
            setVisibleIndices(prev => prev.filter(i => i !== index));
            // Pause video and update playing state when out of view
            if (videoRefs.current[index]) {
              videoRefs.current[index]?.pause();
              setIsPlaying(prev => {
                const next = [...prev];
                next[index] = false;
                return next;
              });
              if (playingVideoIndex === index) {
                onStop();
              }
            }
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    videoRefs.current.forEach((video, index) => {
      if (video) {
        video.setAttribute("data-index", index.toString());
        observer.observe(video);

        // Add event listeners to track actual playing state
        video.addEventListener("play", () => {
          setIsPlaying(prev => {
            const next = [...prev];
            next[index] = true;
            return next;
          });
        });

        video.addEventListener("pause", () => {
          setIsPlaying(prev => {
            const next = [...prev];
            next[index] = false;
            return next;
          });
        });
      }
    });

    return () => {
      observer.disconnect();
      videoRefs.current.forEach(video => {
        if (video) {
          video.removeEventListener("play", () => {});
          video.removeEventListener("pause", () => {});
        }
      });
    };
  }, [playingVideoIndex, onStop]);

  const handleVideoPlay = (index: number) => {
    if (!visibleIndices.includes(index)) return;

    onPlay(index);
    videoRefs.current.forEach((video, idx) => {
      if (video) {
        if (idx === index) {
          video
            .play()
            .catch(error => console.error("Video play error:", error));
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  };

  const handleStopVideo = () => {
    onStop();
    videoRefs.current.forEach(video => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
  };

  return (
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
              playingVideoIndex === index && isPlaying[index]
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
              className="w-full h-full sm:h-[500px] object-cover rounded-2xl lazy"
              preload="none"
              poster={item.poster}
              onClick={() => handleVideoPlay(index)}
            >
              <source src={item.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={() => handleVideoPlay(index)}
            >
              {(!isPlaying[index] || !visibleIndices.includes(index)) && (
                <div className="w-10 h-10 bg-[#2DA771] rounded-full ring-4 ring-white grid place-items-center hover:bg-[#2DA771]/90 transition-all duration-300">
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

            {isPlaying[index] && visibleIndices.includes(index) && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                onClick={handleStopVideo}
              >
                <Pause
                  size={20}
                  color="white"
                  className="w-10 h-10 bg-[#2DA771] rounded-full ring-4 ring-white grid place-items-center hover:bg-[#2DA771]/90 transition-all duration-300"
                />
              </div>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default VideoSwiper;
