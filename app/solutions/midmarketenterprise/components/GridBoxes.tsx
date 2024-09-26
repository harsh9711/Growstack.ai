"use client";
import { ArrowRight, Circle } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useInView from "../useInView";
import "./grid.css";
const GridComponent = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const isInView = useInView({ threshold: 0.5 });
  useEffect(() => {
    if (isInView) {
      if (!isTimerActive) {
        setIsTimerActive(true);
      }
      if (selected === null) {
        handleClick(1);
      }
    } else {
      if (isTimerActive) {
        setIsTimerActive(false);
        if (timer) {
          clearTimeout(timer);
        }
      }
    }
  }, [isInView]);

  useEffect(() => {
    if (isTimerActive) {
      if (timer) {
        clearTimeout(timer);
      }

      const newTimer = setTimeout(() => {
        setSelected((prev) => {
          const nextValue = prev === 4 ? 1 : (prev ?? 0) + 1;
          if (nextValue === 1 && prev === 4) {
            setIsTimerActive(false);
            return null;
          }
          return nextValue;
        });
      }, 4000);

      setTimer(newTimer);

      return () => {
        if (newTimer) {
          clearTimeout(newTimer);
        }
      };
    }
  }, [selected, isTimerActive]);

  const handleClick = (index: number) => {
    setSelected(index);
    setIsTimerActive(true);
    if (timer) {
      clearTimeout(timer);
    }
  };
  const handleComponentClick = () => {
    if (isTimerActive) {
      setIsTimerActive(false);
      if (timer) {
        clearTimeout(timer);
      }
    }
  };
  const renderArrows = (caseNumber: number) => {
    switch (caseNumber) {
      case 1:
        return (
          <>
            <Image
              src="/solutions/arrow1.svg"
              width={200}
              height={200}
              alt="arrow"
              className="absolute left-[50px] z-[10] -top-24"
            />
            <Image
              src="/solutions/arrow2.svg"
              width={200}
              height={200}
              alt="arrow"
              className="absolute right-[10px] z-[10] -top-24 -rotate-270"
            />
          </>
        );
      case 2:
        return (
          <>
            <Image
              src="/solutions/arrow1.svg"
              width={200}
              height={200}
              alt="arrow"
              className="absolute left-[50px] z-[10] -top-24"
            />
            <Image
              src="/solutions/arrow2.svg"
              width={200}
              height={200}
              alt="arrow"
              className="absolute right-[10px] z-[10] -top-24 -rotate-270"
            />
          </>
        );
      case 3:
        return (
          <>
            <Image
              src="/solutions/arrow1.svg"
              width={200}
              height={200}
              alt="arrow"
              className="absolute left-[50px] z-[10] -top-24"
            />
            <Image
              src="/solutions/arrow2.svg"
              width={200}
              height={200}
              alt="arrow"
              className="absolute right-[10px] z-[10] -top-24 -rotate-270"
            />
          </>
        );
      case 4:
        return (
          <>
            <Image
              src="/solutions/arrow1.svg"
              width={200}
              height={200}
              alt="arrow"
              className="absolute left-[50px] z-[10] -top-24"
            />
            <Image
              src="/solutions/arrow2.svg"
              width={200}
              height={200}
              alt="arrow"
              className="absolute right-[10px] z-[10] -top-24 -rotate-270"
            />
          </>
        );
      default:
        return null;
    }
  };
  const renderContent = () => {
    switch (selected) {
      case 1:
        return (
          <div className="flex flex-col gap-y-8 items-center justify-center w-full mb-40">
            {renderArrows(1)}
            <div className="rounded-2xl flex justify-center items-center relative z-[20] opacity-100">
              <Image
                src="/solutions/boxsvgs/boxsvg1.svg"
                alt="Box 1"
                width={940}
                height={555}
                className="w-[1100px] bg-cover z-[20]"
              />
            </div>
            <div className="flex z-[80] flex-row gap-2 w-full max-w-[1240px] justify-center relative">
              <div
                onClick={() => handleClick(2)}
                className="bg-white/14 border shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl"
              >
                Fast creations
              </div>
              <div
                onClick={() => handleClick(3)}
                className="bg-white/14 border shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl"
              >
                Auto search
              </div>
              <div
                onClick={() => handleClick(4)}
                className="bg-white/14 border shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl"
              >
                Tailored solutions
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-y-8 items-center justify-center w-full mb-40">
            {renderArrows(2)}{" "}
            <div className="rounded-2xl flex justify-center items-center relative z-[40] opacity-100">
              <Image
                src="/solutions/boxsvgs/boxsvg2.svg"
                alt="Box 1"
                width={1240}
                height={755}
                className="w-[1100px]  bg-cover z-[20]"
              />
            </div>
            <div className="flex  z-[80] flex-row items-center left-0 justify-center gap-2 w-full max-w-[1240px]   relative">
              <div
                onClick={() => handleClick(1)}
                className="bg-white/14 border whitespace-nowrap shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl"
              >
                Smart search
              </div>
              <div
                onClick={() => handleClick(3)}
                className="bg-white/14 whitespace-nowrap border shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl"
              >
                Auto search
              </div>
              <div
                onClick={() => handleClick(4)}
                className="bg-white/14 border whitespace-nowrap shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl"
              >
                Tailored solutions
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-y-8 items-center justify-center w-full mb-40">
            {renderArrows(3)}{" "}
            <div className="rounded-2xl flex justify-center relative  z-[40] items-center">
              <Image
                src="/solutions/boxsvgs/boxsvg3.svg"
                alt="Box 1"
                width={1240}
                height={755}
                className="w-[1100px]  bg-cover z-[20]"
              />
            </div>
            <div className="flex z-[80] flex-row gap-2 w-full max-w-[1240px] justify-center relative">
              <div
                onClick={() => handleClick(1)}
                className="bg-white/14 border whitespace-nowrap shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl"
              >
                Smart search
              </div>
              <div
                onClick={() => handleClick(2)}
                className="bg-white/14 whitespace-nowrap border shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl"
              >
                Fast creation
              </div>
              <div
                onClick={() => handleClick(4)}
                className="bg-white/14 border whitespace-nowrap shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl"
              >
                Tailored solutions
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col gap-y-8 items-center justify-center w-full mb-40">
            {renderArrows(4)}{" "}
            <div className="rounded-2xl flex justify-center items-center relative z-[40]">
              <Image
                src="/solutions/boxsvgs/boxsvg4.svg"
                alt="Box 1"
                width={1240}
                height={755}
                className="w-[1100px]  bg-cover z-[20]"
              />
            </div>
            <div className="flex z-[80] flex-row gap-2 w-full max-w-[1240px] justify-center relative">
              <div
                onClick={() => handleClick(1)}
                className="bg-white/14 border whitespace-nowrap shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl"
              >
                Smart search
              </div>
              <div
                onClick={() => handleClick(2)}
                className="bg-white/14 whitespace-nowrap border shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl"
              >
                Fast creation
              </div>
              <div
                onClick={() => handleClick(3)}
                className="bg-white/14 whitespace-nowrap border shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl"
              >
                Auto search
              </div>
            </div>
          </div>
        );

      default:
        return (
          <>
            {" "}
            <Image
              src="/solutions/arrow1.svg"
              width={200}
              height={200}
              alt="arrow"
              className="absolute left-[260px]  xl:flex hidden  z-[10] -top-12"
            />
            <Image
              src="/solutions/arrow2.svg"
              width={200}
              height={200}
              alt="arrow"
              className="absolute right-[230px] xl:flex hidden  z-[10] -top-12 -rotate-270 rotate-2"
            />
            <div className="xl:grid 2xl:grid grid-cols-3 relative 2xl:gap-x-16 xl:left-60 2xl:left-72 justify-center items-center">
              <div
                onClick={() => handleClick(1)}
                className="rounded-[30px] flex justify-center items-center z-[60] cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src="/solutions/boxes/box1.svg"
                  alt="Box 1"
                  width={400}
                  height={420}
                  className="w-[480px] h-[357px] hover-box1"
                />
              </div>
              <div
                onClick={() => handleClick(2)}
                className="rounded-[30px] flex justify-center items-center z-[60] cursor-pointer hover:scale-105  transition-transform duration-300"
              >
                <Image
                  src="/solutions/boxes/box2.svg"
                  alt="Box 2"
                  width={400}
                  height={400}
                  className="w-[480px] h-[357px] hover-box2"
                />
              </div>
              <div className="rounded-[30px] opacity-0 relative right-[810px] top-44 flex justify-center items-center hover:scale-150 transition-transform duration-300">
                <Image
                  src="/solutions/boxes/main.svg"
                  alt="Main"
                  width={50}
                  height={50}
                />
              </div>
              <div
                onClick={() => handleClick(3)}
                className="rounded-[30px] relative top-2 flex justify-center items-center z-[60] cursor-pointer hover:scale-105  transition-transform duration-300"
              >
                <Image
                  src="/solutions/boxes/box3.svg"
                  alt="Box 3"
                  width={380}
                  height={400}
                  className="w-[480px] h-[357px] hover-box3"
                />
              </div>
              <div
                onClick={() => handleClick(4)}
                className="rounded-[30px] flex relative top-2 justify-center items-center z-[60] cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src="/solutions/boxes/box4.svg"
                  alt="Box 4"
                  width={380}
                  height={420}
                  className="w-[480px] h-[357px] hover-box4"
                />
              </div>
            </div>
          </>
        );
    }
  };
  return (
    <div
      className="flex flex-col justify-center relative left-8 mx-auto items-center"
      
      onClick={handleComponentClick}
    >
      {renderContent()}
    </div>
  );
};
export default GridComponent;
