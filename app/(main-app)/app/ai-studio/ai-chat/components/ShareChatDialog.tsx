"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { ISidebarItem } from "../interface/chat.interface";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";
import {
  handleDownloadByDOCX,
  handleDownloadByPDF,
  handleDownloadByText,
} from "../utils/downloadHelpers";
interface ShareChatDialogProps {
  sidebarItems: ISidebarItem[];
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareChatDialog({
  sidebarItems,
  isOpen,
  onClose,
}: ShareChatDialogProps) {
  const [activeIds, setActiveIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOutputType, setSelectedOutputType] = useState(
    outputType[0].value
  );
  const [loading, setLoading] = useState<boolean>(false);

  const filteredItems = sidebarItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemClick = (id: string) => {
    setActiveIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setActiveIds(filteredItems.map(item => item._id));
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
          activeIds.map(id =>
            instance.get(`${API_URL}/ai/api/v1/conversation/${id}`)
          )
        );
        const data = responses.map(response => {
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
        } else if (selectedOutputType === "pdf") {
          handleDownloadByPDF(data);
        } else if (selectedOutputType === "docx") {
          handleDownloadByDOCX(data);
        }

        setLoading(false);
        handleClear();
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    } else {
      toast.error("You have no conversation selected");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[630px] p-0">
        <DialogHeader className="border-b py-5 px-6">
          <DialogTitle>Export messages</DialogTitle>
        </DialogHeader>
        <div className="px-6 py-3 space-y-7 pb-6">
          <div className="flex justify-between items-center border-b pb-4">
            <div className="space-y-2">
              <h1 className="text-lg font-semibold">Export format</h1>
              <p className="text-[15px] text-primary-black text-opacity-80">
                Text, PDF and DOCX
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
            {filteredItems.map(item => (
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
            onClick={handleDownload}
            className="!mt-8 bg-[#2DA771] w-full h-14 rounded-xl hover:bg-[#2DA771]/90 flex justify-center items-center text-white"
          >
            {loading ? <Spinner /> : "Download"}
          </button>
        </div>
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
