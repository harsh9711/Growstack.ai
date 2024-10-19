"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { aiModelOptions } from "../ai-studio/ai-articles/constants/options";
import clsx from "clsx";
import ChatInput from "../ai-studio/ai-chat/components/ChatInput";
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
import { parseJsonString, planIdsMap } from "@/lib/utils";
import Link from "next/link";
import { ChatResponse } from "@/types/common";
import ChatMessages from "../ai-studio/ai-chat/components/ChatMessage";
import ChatMessage from "../ai-studio/ai-chat/components/ChatMessage";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { getCookie } from "cookies-next";
import EventSource from "eventsource";
import { usePathname } from "next/navigation";
import { ALL_ROUTES } from "@/utils/constant";
import { PlanName } from "@/types/enums";
import { Switch } from "@/components/ui/switch";
import { BrandVoice } from "@/types/common";
import Wave from "@/components/svgs/wave";
import ExternalLink from "@/components/svgs/externalLink";
import Ellipse from "@/components/svgs/ellipse";

type Message = {
  content: string;
  role: string;
  loading: boolean;
  imageUrl: string | null;
  filename: string | null;
};

export default function ChatComponent() {
  const { user, currentPlan } = useSelector(
    (rootState: RootState) => rootState.auth
  );

  const filteredAiModelOptions =
    user?.user_type !== "ADMIN" &&
    currentPlan &&
    planIdsMap[PlanName.AI_ESSENTIALS].some(val => val === currentPlan.plan_id)
      ? [aiModelOptions[0]]
      : aiModelOptions;
  const [enableWebAccess, setEnableWebAccess] = useState<boolean>(false);
  const [brandVoices, setBrandVoices] = useState<BrandVoice[]>([]);
  const [selectedBrandVoice, setSelectedBrandVoice] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [selectedModel, setSelectedModel] = useState<string>(
    filteredAiModelOptions[0].models[0].value || ""
  );
  const [secureChatEnabled, setSecureChatEnabled] = useState<boolean>(false);
  const [isDailyLimitExceeded, setIsDailyLimitExceeded] = useState(false);
  const [isDashboardChatModalOpen, setIsDashboardChatModalOpen] =
    useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    fetchBrandVoice();
  }, []);

  const fetchBrandVoice = async () => {
    try {
      const response = await instance.get(
        `${API_URL}/users/api/v1/brand-voice/all`
      );
      const data = response.data.data;
      setBrandVoices(data);
    } catch (error) {
      console.error("Error fetching brand voices", error);
    }
  };

  const fetchMessages = useCallback(async (_id: string) => {
    try {
      const { data } = await instance.get(
        `${API_URL}/ai/api/v1/conversation/${_id}`
      );
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

  const addMessage = (role: string, content: string, loading: boolean) => {
    setMessages(prevMessages => [
      ...prevMessages,
      { role, content, loading, imageUrl, filename },
    ]);
  };

  const updateMessage = useCallback(
    (content: string, role: string) => {
      setMessages(prevMessages =>
        prevMessages.map((msg, index) =>
          index === prevMessages.length - 1 && msg.role === role
            ? { ...msg, content, loading: false }
            : msg
        )
      );
    },
    [setMessages]
  );

  const removeMessage = useCallback(() => {
    setMessages(prevMessages => {
      const lastUserMessageIndex = [...prevMessages]
        .reverse()
        .findIndex(msg => msg.role === "user");

      if (lastUserMessageIndex === -1) return prevMessages;

      const indexToRemove = prevMessages.length - 1 - lastUserMessageIndex;
      return prevMessages.filter(
        (_, index) => index !== indexToRemove && index !== indexToRemove + 1
      );
    });
  }, []);

  const streamResponse = async (chatId: string) => {
    try {
      const token = getCookie("token");
      const eventSource = new EventSource(
        `${API_URL}/ai/api/v1/conversation/chat/stream/${chatId}`,
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

        updateMessage(accumulatedResponse, "assistant");
      };

      eventSource.onerror = (error: MessageEvent) => {
        console.error("EventSource failed:", error);
        eventSource.close();
      };

      eventSource.addEventListener("end", (event: MessageEvent) => {
        eventSource.close();
      });
    } catch (error) {
      console.error("Error setting up EventSource:", error);
      toast.error("Error setting up stream");
    }
  };

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

      const {
        conversation_id,
        response,
        chatId,
        noOfMessagesLeft,
        totalNoOfMessages,
      } = data.data as ChatResponse;

      const isBasicPlan = planIdsMap[PlanName.AI_ESSENTIALS].some(
        val => val === currentPlan?.plan_id
      );

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
      await streamResponse(chatId);
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
    if (messagesEndRef.current && pathname !== ALL_ROUTES.APP) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
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
    const currentCategory = filteredAiModelOptions.find(category =>
      category.models.some(model => model.value === value)
    );

    const currentModal = currentCategory?.models.find(
      model => model.value === value
    );

    if (!currentCategory || !currentModal) {
      console.error("Model not found");
      return;
    }

    const freeCategories = ["growStackAiMessagesModel"];

    if (
      user?.user_type === "ADMIN" ||
      freeCategories.includes(currentCategory.modelCategory)
    ) {
      if (currentModal.value === "perplexity") {
        setEnableWebAccess(true);
      } else {
        setEnableWebAccess(false);
      }
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
      toast.error(
        `You have no remaining usage for ${currentCategory.label}. Please switch to another model.`
      );
      return;
    }

    console.log("Usage limit:", currentModal);

    if (currentModal.value === "perplexity") {
      setEnableWebAccess(true);
    } else {
      setEnableWebAccess(false);
    }

    setSelectedModel(value);
  };
  const chatInputRef = useRef<{
    handleRegenerate: (chartMessage: string) => void;
  }>(null);
  const handleChatMessageButtonClick = (chartMessage: any) => {
    if (chatInputRef.current) {
      chatInputRef.current.handleRegenerate(chartMessage);
    }
  };
  const isBasicPlan = planIdsMap[PlanName.AI_ESSENTIALS].some(
    val => val === currentPlan?.plan_id
  );

  useEffect(() => {
    if (brandVoices?.length > 0) {
      const defaultBrandVoice = brandVoices.find(voice => voice.is_default);
      if (defaultBrandVoice) {
        setSelectedBrandVoice(defaultBrandVoice._id);
      }
    }
  }, [brandVoices]);

  const onChange = () => {
    if (enableWebAccess) {
      setEnableWebAccess(false);
      setSelectedModel("growstack-llm");
    } else {
      setEnableWebAccess(true);
      setSelectedModel("perplexity");
    }
  };

  useEffect(() => {
    if (isBasicPlan) {
      setSelectedModel("growstack-llm");
    } else {
      setSelectedModel("gpt-4o-mini");
    }
  }, []);

  return (
    <div
      className=" flex flex-col bg-white px-8 py-8 rounded-3xl border border-[#E8E8E8] min-h-[580px] h-full"
      data-aos="fade-up"
    >
      {isDashboardChatModalOpen && (
        <DashboardChatModal
          onClose={() => setIsDashboardChatModalOpen(false)}
          onSelectConversation={handleSelectConversation}
        />
      )}
      <div
        className="flex justify-between items-center border-b pb-4"
        data-aos="fade-left"
      >
        <div className="flex flex-row gap-2 items-center justify-center">
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => setIsDashboardChatModalOpen(true)}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 94 84"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M66.1699 41.0721L53.2119 41.0691V18.8491C53.2119 17.0401 51.7449 15.5781 49.9409 15.5781C48.1369 15.5781 46.6699 17.0411 46.6699 18.8491V44.3411C46.6699 46.1491 48.1369 47.6121 49.9409 47.6121H49.9459H66.1689C67.9739 47.6121 69.4389 46.1491 69.4389 44.3421C69.4379 42.5381 67.9729 41.0721 66.1699 41.0721Z"
                      fill="#034737"
                    />
                    <path
                      d="M81.1068 12.2085C64.8288 -4.0695 38.3408 -4.0695 22.0578 12.2085C14.8738 19.3945 10.6118 28.8005 9.92776 38.8755L5.67375 34.2945C4.44275 32.9725 2.36976 32.8935 1.04676 34.1225C-0.279245 35.3535 -0.355245 37.4265 0.874755 38.7525L10.3498 48.9545C10.9948 49.6485 11.8708 50.0005 12.7498 50.0005C13.5468 50.0005 14.3458 49.7115 14.9768 49.1265L25.1818 39.6505C26.5078 38.4195 26.5838 36.3465 25.3538 35.0225C24.1238 33.6975 22.0508 33.6175 20.7258 34.8505L16.5418 38.7345C17.2418 30.4655 20.7738 22.7565 26.6888 16.8385C40.4158 3.1135 62.7498 3.1135 76.4758 16.8385C90.2008 30.5645 90.2008 52.9005 76.4758 66.6265C69.8278 73.2755 60.9868 76.9375 51.5818 76.9375C42.1818 76.9375 33.3408 73.2765 26.6888 66.6265C25.4088 65.3475 23.3348 65.3475 22.0568 66.6265C20.7788 67.9055 20.7788 69.9805 22.0578 71.2575C29.9478 79.1445 40.4328 83.4865 51.5818 83.4865C62.7348 83.4865 73.2198 79.1435 81.1058 71.2575C97.3858 54.9785 97.3857 28.4875 81.1068 12.2085Z"
                      fill="#034737"
                    />
                  </svg>
                </TooltipTrigger>
                <TooltipContent className="bg-white">
                  <p>History</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center justify-center">
            <h1 className="text-xl font-semibold  text-nowrap">AI Chat</h1>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-3">
          <div className="hidden xl:block">
            {(!isBasicPlan || user?.user_type === "ADMIN") && (
              <div className="flex ">
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info
                          size={18}
                          className="ml-2 text-primary-black text-opacity-50 cursor-pointer"
                        />
                      </TooltipTrigger>
                      <TooltipContent
                        className="bg-white"
                        style={{ width: "400px", zIndex: "1000" }}
                      >
                        <p>
                          Blocks PII, jailbreaks, gibberish, toxicity, nudity,
                          prompt injections, and celebrity content.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <div className="text-md  text-nowrap font-medium">
                    Secure Chat
                  </div>
                  <Switch
                    checked={secureChatEnabled}
                    onCheckedChange={() =>
                      setSecureChatEnabled(!secureChatEnabled)
                    }
                  />
                </div>
                <div className="gap-2 flex pr-2 py-1.5 items-center border-r-2 border-[#EBEBEB]">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info
                          size={18}
                          className="ml-2 text-primary-black text-opacity-50 cursor-pointer"
                        />
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="bg-white">
                        <p>To access real-time data, please enable it.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <span className="text-md  text-nowrap flex flex-row gap-x-2 font-medium">
                    Web chat
                  </span>
                  <Switch
                    checked={enableWebAccess}
                    onCheckedChange={onChange}
                  />
                </div>
              </div>
            )}
          </div>

          <Select
            value={selectedBrandVoice}
            onValueChange={setSelectedBrandVoice}
          >
            <SelectTrigger className="h-12 bg-primary-green text-white border-0 rounded-xl flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <span className="min-w-fit">
                  <Wave />
                </span>
                {selectedBrandVoice
                  ? brandVoices.find(voice => voice._id === selectedBrandVoice)
                      ?.brand_name
                  : "Brand Voice"}
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <div className="flex w-full border-b border-[#EBEBEB] p-2 items-center gap-2">
                  <span className="min-w-fit">
                    <Wave color="#034737" />
                  </span>
                  <p className="text-sm">Brand Voice</p>
                  <Link
                    href={ALL_ROUTES.BRAND_VOICE}
                    className="min-w-fit text-right"
                  >
                    <ExternalLink width={22} height={22} />
                  </Link>
                </div>
                {brandVoices.map(voice => (
                  <SelectItem
                    className="relative ite"
                    key={voice._id}
                    value={voice._id}
                    showIndicator={false}
                  >
                    <span className="absolute left-2 top-3 flex  items-center justify-center">
                      <Ellipse isFilled={selectedBrandVoice === voice._id} />
                    </span>

                    <div
                      className={clsx(
                        "flex items-center line-clamp-1 gap-2",
                        selectedBrandVoice === voice._id &&
                          "text-primary-green font-medium"
                      )}
                    >
                      {voice.brand_name}
                    </div>
                  </SelectItem>
                ))}
                <div
                  onClick={() => setSelectedBrandVoice("")}
                  className="flex w-full cursor-pointer  border-t border-[#EBEBEB] p-2 items-center gap-2"
                >
                  <Ellipse isFilled={!!!selectedBrandVoice} />
                  <p className="text-sm">No brand voice</p>
                </div>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={selectedModel} onValueChange={handleModalSelection}>
            <SelectTrigger className="h-12 bg-primary-green text-white border-0 rounded-xl flex items-center justify-between px-4">
              <SelectValue placeholder="Select an option">
                {selectedModel && (
                  <div className="flex items-center gap-2">
                    <span className="min-w-fit">
                      {
                        filteredAiModelOptions
                          .flatMap(option => option.models) // Flattening the models array to find the icon
                          .find(model => model.value === selectedModel)?.icon
                      }
                    </span>
                    {selectedModel}
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent
              className="max-h-60 overflow-y-auto"
              style={{ scrollBehavior: "smooth" }}
            >
              {filteredAiModelOptions.map(
                ({ label: categoryLabel, models }) => (
                  <SelectGroup key={categoryLabel}>
                    <React.Fragment key={categoryLabel}>
                      <div className="font-bold text-gray-500 px-4 py-2">
                        {categoryLabel}
                      </div>
                      {models.map(({ icon, label, value }) => (
                        <SelectItem key={value} value={value}>
                          <div
                            className={clsx(
                              "flex items-center gap-2",
                              selectedModel === value &&
                                "text-primary-green font-medium"
                            )}
                          >
                            <span className="min-w-fit">{icon}</span>
                            {label}
                          </div>
                        </SelectItem>
                      ))}
                    </React.Fragment>
                  </SelectGroup>
                )
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div
        className="min-h-[380px] h-full w-full flex-1 flex flex-col "
        data-aos="fade-up"
      >
        <div className="flex-1 w-full overflow-y-auto flex flex-col">
          {!messages.length ? (
            <div className="flex-1 flex flex-col justify-between mt-6 ">
              <div className="flex justify-between ">
                <div
                  className="flex items-start space-x-3 relative"
                  data-aos="fade-right"
                >
                  <Image
                    src="/logo/growstack-mini.png"
                    alt="growstack_ai_chat"
                    width={35}
                    height={35}
                    className="mt-1"
                  />
                  <div>
                    <h1 className="text-2xl font-medium">
                      Hello,{" "}
                      {currentUser.name
                        ? currentUser.name
                        : currentUser.email.split(/[@.]/)[0]}
                      !
                    </h1>
                    <p className="mt-3">How can I help you today?</p>
                  </div>
                </div>
                <div className="block xl:hidden">
                  {(!isBasicPlan || user?.user_type === "ADMIN") && (
                    <div className="flex ">
                      <div className="flex items-center gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info
                                size={18}
                                className="ml-2 text-primary-black text-opacity-50 cursor-pointer"
                              />
                            </TooltipTrigger>
                            <TooltipContent
                              className="bg-white"
                              style={{ width: "400px", zIndex: "1000" }}
                            >
                              <p>
                                Blocks PII, jailbreaks, gibberish, toxicity,
                                nudity, prompt injections, and celebrity
                                content.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <div className="text-md  text-nowrap font-medium">
                          Secure Chat
                        </div>
                        <Switch
                          checked={secureChatEnabled}
                          onCheckedChange={() =>
                            setSecureChatEnabled(!secureChatEnabled)
                          }
                        />
                      </div>
                      <div className="gap-2 flex pr-4 py-1.5 items-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info
                                size={18}
                                className="ml-2 text-primary-black text-opacity-50 cursor-pointer"
                              />
                            </TooltipTrigger>
                            <TooltipContent side="bottom" className="bg-white">
                              <p>To access real-time data, please enable it.</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <span className="text-md  gap-x-2 text-nowrap font-medium">
                          Web chat
                        </span>
                        <Switch
                          checked={enableWebAccess}
                          onCheckedChange={onChange}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 -mt-24">
                {conversationStarters.map((conversationStarter, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      handleConversationStarterClick(conversationStarter.prompt)
                    }
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
              <ChatMessage
                onButtonClick={handleChatMessageButtonClick}
                conversation={messages}
                selectedConversation={selectedConversation}
                imageUrl={imageUrl}
              />
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <ChatInput
          ref={chatInputRef}
          selectedBrandVoice={brandVoices.find(
            voice => voice._id === selectedBrandVoice
          )}
          onSend={updateMessage}
          fetchConversations={() => {}}
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
          selectedModel={selectedModel}
          addMessage={addMessage}
          removeMessage={removeMessage}
          enableSecure={secureChatEnabled}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          filename={filename}
          setFilename={setFilename}
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
