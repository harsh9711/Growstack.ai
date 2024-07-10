"use client";

import { CloudSaveIcon, MediaIcon, ShapesIcon, TextIcon } from "@/components/svgs";
import { ChevronDown, ChevronLeft, Play, Redo2, Undo2, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Layout from "./Layout";

export default function CreateVideoPage() {
  const router = useRouter();
  return (
    <div className="p-3 flex-1 h-screen flex flex-col gap-4">
      <header className="bg-primary-green flex justify-between px-5 py-2 rounded-2xl text-white text-[15px]">
        <div className="flex items-center gap-6">
          <button onClick={() => router.back()} className="hover:bg-[#fff]/20 p-2 rounded-lg transition-all duration-300">
            <ChevronLeft />
          </button>
          <div className="h-5 w-[1px] bg-white rounded-full" />
          <button className="flex items-center gap-4 hover:bg-[#fff]/20 px-3 py-2 rounded-lg transition-all duration-300 text-[14px]">
            Untitled <ChevronDown size={18} />
          </button>
          <div className="h-5 w-[1px] bg-white rounded-full" />
          <div className="flex items-center gap-1">
            <button className="hover:bg-[#fff]/20 p-2 rounded-lg transition-all duration-300">
              <Undo2 size={20} />
            </button>
            <button className="hover:bg-[#fff]/20 p-2 rounded-lg transition-all duration-300">
              <Redo2 size={20} />
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex flex-col gap-2 text-[15px] items-center text-white/90 justify-center py-2 w-[70px] hover:bg-[#fff]/20 rounded-lg cursor-pointer transition-all duration-300">
            <UserCircle size={23} className="text-white/80" />
            Avatar
          </div>
          <div className="flex flex-col gap-2 text-[15px] items-center text-white/90 justify-center py-2 w-[70px] hover:bg-[#fff]/20 rounded-lg cursor-pointer transition-all duration-300">
            <TextIcon size={25} className="text-white/80" />
            Text
          </div>
          <div className="flex flex-col gap-2 text-[15px] items-center text-white/90 justify-center py-2 w-[70px] hover:bg-[#fff]/20 rounded-lg cursor-pointer transition-all duration-300">
            <ShapesIcon size={25} className="text-white/80" />
            Shape
          </div>
          <div className="flex flex-col gap-2 text-[15px] items-center text-white/90 justify-center py-2 w-[70px] hover:bg-[#fff]/20 rounded-lg cursor-pointer transition-all duration-300">
            <MediaIcon size={25} className="text-white/80" />
            Media
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="hover:bg-[#fff]/20 p-2.5 rounded-lg transition-all duration-300">
            <CloudSaveIcon className="scale-105" />
          </button>
          <div className="h-5 w-[2px] bg-white rounded-full" />
          <button className="bg-[#fff]/20 text-white/80 h-10 w-10 flex justify-center items-center rounded-lg transition-all duration-300">
            <Play size={22} />
          </button>
          <button className=" !ml-2 bg-white text-primary-green h-10 px-6 font-medium rounded-lg">Generate</button>
        </div>
      </header>
      {/* <div className="!bg-white shadow-box h-full w-full max-w-[112px] p-4">
          <h1 className="font-medium">Scenes</h1>
        </div>
        <div className="!bg-white shadow-box h-full w-full flex-1 p-4"></div> */}
      <Layout />
    </div>
  );
}
