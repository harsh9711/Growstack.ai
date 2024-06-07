"use client";

import Motion from "@/components/Motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { BsStarFill } from "react-icons/bs";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Navigation, Scrollbar, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "@/styles/swiper.css";

export default function ShowCaseReviewsSection() {
  return (
    <Motion transition={{ duration: 0.2 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <div className="relative bg-white border border-[#E1E1E1] rounded-3xl py-7 px-10 text-sm">
        <div className="flex justify-between items-center border-b border-[#D6D6D6] pb-5 mb-7">
          <h1 className="text-2xl font-semibold">GrowStack Reviews</h1>
          <div className="space-y-1">
            <span className="font-medium">7 total reviews</span>
            <div className="flex gap-3 items-center">
              <div className="flex gap-2 items-center">
                {Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <BsStarFill size={18} className="text-[#FFA800]" key={index} />
                  ))}
              </div>
              5.0 Stars
            </div>
          </div>
        </div>
        <Swiper
          modules={[Navigation, Scrollbar, A11y, Pagination]}
          spaceBetween={20}
          loop={true}
          className="w-full"
          slidesPerView={1}
          navigation={{
            nextEl: ".button-next-slide",
            prevEl: ".button-prev-slide",
          }}
          pagination={{ clickable: true }}>
          <SwiperSlide className="cursor-grab active:cursor-grabbing w-full">
            <div className="w-full space-y-4">
              <p className="leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Sed non ac volutpat ornare vitae suspendisse massa tincidunt quis. Duis tristique sit nulla ut
                sollicitudin auctor ac nascetur ut. Risus nullam lacus lorem tellus adipiscing hendrerit. Adipiscing integer tempor aliquam accumsan nulla
                feugiat lacinia maecenas. Vitae nunc maecenas pretium velit nisi vulputate eu. Bibendum placerat in semper rutrum ridiculus risus sit. Eu purus
                ultricies maecenas nulla pellentesque rhoncus aliquam viverra. Nisi ultricies ut condimentum feugiat.
              </p>
              <div className="flex justify-between">
                <div className="flex gap-3 items-center font-medium">
                  <div className="flex gap-2 items-center">
                    {Array(5)
                      .fill(null)
                      .map((_, index) => (
                        <BsStarFill size={18} className="text-[#FFA800]" key={index} />
                      ))}
                  </div>
                  5.0 Stars
                  <Image src="/icons/google.svg" alt="" width={30} height={30} />
                </div>
                <div className="font-medium">13th Mar 2024</div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="cursor-grab active:cursor-grabbing w-full">
            <div className="w-full space-y-4">
              <p className="leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Sed non ac volutpat ornare vitae suspendisse massa tincidunt quis. Duis tristique sit nulla ut
                sollicitudin auctor ac nascetur ut. Risus nullam lacus lorem tellus adipiscing hendrerit. Adipiscing integer tempor aliquam accumsan nulla
                feugiat lacinia maecenas. Vitae nunc maecenas pretium velit nisi vulputate eu. Bibendum placerat in semper rutrum ridiculus risus sit. Eu purus
                ultricies maecenas nulla pellentesque rhoncus aliquam viverra. Nisi ultricies ut condimentum feugiat.
              </p>
              <div className="flex justify-between">
                <div className="flex gap-3 items-center font-medium">
                  <div className="flex gap-2 items-center">
                    {Array(5)
                      .fill(null)
                      .map((_, index) => (
                        <BsStarFill size={18} className="text-[#FFA800]" key={index} />
                      ))}
                  </div>
                  5.0 Stars
                  <Image src="/icons/google.svg" alt="" width={30} height={30} />
                </div>
                <div className="font-medium">13th Mar 2024</div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="cursor-grab active:cursor-grabbing w-full">
            <div className="w-full space-y-4">
              <p className="leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Sed non ac volutpat ornare vitae suspendisse massa tincidunt quis. Duis tristique sit nulla ut
                sollicitudin auctor ac nascetur ut. Risus nullam lacus lorem tellus adipiscing hendrerit. Adipiscing integer tempor aliquam accumsan nulla
                feugiat lacinia maecenas. Vitae nunc maecenas pretium velit nisi vulputate eu. Bibendum placerat in semper rutrum ridiculus risus sit. Eu purus
                ultricies maecenas nulla pellentesque rhoncus aliquam viverra. Nisi ultricies ut condimentum feugiat.
              </p>
              <div className="flex justify-between">
                <div className="flex gap-3 items-center font-medium">
                  <div className="flex gap-2 items-center">
                    {Array(5)
                      .fill(null)
                      .map((_, index) => (
                        <BsStarFill size={18} className="text-[#FFA800]" key={index} />
                      ))}
                  </div>
                  5.0 Stars
                  <Image src="/icons/google.svg" alt="" width={30} height={30} />
                </div>
                <div className="font-medium">13th Mar 2024</div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="cursor-grab active:cursor-grabbing w-full">
            <div className="w-full space-y-4">
              <p className="leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Sed non ac volutpat ornare vitae suspendisse massa tincidunt quis. Duis tristique sit nulla ut
                sollicitudin auctor ac nascetur ut. Risus nullam lacus lorem tellus adipiscing hendrerit. Adipiscing integer tempor aliquam accumsan nulla
                feugiat lacinia maecenas. Vitae nunc maecenas pretium velit nisi vulputate eu. Bibendum placerat in semper rutrum ridiculus risus sit. Eu purus
                ultricies maecenas nulla pellentesque rhoncus aliquam viverra. Nisi ultricies ut condimentum feugiat.
              </p>
              <div className="flex justify-between">
                <div className="flex gap-3 items-center font-medium">
                  <div className="flex gap-2 items-center">
                    {Array(5)
                      .fill(null)
                      .map((_, index) => (
                        <BsStarFill size={18} className="text-[#FFA800]" key={index} />
                      ))}
                  </div>
                  5.0 Stars
                  <Image src="/icons/google.svg" alt="" width={30} height={30} />
                </div>
                <div className="font-medium">13th Mar 2024</div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="cursor-grab active:cursor-grabbing w-full">
            <div className="w-full space-y-4">
              <p className="leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Sed non ac volutpat ornare vitae suspendisse massa tincidunt quis. Duis tristique sit nulla ut
                sollicitudin auctor ac nascetur ut. Risus nullam lacus lorem tellus adipiscing hendrerit. Adipiscing integer tempor aliquam accumsan nulla
                feugiat lacinia maecenas. Vitae nunc maecenas pretium velit nisi vulputate eu. Bibendum placerat in semper rutrum ridiculus risus sit. Eu purus
                ultricies maecenas nulla pellentesque rhoncus aliquam viverra. Nisi ultricies ut condimentum feugiat.
              </p>
              <div className="flex justify-between">
                <div className="flex gap-3 items-center font-medium">
                  <div className="flex gap-2 items-center">
                    {Array(5)
                      .fill(null)
                      .map((_, index) => (
                        <BsStarFill size={18} className="text-[#FFA800]" key={index} />
                      ))}
                  </div>
                  5.0 Stars
                  <Image src="/icons/google.svg" alt="" width={30} height={30} />
                </div>
                <div className="font-medium">13th Mar 2024</div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="cursor-grab active:cursor-grabbing w-full">
            <div className="w-full space-y-4">
              <p className="leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Sed non ac volutpat ornare vitae suspendisse massa tincidunt quis. Duis tristique sit nulla ut
                sollicitudin auctor ac nascetur ut. Risus nullam lacus lorem tellus adipiscing hendrerit. Adipiscing integer tempor aliquam accumsan nulla
                feugiat lacinia maecenas. Vitae nunc maecenas pretium velit nisi vulputate eu. Bibendum placerat in semper rutrum ridiculus risus sit. Eu purus
                ultricies maecenas nulla pellentesque rhoncus aliquam viverra. Nisi ultricies ut condimentum feugiat.
              </p>
              <div className="flex justify-between">
                <div className="flex gap-3 items-center font-medium">
                  <div className="flex gap-2 items-center">
                    {Array(5)
                      .fill(null)
                      .map((_, index) => (
                        <BsStarFill size={18} className="text-[#FFA800]" key={index} />
                      ))}
                  </div>
                  5.0 Stars
                  <Image src="/icons/google.svg" alt="" width={30} height={30} />
                </div>
                <div className="font-medium">13th Mar 2024</div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide className="cursor-grab active:cursor-grabbing w-full">
            <div className="w-full space-y-4">
              <p className="leading-relaxed">
                Lorem ipsum dolor sit amet consectetur. Sed non ac volutpat ornare vitae suspendisse massa tincidunt quis. Duis tristique sit nulla ut
                sollicitudin auctor ac nascetur ut. Risus nullam lacus lorem tellus adipiscing hendrerit. Adipiscing integer tempor aliquam accumsan nulla
                feugiat lacinia maecenas. Vitae nunc maecenas pretium velit nisi vulputate eu. Bibendum placerat in semper rutrum ridiculus risus sit. Eu purus
                ultricies maecenas nulla pellentesque rhoncus aliquam viverra. Nisi ultricies ut condimentum feugiat.
              </p>
              <div className="flex justify-between">
                <div className="flex gap-3 items-center font-medium">
                  <div className="flex gap-2 items-center">
                    {Array(5)
                      .fill(null)
                      .map((_, index) => (
                        <BsStarFill size={18} className="text-[#FFA800]" key={index} />
                      ))}
                  </div>
                  5.0 Stars
                  <Image src="/icons/google.svg" alt="" width={30} height={30} />
                </div>
                <div className="font-medium">13th Mar 2024</div>
              </div>
            </div>
          </SwiperSlide>
          <div className="flex justify-end gap-5 mt-6 relative">
            <button className="button-prev-slide rounded-full p-2.5 text-primary-green bg-primary-light-gray hover:bg-primary-green hover:text-white transition-all duration-400">
              <ArrowLeft />
            </button>
            <button className="button-next-slide rounded-full p-2.5 text-primary-green bg-primary-light-gray hover:bg-primary-green hover:text-white transition-all duration-400">
              <ArrowRight />
            </button>
          </div>
        </Swiper>
      </div>
    </Motion>
  );
}
