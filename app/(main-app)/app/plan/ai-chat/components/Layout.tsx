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
  title: string;
  selected: boolean;
}

const Layout: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [showNewChatInput, setShowNewChatInput] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("gpt-3.5-turbo");
  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}ai/api/v1/conversation/`);
        console.log("API Response:", response.data);
        // Adjust the response based on your API's structure
        const items = response.data.map((item: any) => ({
          title: item.title,
          selected: item.selected
        }));
        setSidebarItems(items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSend = (message: string) => {
    setMessages(prevMessages => [...prevMessages, `You: ${message}`]);
  };

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
    { label: "LLaMA 2 13B Chat", value: "llama-2-13b-chat", icon: <ChatGptIcon2 /> },
    { label: "LLaMA 2 70B Chat", value: "llama-2-70b-chat", icon: <ChatGptIcon2 /> },
    { label: "LLaMA 2 7B Chat", value: "llama-2-7b-chat", icon: <ChatGptIcon2 /> },
    { label: "LLaMA 3 70B Instruct", value: "llama-3-70b-instruct", icon: <ChatGptIcon2 /> },
    { label: "LLaMA 3 70B Instruct Groq", value: "llama-3-70b-instruct-groq", icon: <ChatGptIcon2 /> },
    { label: "LLaMA 3 8B Instruct", value: "llama-3-8b-instruct", icon: <ChatGptIcon2 /> },
    { label: "LLaMA 3 8B Instruct Groq", value: "llama-3-8b-instruct-groq", icon: <ChatGptIcon2 /> },
    { label: "LLaMA 3 Sonar Large 32K Chat", value: "llama-3-sonar-large-32k-chat", icon: <ChatGptIcon2 /> },
    { label: "LLaMA 3 Sonar Small 32K Chat", value: "llama-3-sonar-small-32k-chat", icon: <ChatGptIcon2 /> },
    { label: "Mistral 7B Instruct 4K", value: "mistral-7b-instruct-4k", icon: <ChatGptIcon2 /> },
    { label: "Mistral Codestral", value: "mistral-codestral", icon: <ChatGptIcon2 /> },
    { label: "Mistral Large", value: "mistral-large", icon: <ChatGptIcon2 /> },
    { label: "Mistral Medium", value: "mistral-medium", icon: <ChatGptIcon2 /> },
    { label: "Mistral Small", value: "mistral-small", icon: <ChatGptIcon2 /> },
    { label: "Mistral 8x22B Instruct", value: "mistral-8x22b-instruct", icon: <ChatGptIcon2 /> },
    { label: "Mistral 8x7B", value: "mistral-8x7b", icon: <ChatGptIcon2 /> },
    { label: "Mistral 8x7B Groq", value: "mistral-8x7b-groq", icon: <ChatGptIcon2 /> },
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
            onClick={() => setShowNewChatInput(true)}
            className="text-white bg-primary-green hover:bg-primary-green/90 flex gap-2 justify-center items-center h-12 px-6 font-medium rounded-xl transition-all duration-300 text-sm">
            New
          </button>
          <button className="text-white bg-primary-black rounded-full h-12 w-12 grid place-content-center">
            <Search size={20} />
          </button>
        </div>
        <div className="border-y border-[#EFEFEF] flex items-center justify-between py-3 px-6">
          <h2 className="font-semibold">Your conversations</h2>
          <button className="hover:bg-primary-green/10 sheen px-2 py-1.5 text-primary-green font-medium rounded transition-all duration-300 text-sm">
            Clear all
          </button>
        </div>
        <div className="flex-1 h-full max-h-[68vh] overflow-x-hidden overflow-y-auto hidden-scrollbar pb-8">
          {sidebarItems.map((item, index) => (
            <SidebarItem key={index} title={item.title} selected={item.selected} />
          ))}
        </div>
        <div className="h-20 w-full bg-gradient-to-b from-transparent via-white to-white absolute bottom-0 rounded-b-3xl" />
      </aside>
      <main className="flex-1 w-full flex flex-col bg-white p-4 rounded-3xl border">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((message, idx) => (
            <ChatMessage key={idx} message={message} isUser={idx % 2 === 0} />
          ))}
        </div>
        {showNewChatInput && <ChatInput onSend={handleSend} selectedModel={selectedModel} />}
      </main>
    </div>
  );
};

export default Layout;
