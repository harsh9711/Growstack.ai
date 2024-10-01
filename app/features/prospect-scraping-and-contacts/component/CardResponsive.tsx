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


 
  return (
    <div
      className={`bg-[#F9F9F9] p-6 mb-10 sm:mb-60 max-w-[1240px] mx-auto items-center justify-center  flex relative sm:py-20 h-full rounded-[20px] `}
     
    >
      <div className="max-w-[988px] relative w-full flex  gap-10 flex-row justify-center items-center">
      <div>
          <Image src={imgsrc1} width={500} height={400} alt="map" className="sm:w-full w-40" />
        </div>
        <div className="max-w-[505px] w-full flex flex-col gap-y-2 sm:gap-y-6">
          <Image src={imgsrc2} width={50} height={50} alt="map" />
          <h2
            className={`sm:text-[28px] text-[16px] font-semibold text-shadow `}
          >
            {firsttext}
          </h2>
          <p
            className={`sm:text-[16px] text-[12px] font-medium text-[#5B5D60] text-shadow`}
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
    className={`bg-[#F9F9F9] p-6 mb-10 sm:mb-60 max-w-[1240px] mx-auto items-center justify-center  flex relative sm:py-20 h-full rounded-[20px] `}
    >
      <div className="max-w-[988px] relative w-full flex  gap-10 flex-row justify-center items-center">
      <div>
      <Image src={imgsrc1} width={500} height={400} alt="map" className="sm:w-full w-40" />
      </div>
        <div className="max-w-[505px] w-full flex flex-col gap-y-6">
          <Image src={imgsrc2} width={50} height={50} alt="map" />
          <h2
            className={`sm:text-[28px] text-[16px] font-semibold text-shadow `}
          >
            {firsttext}
          </h2>
          <p
            className={`sm:text-[16px] text-[12px] font-medium text-[#5B5D60] text-shadow `}
          >
            {secondtext}
          </p>
        </div>
      </div>
    </div>
  );
};
const CardResponsive = () => {
  return (
    <div>
      <div className="flex flex-col gap-y-10 sm:gap-y-48">
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
export default CardResponsive;
