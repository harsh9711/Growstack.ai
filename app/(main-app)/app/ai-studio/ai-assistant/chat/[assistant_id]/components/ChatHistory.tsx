"use client";
import clsx from "clsx";
import { CloseIcon, MessageIcon2 } from "@/components/svgs";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import instance from "@/config/axios.config";
import { Chat } from "../../../components/types";
import { API_URL } from "@/lib/api";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  assistant_id: string;
  newChat: boolean;
  setNewChat: (value: boolean) => void;
  messages : Chat[];
  convId:any
  setConvId: (convoId: string) => void;
}

export default function ChatHistory({
  isOpen,
  onClose,
  assistant_id,
  newChat,
  setNewChat,
  setConvId,
  messages,
  convId
}: IProps) {
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await instance.post(
          `/ai/api/v1/assistant/getHistoryChat`,
          {
            user_id: localStorage.getItem("user_id"),
            assistant_id: assistant_id,
          }
        );
        const filteredChats = response.data.filter((item: any) => item.chats.length > 0);
        setChatHistory(filteredChats);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };

    fetchChatHistory();
  }, [messages]);


  const handleSelectedConvo = (convoId: string) => {
    console.log("===========================+++++++++++++++++++", convoId);
    setConvId(convoId);
  };



  return (
    <div
      className={clsx(
        isOpen ? "opacity-100" : "opacity-0",
        "transition-all duration-300 bg-white z-50",
        {
          "absolute top-30 lg:left-0 xl:left-0 sm:left-10 md:left-10 h-auto w-[400px] sm:w-[400px] md:w-[400px]":
            isOpen,
          "absolute w-0 overflow-hidden": !isOpen,
        },
        {
          "sm:w-[400px] sm:opacity-100 md:w-[400px] md:opacity-100": isOpen,
          "lg:w-[400px] xl:w-[400px] lg:opacity-100 xl:opacity-100 lg:relative xl:relative lg:border-r xl:border-r":
            isOpen,
        }
      )}
    >
      <div className="border-b py-[18px] px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold whitespace-nowrap">
            Chat History
          </h1>
          <CloseIcon className="cursor-pointer lg:hidden" onClick={onClose} />
        </div>
        <p className="text-primary-black text-opacity-50 mt-1 whitespace-nowrap">
          Your Conversations
        </p>
      </div>
      <div className="flex items-center px-6 py-4 space-x-4">
        <input
          placeholder="Search Conversations"
          className="h-14 bg-[#F5F5F5] rounded-lg w-[80%] p-5 whitespace-nowrap"
        />
        <button
          className="text-white bg-primary-green rounded-full h-12 w-12 grid place-content-center"
          onClick={() => {
            setNewChat(true);
          }}
        >
          <Plus size={22} />
        </button>
      </div>
      <div className="px-6 py-4 max-h-[68vh] overflow-y-auto">
        {chatHistory.length > 0 ? (
          chatHistory.map((chat, index) => (
            <div
              onClick={() => handleSelectedConvo(chat._id)}
              key={index}
              className={`flex gap-4 w-full px-4 mb-1.5 hover:bg-gray-200/80 cursor-pointer group rounded-full transition-all duration-300 overflow-hidden ${
                convId === chat._id ? "bg-gray-200" : ""
              }`}
            >
              {/* {chat._id} */}

              <div className="h-14 flex gap-4 w-full items-center relative overflow-hidden">
                <MessageIcon2 className="group-hover:text-primary-green w-full max-w-fit" />
                <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
                  {chat.chats && chat.chats.length > 0
                    ? chat.chats[chat.chats.length - 1].prompt
                    : "Empty"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>Loading chat history...</p>
        )}
      </div>
    </div>
  );
}
