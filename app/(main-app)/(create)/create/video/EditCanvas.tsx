import React, { useEffect, useRef } from "react";
import { VideoData } from "./types";
import Motion from "@/components/Motion";
import Spinner from "@/components/Spinner";

interface IProps {
  videoData: VideoData;
  isPlaying: boolean;
  setCurrentTime: (time: number) => void;
  loading: boolean;
}

const EditCanvas: React.FC<IProps> = ({ videoData, isPlaying, loading, setCurrentTime }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

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
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // useEffect(() => {
  //   // Seek to the current time when it changes (if needed)
  //   if (videoRef.current) {
  //     videoRef.current.currentTime = currentTime;
  //   }
  // }, [currentTime]);

  return (
    <div className="flex-1 bg-white w-full h-full max-w-[1246px] mx-auto rounded-2xl flex justify-center items-center">
      {loading ? (
        <Motion transition={{ duration: 1 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
          <div className="flex gap-3 items-center py-4 px-6 w-full rounded-lg bg-gray-200 text-gray-700">
            <Spinner />
            <p className="ml-2">Updating your video</p>
          </div>
        </Motion>
      ) : (
        <video ref={videoRef} controls={false} className="rounded-xl w-full max-w-4xl">
          <source src={videoData.download} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default EditCanvas;
