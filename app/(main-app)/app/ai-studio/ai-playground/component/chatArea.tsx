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
import { llmComparisonModels } from "../../../components/options";
import { Message } from "../interface/playground";
import ChatMessages from "./chatMessage";
import "aos/dist/aos.css";
import autosize from "autosize";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
interface ChatAreaProps {
  selectedModel: string;
  addChatArea: () => void;
  onModelChange: (newModel: string) => void;
  conversation: Message[];
  handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  userPrompt: string;
  handleDelete: () => void;
  renderConversation: (msg?: string) => void;
  responseLoading: boolean;
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
  renderConversation,
  responseLoading,
}: ChatAreaProps) => {
  const [inputValue, setInputValue] = useState(userPrompt);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<
    | (HTMLTextAreaElement & {
        handleRegenerate: (chartMessage: string) => void;
      })
    | null
  >(null); // Updated here
  const [emptyPrompt, isEmptyPrompt] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
    handleChange(event);
    isEmptyPrompt("");
  };

  const handleSend = () => {
    if (responseLoading) return;
    if (textareaRef.current && inputValue.trim() !== "") {
      isEmptyPrompt("");
      textareaRef.current.value = "";
      if (textareaRef.current.style) {
        textareaRef.current.style.height = "2rem";
      }
      if (textareaRef.current) {
        autosize.update(textareaRef.current);
      }
      setInputValue("");
      renderConversation();
    } else {
      // Show error message if the input is empty
      isEmptyPrompt("Please enter any prompt...!");
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

  const selectedOption = llmComparisonModels[0].models[0].value;

  const handleChatRegenerateClick = (chatMessage: any) => {
    console.log("chartMessage", chatMessage);
    if (chatMessage) {
      renderConversation(chatMessage);
    } else {
      toast.error("No previous prompt to regenerate.");
    }
  };

  return (
    <div className="flex-1 flex flex-col !bg-white border border-[#E8E8E8] shadow-box p-4 md:p-6 lg:p-7 w-full justify-between md:w-[300px] lg:min-w-[400px] 2xl:w-[700px]">
      <div className="flex items-start justify-between mb-2">
        <AIModel
          selectedOption={selectedModel}
          setSelectedOption={onModelChange}
          selectedOptionLabel={selectedOption}
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
              <SelectTrigger className="px-1 py-[5px] bg-white border-0 h-fit hover:bg-gray-100 rounded-lg">
                <MoreHorizontal size={20} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {outputType.map(({ label, value, icon }) => (
                    <SelectItem
                      showIndicator={false}
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

      <div className="flex-1 flex flex-col max-h-[60vh] overflow-y-auto mb-3">
        {conversation.length > 0 ? (
          <ChatMessages
            onRegenerateClick={handleChatRegenerateClick}
            conversation={conversation}
          />
        ) : (
          <></>
        )}
      </div>

      <div className="border border-gray-200 bg-[#F5F5F5] flex items-center gap-3 p-2 pl-4 rounded-xl mt-4">
        <textarea
          ref={textareaRef}
          placeholder="Type your message..."
          className="w-full flex-1 bg-transparent mt-2 resize-none overflow-auto h-8 min-h-[2rem] max-h-[200px] text-sm lg:text-base"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onInput={handleResize}
          name="user_prompt"
          value={inputValue}
        />
        <button
          disabled={responseLoading}
          type="submit"
          onClick={handleSend}
          className="h-10 w-10 md:h-12 md:w-12 flex justify-center items-center bg-[#2DA771] hover:bg-opacity-90 transition-all duration-300 text-white rounded-xl"
        >
          <SendIcon2 />
        </button>
      </div>
      {emptyPrompt && (
        <div className="text-red-500 mt-2 ml-2">{emptyPrompt}</div>
      )}
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
  const { user, currentPlan } = useSelector(
    (rootState: RootState) => rootState.auth
  );

  const selectedModelLabel = llmComparisonModels
    .flatMap(option => option.models)
    .find(model => model.value === selectedOption)?.label;

  const handleModalSelection = (value: string) => {
    if (!currentPlan) return;
    const currentCategory = llmComparisonModels.find(category =>
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
      setSelectedOption(value);
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

    setSelectedOption(value);
  };

  return (
    <Select value={selectedOption} onValueChange={handleModalSelection}>
      <SelectTrigger className="h-12 bg-[#2DA771] text-white border-0 rounded-xl flex items-center justify-between px-4">
        <SelectValue placeholder="Select an option">
          {selectedModelLabel && (
            <div className="flex items-center gap-2">
              <span className="min-w-fit">
                {
                  llmComparisonModels
                    .flatMap(option => option.models) // Flattening the models array to find the icon
                    .find(model => model.value === selectedOption)?.icon
                }
              </span>
              {selectedModelLabel}
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {llmComparisonModels.map(({ label: groupLabel, models }) => (
            <React.Fragment key={groupLabel}>
              <div className="font-bold text-gray-500 px-4 py-2">
                {groupLabel}
              </div>
              {models.map(({ icon, label, value }) => (
                <SelectItem key={value} value={value}>
                  <div
                    className={clsx(
                      "flex items-center gap-2",
                      selectedOption === value && "text-[#2DA771] font-medium"
                    )}
                  >
                    <span className="min-w-fit">{icon}</span>
                    {label}
                  </div>
                </SelectItem>
              ))}
            </React.Fragment>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
