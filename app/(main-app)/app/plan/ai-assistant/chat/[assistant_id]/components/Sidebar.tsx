"use client";
import axios from "@/config/axios.config";
import { useEffect, useState } from "react";
import { Assistant } from "../../../components/types";
import toast from "react-hot-toast";
import Link from "next/link";
import clsx from "clsx";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  assistant_id: string;
}
export default function Sidebar({ isOpen, onClose, assistant_id }: IProps) {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  useEffect(() => {
    const fetchAssistants = async () => {
      try {
        const response = await axios.get("/ai/api/v1/assistant");
        setAssistants(response.data.data.filter((assistant: Assistant) => assistant.id !== assistant_id));
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.error);
        } else {
          toast.error(error.message);
        }
        console.log(error);
      }
    };
    console.log(assistants);

    fetchAssistants();
  }, []);
  return (
    <div className={clsx("w-[400px] border-r overflow-hidden transition-all duration-300", !isOpen && "w-0")}>
      <div className="border-b py-[18px] px-8">
        <h1 className="text-xl font-semibold">Chat with our AI team</h1>
        <p className="text-primary-black text-opacity-50 mt-1">AI professionals</p>
      </div>
      <div className="px-6 py-4">
        <input placeholder="Search Assistants" className="h-14 bg-[#F5F5F5] rounded-lg w-full p-5" />
        <div className="mt-4">
          {assistants && assistants.length < 1 ? (
            <div className="h-20 flex justify-center items-center">Loading....</div>
          ) : (
            <div className="flex flex-col gap-3">
              {assistants.map((assistant, index) => (
                <Link key={index} href={`/app/plan/ai-assistant/chat/${assistant.id}`}>
                  <div className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-all duration-300 cursor-pointer">
                    <img src={assistant.avatar} alt="Assistant" width={100} height={100} className="w-[45px] h-[45px] object-cover rounded-xl" />
                    <div>
                      <h1 className="font-semibold">{assistant.name}</h1>
                      <p className="text-primary-black text-opacity-50 text-sm">{assistant.role}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
