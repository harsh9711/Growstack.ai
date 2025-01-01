import React, { useRef, useEffect, useState } from "react";
import { VideoControls } from "./VideoControls";

interface VideoCardProps {
  video: TeamVideo;
  isActive: boolean;
  onVideoPlay: () => void;
  onVideoPause: () => void;
}

interface TeamVideo {
  id: number;
  videoUrl: string;
  name: string;
  role: string;
  Url: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  isActive,
  onVideoPlay,
  onVideoPause,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isActive && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
        onVideoPlay();
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
        onVideoPause();
      }
    }
  };

  return (
    <div className="relative w-full aspect-video max-w-md mx-auto touch-manipulation">
      <video
        ref={videoRef}
        className="w-full h-full object-cover rounded-lg"
        src={video.videoUrl}
        playsInline
        preload="metadata"
        controlsList="nodownload"
        onClick={e => e.preventDefault()}
      />
      <VideoControls isPlaying={isPlaying} onClick={togglePlayPause} />
    </div>
  );
};
