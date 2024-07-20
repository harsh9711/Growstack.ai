'use client';

import axios from '@/config/axios.config';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Topbar from '../new/components/Topbar';
import { API_URL } from '@/lib/api';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import ChatInput from './components/ChatInput';
import ChatMessage from './components/ChatMessage';

type CustomGptData = {
  name: string;
  description: string;
  icon: string;
  _id: string;
  assistant_id: string;
  conversation_starter: string[];
};

type ChatMessageType = {
  thread_id: string;
  message_id: string;
  user_message: string;
  response: string;
  attachments?: [];
  _id?: string;
};

type Conversation = {
  user_message: string;
  response: string;
  loading: boolean;
  images?: string[];
  files?: { file_type: string; file_id: string; file_name: string }[];
};

const Page = () => {
  const [isAPICalled, setIsAPICalled] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const [customeGptData, setCustomGptData] = useState<CustomGptData>({
    name: '',
    description: '',
    icon: '',
    _id: '',
    assistant_id: '',
    conversation_starter: [],
  });
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([]);
  const [conversation, setConversation] = useState<Conversation[]>([]);

  const getCustomGptData = async (id: string | null) => {
    try {
      const {
        data: {
          data: { custom_gpt_id, chats },
        },
      } = await axios.get(`${API_URL}/ai/api/v1/customgpt/${id}`);
      setCustomGptData(custom_gpt_id);
      setChatMessages(chats);
      setConversation(
        chats.map((chat: any) => ({
          user_message: chat.user_message,
          response: chat.response,
          loading: false,
          files: chat.attachments,
          images: chat.image_attachments.map((image: any) => image.url),
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const addMessage = (
    user_prompt: string,
    response: string,
    loading: boolean,
    images?: string[],
    file?: { file_type: string; file_id: string; file_name: string }[]
  ) => {
    setConversation((prev) => [
      ...prev,
      {
        user_message: user_prompt,
        response: response,
        loading: loading,
        images: images,
        files: file,
      },
    ]);
  };

  const onSend = (response: string) => {
    setConversation((prev) => {
      const conv = [...prev];
      conv[conv.length - 1].response = response;
      conv[conv.length - 1].loading = false;
      return conv;
    });
  };

  const handleSend = async (starter: string) => {
    addMessage(starter, '', true);
    try {
      if (chatMessages.length === 0) {
        const {
          data: { data },
        } = await axios.post(`${API_URL}/ai/api/v1/customgpt/chat`, {
          user_prompt: starter,
          custom_gpt_id: customeGptData._id,
          assistant_id: customeGptData.assistant_id,
        });
        setChatMessages([...chatMessages, data]);
        onSend(data.response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const id = searchParams.get('custom_gpt_id');
    if (id) {
      getCustomGptData(id);
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full w-full !bg-gray-100 shadow-box mt-8 border">
      <Topbar
        handleCreateConversation={() => {}}
        isAPICalled={isAPICalled}
        from="UPDATE"
        title={customeGptData.name}
      />
      <div className="flex-1 h-full flex gap-4 mt-10 overflow-auto bg-gray-100 rounded-2xl relative flex-col">
        {conversation.length === 0 && (
          <>
            <div className="w-full p-4 px-8 mt-4 flex flex-col flex-grow">
              <span className="mt-4 flex flex-col flex-grow">
                <span className="flex flex-col ">
                  <h2 className="font-bold text-4xl text-center">Preview</h2>
                </span>
                <div className="mx-auto items-center justify-center flex flex-col gap-y-8">
                  <img
                    src={customeGptData?.icon}
                    alt="Icon"
                    className="rounded-full items-center w-28 h-28"
                  />
                  <span className="items-center justify-center flex flex-col">
                    <h2 className="font-bold text-[18px]">{customeGptData?.name}</h2>
                    <p className="text-[14px]">{customeGptData?.description}</p>
                  </span>
                </div>
              </span>
            </div>
            <div className="!min-h-[100px] grid grid-cols-4 gap-4">
              {customeGptData.conversation_starter.map((starter, index) => (
                <button
                  key={index}
                  className="p-4 border rounded-lg shadow-md bg-white"
                  onClick={() => handleSend(starter)}
                >
                  <span className="text-sm">{starter}</span>
                </button>
              ))}
            </div>
          </>
        )}
        <ChatMessage conversation={conversation} icon={customeGptData.icon} />
        <div className="flex-grow flex items-end">
          <div className="w-full px-4 py-2">
            {/* Ensure ChatInput is always at the bottom */}
            <div className="sticky bottom-0 bg-white">
              <ChatInput
                onSend={onSend}
                addMessage={addMessage}
                chatMessages={chatMessages}
                customeGptData={customeGptData}
                setChatMessages={setChatMessages}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
