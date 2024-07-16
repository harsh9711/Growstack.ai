import React, { useState } from "react";
import EditCanvas from "./components/EditCanvas";
import Options from "./components/Options";
import Scenes from "./components/Scenes";
import { Scene, VideoData } from "./components/types";

interface IProps {
  videoData: VideoData;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  loading: boolean;
  videoScript: string;
  setVideoScript: (value: string) => void;
  backgroundColor: string;
  setBackgroundColor: (value: string) => void;
  soundTrack: string;
  setSoundTrack: (value: string) => void;
}

const EditorLayout: React.FC<IProps> = ({
  videoData,
  isPlaying,
  setIsPlaying,
  loading,
  setVideoScript,
  videoScript,
  backgroundColor,
  setBackgroundColor,
  soundTrack,
  setSoundTrack,
}) => {
  const [scenes, setScenes] = useState<Scene[]>([{ id: "1", title: "scene 1" }]);
  const [currentScene, setCurrentScene] = useState<Scene>(scenes[0]);

  return (
    <div className="flex-1 flex h-full items-stretch gap-4">
      <Scenes scenes={scenes} setScenes={setScenes} currentScene={currentScene} setCurrentScene={setCurrentScene} />
      <EditCanvas
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        loading={loading}
        setVideoScript={setVideoScript}
        videoData={videoData}
        videoScript={videoScript}
      />
      <Options
        soundTrack={soundTrack}
        setSoundTrack={setSoundTrack}
        currentScene={currentScene}
        backgroundColor={backgroundColor}
        setBackgroundColor={setBackgroundColor}
      />
    </div>
  );
};

export default EditorLayout;
