import Image from "next/image";
import React, { FC } from "react";
import { Template } from "./types";


const VideoTemplateCard: FC<Template> = ({ id, variables, title: name }) => {
  return (
    <div>
      <div className="p-5 space-y-4 bg-white rounded-3xl hover:shadow-xl hover:shadow-[#dddddd94] transition duration-500 cursor-pointer border border-[#D6D6D6] min-w-[274px]">
        <div className="relative w-full h-[180px] rounded-2xl overflow-hidden">
          <Image src="/assets/ai_video_templates/Business Update Template.png" alt={name} layout="fill" objectFit="cover" />
        </div>
        <h1 className="text-xl font-semibold whitespace-nowrap">{name}</h1>
      </div>
    </div>
  );
};

export default VideoTemplateCard;
