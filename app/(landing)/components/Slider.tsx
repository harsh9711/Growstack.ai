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
          spaceBetween={20}
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
          pagination={{ clickable: true }}>
          <SwiperSlide className="cursor-grab active:cursor-grabbing">
            <div className="w-full flex items-center gap-10 bg-[#EED7A1] px-16 pt-10 pb-16 rounded-3xl">
              <div className="w-full relative before:absolute before:border before:border-primary-green before:w-full before:h-full before:top-[20px] before:right-[20px] before:rounded-xl">
                <Image src="/assets/full-dashboard-preview.png" alt="" width={700} height={700} className="!rounded-xl shadow-box relative z-[1]" />
              </div>
              <div className="space-y-5 w-3/4">
                <h1 className="leading-relaxed text-[34px] max-w-md font-semibold !mt-2">Create posts & content</h1>
                <p className="w-full max-w-lg leading-loose">
                  Lorem ipsum dolor sit amet consectetur. Enim feugiat scelerisque ullamcorper dictumst aliquet lectus sed.
                </p>
                <button className="bg-transparent border border-primary-green hover:bg-primary-green hover:text-white sheen transition duration-500 text-primary-green px-9 py-4 rounded-xl font-semibold flex items-center gap-2">
                  Learn More{" "}
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="cursor-grab active:cursor-grabbing">
            <div className="w-full flex items-center gap-10 bg-[#CD8B62] px-16 pt-10 pb-16 rounded-3xl">
              <div className="w-full relative before:absolute before:border before:border-primary-green before:w-full before:h-full before:top-[20px] before:right-[20px] before:rounded-xl">
                <Image src="/assets/full-dashboard-preview.png" alt="" width={700} height={700} className="!rounded-xl shadow-box relative z-[1]" />
              </div>
              <div className="space-y-5 w-3/4">
                <h1 className="leading-relaxed text-[34px] max-w-md font-semibold !mt-2">Create posts & content</h1>
                <p className="w-full max-w-lg leading-loose">
                  Lorem ipsum dolor sit amet consectetur. Enim feugiat scelerisque ullamcorper dictumst aliquet lectus sed.
                </p>
                <button className="bg-transparent border border-primary-green  hover:bg-primary-green hover:text-white sheen transition duration-500 text-primary-green px-9 py-4 rounded-xl font-semibold flex items-center gap-2">
                  Learn More{" "}
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="cursor-grab active:cursor-grabbing">
            <div className="w-full flex items-center gap-10 bg-[#C6BC94] px-16 pt-10 pb-16 rounded-3xl">
              <div className="w-full relative before:absolute before:border before:border-primary-green before:w-full before:h-full before:top-[20px] before:right-[20px] before:rounded-xl">
                <Image src="/assets/full-dashboard-preview.png" alt="" width={700} height={700} className="!rounded-xl shadow-box relative z-[1]" />
              </div>
              <div className="space-y-5 w-3/4">
                <h1 className="leading-relaxed text-[34px] max-w-md font-semibold !mt-2">Create posts & content</h1>
                <p className="w-full max-w-lg leading-loose">
                  Lorem ipsum dolor sit amet consectetur. Enim feugiat scelerisque ullamcorper dictumst aliquet lectus sed.
                </p>
                <button className="bg-transparent border border-primary-green  hover:bg-primary-green hover:text-white sheen transition duration-500 text-primary-green px-9 py-4 rounded-xl font-semibold flex items-center gap-2">
                  Learn More{" "}
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="cursor-grab active:cursor-grabbing">
            <div className="w-full flex items-center gap-10 bg-[#FAE8F1] px-16 pt-10 pb-16 rounded-3xl">
              <div className="w-full relative before:absolute before:border before:border-primary-green before:w-full before:h-full before:top-[20px] before:right-[20px] before:rounded-xl">
                <Image src="/assets/full-dashboard-preview.png" alt="" width={700} height={700} className="!rounded-xl shadow-box relative z-[1]" />
              </div>
              <div className="space-y-5 w-3/4">
                <h1 className="leading-relaxed text-[34px] max-w-md font-semibold !mt-2">Create posts & content</h1>
                <p className="w-full max-w-lg leading-loose">
                  Lorem ipsum dolor sit amet consectetur. Enim feugiat scelerisque ullamcorper dictumst aliquet lectus sed.
                </p>
                <button className="bg-transparent border border-primary-green  hover:bg-primary-green hover:text-white sheen transition duration-500 text-primary-green px-9 py-4 rounded-xl font-semibold flex items-center gap-2">
                  Learn More{" "}
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="cursor-grab active:cursor-grabbing">
            <div className="w-full flex items-center gap-10 bg-[#9AEEE7] px-16 pt-10 pb-16 rounded-3xl">
              <div className="w-full relative before:absolute before:border before:border-primary-green before:w-full before:h-full before:top-[20px] before:right-[20px] before:rounded-xl">
                <Image src="/assets/full-dashboard-preview.png" alt="" width={700} height={700} className="!rounded-xl shadow-box relative z-[1]" />
              </div>
              <div className="space-y-5 w-3/4">
                <h1 className="leading-relaxed text-[34px] max-w-md font-semibold !mt-2">Create posts & content</h1>
                <p className="w-full max-w-lg leading-loose">
                  Lorem ipsum dolor sit amet consectetur. Enim feugiat scelerisque ullamcorper dictumst aliquet lectus sed.
                </p>
                <button className="bg-transparent border border-primary-green  hover:bg-primary-green hover:text-white sheen transition duration-500 text-primary-green px-9 py-4 rounded-xl font-semibold flex items-center gap-2">
                  Learn More{" "}
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="cursor-grab active:cursor-grabbing">
            <div className="w-full flex items-center gap-10 bg-[#C1B1E4] px-16 pt-10 pb-16 rounded-3xl">
              <div className="w-full relative before:absolute before:border before:border-primary-green before:w-full before:h-full before:top-[20px] before:right-[20px] before:rounded-xl">
                <Image src="/assets/full-dashboard-preview.png" alt="" width={700} height={700} className="!rounded-xl shadow-box relative z-[1]" />
              </div>
              <div className="space-y-5 w-3/4">
                <h1 className="leading-relaxed text-[34px] max-w-md font-semibold !mt-2">Create posts & content</h1>
                <p className="w-full max-w-lg leading-loose">
                  Lorem ipsum dolor sit amet consectetur. Enim feugiat scelerisque ullamcorper dictumst aliquet lectus sed.
                </p>
                <button className="bg-transparent border border-primary-green  hover:bg-primary-green hover:text-white sheen transition duration-500 text-primary-green px-9 py-4 rounded-xl font-semibold flex items-center gap-2">
                  Learn More{" "}
                </button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="flex justify-center gap-5 mt-6 relative">
        <button className="button-prev-slide rounded-full p-4 text-primary-green bg-primary-light-gray hover:bg-primary-green hover:text-white transition-all duration-400">
          <ArrowLeft />
        </button>
        <button className="button-next-slide rounded-full p-4 text-primary-green bg-primary-light-gray hover:bg-primary-green hover:text-white transition-all duration-400">
          <ArrowRight />
        </button>
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
