"use client";

import { History, Plus } from "lucide-react";
import Image from "next/image";
import ChatArea from "./component/chatArea";
import { useState } from "react";
import { aiModelOptions } from "../../create/ai-articles/constants/options";
import { Message } from "./interface/playground";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";

export default function AiPlayground() {
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [chatAreas, setChatAreas] = useState<
    { id: number; selectedModel: string; conversation: Message[] }[]
  >([
    { id: 0, selectedModel: aiModelOptions[0].value, conversation: [] },
    { id: 1, selectedModel: aiModelOptions[0].value, conversation: [] },
  ]);

  const addChatArea = () => {
    setChatAreas([
      ...chatAreas,
      {
        id: chatAreas.length,
        selectedModel: aiModelOptions[0].value,
        conversation: [],
      },
    ]);
  };

  const updateChatAreaModel = (id: number, newModel: string) => {
    setChatAreas(
      chatAreas.map((chatArea) =>
        chatArea.id === id ? { ...chatArea, selectedModel: newModel } : chatArea
      )
    );
  };

  const convo: Message[] = [
    {
      content: "Hello World",
      role: "user",
      loading: false,
    },
    {
      content: "I am just an assistant",
      role: "assistant",
      loading: false,
    },
    {
      content: "How are you doing?",
      role: "user",
      loading: false,
    },
    {
      content: "I don't have a feeling for that",
      role: "assistant",
      loading: false,
    },
  ];


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPrompt(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (userPrompt.trim() === "") return;

    const newMessage: Message = {
      content: userPrompt,
      role: "user",
      loading: false,
    };

    const loadingAssistantMessage: Message = {
      content: "",
      role: "assistant",
      loading: true,
    };

    setChatAreas((prevChatAreas) =>
      prevChatAreas.map((chatArea) => ({
        ...chatArea,
        conversation: [
          ...chatArea.conversation,
          newMessage,
          loadingAssistantMessage,
        ],
      }))
    );

    await Promise.all(
      chatAreas.map(async (chatArea, index) => {
        const payload = {
          user_prompt: userPrompt,
          model: chatArea.selectedModel,
          provider: "perplexity",
        };

        try {
          const response = await instance.post(
            `${API_URL}/ai/api/v1/playground`,
            payload
          );

          console.log("responsezzzz", response);
          // const assistantMessage: Message = {
          //   content: response.data.message,
          //   role: "assistant",
          //   loading: false,
          // };

          // setChatAreas((prevChatAreas) =>
          //   prevChatAreas.map((ca, caIndex) =>
          //     ca.id === chatArea.id
          //       ? {
          //           ...ca,
          //           conversation: ca.conversation.map((msg, msgIndex) =>
          //             msgIndex === ca.conversation.length - 1
          //               ? assistantMessage
          //               : msg
          //           ),
          //         }
          //       : ca
          //   )
          // );
        } catch (error) {
          console.error("Error sending prompt:", error);
        }
      })
    );

    setUserPrompt("");
  };

  return (
    <div className="flex-1 h-full flex flex-col mt-10">
      <form onSubmit={handleSubmit} className="flex-1 h-full flex gap-6">
        <div className="!bg-white fixed left-0 flex flex-col border border-[#E8E8E8] shadow-box p-5 space-y-5 h-fit">
          <button
            type="button"
            className="bg-primary-green p-3 rounded-[16px] text-white"
          >
            <Plus size={32} />
          </button>
          <button
            type="button"
            className="bg-primary-green p-3 rounded-[16px] text-white"
          >
            <History size={32} />
          </button>
        </div>
        {chatAreas.map((chatArea) => (
          <ChatArea
            key={chatArea.id}
            selectedModel={chatArea.selectedModel}
            addChatArea={addChatArea}
            onModelChange={(newModel) =>
              updateChatAreaModel(chatArea.id, newModel)
            }
            handleChange={handleChange}
            conversation={chatArea.conversation}
            userPrompt={userPrompt}
          />
        ))}
      </form>
    </div>
  );
}
