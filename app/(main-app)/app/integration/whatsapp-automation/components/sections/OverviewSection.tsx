import Motion from "@/components/Motion";
import Image from "next/image";
import React from "react";
import AudienceGrowthChart from "../graphs/AudienceGrowthChart";

export default function OverviewSection() {
  return (
    <Motion transition={{ duration: 0.5 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <div className="mt-8">
        <div className="grid grid-cols-4 gap-5">
          <div className="bg-white p-7 rounded-3xl flex items-center shadow-2xl shadow-gray-100 hover:shadow-gray-200 cursor-pointer transition-all duration-500">
            <div className="w-full space-y-5">
              <p className="text-[#4B4B4B] text-opacity-70">Total contacts</p>
              <h1 className="text-4xl font-medium">3</h1>
            </div>
            <Image src="/icons/contacts.svg" alt="" width={80} height={80} className="select-none" />
          </div>
          <div className="bg-white p-7 rounded-3xl flex items-center shadow-2xl shadow-gray-100 hover:shadow-gray-200 cursor-pointer transition-all duration-500">
            <div className="w-full space-y-5">
              <p className="text-[#4B4B4B] text-opacity-70">Active contacts</p>
              <h1 className="text-4xl font-medium">100%</h1>
            </div>
            <Image src="/icons/block.svg" alt="" width={80} height={80} className="select-none" />
          </div>
          <div className="bg-white p-7 rounded-3xl flex items-center shadow-2xl shadow-gray-100 hover:shadow-gray-200 cursor-pointer transition-all duration-500">
            <div className="w-full space-y-5">
              <p className="text-[#4B4B4B] text-opacity-70">Read rate</p>
              <h1 className="text-4xl font-medium">0%</h1>
            </div>
            <Image src="/icons/trend-up.svg" alt="" width={80} height={80} className="select-none" />
          </div>
          <div className="bg-white p-7 rounded-3xl flex items-center shadow-2xl shadow-gray-100 hover:shadow-gray-200 cursor-pointer transition-all duration-500">
            <div className="w-full space-y-5">
              <p className="text-[#4B4B4B] text-opacity-70">Blacklist</p>
              <h1 className="text-4xl font-medium">0</h1>
            </div>
            <Image src="/icons/clock.svg" alt="" width={80} height={80} className="select-none" />
          </div>
        </div>{" "}
        <div className="bg-white p-10 rounded-3xl mt-5 space-y-7 shadow-2xl shadow-gray-100">
          <h1 className="text-2xl font-semibold">Audience growth</h1>
          <div className="h-[350px]">
            <AudienceGrowthChart />
          </div>
        </div>
      </div>
    </Motion>
  );
}
