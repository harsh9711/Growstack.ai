"use client";

import { FileUpload, LongText, NumberHashtag, ShortText, Switch as SwitchIcon } from "@/components/svgs";
import clsx from "clsx";
import React, { useState } from "react";
import FileUploadInputSection from "./sections/input/FileUploadInputSection";
import LongTextInputSection from "./sections/input/LongTextInputSection";
import NumberInputSection from "./sections/input/NumberInputSection";
import ShortTextInputSection from "./sections/input/ShortTextInputSection";
import YesOrNoInputSection from "./sections/input/YesOrNoInputSection";

export default function AddInput() {
  const [inputType, setInputType] = useState("Short text");
  const inputTypes = [
    {
      icon: <ShortText />,
      name: "Short text",
    },
    {
      icon: <LongText />,
      name: "Long text",
    },
    {
      icon: <SwitchIcon />,
      name: "Yes/No",
    },
    {
      icon: <NumberHashtag />,
      name: "Number",
    },
    {
      icon: <FileUpload />,
      name: "File Upload",
    },
  ];

  const renderInputSection = () => {
    switch (inputType) {
      case "Short text":
        return <ShortTextInputSection />;
      case "Long text":
        return <LongTextInputSection />;
      case "Yes/No":
        return <YesOrNoInputSection />;
      case "Number":
        return <NumberInputSection />;
      case "File Upload":
        return <FileUploadInputSection />;
    }
  };

  return (
    <div className="space-y-4 mt-5">
      <h1 className="text-lg font-semibold">Input type</h1>
      <div className="grid grid-cols-3 gap-3 !mb-6">
        {inputTypes.map((input, index) => (
          <div
            onClick={() => setInputType(input.name)}
            key={index}
            className={clsx(
              "flex flex-col items-center justify-center gap-3 border border-[#F5F5F5] p-4 rounded-lg text-sm cursor-pointer hover:bg-primary-light-gray/40 transition-all duration-300",
              input.name === inputType && "bg-[#0347371c] border border-primary-green hover:bg-[#0347371d]"
            )}>
            {React.cloneElement(input.icon, { className: "mx-auto" })}
            {input.name}
          </div>
        ))}
      </div>
      {renderInputSection()}

      <div className="flex justify-end gap-4">
        <button className="py-3 px-6 bg-white border border-[#CF0000] text-[#CF0000] hover:bg-[#cf000009] rounded-xl mt-6">Cancel</button>
        <button className="py-3 px-6 bg-primary-green rounded-xl text-white mt-6 hover:bg-primary-green/90 transition-all duration-300"> Add</button>
      </div>
    </div>
  );
}
