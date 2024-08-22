"use client";
import { ArrowBigLeft } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import "aos/dist/aos.css";
import AOS from "aos";
import "../../../../styles/loader.css";

const LoadingBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number[]>([0, 0, 0, 0]);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement | null>(null);

  const images: string[] = [
    "/solution3rdpage/loading/loading1.svg",
    "/solution3rdpage/loading/loading2.svg",
    "/solution3rdpage/loading/loading3.svg",
    "/solution3rdpage/loading/loading4.svg",
    "/solution3rdpage/loading/loading5.svg",
    "/solution3rdpage/loading/loading6.svg",
  ];
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);

  const contents = [
    <div
      key="1"
      className={`flex flex-row items-center gap-x-10 ${
        clickedIndex === 0 ? "text-[#FFEDE6] font-semibold" : ""
      }`}
    >
      <Image
        src="/solution3rdpage/loadingicon/icon1.svg"
        alt="Icon 1"
        width={50}
        height={50}
      />
      <p className="text-black ">Market smartly</p>
    </div>,
    <div
      key="2"
      className={`flex flex-row items-center gap-x-10 ${
        clickedIndex === 1 ? "text-[#9AEEE7] font-semibold" : ""
      }`}
    >
      <Image
        src="/solution3rdpage/loadingicon/icon2.svg"
        alt="Icon 2"
        width={50}
        height={50}
      />
      <p className="text-black ">Email effectively</p>
    </div>,
    <div
      key="3"
      className={`flex flex-row items-center gap-x-10 ${
        clickedIndex === 2 ? "text-[#D9CFEE] font-semibold" : ""
      }`}
    >
      <Image
        src="/solution3rdpage/loadingicon/icon3.svg"
        alt="Icon 3"
        width={50}
        height={50}
      />
      <p className="text-black ">Design affordably</p>
    </div>,
    <div
      key="4"
      className={`flex flex-row items-center gap-x-10 ${
        clickedIndex === 3 ? "text-[#F0FFC3] font-semibold" : ""
      }`}
    >
      <Image
        src="/solution3rdpage/loadingicon/icon4.svg"
        alt="Icon 4"
        width={50}
        height={50}
      />
      <p className="text-black ">Create quickly</p>
    </div>,
  ];

  const progressColors = ["#FFEDE6", "#9AEEE7", "#D9CFEE", "#FEE4F1"];

  useEffect(() => {
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
    <div className="flex flex-col gap-y-10">
      <div className=" 2xl:items-start items-center justify-center flex flex-col gap-y-4 ">
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="bg-[#03473714] hover:shadow-md   whitespace-nowrap  text-black  justify-center py-2 2xl:px-4 flex items-center text-center text-[12px] rounded-full tracking-widest font-semibold uppercase w-full max-w-[130px] 2xl:max-w-[151px]"
        >
          Distinction
        </div>
        <h1
          data-aos="fade-up"
          data-aos-duration="1100"
          className="text-center items-center justify-center flex flex-wrap gap-2 text-[26px] 2xl:text-[42px] leading-normal"
        >
          <span className="relative text-black font-semibold">
            Streamline sales
          </span>
          <span className="text-black font-extralight">
            processes for success{" "}
          </span>
        </h1>
      </div>
      <div className="gallery-wrapper" ref={galleryRef}>
        <div className="content-display">
          {contents.map((content, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`display-item ${
                clickedIndex === index ? "active" : ""
              }`}
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
              className={`thumbnail-item ${
                index === currentIndex ? "current" : ""
              }`}
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
