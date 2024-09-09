"use client";

import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import { useState } from "react";
import toast from "react-hot-toast";
import { modelData } from "../../create/ai-articles/constants/options";
import ChatArea from "./component/chatArea";
import NewChatAlert from "./component/newChatArea";
import { Message } from "./interface/playground";
interface ChatAreaType {
  id: number;
  selectedModel: string;
  provider: string;
  conversation: Message[];
  awaitingUpdate: boolean;
  messages: Message[];
}

const initialChat: ChatAreaType[] = [
  {
    id: 0,
    selectedModel: modelData[0].models[0].value,
    provider: modelData[0].provider,
    conversation: [],
    awaitingUpdate: false,
    messages: [],
  },
  {
    id: 1,
    selectedModel: modelData[0].models[0].value,
    provider: modelData[0].provider,
    conversation: [],
    awaitingUpdate: false,
    messages: [],
  },
];

export default function AiPlayground() {
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [chatAreas, setChatAreas] = useState(initialChat);

  const [retainedMessage, setRetainedMessage] = useState<string>("");

  const addChatArea = () => {
    if (chatAreas.length > 2) {
      toast.error("Maximum of Three chats");
      return;
    }
    setChatAreas([
      ...chatAreas,
      {
        id: chatAreas.length,
        selectedModel: modelData[0].models[0].value,
        provider: modelData[0].provider,
        conversation: [],
        awaitingUpdate: false,
        messages: [],
      },
    ]);
  };

  const updateChatAreaModel = (id: number, newModel: string) => {
    const newProvider = modelData.find((provider) =>
      provider.models.some((model) => model.value === newModel)
    )?.provider;

    setChatAreas(
      chatAreas.map((chatArea) =>
        chatArea.id === id
          ? {
              ...chatArea,
              selectedModel: newModel,
              provider: newProvider || "",
            }
          : chatArea
      )
    );
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPrompt(event.target.value);
  };

  const handleDelete = (id: number) => {
    if (chatAreas.length > 1) {
      setChatAreas(chatAreas.filter((chatArea) => chatArea.id !== id));
    } else {
      toast.error("Minimum of One Chat");
    }
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
        awaitingUpdate: true,
        messages: chatArea.messages,
      }))
    );

    try {
      const responses = await Promise.all(
        chatAreas.map(async (chatArea) => {
          const payload = {
            user_prompt: userPrompt,
            model: chatArea.selectedModel,
            provider: chatArea.provider,
            messages: chatArea.messages,
          };

          const response = await instance.post(
            `${API_URL}/ai/api/v1/playground`,
            payload
          );

          const initialText = response.data.data.text;
          const updatedMessages = response.data.data.updatedMessages;

          return { chatArea, initialText, updatedMessages };
        })
      );

      setChatAreas((prevChatAreas) =>
        prevChatAreas.map((chatArea) => {
          const response = responses.find(
            (res) => res.chatArea.id === chatArea.id
          );
          if (response) {
            const { initialText, updatedMessages } = response;

            return {
              ...chatArea,
              conversation: chatArea.awaitingUpdate
                ? [
                    ...chatArea.conversation.slice(0, -1),
                    {
                      ...chatArea.conversation[
                        chatArea.conversation.length - 1
                      ],
                      content: initialText,
                      loading: false,
                    },
                  ]
                : chatArea.conversation,
              awaitingUpdate: updatedMessages.length > 0,
              message: initialText,
              messages: updatedMessages,
            };
          }
          return chatArea;
        })
      );
    } catch (error) {
      console.error("Error sending prompt:", error);
    }

    setUserPrompt("");
  };

  return (
    <div className="flex-1 h-full flex flex-col mt-10 overflow-x-auto">
      <form onSubmit={handleSubmit} className="flex-1 h-full flex gap-6">
        <div className="!bg-white h-full flex flex-col border border-[#E8E8E8] shadow-box p-5 space-y-5">
          <NewChatAlert handleNewChat={() => setChatAreas(initialChat)} />
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
            handleDelete={() => handleDelete(chatArea.id)}
          />
        ))}
      </form>
    </div>
  );
}
