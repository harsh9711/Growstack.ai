"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { aiModelOptions } from "../create/ai-articles/constants/options";
import clsx from "clsx";
import ChatInput from "../plan/ai-chat/components/ChatInput";
import ChatMessages from "../plan/ai-chat/components/ChatMessage";
import DashboardChatModal from "./DashboardchatModal";
import Image from "next/image";
import { API_URL } from "@/lib/api";
import instance from "@/config/axios.config";
import toast from "react-hot-toast";
import Icon1 from "@/public/svgs/conversation-starter1.svg";
import Icon2 from "@/public/svgs/conversation-starter2.svg";
import Icon3 from "@/public/svgs/conversation-starter3.svg";
import { getCurrentUser } from "@/lib/features/auth/auth.selector";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { planIdsMap } from "@/lib/utils";
import Link from "next/link";
import { ChatResponse } from "@/types/common";

type Message = {
  content: string;
  role: string;
  loading: boolean;
};

export default function ChatComponent() {
  const { currentPlan } = useSelector((rootState: RootState) => rootState.auth);

  const filteredAiModelOptions = currentPlan &&
    planIdsMap.BASIC.some((val) => val === currentPlan.plan_id)
    ? aiModelOptions.map((category) => ({
      ...category,
      models: category.models.filter((model) => model.value.startsWith("claude")),
    })).filter((category) => category.models.length > 0)
    : aiModelOptions;

  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>(filteredAiModelOptions[0].models[0].value || "");
  const [secureChatEnabled, setSecureChatEnabled] = useState<boolean>(false)
  const [isDailyLimitExceeded, setIsDailyLimitExceeded] = useState(false)
  const [isDashboardChatModalOpen, setIsDashboardChatModalOpen] = useState(false);

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
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
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

      const { conversation_id, response, noOfMessagesLeft, totalNoOfMessages } = data.data as ChatResponse;

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
      setSelectedConversation(conversation_id);
      updateMessage(response, "assistant");
    } catch (error: any) {
      const errorMsg = error.response?.data.error ?? error.message;
      if (errorMsg === "Please upgrade your plan") {
        setIsDailyLimitExceeded(true);
      }
      toast.error(errorMsg);
      removeMessage();
    }
  };
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSelectConversation = (_id: string) => {
    if (_id) {
      setSelectedConversation(_id);
      fetchMessages(_id); // Fetch messages for the selected conversation
    } else {
      setSelectedConversation(null); // Reset to start a new conversation
      setMessages([]); // Clear current messages
    }
  };

  const currentUser = getCurrentUser();



  const handleModalSelection = (value: string) => {
    if (!currentPlan) return;
    const currentCategory = filteredAiModelOptions.find((category) =>
      category.models.some((model) => model.value === value)
    );

    const currentModal = currentCategory?.models.find(
      (model) => model.value === value
    );

    if (!currentCategory || !currentModal) {
      console.error("Model not found");
      return;
    }

    const freeCategories = ["growStackAiMessagesModel"];

    if (freeCategories.includes(currentCategory.modelCategory)) {
      setSelectedModel(value);
      return;
    }

    let usageLimit = 0;

    if (currentCategory.modelCategory === "smartAiMessagesModel") {
      usageLimit = currentPlan.smart_ai_messages;
    } else if (currentCategory.modelCategory === "fastAiMessagesModel") {
      usageLimit = currentPlan.fast_ai_messages;
    }

    if (usageLimit <= 0) {
      toast.error(`You have no remaining usage for ${currentCategory.label}. Please switch to another model.`);
      return;
    }

    setSelectedModel(value);
  };

  return (
    <div className=" flex flex-col bg-white p-10 pt-8 rounded-3xl border border-[#E8E8E8] h-[780px]" data-aos="fade-up">
      {isDashboardChatModalOpen && <DashboardChatModal onClose={() => setIsDashboardChatModalOpen(false)} onSelectConversation={handleSelectConversation} />}
      <div className="flex justify-between items-center border-b pb-4" data-aos="fade-left">
        <div className="flex flex-row gap-2 items-center justify-center">
          <div className="flex items-center justify-center cursor-pointer" onClick={() => setIsDashboardChatModalOpen(true)}>
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="4.5" y="4" width="16" height="16" rx="2" stroke="#034737" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M9.5 4V20" stroke="#034737" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <div className="flex items-center justify-center">
            <h1 className="text-xl font-semibold">AI Chat</h1>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-5">
          <div className='flex items-center gap-2'>
            <div className='text-l font-semibold'>Secure Chat</div>
            <label className='relative inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                className='sr-only peer'
                checked={secureChatEnabled}
                onChange={() => setSecureChatEnabled(!secureChatEnabled)}
              />

              <div className='w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:bg-[rgb(3,71,55)]'></div>

              <div className='w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 peer-checked:translate-x-full peer-checked:bg-white transition-all'></div>
            </label>
          </div>
          <Select value={selectedModel} onValueChange={handleModalSelection}>
            <SelectTrigger className='h-12 bg-primary-green text-white border-0 rounded-xl flex items-center justify-between px-4'>
              <SelectValue placeholder="Select an option">
                {selectedModel && (
                  <div className="flex items-center gap-2">
                    <span className="min-w-fit">
                      {filteredAiModelOptions
                        .flatMap((option) => option.models) // Flattening the models array to find the icon
                        .find((model) => model.value === selectedModel)?.icon}
                    </span>
                    {selectedModel}
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="max-h-60 overflow-y-auto" style={{ scrollBehavior: 'smooth' }}>
              {filteredAiModelOptions.map(({ label: categoryLabel, models }) => (
                <SelectGroup key={categoryLabel}>
                  <React.Fragment key={categoryLabel}>
                    <div className="font-bold text-gray-500 px-4 py-2">{categoryLabel}</div>
                    {models.map(({ icon, label, value }) => (
                      <SelectItem key={value} value={value}>
                        <div
                          className={clsx(
                            "flex items-center gap-2",
                            selectedModel === value && "text-primary-green font-medium"
                          )}
                        >
                          <span className="min-w-fit">{icon}</span>
                          {label}
                        </div>
                      </SelectItem>
                    ))}
                  </React.Fragment>
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="h-[500px] w-full flex-1 flex flex-col" data-aos="fade-up">
        <div className="flex-1 w-full overflow-y-auto flex flex-col">
          {!messages.length ? (
            <div className="flex-1 flex flex-col justify-between mt-6 pb-40">
              <div className="flex items-start space-x-3 relative" data-aos="fade-right">
                <Image src="/logo/growstack-mini.png" alt="growstack_ai_chat" width={35} height={35} className="mt-1" />
                <div>
                  <h1 className="text-2xl font-medium">Hello, {currentUser.name ? currentUser.name : currentUser.email.split(/[@.]/)[0]}!</h1>
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
            <div className="flex-1">
              <ChatMessages conversation={messages} selectedConversation={selectedConversation} />
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        <ChatInput
          onSend={updateMessage}
          fetchConversations={() => { }}
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
          selectedModel={selectedModel}
          addMessage={addMessage}
          removeMessage={removeMessage}
          enableSecure={secureChatEnabled}
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