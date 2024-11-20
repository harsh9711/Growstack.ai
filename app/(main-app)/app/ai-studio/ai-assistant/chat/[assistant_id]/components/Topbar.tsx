import {
  aiModelOptions,
  languageOptions,
} from "@/app/(main-app)/app/ai-studio/ai-articles/constants/options";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";
import { Download, Settings, Share2, UserCircle } from "lucide-react";
import React, { useState } from "react";
import { Assistant, Chat, Conversation } from "../../../components/types";
import {
  downloadDocx,
  downloadPdf,
  downloadTxt,
} from "./utils/downloadHelpers";
import Image from "next/image";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { planIdsMap } from "@/lib/utils";
import { PlanName } from "@/types/enums";

interface IProps {
  assistant: Assistant;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isSidebarOpen: boolean) => void;
  isHistoryOpen: boolean;
  setHistoryOpen: (isHistoryOpen: boolean) => void;
  conversation: Conversation | null;
  selectedLanguage: string;
  switchLanguage: (language: string) => void;
  selectedAiModel: string;
  setSelectedAiModel: React.Dispatch<React.SetStateAction<string>>;
  messagesData: any;
}

export default function Topbar({
  assistant,
  conversation,
  isSidebarOpen,
  setIsSidebarOpen,
  isHistoryOpen,
  setHistoryOpen,
  selectedLanguage,
  switchLanguage,
  selectedAiModel,
  setSelectedAiModel,
  messagesData,
}: IProps) {
  const { user, currentPlan } = useSelector(
    (rootState: RootState) => rootState.auth
  );

  const filteredAiModelOptions =
    user?.user_type !== "ADMIN" &&
    currentPlan &&
    planIdsMap[PlanName.AI_ESSENTIALS].some(val => val === currentPlan.plan_id)
      ? [aiModelOptions[0]]
      : aiModelOptions;

  const handleModalSelection = (value: string) => {
    if (!currentPlan) return;
    const currentCategory = aiModelOptions.find(category =>
      category.models.some(model => model.value === value)
    );

    const currentModal = currentCategory?.models.find(
      model => model.value === value
    );

    if (!currentCategory || !currentModal) {
      console.error("Model not found");
      return;
    }

    const freeCategories = ["growStackAiMessagesModel"];

    if (
      user?.user_type === "ADMIN" ||
      freeCategories.includes(currentCategory.modelCategory)
    ) {
      setSelectedAiModel(value);
      return;
    }

    let usageLimit = 0;

    if (currentCategory.modelCategory === "smartAiMessagesModel") {
      usageLimit = currentPlan.smart_ai_messages;
    } else if (currentCategory.modelCategory === "fastAiMessagesModel") {
      usageLimit = currentPlan.fast_ai_messages;
    }

    if (usageLimit <= 0) {
      toast.error(
        `You have no remaining usage for ${currentCategory.label}. Please switch to another model.`
      );
      return;
    }

    setSelectedAiModel(value);
  };

  return (
    <div className="border-b sm:px-6 px-10 py-5">
      <div
        className={`flex gap-3 ${
          isSidebarOpen ? "lg:flex-col" : "lg:flex-row"
        } ${
          isHistoryOpen ? "lg:flex-col" : "lg:flex-row"
        } xl:flex-row sm:flex-col md:flex-col flex-col lg:justify-between`}
      >
        <div className="flex items-center gap-4">
          <Image
            src={assistant.avatar}
            alt=""
            width={200}
            height={200}
            className="h-[40px] w-[40px] sm:h-[50px] sm:w-[50px] rounded-xl object-cover shadow-md shadow-gray-200"
          />
          <div>
            <h2 className="text-lg font-semibold sm:text-xl">
              {assistant.role}
            </h2>
            {/* <p className="flex items-center gap-2 text-primary-black text-opacity-70">
              <span className="h-2 w-2 rounded-full bg-[#68D391]"></span>Online
            </p> */}
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            onClick={() => {
              setIsSidebarOpen(false);
              setHistoryOpen(!isHistoryOpen);
            }}
            className={`${
              isHistoryOpen
                ? "bg-primary-green text-white"
                : "bg-primary-green/10 text-primary-green"
            } transition-all duration-300 h-11 w-11 grid place-content-center rounded-lg cursor-pointer`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 94 84"
              fill="currentColor" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M66.1699 41.0721L53.2119 41.0691V18.8491C53.2119 17.0401 51.7449 15.5781 49.9409 15.5781C48.1369 15.5781 46.6699 17.0411 46.6699 18.8491V44.3411C46.6699 46.1491 48.1369 47.6121 49.9409 47.6121H49.9459H66.1689C67.9739 47.6121 69.4389 46.1491 69.4389 44.3421C69.4379 42.5381 67.9729 41.0721 66.1699 41.0721Z" />
              <path d="M81.1068 12.2085C64.8288 -4.0695 38.3408 -4.0695 22.0578 12.2085C14.8738 19.3945 10.6118 28.8005 9.92776 38.8755L5.67375 34.2945C4.44275 32.9725 2.36976 32.8935 1.04676 34.1225C-0.279245 35.3535 -0.355245 37.4265 0.874755 38.7525L10.3498 48.9545C10.9948 49.6485 11.8708 50.0005 12.7498 50.0005C13.5468 50.0005 14.3458 49.7115 14.9768 49.1265L25.1818 39.6505C26.5078 38.4195 26.5838 36.3465 25.3538 35.0225C24.1238 33.6975 22.0508 33.6175 20.7258 34.8505L16.5418 38.7345C17.2418 30.4655 20.7738 22.7565 26.6888 16.8385C40.4158 3.1135 62.7498 3.1135 76.4758 16.8385C90.2008 30.5645 90.2008 52.9005 76.4758 66.6265C69.8278 73.2755 60.9868 76.9375 51.5818 76.9375C42.1818 76.9375 33.3408 73.2765 26.6888 66.6265C25.4088 65.3475 23.3348 65.3475 22.0568 66.6265C20.7788 67.9055 20.7788 69.9805 22.0578 71.2575C29.9478 79.1445 40.4328 83.4865 51.5818 83.4865C62.7348 83.4865 73.2198 79.1435 81.1058 71.2575C97.3858 54.9785 97.3857 28.4875 81.1068 12.2085Z" />
            </svg>
          </div>

          <div
            onClick={() => {setHistoryOpen(false); setIsSidebarOpen(!isSidebarOpen);}}
            className={`${
              isSidebarOpen
                ? "bg-[#2DA771] text-white"
                : "bg-[#2DA771]/10 text-primary-green"
            } transition-all duration-300 h-11 w-11 grid place-content-center rounded-lg cursor-pointer`}
          >
            <UserCircle />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="bg-[#2DA771]/10 hover:text-white hover:bg-[#2DA771] transition-all duration-300 h-11 w-11 grid place-content-center rounded-lg cursor-pointer">
                <Download />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => downloadTxt(messagesData)}
              >
                <Download size={18} />
                Download chat (.txt)
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => downloadPdf(messagesData)}
              >
                <Download size={18} />
                Download chat (.pdf)
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-2"
                onClick={() => downloadDocx(messagesData)}
              >
                <Download size={18} />
                Download chat (.docx)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Select value={selectedAiModel} onValueChange={handleModalSelection}>
            <SelectTrigger className="min-w-[160px] sm:min-w-[200px] h-9 sm:h-12 bg-[#2DA771] text-white border-0 rounded-xl flex items-center justify-between px-3 sm:px-4">
              <SelectValue placeholder="Select an option">
                {selectedAiModel && (
                  <div className="flex items-center gap-2">
                    <span className="min-w-fit">
                      {
                        filteredAiModelOptions
                          .flatMap(option => option.models) // Flattening the models array to find the icon
                          .find(model => model.value === selectedAiModel)?.icon
                      }
                    </span>
                    {selectedAiModel}
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {filteredAiModelOptions.map(
                ({ label: categoryLabel, models }) => (
                  <SelectGroup key={categoryLabel}>
                    <React.Fragment key={categoryLabel}>
                      <div className="font-bold text-gray-500 px-4 py-2">
                        {categoryLabel}
                      </div>
                      {models.map(({ icon, label, value }) => (
                        <SelectItem key={value} value={value}>
                          <div
                            className={clsx(
                              "flex items-center gap-2",
                              selectedAiModel === value &&
                                "text-[#2DA771] font-medium"
                            )}
                          >
                            <span className="min-w-fit">{icon}</span>
                            {label}
                          </div>
                        </SelectItem>
                      ))}
                    </React.Fragment>
                  </SelectGroup>
                )
              )}
            </SelectContent>
          </Select>

          <Select value={selectedLanguage} onValueChange={switchLanguage}>
            <SelectTrigger className="bg-[#429A85] min-w-[120px] sm:min-w-[150px] h-9 sm:h-12 text-white border-0 rounded-xl flex items-center justify-between px-3 sm:px-4">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {languageOptions.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    <div
                      className={clsx(
                        "flex items-center gap-2",
                        selectedLanguage === value && "font-medium"
                      )}
                    >
                      {label}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
