import React, { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

interface RectangleCardProps {
  firsttext: string;
  secondtext: string;
  imgsrc1: any;
}

const Box: React.FC<RectangleCardProps> = ({
  firsttext,
  secondtext,
  imgsrc1,
}) => {
  return (
    <div
      className="flex-1 flex flex-col gap-y-4 text-start items-start justify-center text-black"
      data-aos="fade-right"
    >
      <div className="max-w-[294px] w-full">
        <Image
          src={imgsrc1}
          width={300}
          height={200}
          alt="image"
          className="w-full"
        />
      </div>
      <h2 className="sm:text-[22px] text-[20px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#14171B]/100 to-[#14171B]/50">
        {firsttext}
      </h2>
      <p className="text-[16px] font-light text-black max-h-[48px]">
        {secondtext}
      </p>
    </div>
  );
};

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
      className="max-w-[1240px] py-20 px-4 sm:px-8 flex flex-col items-center sm:items-start gap-y-8 justify-center rounded-[60px] mx-auto w-full"
      data-aos="flip-left" // Rotate the whole green container first
      data-aos-duration="1500" // Rotation duration
    >
      <div className="max-w-[104px] rounded-2xl item-start justify-start w-full py-2 text-[#034737] bg-[#03473714]">
        <h2 className="text-center capitalize text-[12px] font-extrabold">
          USE CASES
        </h2>
      </div>
      <div className="flex flex-col sm:flex-row w-full gap-6 justify-between items-center sm:items-start">
        <h1 className="text-[26px] xl:text-[40px] flex gap-2 leading-tight text-center sm:text-left text-black">
          <span className="font-semibold">Security</span>
        </h1>
        <p className="sm:text-[18px] text-[16px] font-medium max-w-[820px] text-center sm:text-left">
          Growstack's <span className="font-bold">Secure Chat</span> AI is built
          for businesses that need fast, intuitive, and secure communication.
          With flexible AI models, audio support, and customizable brand voice
          settings, it's the perfect tool for seamless collaboration.
        </p>
      </div>
      <div className="flex flex-wrap gap-y-20 gap-x-10 mt-6 w-full justify-center sm:justify-between">
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
          imgsrc1="/features/map16.svg"
        />
        <Box
          firsttext="Fraud prevention"
          secondtext="AI secured chat detects suspicious patterns and stops fraud before it happens."
          imgsrc1="/features/map17.svg"
        />
      </div>
    </div>
  );
};

export default Benefits;
