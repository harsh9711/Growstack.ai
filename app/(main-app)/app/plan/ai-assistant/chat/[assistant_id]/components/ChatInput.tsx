import { MicrophoneIcon, SendIcon2 } from "@/components/svgs";
import autosize from "autosize";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import instance from "@/config/axios.config";
import { toast } from "react-hot-toast";
import { API_URL } from "@/lib/api";
import useSpeechRecognition from "../../../../hooks/UseSpeechRecognition";
import Microphone from "../../../../ai-chat/components/Microphone";

interface ChatInputProps {
  assistant_id: string;
  addMessage: (prompt: string, response: string) => void;
  updateMessage: (prompt: string, response: string) => void;
  selectedLanguage: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ assistant_id, addMessage, updateMessage, selectedLanguage }) => {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const { startRecognition, stopRecognition, textToSpeech } = useSpeechRecognition(
    selectedLanguage,
    (transcript: string) => {
      setInput(transcript);
      handleSend(transcript, true);
    },
    () => {
      setOpen(false);
      setIsAnimating(false);
    }
  );

  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      autosize.update(textareaRef.current);
    }
  }, [input]);

  const handleSend = async (user_prompt?: string, fromMic: boolean = false) => {
    if (user_prompt) {
      user_prompt = user_prompt.trim();
    }
    const prompt = user_prompt || input.trim();
    if (prompt === "") return;

    setInput("");
    addMessage(prompt, "");

    try {
      const response = await instance.post(`/ai/api/v1/assistant/chat/${assistant_id}`, {
        user_prompt: prompt,
        language: selectedLanguage,
        tone: "friendly",
        writing_style: "poetic",
      });

      const responseText = response.data.data.response;
      updateMessage(prompt, responseText);
      if (fromMic) {
        await textToSpeech(responseText);
      }
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

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (isAnimating) {
      stopRecognition();
      setIsAnimating(false);
    } else {
      startRecognition();
      setIsAnimating(true);
    }
  };

  return (
    <div className="flex p-2 border gap-2 rounded-xl items-end">
      <Image src="/logo/growstack-mini.png" alt="" width={25} height={25} draggable={false} className="select-none ml-2 mb-3" />
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        className="w-full flex-1 p-2 bg-transparent resize-none overflow-hidden min-h-11 max-h-[300px]"
        placeholder="What's in your mind?"
      />
      <button
        // onClick={startRecognition}
        className="h-12 w-12 flex justify-center items-center bg-primary-green hover:bg-opacity-90 transition-all duration-300 text-white rounded-xl">
        {/* <MicrophoneIcon /> */}
        <Microphone open={open} isAnimating={isAnimating} handleOpenChange={handleOpenChange} />
      </button>
      <button
        onClick={() => handleSend()}
        className="h-12 w-12 flex justify-center items-center bg-primary-green hover:bg-opacity-90 transition-all duration-300 text-white rounded-xl">
        <SendIcon2 />
      </button>
    </div>
  );
};

export default ChatInput;
