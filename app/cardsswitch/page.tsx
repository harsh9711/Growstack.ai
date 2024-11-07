"use client"
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

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
    <div className="sm:flex hidden max-w-[1239px] w-full items-center justify-center">
      {/* <Image width={100} height={100} alt="map" /> */}
      {/* <Image  width={100} height={100} alt="map" /> */}
      <div
        style={{
          border: "4px solid gray",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <ReactCompareSlider
          transition="0.25s cubic-bezier(.17,.67,.83,.67)"
          boundsPadding={0}
          changePositionOnHover
          itemOne={
            <ReactCompareSliderImage
              src=""
              srcSet="/switch1.svg"
              alt="Image one"
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src=""
              srcSet="/switch2.svg"
              alt="Image two"
            
            />
          }
          handle={
            <svg
              width="53"
              height="806"
              viewBox="0 0 53 806"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="26.1607"
                y1="806"
                x2="26.1606"
                y2="2.76386e-08"
                stroke="#2DA771"
                stroke-width="1.2646"
              />
              <circle
                opacity="0.1"
                cx="26.793"
                cy="403"
                r="26"
                fill="#2DA771"
              />
              <circle
                opacity="0.5"
                cx="26.7934"
                cy="403"
                r="22.1"
                fill="#2DA771"
              />
              <circle cx="26.7928" cy="403.001" r="18.2" fill="#2DA771" />
              <path
                d="M23.793 397L17.793 403L23.793 409"
                stroke="white"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M28.793 409L34.793 403L28.793 397"
                stroke="white"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          }
        />
      </div>
    </div>
  );
};

const SixCardSwitch = () => {
  return (
    <div className="py-8">
      <div className="max-w-[1340px] flex flex-col  items-center gap-y-6 sm:gap-y-8 w-full mx-auto sm:py-40">
        <div
          className="max-w-[184px] rounded-2xl flex items-center justify-center w-full px-4 py-2 text-primary-lightgreen bg-[#2DA77114]"
          data-aos="fade-in"
        >
          <h2 className="text-center leading-snug capitalize text-[12px] sm:text-[16px] font-extrabold">
            INTEGRATIONS
          </h2>
        </div>
        <div
          className="flex flex-col   text-center gap-6 w-full justify-between items-center "
          data-aos="fade-right"
        >
          <h1 className="text-[28px] xl:text-[40px] w-full leading-tight font-semibold text-black">
            Integrations that we use in our platform{" "}
            <span className="font-light"> in our platform </span>
          </h1>
        </div>
        <Box />
      </div>
    </div>
  );
};

export default SixCardSwitch;
