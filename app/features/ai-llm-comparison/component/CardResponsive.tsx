import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import "../../../../styles/magicanimation.css";

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
      className={` max-w-full flex mx-auto relative py-6 h-full rounded-[20px] container-bg4 ${
        isVisible ? "container-bg-animate4" : ""
      }`}
      ref={sectionRef}
    >
      <div className="relative flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col w-full md:ml-36 z-0 relative gap-y-4">
          {["c1", "c2", "c3", "c4", "c5"].map((img, index) => (
            <div
              className="bg-white max-w-full card-hover border max-h-[200px] rounded-[20px] p-6 items-center justify-center flex w-full h-full"
              key={index}
            >
              <Image
                src={`/features/${img}.svg`}
                width={700}
                height={200}
                alt="features"
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
      <div className="flex flex-col">
        <div className="text-black items-center justify-center flex flex-col gap-y-4">
          <div className="bg-[#03473714] text-[#034737] hover:shadow-md whitespace-nowrap justify-center py-2 px-4 flex items-center text-center text-[10px] rounded-full tracking-widest font-semibold uppercase w-full max-w-[130px]">
            LLMs
          </div>
          <h1 className="text-left items-start justify-start flex flex-wrap gap-2 text-[26px] sm:text-[32px] lg:text-[42px] leading-normal">
            <span className="relative font-semibold">Compare models</span>
          </h1>
        </div>
        <div>
          <RectangleCard />
        </div>
      </div>
    </div>
  );
};

export default Card;
