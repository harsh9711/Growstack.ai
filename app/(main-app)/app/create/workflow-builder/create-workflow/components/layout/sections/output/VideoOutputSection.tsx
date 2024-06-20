import Motion from "@/components/Motion";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import React from "react";

export default function VideoOutputSection() {
  return (
    <Motion transition={{ duration: 0.5 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="font-medium text-sm">Output label </label>
          <Input type="text" placeholder="Output label" />
        </div>
        <div className="space-y-2">
          <label className="font-medium text-sm">Video URL </label>
          <Input type="text" placeholder="https://example.com/video.mp3" />
        </div>
        <div className="space-y-2">
          <label className="font-medium flex gap-2 items-center">Required</label>
          <Switch />
        </div>
        <div className="space-y-2">
          <label className="font-medium text-sm">JSON Key</label>
          <Input type="text" placeholder="Key (e.g. download_link)" />
        </div>
      </div>
    </Motion>
  );
}
