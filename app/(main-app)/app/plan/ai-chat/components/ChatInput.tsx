import { MicrophoneIcon, SendIcon2 } from "@/components/svgs";
import autosize from "autosize";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ToolsDialog from "./ToolsDialog";
import axios from "axios";
import { API_URL } from "@/lib/api";
import toast from "react-hot-toast";

interface ChatInputProps {
  onSend: (content: string, role: string) => void;
  selectedModel: string;
  fetchConversations: () => void;
  selectedConversation: string | null;
  selectedOption: string;
  addMessage: (role: string, content: string, loading: boolean) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  selectedModel,
  fetchConversations,
  selectedConversation,
  selectedOption,
  addMessage,
}) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
      textareaRef.current.style.overflow = "auto";
    }
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.overflow = "auto";
    }
  }, [input]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const user_prompt = input.trim();
    setInput("");
    addMessage("user", user_prompt, false);
    addMessage("assistant", "", true);
    try {
      const conversation = await axios.post(
        `${API_URL}/ai/api/v1/conversation/chat?conversation_id=${
          selectedConversation ? selectedConversation : ""
        }&model=${selectedOption}`,
        { user_prompt: input }
      );
      if (!selectedConversation) fetchConversations();

      const eventSource = new EventSource(
        `${API_URL}/ai/api/v1/conversation/chat/stream/${conversation.data.data.chat_id}`
      );

      var content = ``;
      let isStreamClosed = false;
      eventSource.onerror = (event) => {
        eventSource.close();
        isStreamClosed = true;
      };

      eventSource.onmessage = (event) => {
        const data = event.data;
        content += data;
        onSend(content, "assistant")
      };

      eventSource.close = () => {
        if (!isStreamClosed) {
          onSend(content, "assistant");
          isStreamClosed = true;
        }
      };
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
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

  const promptInput = (description: string) => {
    const trimmedDescription = description.replace(/\s+/g, " ").trim();
    const newInput = `${input} ${trimmedDescription}`;
    setInput(newInput);
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.value = newInput;
        textareaRef.current.focus();
        textareaRef.current.selectionStart = textareaRef.current.selectionEnd =
          newInput.length;
      }
    }, 500);
  };

  return (
    <div className="flex p-2 border gap-2 rounded-xl items-end">
      <Image
        src="/logo/growstack-mini.svg"
        alt=""
        width={25}
        height={25}
        draggable={false}
        className="select-none ml-2 mb-3"
      />
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        className="w-full flex-1 p-2 bg-transparent resize-none overflow-auto min-h-11 max-h-[300px]"
        placeholder="What's in your mind?"
      />
      <ToolsDialog
        setInput={(description: string) => promptInput(description)}
      />
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
