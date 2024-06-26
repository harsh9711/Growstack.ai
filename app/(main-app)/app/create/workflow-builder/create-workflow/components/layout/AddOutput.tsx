"use client";

import { AudioIcon, ImageIcon, LongText, ShortText, VideoIcon } from "@/components/svgs";
import clsx from "clsx";
import React, { useState } from "react";
import VideoOutputSection from "./sections/output/VideoOutputSection";
import MarkdownOutputSection from "./sections/output/MarkdownOutputSection";
import AudioOutputSection from "./sections/output/AudioOutputSection";
import PlainTextOutputSection from "./sections/output/PlainTextOutputSection";
import ImageOutputSection from "./sections/output/ImageOutputSection";

export default function Addoutput() {
  const [outputType, setOutputType] = useState("Plain text");
  const outputTypes = [
    {
      icon: <ShortText />,
      name: "Plain text",
    },
    {
      icon: <LongText />,
      name: "Mark down",
    },
    {
      icon: <ImageIcon />,
      name: "Image",
    },
    {
      icon: <AudioIcon />,
      name: "Audio",
    },
    {
      icon: <VideoIcon />,
      name: "Video",
    },
  ];

  const renderOutputSection = () => {
    switch (outputType) {
      case "Plain text":
        return <PlainTextOutputSection />;
      case "Mark down":
        return <MarkdownOutputSection />;
      case "Image":
        return <ImageOutputSection />;
      case "Audio":
        return <AudioOutputSection />;
      case "Video":
        return <VideoOutputSection />;
    }
  };

  return (
    <div className="space-y-4 mt-5">
      <h1 className="text-lg font-semibold">Output type</h1>
      <div className="grid grid-cols-3 gap-3 !mb-6">
        {outputTypes.map((output, index) => (
          <div
            onClick={() => setOutputType(output.name)}
            key={index}
            className={clsx(
              "flex flex-col items-center justify-center gap-3 border border-[#F5F5F5] p-4 rounded-lg text-sm cursor-pointer hover:bg-primary-light-gray/40 transition-all duration-300",
              output.name === outputType && "bg-[#0347371c] border border-primary-green hover:bg-[#0347371d]"
            )}>
            {React.cloneElement(output.icon, { className: "mx-auto" })}
            {output.name}
          </div>
        ))}
      </div>
      {renderOutputSection()}

      <div className="flex justify-end gap-4">
        <button className="py-3 px-6 bg-white border border-[#CF0000] text-[#CF0000] hover:bg-[#cf000009] rounded-xl mt-6">Cancel</button>
        <button className="py-3 px-6 bg-primary-green rounded-xl text-white mt-6 hover:bg-primary-green/90 transition-all duration-300"> Add</button>
      </div>
    </div>
  );
}
