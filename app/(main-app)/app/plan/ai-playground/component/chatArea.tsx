"use client";
import { OpenTabIcon, SendIcon2 } from "@/components/svgs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "@/styles/editor.css";
import clsx from "clsx";
import { MoreHorizontal, Plus, Trash2Icon } from "lucide-react";
import React, { useEffect } from "react";
import { modelData } from "../../../create/ai-articles/constants/options";
import { Message } from "../interface/playground";
import ChatMessages from "./chatMessage";
import AOS from "aos";
import "aos/dist/aos.css";
interface ChatAreaProps {
  selectedModel: string;
  addChatArea: () => void;
  onModelChange: (newModel: string) => void;
  conversation: Message[];
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  userPrompt: string;
  handleDelete: () => void;
}

const outputType = [
  {
    icon: <Trash2Icon size={20} />,
    label: "Delete Chat",
    value: "delete_chat",
  },
];

const ChatArea = ({
  selectedModel,
  addChatArea,
  onModelChange,
  conversation,
  handleChange,
  userPrompt,
  handleDelete,
}: ChatAreaProps) => {
  const selectedOption = modelData
    .flatMap((provider) => provider.models)
    .find((model) => model.value === selectedModel);
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div
      className="flex-1 flex flex-col !bg-white border border-[#E8E8E8] shadow-box p-7 w-full justify-between min-w-[400px]"
      data-aos="fade-up"
    >
      <div className="flex items-start justify-between mb-[10px]" data-aos="fade-right">
        <AIModel selectedOption={selectedModel} setSelectedOption={onModelChange} selectedOptionLabel={selectedOption?.label} />
        <div className="flex items-center gap-2">
          <button type="button" onClick={addChatArea} className="p-1 hover:bg-gray-100 rounded-lg" data-aos="zoom-in">
            <Plus size={20} />
          </button>
          <div className="remove-caret">
            <Select onValueChange={handleDelete}>
              <SelectTrigger className="px-1 py-[5px] bg-white border-0 h-fit hover:bg-gray-100 rounded-lg" data-aos="zoom-in">
                <MoreHorizontal size={20} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {outputType.map(({ label, value, icon }) => (
                    <SelectItem value={value} key={value} className="pl-2 cursor-pointer" data-aos="fade-up">
                      <div className="flex gap-x-2">
                        {icon}
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
      <div className="flex-1 flex flex-col max-h-[68vh] overflow-y-auto mb-3" data-aos="fade-up">
        {conversation.length > 0 ? <ChatMessages conversation={conversation} /> : <></>}
      </div>
      <div className="border border-gray-200 bg-[#F5F5F5] flex items-center gap-3 p-1 pl-4 rounded-xl" data-aos="fade-up">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full h-11 rounded-xl bg-transparent"
          onChange={handleChange}
          name="user_prompt"
          value={userPrompt}
        />
        <button
          type="submit"
          className="h-12 w-12 flex justify-center items-center bg-primary-green hover:bg-opacity-90 transition-all duration-300 text-white rounded-xl"
          data-aos="fade-left"
        >
          <SendIcon2 />
        </button>
      </div>
    </div>
  );
};

export default ChatArea;

interface AIModelProps {
  selectedOption: string;
  setSelectedOption: (newOption: string) => void;
  selectedOptionLabel: string | undefined;
}

const AIModel = ({
  selectedOption,
  setSelectedOption,
  selectedOptionLabel,
}: AIModelProps) => {
  const allModels = modelData.flatMap((provider) => provider.models);
  return (
    <Select value={selectedOption} onValueChange={setSelectedOption}>
      <SelectTrigger className="w-[70%] h-[34px] bg-white text-header border border-gray-300 rounded-xl flex items-center justify-between px-4">
        <SelectValue placeholder="Select an option">
          {selectedOptionLabel && (
            <div className="flex items-center gap-2">
              <span className="min-w-fit">
                {
                  allModels.find((model) => model.value === selectedOption)
                    ?.icon
                }
              </span>
              {selectedOptionLabel}
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {modelData.map((provider) => (
          <SelectGroup key={provider.provider}>
            {provider.models.map(({ icon, label, value }) => (
              <SelectItem key={value} value={value}>
                <div
                  className={clsx(
                    "flex items-center gap-2",
                    selectedOption === value && "text-primary-green font-medium"
                  )}
                >
                  <span className="min-w-fit">{icon}</span>
                  {label}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};

interface InitialMsgProps {
  selectedOption: string;
  selectedOptionLabel: string | undefined;
}

const InitialMsg = ({
  selectedOption,
  selectedOptionLabel,
}: InitialMsgProps) => {
  const selectedOptionModel = modelData
    .flatMap((provider) => provider.models)
    .find((model) => model.value === selectedOption);
  return (
    <div className="bg-[#F5F5F5] border border-[#E8E8E8] rounded-3xl space-y-5">
      <div className="space-y-5 px-7 pt-7 pb-4">
        <h1 className="flex items-center gap-2">
          {selectedOptionModel && (
            <div className="flex items-center gap-2">
              <span className="min-w-fit">{selectedOptionModel.icon}</span>
              {selectedOptionLabel}
            </div>
          )}
        </h1>
        <p className="text-primary-black text-opacity-70 leading-relaxed">
          Llama is a 70 billion parameter open source model by Meta fine-tuned
          for instruction following purposes served by Groq on their LPU
          hardware.
        </p>
        <div className="space-y-4 divide-y-[1px]">
          <p className="flex pt-4">
            <span className="font-semibold w-full max-w-[150px]">Context</span>
            <span className=" w-full text-primary-black text-opacity-70">
              8,192 tokens
            </span>
          </p>
          <p className="flex pt-4">
            <span className="font-semibold w-full max-w-[150px]">
              Input pricing
            </span>
            <span className=" w-full text-primary-black text-opacity-70">
              $0.70 / million tokens
            </span>
          </p>
          <p className="flex pt-4">
            <span className="font-semibold w-full max-w-[150px]">
              Output pricing
            </span>
            <span className=" w-full text-primary-black text-opacity-70">
              $0.80 / million tokens
            </span>
          </p>
        </div>
      </div>
      <div className="flex justify-between bg-white p-5 rounded-b-3xl">
        <div className="flex items-center gap-10">
          <span className="flex items-center gap-2 text-primary-black text-opacity-70 cursor-pointer">
            Model Page <OpenTabIcon className="w-5 h-5" />
          </span>
          <span className="flex items-center gap-2 text-primary-black text-opacity-70 cursor-pointer">
            Pricing <OpenTabIcon className="w-5 h-5" />
          </span>
        </div>
        <span className="flex items-center gap-2 text-primary-green cursor-pointer">
          Website <OpenTabIcon className="w-5 h-5" />
        </span>
      </div>
    </div>
  );
};
