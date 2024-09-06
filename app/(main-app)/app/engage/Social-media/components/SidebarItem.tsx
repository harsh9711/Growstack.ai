import React, { useState } from "react";
import clsx from "clsx";
import Image from "next/image";

interface SidebarItemProps {
  title: string;       // Maps to senderDetails.name
  time: any;        // Maps to created time
  author: string;      // Maps to senderDetails.username
  message: any;     // Maps to message content
  imageUrl: string;    // Maps to senderDetails.profileImage
  onClick?: () => void; 
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  title,
  time,
  author,
  message,
  imageUrl,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const handleItemClick = () => {
    if (onClick) {
      onClick(); 
    }
    setIsOpened(!isOpened);
  };

  return (
    <>
      <div
        className={clsx(
          "flex gap-4 w-full p-4 hover:bg-gray-100 cursor-pointer rounded-md items-center group relative",
          isHovered && "pr-4"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleItemClick}
      >
        <Image
          src={imageUrl || "/default-profile.png"}  // Fallback to default image if no imageUrl
          alt={title || "Profile image"} 
          width={50} 
          height={50} 
          className="-translate-y-1"
        />
        <div className="flex-1">
          <div className="flex flex-row justify-between">
            <h2 className="font-semibold">{title}</h2>
            <h2 className="font-extralight text-sm">{time}</h2>
          </div>
          <h2>{author}</h2>
          <h2 className="font-extralight text-[12px] truncate">{message}</h2>
        </div>
      </div>
     
      <div className="border-[0.5px] border-gray-200 my-1"></div>
    </>
  );
};

export default SidebarItem;
