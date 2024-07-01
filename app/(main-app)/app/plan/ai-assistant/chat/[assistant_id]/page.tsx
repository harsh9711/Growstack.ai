"use client";

import axios from "@/config/axios.config";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Assistant, Conversation } from "../../components/types";
import Topbar from "./components/Topbar";
import ChatSection from "./components/ChatSection";

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

  useEffect(() => {
    const fetchAssistantConversation = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/ai/api/v1/assistant/${assistant_id}`);
        setAssistantConversation(response.data.data);
      } catch (error: any) {
        console.error("Error fetching assistant data:", error);
        setError("Something went wrong fetching assistant data.");
        if (error.response) {
          toast.error(error.response.data.error);
        } else {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchAssistantData = async () => {
      try {
        const response = await axios.get("/ai/api/v1/assistant");
        setAssistantData(response.data.data.filter((assistant: Assistant) => assistant.id === assistant_id)[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAssistantConversation();
    fetchAssistantData();
  }, [assistant_id]);

  if (loading || !assistantData || !assistantConversation) {
    return <div className="flex-1 h-full flex justify-center items-center">Loading...</div>;
  }

  if (error) {
    return <div className="flex-1 h-full flex justify-center items-center">Error: {error}</div>;
  }

  return (
    <div className="flex-1 flex flex-col h-full w-full">
      <div className="flex-1 flex flex-col h-full !bg-white shadow-box mt-8 border">
        <Topbar assistant={assistantData!} />
        <ChatSection conversation={assistantConversation} assistant={assistantData} />
      </div>
    </div>
  );
};

export default AssistantsChats;
