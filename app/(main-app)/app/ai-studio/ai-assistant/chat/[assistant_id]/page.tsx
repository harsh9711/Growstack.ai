"use client";

import instance from "@/config/axios.config";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Assistant, Conversation, Chat } from "../../components/types";
import Topbar from "./components/Topbar";
import ChatSection from "./components/ChatSection";
import Sidebar from "./components/Sidebar";
import ChatHistory from "./components/ChatHistory";
import {
  aiModelOptions,
  languageOptions,
} from "@/app/(main-app)/app/ai-studio/ai-articles/constants/options";
import Spinner from "@/components/Spinner";

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
  const [isHistoryOpen, setHistoryOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    languageOptions[0].value
  );
  const [messagesData, setMessagesData] = useState<Chat[]>([]);

  const [selectedAiModel, setSelectedAiModel] = useState(
    aiModelOptions[0].models[0].value
  );
  const [newChat, setNewChat] = useState(false);
  const [convId, setConvId] = useState('');

  useEffect(() => {
    const fetchAssistantConversation = async () => {
      setLoading(true);
      try {
        const response = await instance.get(
          `http://127.0.0.1:8081/ai/api/v1/assistant/${assistant_id}/${newChat}`
        );

        setAssistantConversation(response.data.data.convo);
        setConvId(response.data.data.convo._id);
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
  }, [newChat, assistant_id]);

  if (loading || !assistantData || !assistantConversation) {
    return (
      <div className="flex-1 flex flex-col gap-5 justify-center items-center">
        <Spinner color="black" size={100} />
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
    <div
      className={`flex-1 flex !bg-white shadow-box border ${isSidebarOpen ? "overflow-hidden" : ""} ${isHistoryOpen ? "overflow-hidden" : ""}`}
    >
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        assistant_id={assistant_id}
      />
      <ChatHistory
        isOpen={isHistoryOpen}
        onClose={() => setHistoryOpen(false)}
        assistant_id={assistant_id}
        newChat={newChat}
        setNewChat={setNewChat}
      />
      <div className="flex-1 flex flex-col">
        <Topbar
          conversation={assistantConversation}
          assistant={assistantData!}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isHistoryOpen={isHistoryOpen}
          setHistoryOpen={setHistoryOpen}
          selectedLanguage={selectedLanguage}
          switchLanguage={switchLanguage}
          setSelectedAiModel={setSelectedAiModel}
          selectedAiModel={selectedAiModel}
          messagesData={messagesData}
        />
        <ChatSection
          conversation={assistantConversation}
          assistant={assistantData}
          selectedLanguage={selectedLanguage}
          selectedAiModel={selectedAiModel}
          setMessagesData={setMessagesData}
          newChat={newChat}
          setNewChat={setNewChat}
        />
      </div>
    </div>
  );
};

export default AssistantsChats;
