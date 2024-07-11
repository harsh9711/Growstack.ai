"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

export default function Slider() {
  return (
    <div className="w-full space-y-10 mt-10">
      <CategoryTabs />
      <div className="relative flex px-3 md:px-4 w-full">
        <Swiper
          modules={[Navigation, Scrollbar, A11y]}
          spaceBetween={800}
          loop={true}
          className="w-full"
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            1124: {
              slidesPerView: 2,
            },
          }}
          navigation={{
            nextEl: ".button-next-slide",
            prevEl: ".button-prev-slide",
          }}
          pagination={{ clickable: true }}
        >
          <SwiperSlide className="cursor-grab active:cursor-grabbing">
            <div className="w-[1400px] flex items-center gap-10 bg-[#E8FBE1] px-16 pt-10 pb-16 rounded-3xl">
              <div className="w-full relative before:absolute before:border before:border-primary-green before:w-full before:h-full before:top-[40px] before:right-[20px] -translate-y-10 before:rounded-xl">
                <Image src="/assets/full-dashboard-preview.png" alt="" width={1400} height={900} className="!rounded-xl shadow-box relative z-[1]" />
              </div>
              <div className="space-y-4 w-full pt-1">
                <h1 className="leading-relaxed text-[34px] w-full font-semibold !mt-2">Seamlessly Publish Across Platforms</h1>
                <p className="w-full max-w-lg leading-loose font-semibold">
                Schedule and publish content to reach your audience at the right time.                </p>
                <div className="bg-transparent transition duration-500 text-primary-green rounded-xl font-semibold flex flex-col items-start ">
                  <h2 className="text-[18px]">Features</h2>
                  <ul className="space-y-4 !mt-5">
                    <li className="flex gap-x-2 items-center font-semibold">
                      <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                      Scheduler                    </li>
                    <li className="flex gap-x-2 items-center font-semibold">
                      <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                      Quick Posting                    </li>
                    <li className="flex gap-x-2 items-center font-semibold">
                      <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                      Multi-Posting                    </li>
                    <li className="flex gap-x-2 items-center font-semibold">
                      <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                      Settings                      </li>
                    <li className="flex gap-x-2 items-center font-semibold">
                      <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                      Posting Logs                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="cursor-grab active:cursor-grabbing">
            <div className="w-[1400px] flex items-center gap-10 bg-[#ECE3FC] px-16 pt-20 pb-24 rounded-3xl">
              <div className="w-full relative before:absolute before:border before:border-primary-green before:w-full before:h-full before:top-[40px] before:right-[20px] -translate-y-10 before:rounded-xl">
                <Image src="/assets/full-dashboard-preview.png" alt="" width={1600} height={900} className="!rounded-xl shadow-box relative z-[1]" />
              </div>
              <div className="space-y-4 w-full pt-1">
                <h1 className="leading-relaxed text-[34px] w-[500px] font-semibold !mt-2">Engage Your Audience Effectively</h1>
                <p className="w-full max-w-lg leading-loose font-semibold">
                Foster meaningful interactions with your community.               </p>
                <div className="bg-transparent transition duration-500 text-primary-green rounded-xl font-semibold flex flex-col items-start ">
                  <h2 className="text-[18px]">Features</h2>
                  <ul className="space-y-4 !mt-5">
                    <li className="flex gap-x-2 items-center font-semibold">
                      <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                      Social Media Conversation Hub                    </li>
                  
                  </ul>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="cursor-grab active:cursor-grabbing">
            <div className="w-[1400px] flex items-center gap-10 bg-[#CD8B62] px-16 pt-10 pb-16 rounded-3xl">
              <div className="w-full relative before:absolute before:border before:border-primary-green before:w-full before:h-full before:top-[40px] before:right-[20px] -translate-y-10 before:rounded-xl">
                <Image src="/assets/full-dashboard-preview.png" alt="" width={900} height={900} className="!rounded-xl shadow-box relative z-[1]" />
              </div>
              <div className="space-y-4 w-full pt-1">
                <h1 className="leading-relaxed text-[34px] w-full font-semibold !mt-2">Strategize Your Marketing Campaigns</h1>
                <p className="w-full max-w-lg leading-loose font-semibold">
                  Develop and refine your marketing strategies with AI-powered planning tools.
                </p>
                <div className="bg-transparent transition duration-500 text-primary-green rounded-xl font-semibold flex flex-col items-start ">
                  <h2 className="text-[18px]">Features</h2>
                  <ul className="space-y-4 !mt-5">
                    <li className="flex gap-x-2 items-center font-semibold">
                      <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                      AI Chat
                    </li>
                    <li className="flex gap-x-2 items-center font-semibold">
                      <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                      AI Apps
                    </li>
                    <li className="flex gap-x-2 items-center font-semibold">
                      <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                      AI Assistant
                    </li>
                    <li className="flex gap-x-2 items-center font-semibold">
                      <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                      AI Custom GPT
                    </li>
                    <li className="flex gap-x-2 items-center font-semibold">
                      <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                      Text to Video
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="cursor-grab active:cursor-grabbing">
            <div className="w-[1400px] flex items-center gap-10 bg-[#C6BC94] px-16 pt-24 pb-20 rounded-3xl">
              <div className="w-full relative before:absolute before:border before:border-primary-green before:w-full before:h-full before:top-[40px] before:right-[20px] -translate-y-10 before:rounded-xl">
                <Image src="/assets/full-dashboard-preview.png" alt="" width={2000} height={1400} className="!rounded-xl w-full h-full shadow-box relative z-[1]" />
              </div>
              <div className="space-y-4 w-full pt-1">
                <h1 className="leading-relaxed text-[34px] w-full font-semibold !mt-2">Effortlessly Create Posts 
                & Content</h1>
                <p className="w-full max-w-lg leading-loose font-semibold">
                Develop engaging posts and multimedia content with ease.                </p>
                <div className="bg-transparent transition duration-500 text-primary-green rounded-xl font-semibold flex flex-col items-start ">
                  <h2 className="text-[18px]">Features</h2>
                  <ul className="space-y-4 !mt-5">
                    <li className="flex gap-x-2 items-center font-semibold">
                      <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                      AI Website Builder                   </li>
                    <li className="flex gap-x-2 items-center font-semibold">
                      <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                      AI Email Builder                     </li>
                    <li className="flex gap-x-2 items-center font-semibold">
                      <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                      AI Workflow Builder                 </li>
                    <li className="flex gap-x-2 items-center font-semibold">
                      <Image src="/icons/check.svg" alt="" width={20} height={20} className="h-[14px] w-[14px] sm:w-[20px] sm:h-[20px]" />
                      AI Article Wizard                  </li>
                    
                  </ul>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="absolute hidden md:flex items-center gap-x-5 lg:gap-x-10 top-1/2 transform -translate-y-1/2 px-4 w-full justify-between">
  <button className="button-prev-slide hover:bg-[#fff]/20 flex items-center justify-center transition duration-300 rounded-full !p-2 lg:!p-4">
    <ArrowLeft className="h-5 w-5 lg:h-8 lg:w-8" />
  </button>
  <button className="button-next-slide hover:bg-[#fff]/20 flex items-center justify-center transition duration-300 rounded-full !p-2 lg:!p-4">
    <ArrowRight className="h-5 w-5 lg:h-8 lg:w-8" />
  </button>
