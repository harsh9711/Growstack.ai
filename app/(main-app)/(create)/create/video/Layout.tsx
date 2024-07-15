import React, { useState, useRef, useEffect } from "react";
import EditCanvas from "./EditCanvas";
import { AnimatePresence, motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VideoData } from "./types";
import autosize from "autosize";
import { ClockIcon, DictionIcon, GestureIcon, MarkerIcon } from "@/components/svgs";
import { Pause, Play } from "lucide-react";

type Scene = {
  id: string;
  title: string;
};
interface IProps {
  videoData: VideoData;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  loading: boolean;
}

const Layout: React.FC<IProps> = ({ videoData, isPlaying, setIsPlaying, loading }) => {
  const [scenes, setScenes] = useState<Scene[]>([{ id: "1", title: "scene 1" }]);
  const [currentScene, setCurrentScene] = useState<Scene | null>(scenes[0]);
  const [activeSceneIndicatorPosition, setActiveSceneIndicatorPosition] = useState(0);
  const [scriptText, setScriptText] = useState(videoData.videoScript);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const addScene = () => {
    const newScene: Scene = {
      id: (scenes.length + 1).toString(),
      title: `scene ${scenes.length + 1}`,
    };
    setScenes([...scenes, newScene]);
    selectScene(newScene, scenes.length - 1);
  };

  const selectScene = (scene: Scene, index: number) => {
    setCurrentScene(scene);
    setActiveSceneIndicatorPosition((index / scenes.length) * 100);
  };

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

  return (
    <div className="flex-1 flex h-full items-stretch gap-4">
      <div className="!bg-white shadow-box !rounded-xl w-full max-w-[112px] pt-4">
        <h2 className="text-lg font-bold mb-4 px-4">Scenes</h2>
        <AnimatePresence>
          <ul className="relative flex flex-col">
            {scenes.map((scene, index) => (
              <motion.li
                key={scene.id}
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.15 }}
                className="mx-4 flex flex-col items-center justify-center h-[80px]"
                onClick={() => {
                  selectScene(scene, index);
                }}>
                <h2 className={`text-[12px] uppercase ${scene.id === currentScene?.id ? "text-primary-green" : "text-gray-500"}`}>{scene.title}</h2>
                <div
                  className={`p-2 cursor-pointer w-full h-12 rounded-lg transition-all duration-300 bg-white ${
                    scene.id === currentScene?.id ? "border-2 border-primary-green w-full" : "border border-gray-100"
                  }`}></div>
              </motion.li>
            ))}
            <div
              className="absolute bottom-0 h-[48px] bg-primary-green transition-all duration-300 rounded-full"
              style={{ top: `calc(${activeSceneIndicatorPosition}% + 25px)`, width: "2px" }}></div>
          </ul>
          <div className="px-4 mt-2 w-full">
            <button onClick={addScene} className="w-full h-12 bg-gray-200 text-gray-500 rounded-lg">
              +
            </button>
          </div>
        </AnimatePresence>
      </div>
      <div className="w-full flex flex-col">
        <div className="flex-1 flex flex-col">
          <EditCanvas videoData={videoData} isPlaying={isPlaying} setCurrentTime={setCurrentTime} loading={loading}/>
        </div>
        <div className="mt-4 w-full bg-white p-10 rounded-3xl flex flex-col justify-center gap-5">
          <div className="flex justify-between">
            <Select>
              <SelectTrigger className="h-9 border-none rounded-lg">
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent defaultValue={"daily"}>
                <SelectGroup>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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
              <span className="cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
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
              value={scriptText}
              rows={1}
              onChange={(e) => setScriptText(e.target.value)}
              placeholder="Type your script here..."
              className="w-full p-2 bg-transparent resize-none overflow-hidden min-h-11 max-h-[300px]"></textarea>
            <div className="p-1.5 text-sm text-primary-green bg-[#0347371A] flex items-center justify-center gap-1 rounded max-w-fit">
              <ClockIcon className="h-[15px] w-[15px]" />
              5s
            </div>
          </div>
        </div>
      </div>
      <div className="!bg-white shadow-box !rounded-xl w-full max-w-[280px] p-4">
        <h3 className="text-xl font-bold">{currentScene?.title}</h3>
        <div className="mt-6 space-y-5">
          <select className="border p-2 rounded w-full">
            <option>Replace layout</option>
          </select>
          <label className="mb-2 flex justify-between">
            Background Color
            <input type="color" defaultValue="#FFFFFF" className="ml-2 border p-1 rounded" />
          </label>
          <label className="mb-2 flex justify-between">
            Background Media
            <Switch />
          </label>
          <label className="mb-2 flex justify-between">
            Music
            <Switch />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Layout;
