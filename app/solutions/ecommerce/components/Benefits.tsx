import React, { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

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
      className={`flex-grow max-w-[400px] rounded-[20px] bg-[#FFFFFF] border-[#E3E3E3] flex flex-col items-start justify-center text-black h-full`}
      data-aos="fade-right"
    >
      <div className="relative w-full h-52"> 
        <Image
          src={imgsrc1}
          layout="fill" 
          objectFit="cover" 
          alt="image"
          className="rounded-t-[20px]" 
        />
      </div>
      <div className="flex flex-col relative z-10 rounded-b-[20px] border p-6 gap-y-2 bg-white">
        <h2 className="sm:text-[16px] text-black text-[12px] font-bold">
          {firsttext}
        </h2>
        <p className="text-[12px] sm:text-[16px] font-light text-black text-start">
          {secondtext}
        </p>
      </div>
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

  const features = [
    {
      firsttext: "Text to avatar & AI background generator:",
      secondtext:
        "Create engaging visual content for marketing materials without the need for graphic design expertise.",
      imgsrc1: "/ecommerce/6.svg",
    },
    {
      firsttext: "Scheduler & content calendar:",
      secondtext:
        "Plan and manage marketing campaigns effectively to ensure consistent communication and promotions.",
      imgsrc1: "/ecommerce/7.svg", 
    },
    {
      firsttext: "Posting logs:",
      secondtext:
        "Track all content posted across platforms for better accountability and performance analysis.",
      imgsrc1: "/ecommerce/8.svg", },
    {
      firsttext: "Social media conversation hub:",
      secondtext:
        "Manage interactions and conversations across multiple social media channels from one central location.",
      imgsrc1: "/ecommerce/9.svg", 
    },
    {
      firsttext: "Social media analytics:",
      secondtext:
        "Monitor the performance of social media campaigns to adjust strategies as needed.",
      imgsrc1: "/ecommerce/10.svg", 
    },
    {
      firsttext: "Prospect Scraping & LinkedIn agent:",
      secondtext:
        "Identify and gather information on potential customers and leads to enhance targeting.",
      imgsrc1: "/ecommerce/11.svg", 
    },
  
  ];

  return (
    <div
      className="py-20 flex flex-col item-center justify-center gap-y-8 mx-auto w-full h-full bg-[url('/svg.png')] bg-cover bg-no-repeat"
      data-aos="flip-left"
      data-aos-duration="1500"
    >
      <div className="w-full max-w-[1240px] flex flex-col gap-y-10 mx-auto items-center justify-center sm:item-start">
        <div className="max-w-[154px] rounded-2xl item-center justify-center w-full py-2 text-[#A9FF9B] bg-[#61C4531A]">
          <h2 className="text-center capitalize text-[12px]">
            Customer stories
          </h2>
        </div>
        <div className="sm:px-0 px-6 flex flex-col text-center max-w-[900px] items-center gap-y-4 w-full justify-between">
          <h1 className="text-[26px] font-semibold xl:text-[40px] flex flex-col gap-2 leading-tight !text-center text-white">
            Enhanced features for elevating
            <span className="font-light"> your eCommerce success</span>
          </h1>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3  px-6 sm:px-0 gap-10 mt-6 mx-auto">
        {features.map((feature, index) => (
          <Box
            key={index}
            firsttext={feature.firsttext}
            secondtext={feature.secondtext}
            imgsrc1={feature.imgsrc1}
            data-aos="fade-right"
            data-aos-delay={index * 100} 
          />
        ))}
      </div>
    </div>
  );
};

export default Benefits;
