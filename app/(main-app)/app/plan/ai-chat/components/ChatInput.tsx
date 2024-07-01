import { MicrophoneIcon, SendIcon2 } from "@/components/svgs";
import autosize from "autosize";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ToolsDialog from "./ToolsDialog";
import axios from 'axios';
import { API_URL } from "@/lib/api";

interface ChatInputProps {
  onSend: (message: string) => void;
  selectedModel: string;
 
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, selectedModel }) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [chatId, setChatId] = useState("");

  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
  }, []);

  const handleSend = async () => {
    if (input.trim()) {
      console.log("Sending API requests...");

      try {
        // Check if chatId is not set and toCall is true
        if (!chatId) {
          const createResponse = await axios.get(`${API_URL}/ai/api/v1/conversation/create`);
          console.log("Create Conversation API response:", createResponse.data.data._id);
          setChatId(createResponse.data.data._id);
        }

        // if (chatId) {
          // Second API call to send a message to the created conversation
          const chatResponse = await axios.post(
            `${API_URL}/ai/api/v1/conversation/chat`,
            {
              user_prompt: input,
            },
            {
              params: {
                conversation_id: chatId,
                model: selectedModel,
              },
            }
          );

          console.log("Chat API response:", chatResponse.data);
          onSend(input);

          setTimeout(() => {
            onSend(chatResponse.data);
          }, 1000);

          setInput("");

          if (textareaRef.current) {
            autosize.update(textareaRef.current);
          }
        // }
      } catch (error) {
        console.error('Error calling APIs:', error);
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
      <ToolsDialog />
      <button
        className="h-12 w-12 flex justify-center items-center bg-primary-green hover:bg-opacity-90 transition-all duration-300 text-white rounded-xl">
        <MicrophoneIcon />
      </button>
      <button
        onClick={handleSend}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend();
          }
        }}
        className="h-12 w-12 flex justify-center items-center bg-primary-green hover:bg-opacity-90 transition-all duration-300 text-white rounded-xl">
        <SendIcon2 />
      </button>
    </div>
  );
};

export default ChatInput;
