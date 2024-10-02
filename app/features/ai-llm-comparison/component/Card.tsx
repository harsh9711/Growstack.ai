import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import "../../../../styles/magicanimation.css";
import { first } from "lodash";

const RectangleCard = () => {
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
      className={`mb-32 max-w-[1240px] 2xl:translate-x-0 xl:translate-x-0 w-full mx-auto relative sm:py-20 h-full rounded-[20px] container-bg4 ${
        isVisible ? "container-bg-animate4" : ""
      }`}
      ref={sectionRef}
    >
      <div className="2xl:max-w-[988px] xl:max-w-[605px] relative w-full flex flex-row justify-end items-center">
        <div
          className={`absolute z-40 ${isVisible ? "slide-left image-shadow" : ""}`}
        >
          <div className="bg-[#E9F8F3] p-8 rounded-[20px] max-w-[285px] flex flex-col gap-y-20 items-center py-10 max-h-[1245px] w-full h-full">
            {["i3", "i2", "i1", "i5", "i6"].map((img, index) => (
              <div className="flex flex-col items-center gap-y-4 font-bold" key={index}>
                <Image
                  src={`/features/images/${img}.svg`}
                  width={200}
                  height={100}
                  alt="image"
                />
                <h2 className="text-[#353535] text-[20px]">Series</h2>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col xl:translate-x-4 2xl:translate-x-36 z-0 relative gap-y-12 ">
          {["c1", "c2", "c3", "c4", "c5"].map((img, index) => (
            <div className="bg-white max-w-[960px]  card-hover border max-h-[200px] rounded-[20px] p-6 items-center justify-center flex w-full h-full" key={index}>
              <Image
                src={`/features/${img}.svg`}
                width={700}
                height={200}
                alt="features"
                className="px-20"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


const Card = () => {
  return (
    <div>
      <div className="flex flex-col ">
        <div className="text-black items-center justify-center flex flex-col gap-y-4">
          <div className="bg-[#03473714] text-[#034737] hover:shadow-md whitespace-nowrap justify-center py-2 2xl:px-4 flex items-center text-center smLtext-[10px] text-[12px] rounded-full tracking-widest font-semibold uppercase w-full max-w-[130px] 2xl:max-w-[131px]">
            LLMs
          </div>
        
          <h1 className="text-left sm:text-left items-start justify-start flex flex-wrap gap-2 text-[26px] 2xl:text-[42px] leading-normal">
            <span className="relative font-semibold">Compare models</span>
         
          </h1>
        </div>
        <div className="xl:translate-x-20 2xl:translate-x-0">
          <RectangleCard/>
        </div>
      </div>
    </div>
  );
};
export default Card;
