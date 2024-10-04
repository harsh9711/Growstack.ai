import React, { useEffect, useState } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

// Box Component
interface RectangleCardProps {
  firsttext: string;
  secondtext: string;
  imgsrc1: any;
}

const Box: React.FC<RectangleCardProps> = ({ firsttext, secondtext, imgsrc1 }) => {
  return (
    <div
      className="flex-1 h-full flex flex-col gap-y-4 text-start items-start justify-center text-black"
      data-aos="fade-right"
    >
      <div className="max-w-[294px]">
        <Image src={imgsrc1} width={300} height={200} alt="image" className="w-full" />
      </div>
      <h2 className="sm:text-[24px] text-[16px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#14171B]/100 to-[#14171B]/50">
        {firsttext}
      </h2>
      <p className="text-[16px] font-light text-black">{secondtext}</p>
    </div>
  );
};

// Benefits Component
const Benefits = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div
      className="max-w-[1240px] py-20 flex flex-col items-start gap-y-8 justify-center rounded-[60px] mx-auto w-full max-h-[594px] h-full"
      data-aos="flip-left"
      data-aos-duration="1500"
    >
      <div className="max-w-[104px] rounded-2xl item-start justify-start w-full py-2 text-[#034737] bg-[#03473714]">
        <h2 className="text-center capitalize text-[12px] font-extrabold">USE CASES</h2>
      </div>
      <div className="flex flex-col sm:flex-row w-full justify-between">
        <h1 className="text-[26px] xl:text-[40px] flex gap-2 leading-tight sm:text-left text-center text-black">
          <span className="font-semibold">Security</span>
        </h1>
        <p className="sm:text-[18px] text-start text-[16px] font-medium max-w-[820px]">
          Growstack's <span className="font-bold">Secure Chat</span> AI is built for businesses that need fast, intuitive, and secure communication. With flexible AI models, audio support, and customizable brand voice settings, it's the perfect tool for seamless collaboration.
        </p>
      </div>
      <div className="flex flex-wrap gap-10 mt-6 w-full">
        <Box
          firsttext="Private & confidential"
          secondtext="Growstack's AI Secure Chat ensures all conversations stay private and secure."
          imgsrc1="/features/map14.svg"
        />
        <Box
          firsttext="End-to-end encryption"
          secondtext="Keep your conversations private with robust encryption."
          imgsrc1="/features/map15.svg"
        />
        <Box
          firsttext="Threat detection"
          secondtext="Scans for phishing, malware, and unauthorized access, providing real-time alerts to ensure conversation safety."
          imgsrc1="/features/map14.svg"
        />
        <Box
          firsttext="Fraud prevention"
          secondtext="AI secured chat detects suspicious patterns and stops fraud before it happens."
          imgsrc1="/features/map15.svg"
        />
      </div>
    </div>
  );
};

// CustomAccordion Component
const CustomAccordion = () => {
  const [activeKey, setActiveKey] = useState<number | null>(null);

  const handleToggle = (key: number) => {
    setActiveKey(activeKey === key ? null : key);
  };

  const items = [
    {
      header: "What is AI Secure Chat, and how does it differ from regular chat platforms?",
      body: "AI Secure Chat is a secure, AI-powered chat platform that offers end-to-end encryption and threat detection, ensuring all conversations remain private and protected. Unlike traditional chat platforms, it uses advanced AI models like GPT-4 and Claude to assist users while prioritizing data security.",
    },
    {
      header: "Which AI models are available for use in AI Secure Chat?",
      body: "You can choose from a range of AI models, including: GPT Series (ChatGPT 3.5 Turbo, GPT-4, GPT 4o), Claude Series (Claude 3 Opus, Claude 3.5 Sonnet, Claude 3 Sonnet, Claude 3 Haiku), Gemini Series (Gemini 1.5 Pro, Gemini 1.5 Flash).",
    },
    {
      header: "How does AI Secure Chat ensure the privacy of my conversations?",
      body: "AI Secure Chat offers end-to-end encryption, meaning your conversations are protected from unauthorized access at all stages. It also has AI-powered threat detection to identify and mitigate risks like phishing and malware attacks.",
    },
    {
      header: "Can I share and download conversations in AI Secure Chat?",
      body: "Yes, users can share and download entire chat sessions, with all data remaining encrypted to maintain privacy even when saved locally or shared externally.",
    },
    {
      header: "What is the 'Brand Voice' feature?",
      body: "The Brand Voice feature allows the AI to learn and adapt to your preferred communication style, ensuring consistent responses aligned with your business tone, similar to personalization in ChatGPT.",
    },
    {
      header: "Can I continue previous conversations in AI Secure Chat?",
      body: "Yes, AI Secure Chat stores your conversation history, allowing you to pick up where you left off and seamlessly continue discussions.",
    },
    {
      header: "Is it possible to send audio inputs?",
      body: "Yes, AI Secure Chat allows users to send audio inputs that the AI can process, enabling more flexible and hands-free communication.",
    },
    {
      header: "How secure is the AI's response?",
      body: "All responses generated by the AI are processed within the encrypted environment, ensuring data confidentiality at all stages of interaction.",
    },

  ];

  return (
    <div className="sm:p-0 p-6 w-full h-full transition transform duration-1000 ease-linear">
      {items.map((item, index) => {
        const isActive = activeKey === index;
        return (
          <div
            key={index}
            className="mb-4 w-full bg-white border text-[20px] rounded-[20px] font-bold items-start ease-in-out transition-transform duration-1000 cursor-pointer"
          >
            <div className="flex flex-row w-full items-center p-4 justify-between cursor-pointer" onClick={() => handleToggle(index)}>
              <div className={`rounded-[20px] text-start flex flex-row leading-8 items-center w-full justify-between ${isActive ? "text-primary-green" : ""}`}>
                {item.header}
              </div>
              <div
                className={`flex ease-in-out transition-transform duration-300 items-center justify-center border w-12 h-12 bg-${isActive ? "primary-green" : "white"} rounded-full ${isActive ? "-rotate-180" : "rotate-75"}`}
              >
                <svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.85156 1.93066L10.0003 10.0426L18.1491 1.93066" stroke={isActive ? "white" : "#034737"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div className={`overflow-hidden transition-all duration-700 ease-linear ${isActive ? "max-h-40" : "max-h-0"}`}>
              <div className="rounded-[20px] border-b-8 border-[#D9D9D9] p-4 max-w-[1000px] w-full font-normal text-[18px] text-gray-700 bg-white">
                {item.body}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Faqs Component
const Faqs = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <React.Fragment>
      <div className="max-w-[1000px] w-full items-center justify-center mx-auto">
        <div className="flex flex-col pt-16 items-start justify-start">
          <div
            className="items-center flex flex-col gap-y-6 justify-center mx-auto"
            data-aos="fade-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
          >
            <div className="max-w-[74px] rounded-2xl item-center justify-center w-full py-2 text-[#034737] bg-[#03473714]">
              <h2 className="text-center capitalize text-[12px] font-extrabold">FAQ</h2>
            </div>
            <h3 className="text-[26px] sm:text-[40px] text-black max-w-4xl mx-auto leading-normal text-center font-extrabold ">
            Quick answers on 
              <span className="font-light ml-2">
        Ai secured chat

              </span>
            </h3>
          </div>
          <div className="flex flex-col mb-40 md:flex-row w-full pt-10 gap-10 items-center justify-between">
            <div className="w-full">
              <CustomAccordion />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Faqs;
