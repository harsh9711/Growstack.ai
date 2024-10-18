import React, { useEffect, useRef, useState } from "react";
import Motion from "@/components/Motion";
import Spinner from "@/components/Spinner";
import {
  ClockIcon,
  DictionIcon,
  GestureIcon,
  MarkerIcon,
} from "@/components/svgs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import autosize from "autosize";
import { Pause, Play } from "lucide-react";
import { VideoData } from "./types";
import VoicesDialog from "./dialogs/VoicesDialog";

interface IProps {
  videoData: VideoData;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  loading: boolean;
  videoScript: string;
  setVideoScript: (videoScript: string) => void;
}

const EditCanvas: React.FC<IProps> = ({
  videoData,
  isPlaying,
  setIsPlaying,
  loading,
  setVideoScript,
  videoScript,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const updateTime = () => setCurrentTime(video.currentTime);

      video.addEventListener("canplay", () => {
        video.addEventListener("timeupdate", updateTime);
      });

      return () => {
        video.removeEventListener("timeupdate", updateTime);
      };
    }
  }, [videoRef.current]);

  useEffect(() => {
    const parseDuration = (duration: string) => {
      const parts = duration.split(":");
      const hours = parseInt(parts[0], 10);
      const minutes = parseInt(parts[1], 10);
      const seconds = parseFloat(parts[2]);
      return hours * 3600 + minutes * 60 + seconds;
    };

    setDuration(parseDuration(videoData.duration));
  }, [videoData.duration]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (textareaRef.current) {
      autosize(textareaRef.current);
    }
  }, []);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((time % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const updateTime = () => {
        setCurrentTime(video.currentTime);
      };

      video.addEventListener("timeupdate", updateTime);

      return () => {
        video.removeEventListener("timeupdate", updateTime);
      };
    }
  }, [setCurrentTime]);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const handleEnded = () => {
        setIsPlaying(false);
      };

      video.addEventListener("ended", handleEnded);

      return () => {
        video.removeEventListener("ended", handleEnded);
      };
    }
  }, [setIsPlaying]);

  return (
    <div className="w-full flex flex-col">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 bg-white w-full h-full min-h-[60vh] max-w-[1246px] mx-auto rounded-2xl flex justify-center items-center">
          {loading ? (
            <Motion
              transition={{ duration: 1 }}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            >
              <div className="flex gap-3 items-center py-4 px-6 w-full rounded-lg bg-gray-200 text-gray-700 max-w-3xl mx-auto">
                <Spinner />
                <p className="ml-2">
                  Updating your video, this might take a while
                </p>
              </div>
            </Motion>
          ) : (
            <video
              ref={videoRef}
              controls={false}
              className="rounded-xl w-full max-w-4xl"
            >
              <source src={videoData.download} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
      <div className="mt-4 w-full bg-white p-10 rounded-3xl flex flex-col justify-center gap-5">
        <div className="flex justify-between">
          <VoicesDialog />
          <div className="flex justify-center gap-4 mt-2">
            <button className="flex flex-col justify-center items-center gap-2 text-sm cursor-pointer hover:bg-gray-100 px-2 pt-3 pb-1 rounded transition-all duration-300">
              <GestureIcon />
              Gesture
            </button>
            <button className="flex flex-col justify-center items-center gap-2 text-sm cursor-pointer hover:bg-gray-100 px-2 pt-3 pb-1 rounded transition-all duration-300">
              <MarkerIcon />
              Marker
            </button>
            <button className="flex flex-col justify-center items-center gap-2 text-sm cursor-pointer hover:bg-gray-100 px-2 pt-3 pb-1 rounded transition-all duration-300">
              <ClockIcon />
              Pause
            </button>
            <button className="flex flex-col justify-center items-center gap-2 text-sm cursor-pointer hover:bg-gray-100 px-2 pt-3 pb-1 rounded transition-all duration-300">
              <DictionIcon />
              Diction
            </button>
          </div>
          <div className="mt-4 flex items-center bg-[#F2F2F2] h-9 text-sm p-3 rounded-lg space-x-2">
            <span
              className="cursor-pointer"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </span>
            <span>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>
        </div>
        <div className="w-full max-w-4xl mx-auto">
          <textarea
            ref={textareaRef}
            value={videoScript}
            rows={1}
            onChange={e => setVideoScript(e.target.value)}
            placeholder="Type your script here..."
            className="w-full p-2 bg-transparent resize-none overflow-hidden min-h-11 max-h-[300px]"
          />
          <div className="p-1.5 text-sm text-primary-green bg-[#0347371A] flex items-center justify-center gap-1 rounded max-w-fit">
            <ClockIcon className="h-[15px] w-[15px]" />
            5s
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCanvas;
