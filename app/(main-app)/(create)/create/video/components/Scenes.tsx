import React, { useState } from "react";
import { Scene } from "./types";
import { AnimatePresence, motion } from "framer-motion";

export default function Scenes({
  scenes,
  setScenes,
  currentScene,
  setCurrentScene,
}: {
  scenes: Scene[];
  setScenes: (scenes: Scene[]) => void;
  currentScene: Scene;
  setCurrentScene: (scene: Scene) => void;
}) {
  const [activeSceneIndicatorPosition, setActiveSceneIndicatorPosition] = useState(0);

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

  return (
    <div className="!bg-white shadow-box !rounded-xl w-full max-w-[112px] pt-4">
      <h2 className="text-lg font-bold mb-4 px-4">Scenes</h2>
      <AnimatePresence>
        <ul className="relative flex flex-col">
          {scenes.map((scene, index) => (
            <motion.li
              key={index}
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
  );
}
