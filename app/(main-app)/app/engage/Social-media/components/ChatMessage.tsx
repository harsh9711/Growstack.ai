import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@radix-ui/react-select";
import clsx from "clsx";
import React from "react";
import { BsPlus } from "react-icons/bs";
import { options } from "../../../analyse/reputation-manager/layouts/subsections/components/graphs/LineGraph";
import SidebarAccount from "./SidebarAccount";

interface ChatMessageProps {
  message: React.ReactNode; // Changed to React.ReactNode
  imageUrl: string;
  title: string;
  time: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message,  imageUrl = "/contact2.png", title = "Growstack AI", time = "Vale Ferreira" }) => {
  return (
   <div className="flex flex-row"><div className="flex  flex-col items-start my-4 ">

        <div className="flex flex-row gap-4">
          <img src={imageUrl} alt="contact" width={50} height={50} className="-translate-y-1 " />
        <div className="flex flex-col">  <h2 className="text-md font-semibold text-center">{title}</h2>
          <p className="text-[12px] font-light">{time}</p></div>
        </div>
          <div className="flex flex-col items-end translate-x-14">
            <p className="py-2 px-4 bg-white max-w-[500px] rounded-lg text-sm">
              {message}
            </p>
          </div>
    </div>
  </div> 
  );
};

export default ChatMessage;
