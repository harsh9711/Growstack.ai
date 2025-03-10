"use client";
import { ArrowRight, Circle } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useInView from "../useInView";
import "../../../../styles/grid.css";
const GridComponentSecond = () => {
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
                className="w-[900px] h-[500px] bg-cover z-[20]"
              />
            </div>
            <div className="flex z-[80] flex-row gap-2 w-full max-w-[850px] justify-center relative">
              <div
                onClick={() => handleClick(2)}
                className="bg-white/14 border shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl"
              >
                Workflow builder
              </div>
              <div
                onClick={() => handleClick(3)}
                className="bg-white/14 border shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl"
              >
                AI templates
              </div>
              <div
                onClick={() => handleClick(4)}
                className="bg-white/14 border shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl"
              >
                Data visualizer AI
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
                className="w-[900px] h-[500px]   bg-cover z-[20]"
              />
            </div>
            <div className="flex  z-[80] flex-row items-center left-0 justify-center gap-2 w-full max-w-[850px]   relative">
              <div
                onClick={() => handleClick(1)}
                className="bg-white/14 border whitespace-nowrap shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl"
              >
                AI assistants
              </div>

              <div
                onClick={() => handleClick(3)}
                className="bg-white/14 border shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl"
              >
                AI templates
              </div>
              <div
                onClick={() => handleClick(4)}
                className="bg-white/14 border shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl"
              >
                Data visualizer AI
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
                className="w-[900px] h-[500px]   bg-cover z-[20]"
              />
            </div>
            <div className="flex z-[80] flex-row gap-2 w-full max-w-[850px] justify-center relative">
              <div
                onClick={() => handleClick(1)}
                className="bg-white/14 border whitespace-nowrap shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl"
              >
                AI assistants
              </div>
              <div
                onClick={() => handleClick(2)}
                className="bg-white/14 border shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl"
              >
                Workflow builder
              </div>

              <div
                onClick={() => handleClick(4)}
                className="bg-white/14 border shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl"
              >
                Data visualizer AI
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col gap-y-8 items-center justify-center w-full mb-40">
            <div className="rounded-2xl flex justify-center items-center relative z-[40]">
              <Image
                src="/solutions/it/boxes/boxsvgs/boxsvg4.svg"
                alt="Box 1"
                width={1240}
                height={755}
                className="w-[900px] h-[500px]   bg-cover z-[20]"
              />
            </div>
            <div className="flex z-[80] flex-row gap-2 w-full max-w-[850px] justify-center relative">
              <div
                onClick={() => handleClick(1)}
                className="bg-white/14 border whitespace-nowrap shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl"
              >
                AI assistants
              </div>
              <div
                onClick={() => handleClick(2)}
                className="bg-white/14 border shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl"
              >
                Workflow builder
              </div>

              <div
                onClick={() => handleClick(3)}
                className="bg-white/14 border shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl"
              >
                AI templates
              </div>
            </div>
          </div>
        );

      default:
        return (
          <>
            <div className="2xl:grid xl:grid grid-cols-3 relative 2xl:gap-x-16 2xl:left-72 xl:left-60 justify-center items-center">
              <div
                onClick={() => handleClick(1)}
                className="rounded-[30px] flex justify-center items-center z-[60] cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src="/solutions/it/boxes/box1.svg"
                  alt="Box 1"
                  width={400}
                  height={420}
                  className="w-[480px] h-[357px] hover-boxit1001"
                />
              </div>
              <div
                onClick={() => handleClick(2)}
                className="rounded-[30px] flex justify-center items-center z-[60] cursor-pointer hover:scale-105  transition-transform duration-300"
              >
                <Image
                  src="/solutions/it/boxes/box2.svg"
                  alt="Box 2"
                  width={400}
                  height={400}
                  className="w-[480px] h-[357px] hover-boxit2001"
                />
              </div>
              <div className="rounded-[30px] relative 2xl:right-[810px] xl:right-[720px] top-44 flex justify-center items-center hover:scale-150 transition-transform duration-300">
                <Image
                  src="/solutions/it/boxes/main.svg"
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
                  src="/solutions/it/boxes/box4.svg"
                  alt="Box 3"
                  width={380}
                  height={400}
                  className="w-[480px] h-[357px] hover-boxit3001"
                />
              </div>
              <div
                onClick={() => handleClick(4)}
                className="rounded-[30px] flex relative top-2 justify-center items-center z-[60] cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src="/solutions/it/boxes/box3.svg"
                  alt="Box 4"
                  width={380}
                  height={420}
                  className="w-[480px] h-[357px] hover-boxit4001"
                />
              </div>
            </div>
          </>
        );
    }
  };
  return (
    <div
      className="flex flex-col justify-center 2xl:text-[14px] text-[8px] relative 2xl:left-8 mx-auto items-center overflow-hidden"
      onClick={handleComponentClick}
    >
      {renderContent()}
    </div>
  );
};
export default GridComponentSecond;
