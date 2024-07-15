"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";
import { IoIosShareAlt, IoIosArrowBack } from "react-icons/io";
import { ISidebarItem } from "../interface/chat.interface";
import axios from "axios";
import { API_URL } from "@/lib/api";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";

interface ShareChatDialogProps {
  sidebarItems: ISidebarItem[];
}

export default function ShareChatDialog({
  sidebarItems,
}: ShareChatDialogProps) {
  const [activeIds, setActiveIds] = useState<string[]>([]);
  const [nextStep, setNextStep] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOutputType, setSelectedOutputType] = useState(
    outputType[0].value
  );
  const [loading, setLoading] = useState<boolean>(false);

  const filteredItems = sidebarItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemClick = (id: string) => {
    setActiveIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setActiveIds(filteredItems.map((item) => item._id));
  };

  const handleSelectLatest = () => {
    if (filteredItems.length > 0) {
      const latestItem = filteredItems.reduce((prev, current) =>
        new Date(prev.updatedDate || prev.createdDate) >
        new Date(current.updatedDate || current.createdDate)
          ? prev
          : current
      );
      setActiveIds([latestItem._id]);
    }
  };

  const handleClear = () => {
    setActiveIds([]);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleOutputTypeChange = (value: string) => {
    setSelectedOutputType(value);
  };

  const handleDownload = async () => {
    if (activeIds.length > 0) {
      try {
        setLoading(true);
        const responses = await Promise.all(
          activeIds.map((id) =>
            axios.get(`${API_URL}/ai/api/v1/conversation/${id}`)
          )
        );
        const data = responses.map((response) => {
          const { title, chats } = response.data.data;
          const conversationData = chats
            .map((chat: any) => {
              return chat.thread.map((thread: any) => ({
                user_prompt: thread.user_prompt,
                response: thread.response,
              }));
            })
            .flat();
          return {
            conversation_id: response.data.data._id,
            title: title,
            data: conversationData,
          };
        });

        if (selectedOutputType === "text") {
          handleDownloadByText(data);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    } else {
      toast.error("You have no conversation selected");
    }
  };

  const handleDownloadByText = (data: any) => {
    data.forEach((conversation: any) => {
      let content = `# ${conversation.title}\n`;
      conversation.data.forEach(
        ({
          user_prompt,
          response,
        }: {
          user_prompt: string;
          response: string;
        }) => {
          content += `\n## Message From You:\n${user_prompt}\n`;
          content += `## Message From GrowStackAI:\n${response}\n`;
        }
      );

      const blob = new Blob([content], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `${conversation.title
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase()}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
    setLoading(false);
    handleClear();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-primary-green p-3.5 rounded-xl hover:bg-primary-green/90 text-white fixed bottom-6 right-8 shadow-xl shadow-[#2fff0038]">
          <IoIosShareAlt size={30} />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[630px] p-0">
        <DialogHeader className="border-b py-5 px-6">
          <DialogTitle>Export messages</DialogTitle>
        </DialogHeader>
        {!nextStep ? (
          <div className="px-6 py-3 space-y-7 pb-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div className="space-y-2">
                <h1 className="text-lg font-semibold">Export format</h1>
                <p className="text-[15px] text-primary-black text-opacity-80">
                  Markdown or PNG image
                </p>
              </div>
              <Select
                value={selectedOutputType}
                onValueChange={handleOutputTypeChange}
              >
                <SelectTrigger className="p-3 w-[90px] bg-primary-light-gray border-0 h-10">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {outputType.map(({ label, value }) => (
                      <SelectItem value={value} key={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between items-center border-b pb-4">
              <div className="space-y-2">
                <h1 className="text-lg font-semibold">Including context</h1>
                <p className="text-[15px] text-primary-black text-opacity-80">
                  Export context prompts in masks or not
                </p>
              </div>
              <Checkbox />
            </div>
            <div className="flex gap-3">
              <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md">
                <Search className="text-gray-500" size={20} />
                <input
                  type="search"
                  className="outline-none h-[40px] w-full"
                  placeholder="Search"
                  onChange={handleSearchChange}
                />
              </div>
              <div
                className="px-4 whitespace-nowrap text-sm bg-primary-light-gray text-gray-500 rounded-lg grid place-content-center cursor-pointer"
                onClick={handleSelectAll}
              >
                Select All
              </div>
              <div
                className="px-4 whitespace-nowrap text-sm bg-primary-light-gray text-gray-500 rounded-lg grid place-content-center cursor-pointer"
                onClick={handleSelectLatest}
              >
                Select Latest
              </div>
              <div
                className="px-4 whitespace-nowrap text-sm bg-primary-light-gray text-gray-500 rounded-lg grid place-content-center cursor-pointer"
                onClick={handleClear}
              >
                Clear
              </div>
            </div>
            <div className="border border-[#EBEBEB] rounded-xl max-h-[150px] overflow-auto">
              {filteredItems.map((item) => (
                <div
                  className={`border-b p-3 last:border-b-0 cursor-pointer ${
                    activeIds.includes(item._id)
                      ? "bg-gray-200 border-b-1 border-primary"
                      : ""
                  }`}
                  key={item._id}
                  onClick={() => handleItemClick(item._id)}
                >
                  <p className="text-[15px] text-primary-black text-opacity-80">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setNextStep(true)}
              className="!mt-8 bg-primary-green w-full h-14 rounded-xl hover:bg-primary-green/90 flex justify-center items-center text-white"
            >
              Next
            </button>
          </div>
        ) : (
          <div className="px-6 py-3 space-y-4 pb-6">
            <button
              onClick={() => setNextStep(false)}
              className="flex items-center text-primary-green hover:text-primary-green/80"
            >
              <IoIosArrowBack size={20} className="mr-2" />
              Back
            </button>
            <button className="bg-primary-green w-full h-14 rounded-xl hover:bg-primary-green/90 flex justify-center items-center text-white">
              Share to ShareGPT
            </button>
            <div className="flex gap-4">
              <button
                className="bg-primary-green w-full h-14 rounded-xl hover:bg-primary-green/90 flex justify-center items-center text-white"
                onClick={handleDownload}
              >
                {loading ? <Spinner /> : "Download"}
              </button>
              <button className="bg-primary-green w-full h-14 rounded-xl hover:bg-primary-green/90 flex justify-center items-center text-white">
                Export
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

const outputType = [
  {
    value: "text",
    label: "Text",
  },
  {
    value: "pdf",
    label: "PDF",
  },
  {
    value: "docx",
    label: "DOCX",
  },
];
