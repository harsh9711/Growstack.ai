"use client";

import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import Image from "next/image";
import { Fragment, useState } from "react";
import { BsQuestion } from "react-icons/bs";

export default function CreateNewMultiPost() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const tabs = [
    "General",
    "Facebook",
    "Twitter",
    "Linkedin",
    "Tumblr",
    "Pinterest",
    "GMB",
    "Reddit",
    "Instagram",
    "Blogger",
  ];

  return (
    <Fragment>
      <main>
        <div className="flex justify-between items-center mt-8">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">
              Add multi-posting content
            </h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[16px]">
              Lorem ipsum dolor sit amet consectetur. Vitae leo amet aliquam
              ultricies accumsan. Nec.{" "}
            </p>
          </div>
        </div>
        <section className="bg-white rounded-3xl border border-[#EDEFF0] px-10 py-6 pb-10 mt-6">
          <div className="flex gap-8">
            <div className="w-full">
              <div className="space-y-3 w-full">
                <label className="font-medium">
                  Add content <span className="text-[#F00]">*</span>
                </label>
                <textarea
                  placeholder="write something here..."
                  className="h-[129px] w-full bg-[#F2F2F2] rounded-2xl p-3 resize-none"
                />
              </div>
              <div className="space-y-3 mt-3">
                <label className="font-medium">Link </label>
                <Input type="url" placeholder="Content share link" />
              </div>
            </div>
            <div className="w-full max-w-[280px]">
              <div className="w-full flex items-center gap-4 mt-16">
                <p className="font-medium min-w-fit">Content Image</p>
                <label
                  htmlFor="contentImage"
                  className="h-12 w-full bg-primary-green py-3 px-4 sheen flex justify-center items-center gap-3 rounded-xl text-white cursor-pointer"
                >
                  <Plus size={20} />
                  <span className="font-medium">Browse...</span>
                </label>
                <input id="contentImage" type="file" className="hidden" />
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="settings-inset-border translate-y-10 max-w-[1320px] mx-auto bg-[#FBFBFB] p-3 rounded-2xl">
            <div className="w-full flex relative">
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  className={`w-full h-[45px] flex gap-x-2 justify-center items-center relative cursor-pointer z-[1] transition-all duration-500 whitespace-nowrap ${
                    selectedTabIndex === index
                      ? "!text-white"
                      : "!text-primary-grey"
                  }`}
                  onClick={() => {
                    const totalTabs = tabs.length;
                    const percentage = (index / totalTabs) * 100;
                    setSelectedTabIndex(index);
                    setTabUnderlineLeft(percentage);
                  }}
                >
                  {tab}
                </div>
              ))}
              <div
                className="absolute bottom-0 h-[45px] bg-primary-green custom-transition rounded-lg"
                style={{
                  left: `calc(${tabUnderlineLeft}%)`,
                  width: `${100 / tabs.length}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="bg-white rounded-3xl border border-[#EDEFF0] p-10 pt-16">
            <div className="flex gap-5">
              <div className="w-full space-y-7">
                <div className="flex items-center">
                  <label
                    htmlFor="status"
                    className="flex items-center gap-1 w-1/5 min-w-[300px] font-medium"
                  >
                    Status: <BsQuestion className="text-[#6A37E3]" size={20} />
                  </label>
                  <div className="w-full">
                    <Input
                      type="url"
                      placeholder="Content share link"
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <label
                    htmlFor="status"
                    className="flex items-center gap-1 w-1/5 min-w-[300px] font-medium"
                  >
                    Post to this {tabs[selectedTabIndex]} account(s):{" "}
                    <BsQuestion className="text-[#6A37E3]" size={20} />
                  </label>
                  <div className="w-full">
                    <Input
                      type="url"
                      placeholder="Content share link"
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <label
                    htmlFor="status"
                    className="flex items-center gap-1 w-1/5 min-w-[300px] font-medium"
                  >
                    Share posting type:{" "}
                    <BsQuestion className="text-[#6A37E3]" size={20} />
                  </label>
                  <div className="w-full flex gap-5">
                    <Input
                      type="url"
                      placeholder="Content share link"
                      className="w-full"
                    />
                    <button className="h-12 w-full max-w-[180px] bg-primary-green py-3 px-4 sheen flex justify-center items-center gap-3 rounded-xl text-white cursor-pointer">
                      <Plus size={20} />
                      <span className="font-medium">Browse...</span>
                    </button>
                  </div>
                </div>
                <div className="flex items-center">
                  <label
                    htmlFor="status"
                    className="flex items-center gap-1 w-1/5 min-w-[300px] font-medium"
                  >
                    Custom message:{" "}
                    <BsQuestion className="text-[#6A37E3]" size={20} />
                  </label>
                  <div className="w-full">
                    <Input
                      type="url"
                      placeholder="Content share link"
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <label
                    htmlFor="status"
                    className="flex items-center gap-1 w-1/5 min-w-[300px] font-medium"
                  >
                    Schedule global:{" "}
                    <BsQuestion className="text-[#6A37E3]" size={20} />
                  </label>
                  <div className="w-full">
                    <Input
                      type="url"
                      placeholder="Content share link"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-10 bg-[#6A37E3]/10 leading-relaxed flex items-center gap-2 py-2 px-4 rounded-lg italic">
              <Image src="/svgs/info.svg" alt="" width={30} height={30} /> You
              can only schedule the content if the current status set to
              unpublished.
            </p>
            <div className="flex justify-end gap-4 mt-10">
              <button className="py-3.5 px-4 w-full max-w-[120px] bg-primary-green sheen rounded-xl text-white">
                Add
              </button>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}
