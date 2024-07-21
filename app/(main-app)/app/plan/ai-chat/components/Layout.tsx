"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import SidebarItem from "./SidebarItem";
import { Search } from "lucide-react";
import { AnthropicClaude, ChatGptIcon2, GoogleGemini } from "@/components/svgs";
import clsx from "clsx";
import axios from "axios";
import { API_URL } from "@/lib/api";
import { ISidebarItem } from "../interface/chat.interface";
import { aiModelOptions } from "../../../create/ai-articles/constants/options";

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
const Layout = ({
  sidebarItems,
  setSidebarItems,
  fetchConversations,
}: LayoutProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [_, setShowNewChatInput] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("gpt-3.5-turbo");
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [groupedSidebarItems, setGroupedSidebarItems] = useState<{
    [date: string]: ISidebarItem[];
  }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleSearch, setToggleSearch] = useState<boolean>(false);

  const fetchMessages = async (_id: string) => {
    try {
      const response = await axios.get(
        `${API_URL}/ai/api/v1/conversation/${_id}`
      );
      const chatData = response.data.data.chats;
      const messages = chatData.reduce((acc: Message[], chats: any) => {
        const flattenedThreads = chats.thread.flatMap((thread: any) => [
          { role: "user", content: thread.user_prompt, loading: false },
          { role: "assistant", content: thread.response, loading: false },
        ]);
        return acc.concat(flattenedThreads);
      }, []);
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
    if (selectedConversation) {
      fetchMessages(selectedConversation);
    }
  }, [selectedConversation]);

  useEffect(() => {
    setGroupedSidebarItems(groupByDate(sidebarItems));
  }, [sidebarItems]);

  const handleRename = async (_id: string, newTitle: string) => {
    try {
      await axios.put(`${API_URL}/ai/api/v1/conversation/${_id}`, {
        title: newTitle,
      });
      fetchConversations();
    } catch (error) {
      console.error("Error renaming chat:", error);
    }
  };
  const handleDelete = async (_id: string) => {
    try {
      await axios.delete(`${API_URL}/ai/api/v1/conversation/${_id}`);
      fetchConversations();
    } catch (error) {
      console.error("Error renaming chat:", error);
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

  const [selectedOption, setSelectedOption] = useState(aiModelOptions[0].value);
  const selectedOptionLabel = aiModelOptions.find(
    (option) => option.value === selectedOption
  )?.label;

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredSidebarItems = sidebarItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedFilteredSidebarItems = groupByDate(filteredSidebarItems);

  return (
    <div className="flex-1 flex gap-4 mt-10 ">
      <aside className="fixed flex flex-col w-[380px] border bg-white rounded-3xl h-[calc(100vh-150px)]">
        <div className="flex gap-2 p-5">
          <Select value={selectedOption} onValueChange={setSelectedOption}>
            <SelectTrigger className="w-[200px] h-12 bg-primary-green text-white border-0 rounded-xl flex items-center justify-between px-4">
              <SelectValue placeholder="Select an option">
                {selectedOptionLabel && (
                  <div className="flex items-center gap-2">
                    <span className="min-w-fit">
                      {
                        aiModelOptions.find(
                          (option) => option.value === selectedOption
                        )?.icon
                      }
                    </span>
                    {selectedOptionLabel}
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {aiModelOptions.map(({ icon, label, value }) => (
                  <SelectItem key={value} value={value}>
                    <div
                      className={clsx(
                        "flex items-center gap-2",
                        selectedOption === value &&
                          "text-primary-green font-medium"
                      )}
                    >
                      <span className="min-w-fit">{icon}</span>
                      {label}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <button
            onClick={() => {
              setSelectedConversation(null);
              setMessages([]);
              setShowNewChatInput(true);
            }}
            className="text-white bg-primary-green hover:bg-primary-green/90 flex gap-2 justify-center items-center h-12 px-6 font-medium rounded-xl transition-all duration-300 text-sm"
          >
            New
          </button>
          <button
            className="text-white bg-primary-black rounded-full h-12 w-12 grid place-content-center"
            onClick={() => setToggleSearch(!toggleSearch)}
          >
            <Search size={20} />
          </button>
        </div>
        <div className="border-y border-[#EFEFEF] flex items-center justify-between py-3 px-6">
          {toggleSearch && (
            <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md">
              <Search className="text-gray-500" size={20} />
              <input
                type="search"
                className="outline-none h-[40px] w-full"
                placeholder="Search"
                onChange={handleSearch}
              />
            </div>
          )}
        </div>
        <div className="border-y border-[#EFEFEF] flex items-center justify-between py-3 px-6">
          <h2 className="font-semibold">Your conversations</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          {Object.entries(groupedFilteredSidebarItems).map(([date, items]) => (
            <div key={date}>
              <h3 className="text-lg font-semibold">{date}</h3>
              {items.map((item) => (
                <SidebarItem
                  key={item._id}
                  _id={item._id}
                  title={item.title}
                  onSelect={() => setSelectedConversation(item._id)}
                  onDelete={handleDelete}
                  onRename={handleRename}
                  setSidebarItems={(value: React.SetStateAction<any[]>) => {
                    throw new Error("Function not implemented.");
                  }}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="h-20 w-full bg-gradient-to-b from-transparent via-white to-white rounded-b-3xl" />
      </aside>
      <main className="fixed flex flex-col bg-white p-4 rounded-3xl border  ml-[390px] h-[calc(100vh-150px)] w-[calc(100%-600px)]">
        <div className="flex-1 p-4 overflow-y-auto ">
          <ChatMessage
            conversation={messages}
            selectedConversation={selectedConversation}
          />
        </div>
        <ChatInput
          onSend={updateMessage}
          selectedModel={selectedModel}
          fetchConversations={fetchConversations}
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
          selectedOption={selectedOption}
          addMessage={addMessage}
          removeMessage={removeMessage}
        />
      </main>
    </div>
  );
};

export default Layout;
