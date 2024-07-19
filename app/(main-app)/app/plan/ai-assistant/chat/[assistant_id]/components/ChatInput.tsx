import { MicrophoneIcon, SendIcon2 } from "@/components/svgs";
import autosize from "autosize";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import axios from "@/config/axios.config";
import { toast } from "react-hot-toast";
import { API_URL } from "@/lib/api";

interface ChatInputProps {
  assistant_id: string;
  addMessage: (prompt: string, response: string) => void;
  updateMessage: (prompt: string, response: string) => void;
  selectedLanguage: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ assistant_id, addMessage, updateMessage, selectedLanguage }) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
  }, []);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const user_prompt = input.trim();
    setInput("");
    addMessage(user_prompt, "");

    try {
      const response = await axios.post(`/ai/api/v1/assistant/chat/${assistant_id}`, {
        user_prompt,
        language: selectedLanguage,
        tone: "friendly",
        writing_style: "poetic",
      });

      updateMessage(user_prompt, response.data.data.response)

    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex p-2 border gap-2 rounded-xl items-end">
      <Image src="/logo/growstack-mini.svg" alt="" width={25} height={25} draggable={false} className="select-none ml-2 mb-3" />
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        className="w-full flex-1 p-2 bg-transparent resize-none overflow-hidden min-h-11 max-h-[300px]"
        placeholder="What's in your mind?"
      />
      <button className="h-12 w-12 flex justify-center items-center bg-primary-green hover:bg-opacity-90 transition-all duration-300 text-white rounded-xl">
        <MicrophoneIcon />
      </button>
      <button
        onClick={handleSend}
        className="h-12 w-12 flex justify-center items-center bg-primary-green hover:bg-opacity-90 transition-all duration-300 text-white rounded-xl">
        <SendIcon2 />
      </button>
    </div>
  );
};

export default ChatInput;
