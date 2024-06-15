import Image from "next/image";
import React, { FC } from "react";
interface Props {
  image_url: string;
  name: string;
}
const VideoTemplateCard: FC<Props> = ({ image_url, name }) => {
  return (
    <div>
      <div className="p-5 space-y-4 bg-white rounded-3xl hover:shadow-xl hover:shadow-[#dddddd94] transition duration-500 cursor-pointer border border-[#D6D6D6] min-w-[274px]">
        <Image src={image_url} alt="" width={400} height={400} className="rounded-2xl max-h-[180px] object-cover" />
        <h1 className="text-xl font-semibold whitespace-nowrap">{name}</h1>
      </div>
    </div>
  );
};

export default VideoTemplateCard;
