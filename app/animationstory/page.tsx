import { ArrowRight, CircleDot, Link } from "lucide-react";
import Image from "next/image";
import React from "react";
import "../../styles/animate.css";

const KeyPoints = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 justify-between items-center gap-6 sm:gap-10 p-8">
      {[
        "Write Right, Anytime, Anywhere!",
        "Content Creation, Minus the Sweat",
        "Social Media, Sorted in One Spot",
        "Set It and Forget It – AI Automation at Your Service",
      ].map((point, index) => (
        <div key={index} className="flex  flex-row items-start  space-x-2">
          <span className="w-3 h-3 mt-2 bg-green-500 " /> {/* Green Square */}
          <h2 className="text-lg font-semibold">{point}</h2>
        </div>
      ))}
    </div>
  );
};
const AnimationStory = () => {
  return (
    <div className="mx-auto  mt-10 sm:mt-20 flex flex-col">
      {" "}
      <div className="mx-auto flex w-full flex-col gap-6 sm:flex-row  max-w-[1320px]  items-center justify-between">
        {" "}
        <h1 className="text-[16px] sm:text-start  max-w-[620px] w-full   text-center sm:text-[42px] font-medium mb-1">
          AI for
          <span className="font-extrabold   text-[#2DA771] px-2">
            Smarter Writing, Engagement, & Automation
          </span>{" "}
        </h1>
        <span className="flex flex-col sm:text-[20px] font-semibold text-[12px]">
          <h2 className="text-[#2DA771]">
            No More <span className="text-black">Silos</span>
          </h2>
          <h2 className="text-[#2DA771]">
            No More <span className="text-black">Delays</span>
          </h2>
          <h2 className="text-[#2DA771]">
            No More <span className="text-black">Limits</span>
          </h2>
          <div className=" mt-6">
            <Link href="/demo">
              <button className="border border-[#D9D9D9] flex bg-primary-light-green items-center gap-2 text-white hover:font-bold font-medium py-4 px-7 rounded-xl shadow-lg shadow-[#00000025]">
                Get demo <ArrowRight className="text-white" />
              </button>
            </Link>
          </div>
        </span>
      </div>
      <div className=" bg-white  p-8 relative hidden sm:flex items-center justify-center">
        <div className="w-full max-w-4xl absolute z-20">
       

          <svg
            className="w-full "
            width="1134"
            height="199"
            viewBox="0 0 1134 199"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* <svg
            width="1134"
            height="154"
            viewBox="0 0 1134 154"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          > */}
            <path
              d="M2.5 47C6.5 82.5 35.5 153 119.5 151C203.5 149 455.167 150.167 570.5 151C583.667 149 612.1 147.7 622.5 108.5C630.194 79.5 654 76 730.5 76L1083 69C1099.67 68.5 1132.6 54.2 1131 1"
              stroke="white"
              stroke-width="11"
              className="stroke-[#ffffff]    -translate-y-2  relative z-10"
              fill="#fffff"
              strokeLinecap="round"
            />{" "}
            <path
              d="M4.50073 113.906C68.1919 112.445 110.253 112.825 179.752 113.451L179.753 113.451L179.756 113.451C199.135 113.626 220.648 113.82 245.358 113.999C246.196 113.873 247.084 113.75 248.013 113.621C254.554 112.714 263.181 111.518 271.582 106.944C280.21 102.245 288.706 93.8964 294.001 78.2078V78H294.071C294.604 76.4057 295.104 74.736 295.568 72.9871L299.434 74.0129C298.988 75.6926 298.51 77.3059 298.001 78.8555V229H294.001V88.6396C288.493 99.6117 281.132 106.297 273.495 110.456C264.4 115.409 255.007 116.7 248.491 117.596C247.528 117.728 246.628 117.852 245.801 117.977L245.645 118.001L245.486 118C220.691 117.821 199.117 117.626 179.692 117.451L179.688 117.451L179.687 117.451H179.686H179.686C108.743 116.811 66.4594 116.43 0.548336 117.999L0.453125 114.001C0.468995 114 0.484863 114 0.500731 113.999V0H4.50073V113.906Z"
              stroke="white"
              stroke-width="0"
              className="stroke-[#ffffff]  translate-x-[320px] translate-y-[29px] relative z-60"
              fill="#ffffff"
              strokeLinecap="round"
            />
            <circle className="animate-moveBall1 -translate-y-2 fill-gray-300" r="20">
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                path="M2.5 47C6.5 82.5 35.5 153 119.5 151C203.5 149 455.167 150.167 570.5 151C583.667 149 612.1 147.7 622.5 108.5C630.194 79.5 654 76 730.5 76L1083 69C1099.67 68.5 1132.6 54.2 1131 1"
              />
            </circle>
            <circle
              className="animate-moveBall2 translate-x-80 translate-y-6 fill-gray-300"
              r="12"
            >
              <animateMotion
                dur="10s"
                repeatCount="indefinite"
                path="M4.50073 113.906C68.1919 112.445 110.253 112.825 179.752 113.451L179.753 113.451L179.756 113.451C199.135 113.626 220.648 113.82 245.358 113.999C246.196 113.873 247.084 113.75 248.013 113.621C254.554 112.714 263.181 111.518 271.582 106.944C280.21 102.245 288.706 93.8964 294.001 78.2078V78H294.071C294.604 76.4057 295.104 74.736 295.568 72.9871L299.434 74.0129C298.988 75.6926 298.51 77.3059 298.001 78.8555V229H294.001V88.6396C288.493 99.6117 281.132 106.297 273.495 110.456C264.4 115.409 255.007 116.7 248.491 117.596C247.528 117.728 246.628 117.852 245.801 117.977L245.645 118.001L245.486 118C220.691 117.821 199.117 117.626 179.692 117.451L179.688 117.451L179.687 117.451H179.686H179.686C108.743 116.811 66.4594 116.43 0.548336 117.999L0.453125 114.001C0.468995 114 0.484863 114 0.500731 113.999V0H4.50073V113.906Z"
              />
            </circle>
            {/* <circle className="animate-moveBall3 fill-white" r="8">
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              begin="2.6s"
              path="M50,100 H300 Q350,100 350,150 T400,150 H750"
            />
          </circle> */}
          </svg>

          {/* Text Elements */}
        </div>{" "}
        <Image
          src="/story.svg"
          width={1040}
          height={100}
          alt="animation"
          className="relative z-0 translate-x-4"
        />
      </div>
      <div className="flex w-full mx-auto items-center justify-center   max-w-[1320px]">
        <KeyPoints />
      </div>
    </div>
  );
};

export default AnimationStory;
