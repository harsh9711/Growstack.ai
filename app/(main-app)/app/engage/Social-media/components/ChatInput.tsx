import { MicrophoneIcon, SendIcon2 } from "@/components/svgs";
import autosize from "autosize";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ToolsDialog from "./ToolsDialog";
import axios from 'axios';
import { API_URL } from "@/lib/api";

interface ChatInputProps {
  onSend: (message: string,isUser:boolean,id:string|null) => void;
  selectedModel: string;
  fetchConversations: () => void;
  selectedConversation:string | null;
  selectedOption:string
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, selectedModel, fetchConversations, selectedConversation, selectedOption }) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
  }, []);

  const handleSend = async () => {
    if (input.trim()) {
      console.log("Sending API requests...");

      try {
        // Check if chatId is not set, fetch a new chatId
        const conversation = await axios.post(`${API_URL}/ai/api/v1/conversation/chat?conversation_id=${selectedConversation ? selectedConversation : ''}&model=${selectedOption}`,{user_prompt:input});
        onSend(input, true, null);
        setInput("");
          // setConversationId(createResponse.data.data._id); // Set chatId from API response
        if (!selectedConversation) fetchConversations();

        const eventSource = new EventSource(
          `${API_URL}/ai/api/v1/conversation/chat/stream/${conversation.data.data.chat_id}`
        );

        var content = "";
      eventSource.onerror = (event) => {
        eventSource.close();
      };

      eventSource.onmessage = (event) => {
        const data = event.data;
        content += data;
        onSend(content, false, conversation.data.data.conversation_id);
      };

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
        className="h-12 w-12 flex justify-center items-center bg-primary-green hover:bg-opacity-90 transition-all duration-300 text-white rounded-xl"
        // onClick={() => setChatId(null)} // Reset chatId to fetch new conversation when clicked
      >
        <MicrophoneIcon />
      </button>
      <button
        onClick={handleSend}
        className="h-12 w-12 flex justify-center items-center bg-primary-green hover:bg-opacity-90 transition-all duration-300 text-white rounded-xl"
      >
        <SendIcon2 />
      </button>
    </div>
  );
};

export default ChatInput;
