"use client";
import { ArrowBigLeft } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import "aos/dist/aos.css";
import AOS from "aos";

const LoadingBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number[]>([0, 0, 0, 0]);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  const images: string[] = [
    "/solution3rdpage/loading/loading1.svg",
    "/solution3rdpage/loading/loading2.svg",
    "/solution3rdpage/loading/loading3.svg",
    "/solution3rdpage/loading/loading4.svg",
    "/solution3rdpage/loading/loading5.svg",
    "/solution3rdpage/loading/loading6.svg",
  ];
  const contents = [
    <div key="1" className="flex flex-row font-light items-center gap-x-10">
      <Image
        src="/solution3rdpage/loadingicon/icon1.svg"
        alt="Icon 1"
        width={50}
        height={50}
      />
      <p
        className={`text ${
          clickedIndex === 0 ? "font-semibold text-[#034737]" : ""
        }`}
      >
        Market smartly
      </p>
    </div>,
    <div key="2" className="flex flex-row font-light items-center gap-x-10">
      <Image
        src="/solution3rdpage/loadingicon/icon2.svg"
        alt="Icon 1"
        width={50}
        height={50}
      />
      <p
        className={`text ${
          clickedIndex === 1 ? "font-semibold text-[#034737]" : ""
        }`}
      >
        Email effectively
      </p>
    </div>,
    <div key="3" className="flex flex-row font-light items-center gap-x-10">
      <Image
        src="/solution3rdpage/loadingicon/icon3.svg"
        alt="Icon 1"
        width={50}
        height={50}
      />
      <p
        className={`text ${
          clickedIndex === 2 ? "font-semibold text-[#034737]" : ""
        }`}
      >
        Design affordably
      </p>
    </div>,
    <div key="4" className="flex flex-row font-light items-center gap-x-10">
      <Image
        src="/solution3rdpage/loadingicon/icon4.svg"
        alt="Icon 1"
        width={50}
        height={50}
      />
      <p
        className={`text ${
          clickedIndex === 3 ? "font-semibold text-[#034737]" : ""
        }`}
      >
        Create quickly
      </p>
    </div>,
  ];

  const progressColors = ["#FFEDE6", "#9AEEE7", "#D9CFEE", "#FEE4F1"];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS

    let interval: NodeJS.Timeout;
    if (loading && selectedIndex === null) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = [...prevProgress];
          if (newProgress[currentIndex] < 100) {
            newProgress[currentIndex] += 10;
          } else {
            clearInterval(interval);
            setIsComplete(true);
            setLoading(false);
          }
          return newProgress;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [loading, currentIndex, selectedIndex]);

  useEffect(() => {
    if (isComplete && selectedIndex === null) {
      const nextIndex = currentIndex + 1;
      if (nextIndex < contents.length) {
        setCurrentIndex(nextIndex);
        setProgress((prevProgress) => {
          const newProgress = [...prevProgress];
          newProgress[currentIndex] = 100;
          return newProgress;
        });
        setIsComplete(false);
        setLoading(true);
      }
    }
  }, [isComplete, currentIndex, contents.length, selectedIndex]);

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    setSelectedIndex(index);
    setLoading(false);
    setProgress((prevProgress) => {
      const newProgress = Array(contents.length).fill(0);
      newProgress[index] = 100;
      return newProgress;
    });
  };

  const handleClick = (index: number) => {
    setClickedIndex(index);
    handleThumbnailClick(index);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoading(true);
        } else {
          setLoading(false);
        }
      },
      { threshold: 0.1 }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col gap-y-16">
      <div className="text-center">
        <div
          className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit"
          data-aos="fade-up"
        >
          IMPACT{" "}
        </div>
        <h1
          className="text-center flex flex-row gap-4 text-[42px] mt-2 leading-normal"
          data-aos="fade-down"
        >
          <span className="relative text-black font-semibold">
            Maximize your marketing
          </span>
          <span className="text-black font-extralight">
            {" "}
            impact on a small budget{" "}
          </span>
        </h1>
      </div>
      <div className="gallery-container" ref={galleryRef}>
        <div className="selected-content">
          {contents.map((content, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`content-item ${
                clickedIndex === index ? "clicked" : ""
              }`}
              data-aos="zoom-in"
            >
              {content}
              <div className="progress-container">
                <div className="progress-bar-background"></div>
                {progress[index] > 0 && (
                  <div
                    className="progress-bar"
                    style={{
                      width: `${progress[index]}%`,
                      backgroundColor: progressColors[index],
                    }}
                  ></div>
                )}
                {(progress[index] > 0 && progress[index] < 100) ||
                clickedIndex === index ? (
                  <div className="justify-end flex -translate-y-16 text-[#034737] -translate-x-6">
                    <FaArrowRightLong className="text-[#034737] text-2xl" />
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <div className="image-thumbnails">
          {images.map((image, index) => (
            <div
              key={index}
              className={`thumbnail ${index === currentIndex ? "active" : ""}`}
              style={{
                display: index === currentIndex ? "block" : "none",
                width: "500px",
                height: "500px",
                overflow: "hidden",
              }}
              data-aos="fade-right"
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="thumbnail-img"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingBar;
