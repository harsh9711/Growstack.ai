import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MagicStickIcon } from "@/components/svgs";

type MenuItemProps = {
  title: string;
  description: string;
};

const menuItem: MenuItemProps[] = [
  {
    title: "Plagiarism checker",
    description: `I want you to act as a plagiarism checker. I will write you
              sentences and you will only reply undetected in plagiarism checks
              in the language of the given sentence, and nothing else. Do not
              write explanations on replies. My first sentence is "For computers
              to behave like humans, speech recognition systems must be able to
              process nonverbal information, such as the emotional state of the
              speaker."`,
  },
  {
    title: "Spoken English teacher and improver",
    description: `I want you to act as a spoken English teacher and improver. I will
              speak to you in English and you will reply to me in English to
              practice my spoken English. I want you to keep your reply neat,
              limiting the reply to 100 words. I want you to strictly correct my
              grammar mistakes, typos, and factual errors. I want you to ask me
              a question in your reply. Now let's start practicing, you could
              ask me a question first. Remember, I want you to strictly correct
              my grammar mistakes, typos, and factual errors.`,
  },
  {
    title: "Travel guide",
    description: `I want you to act as a travel guide. I will write to you about my
              location and you will suggest a place to visit near my location.
              In some cases, I will also give you the type of places I will
              visit. You will also suggest me places of similar type that are
              close to my first location. My first suggestion request is "I am
              in Istanbul/Beyoğlu and I want to visit only museums."`,
  },
  {
    title: "Plagiarism checker",
    description: `I want you to act as a plagiarism checker. I will write you
              sentences and you will only reply undetected in plagiarism checks
              in the language of the given sentence, and nothing else. Do not
              write explanations on replies. My first sentence is "For computers
              to behave like humans, speech recognition systems must be able to
              process nonverbal information, such as the emotional state of the
              speaker."`,
  },
  {
    title: "Spoken English teacher and improver",
    description: `I want you to act as a spoken English teacher and improver. I will
              speak to you in English and you will reply to me in English to
              practice my spoken English. I want you to keep your reply neat,
              limiting the reply to 100 words. I want you to strictly correct my
              grammar mistakes, typos, and factual errors. I want you to ask me
              a question in your reply. Now let's start practicing, you could
              ask me a question first. Remember, I want you to strictly correct
              my grammar mistakes, typos, and factual errors.`,
  },
  {
    title: "Travel guide",
    description: `I want you to act as a travel guide. I will write to you about my
              location and you will suggest a place to visit near my location.
              In some cases, I will also give you the type of places I will
              visit. You will also suggest me places of similar type that are
              close to my first location. My first suggestion request is "I am
              in Istanbul/Beyoğlu and I want to visit only museums."`,
  },
];

interface ToolsDialogProps {
  setInput: (description: string) => void;
}

export default function ToolsDialog({ setInput }: ToolsDialogProps) {
  const [open, setOpen] = useState(false);

  const handleItemClick = (description: string) => {
    setOpen(false);
    setInput(description);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setOpen(false);
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button type="button" onKeyDown={handleKeyDown} className="h-12 w-12 flex justify-center items-center bg-primary-green hover:bg-opacity-90 transition-all duration-300 text-white rounded-xl">
          <MagicStickIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-3xl !shadow-2xl !shadow-gray-900/20 mr-20">
        <div className="divide-y space-y-6 divide-gray-200 max-w-[1200px] max-h-[453px] overflow-y-auto p-8">
          {menuItem && menuItem.length > 0
            ? menuItem.map((item: MenuItemProps, index: number) => (
                <div
                  className="space-y-2 cursor-pointer"
                  onClick={() => handleItemClick(item.description)}
                  key={index}
                >
                  <h1 className="text-lg font-semibold">{item.title}</h1>
                  <p>{item.description}</p>
                </div>
              ))
            : "No prompt"}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
