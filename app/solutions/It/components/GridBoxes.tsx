"use client";
import { ArrowRight, Circle } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useInView from "../useInView";
import "../../../../styles/grid.css";
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
        setSelected(prev => {
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

  const renderContent = () => {
    switch (selected) {
      case 1:
        return (
          <div className="flex flex-col gap-y-8  items-center justify-center w-full mb-40">
            <div className="rounded-2xl flex justify-center items-center relative z-[20] opacity-100">
              <Image
                src="/solutions/it/boxes/boxsvgs/boxsvg1.svg"
                alt="Box 1"
                width={940}
                height={555}
                className="w-[1100px] bg-cover z-[20]"
              />
            </div>
            <div className="flex z-[80] flex-row justify-between w-full max-w-[2000px] relative">
              <div
                onClick={() => handleClick(2)}
                className="bg-white border font-medium text-[18px]  shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl"
              >
                GENX AI{" "}
              </div>
              <div
                onClick={() => handleClick(3)}
                className="bg-white border font-medium text-[20px]  shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl"
              >
                ARTICLE WIZARD
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-y-8 items-center justify-center w-full mb-40">
            <div className="rounded-2xl flex justify-center items-center relative z-[40] opacity-100">
              <Image
                src="/solutions/it/boxes/boxsvgs/boxsvg2.svg"
                alt="Box 1"
                width={1240}
                height={755}
                className="w-[1100px]  bg-cover z-[20]"
              />
            </div>
            <div className="flex z-[80] flex-row justify-between w-full max-w-[2000px] relative">
              <div
                onClick={() => handleClick(1)}
                className="bg-white border  font-medium text-[20px]  whitespace-nowrap shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl"
              >
                AI assistants
              </div>
              <div
                onClick={() => handleClick(3)}
                className="bg-white border  font-medium text-[20px]  shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl"
              >
                ARTICLE WIZARD
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-y-8 items-center justify-center w-full mb-40">
            <div className="rounded-2xl flex justify-center relative  z-[40] items-center">
              <Image
                src="/solutions/it/boxes/boxsvgs/boxsvg3.svg"
                alt="Box 1"
                width={1240}
                height={755}
                className="w-[1100px]  bg-cover z-[20]"
              />
            </div>
            <div className="flex z-[80] flex-row justify-between w-full max-w-[2000px] relative">
              <div
                onClick={() => handleClick(1)}
                className="bg-white border  font-medium text-[20px]  whitespace-nowrap shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl"
              >
                AI assistants
              </div>
              <div
                onClick={() => handleClick(2)}
                className="bg-white border font-medium text-[18px]  shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl"
              >
                GENX AI{" "}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <>
            <div className="flex flex-wrap gap-10 relative   justify-center items-center">
              <div
                onClick={() => handleClick(1)}
                className="rounded-[30px] flex justify-center items-center z-[60] cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src="/solutions/it/boxes/changedsmall/box1.svg"
                  alt="Box 1"
                  width={400}
                  height={420}
                  className="w-full h-full hover-boxit1"
                />
              </div>
              <div
                onClick={() => handleClick(2)}
                className="rounded-[30px] flex justify-center items-center z-[60] cursor-pointer hover:scale-105  transition-transform duration-300"
              >
                <Image
                  src="/solutions/it/boxes/changedsmall/box2.svg"
                  alt="Box 2"
                  width={400}
                  height={400}
                  className="w-full h-full hover-boxit2"
                />
              </div>

              <div
                onClick={() => handleClick(3)}
                className="rounded-[30px] relative top-2 flex justify-center items-center z-[60] cursor-pointer hover:scale-105  transition-transform duration-300"
              >
                <Image
                  src="/solutions/it/boxes/changedsmall/box3.svg"
                  alt="Box 3"
                  width={380}
                  height={400}
                  className="w-full h-full hover-boxit3"
                />
              </div>
            </div>
          </>
        );
    }
  };
  return (
    <div
      className="flex flex-col justify-center 2xl:text-[14px] text-[8px] 2xl:p-0 p-4 relative 2xl:left-8 mx-auto items-center"
      onClick={handleComponentClick}
    >
      {renderContent()}
    </div>
  );
};
export default GridComponent;
