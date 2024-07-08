import React, { useState } from "react";
import clsx from "clsx";
import { MessageIcon2 } from "@/components/svgs";
import { Trash2 } from "lucide-react";
import Image from "next/image";

interface SidebarItemProps {
  title: string;
  time: string;
  author: string;
  message: string;
    imageUrl: string;

}

const SidebarItem: React.FC<SidebarItemProps> = ({
  title,
  time,
  author,
  message,
    imageUrl,

}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        className={clsx(
          "flex gap-4 w-full p-4 hover:bg-gray-100 cursor-pointer rounded-full items-center group relative",
          isHovered && "pr-4"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image src={imageUrl} alt="contact" width={50} height={50} className="-translate-y-1" />
        <div className="flex-1">
          <div className="flex flex-row justify-between ">
            <h2 className="font-semibold">{title}</h2>
            <h2 className="font-extralight text-sm">{time}</h2>
          </div>
          <h2>{author}</h2>
          <h2 className="font-extralight text-sm">{message}</h2>
        </div>
      </div>
     
      <div className="h-0.5 bg-gray-300 my-1"></div>
    </>
  );
};

export default SidebarItem;
