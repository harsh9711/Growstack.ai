// page.tsx
"use client";

import { CloudSaveIcon, MediaIcon, ShapesIcon, TextIcon } from "@/components/svgs";
import { ChevronDown, ChevronLeft, Pause, Play, Redo2, Undo2, UserCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Layout from "./Layout";
import { useEffect, useState } from "react";
import { Base64 } from "js-base64";
import { VideoData } from "./types";
import AvatarDropdown from "./components/AvatarDropdown";
import TextDropdown from "./components/TextDropdown";
import ShapesDropdown from "./components/ShapesDropdown";
import MediaDropdown from "./components/MediaDropdown";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "YOUR_API_URL"; // Replace with your actual API URL

export default function CreateVideoPage() {
  const params = useSearchParams();
  const videoData = params.get("data");

  const [isPlaying, setIsPlaying] = useState(false);
  const [generatedVideoDetails, setGeneratedVideoDetails] = useState<{
    videoData: VideoData;
  } | null>(null);
  const [formData, setFormData] = useState<any>({}); // Assuming formData is managed here
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    if (videoData) {
      const decodedData = Base64.decode(videoData as string);
      const parsedData = JSON.parse(decodedData);
      setGeneratedVideoDetails(parsedData);
    }
  }, [videoData]);

  const checkVideoStatus = async (videoId: string) => {
    try {
      const statusResponse = await axios.get(`${API_URL}/ai/api/v1/video/status/${videoId}`);
      if (statusResponse.data.data.status === "complete") {
        toast.success("Video generation complete");
        setGeneratedVideoDetails(statusResponse.data.data);
        setLoading(false);
      } else {
        setTimeout(() => checkVideoStatus(videoId), 5000); // Check every 5 seconds
      }
    } catch (error) {
      toast.error("Error checking video status");
      setLoading(false);
    }
  };

  const handleSubmit = async (avatarId: string) => {
    setLoading(true);

    try {
      // First API call to generate script
      const scriptResponse = await axios.post(`${API_URL}/ai/api/v1/generate/video/video-script`, formData);
      if (scriptResponse.data.success) {
        toast.success(scriptResponse.data.message);

        // Second API call to generate video with the generated script
        const videoData = {
          title: formData.title,
          input: {
            scriptText: scriptResponse.data.data.script, // Use the generated script from the first API call
            avatar: avatarId, // Use the selected avatar ID
            background: "light_pink", // Example background setting
          },
          soundtrack: "urban",
        };

        const videoResponse = await axios.post(`${API_URL}/ai/api/v1/generate/video`, videoData);
        if (videoResponse.data.success) {
          toast.success("Video generation request successful");

          // Third API call to check video status
          checkVideoStatus(videoResponse.data.data.id);
        } else {
          toast.error("Failed to generate video");
          setLoading(false);
        }
      } else {
        toast.error("Failed to generate script");
        setLoading(false);
      }
    } catch (error: any) {
      toast.error(error.response.data.message || error.message || "Error submitting the form");
      setLoading(false);
    }
  };

  if (!generatedVideoDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-3 flex-1 h-screen flex flex-col gap-4">
      <header className="bg-primary-green flex justify-between px-5 py-2 rounded-2xl text-white text-[15px]">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="hover:bg-[#fff]/10 p-1.5 rounded-lg transition-all duration-300">
            <ChevronLeft />
          </button>
          <div className="h-5 w-[1px] bg-white rounded-full" />
          <button
            title={generatedVideoDetails.videoData.title}
            className="flex items-center gap-4 hover:bg-[#fff]/20 px-3 py-2 rounded-lg transition-all duration-300 text-[14px]">
            {generatedVideoDetails.videoData.title.slice(0, 12)}
            {generatedVideoDetails.videoData.title.length > 12 && "..."} <ChevronDown size={18} />
          </button>
          <div className="h-5 w-[1px] bg-white rounded-full" />
          <div className="flex items-center gap-1">
            <button className="hover:bg-[#fff]/10 p-2 rounded-md transition-all duration-300">
              <Undo2 size={20} />
            </button>
            <button className="hover:bg-[#fff]/10 p-2 rounded-md transition-all duration-300">
              <Redo2 size={20} />
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <AvatarDropdown onAvatarSelect={handleSubmit} />
          <TextDropdown />
          <ShapesDropdown />
          <MediaDropdown />
        </div>
        <div className="flex items-center space-x-4">
          <button className="hover:bg-[#fff]/20 p-2.5 rounded-lg transition-all duration-300">
            <CloudSaveIcon className="scale-105" />
          </button>
          <div className="h-5 w-[2px] bg-white rounded-full" />
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-[#fff]/20 text-white/80 h-10 w-10 flex justify-center items-center rounded-lg transition-all duration-300">
            {isPlaying ? <Pause /> : <Play size={22} />}
          </button>
          <button className="!ml-2 bg-white text-primary-green h-10 px-6 font-medium rounded-lg">Generate</button>
        </div>
      </header>
      <Layout videoData={generatedVideoDetails.videoData} isPlaying={isPlaying} setIsPlaying={setIsPlaying} loading={loading}/>
    </div>
  );
}
