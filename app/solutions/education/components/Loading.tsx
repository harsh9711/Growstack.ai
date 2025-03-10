"use client";
import { ArrowBigLeft } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../../../styles/loader.css";

const LoadingBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number[]>([0, 0, 0, 0]);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  const images: string[] = [
    "/solutions/chain/boxes/loader/loading1.svg",
    "/solutions/chain/boxes/loader/loading2.svg",
    "/solutions/chain/boxes/loader/loading3.svg",
  ];
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const contents = [
    <div
      key="1"
      className={`flex flex-row items-center gap-x-10 ${clickedIndex === 0 ? "text-[#FFEDE6] font-semibold" : ""}`}
    >
      <Image
        src="/iconsdivloaderchain/icon1.svg"
        alt="Icon 1"
        width={50}
        height={50}
      />
      <p className="text-black ">Accurate forecasts</p>
    </div>,
    <div
      key="2"
      className={`flex flex-row items-center gap-x-10 ${clickedIndex === 1 ? "text-[#9AEEE7] font-semibold" : ""}`}
    >
      <Image
        src="/iconsdivloaderchain/icon2.svg"
        alt="Icon 2"
        width={50}
        height={50}
      />
      <p className="text-black ">Efficiency</p>
    </div>,
    <div
      key="3"
      className={`flex flex-row items-center gap-x-10 ${clickedIndex === 2 ? "text-[#D9CFEE] font-semibold" : ""}`}
    >
      <Image
        src="/iconsdivloaderchain/icon3.svg"
        alt="Icon 3"
        width={50}
        height={50}
      />
      <p className="text-black ">Actionable insights</p>
    </div>,
  ];

  const progressColors = ["#FFEDE6", "#9AEEE7", "#D9CFEE"];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading && selectedIndex === null) {
      interval = setInterval(() => {
        setProgress(prevProgress => {
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
        setProgress(prevProgress => {
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
    setProgress(prevProgress => {
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
    <div className="flex flex-col gap-y-4 2xl:gap-y-10">
      <div className=" 2xl:items-start xl:p-0 px-6 items-center justify-center flex flex-col gap-y-4 ">
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="bg-[#03473714] py-2 px-3.5  flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit"
        >
          Data
        </div>
        <div>
          {" "}
          <h1
            data-aos="fade-up"
            data-aos-duration="1100"
            className="text-left items-start justify-start gap-2 text-[20px] 2xl:text-[42px] leading-normal"
          >
            <span className="relative text-black font-semibold">
              Manage data efficiently and
            </span>
            <br className="2xl:flex xl:flex hidden" />
            <span className="xl:ml-0 ml-2 text-black font-extralight">
              monitor performance effectively{" "}
            </span>
          </h1>
        </div>
      </div>
      <div className="gallery-wrapper" ref={galleryRef}>
        <div className="content-display">
          {contents.map((content, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`display-item ${clickedIndex === index ? "active" : ""}`}
            >
              {content}
              <div className="progress-wrapper2">
                <div className="progress-bg"></div>
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
                  <div className="arrow-icon-wrapper">
                    <FaArrowRightLong className="arrow-icon2" />
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <div className="thumbnail-gallery">
          {images.map((image, index) => (
            <div
              key={index}
              className={`thumbnail-item ${index === currentIndex ? "current" : ""}`}
              style={{
                display: index === currentIndex ? "block" : "none",
              }}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="thumbnail-image"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingBar;
