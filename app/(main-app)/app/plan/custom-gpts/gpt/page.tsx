"use client";

import Spinner from "@/components/Spinner";
import { ArrowBack } from "@/components/svgs";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ChatInput from "./components/ChatInput";
import ChatMessage from "./components/ChatMessage";

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
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const [customeGptData, setCustomGptData] = useState<CustomGptData>({
    name: "",
    description: "",
    icon: "",
    _id: "",
    assistant_id: "",
    conversation_starter: [],
  });
  const [chatMessages, setChatMessages] = useState<ChatMessageType[]>([]);
  const [conversation, setConversation] = useState<Conversation[]>([]);
  const router = useRouter();

  const getCustomGptData = async (id: string | null) => {
    setLoading(true);
    try {
      const {
        data: {
          data: { custom_gpt_id, chats },
        },
      } = await instance.get(`${API_URL}/ai/api/v1/customgpt/${id}`);
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
    } catch (error: any) {
      console.error(error);
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
      router.push("/app/plan/custom-gpts");
    } finally {
      setLoading(false);
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
    addMessage(starter, "", true);
    try {
      if (chatMessages.length === 0) {
        const {
          data: { data },
        } = await instance.post(`${API_URL}/ai/api/v1/customgpt/chat`, {
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
    const id = searchParams.get("custom_gpt_id");
    if (id) {
      getCustomGptData(id);
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full w-full bg-gray-100 mt-10 border rounded-3xl">
      {loading ? (
        <div className="flex-1 flex flex-col gap-5 justify-center items-center">
          <Spinner color="black" size={100} />
          Loading...
        </div>
      ) : (
        <>
          <div className="flex justify-between p-4">
            <Link href="/app/plan/custom-gpts">
              <button className="text-[#212833] hover:bg-primary-green/10 sheen flex gap-2 px-3.5 py-1.5 rounded-full font-medium items-center">
                <ArrowBack />
                Back
              </button>
            </Link>
            <h2 className="text-lg">{customeGptData.name}</h2>
            <div />
          </div>
          <div className="flex-1 h-full overflow-auto flex flex-col px-5 pb-5">
            {conversation.length === 0 && (
              <div className="flex-1 flex flex-col gap-4 justify-center items-center">
                <div className="mx-auto items-center justify-center flex flex-col gap-y-8">
                  <Image src={customeGptData?.icon} alt="Icon" width={200} height={200} className="rounded-full items-center w-32 h-32" />
                  <span className="items-center justify-center flex flex-col space-y-3">
                    <h2 className="font-bold text-2xl">{customeGptData?.name}</h2>
                    <p className="text-[15px] text-gray-500">{customeGptData?.description}</p>
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-4 max-w-7xl mx-auto mt-5">
                  {customeGptData.conversation_starter.map((starter, index) => (
                    <button
                      key={index}
                      className="flex justify-start items-start text-left p-5 border rounded-2xl shadow-lg shadow-gray-200 hover:shadow-xl bg-white transition-all duration-300 cursor-pointer"
                      onClick={() => handleSend(starter)}>
                      <span className="text-[14px] leading-relaxed">{starter}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <ChatMessage conversation={conversation} icon={customeGptData.icon} />
            <div className="w-full flex-grow flex items-end">
              <ChatInput
                onSend={onSend}
                addMessage={addMessage}
                chatMessages={chatMessages}
                customeGptData={customeGptData}
                setChatMessages={setChatMessages}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