</div>

      </div>
    </div>
  );
}


const CategoryTabs = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const [underlineLeft, setUnderlineLeft] = useState(0);

  const handleTabClick = (index: number) => {
    const totalTabs = tabs.length;
    const percentage = (index / totalTabs) * 100;
    setSelectedTabIndex(index);
    setUnderlineLeft(percentage);
  };
  return (
    <div>
      <div className="border border-[#DBDBDB] bg-white p-1 rounded-full max-w-4xl mx-auto">
        <div className="flex relative">
          {tabs.map(({ img, title, themeColor }, index) => (
            <div
              key={index}
              className={`w-full h-[60px] flex gap-x-4 justify-start items-center relative cursor-pointer z-[1] transition-all duration-500 text-[16px] px-3 ${
                selectedTabIndex === index ? "!text-white" : "!text-primary-green"
              }`}
              onClick={() => handleTabClick(index)}>
              <div className={`p-2 rounded-full`} style={{ backgroundColor: themeColor }}>
                <Image src={img} alt="" width={28} height={28} />
              </div>
              {title}
            </div>
          ))}
          <div
            className="absolute bottom-0 w-[calc(100%-80%)] h-[60px] bg-primary-green custom-transition rounded-full"
            style={{ left: `${underlineLeft}%` }}></div>
        </div>
      </div>
    </div>
  );
};

const tabs = [
  {
    img: "/icons/campaign.svg",
    title: "create",
    themeColor: "#A9FF9B",
  },
  {
    img: "/icons/engagement.svg",
    title: "publish",
    themeColor: "#FDDF6E",
  },
  {
    img: "/icons/automation.svg",
    title: "engage",
    themeColor: "#F582A5",
  },
  {
    img: "/icons/analytics.svg",
    title: "share",
    themeColor: "#FF895B",
  },
  {
    img: "/icons/analytics.svg",
    title: "analyze",
    themeColor: "#10A1F3",
  },
];
