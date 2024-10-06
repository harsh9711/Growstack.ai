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
import React, { useState, useRef, useEffect } from "react";
import { modelData } from "../../../create/ai-articles/constants/options";
import { Message } from "../interface/playground";
import ChatMessages from "./chatMessage";
import AOS from "aos";
import "aos/dist/aos.css";
import autosize from "autosize";
interface ChatAreaProps {
  selectedModel: string;
  addChatArea: () => void;
  onModelChange: (newModel: string) => void;
  conversation: Message[];
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  userPrompt: string;
  handleDelete: () => void;
  renderConversation: () => void
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
  renderConversation
}: ChatAreaProps) => {
  const [inputValue, setInputValue] = useState(userPrompt);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null); // Updated here
  const initialHeight = 32;
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
    handleChange(event);
  };

  const handleSend = () => {
    if (textareaRef.current && inputValue.trim() !== "") {
      textareaRef.current.value = "";
      if (textareaRef.current.style) {
        textareaRef.current.style.height = "2rem";
      }
      if (textareaRef.current) {
        autosize.update(textareaRef.current);
      }
      setInputValue("");
      renderConversation();
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      const textarea = event.target as HTMLTextAreaElement;
      textarea.style.height = "2rem";
      handleSend();
      event.preventDefault();
    }
  };

  // const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
  //   if (event.key === "Enter" && !event.shiftKey) {
  //     event.preventDefault(); // To prevent the default behavior of Enter key
  //     handleSend();
  //   }
  // };
  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
      textareaRef.current.style.overflow = "auto";
    }
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      autosize.update(textareaRef.current);
    }
  }, [inputValue]);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [conversation]);

  const handleResize = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = event.target;
    textarea.style.height = "auto"; // Reset the height to auto
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height based on scrollHeight
  };

  const selectedOption = modelData
    .flatMap((provider) => provider.models)
    .find((model) => model.value === selectedModel);

  return (
    <div
      className="flex-1 flex flex-col !bg-white border border-[#E8E8E8] shadow-box p-7 w-full justify-between min-w-[400px]"

    >
      <div
        className="flex items-start justify-between mb-[10px]"

      >
        <AIModel
          selectedOption={selectedModel}
          setSelectedOption={onModelChange}
          selectedOptionLabel={selectedOption?.label}
        />
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={addChatArea}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <Plus size={20} />
          </button>
          <div className="remove-caret">
            <Select onValueChange={handleDelete}>
              <SelectTrigger
                className="px-1 py-[5px] bg-white border-0 h-fit hover:bg-gray-100 rounded-lg"
              >
                <MoreHorizontal size={20} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {outputType.map(({ label, value, icon }) => (
                    <SelectItem
                      value={value}
                      key={value}
                      className="pl-2 cursor-pointer"

                    >
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
      <div
        className="flex-1 flex flex-col max-h-[68vh] overflow-y-auto mb-3"
      >
        {conversation.length > 0 ? (
          <ChatMessages conversation={conversation} />
        ) : (
          <></>
        )}
      </div>
      <div className="border border-gray-200 bg-[#F5F5F5] flex items-center gap-3 p-1 pl-4 rounded-xl mt-4"
      >
        {/* <input
          type='text'
          placeholder='Type your message...'
          className='w-full h-11 rounded-xl bg-transparent'
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} 
          name='user_prompt'
          value={inputValue}
        /> */}
        <textarea
          ref={textareaRef}
          placeholder="Type your message..."
          className="w-full flex-1 bg-transparent mt-2 resize-none overflow-auto h-8 min-h-8 max-h-[200px]"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onInput={handleResize}
          name="user_prompt"
          value={inputValue}
        />
        <button
          type="submit"
          onClick={handleSend}
          className="h-12 w-12 flex justify-center items-center bg-primary-green hover:bg-opacity-90 transition-all duration-300 text-white rounded-xl self-end"
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