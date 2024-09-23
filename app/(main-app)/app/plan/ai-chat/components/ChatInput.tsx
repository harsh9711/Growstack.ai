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
import Link from "next/link";
import { ChatResponse } from "@/types/common";
import { planIdsMap } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { ALL_ROUTES } from "@/utils/constant";
import Swal from 'sweetalert2';
import { getCookie } from "cookies-next";
import EventSource from 'eventsource';

interface ChatInputProps {
  onSend: (content: string, role: string) => void;
  selectedModel: string;
  fetchConversations: () => void;
  removeMessage: () => void;
  selectedConversation: string | null;
  addMessage: (role: string, content: string, loading: boolean) => void;
  setSelectedConversation: React.Dispatch<React.SetStateAction<string | null>>;
  enableSecure?: boolean;
  isLimitExceeded?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  fetchConversations,
  selectedConversation,
  selectedModel,
  addMessage,
  setSelectedConversation,
  removeMessage,
  enableSecure = false,
  isLimitExceeded = false
}) => {
  const { currentPlan, user } = useSelector((rootState: RootState) => rootState.auth);
  const isSubscribed = user?.isSubscribed || false;
  const selectedLanguage = languageOptions[0].value;
  const [open, setOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [input, setInput] = useState("");
  const [isDailyLimitExceeded, setIsDailyLimitExceeded] = useState(isLimitExceeded)

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { startRecognition, stopRecognition, textToSpeech } = useSpeechRecognition(
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
      textareaRef.current.style.overflow = "auto";
    }
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      autosize.update(textareaRef.current);
    }
  }, [input]);



  const streamResponse = async (chatId: string) => {
    try {
      const token = getCookie("token");
      const eventSource = new EventSource(`${API_URL}/ai/api/v1/conversation/chat/stream/${chatId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });

      let accumulatedResponse = '';

      eventSource.onmessage = (event: MessageEvent) => {
        const chunk = event.data;
        accumulatedResponse += chunk;

        onSend(accumulatedResponse, "assistant");
      };

      eventSource.onerror = (error: MessageEvent) => {
        console.error('EventSource failed:', error);
        eventSource.close();
      };

      eventSource.addEventListener('end', (event: MessageEvent) => {
        eventSource.close();
      });

    } catch (error) {
      console.error('Error setting up EventSource:', error);
      toast.error('Error setting up stream');
    }
  };

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
        `${API_URL}/ai/api/v1/conversation/chat?conversation_id=${selectedConversation ? selectedConversation : ""}&model=${selectedModel}&enableSecure=${enableSecure}`,
        { user_prompt: prompt }
      );
      const { response, conversation_id, chatId, noOfMessagesLeft, totalNoOfMessages } = conversation.data.data as ChatResponse;

      setSelectedConversation(conversation_id);

      const isBasicPlan = planIdsMap.BASIC.some((val) => val === currentPlan?.plan_id);

      if (isBasicPlan) {
        if (noOfMessagesLeft && totalNoOfMessages) {
          if (noOfMessagesLeft <= 0) {
            setIsDailyLimitExceeded(true);
          } else {
            setIsDailyLimitExceeded(false);
          }
        }
      }
      if (!selectedConversation) fetchConversations();

      streamResponse(chatId);
      if (fromMic) {
        setIsAnimating(true);
        setOpen(true);
        await textToSpeech(response);
      }
    } catch (error: any) {
      const errorMsg = error.response?.data.error ?? error.message;

      if (errorMsg === "Please upgrade your plan") {
        setIsDailyLimitExceeded(true);
      }
      if (errorMsg.includes("Your request has been blocked")) {
        const result = await Swal.fire({
          title: 'Secure chat is enabled',
          icon: 'success',
          confirmButtonText: 'Okay',
          confirmButtonColor: "#0f4d0f",
        });
      } else {
        toast.error(errorMsg);
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
        textareaRef.current.selectionStart = textareaRef.current.selectionEnd = newInput.length;
      }
    }, 500);
  };

  if (isDailyLimitExceeded) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-center items-center text-center mt-6">
        <h2 className="text-xl font-semibold text-red-500">You've Exceeded Your Daily Free Chat Limit</h2>

        <p className="mt-4 w-2/3 text-base ">
          Come back tomorrow to start chatting again or upgrade your plan to access all the amazing AI features.
        </p>

        <Link
          className="bg-primary-green mt-3 text-nowrap text-white sheen transition duration-500 px-5 py-3.5 rounded-xl flex items-center gap-2"
          href={isSubscribed ? ALL_ROUTES.UPGRADE : ALL_ROUTES.PAYMENT} >
          Upgrade Your Plan
        </Link>
      </div>
    )
  }

  return (
    <div className="flex p-2 border gap-2 rounded-xl items-end">
      <Image src="/logo/growstack-mini.png" alt="" width={25} height={25} draggable={false} className="select-none ml-2 mb-3" />
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        className="w-full flex-1 p-2 bg-transparent resize-none overflow-auto min-h-11 max-h-[300px]"
        placeholder="What's in your mind?"
      />
      <ToolsDialog setInput={(description: string) => promptInput(description)} />
      <div className="h-12 w-12 flex justify-center items-center bg-primary-green hover:bg-opacity-90 transition-all duration-300 text-white rounded-xl">
        <Microphone open={open} isAnimating={isAnimating} handleOpenChange={handleOpenChange} />
      </div>
      <button
        onClick={() => handleSend()}
        className="h-12 w-12 flex justify-center items-center bg-primary-green hover:bg-opacity-90 transition-all duration-300 text-white rounded-xl">
        <SendIcon2 />
      </button>
    </div>
  );
};

export default ChatInput;
