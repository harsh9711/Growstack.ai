"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
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

interface SidebarItem {
  _id: string;
  title: string;
  createdDate: string;
  updatedDate?: string;
  selected:boolean;
  onRename: (_id: string, newTitle: string) => void;
  onSelect: () => void;
}

type Message = {
  message: string;
  isUser: boolean;
};

const groupByDate = (items: SidebarItem[]) => {
  const grouped: { [date: string]: SidebarItem[] } = {};

  items.forEach(item => {
    const date = item.updatedDate ? item.updatedDate?.split('T')[0] : item.createdDate?.split('T')[0];
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(item);
  });

  return grouped;
};
const Layout: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showNewChatInput, setShowNewChatInput] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("gpt-3.5-turbo");
  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

   const fetchMessages = async (_id: string) => {
    try {
      const response = await axios.get(`${API_URL}/ai/api/v1/conversation/${_id}`);
      const chatData = response.data.data.chats;
      const messages = chatData.reduce((acc: Message[], chats: any) => {
        const flattenedThreads = chats.thread.flatMap((thread: any) => [
          { message: thread.user_prompt, isUser: true },
          { message: thread.response, isUser: false },
        ]);
        return acc.concat(flattenedThreads);
      }, []);
      setMessages(messages);
      setSelectedConversation(_id);
      const firstFewWords = response.data.data.title
      setSidebarItems(prevItems =>
        prevItems.map(item =>
          item._id === _id ? { ...item, title: firstFewWords } : item
        )
      );
    setShowNewChatInput(true);

    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };
  const fetchConversations = async () => {
    try {
      const response = await axios.get(`${API_URL}/ai/api/v1/conversation/`);
      const items = response.data.data.map((item: any) => ({
        _id: item._id,
        title: item.title,
        selected: item.selected,
        createdDate: item.createdAt,
        updatedDate: item.updatedAt,
      }));
      setSidebarItems(items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(()=>{
    if(selectedConversation){
      fetchMessages(selectedConversation)
    }
  },[selectedConversation])

    useEffect(() => {
      fetchConversations();
  }, []);

    const handleRename = async (_id: string, newTitle: string) => {
    try {
    await axios.put(`${API_URL}/ai/api/v1/conversation/${_id}`, { title: newTitle });
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

  const handleSend = (message: string, isUser: boolean = true,id:string | null) => {
    setMessages(prevMessages => {
      if (!isUser && prevMessages.length > 0 && !prevMessages[prevMessages.length - 1].isUser) {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1].message = message;
        return updatedMessages;
      } else {
        return [...prevMessages, { message, isUser }];
      }
    });
    id && setSelectedConversation(id);
  };
  const groupedSidebarItems = groupByDate(sidebarItems);

  const options = [
    { label: "ChatGPT 3.5", value: "gpt-3.5", icon: <ChatGptIcon2 /> },
    { label: "ChatGPT 3.5 Turbo", value: "gpt-3.5-turbo", icon: <ChatGptIcon2 /> },
    { label: "GPT 4", value: "gpt-4", icon: <ChatGptIcon2 /> },
    { label: "GPT 4 Turbo", value: "gpt-4-turbo", icon: <ChatGptIcon2 /> },
    { label: "GPT 4o", value: "gpt-4o", icon: <ChatGptIcon2 /> },
    { label: "Claude 2", value: "claude-2", icon: <AnthropicClaude /> },
    { label: "Claude 3 Haiku", value: "claude-3-haiku", icon: <AnthropicClaude /> },
    { label: "Claude 3 Opus", value: "claude-3-opus", icon: <AnthropicClaude /> },
    { label: "Claude 3 Sonnet", value: "claude-3-sonnet", icon: <AnthropicClaude /> },
    { label: "Claude 3.5 Sonnet", value: "claude-3.5-sonnet", icon: <AnthropicClaude /> },
    { label: "Gemini 1.5 Flash", value: "gemini-1.5-flash", icon: <GoogleGemini /> },
    { label: "Gemini 1.5 Pro", value: "gemini-1.5-pro", icon: <GoogleGemini /> },
    
  ];

  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const selectedOptionLabel = options.find((option) => option.value === selectedOption)?.label;

  return (
    <div className="flex-1 h-full flex gap-4 mt-10">
      <aside className="w-full max-w-[380px] relative border bg-white rounded-3xl flex flex-col">
        <div className="flex gap-2 p-5">
          <Select value={selectedOption} onValueChange={setSelectedOption}>
            <SelectTrigger className="w-[200px] h-12 bg-primary-green text-white border-0 rounded-xl flex items-center justify-between px-4">
              <SelectValue placeholder="Select an option">
                {selectedOptionLabel && (
                  <div className="flex items-center gap-2">
                    <span className="min-w-fit">{options.find((option) => option.value === selectedOption)?.icon}</span>
                    {selectedOptionLabel}
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {options.map(({ icon, label, value }) => (
                  <SelectItem key={value} value={value}>
                    <div className={clsx("flex items-center gap-2", selectedOption === value && "text-primary-green font-medium")}>
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
              setShowNewChatInput(true)
            }}
            className="text-white bg-primary-green hover:bg-primary-green/90 flex gap-2 justify-center items-center h-12 px-6 font-medium rounded-xl transition-all duration-300 text-sm">
            New
          </button>
          <button className="text-white bg-primary-black rounded-full h-12 w-12 grid place-content-center">
            <Search size={20} />
          </button>
        </div>
        <div className="border-y border-[#EFEFEF] flex items-center justify-between py-3 px-6">
          <h2 className="font-semibold">Your conversations</h2>
          {/* <button className="hover:bg-primary-green/10 sheen px-2 py-1.5 text-primary-green font-medium rounded transition-all duration-300 text-sm">
            Clear all
          </button> */}
        </div>
 <div className="relative p-5 flex-1 overflow-y-auto max-h-[calc(100vh-280px)]">
          {Object.entries(groupedSidebarItems).map(([date, items]) => (
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
                  setSidebarItems={function (value: React.SetStateAction<any[]>): void {
                    throw new Error("Function not implemented.");
                  } }                
                />
              ))}
            </div>
          ))}
        </div>
        <div className="h-20 w-full bg-gradient-to-b from-transparent via-white to-white absolute bottom-0 rounded-b-3xl" />
      </aside>
      <main className="flex-1 w-full flex flex-col bg-white p-4 rounded-3xl border">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((message, idx) => (
            <ChatMessage key={idx} message={message.message} isUser={message.isUser}/>
          ))}
        </div>
        {showNewChatInput && <ChatInput onSend={handleSend} selectedModel={selectedModel} fetchConversations={fetchConversations} selectedConversation={selectedConversation} selectedOption={selectedOption}/>}
      </main>
    </div>
  );
};

export default Layout;
