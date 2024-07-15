"use client";

import axios from "@/config/axios.config";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Assistant } from "@/types/assistants";
import { Conversation } from "../../ai-assistant/components/types";
import Sidebargpt from "../new/components/Sidebar";
import Topbar from "../new/components/Topbar";
import Sidebargpt4 from "./components/Sidebar";

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
      <div className="flex-1 flex flex-col h-full !bg-gray-100 shadow-box mt-8 border">
      <Topbar  />
        <div className="h-full">
       <Sidebargpt4/>

          {/* <ChatSection/> */}
        </div>
      </div>
    </div>
  );
};

export default AssistantsChats;
