"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";
import { IoIosShareAlt } from "react-icons/io";

export default function ShareChatDialog() {
  const [nextStep, setNextStep] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-primary-green p-3.5 rounded-xl hover:bg-primary-green/90 text-white fixed bottom-6 right-8 shadow-xl shadow-[#2fff0038]">
          <IoIosShareAlt size={30} />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[630px] p-0">
        <DialogHeader className="border-b py-5 px-6">
          <DialogTitle>Export messages</DialogTitle>
        </DialogHeader>
        {!nextStep ? (
          <div className="px-6 py-3 space-y-7 pb-6">
            <div className="flex justify-between items-center border-b pb-4">
              <div className="space-y-2">
                <h1 className="text-lg font-semibold">Export format</h1>
                <p className="text-[15px] text-primary-black text-opacity-80">Markdown or PNG image</p>
              </div>
              <Select>
                <SelectTrigger className="p-3 w-[90px] bg-primary-light-gray border-0 h-10">
                  <SelectValue defaultValue={outputType[0].value} placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {outputType.map(({ label, value }) => (
                      <SelectItem value={value} key={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between items-center border-b pb-4">
              <div className="space-y-2">
                <h1 className="text-lg font-semibold">Including context</h1>
                <p className="text-[15px] text-primary-black text-opacity-80">Export context prompts in masks or not</p>
              </div>
              <Checkbox />
            </div>
            <div className="flex gap-3">
              <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md">
                <Search className="text-gray-500" size={20} />
                <input type="search" className="outline-none h-[40px] w-full" placeholder="Search" />
              </div>
              <div className="px-4 whitespace-nowrap text-sm bg-primary-light-gray text-gray-500 rounded-lg grid place-content-center cursor-pointer">
                Select
              </div>
              <div className="px-4 whitespace-nowrap text-sm bg-primary-light-gray text-gray-500 rounded-lg grid place-content-center cursor-pointer">
                Select latest
              </div>
              <div className="px-4 whitespace-nowrap text-sm bg-primary-light-gray text-gray-500 rounded-lg grid place-content-center cursor-pointer">
                Clear
              </div>
            </div>
            <button
              onClick={() => setNextStep(true)}
              className="!mt-8 bg-primary-green w-full h-14 rounded-xl hover:bg-primary-green/90 flex justify-center items-center text-white">
              Next
            </button>
          </div>
        ) : (
          <div className="px-6 py-3 space-y-4 pb-6">
            <button className="bg-primary-green w-full h-14 rounded-xl hover:bg-primary-green/90 flex justify-center items-center text-white">
              Share to ShareGPT
            </button>
            <div className="flex gap-4">
              <button className="bg-primary-green w-full h-14 rounded-xl hover:bg-primary-green/90 flex justify-center items-center text-white">
                Download
              </button>
              <button className="bg-primary-green w-full h-14 rounded-xl hover:bg-primary-green/90 flex justify-center items-center text-white">Export</button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

const outputType = [
  {
    value: "text",
    label: "Text",
  },
  {
    value: "pdf",
    label: "PDF",
  },
  {
    value: "docx",
    label: "DOCX",
  },
];
