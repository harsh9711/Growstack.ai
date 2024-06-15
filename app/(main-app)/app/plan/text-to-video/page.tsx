"use client";

import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import Image from "next/image";
import { ai_video_templates } from "./components/data/templates";
import VideoTemplateCard from "./components/VideoTemplateCard";
import CreateVideoDialog from "./components/CreateVideoDialog";

export default function TextToVideoPage() {
  return (
    <Fragment>
      <main className="">
        <div className="flex justify-between items-center mt-8">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">Text to video</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">Featured template</p>
          </div>
          <div className="w-full flex justify-end gap-2">
            <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md">
              <Search className="text-gray-500" size={20} />
              <input type="search" className="outline-none h-[40px] w-full" placeholder="Search template" />
            </div>
            <Link href="/app/plan/text-to-video/new">
              <button className="bg-primary-green text-white sheen transition duration-500 px-5 py-4 rounded-xl flex items-center gap-2">My videos</button>
            </Link>
            <CreateVideoDialog />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-5 mt-8">
          {ai_video_templates.map((data, index) => (
            <VideoTemplateCard {...data} key={index} />
          ))}
        </div>
      </main>
    </Fragment>
  );
}
