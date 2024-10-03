import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import "../../../../styles/magicanimation.css";
import { first } from "lodash";
interface RectangleCardProps {
  firsttext: string;
  secondtext: string;
  imgsrc1: string;
}
const RectangleCard: React.FC<RectangleCardProps> = ({
  firsttext,
  secondtext,
  imgsrc1,
}) => {



  return (
    <div
      className={`bg-[#F9F9F9] p-6 mb-10 sm:mb-60 max-w-[1240px] mx-auto items-center justify-center  flex relative  h-full rounded-[20px] `}

    >
      <div className="max-w-[988px] relative w-full flex  gap-10 flex-row justify-center items-center">
        <div>
          <Image src={imgsrc1} width={500} height={400} alt="map" className="sm:w-full w-40" />
        </div>
        <div className="max-w-[505px] w-full flex flex-col gap-y-2 sm:gap-y-6">

          <h2
            className={`sm:text-[28px] text-[16px] font-semibold  `}
          >
            {firsttext}
          </h2>
          <p
            className={`sm:text-[16px] text-[12px] font-medium text-[#5B5D60] `}
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
        <div className="text-black sm:items-start items-center  justify-start flex flex-col gap-y-4">
          <div
            className="max-w-[104px] rounded-2xl item-center justify-center w-full py-2 text-[#034737] bg-[#03473714]"
            data-aos="fade-in"
          >
            <h2 className="text-center leading-snug capitalize text-[12px] font-extrabold">
              USE CASES
            </h2>
          </div>
          {/* Headline Text */}
          <h1 className="text-left sm:text-left items-center justify-center  flex flex-wrap gap-2 text-[26px] 2xl:text-[42px] leading-normal">
            <span className="relative font-semibold text-center">Features</span>
            <p className="sm:text-[18px]  text-center font-extralight text-[16px]  max-w-[820px]">
              Growstack's <span className="font-bold"> Secure Chat</span>AI is built for businesses that need fast, intuitive, and secure communication. With flexible AI models, audio support, and customizable brand voice settings, it's the perfect tool for seamless collaboration.
            </p>
          </h1>
        </div>
        <div className="flex flex-col gap-y-10 items-center justify-center ">
          <RectangleCard
            firsttext={"Audio input:"}
            secondtext={
              "Speak naturally—our AI can process audio inputs and generate accurate responses."
            }
            imgsrc1={"/features/map9.svg"}
          />


          <RectangleCard
            firsttext={"Multiple AI models:"}
            secondtext={
              "Choose from a range of models such as GPT 4, GPT 4o, Claude 3 Opus, Claude 3.5 Sonnet, Gemini 1.5 Pro, and more to tailor your conversation."
            }
            imgsrc1={"/features/map10.svg"}
          />
          <RectangleCard
            firsttext={"Conversation history:"}
            secondtext={
              "Continue conversations where you left off, with a full log of past interactions."
            }
            imgsrc1={"/features/map11.svg"}
          />


          <RectangleCard
            firsttext={"Brand voice personalization:"}
            secondtext={
              "Maintain a consistent tone and style across your chats by saving preferences and styles, ensuring that your brand's voice is always aligned."
            }
            imgsrc1={"/features/map12.svg"}
          />
          <RectangleCard
            firsttext={"Download & share:"}
            secondtext={
              "Easily share or download your conversations for future reference."
            }
            imgsrc1={"/features/map13.svg"}
          />
        </div>
      </div>
    </div>
  );
};
export default CardResponsive;
