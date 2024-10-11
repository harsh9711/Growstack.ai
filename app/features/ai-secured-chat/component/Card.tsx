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
      className={`bg-white border shadow-xl   h-full max-h-[243px] max-w-[1240px]  w-full mx-auto relative  rounded-[20px] `}
      ref={sectionRef}
    >
      <div className="2xl:max-w-[988px]  rounded-2xl xl:max-w-[605px] py-12  relative w-full flex flex-row justify-end items-center">
        <div
          className={`absolute ${isVisible ? "slide-left image-shadow" : ""}`}
        >
          <Image src={imgsrc1} width={500} height={400} alt="map" />
        </div>
        <div className="max-w-[505px] w-full flex flex-col gap-y-6 py-1 pr-20">
          <h2
            className={`sm:text-[28px] text-[16px] font-semibold  ${isVisible ? "text-fade appear-with-delay" : "text-fade"
              }`}

          >
            {firsttext}
          </h2>
          <p
            className={`sm:text-[16px] max-h-[48px] h-full text-[12px] font-medium text-[#5B5D60]  ${isVisible ? "text-fade appear-with-delay" : "text-fade"
              }`}

          >
            {secondtext}
          </p>
        </div>
      </div>
    </div>
  );
};

const Card = () => {
  return (
    <div className="w-full ">
      <div className="flex flex-col gap-y-20 w-full  ">
        <div className="max-w-[1340px] flex flex-col items-center justify-center gap-y-6 w-full mx-auto">
          <div
            className="max-w-[104px] rounded-2xl item-center justify-center w-full py-2 text-[#034737] bg-[#03473714]"
            data-aos="fade-in"
          >
            <h2 className="text-center leading-snug capitalize text-[12px] font-extrabold">
              USE CASES
            </h2>
          </div>
          <div
            className="flex flex-col w-full justify-between gap-y-6 items-center"
            data-aos="fade-right"
          >
            <h1 className="text-[26px] xl:text-[40px] max-w-[500px] gap-2 leading-tight font-semibold sm:!text-left !text-center text-black">
              Features

            </h1>
            <p className="sm:text-[18px]  text-center text-[16px] font-medium max-w-[820px]">
              Growstack's <span className="font-bold"> Secure Chat</span>AI is built for businesses that need fast, intuitive, and secure communication. With flexible AI models, audio support, and customizable brand voice settings, it's the perfect tool for seamless collaboration.
            </p>
          </div>

        </div>
        <div className="flex flex-col gap-y-10 translate-x-20 items-center justify-center ">
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
export default Card;
