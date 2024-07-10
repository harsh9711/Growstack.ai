import React, { useState } from "react";
import EditCanvas from "./EditCanvas";
import { AnimatePresence, motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";

type Scene = {
  id: string;
  title: string;
};

const Layout: React.FC = () => {
  const [scenes, setScenes] = useState<Scene[]>([{ id: "1", title: "scene 1" }]);
  const [currentScene, setCurrentScene] = useState<Scene | null>(scenes[0]);
  const [activeSceneIndicatorPosition, setActiveSceneIndicatorPosition] = useState(0);

  const addScene = () => {
    const newScene: Scene = {
      id: (scenes.length + 1).toString(),
      title: `scene ${scenes.length + 1}`,
    };
    setScenes([...scenes, newScene]);
    selectScene(newScene, scenes.length > 3 ? scenes.length : scenes.length - 1);
  };

  //
  const selectScene = (scene: Scene, index: number) => {
    setCurrentScene(scene);
    setActiveSceneIndicatorPosition((index / scenes.length) * 100);
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
          <EditCanvas />
        </div>
        <div className="mt-4 w-full bg-white p-10 rounded-3xl">
          <textarea placeholder="Type your script here..." className="w-full h-32 p-2 border rounded-xl resize-none"></textarea>
          <div className="flex justify-center gap-5 mt-2">
            <button className="bg-gray-300 p-2 rounded">Gesture</button>
            <button className="bg-gray-300 p-2 rounded">Marker</button>
            <button className="bg-gray-300 p-2 rounded">Pause</button>
            <button className="bg-gray-300 p-2 rounded">Diction</button>
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
