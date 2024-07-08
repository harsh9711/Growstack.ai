import React, { useState } from "react";
import clsx from "clsx";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

interface SidebarItemProps {
  title: string;
  author: string;
  imageUrl: string;
}

const SidebarAccount: React.FC<SidebarItemProps> = ({
  title,
  author,
  imageUrl,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const toggleActiveState = () => {
    setIsActive(!isActive);
    if (!isActive) {
      toast.success(`Notification: ${title} is active.`);
    } else {
      toast.warning(`Notification: ${title} is inactive.`);
    }
  };

  return (
    <>
      <div
        className={clsx(
          "flex gap-4 w-full p-4 hover:bg-gray-100 cursor-pointer rounded-md items-center group relative",
          isHovered && "pr-4",
          !isActive && "opacity-50" // Fade out if not active
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image src={imageUrl} alt="contact" width={60} height={50} />
        <div className="flex flex-row items-center gap-16 justify-between flex-grow">
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold text-md">{title}</h2>
            <h2 className="text-md font-medium">{author}</h2>
          </div>
          <div className="flex flex-row gap-2">
            {isActive ? (
              <FaRegEye
                className="text-2xl cursor-pointer"
                onClick={toggleActiveState}
              />
            ) : (
              <FaRegEyeSlash
                className="text-2xl cursor-pointer"
                onClick={toggleActiveState}
              />
            )}
            <BsThreeDotsVertical className="text-2xl" />
          </div>
        </div>
      </div>
      <div className="border border-gray-300 my-1"></div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </>
  );
};

export default SidebarAccount;
