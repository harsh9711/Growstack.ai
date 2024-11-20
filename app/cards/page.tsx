"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

export const cases = [
  {
    id: 1,
    text: "Imagine having ",
    imageUrl: "/landingpagerevamp/1.svg",
    name: "Tony Stark's",
    description: "tech in your pocket.",
  },
  {
    id: 2,
    text: "You’re sipping coffee ☕, ",
    imageUrl: "/landingpagerevamp/2.svg",
    name: "",
    description:
      "and GrowStack is already taking care of your emails and LinkedIn replies – as smooth as Federer’s backhand.",
  },
  {
    id: 3,
    text: "Got a question? It’s like having ",
    imageUrl: "/landingpagerevamp/3.svg",
    name: "Sherlock ",
    description: "right beside you, finding answers with style and precision.",
  },
  {
    id: 4,
    text: "Need content? GrowStack has it covered, as effortlessly as  ",
    imageUrl: "/landingpagerevamp/4.svg",
    name: "MJ's moonwalkr",
    description: "",
  },
  {
    id: 5,
    text: "And when you need support, it’s as reliable as ",
    imageUrl: "/landingpagerevamp/5.svg",
    name: "Rocky’s trainer",
    description: "in your corner.",
  },
  {
    id: 6,
    text: "GrowStack: your",
    imageUrl: "/landingpagerevamp/6.svg",
    name: " dream team,",
    description: "making work feel easy and fun!",
  },
];

const Box = () => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-in-out",
      offset: 1,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-8">
    
      {cases.map((item, index) => (
        <div
          key={index}
          data-aos="fade-up"
          className="relative text-black bg-white hover:bg-[#F4F4F4] group rounded-[20px] shadow-lg hover:shadow-2xl text-center sm:text-start items-center sm:items-start transition-transform duration-500 ease-in-out max-w-[700px] h-full flex flex-col gap-y-4 justify-center overflow-hidden"
        >
          <div className="flex sm:items-start items-center gap-y-4 px-2 sm:px-8 py-4 ">
            <h2 className="text-[12px]  sm:text-[18px] xl:text-[24px] max-w-[700px]  text-black transition-colors duration-300">
              <span className=" font-bold">{item.text} </span>
              <span className="font-bold text-primary-lightgreen">
                {item.name}
              </span>{" "}
              <Image
                src={item.imageUrl}
                width={39}
                height={39}
                alt="images"
                className="inline-block align-middle"
              />{" "}
              {item.description}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

const SixCard = () => {
  return (
    <div className="py-8 sm:p-0 md:p-4">
    <div className="max-w-[1340px] sm:p-0 p-4 flex flex-col  md:items-center xl:items-start justify-center items-center gap-y-6 sm:gap-y-8 w-full mx-auto sm:py-40">
      <div
        className="max-w-fit   rounded-2xl flex items-center justify-center w-full px-4 py-2 text-primary-lightgreen bg-[#2DA77114]"
        data-aos="fade-in"
      >
        <h2 className="text-center leading-snug capitalize text-[10px] sm:text-[16px] font-extrabold">
          Value
        </h2>
      </div>
      <div
        className="flex flex-col sm:text-start text-center gap-6 justify-between items-center sm:items-start"
        data-aos="fade-right"
      >
        <h1 className="text-[16px] sm:text-[28px] xl:text-[40px]  leading-tight font-semibold text-black">
          What value do <span className="font-light">we add? </span>
        </h1>
      </div>
      <Box />
    </div>
  </div>
  );
};

export default SixCard;
