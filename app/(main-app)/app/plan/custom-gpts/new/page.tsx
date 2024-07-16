"use client";

import axios from "@/config/axios.config";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Topbar from "./components/Topbar";
import ChatSection from "./components/ChatSection";
import Sidebar from "./components/Sidebar";
import Sidebargpt from "./components/Sidebar";
import { Assistant } from "@/types/assistants";
import { Conversation } from "../../ai-assistant/components/types";
import Sidebargpt1 from "./components/Sidebar1";
import Downbar from "./components/Downbar";

interface PageProps {
  params: {
    assistant_id: string;
  };
}

const AssistantsChats: React.FC<PageProps> = ({ params: { assistant_id } }: PageProps) => {
  const [assistantData, setAssistantData] = useState<Assistant | null>(null);
  const [assistantConversation, setAssistantConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);


 

  return (
    <div className="flex-1 flex flex-col h-full w-full">
      <div className="flex flex-col h-full !bg-gray-100 shadow-box mt-8 border">
      <Topbar  />
        <div className="h-full">
        <Sidebargpt />

          {/* <ChatSection/> */}
        </div>
          <Downbar/>
      </div>
    </div>
  );
};

export default AssistantsChats;
