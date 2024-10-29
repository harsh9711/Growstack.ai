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
      className={` max-w-[610px] rounded-[20px] bg-[#FFFFFF] border-[#E3E3E3] p-6  gap-8 flex flex-col  sm:flex-row items-center sm:items-start justify-center text-black h-full`}
      data-aos="fade-right"
    >
      <div className="relative w-full max-w-[225px] ">
        <Image
          src={imgsrc1}
          width={225}
          height={114}
          alt="image"
          className="rounded-[20px]"
        />
      </div>
      <div className="flex flex-col sm:text-start text-center max-w-[325px] relative z-10 rounded-b-[20px] w-full h-full  gap-y-2 bg-white">
        <h2 className="sm:text-[16px] text-black text-[12px] font-bold">
          {firsttext}
        </h2>
        <p className="text-[12px] sm:text-[16px] font-light text-black ">
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
      firsttext: "AI secured chat:",
      secondtext:
        "Facilitates secure communication between teams, enabling real-time collaboration while protecting sensitive information. This enhances team efficiency and reduces the risk of data breaches.",
      imgsrc1: "/media/f1.svg",
    },
    {
      firsttext: "AI templates:",
      secondtext:
        "Streamlines content creation by providing pre-designed templates for articles, social media posts, and newsletters. This reduces the time spent on formatting and allows teams to focus on quality content.",
      imgsrc1: "/media/f2.svg",
    },
    {
      firsttext: "Contact repository:",
      secondtext:
        "Organizes and manages contacts efficiently, allowing media companies to nurture relationships with partners, influencers, and audiences for collaboration and outreach.",
      imgsrc1: "/media/f3.svg",
    },
    {
      firsttext: "Prospect scraping:",
      secondtext:
        "Identifies potential advertising partners and collaborators by extracting valuable contact information, enhancing business development efforts.",
      imgsrc1: "/media/f4.svg",
    },
    {
      firsttext: "MDR Agent & LinkedIn agent:",
      secondtext:
        "Automates outreach and engagement on professional networks, making it easier to connect with industry professionals and potential advertisers.",
      imgsrc1: "/media/f6.svg",
    },
    {
      firsttext: "WhatsApp and Telegram automation:",
      secondtext:
        "Automates communication on popular messaging platforms, enabling timely updates and interaction with audiences, enhancing user experience and loyalty.",
      imgsrc1: "/media/f7.svg",
    },
  ];

  return (
    <div
      className="py-20 flex flex-col item-center justify-center gap-y-8 mx-auto w-full h-full bg-[#14171B] "
      data-aos="flip-left"
      data-aos-duration="1500"
    >
      <div className="w-full max-w-[1240px] flex flex-col gap-y-10 mx-auto items-center justify-center sm:item-start">
        <div className="max-w-[154px] rounded-2xl item-center justify-center w-full py-2 text-[#A9FF9B] bg-[#61C4531A]">
          <h2 className="text-center capitalize text-[12px]">
            CUSTOMER STORIES
          </h2>
        </div>
        <div className="sm:px-0 px-6 flex flex-col text-center max-w-[900px] items-center gap-y-4 w-full justify-between">
          <h1 className="text-[26px] font-semibold xl:text-[40px] flex flex-col gap-2 leading-tight !text-center text-white">
            Growstack features for media
            <span className="font-light">& publishing success</span>
          </h1>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-2  px-6 sm:px-0 gap-10 mt-6 mx-auto">
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
