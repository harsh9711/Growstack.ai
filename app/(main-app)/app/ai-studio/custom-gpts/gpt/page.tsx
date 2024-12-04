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
import clsx from "clsx";
import { ALL_ROUTES } from "@/utils/constant";

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
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const [isToggleEnabled, setIsToggleEnabled] = useState<boolean>(false);
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
  const [image, setImage] = useState<string>("");
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
      router.push(ALL_ROUTES.AI_CUSTOM_GPT);
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
    setConversation(prev => [
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
    setConversation(prev => {
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
  const handletoggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setIsToggleEnabled(true);
      setImage("image");
    } else {
      setIsToggleEnabled(false);
    }
  };

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
            <Link href={ALL_ROUTES.AI_CUSTOM_GPT}>
              <button className="text-[#212833] hover:bg-[#2DA771]/10 sheen flex gap-2 px-3.5 py-1.5 rounded-full font-medium items-center  transition-all duration-300">
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
                  <Image
                    src={customeGptData?.icon}
                    alt="Icon"
                    width={200}
                    height={200}
                    className="rounded-full items-center w-32 h-32"
                  />
                  <span className="items-center justify-center flex flex-col space-y-3">
                    <h2 className="font-bold text-2xl">
                      {customeGptData?.name}
                    </h2>
                    <p className="text-[15px] text-gray-500">
                      {customeGptData?.description}
                    </p>
                  </span>
                </div>
                <div
                  className={clsx(
                    "grid gap-4 max-w-7xl mx-auto mt-5",
                    customeGptData.conversation_starter.length === 1
                      ? "grid-cols-1"
                      : customeGptData.conversation_starter.length === 2
                        ? "grid-cols-2"
                        : customeGptData.conversation_starter.length === 3
                          ? "grid-cols-3"
                          : "grid-cols-4"
                  )}
                >
                  {customeGptData.conversation_starter.map((starter, index) => (
                    <button
                      key={index}
                      className="flex justify-start items-start text-left p-5 border rounded-2xl shadow-lg shadow-gray-200 hover:shadow-xl bg-white transition-all duration-300 cursor-pointer"
                      onClick={() => handleSend(starter)}
                    >
                      <span className="text-[14px] leading-relaxed">
                        {starter}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            <ChatMessage
              conversation={conversation}
              icon={customeGptData.icon}
            />
            <div className="w-full flex-grow flex items-end">
              <div className="flex flex-col w-full">
                {" "}
                <div className="mb-4 flex flex-row items-center ">
                  <input
                    checked={isToggleEnabled}
                    className="mr-2 mt-[0.3rem] h-3.5 w-8 
                    appearance-none rounded-[0.4375rem]
                     bg-primary-grey before:pointer-events-none 
                     before:absolute before:h-3.5 before:w-3.5 before:rounded-full 
                     before:bg-transparent before:content-[''] after:absolute after:z-[2] 
                     after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none 
                     after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary-white checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-[#2DA771] checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    onChange={handletoggle}
                  />
                  <label
                    className="inline-block pl-[0.15rem] mt-1 font-bold hover:cursor-pointer"
                    htmlFor="flexSwitchCheckDefault"
                  >
                    {isToggleEnabled
                      ? "Generate The Image"
                      : "Generate The Image"}
                  </label>
                </div>
                <ChatInput
                  onSend={onSend}
                  addMessage={addMessage}
                  chatMessages={chatMessages}
                  customeGptData={customeGptData}
                  setChatMessages={setChatMessages}
                  isToggleEnabled={isToggleEnabled}
                  setIsToggleEnabled={setIsToggleEnabled}
                  image={image}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
