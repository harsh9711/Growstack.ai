import { MicrophoneIcon, SendIcon2 } from "@/components/svgs";
import autosize from "autosize";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_URL } from "@/lib/api";
import toast from "react-hot-toast";
import ToolsDialog from "../../../ai-chat/components/ToolsDialog";


interface ChatInputProps {
  onSend: () => void;
}
const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  return (
    <div className="shadow-lg p-1 flex  border gap-2 rounded-xl items-end">
      <Image
        src="/logo/growstack-mini.svg"
        alt=""
        width={25}
        height={25}
        draggable={false}
        className="select-none ml-2 mb-2"
      />
      <textarea
     
        rows={1}
        className="w-full flex-1 p-2 bg-transparent resize-none overflow-auto 
        "
        placeholder="Message GPT builder..."
      />
    
     
      <button
       
        className="h-8 w-8 flex  -translate-y-1 -translate-x-1 justify-center items-center bg-primary-green hover:bg-opacity-90 transition-all duration-300 text-white rounded-xl"
      >
        <SendIcon2 />
      </button>
    </div>
  );
};

export default ChatInput;
