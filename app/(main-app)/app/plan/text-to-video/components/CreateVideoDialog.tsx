"use client";

import { VideoMedia } from "@/components/svgs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronRight, Plus } from "lucide-react";
import { useState } from "react";
import { TbTemplate } from "react-icons/tb";
import GenerateVideoDialog from "./GenerateVideoDialog";
import PptDialog from "./PptDialog";
import VideoTemplateCard from "./VideoTemplateCard";
import { Template } from "./types";
import Link from "next/link";
import TemplateLoader from "./TemplateLoader";

const CreateVideoDialog = ({ templates }: { templates: Array<Template> | null }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [selectedOrientationIndex, setSelectedOrientationIndex] = useState(0);

  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const [orientUnderlineLeft, setOrientUnderlineLeft] = useState(0);

  const tabs = [
    { icon: null, title: "Company Name" },
    { icon: null, title: "Library" },
  ];
  const orientations = ["All", "Landscape", "Portrait", "Square"];
  const [isPptModalOpen, setIsPptModalOpen] = useState(false);
  const [isGenerateVideoWithAI, setGenerateVideoWithAI] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-primary-green text-white sheen transition duration-500 px-5 py-3.5 rounded-xl flex items-center gap-2">
          <Plus size={20} />
          Create new video
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[90%] h-[90vh] flex flex-col pt-0">
        <div className="relative w-full space-y-4 h-full flex-1 flex flex-col text-[15px]">
          <section className="w-full pt-8 pb-4 px-10 bg-white space-y-6 border-b border-primary-light-gray">
            <h1 className="text-2xl font-semibold">Create a new video</h1>
            <div className="flex gap-8 w-full">
              <Link href="/create/video" className="w-full">
                <div className="w-full hover-card flex items-center justify-between transition duration-500 ring-1 ring-[#E7E7E7] p-6 rounded-2xl cursor-pointer group">
                  <div className="space-y-3">
                    <h1 className="text-[18px] font-semibold">Blank Video</h1>
                    <p className="text-primary-neutral">Start from scratch with a blank canvas</p>
                  </div>
                  <VideoMedia className="text-primary-neutral group-hover:text-primary-green transition duration-300" />
                </div>
              </Link>
              <GenerateVideoDialog />
              <PptDialog />
            </div>
            <div className="flex justify-between">
              <div className="w-full flex gap-x-4 items-center">
                <div className="flex gap-x-2 items-center">
                  <div className="p-2 bg-white rounded-[8px] cursor-pointer hover:shadow transition duration-500">
                    <TbTemplate size={26} className="text-primary-green" />
                  </div>
                  <span className="text-primary-green font-semibold text-lg">Use Template</span>
                  <ChevronRight size={25} className="filter grayscale opacity-60" />
                </div>
                <div className="border border-[#DBDBDB] bg-white p-1 rounded-xl">
                  <div className="flex relative">
                    {tabs.map(({ icon, title }, index) => (
                      <div
                        key={index}
                        className={`w-[160px] h-[45px] flex gap-x-2 justify-center items-center relative cursor-pointer z-[1] transition-all duration-500 ${
                          selectedTabIndex === index ? "!text-white" : "!text-primary-grey"
                        }`}
                        onClick={() => {
                          const totalTabs = tabs.length;
                          const percentage = (index / totalTabs) * 100;
                          setSelectedTabIndex(index);
                          setTabUnderlineLeft(percentage);
                        }}>
                        {icon}
                        {title}
                      </div>
                    ))}
                    <div
                      className="absolute bottom-0 w-[160px] h-[45px] bg-primary-green custom-transition rounded-lg"
                      style={{ left: `calc(${tabUnderlineLeft}%)` }}></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="border border-[#DBDBDB] bg-white p-1 rounded-xl">
                  <div className="flex relative">
                    {orientations.map((item, index) => (
                      <div
                        key={index}
                        className={`w-[120px] h-[45px] flex gap-x-2 justify-center items-center relative cursor-pointer z-[1] transition-all duration-500 ${
                          selectedOrientationIndex === index ? "!text-white" : "!text-primary-grey"
                        }`}
                        onClick={() => {
                          const totalTabs = tabs.length;
                          const percentage = (index / totalTabs) * 100;
                          setSelectedOrientationIndex(index);
                          setOrientUnderlineLeft(percentage);
                        }}>
                        {item}
                      </div>
                    ))}

                    <div
                      className="absolute bottom-0 w-[120px] h-[45px] bg-primary-green custom-transition rounded-lg"
                      style={{ left: `calc(${orientUnderlineLeft}% - ${orientUnderlineLeft / 2}%)` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <main className="flex-1 h-full w-full px-10 pb-10 mx-auto relative overflow-y-auto">
            <section className="grid grid-cols-4 gap-6">
              {!templates
                ? Array(10)
                    .fill(null)
                    .map((_, index) => <TemplateLoader key={index} />)
                : templates.map((template) => <VideoTemplateCard key={template.id} {...template} />)}
            </section>
          </main>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateVideoDialog;
