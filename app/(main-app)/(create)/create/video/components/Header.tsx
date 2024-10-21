// components/Navbar.tsx
"use client";

import { CloudSaveIcon } from "@/components/svgs";
import {
  ChevronDown,
  ChevronLeft,
  Pause,
  Play,
  Redo2,
  Undo2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import AvatarDropdown from "./dropdowns/AvatarDropdown";
import MediaDropdown from "./dropdowns/MediaDropdown";
import ShapesDropdown from "./dropdowns/ShapesDropdown";
import TextDropdown from "./dropdowns/TextDropdown";
import { VideoData } from "./types";

interface Props {
  generatedVideoDetails: {
    videoData: VideoData;
  };
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  handleSubmit: (avatarId: string) => Promise<void>;
  selectedAvatarId: string;
  setSelectedAvatarId: (avatarId: string) => void;
  loading: boolean;
}

const Header: React.FC<Props> = ({
  generatedVideoDetails,
  handleSubmit,
  isPlaying,
  setIsPlaying,
  loading,
  selectedAvatarId,
  setSelectedAvatarId,
}) => {
  const router = useRouter();
  return (
    <header className="bg-primary-green flex justify-between px-5 py-2 rounded-2xl text-white text-[15px]">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="hover:bg-[#fff]/10 p-1.5 rounded-lg transition-all duration-300"
        >
          <ChevronLeft />
        </button>
        <div className="h-5 w-[1px] bg-white rounded-full" />
        <button
          title={generatedVideoDetails.videoData.title}
          className="flex items-center gap-4 hover:bg-[#fff]/20 px-3 py-2 rounded-lg transition-all duration-300 text-[14px]"
        >
          {generatedVideoDetails.videoData.title ? (
            <>
              {generatedVideoDetails.videoData.title.slice(0, 12)}
              {generatedVideoDetails.videoData.title.length > 12 && "..."}{" "}
              <ChevronDown size={18} />
            </>
          ) : (
            "Untitled"
          )}
        </button>
        <div className="h-5 w-[1px] bg-white rounded-full" />
        <div className="flex items-center gap-1">
          <button className="hover:bg-[#fff]/10 p-2 rounded-md transition-all duration-300">
            <Undo2 size={20} />
          </button>
          <button className="hover:bg-[#fff]/10 p-2 rounded-md transition-all duration-300">
            <Redo2 size={20} />
          </button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <AvatarDropdown
          onAvatarSelect={handleSubmit}
          setSelectedAvatarId={setSelectedAvatarId}
        />
        <TextDropdown />
        <ShapesDropdown />
        <MediaDropdown />
      </div>
      <div className="flex items-center space-x-4">
        <button className="hover:bg-[#fff]/20 p-2.5 rounded-lg transition-all duration-300">
          <CloudSaveIcon className="scale-105" />
        </button>
        <div className="h-5 w-[2px] bg-white rounded-full" />
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-[#fff]/20 text-white/80 h-10 w-10 flex justify-center items-center rounded-lg transition-all duration-300"
        >
          {isPlaying ? <Pause /> : <Play size={22} />}
        </button>
        <button
          onClick={() => handleSubmit(selectedAvatarId)}
          className="!ml-2 bg-white text-primary-green h-10 px-6 font-medium rounded-lg"
        >
          Generate
        </button>
      </div>
    </header>
  );
};

export default Header;
