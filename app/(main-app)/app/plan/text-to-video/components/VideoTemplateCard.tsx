import Image from "next/image";
import React, { FC } from "react";

interface Props {
  image_url: string;
  title: string;
}

const VideoTemplateCard: FC<Props> = ({ image_url, title }) => {
  return (
    <div>
      <div className="p-5 space-y-4 bg-white rounded-3xl hover:shadow-xl hover:shadow-[#dddddd94] transition duration-500 cursor-pointer border border-[#D6D6D6] min-w-[274px]">
        <div className="relative w-full h-[180px] rounded-2xl overflow-hidden">
          <Image src={image_url} alt={title} layout="fill" objectFit="cover" />
        </div>
        <h1 className="text-xl font-semibold whitespace-nowrap">{title}</h1>
      </div>
    </div>
  );
};

export default VideoTemplateCard;
