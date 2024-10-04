import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import "../../../../styles/magicanimation.css";
import { first } from "lodash";
interface RectangleCardProps {
  firsttext: string;
  secondtext: string;
  imgsrc1: string;
  imgsrc2: string;
}
const RectangleCard: React.FC<RectangleCardProps> = ({
  firsttext,
  secondtext,
  imgsrc1,
  imgsrc2,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  return (
    <div
      className={`bg-[#F9F9F9] shadow-xl mb-60 max-w-[1240px] 2xl:translate-x-0 xl:translate-x-60 w-full mx-auto relative py-20 h-full rounded-[20px] container-bg ${
        isVisible ? "container-bg-animate" : ""
      }`}

      ref={sectionRef}
    >
      <div className="2xl:max-w-[988px] xl:max-w-[605px] relative w-full flex flex-row justify-end items-center">
        <div
          className={`absolute ${isVisible ? "slide-left image-shadow" : ""}`}
        >
          <Image src={imgsrc1} width={500} height={400} alt="map" />
        </div>
        <div className="max-w-[505px] w-full flex flex-col gap-y-6 pr-20">
          <Image src={imgsrc2} width={50} height={50} alt="map" />
          <h2
            className={`sm:text-[28px] text-[16px] font-semibold  ${
              isVisible ? "text-fade appear-with-delay" : "text-fade"
            }`}

          >
            {firsttext}
          </h2>
          <p
            className={`sm:text-[16px] text-[12px] font-medium text-[#5B5D60]  ${
              isVisible ? "text-fade appear-with-delay" : "text-fade"
            }`}

          >
            {secondtext}
          </p>
        </div>
      </div>
    </div>
  );
};
const RectangleCardRight: React.FC<RectangleCardProps> = ({
  firsttext,
  secondtext,
  imgsrc1,
  imgsrc2,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  return (
    <div
      className={`bg-[#F9F9F9] mb-60 max-w-[1240px] 2xl:-translate-x-20 xl:-translate-x-60 mx-auto relative py-20 h-full rounded-[20px] container-bg ${isVisible ? "container-bg-animate" : ""
        }`}
      ref={sectionRef}
    >
      <div className="2xl:max-w-[1088px] xl:max-w-[1005px] relative w-full px-20 flex flex-row justify-start items-center">
        <div
          className={`absolute ${isVisible ? "slide-right image-shadow" : ""}`}
        >
          <Image src={imgsrc1} width={500} height={400} alt="map" />
        </div>
        <div className="max-w-[505px]  w-full flex flex-col gap-y-6">
          <Image src={imgsrc2} width={50} height={50} alt="map" />
          <h2
            className={`sm:text-[28px] text-[16px] font-semibold  ${
              isVisible ? "text-fade appear-with-delay" : "text-fade"
            }`}

          >
            {firsttext}
          </h2>
          <p
            className={`sm:text-[16px] text-[12px] font-medium text-[#5B5D60]  ${
              isVisible ? "text-fade appear-with-delay" : "text-fade"
            }`}

          >
            {secondtext}
          </p>
        </div>
      </div>
    </div>
  );
};
const Card = () => {
  return (
    <div>
      <div className="flex flex-col gap-y-48">
        <div className="text-black sm:items-start items-start justify-start flex flex-col gap-y-4">
          <div className="bg-[#03473714] text-[#034737] hover:shadow-md whitespace-nowrap justify-center py-2 2xl:px-4 flex items-center text-center text-[12px] rounded-full tracking-widest font-semibold uppercase w-full max-w-[130px] 2xl:max-w-[151px]">
            Benefits
          </div>
          {/* Headline Text */}
          <h1 className="text-left sm:text-left items-start justify-start flex flex-wrap gap-2 text-[26px] 2xl:text-[42px] leading-normal">
            <span className="relative font-semibold">Key capabilities for</span>
            <span className="font-extralight">
              comprehensive data gathering
            </span>
          </h1>
        </div>
        <div className="">
          <RectangleCard
            firsttext={" Comprehensive data retrieval"}
            secondtext={
              "Effortlessly pull detailed business information directly from Google Maps, ensuring you get accurate and up-to-date data for effective prospecting."
            }
            imgsrc1={"/features/map4.svg"}
            imgsrc2={"/features/map3.svg"}
          />

          <RectangleCardRight
            firsttext={"Detailed listings & tabular format"}
            secondtext={
              "Access essential business details in a clear, organized table. This format makes it easy to scan, compare, and analyze information at a glance, streamlining your data review and decision-making process. "
            }
            imgsrc1={"/features/map5.svg"}
            imgsrc2={"/features/map6.svg"}
          />
          <RectangleCard
            firsttext={"Data export and management"}
            secondtext={
              "Save your lists to the Prospects tab under Contact repository for easy access and streamlined management, keeping all your lead information in one place."
            }
            imgsrc1={"/features/map7.svg"}
            imgsrc2={"/features/map8.svg"}
          />
        </div>
      </div>
    </div>
  );
};
export default Card;
