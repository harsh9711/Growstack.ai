"use client";

import { languageOptions } from "@/app/(main-app)/app/create/ai-articles/constants/options";
import { writingStyleOptions, writingToneOptions } from "./constants/options";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./select";

export default function ChatOptions() {
  const [selectedWritingStyle, setSelectedWritingStyle] = useState(writingStyleOptions[0].value);
  const [selectedWritingTone, setSelectedWritingTone] = useState(writingToneOptions[0].value);
  const [selectedLanguage, setSelectedLanguage] = useState(languageOptions[0].value);

  return (
    <div className="flex gap-4 pt-3">
      <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
        <SelectTrigger className="bg-[#429A85] p-6 text-white h-[90px] w-full rounded-xl flex items-center justify-between">
          <span className="flex flex-col items-start text-[16px] font-semibold text-left">
            <h3 className="text-[12px] mb-1.5 font-normal text-left">Output language</h3>
            <SelectValue placeholder="Select an option" />
          </span>
          <ChevronDown size={24} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {languageOptions.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                <div className={clsx("flex items-center gap-2", selectedLanguage === value && "font-medium")}>{label}</div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select value={selectedWritingTone} onValueChange={setSelectedWritingTone}>
        <SelectTrigger className="bg-[#429A85] p-6 text-white h-[90px] w-full rounded-xl flex items-center justify-between">
          <span className="flex flex-col items-start text-[16px] font-semibold text-left">
            <h3 className="text-[12px] mb-1.5 font-normal text-left">Tone</h3>
            <SelectValue placeholder="Select an option" />
          </span>
          <ChevronDown size={24} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {writingToneOptions.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                <div className={clsx("flex items-center gap-2", selectedWritingTone === value && "font-medium")}>{label}</div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select value={selectedWritingStyle} onValueChange={setSelectedWritingStyle}>
        <SelectTrigger className="bg-[#429A85] p-6 text-white h-[90px] w-full rounded-xl flex items-center justify-between">
          <span className="flex flex-col items-start text-[16px] font-semibold text-left">
            <h3 className="text-[12px] mb-1.5 font-normal text-left">Writing Style</h3>
            <SelectValue placeholder="Select an option" />
          </span>
          <ChevronDown size={24} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {writingStyleOptions.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                <div className={clsx("flex items-center gap-2", selectedWritingStyle === value && "font-medium")}>{label}</div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
