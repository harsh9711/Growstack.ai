// page.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import EditorLayout from "./EditorLayout";
import { useEffect, useState } from "react";
import { Base64 } from "js-base64";
import { VideoData } from "./components/types";

import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "@/lib/api";
import Header from "./components/Header";

export default function CreateVideoPage() {
  const params = useSearchParams();
  const videoData = params.get("data");
  const [isPlaying, setIsPlaying] = useState(false);
  const [generatedVideoDetails, setGeneratedVideoDetails] = useState<{
    videoData: VideoData;
  } | null>(null);
  const [selectedAvatarId, setSelectedAvatarId] = useState("49dc8f46-8c08-45f1-8608-57069c173827");
  const [videoScript, setVideoScript] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [backgroundColor, setBackgroundColor] = useState<string>("light_pink");
  const [soundTrack, setSoundTrack] = useState<string>("urban");

  useEffect(() => {
    if (videoData) {
      const decodedData = Base64.decode(videoData as string);
      const parsedData = JSON.parse(decodedData);
      setGeneratedVideoDetails(parsedData);
      setVideoScript(parsedData.videoData.videoScript);
    }
  }, [videoData]);

  const checkVideoStatus = async (videoId: string) => {
    try {
      const statusResponse = await axios.get(`${API_URL}/ai/api/v1/video/status/${videoId}`);
      if (statusResponse.data.data.status === "complete") {
        toast.success("Video updated successfully");
        const videoDetails = { videoData: statusResponse.data.data as VideoData };
        setGeneratedVideoDetails(videoDetails);
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
      const videoData = {
        title: generatedVideoDetails?.videoData.title,
        input: {
          scriptText: videoScript,
          avatar: avatarId,
          background: backgroundColor,
        },
        soundtrack: soundTrack,
      };

      const videoResponse = await axios.post(`${API_URL}/ai/api/v1/generate/video`, videoData);
      if (videoResponse.data.success) {
        toast.success("Video update request successful");

        checkVideoStatus(videoResponse.data.data.id);
      } else {
        toast.error("Failed to update video");
        setLoading(false);
      }
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
      setLoading(false);
    }
  };

  if (!generatedVideoDetails) {
    return <div className="h-screen grid place-content-center">Loading...</div>;
  }

  return (
    <div className="p-3 flex-1 h-screen flex flex-col gap-4">
      {/* navbar  */}
      <Header
        generatedVideoDetails={generatedVideoDetails}
        handleSubmit={handleSubmit}
        isPlaying={isPlaying}
        loading={loading}
        setIsPlaying={setIsPlaying}
        selectedAvatarId={selectedAvatarId}
        setSelectedAvatarId={setSelectedAvatarId}
      />

      {/* main editor content */}
      <EditorLayout
        videoData={generatedVideoDetails.videoData}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        loading={loading}
        videoScript={videoScript}
        setVideoScript={setVideoScript}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
        soundTrack={soundTrack}
        setSoundTrack={setSoundTrack}
      />
    </div>
  );
}
