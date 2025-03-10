import { SendIcon2 } from "@/components/svgs";
import autosize from "autosize";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import instance from "@/config/axios.config";
import { toast } from "react-hot-toast";
import { API_URL } from "@/lib/api";
import useSpeechRecognition from "../../../../hooks/UseSpeechRecognition";
import Microphone from "../../../../ai-chat/components/Microphone";
import { getCookie } from "cookies-next";
import EventSource from "eventsource";
import { parseJsonString } from "@/lib/utils";

interface ChatInputProps {
  assistant_id: string;
  addMessage: (prompt: string, response: string) => void;
  updateMessage: (prompt: string, response: string) => void;
  selectedLanguage: string;
  selectedModel: string;
  newChat: boolean;
  setNewChat: (value: boolean) => void;
  convId: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  assistant_id,
  addMessage,
  updateMessage,
  selectedLanguage,
  selectedModel,
  newChat,
  setNewChat,
  convId,
}) => {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [emptyPrompt, isEmptyPrompt] = useState("");
  const { startRecognition, stopRecognition, textToSpeech } =
    useSpeechRecognition(
      selectedLanguage,
      open,
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

  const streamResponse = async (
    chatId: string,
    prompt: string,
    fromMic: boolean
  ) => {
    try {
      const token = getCookie("token");
      const eventSource = new EventSource(
        `${API_URL}/ai/api/v1/assistant/chat/stream/${chatId}/${convId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      let accumulatedResponse = "";

      eventSource.onmessage = (event: MessageEvent) => {
        const chunk = event.data;
        const msg = parseJsonString(chunk)?.text || "";
        accumulatedResponse += msg;

        updateMessage(prompt, accumulatedResponse);
      };

      eventSource.onerror = (error: MessageEvent) => {
        console.error("EventSource failed:", error);
        if (fromMic) {
          textToSpeech(accumulatedResponse);
        }
        eventSource.close();
      };

      eventSource.addEventListener("end", (event: MessageEvent) => {
        if (fromMic) {
          textToSpeech(accumulatedResponse);
        }
        eventSource.close();
      });
    } catch (error) {
      console.error("Error setting up EventSource:", error);
      toast.error("Error setting up stream");
    }
  };

  const handleSend = async (user_prompt?: string, fromMic: boolean = false) => {
    if (user_prompt) {
      user_prompt = user_prompt.trim();
    }
    const prompt = user_prompt || input.trim();
    if (prompt === "") {
      isEmptyPrompt("Please enter any prompt...!");
      return;
    }

    isEmptyPrompt("");
    setInput("");
    addMessage(prompt, "");

    try {
      const response = await instance.post(
        `/ai/api/v1/assistant/chat/${assistant_id}`,
        {
          user_prompt: prompt,
          language: selectedLanguage,
          tone: "friendly",
          writing_style: "poetic",
          model: selectedModel,
        }
      );

      const chatId = response.data.data.chat_id;
      await streamResponse(chatId, prompt, fromMic);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    } finally {
      setNewChat(false);
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
    <>
      <div className="flex p-2 border gap-2 rounded-xl items-end">
        <Image
          src="/logo/growstack-mini1.png"
          alt=""
          width={25}
          height={25}
          draggable={false}
          className="select-none ml-2 mb-3"
        />
        <textarea
          ref={textareaRef}
          value={input}
          onChange={e => {
            setInput(e.target.value);
            isEmptyPrompt("");
          }}
          onKeyDown={handleKeyDown}
          rows={1}
          className="w-full flex-1 p-2 bg-transparent resize-none overflow-hidden min-h-11 max-h-[300px]"
          placeholder="What's in your mind?"
        />
        <button className="h-12 w-12 flex justify-center items-center bg-primary-green hover:bg-opacity-90 transition-all duration-300 text-white rounded-xl">
          <Microphone
            open={open}
            isAnimating={isAnimating}
            handleOpenChange={handleOpenChange}
          />
        </button>
        <button
          onClick={() => handleSend()}
          className="h-12 w-12 flex justify-center items-center bg-primary-green hover:bg-opacity-90 transition-all duration-300 text-white rounded-xl"
        >
          <SendIcon2 />
        </button>
      </div>
      {emptyPrompt && (
        <div className="text-red-500 mt-2 ml-2">{emptyPrompt}</div>
      )}
    </>
  );
};

export default ChatInput;
