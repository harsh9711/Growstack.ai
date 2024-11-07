"use client";
import instance from "@/config/axios.config";
import { useEffect, useState, useMemo, ChangeEvent } from "react";
import { Assistant } from "../../../components/types";
import toast from "react-hot-toast";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import { CloseIcon } from "@/components/svgs";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  assistant_id: string;
}

export default function Sidebar({ isOpen, onClose, assistant_id }: IProps) {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const fetchAssistants = async () => {
      try {
        const response = await instance.get("/ai/api/v1/assistant");
        setAssistants(
          response.data.data.filter(
            (assistant: Assistant) => assistant.id !== assistant_id
          )
        );
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.error);
        } else {
          toast.error(error.message);
        }
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssistants();
  }, [assistant_id]);

  // const filteredAssistants = useMemo(() => {
  //   return assistants.filter((assistant) => assistant.id !== assistant_id);
  // }, [assistants, assistant_id]);

  const filteredAssistants = useMemo(() => {
    return assistants.filter(
      assistant =>
        assistant.name.toLowerCase().includes(searchTerm) ||
        assistant.role.toLowerCase().includes(searchTerm)
    );
  }, [assistants, searchTerm]);

  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    
    <div
      className={clsx(
        isOpen ? "opacity-100" : "opacity-0",
        "transition-all duration-300 bg-white z-50",
        {
          "absolute top-30 lg:left-0 xl:left-0 sm:left-10 md:left-10 h-auto w-[400px] sm:w-[400px] md:w-[400px]": isOpen,
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
            Chat with our AI team
          </h1>
          <CloseIcon className="cursor-pointer lg:hidden" onClick={onClose} />
        </div>
        <p className="text-primary-black text-opacity-50 mt-1 whitespace-nowrap">
          AI professionals
        </p>
      </div>
      <div className="px-6 py-4">
        <input
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search Assistants"
          className="h-14 bg-[#F5F5F5] rounded-lg w-full p-5 whitespace-nowrap"
        />
        <div className="mt-4">
          {loading ? (
            <div className="h-20 flex justify-center items-center whitespace-nowrap">
              Loading....
            </div>
          ) : (
            <div className="flex flex-col gap-3 max-h-[68vh] overflow-y-auto hidden-scrollbar">
              {filteredAssistants.map(assistant => (
                <Link
                  key={assistant.id}
                  href={`/app/ai-studio/ai-assistant/chat/${assistant.id}`}
                >
                  <div className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-lg transition-all duration-300 cursor-pointer">
                    <Image
                      src={assistant.avatar}
                      alt="Assistant"
                      width={200}
                      height={200}
                      className="w-[45px] h-[45px] min-w-[45px] object-cover rounded-xl"
                    />
                    <div>
                      <h1 className="font-semibold whitespace-nowrap">
                        {highlightText(assistant.name, searchTerm)}
                      </h1>
                      <p className="text-primary-black text-opacity-50 text-sm whitespace-nowrap">
                        {highlightText(assistant.role, searchTerm)}
                      </p>
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
