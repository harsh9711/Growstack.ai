import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MicrophoneIcon, StopIcon } from "@/components/svgs";
import "../../../../../../styles/waveform.css";

interface MicrophoneProps {
  open: boolean;
  isAnimating: boolean;
  handleOpenChange: (status: boolean) => void;
}

const NUM_WAVES = 40; // Number of wave elements

export default function Microphone({
  open,
  handleOpenChange,
  isAnimating,
}: MicrophoneProps) {
  return (
    <DropdownMenu open={open} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          onClick={() => handleOpenChange(!open)}
          className="h-12 w-12 flex justify-center items-center bg-[#2DA771] hover:bg-opacity-90 transition-all duration-300 text-white rounded-xl"
        >
          {isAnimating ? <StopIcon /> : <MicrophoneIcon />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="!shadow-2xl !shadow-gray-900/20 mr-20 p-4 min-w-[20rem]">
        <div className="waveform">
          {Array.from({ length: NUM_WAVES }).map((_, index) => (
            <div
              key={index}
              className={`wave ${!isAnimating ? "stop-animation" : ""}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            ></div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
