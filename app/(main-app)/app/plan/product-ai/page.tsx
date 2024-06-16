"use client";

import React, { useState } from "react";
import Dropzone from "./components/Dropzone";
import { Switch } from "@/components/ui/switch";
import Compositions from "./components/Compositions";
import MyCompositions from "./components/MyCompositions";
import Image from "next/image";

export default function Page() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const [underlineLeft, setUnderlineLeft] = useState(0);

  const tabs = ["Compositions", "My Compositions"];

  const handleTabClick = (index: number) => {
    const totalTabs = tabs.length;
    const percentage = (index / totalTabs) * 100;
    setSelectedTabIndex(index);
    setUnderlineLeft(percentage);
  };
  const renderCompositionComponent = () => {
    switch (selectedTabIndex) {
      case 0:
        return <Compositions />;
      case 1:
        return <MyCompositions />;
      default:
        return null;
    }
  };
  return (
    <main className="mt-8 px-4">
      <div className="flex gap-8">
        <section className="w-full max-w-[450px] bg-white rounded-[20px] p-7 space-y-6">
          <div className="border border-[#DBDBDB] bg-white p-1 rounded-xl">
            <div className="flex relative">
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  className={`w-full h-[40px] flex gap-x-2 justify-center items-center relative cursor-pointer z-[1] transition-all duration-500 text-[16px] ${
                    selectedTabIndex === index ? "!text-white" : "!text-primary-grey"
                  }`}
                  onClick={() => handleTabClick(index)}>
                  {tab}
                </div>
              ))}
              <div
                className="absolute bottom-0 w-[calc(100%-50%)] h-[40px] bg-primary-green custom-transition rounded-lg"
                style={{ left: `${underlineLeft}%` }}></div>
            </div>
          </div>
          <div>{renderCompositionComponent()}</div>
        </section>
        <section className="w-full">
          <form className="bg-white border-gradient-blue-to-gray-to-r rounded-[28px] px-10 pb-6 space-y-8">
            <div className="relative z-[1] max-w-5xl mx-auto">
              <Dropzone onFileDrop={() => {}} />
              <div className="border-t border-[#EDEEF3] flex items-center justify-between w-full p-10">
                <div className="space-y-3">
                  <h1 className=" text-lg">Remove background</h1>
                  <h1 className="text-primary-grey">Product images with transparent backgrounds give the best results</h1>
                </div>
                <Switch />
              </div>
            </div>
          </form>
          <div className="mt-10 flex flex-col items-center space-y-7">
            <p className="text-[#71799B] text-lg text-center">Or you can try with these photos</p>
            <div className="flex gap-x-4">
              <div className="cursor-pointer bg-white p-3 rounded-2xl hover:shadow-xl transition duration-500">
                <Image src="/images/hand-bag.png" alt="" width={150} height={150} />
              </div>
              <div className="cursor-pointer bg-white p-3 rounded-2xl hover:shadow-xl transition duration-500">
                <Image src="/images/shoes.png" alt="" width={150} height={150} />
              </div>
              <div className="cursor-pointer bg-white p-3 rounded-2xl hover:shadow-xl transition duration-500">
                <Image src="/images/sofa.png" alt="" width={150} height={150} />
              </div>
              <div className="cursor-pointer bg-white p-3 rounded-2xl hover:shadow-xl transition duration-500">
                <Image src="/images/camera.png" alt="" width={150} height={150} />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="bg-primary-green p-3 rounded-full text-white w-fit fixed bottom-0 right-0 m-5 z-[10]">Credits 50 / 50</div>
    </main>
  );
}
