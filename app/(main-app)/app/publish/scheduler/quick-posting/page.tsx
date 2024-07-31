"use client";

import React, { Fragment, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { BsQuestion } from "react-icons/bs";
import QuickPostsTable from "./components/QuickPostsTable";
import ScheduledPostsTable from "./components/ScheduledPostsTable";

export default function QuickPosting() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const tabs = ["Published", "Scheduled"];
  const renderContent = (selectedTabIndex: number) => {
    switch (selectedTabIndex) {
      case 0:
        return <QuickPostsTable />;
      case 1:
        return <ScheduledPostsTable />;
    }
  };
  return (
    <Fragment>
      <div className="flex flex-col h-full flex-1">
        <div className="mt-8">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">Scheduler</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">Quick posting </p>
          </div>
        </div>
        <div className="flex gap-6 w-full">
          <div className="w-full">
            <section className="w-full bg-white rounded-3xl border border-[#EDEFF0] px-10 py-6 mt-6">
              <h1 className="text-xl font-semibold border-b border-primary-black/10 pb-4">Custom message</h1>
              <div className="space-y-3 w-full mt-6">
                <label className="font-medium">
                  Add content <span className="text-[#F00]">*</span>
                </label>
                <textarea placeholder="write something here..." className="h-[129px] w-full bg-[#F2F2F2] rounded-2xl p-3 resize-none" />
              </div>
            </section>
            <section className="w-full bg-white rounded-3xl border border-[#EDEFF0] px-10 py-6 mt-6">
              <h1 className="text-xl font-semibold border-b border-primary-black/10 pb-4">Enable image / video for posting</h1>
              <div className="w-full flex justify-between mt-6">
                <RadioGroup defaultValue="Image" className="w-full flex items-center max-w-[300px]">
                  <div className="flex space-x-2 w-full">
                    <RadioGroupItem value="Image" id="r1" />
                    <label htmlFor="r1">Image</label>
                  </div>
                  <div className="flex space-x-2 w-full">
                    <RadioGroupItem value="Video" id="r2" />
                    <label htmlFor="r2">Video</label>
                  </div>
                </RadioGroup>
                <button className="h-12 w-full max-w-[180px] bg-primary-green py-3 px-4 sheen flex justify-center items-center gap-3 rounded-xl text-white cursor-pointer">
                  <Plus size={20} />
                  <span className="font-medium">Browse...</span>
                </button>
              </div>
            </section>
            <section className="w-full bg-white rounded-3xl border border-[#EDEFF0] px-10 py-6 mt-6">
              <h1 className="text-xl font-semibold border-b border-primary-black/10 pb-4">Link</h1>
              <div className="w-full flex justify-between mt-6">
                <div className="space-y-3 w-full">
                  <label className="flex items-center gap-1 w-1/5 min-w-[400px] font-medium">Link </label>{" "}
                  <Input type="text" placeholder="Content share link" className="w-full rounded-full" />
                </div>
              </div>
            </section>
            <section className="w-full bg-white rounded-3xl border border-[#EDEFF0] px-10 py-6 mt-6">
              <h1 className="text-xl font-semibold border-b border-primary-black/10 pb-4">Networks</h1>
              <div className="w-full flex justify-between mt-6 pb-6 border-b border-[#EDEFF0]">
                <label className="font-medium">Facebook</label>
                <Switch defaultChecked={true} />
              </div>
              <div className="w-full flex justify-between mt-6 pb-6 border-b border-[#EDEFF0]">
                <label className="font-medium">Twitter</label>
                <Switch defaultChecked={true} />
              </div>
              <div className="w-full flex justify-between mt-6 pb-6 border-b border-[#EDEFF0]">
                <label className="font-medium">LinkedIn</label>
                <Switch />
              </div>
              <div className="w-full flex justify-between mt-6 pb-6 border-b border-[#EDEFF0]">
                <label className="font-medium">Instagram</label>
                <Switch />
              </div>

              {/* <div className="w-full flex justify-between mt-6 pb-6 border-b border-[#EDEFF0]">
                <label className="font-medium">Tumblr</label>
                <Switch />
              </div>
              <div className="w-full flex justify-between mt-6 pb-6 border-b border-[#EDEFF0]">
                <label className="font-medium">Pinterest</label>
                <Switch defaultChecked={true} />
              </div>
              <div className="w-full flex justify-between mt-6 pb-6 border-b border-[#EDEFF0]">
                <label className="font-medium">Google my business</label>
                <Switch defaultChecked={true} />
              </div>
              <div className="w-full flex justify-between mt-6 pb-6 border-b border-[#EDEFF0]">
                <label className="font-medium">Reddit</label>
                <Switch />
              </div> */}
            </section>

            <section className="w-full bg-white rounded-3xl border border-[#EDEFF0] px-10 py-6 mt-6">
              <h1 className="text-xl font-semibold border-b border-primary-black/10 pb-4 flex items-center gap-1">
                Schedule global <BsQuestion size={24} className="text-primary-green" />
              </h1>
              <div className="w-full flex justify-between mt-6">
                <div className="space-y-3 w-full">
                  <label className="flex items-center gap-1 w-1/5 min-w-[400px] font-medium">Link </label>{" "}
                  <div className="flex gap-4">
                    <div
                      className="flex gap-2 items-center h-14 w-full rounded-full bg-[#F5F5F5] px-4 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm
                    file:font-medium placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="#034737" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12 7V12L15 15" stroke="#034737" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <input type="text" className="w-full bg-transparent outline-none" />
                    </div>
                    <button className="h-14 w-full max-w-[140px] bg-primary-green py-3 px-4 sheen flex justify-center items-center gap-3 rounded-xl text-white cursor-pointer">
                      Publish
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="w-full">
            <section className="w-full bg-white rounded-3xl border border-[#EDEFF0] px-10 py-6 mt-6">
              <div className="w-full flex relative mb-5">
                {tabs.map((tab, index) => (
                  <div
                    key={index}
                    className={`w-full h-[48px] flex gap-x-2 justify-center items-center relative cursor-pointer z-[1] transition-all duration-500 ${
                      selectedTabIndex === index ? "!text-white" : "!text-primary-grey"
                    }`}
                    onClick={() => {
                      const totalTabs = tabs.length;
                      const percentage = (index / totalTabs) * 100;
                      setSelectedTabIndex(index);
                      setTabUnderlineLeft(percentage);
                    }}>
                    {tab}
                  </div>
                ))}
                <div
                  className="absolute bottom-0 h-[48px] bg-primary-green custom-transition rounded-lg"
                  style={{ left: `calc(${tabUnderlineLeft}%)`, width: `${100 / tabs.length}%` }}></div>
              </div>
              {renderContent(selectedTabIndex)}
            </section>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
