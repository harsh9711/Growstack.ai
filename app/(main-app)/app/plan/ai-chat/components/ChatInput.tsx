import { MicrophoneIcon, SendIcon2 } from "@/components/svgs";
import autosize from "autosize";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import ToolsDialog from "./ToolsDialog";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import toast from "react-hot-toast";
import useSpeechRecognition from "../../hooks/UseSpeechRecognition";
import { languageOptions } from "../../../create/ai-articles/constants/options";
import Microphone from "./Microphone";

interface ChatInputProps {
  onSend: (content: string, role: string) => void;
  selectedModel: string;
  fetchConversations: () => void;
  removeMessage: () => void;
  selectedConversation: string | null;
  selectedOption: string;
  addMessage: (role: string, content: string, loading: boolean) => void;
  setSelectedConversation: React.Dispatch<React.SetStateAction<string | null>>;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  selectedModel,
  fetchConversations,
  selectedConversation,
  selectedOption,
  addMessage,
  setSelectedConversation,
  removeMessage,
}) => {
  const selectedLanguage = languageOptions[0].value;
  const [open, setOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [input, setInput] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { startRecognition, stopRecognition, textToSpeech } =
    useSpeechRecognition(
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
      textareaRef.current.style.overflow = "auto";
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
    addMessage("user", prompt, false);
    addMessage("assistant", "", true);
    if (textareaRef.current) {
      autosize.update(textareaRef.current);
    }
    try {
      setIsAnimating(false);
      setOpen(false);
      const conversation = await instance.post(
        `${API_URL}/ai/api/v1/conversation/chat?conversation_id=${
          selectedConversation ? selectedConversation : ""
        }&model=${selectedOption}`,
        { user_prompt: prompt }
      );
      const response = conversation.data.data.response;
      setSelectedConversation(conversation.data.data.conversation_id);
      if (!selectedConversation) fetchConversations();
      onSend(response, "assistant");
      if (fromMic) {
        setIsAnimating(true);
        setOpen(true);
        await textToSpeech(response);
      }
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
      removeMessage();
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
        src="/logo/growstack-mini.png"
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
        // onClick={startRecognition}
        className="h-12 w-12 flex justify-center items-center bg-primary-green hover:bg-opacity-90 transition-all duration-300 text-white rounded-xl"
      >
        {/* <MicrophoneIcon /> */}
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
  );
};

export default ChatInput;
