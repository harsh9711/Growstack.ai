import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { blogTags, blogs } from "./blogs";

export default function page() {
  return (
    <div className="mt-40 max-w-[1480px] mx-auto">
      <div className="space-y-4">
        <h1 className="text-[42px] max-w-4xl mx-auto leading-normal text-center font-semibold bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent">
          We don't merely transcribe words; we craft them too.
        </h1>
        <div className="ring-1 ring-[#DADADA] p-4 rounded-full max-w-3xl mx-auto flex items-center gap-4">
          <Search className="text-[#c2c2c2]" />
          <input type="search" placeholder="Search" className="w-full flex items-center" />
        </div>
      </div>
      <div className="flex gap-4 my-10">
        {blogTags.map((tag, index) => (
          <div key={index} className={`py-3 cursor-pointer px-4 text-[14px] rounded-full max-w-fit`} style={{ backgroundColor: tag.theme_color }}>
            {tag.tage_title}
          </div>
        ))}
      </div>
      <div>
        <h1 className="text-3xl font-semibold">All articles</h1>
        {blogs.map((item, index) => (
          <div key={index} className="mt-10 space-y-4 flex gap-10 items-center shadow-box-sm !bg-white rounded-3xl border border-[#E8E8E8]">
            <div className="relative w-full flex justify-center items-center">
              <Image src={item.background_poster} alt="blog" height={1000} width={1000} className="w-full rounded-l-3xl" />
              <div className="absolute inset-10 flex justify-center items-center">
                <Image src={item.banner_img} alt="blog" height={520} width={520} className="object-cover rounded-xl" />
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-between gap-y-4 gap-x-3">
              <div className="space-y-6">
                <div className={`py-3 px-5 font-semibold text-[14px] rounded-full max-w-fit`} style={{ backgroundColor: item.tag.theme_color }}>
                  {item.tag.tage_title}
                </div>
                <h1 className="text-3xl leading-normal font-semibold bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent">{item.title}</h1>
                <p className="leading-relaxed max-w-5xl">{item.description}</p>
                <div className="flex gap-2 items-center">
                  <Image src={item.author.profile_img} alt="" width={1000} height={1000} className="w-[60px] h-[60px] object-cover rounded-full" />
                  <div>
                    <h1 className="font-semibold">{item.author.names}</h1>
                    <p className="text-sm text-[#041D34] text-opacity-50">{item.author.date_posted}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
