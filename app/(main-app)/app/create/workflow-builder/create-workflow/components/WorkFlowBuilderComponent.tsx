"use client"

// components/WorkFlowBuilderComponent.tsx
import { InputIcon2, OutputIcon2 } from "@/components/svgs";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { useState } from "react";
import InputSection from "./InputSection";
import OutputSection from "./OutputSection";

export default function WorkFlowBuilderComponent() {
  const [activeTag, setActiveTag] = useState<"Input" | "Output">("Input");
  const renderSection = () => {
    switch (activeTag) {
      case "Input":
        return <InputSection />;
      case "Output":
        return <OutputSection />;
    }
  };
  return (
    <div className="flex-1 flex flex-col md:flex-row bg-white rounded-3xl mt-6">
      {/* Left section - Workflow steps */}
      <div className="flex-1 p-5 flex flex-col justify-center items-center gap-10">
        <button
          onClick={() => setActiveTag("Input")}
          className={clsx(
            "w-full max-w-[340px] transition-all duration-300 p-3 border border-[#E5E7EB] rounded-xl flex items-center gap-4 cursor-pointer",
            activeTag === "Input" && "!border-primary-green"
          )}>
          <div className="bg-primary-green p-4 rounded-lg">
            <InputIcon2 className="text-white" />
          </div>
          <div className="space-y-1 flex flex-col items-start">
            <h3 className="text-[17px] font-medium">Input</h3>
            <p className="text-sm text-primary-black text-opacity-50">Click to add outputs</p>
          </div>
        </button>

        <button className="w-full max-w-[340px] px-4 py-6 font-medium bg-[#F5F5F5] rounded-xl flex justify-center items-center gap-2">
          Add Step <Plus size={16} />
        </button>

        <button
          onClick={() => setActiveTag("Output")}
          className={clsx(
            "w-full max-w-[340px] transition-all duration-300 p-3 border border-[#E5E7EB] rounded-xl flex items-center gap-4 cursor-pointer",
            activeTag === "Output" && "!border-primary-green"
          )}>
          <div className="bg-primary-green p-4 rounded-lg">
            <OutputIcon2 className="text-white" />
          </div>
          <div className="space-y-1 flex flex-col items-start">
            <h3 className="text-[17px] font-medium">Output</h3>
            <p className="text-sm text-primary-black text-opacity-50">Click to add outputs</p>
          </div>
        </button>
      </div>

      {/* Right section - Input configuration */}
      <div className="border-l border-[#F0F0F0] w-full max-w-[482px] md:w-1/3 p-10 flex flex-col">{renderSection()}</div>
    </div>
  );
}
