"use client";

import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import { useState } from "react";
import toast from "react-hot-toast";
import { llmComparisonModels } from "../ai-articles/constants/options";
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
  renderConversation: any;
  responseLoading: boolean;
}

const initialChat: ChatAreaType[] = [
  {
    id: 0,
    selectedModel: llmComparisonModels[0].models[0].value,
    provider: llmComparisonModels[0].models[0].provider,
    conversation: [],
    awaitingUpdate: false,
    messages: [],
    renderConversation: {},
    responseLoading: false,
  },
  {
    id: 1,
    selectedModel: llmComparisonModels[0].models[0].value,
    provider: llmComparisonModels[0].models[0].provider,
    conversation: [],
    awaitingUpdate: false,
    messages: [],
    renderConversation: {},
    responseLoading: false,
  },
];

export default function AiPlayground() {
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [chatAreas, setChatAreas] = useState<ChatAreaType[]>(initialChat);
  const [responseLoading, isResponseLoading] = useState(false);

  const [retainedMessage, setRetainedMessage] = useState<string>("");

  const getNextAvailableId = (): number => {
    const usedIds = chatAreas.map(area => area.id);
    for (let i = 0; i <= 2; i++) {
      if (!usedIds.includes(i)) {
        return i;
      }
    }
    return -1; // This should never happen if we maintain max 3 chat areas
  };

  const addChatArea = () => {
    if (chatAreas.length >= 3) {
      toast.error("Maximum of 3 chats allowed.");
      return;
    }
    const newId = getNextAvailableId();
    if (newId === -1) {
      toast.error("Unable to add new chat area");
      return;
    }
    const newChatArea: ChatAreaType = {
      id: newId,
      selectedModel: llmComparisonModels[0].models[0].value,
      provider: llmComparisonModels[0].models[0].provider,
      conversation: [],
      awaitingUpdate: false,
      messages: [],
      renderConversation: {},
      responseLoading: false,
    };
    setChatAreas(prevAreas => [...prevAreas, newChatArea]);
  };

  const updateChatAreaModel = (id: number, newModel: string) => {
    const newProvider = llmComparisonModels
      .flatMap(category => category.models)
      .find(model => model.value === newModel)?.provider;

    setChatAreas(
      chatAreas.map(chatArea =>
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

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserPrompt(event.target.value);
  };

  const handleDelete = (id: number) => {
    if (chatAreas.length <= 1) {
      toast.error("At least 1 chat required.");
      return;
    }
    setChatAreas(prevAreas => prevAreas.filter(area => area.id !== id));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // renderConversation()
  };

  const renderConversation = async (chatMessage?: string) => {
    const prompt = userPrompt?.trim() ?? "";
    const message = chatMessage?.trim() ?? "";
  
    if (prompt === "" && message === "") return;
  
    isResponseLoading(true);
  
    const newMessage: Message = {
      content: prompt || message,
      role: "user",
      loading: false,
    };
  
    const loadingAssistantMessage: Message = {
      content: "",
      role: "assistant",
      loading: true,
    };
  
    setChatAreas(prevChatAreas =>
      prevChatAreas.map(chatArea => ({
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
  
    const concurrencyLimit = 3;
    let index = 0;
  
    while (index < chatAreas.length) {
      // Get the current batch
      const batch = chatAreas.slice(index, index + concurrencyLimit);
  
      await Promise.all(
        batch.map(async chatArea => {
          const payload = {
            user_prompt: prompt || message,
            model: chatArea.selectedModel,
            provider: chatArea.provider,
            messages: chatArea.messages,
          };
  
          try {
            const response = await instance.post(
              `${API_URL}/ai/api/v1/playground`,
              payload
            );
  
            const initialText = response.data.data.response.text;
            const updatedMessages = response.data.data.response.updatedMessages;
  
            // Update each chatArea as soon as the response is received
            setChatAreas(prevChatAreas =>
              prevChatAreas.map(prevChatArea => {
                if (prevChatArea.id === chatArea.id) {
                  return {
                    ...prevChatArea,
                    conversation: prevChatArea.awaitingUpdate
                      ? [
                          ...prevChatArea.conversation.slice(0, -1),
                          {
                            ...prevChatArea.conversation[
                              prevChatArea.conversation.length - 1
                            ],
                            content: initialText,
                            loading: false,
                          },
                        ]
                      : prevChatArea.conversation,
                    awaitingUpdate: updatedMessages?.length > 0,
                    messages: updatedMessages,
                  };
                }
                return prevChatArea;
              })
            );
          } catch (error: any) {
            toast.error(error?.response?.data?.message || "Something went wrong");
            console.error("Error sending prompt for chat area:", chatArea.id, error);
          }
        })
      );
  
      index += concurrencyLimit;
  
      // Optional delay between batches
      await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay
    }
  
    isResponseLoading(false);
    setUserPrompt("");
  };
  
  return (
    <div className="flex-1 h-full flex flex-col mt-10 w-full justify-center overflow-x-auto">
      <form
        onSubmit={handleSubmit}
        className="flex-1 h-full flex justify-center gap-6 w-full"
      >
        <div className="!bg-white h-full flex flex-col border border-[#E8E8E8] shadow-box md:p-3 lg:p-5 space-y-5">
          <NewChatAlert handleNewChat={() => setChatAreas(initialChat)} />
        </div>
        <div className="container flex gap-6 flex-1 m-0 overflow-x-auto">
          {chatAreas.map(chatArea => (
            <ChatArea
              key={chatArea.id}
              selectedModel={chatArea.selectedModel}
              addChatArea={addChatArea}
              onModelChange={newModel =>
                updateChatAreaModel(chatArea.id, newModel)
              }
              handleChange={handleChange}
              conversation={chatArea.conversation}
              userPrompt={userPrompt}
              handleDelete={() => handleDelete(chatArea.id)}
              renderConversation={renderConversation}
              responseLoading={responseLoading}
            />
          ))}
        </div>
      </form>
    </div>
  );
}
