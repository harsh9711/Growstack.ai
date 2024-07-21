"use client";

import instance from "@/config/axios.config";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Assistant, Conversation } from "../../components/types";
import Topbar from "./components/Topbar";
import ChatSection from "./components/ChatSection";
import Sidebar from "./components/Sidebar";
import { languageOptions } from "@/app/(main-app)/app/create/ai-articles/constants/options";

interface PageProps {
  params: {
    assistant_id: string;
  };
}

const AssistantsChats: React.FC<PageProps> = ({
  params: { assistant_id },
}: PageProps) => {
  const [assistantData, setAssistantData] = useState<Assistant | null>(null);
  const [assistantConversation, setAssistantConversation] =
    useState<Conversation | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    languageOptions[0].value
  );

  useEffect(() => {
    const fetchAssistantConversation = async () => {
      setLoading(true);
      try {
        const response = await instance.get(
          `/ai/api/v1/assistant/${assistant_id}`
        );
        setAssistantConversation(response.data.data.convo);
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
        const response = await instance.get("/ai/api/v1/assistant");
        setAssistantData(
          response.data.data.filter(
            (assistant: Assistant) => assistant.id === assistant_id
          )[0]
        );
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.error);
        } else {
          toast.error(error.message);
        }
      }
    };

    fetchAssistantConversation();
    fetchAssistantData();
  }, [assistant_id]);

  if (loading || !assistantData || !assistantConversation) {
    return (
      <div className="flex-1 h-full flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 h-full flex justify-center items-center">
        Error: {error}
      </div>
    );
  }

  const switchLanguage = (language: string) => {
    setSelectedLanguage(language);
  };

  return (
    <div className="flex-1 flex flex-col h-full w-full">
      <div className="flex-1 flex h-full !bg-white shadow-box mt-8 border">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          assistant_id={assistant_id}
        />
        <div className="flex-1 flex flex-col h-[82.7vh]">
          <Topbar
            conversation={assistantConversation}
            assistant={assistantData!}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            selectedLanguage={selectedLanguage}
            switchLanguage={switchLanguage}
          />
          <ChatSection
            conversation={assistantConversation}
            assistant={assistantData}
            selectedLanguage={selectedLanguage}
          />
        </div>
      </div>
    </div>
  );
};

export default AssistantsChats;
