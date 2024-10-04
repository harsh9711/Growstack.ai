"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import clsx from "clsx";
import { Download, MoreVertical, Plus, Search, Share2, ShareIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { planIdsMap } from "@/lib/utils";
import { aiModelOptions } from "../../../create/ai-articles/constants/options";
import { ISidebarItem } from "../interface/chat.interface";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import SidebarItem from "./SidebarItem";
import { formatRelativeDate } from "@/utils/dates";
import Image from "next/image";
import toast from "react-hot-toast";
import { BrandVoice } from "@/types/common";
import Wave from "@/components/svgs/wave";
import ExternalLink from "@/components/svgs/externalLink";
import Link from "next/link";
import { ALL_ROUTES } from "@/utils/constant";
import Ellipse from "@/components/svgs/ellipse";
import { Switch } from "@/components/ui/switch";

interface LayoutProps {
  sidebarItems: ISidebarItem[];
  setSidebarItems: React.Dispatch<React.SetStateAction<any[]>>;
  fetchConversations: () => void;
}

type Message = {
  content: string;
  role: string;
  loading: boolean;
};

const groupByDate = (items: ISidebarItem[]) => {
  const grouped: { [date: string]: ISidebarItem[] } = {};

  items.forEach((item) => {
    const date = item.updatedDate
      ? item.updatedDate?.split("T")[0]
      : item.createdDate?.split("T")[0];
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(item);
  });

  return grouped;
};



const outputType = [
  // {
  //   icon: <Share2 size={20} />,
  //   label: "Share",
  //   value: "share_chat",
  // },
  {
    icon: <Download size={20} />,
    label: "Download",
    value: "download_chat",
  },
];

const Layout = ({ sidebarItems, setSidebarItems, fetchConversations, }: LayoutProps) => {
  const { currentPlan } = useSelector((rootState: RootState) => rootState.auth);
  const [brandVoices, setBrandVoices] = useState<BrandVoice[]>([]);
  const [enableWebAccess, setEnableWebAccess] = useState<boolean>(false);
  const [enableSecureChat, setEnableSecureChat] = useState<boolean>(false);

  useEffect(() => {
    fetchBrandVoice();
  }, []);

  const fetchBrandVoice = async () => {
    try {
      const response = await instance.get(
        `${API_URL}/users/api/v1/brand-voice/all`,
      );
      const data = response.data.data;
      setBrandVoices(data)
    } catch (error) {
      console.error("Error fetching brand voices", error);
    }
  };


  const filteredAiModelOptions = currentPlan &&
    planIdsMap.BASIC.some((val) => val === currentPlan.plan_id)
    ? aiModelOptions.map((category) => ({
      ...category,
      models: category.models.filter((model) => model.value.startsWith("claude")),
    })).filter((category) => category.models.length > 0)
    : aiModelOptions;


  const [messages, setMessages] = useState<Message[]>([]);
  const [_, setShowNewChatInput] = useState(false);
  const [selectedBrandVoice, setSelectedBrandVoice] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>(filteredAiModelOptions[0].models[0].value || "");
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [groupedSidebarItems, setGroupedSidebarItems] = useState<{ [date: string]: ISidebarItem[]; }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleSearch, setToggleSearch] = useState<boolean>(false);
  const [inputRef, setInputRef] = useState<() => void | null>();
  const fetchMessages = async (_id: string) => {
    try {
      const response = await instance.get(
        `${API_URL}/ai/api/v1/conversation/${_id}`
      );
      const chatData = response.data.data.chats;
      const messages = chatData.reduce(
        (acc: Message[], chats: any) => {
          const flattenedThreads = chats.thread.flatMap((thread: any) => [
            { role: "user", content: thread.user_prompt, loading: false },
            { role: "assistant", content: thread.response, loading: false },
          ]);
          return acc.concat(flattenedThreads);
        },
        [] // Initial empty array
      );
      setMessages(messages);
      setSelectedConversation(_id);
      const firstFewWords = response.data.data.title;
      setSidebarItems((prevItems) =>
        prevItems.map((item) =>
          item._id === _id ? { ...item, title: firstFewWords } : item
        )
      );
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    if (brandVoices?.length > 0) {
      const defaultBrandVoice = brandVoices.find((voice) => voice.is_default);
      if (defaultBrandVoice) {
        setSelectedBrandVoice(defaultBrandVoice._id);
      }
    }
  }, [brandVoices])

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation);
    }
  }, [selectedConversation]);

  useEffect(() => {
    setGroupedSidebarItems(groupByDate(sidebarItems));
  }, [sidebarItems]);

  const handleRename = async (_id: string, newTitle: string) => {
    try {
      await instance.put(`${API_URL}/ai/api/v1/conversation/${_id}`, {
        title: newTitle,
      });
      fetchConversations();
    } catch (error) {
      console.error("Error renaming chat:", error);
    }
  };

  // delete chat functions
  const [deleteRequestPending, setDeleteRequestPending] = useState(false);
  const handleDelete = async (_id: string) => {
    setDeleteRequestPending(true);
    try {
      await instance.delete(`${API_URL}/ai/api/v1/conversation/${_id}`);
      fetchConversations();
    } catch (error: any) {
      console.error("Error deleting chat:", error);
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
    } finally {
      if (selectedConversation === _id) {
        setSelectedConversation(null);
        setMessages([]);
        setShowNewChatInput(true);
      }
      setDeleteRequestPending(false);
    }
  };


  const handleDownload = async (id: string) => {
    try {
      const response = await instance.get(`${API_URL}/ai/api/v1/conversation/${id}`)
      const { title, chats } = response.data.data;
      const conversationData = chats
        .map((chat: any) => {
          return chat.thread.map((thread: any) => ({
            user_prompt: thread.user_prompt,
            response: thread.response,
          }));
        })
        .flat();

      let content = `# ${title}\n`;
      conversationData.forEach(
        ({
          user_prompt,
          response,
        }: {
          user_prompt: string;
          response: string;
        }) => {
          content += `\n## Message From You:\n${user_prompt}\n`;
          content += `## Message From GrowStackAI:\n${response}\n`;
        }
      );

      const blob = new Blob([content], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `${title
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase()}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success("Chat downloaded successfully");
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  const addMessage = (role: string, content: string, loading: boolean) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role, content, loading },
    ]);
  };

  const updateMessage = (content: string, role: string) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg, index) =>
        index === prevMessages.length - 1 && msg.role === role
          ? { ...msg, content, loading: false }
          : msg
      )
    );
  };

  const removeMessage = () => {
    setMessages((prevMessages) => {
      const lastUserMessageIndex = prevMessages
        .slice()
        .reverse()
        .findIndex((msg) => msg.role === "user");

      if (lastUserMessageIndex === -1) return prevMessages;

      const indexToRemove = prevMessages.length - 1 - lastUserMessageIndex;
      const newMessages = prevMessages.filter(
        (_, index) => index !== indexToRemove && index !== indexToRemove + 1
      );
      return newMessages;
    });
  };

  const selectedModelLabel = aiModelOptions
    .flatMap((option) => option.models)
    .find((model) => model.value === selectedModel)?.label;


  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredSidebarItems = sidebarItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const groupedFilteredSidebarItems = groupByDate(filteredSidebarItems);
  const handleChatMessageButtonClick = (chartMessage:any) => {
    if (chatInputRef.current) {
      chatInputRef.current.handleRegenerate(chartMessage); 
    }
  };


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


  const chatInputRef = useRef<{ handleRegenerate: (chartMessage:string) => void }>(null);
  return (
    <>
      <div className="flex pt-3 pb-8 w-full items-center justify-between">
        <h1 className="text-xl font-semibold">AI Chat</h1>
        <div className="flex gap-3 items-center">
          <div className="gap-2 flex pr-4 py-1.5 items-center border-r-2 border-[#EBEBEB]">
            <span className="text-md flex flex-row gap-x-2 font-medium">
              Secure chat
            </span>
            <Switch checked={enableSecureChat} onCheckedChange={setEnableSecureChat} />
          </div>
          <div className="gap-2 flex pr-4 py-1.5 items-center border-r-2 border-[#EBEBEB]">
            <span className="text-md flex flex-row gap-x-2 font-medium">
              Web chat
            </span>
            <Switch checked={enableWebAccess} onCheckedChange={setEnableWebAccess} />
          </div>
          <Select value={selectedBrandVoice} onValueChange={setSelectedBrandVoice}>
            <SelectTrigger className="h-12 bg-primary-green text-white border-0 rounded-xl flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <span className="min-w-fit">
                  <Wave />
                </span>
                {selectedBrandVoice ? brandVoices.find((voice) => voice._id === selectedBrandVoice)?.brand_name : "Brand Voice"}
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <div className="flex w-full border-b border-[#EBEBEB] p-2 items-center gap-2">
                  <span className="min-w-fit">
                    <Wave color="#034737" />
                  </span>
                  <p className="text-sm">

                    Brand Voice
                  </p>
                  <Link href={ALL_ROUTES.BRAND_VOICE} className="min-w-fit text-right">
                    <ExternalLink width={22} height={22} />
                  </Link>
                </div>
                {brandVoices.map((voice) => (
                  <SelectItem className="relative ite" key={voice._id} value={voice._id} showIndicator={false}>
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
                  className="flex w-full cursor-pointer  border-t border-[#EBEBEB] p-2 items-center gap-2">
                  <Ellipse isFilled={!!!selectedBrandVoice} />
                  <p className="text-sm">
                    No brand voice
                  </p>
                </div>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={selectedModel} onValueChange={handleModalSelection}>
            <SelectTrigger className="h-12 bg-primary-green text-white border-0 rounded-xl flex items-center justify-between px-4">
              <SelectValue placeholder="Select an option">
                {selectedModelLabel && (
                  <div className="flex items-center gap-2">
                    <span className="min-w-fit">
                      {filteredAiModelOptions
                        .flatMap((option) => option.models) // Flattening the models array to find the icon
                        .find((model) => model.value === selectedModel)?.icon}
                    </span>
                    {selectedModelLabel}
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {filteredAiModelOptions.map(({ label: groupLabel, models }) => (
                  <React.Fragment key={groupLabel}>
                    <div className="font-bold text-gray-500 px-4 py-2">{groupLabel}</div> {/* Group label */}
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
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>






          <div className="remove-caret">
            <Select>
              <SelectTrigger
                showChevronDownIcon={false}
                className="px-1 py-[5px] bg-white border-0 h-fit hover:bg-gray-100 rounded-lg"
              >
                <MoreVertical size={20} />
              </SelectTrigger >
              <SelectContent>
                <SelectGroup>
                  {outputType.map(({ label, value, icon }) => (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        selectedConversation && handleDownload(selectedConversation)
                      }}
                      // showIndicator={false}
                      // value={value}
                      key={value}
                      className=" cursor-pointer hover:bg-gray-100 items-center rounded-sm py-2.5 pr-2 pl-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    >
                      <div

                        className="flex gap-x-2">
                        {icon}
                        {label}
                      </div>
                    </div>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>



      
      <div className="flex-1 flex gap-4">
        <aside className="flex flex-col w-[380px] border bg-white rounded-3xl h-[calc(100vh-212px)]">
          <div className="border-t border-[#EFEFEF] flex items-center justify-between gap-2 py-3 px-6">
            <div className=" bg-[#F3F3F3] flex-1 border border-[#EBEBEB] px-3 py-1 rounded-xl flex gap-3 items-center w-full">
              <Search className="text-gray-500" size={20} />
              <input
                type="search"
                className="outline-none bg-[#F3F3F3] h-[40px] w-full"
                placeholder="Search"
                onChange={handleSearch}
              />
            </div>
            <button
              className="text-white  bg-primary-green rounded-full !h-12 !w-12 grid place-content-center"
              onClick={() => {
                setSelectedConversation(null);
                setMessages([]);
                setShowNewChatInput(true);
              }}
            >
              <Plus size={22} />
            </button>
          </div>
          <div className="border-y border-[#EFEFEF] flex items-center justify-between py-3 px-6">
            <h2 className="font-semibold">Your conversations</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {Object.entries(groupedFilteredSidebarItems).map(([date, items]) => (
              <div key={date}>
                <h3 className="text-gray-400 px-3 mb-2 capitalize">
                  {formatRelativeDate(date)}
                </h3>
                {items.map((item) => (
                  <SidebarItem
                    key={item._id}
                    _id={item._id}
                    title={item.title}
                    selectedConversation={selectedConversation!}
                    onSelect={() => setSelectedConversation(item._id)}
                    onDelete={handleDelete}
                    onRename={handleRename}
                    deletePending={deleteRequestPending}
                  />
                ))}
              </div>
            ))}
          </div>
        </aside>
        <main className="w-full flex-1 flex flex-col bg-white p-4 rounded-3xl border h-[calc(100vh-212px)]">
          <div className="flex-1 p-5 overflow-y-auto flex flex-col">
            {!messages.length ? (
              <div className="flex-1 flex flex-col justify-center items-center pb-40 space-y-4">
                <div className="h-14 w-14 relative">
                  <Image
                    src="/logo/growstack-mini.png"
                    alt="growstack_ai_chat"
                    fill
                  />
                </div>
                <h1 className="text-primary-green text-xl">
                  Growstack <span className="font-semibold">AI</span>
                </h1>
              </div>
            ) : (
              <ChatMessage
                onButtonClick={handleChatMessageButtonClick}
                conversation={messages}
                selectedConversation={selectedConversation}
              />
            )}
          </div>
          <ChatInput
            ref={chatInputRef}
            enableWebBrowsing={enableWebAccess}
            enableSecure={enableSecureChat}
            selectedBrandVoice={brandVoices.find((voice) => voice._id === selectedBrandVoice)}
            onSend={updateMessage}
            fetchConversations={fetchConversations}
            selectedConversation={selectedConversation}
            setSelectedConversation={setSelectedConversation}
            selectedModel={selectedModel}
            addMessage={addMessage}
            removeMessage={removeMessage} />
        </main>
      </div>
    </>
  );
};

export default Layout;
