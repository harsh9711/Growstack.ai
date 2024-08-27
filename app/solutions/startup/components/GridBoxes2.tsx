

  "use client";
import { ArrowRight, Circle } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useInView from "../useInView";
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
 

    const renderContent = () => {
      switch (selected) {
        case 1:
          return (
            <div className="flex flex-col gap-y-4  items-center justify-center w-full ">
              
            <div className="rounded-2xl flex justify-center items-center relative z-[20] opacity-100">
              <Image src="/salesrevops2/boxsvgs/boxsvg1.svg" alt="Box 1" width={940} height={555} className="w-[1000px] bg-cover z-[20]" />
            </div>
            <div className="flex z-[80] flex-row gap-2 w-full max-w-[950px] justify-center relative">
              <div onClick={() => handleClick(2)} className="bg-white border shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl">
              Campaign tracking
              </div>
              <div onClick={() => handleClick(3)} className="bg-white border shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl">
             Comprehensive
              reports
              </div>
              <div onClick={() => handleClick(4)} className="bg-white border shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl">
              Performance insights
              </div>
            </div>
          </div>
          );
        case 2:
          return (
            <div className="flex flex-col gap-y-4 items-center justify-center w-full">
          <div className="rounded-2xl flex justify-center items-center relative z-[40] opacity-100">
              <Image src="/salesrevops2/boxsvgs/boxsvg2.svg" alt="Box 1" width={1240} height={755} className="w-[1000px]  bg-cover z-[20]" />
              </div>
              <div className="flex  z-[80] flex-row items-center left-0 justify-center gap-2 w-full  max-w-[950px]   relative">
                <div onClick={() => handleClick(1)} className="bg-white border whitespace-nowrap shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl">
             Engagement metrics
                </div>
                <div onClick={() => handleClick(3)} className="bg-white border shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl">
             Comprehensive
              reports
              </div>
              <div onClick={() => handleClick(4)} className="bg-white border shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl">
              Performance insights 
              </div>
              </div>
            </div>
          );
        case 3:
          return (
            <div className="flex flex-col gap-y-4 items-center justify-center w-full">
          <div className="rounded-2xl flex justify-center relative  z-[40] items-center">
              <Image src="/salesrevops2/boxsvgs/boxsvg3.svg" alt="Box 1" width={1240} height={755} className="w-[1000px]  bg-cover z-[20]" />
              </div>
              <div className="flex z-[80] flex-row gap-2 w-full max-w-[950px] justify-center relative">
             <div onClick={() => handleClick(1)} className="bg-white border whitespace-nowrap shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl">
             Engagement metrics

                </div>
                <div onClick={() => handleClick(2)} className="bg-white border shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl">
              Campaign tracking
              </div>
                <div onClick={() => handleClick(4)} className="bg-white border shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl">
                Performance insights 
              </div>
              </div>
            </div>
          );
        case 4:
          return (
            <div className="flex flex-col gap-y-4 items-center justify-center w-full ">
            <div className="rounded-2xl flex justify-center items-center relative z-[40]">
              <Image src="/salesrevops2/boxsvgs/boxsvg4.svg" alt="Box 1" width={1240} height={755} className="w-[1000px]  bg-cover z-[20]" />
            </div>
            <div className="flex z-[80] flex-row gap-2 w-full  max-w-[950px] justify-center relative">
           <div onClick={() => handleClick(1)} className="bg-white border whitespace-nowrap shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl">
           Engagement metrics
                </div>
                <div onClick={() => handleClick(2)} className="bg-white border shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl">
              Campaign tracking
              </div>
              <div onClick={() => handleClick(3)} className="bg-white border shadow-md hover:shadow-lg max-w-[400px] w-full max-h-[82px] h-full text-center p-4 rounded-2xl">
             Comprehensive
              reports
              </div>
            </div>
          </div>
          
          );
      
          default:
          return (
    <>      

          <div className="xl:grid 2xl:grid grid-cols-3 relative 2xl:gap-x-16 xl:left-60 2xl:left-72 justify-center items-center">
  <div
    onClick={() => handleClick(1)}
    className="rounded-[30px] flex justify-center items-center z-[60] cursor-pointer hover:scale-105 transition-transform duration-300"
  >
    <Image
      src="/solutions/salesrevops2/boxes/box1.svg"
      alt="Box 1"
      width={400}
      height={420}
      className="w-[480px] h-[357px] hover-boxsalesrevops11"
    />
  </div>
  <div
    onClick={() => handleClick(2)}
    className="rounded-[30px] flex justify-center items-center z-[60] cursor-pointer hover:scale-105  transition-transform duration-300"
  >
    <Image
      src="/solutions/salesrevops2/boxes/box2.svg"
      alt="Box 2"
      width={400}
      height={400}
      className="w-[480px] h-[357px] hover-boxsalesrevops21"
    />
  </div>
  <div className="rounded-[30px] relative right-[8710px] 2xl:top-44 flex justify-center items-center hover:scale-150 transition-transform duration-300">
    <Image
      src="/solutions/salesrevops2/boxes/main.svg"
      alt="Main"
      width={50}
      height={50}
    />
  </div>
 
  <div
    onClick={() => handleClick(4)}
    className="rounded-[30px] flex relative top-2 justify-center items-center z-[60] cursor-pointer hover:scale-105 transition-transform duration-300"
  >
    <Image
      src="/solutions/salesrevops2/boxes/box4.svg"
      alt="Box 4"
      width={380}
      height={420}
      className="w-[480px] h-[357px] hover-boxsalesrevops41"
    />
  </div> 
  <div
    onClick={() => handleClick(3)}
    className="rounded-[30px] relative top-2 flex justify-center items-center z-[60] cursor-pointer hover:scale-105  transition-transform duration-300"
  >
    <Image
      src="/solutions/salesrevops2/boxes/box3.svg"
      alt="Box 3"
      width={380}
      height={400}
      className="w-[480px] h-[357px] hover-boxsalesrevops31"
    />
  </div>
</div>
</> 
          );
      }
    };
    return <div className="flex flex-col justify-center 2xl:text-[14px] text-[8px] 2xl:p-0 p-4 relative 2xl:left-8 mx-auto items-center overflow-x-hidden" onClick={handleComponentClick}>  
{renderContent()}</div>;
  };
  export default GridComponentSecond