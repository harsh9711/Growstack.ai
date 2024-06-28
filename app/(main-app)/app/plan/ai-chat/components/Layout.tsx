"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import SidebarItem from "./SidebarItem";
import { Search } from "lucide-react";
import { AnthropicClaude, ChatGptIcon2, GoogleGemini } from "@/components/svgs";
import clsx from "clsx";

const Layout: React.FC = () => {
  const [messages, setMessages] = React.useState<string[]>([]);

  const handleSend = (message: string) => {
    setMessages([...messages, message]);
  };

  const options = [
    { label: "ChatGPT 3.5", value: "chatgpt-3.5", icon: <ChatGptIcon2 /> },
    // { label: "ChatGPT 3.5 Turbo", value: "chatgpt-3.5-turbo", icon: <ChatGptIcon2 /> },
    { label: "GPT 4", value: "gpt-4", icon: <ChatGptIcon2 /> },
    { label: "GPT 4 Turbo", value: "gpt-4-turbo", icon: <ChatGptIcon2 /> },
    { label: "Claude 3 Opus", value: "claude-3-opus", icon: <AnthropicClaude /> },
    { label: "Claude 3 Sonnet", value: "claude-3-sonnet", icon: <AnthropicClaude /> },
    { label: "Claude 3 Haiku", value: "claude-3-haiku", icon: <AnthropicClaude /> },
    { label: "Gemini pro", value: "gemini-pro", icon: <GoogleGemini /> },
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
          <button className="text-white bg-primary-green hover:bg-primary-green/90 flex gap-2 justify-center items-center h-12 px-6 font-medium rounded-xl transition-all duration-300 text-sm">
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
          <div className="space-y-2 p-4 pl-3 pr-0">
            <SidebarItem title="Create Html Game Environ..." />
            <SidebarItem title="Apply To Leave For Emergency Leave For Emergency" />
            <SidebarItem title="What Is UI UX Design?" />
            <SidebarItem title="Create POS System" />
            <SidebarItem title="What Is UX Audit?" />
            <SidebarItem title="Create Chatbot GPT..." selected />
            <SidebarItem title="How Chat GPT Work?" />
          </div>
          <div className="border-y border-[#EFEFEF] flex items-center justify-between py-4 px-6">
            <h2 className="font-semibold">Last 7 Days</h2>
          </div>
          <div className="space-y-2 p-4 pl-3 pr-0">
            <SidebarItem title="Create Html Game Environ..." />
            <SidebarItem title="Apply To Leave For Emergency Leave For Emergency" />
            <SidebarItem title="What Is UI UX Design?" />
            <SidebarItem title="Create POS System" />
            <SidebarItem title="What Is UX Audit?" />
            <SidebarItem title="Create Chatbot GPT..." />
            <SidebarItem title="How Chat GPT Work?" />
          </div>
        </div>
        <div className="h-20 w-full bg-gradient-to-b from-transparent via-white to-white absolute bottom-0 rounded-b-3xl" />
      </aside>
      <main className="flex-1 w-full flex flex-col bg-white p-4 rounded-3xl border">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((message, idx) => (
            <ChatMessage key={idx} message={message} isUser={idx % 2 === 0} />
          ))}
        </div>
        <ChatInput onSend={handleSend} />
      </main>
    </div>
  );
};

export default Layout;
