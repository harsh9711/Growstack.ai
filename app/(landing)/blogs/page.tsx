"use client"

import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import AOS from 'aos';

import { blogTags, blogs } from "./blogs";
import 'aos/dist/aos.css';

export default function page() {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);
  return (
    <div className="p-4 sm:p-0 mt-40 max-w-[1480px] mx-auto">
      <div className="space-y-4">
        <h1 className="text-[42px] max-w-4xl mx-auto leading-normal text-center font-semibold bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent">
          We don't merely transcribe words; we craft them too.
        </h1>
        <div className="ring-1 ring-[#DADADA] p-4 rounded-full max-w-3xl mx-auto flex items-center gap-4">
          <Search className="text-[#c2c2c2]" />
          <input
            type="search"
            placeholder="Search"
            className="w-full flex items-center"
          />
        </div>
      </div>

      <div
        className="flex sm:flex-row flex-col max-w-[1240px] my-20 sm:max-h-[640px] h-full items-center bg-white rounded-[30px] border-[#E8E8E8] border shadow-lg mx-auto"
        data-aos="fade-up"
      >
        <div className="flex flex-col  gap-y-10 mb-20 items-start justify-start pl-10 py-6 pr-44">
          <div className="flex items-start justify-start">
            {blogTags.map(
              (tag, index) =>
                index === 1 && (
                  <div
                    key={index}
                    className={`py-3 font-bold cursor-pointer px-6 text-[14px] rounded-full max-w-fit shadow-md hover:shadow-lg transition-all duration-300 ease-in-out`}
                    style={{ backgroundColor: tag.theme_color }}
                  >
                    {tag.tage_title}
                  </div>
                )
            )}
          </div>
          <div className="flex flex-col gap-y-6 items-start justify-start">
            <h1 className="text-[32px] w-full leading-normal text-start font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              What is Sales Planning? How to Create a Sales Plan
            </h1>
            <div className="flex items-center gap-x-4">
              <Image
                src="/blog.svg"
                width={50}
                height={50}
                alt="Author image"
                className="rounded-full shadow-md"
              />
              <span>
                <h2 className="font-bold text-[16px] text-gray-700">
                  Josh Gould
                </h2>
                <p className="text-[14px] text-gray-500">February 13, 2024</p>
              </span>
            </div>
            <p className="max-w-md text-[18px] font-medium text-gray-600">
              Sales planning is a fundamental component of sound selling. After
              all, you can't structure an effective sales effort if you don't
              have, well, structure.
            </p>
          </div>
        </div>
        <div className="relative w-full h-full justify-end items-end"  data-aos="slide-right">
          <Image
            src="/rightside.svg"
            width={624}
            height={640}
            alt="Sales planning image"
            className="rounded-r-[30px] shadow-lg"
          />
        </div>
      </div>
      <div className="flex sm:flex-row flex-col gap-4 my-10">
        {blogTags.map((tag, index) => (
          <div
            key={index}
            className={`py-3 cursor-pointer px-6 text-[14px] rounded-full max-w-fit ${
              index === 0 && "text-white"
            }`}
            style={{ backgroundColor: tag.theme_color }}
          >
            {tag.tage_title}
          </div>
        ))}
      </div>
      <div>
        <h1 className="text-3xl font-semibold">All articles</h1>
        {blogs.map((item, index) => (
         <Link href={"blogs/components/Blogpage"} >
          <div
            key={index} 
          
            className=" mt-10 space-y-4 flex sm:flex-row flex-col gap-10 items-center shadow-box-sm !bg-white rounded-3xl border border-[#E8E8E8]"
          >
            <div className="relative w-full flex justify-center items-center">
              <Image
                src={item.background_poster}
                alt="blog"
                height={1000}
                width={1000}
                className="w-full rounded-l-3xl"
              />
              <div className="absolute inset-10 flex justify-center items-center">
                <Image
                  src={item.banner_img}
                  alt="blog"
                  height={520}
                  width={520}
                  className="object-cover rounded-xl"
                />
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-between gap-y-4 gap-x-3">
              <div className="space-y-6">
                <div
                  className={`py-3 px-5 font-semibold text-[14px] rounded-full max-w-fit`}
                  style={{ backgroundColor: item.tag.theme_color }}
                >
                  {item.tag.tage_title}
                </div>
                <h1 className="text-3xl leading-normal font-semibold bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent">
                  {item.title}
                </h1>
                <p className="leading-relaxed max-w-5xl">{item.description}</p>
                <div className="flex gap-2 items-center">
                  <Image
                    src={item.author.profile_img}
                    alt=""
                    width={1000}
                    height={1000}
                    className="w-[60px] h-[60px] object-cover rounded-full"
                  />
                  <div>
                    <h1 className="font-semibold">{item.author.names}</h1>
                    <p className="text-sm text-[#041D34] text-opacity-50">
                      {item.author.date_posted}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end"></div>
            </div>
          </div></Link>
        ))}
      </div>
    </div>
  );
}
