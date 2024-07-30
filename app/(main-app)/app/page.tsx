"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { API_URL } from "@/lib/api";
import instance from "@/config/axios.config";
import { ArrowRight, Plus, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ContentLoader from "react-content-loader";

interface AiApp {
  _id: string;
  "ASSISTANT NAME": string;
  "ASSISTANT DESCRIPTION": string;
  icon: string;
  category: string;
}

export interface Assistant {
  id: string;
  name: string;
  avatar: string;
  role: string;
  slug: string;
  welcome_message: string;
}

export interface FavoriteAssistant {
  category: string;
  description: string;
  icon: string;
  isActivated: boolean;
  name: string;
  premium: boolean;
  _id: string;
}

export default function Dashboard() {
  const [aiApps, setAiApps] = useState<AiApp[]>([]);
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [favoriteAssistants, setFavoriteAssistants] = useState<FavoriteAssistant[]>([]);
  const [aiAppsloading, setAiAppsLoading] = useState(true);
  const [aiAssistantsloading, setAiAssistantsLoading] = useState(true);
  const fetchAiApps = async () => {
    setAiAppsLoading(true);
    try {
      const response = await instance.get(`${API_URL}/ai/api/v1/chat-template`);
      const data = response.data.data;

      if (data) {
        const formattedAssistants = data.map((assistant: any) => ({
          _id: assistant._id,
          "ASSISTANT NAME": assistant["ASSISTANT NAME"],
          "ASSISTANT DESCRIPTION": assistant["ASSISTANT DESCRIPTION"],
          icon: assistant["icon"],
          category: assistant["category"],
        }));
        setAiApps(formattedAssistants);
      } else {
        toast.error(response.data.message);
        console.error("Unexpected API response format:", response.data);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.error("Error fetching assistants:", error);
    } finally {
      setAiAppsLoading(false);
    }
  };

  const fetchAssistants = async () => {
    setAiAssistantsLoading(true);
    try {
      ``;
      const response = await instance.get(`${API_URL}/ai/api/v1/assistant`);
      setAssistants(response.data.data);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.log(error);
    } finally {
      setAiAssistantsLoading(false);
    }
  };

  const fetchFavoriteAssistants = async () => {
    setAiAssistantsLoading(true);
    try {
      ``;
      const response = await instance.get(`${API_URL}/ai/api/v1/chat-template/fav-apps`);
      setFavoriteAssistants(response.data.data);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.log(error);
    } finally {
      setAiAssistantsLoading(false);
    }
  };

  useEffect(() => {
    fetchAiApps();
    fetchAssistants();
    fetchFavoriteAssistants();
  }, []);

  console.log('asdasd', favoriteAssistants)

  return (
    <main className="">
      <div className="bg-[#EBF0F6] h-80 w-full max-w-[95%] mx-auto absolute top-0 left-0 right-0 rounded-b-[60px]" />
      <div className="relative z-[1]">
        <div className="flex justify-between items-center mt-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-[15px]">
              23 August - 23 September 2024
              <span>
                <Image
                  src="/icons/calendar-edit.svg"
                  alt=""
                  width={20}
                  height={20}
                  className="select-none"
                />
              </span>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-6 mt-10">
          <div className="bg-white py-7 px-8 rounded-3xl flex justify-between items-center shadow-2xl shadow-gray-200">
            <div className="space-y-3">
              <p className="text-[#4B4B4B]">Total balance</p>
              <h1 className="text-[40px] font-semibold">$500.00</h1>
              <p className="text-[#F4360C]">- 122.1M (1%)</p>
            </div>
            <Image src="/icons/dollar.svg" alt="" width={100} height={100} />
          </div>
          <div className="bg-white py-7 px-8 rounded-3xl flex justify-between items-center shadow-2xl shadow-gray-200">
            <div className="space-y-3">
              <p className="text-[#4B4B4B]">Total tokens</p>
              <h1 className="text-[40px] font-semibold">175,000</h1>
              <p className="text-[#F4360C]">- 42.1M (2%)</p>
            </div>
            <Image src="/icons/coin.svg" alt="" width={100} height={100} />
          </div>
          <div className="bg-white py-7 px-8 rounded-3xl flex justify-between items-center shadow-2xl shadow-gray-200">
            <div className="space-y-3">
              <p className="text-[#4B4B4B]">Token used</p>
              <h1 className="text-[40px] font-semibold">85,000</h1>
              <p className="text-[#1D8F6D]">+ 21%</p>
            </div>
            <Image src="/icons/payment.svg" alt="" width={100} height={100} />
          </div>
          <div className="bg-white py-7 px-8 rounded-3xl flex justify-between items-center shadow-2xl shadow-gray-200">
            <div className="space-y-3">
              <p className="text-[#4B4B4B]">Money used</p>
              <h1 className="text-[40px] font-semibold">$300.00</h1>
              <p className="text-[#1D8F6D]">+ 21%</p>
            </div>
            <Image
              src="/icons/payment-dollar.svg"
              alt=""
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="w-full flex gap-6 mt-10">
          <div className="w-full space-y-6">
            <div className="w-full bg-white border border-[#E8E8E8] rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-center">
                  Favorite AI writer templates
                </h1>
                <Link href="/app/plan/ai-apps">
                  <button className="bg-[#F5F7FA] py-3 px-5 rounded-lg sheen">
                    View all
                  </button>
                </Link>
              </div>
              <div className="max-h-[450px] overflow-y-auto mt-6 scrollbar-primary-sm">
                <div className="grid grid-cols-2 gap-5 pr-5">
                  {aiAppsloading ? (
                    Array(15)
                      .fill(null)
                      .map((_, index) => <AiAppSkeletonLoader key={index} />)
                  ) : favoriteAssistants.length < 1 ? (
                    <div className="flex justify-center items-center">
                      No assistants found
                    </div>
                  ) : (
                    favoriteAssistants.map((assistant, index) => (
                      <Link
                        href={`/app/plan/ai-apps/${assistant._id}`}
                        key={assistant._id}
                      >
                        <div className="flex items-center justify-between gap-5 bg-white border border-[#EEF0F4] rounded-2xl p-6 shadow-xl shadow-gray-100 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-300 cursor-pointer">
                          <div className="flex gap-4 items-start flex-grow overflow-hidden">
                            <div
                              dangerouslySetInnerHTML={{
                                __html: assistant.icon,
                              }}
                              className="w-[64px] h-[64px] flex-shrink-0"
                            />
                            <div className="space-y-2 overflow-hidden flex-grow">
                              <h1 className="text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
                                {assistant.name}
                              </h1>
                              <p
                                className="text-primary-black text-opacity-70 text-[14px] leading-relaxed overflow-hidden text-ellipsis"
                                style={{
                                  display: "-webkit-box",
                                  WebkitLineClamp: 3,
                                  WebkitBoxOrient: "vertical",
                                }}
                              >
                                {assistant.description}
                              </p>
                            </div>
                          </div>
                          {/* <div className="cursor-pointer w-full max-w-fit hover:bg-gray-50 p-1 rounded transition">
                            <StarIcon className="text-[#ADADAD]" />
                          </div> */}
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="w-full flex gap-6 mt-10">
              <div className="w-full space-y-6">
                <div className="w-full bg-white border border-[#E8E8E8] rounded-3xl p-6">
                  <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-center">
                      Favorite AI chat assistants
                    </h1>
                    <Link href="/app/plan/ai-assistant">
                      <button className="bg-[#F5F7FA] py-3 px-5 rounded-lg sheen">
                        View all
                      </button>
                    </Link>
                  </div>
                  <div className="max-h-[450px] overflow-y-auto mt-6 scrollbar-primary-sm">
                    <div className="grid grid-cols-2 gap-5 pr-5">
                      {aiAssistantsloading
                        ? Array(15)
                            .fill(null)
                            .map((_, index) => (
                              <AiAssistantSkeletonLoader key={index} />
                            ))
                        : assistants.map(
                            ({ avatar, id, name, role }, index) => (
                              <div
                                key={index}
                                className="bg-white border border-[#E8E8E8] rounded-2xl p-4 flex items-center justify-between"
                              >
                                <div className="flex items-center gap-4">
                                  <Image
                                    src={avatar}
                                    alt=""
                                    width={200}
                                    height={200}
                                    className="h-[56px] w-[56px] rounded-xl object-cover shadow-md shadow-gray-200"
                                  />
                                  <div className="space-y-1">
                                    <h2 className="text-[18px] font-semibold">
                                      {name}
                                    </h2>
                                    <p className="text-gray-400 text-sm">
                                      {role}{" "}
                                    </p>
                                  </div>
                                </div>
                                <Link
                                  href={`/app/plan/ai-assistant/chat/${id}`}
                                >
                                  <button className="bg-[#CECECE] text-[#7C7C7C] h-12 w-full px-4 rounded-xl hover:bg-primary-green hover:text-white transition-all duration-300">
                                    Chat now
                                  </button>
                                </Link>
                              </div>
                            )
                          )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[50%] bg-white p-8 rounded-3xl border borer-[#E8E8E8] space-y-5">
            <div className="space-y-3">
              <h1 className="text-xl font-semibold text-center">
                Unlock the power of AI
              </h1>
              <p className="text-[#6C7275] text-center">
                Chat with the smartest AI - Experience the power of AI with us
              </p>
            </div>
            <Link href="/app/plan/ai-chat">
              <div className="!mt-7 group bg-white border border-[#E8ECEF] rounded-2xl p-4 flex justify-between items-center cursor-pointer transition duration-300 hover:border-primary-green hover:shadow-xl hover:shadow-[#39bfc7]/10">
                <div className="flex gap-4 items-center">
                  <Image
                    src="/icons/ai-chat.svg"
                    alt=""
                    width={60}
                    height={60}
                  />
                  <h2 className="font-medium">AI chat</h2>
                </div>
                <button className="p-2 hover:bg-[#f2f2f2] rounded-lg transition">
                  <ArrowRight className="text-gray-400 group-hover:text-primary-green transition-all duration-300" />
                </button>
              </div>
            </Link>
            <Link href="/app/plan/ai-apps">
              <div className="!mt-4 group bg-white border border-[#E8ECEF] rounded-2xl p-4 flex justify-between items-center cursor-pointer transition duration-300 hover:border-primary-green hover:shadow-xl hover:shadow-[#39bfc7]/10">
                <div className="flex gap-4 items-center">
                  <Image
                    src="/icons/ai-apps.svg"
                    alt=""
                    width={60}
                    height={60}
                  />
                  <h2 className="font-medium">AI apps </h2>
                </div>
                <button className="p-2 hover:bg-[#f2f2f2] rounded-lg transition">
                  <ArrowRight className="text-gray-400 group-hover:text-primary-green transition-all duration-300" />
                </button>
              </div>
            </Link>
            <Link href="/app/plan/ai-assistant">
              <div className="!mt-4 group bg-white border border-[#E8ECEF] rounded-2xl p-4 flex justify-between items-center cursor-pointer transition duration-300 hover:border-primary-green hover:shadow-xl hover:shadow-[#39bfc7]/10">
                <div className="flex gap-4 items-center">
                  <Image
                    src="/icons/chatbot.svg"
                    alt=""
                    width={60}
                    height={60}
                  />
                  <h2 className="font-medium">AI assistants</h2>
                </div>
                <button className="p-2 hover:bg-[#f2f2f2] rounded-lg transition">
                  <ArrowRight className="text-gray-400 group-hover:text-primary-green transition-all duration-300" />
                </button>
              </div>
            </Link>
            <Link href="/app/plan/custom-gpts">
              <div className="!mt-4 group bg-white border border-[#E8ECEF] rounded-2xl p-4 flex justify-between items-center cursor-pointer transition duration-300 hover:border-primary-green hover:shadow-xl hover:shadow-[#39bfc7]/10">
                <div className="flex gap-4 items-center">
                  <Image
                    src="/icons/custom-gpts.svg"
                    alt=""
                    width={60}
                    height={60}
                  />
                  <h2 className="font-medium">AI custom GPT </h2>
                </div>
                <button className="p-2 hover:bg-[#f2f2f2] rounded-lg transition">
                  <ArrowRight className="text-gray-400 group-hover:text-primary-green transition-all duration-300" />
                </button>
              </div>
            </Link>
            <Link href="/app/plan/text-to-video">
              <div className="!mt-4 group bg-white border border-[#E8ECEF] rounded-2xl p-4 flex justify-between items-center cursor-pointer transition duration-300 hover:border-primary-green hover:shadow-xl hover:shadow-[#39bfc7]/10">
                <div className="flex gap-4 items-center">
                  <Image src="/icons/media.svg" alt="" width={60} height={60} />
                  <h2 className="font-medium">Text to video </h2>
                </div>
                <button className="p-2 hover:bg-[#f2f2f2] rounded-lg transition">
                  <ArrowRight className="text-gray-400 group-hover:text-primary-green transition-all duration-300" />
                </button>
              </div>
            </Link>
            <Link href="/app/create/workflow-builder">
              <div className="!mt-4 group bg-white border border-[#E8ECEF] rounded-2xl p-4 flex justify-between items-center cursor-pointer transition duration-300 hover:border-primary-green hover:shadow-xl hover:shadow-[#39bfc7]/10">
                <div className="flex gap-4 items-center">
                  <Image
                    src="/icons/workflow-builder.svg"
                    alt=""
                    width={60}
                    height={60}
                  />
                  <h2 className="font-medium">Workflow builder</h2>
                </div>
                <button className="p-2 hover:bg-[#f2f2f2] rounded-lg transition">
                  <ArrowRight className="text-gray-400 group-hover:text-primary-green transition-all duration-300" />
                </button>
              </div>
            </Link>
            <Link href="/app/create/ai-articles">
              <div className="!mt-4 group bg-white border border-[#E8ECEF] rounded-2xl p-4 flex justify-between items-center cursor-pointer transition duration-300 hover:border-primary-green hover:shadow-xl hover:shadow-[#39bfc7]/10">
                <div className="flex gap-4 items-center">
                  <Image
                    src="/icons/text-generator.svg"
                    alt=""
                    width={60}
                    height={60}
                  />
                  <h2 className="font-medium">AI article wizard</h2>
                </div>
                <button className="p-2 hover:bg-[#f2f2f2] rounded-lg transition">
                  <ArrowRight className="text-gray-400 group-hover:text-primary-green transition-all duration-300" />
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

const AiAppSkeletonLoader: React.FC = () => {
  return (
    <ContentLoader
      speed={2}
      width="100%"
      height="80px"
      viewBox="0 0 600 80"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className="w-full"
    >
      <rect x="0" y="0" rx="10" ry="10" width="70" height="70" />
      <rect x="90" y="10" rx="8" ry="8" width="350" height="15" />
      <rect x="90" y="35" rx="8" ry="8" width="420" height="15" />
    </ContentLoader>
  );
};
const AiAssistantSkeletonLoader: React.FC = () => {
  return (
    <ContentLoader
      speed={2}
      width="100%"
      height="80px"
      viewBox="0 0 600 80"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className="w-full"
    >
      <rect x="0" y="0" rx="10" ry="10" width="70" height="70" />
      <rect x="90" y="13" rx="8" ry="8" width="250" height="15" />
      <rect x="90" y="38" rx="8" ry="8" width="200" height="15" />
      <rect x="480" y="13" rx="10" ry="10" width="80" height="40" />
    </ContentLoader>
  );
};
