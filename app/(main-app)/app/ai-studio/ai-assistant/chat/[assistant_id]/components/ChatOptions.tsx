"use client";

import { languageOptions } from "@/app/(main-app)/app/components/options";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface ChatOptionsProps {
  switchLanguage: (language: string) => void;
  selectedLanguage: string;
}

const ChatOptions: React.FC<ChatOptionsProps> = ({
  switchLanguage,
  selectedLanguage,
}) => {
  return (
    <div className="flex gap-4 pt-3 justify-end">
      <div className="w-full max-w-[400px]">
        <Select value={selectedLanguage} onValueChange={switchLanguage}>
          <SelectTrigger className="bg-[#429A85] p-6 text-white h-[90px] w-full rounded-xl flex items-center justify-between">
            <span className="flex flex-col items-start text-[16px] font-semibold text-left">
              <h3 className="text-[12px] mb-1.5 font-normal text-left">
                Output language
              </h3>
              <SelectValue placeholder="Select an option" />
            </span>
            <ChevronDown size={24} />
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
  );
};

export default ChatOptions;
