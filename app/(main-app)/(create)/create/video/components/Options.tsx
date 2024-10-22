"use client";

import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Scene } from "./types";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const predefinedColors = [
  "off_white",
  "warm_white",
  "light_pink",
  "soft_pink",
  "light_blue",
  "dark_blue",
  "soft_cyan",
  "strong_cyan",
  "light_orange",
  "soft_orange",
];

const colorMap: { [key: string]: string } = {
  off_white: "#F5F5F5",
  warm_white: "#FFF8E7",
  light_pink: "#FFC0CB",
  soft_pink: "#FFB6C1",
  light_blue: "#ADD8E6",
  dark_blue: "#00008B",
  soft_cyan: "#E0FFFF",
  strong_cyan: "#00CED1",
  light_orange: "#FFA07A",
  soft_orange: "#FFDAB9",
};

const soundtracks = ["corporate", "inspirational", "modern", "urban"];

export default function Options({
  currentScene,
  backgroundColor,
  setBackgroundColor,
  soundTrack,
  setSoundTrack,
}: {
  currentScene: Scene;
  backgroundColor: string;
  setBackgroundColor: (value: string) => void;
  soundTrack: string;
  setSoundTrack: (value: string) => void;
}) {
  const [isMusicEnabled, setIsMusicEnabled] = useState<boolean>(false);

  return (
    <div className="!bg-white shadow-box !rounded-xl w-full max-w-[320px] p-4">
      <h3 className="text-xl font-bold">{currentScene?.title}</h3>
      <div className="mt-6 space-y-5">
        <select className="border p-2 rounded w-full">
          <option>Replace layout</option>
        </select>
        <div className="mb-2">
          <span>Background Color</span>
          <div className="flex flex-wrap gap-3 mt-2 ">
            {predefinedColors.map(color => (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      key={color}
                      title="color"
                      onClick={() => setBackgroundColor(color)}
                      className={`cursor-pointer w-8 h-8 rounded-full border-2 transition-all duration-300 ${backgroundColor === color ? "border-blue-500 ring-2" : "border-transparent"}`}
                      style={{ backgroundColor: colorMap[color] }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{color}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
        <label className="mb-2 flex justify-between">
          Background Media
          <Switch />
        </label>
        <label className="mb-2 flex justify-between">
          Music
          <Switch
            checked={isMusicEnabled}
            onCheckedChange={setIsMusicEnabled}
          />
        </label>
        <AnimatePresence>
          {isMusicEnabled && (
            <motion.div
              initial={{ translateY: 12, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              exit={{ translateY: 12, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden mt-4 bg-gray-50 p-4 rounded-xl"
            >
              <span className="font-medium">Select Soundtrack</span>
              <div className="flex flex-wrap gap-3 mt-3">
                {soundtracks.map(soundtrack => (
                  <div
                    key={soundtrack}
                    onClick={() => setSoundTrack(soundtrack)}
                    className={`cursor-pointer py-1.5 px-4 rounded-lg transition-all duration-200 capitalize ${soundTrack === soundtrack ? "bg-primary-green text-white" : "bg-gray-200"}`}
                  >
                    {soundtrack}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
