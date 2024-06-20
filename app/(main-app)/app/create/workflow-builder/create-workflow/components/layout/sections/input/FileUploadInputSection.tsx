import Motion from "@/components/Motion";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import React from "react";

export default function FileUploadInputSection() {
  return (
    <Motion transition={{ duration: 0.5 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="font-medium text-sm">Input label </label>
          <Input type="text" placeholder="Input label" />
        </div>

        <div className="space-y-2">
          <label className="font-medium flex gap-2 items-center">
            Description <span className="text-primary-black text-opacity-30 text-xs">Optional</span>
          </label>
          <textarea placeholder="Input label" className="bg-[#F2F2F2] p-3 h-[120px] block resize-none w-full rounded-xl"></textarea>
        </div>
        <div className="space-y-2">
          <label className="font-medium flex gap-2 items-center">Accept multiple files</label>
          <Switch />
        </div>
        <div className="space-y-2">
          <label className="font-medium flex gap-2 items-center">Required</label>
          <Switch />
        </div>
        <div className="space-y-2">
          <label className="font-medium text-sm">Variable name </label>
          <Input type="text" placeholder="Input Variable name" />
        </div>
      </div>
    </Motion>
  );
}
