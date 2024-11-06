"use client";
import clsx from "clsx";
import { CloseIcon } from "@/components/svgs";
import { Plus } from "lucide-react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  assistant_id: string;
}

export default function ChatHistory({ isOpen, onClose, assistant_id }: IProps) {
  return (
    <div
      className={clsx(
        isOpen ? "opacity-100" : "opacity-0",
        "transition-all duration-300 bg-white z-50",
        {
          "absolute top-30 lg:left-0 xl:left-0 sm:left-10 md:left-10 h-auto w-[400px] sm:w-[400px] md:w-[400px]":
            isOpen,
          "absolute w-0 overflow-hidden": !isOpen,
        },
        {
          "sm:w-[400px] sm:opacity-100 md:w-[400px] md:opacity-100": isOpen,
          "lg:w-[400px] xl:w-[400px] lg:opacity-100 xl:opacity-100 lg:relative xl:relative lg:border-r xl:border-r":
            isOpen,
        }
      )}
    >
      <div className="border-b py-[18px] px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold whitespace-nowrap">
            Chat History
          </h1>
          <CloseIcon className="cursor-pointer lg:hidden" onClick={onClose} />
        </div>
        <p className="text-primary-black text-opacity-50 mt-1 whitespace-nowrap">
          Your Conversations
        </p>
      </div>
      <div className="flex items-center px-6 py-4 space-x-4">
        <input
          placeholder="Search Conversations"
          className="h-14 bg-[#F5F5F5] rounded-lg w-[80%] p-5 whitespace-nowrap"
        />
        <button
          className="text-white bg-primary-green rounded-full h-12 w-12 grid place-content-center"
          onClick={() => {
            // handle click event
          }}
        >
          <Plus size={22} />
        </button>
      </div>
    </div>
  );
}
