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
  conversation: Conversation;
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
    <div className="border-b px-10 py-5">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={assistant.avatar}
            alt=""
            width={200}
            height={200}
            className="h-[50px] w-[50px] rounded-xl object-cover shadow-md shadow-gray-200"
          />
          <div>
            <h2 className="text-xl font-semibold">{assistant.name}</h2>
            <p className="flex items-center gap-2 text-primary-black text-opacity-70">
              <span className="h-2 w-2 rounded-full bg-[#68D391]"></span>Online
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="bg-primary-green/10 hover:text-white hover:bg-primary-green transition-all duration-300 h-11 w-11 grid place-content-center rounded-lg cursor-pointer"
          >
            <UserCircle />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="bg-primary-green/10 hover:text-white hover:bg-primary-green transition-all duration-300 h-11 w-11 grid place-content-center rounded-lg cursor-pointer">
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
            <SelectTrigger className="min-w-[200px] h-12 bg-primary-green text-white border-0 rounded-xl flex items-center justify-between px-4">
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
                                "text-primary-green font-medium"
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
            <SelectTrigger className="bg-[#429A85] min-w-[200px] h-12 text-white border-0 rounded-xl flex items-center justify-between px-4">
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
