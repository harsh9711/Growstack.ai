import React from "react";
import { Play, Pause } from "lucide-react";

interface VideoControlsProps {
  isPlaying: boolean;
  onClick: () => void;
}

export const VideoControls: React.FC<VideoControlsProps> = ({
  isPlaying,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      aria-label={isPlaying ? "Pause video" : "Play video"}
    >
      {isPlaying ? (
        <Pause className="w-12 h-12 text-white" />
      ) : (
        <Play className="w-12 h-12 text-white" />
      )}
    </button>
  );
};
