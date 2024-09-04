"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { aiModelOptions } from "../create/ai-articles/constants/options";
import clsx from "clsx";
import ChatInput from "../plan/ai-chat/components/ChatInput";
import ChatMessages from "../plan/ai-chat/components/ChatMessage";
import Image from "next/image";
import { API_URL } from "@/lib/api";
import instance from "@/config/axios.config";
import toast from "react-hot-toast";
import Icon1 from "@/public/svgs/conversation-starter1.svg";
import Icon2 from "@/public/svgs/conversation-starter2.svg";
import Icon3 from "@/public/svgs/conversation-starter3.svg";
import { getCurrentUser } from "@/lib/features/auth/auth.selector";

type Message = {
  content: string;
  role: string;
  loading: boolean;
};

export default function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>("gpt-3.5-turbo");

  const selectedModelLabel = aiModelOptions.find((option) => option.value === selectedModel)?.label;

  const fetchMessages = useCallback(async (_id: string) => {
    try {
      const { data } = await instance.get(`${API_URL}/ai/api/v1/conversation/${_id}`);
      const chatData = data.data.chats;
      const messages = chatData.flatMap((chats: any) =>
        chats.thread.flatMap((thread: any) => [
          { role: "user", content: thread.user_prompt, loading: false },
          { role: "assistant", content: thread.response, loading: false },
        ])
      );
      setMessages(messages);
      setSelectedConversation(_id);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation);
    }
  }, [selectedConversation, fetchMessages]);

  const addMessage = (role: string, content: string, loading: boolean) => {
    setMessages((prevMessages) => [...prevMessages, { role, content, loading }]);
  };

  const updateMessage = useCallback(
    (content: string, role: string) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg, index) => (index === prevMessages.length - 1 && msg.role === role ? { ...msg, content, loading: false } : msg))
      );
    },
    [setMessages]
  );

  const removeMessage = useCallback(() => {
    setMessages((prevMessages) => {
      const lastUserMessageIndex = [...prevMessages].reverse().findIndex((msg) => msg.role === "user");

      if (lastUserMessageIndex === -1) return prevMessages;

      const indexToRemove = prevMessages.length - 1 - lastUserMessageIndex;
      return prevMessages.filter((_, index) => index !== indexToRemove && index !== indexToRemove + 1);
    });
  }, []);

  const handleConversationStarterClick = async (user_prompt: string) => {
    addMessage("user", user_prompt, false);
    addMessage("assistant", "", true);

    try {
      const { data } = await instance.post(
        `${API_URL}/ai/api/v1/conversation/chat?conversation_id=${selectedConversation ? selectedConversation : ""}&model=${selectedModel}`,
        {
          user_prompt,
        }
      );

      const { conversation_id, response } = data.data;
      setSelectedConversation(conversation_id);
      updateMessage(response, "assistant");
    } catch (error: any) {
      const errorMsg = error.response?.data.error ?? error.message;
      toast.error(errorMsg);
      removeMessage();
    }
  };

  const currentUser = getCurrentUser();

  return (
    <div className="h-[calc(100vh-180px)] flex flex-col bg-white p-10 pt-8 rounded-3xl border border-[#E8E8E8]" data-aos="fade-up">
    <div className="flex justify-between items-center border-b pb-4" data-aos="fade-left">
      <h1 className="text-xl font-semibold">AI Chat</h1>
      <Select value={selectedModel} onValueChange={setSelectedModel}>
        <SelectTrigger className="h-12 bg-primary-green text-white border-0 rounded-xl flex items-center justify-between px-4">
          <SelectValue placeholder="Select an option">
            {selectedModelLabel && (
              <div className="flex items-center gap-2">
                <span className="min-w-fit">{aiModelOptions.find((option) => option.value === selectedModel)?.icon}</span>
                {selectedModelLabel}
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {aiModelOptions.map(({ icon, label, value }) => (
              <SelectItem key={value} value={value}>
                <div className={clsx("flex items-center gap-2", selectedModel === value && "text-primary-green font-medium")}>
                  <span className="min-w-fit">{icon}</span>
                  {label}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <div className="h-[calc(100vh-380px)] w-full flex-1 flex flex-col" data-aos="fade-up">
      <div className="flex-1 w-full overflow-y-auto flex flex-col">
        {!messages.length ? (
          <div className="flex-1 flex flex-col justify-between mt-6 pb-40">
            <div className="flex items-start space-x-3 relative" data-aos="fade-right">
              <Image src="/logo/growstack-mini.png" alt="growstack_ai_chat" width={35} height={35} className="mt-1" />
              <div>
                <h1 className="text-2xl font-medium">Hello, {currentUser?.name ?? currentUser?.user_name ?? "Growstack User"}!</h1>
                <p className="mt-3">How can I help you today?</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-10">
              {conversationStarters.map((conversationStarter, index) => (
                <div
                  key={index}
                  onClick={() => handleConversationStarterClick(conversationStarter.prompt)}
                  className="relative cursor-pointer hover:bg-[#0347371A] transition-all duration-300 bg-[#0347370D] p-6 rounded-2xl min-h-[150px]"
                  data-aos="zoom-in"
                >
                  <p>{conversationStarter.prompt}</p>
                  <div className="absolute bottom-2 right-2 bg-primary-green w-10 h-10 rounded-full grid place-content-center">
                    {conversationStarter.icon}
                  </div>
                </div>
              ))}
            </div>
            <div />
          </div>
        ) : (
          <ChatMessages conversation={messages} selectedConversation={selectedConversation} />
        )}
      </div>
      <ChatInput
        onSend={updateMessage}
        fetchConversations={() => {}}
        selectedConversation={selectedConversation}
        setSelectedConversation={setSelectedConversation}
        selectedModel={selectedModel}
        addMessage={addMessage}
        removeMessage={removeMessage}
      />
    </div>
  </div>
  );
}

const conversationStarters = [
  {
    prompt: "Suggest beautiful places to see on an upcoming road trip",
    icon: <Icon1 />,
  },
  {
    prompt: "Help explain a concept in a kid-friendly way",
    icon: <Icon2 />,
  },
  {
    prompt: "Draft an email with a packing list for an upcoming trip",
    icon: <Icon3 />,
  },
];
