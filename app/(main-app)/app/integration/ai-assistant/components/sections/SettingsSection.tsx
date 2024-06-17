import { Input } from "@/components/ui/input";
import React from "react";

export default function SettingsSection() {
  return (
    <div>
      <div className="!bg-white shadow-box p-7 rounded-3xl max-w-3xl mx-auto mt-20">
        <h1 className="text-xl font-semibold">AI writer setting</h1>
        <div className="space-y-2 mt-8">
          <div className="flex items-center justify-between">
            <label className="font-medium">
              Secret key <span className="text-[#F00]">*</span>
            </label>
            <span className="text-primary-black text-opacity-60 cursor-pointer">Click here to get the key</span>
          </div>
          <Input type="text" placeholder="Name your report" value="******************************" />
        </div>
        <div className="flex justify-end gap-4 w-full">
          <button className="py-3.5 h-14 w-full max-w-[180px] px-6 bg-primary-green sheen rounded-xl text-white mt-6 flex items-center justify-center gap-3 whitespace-nowrap">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
