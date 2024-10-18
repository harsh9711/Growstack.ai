import React, { useState } from "react";
import { AnimatePresence, Reorder } from "framer-motion";
import { Plus, X } from "lucide-react";
import { DraggableIcon } from "@/components/svgs";
import { ISubtitleTalkingPoints } from "../types";

interface SubtitleListProps {
  talkingPoints: ISubtitleTalkingPoints[];
  handleTalkingPointsReorder: (talkingPoints: ISubtitleTalkingPoints[]) => void;
  handleTalkingPointsRemove: (index: number) => void;
}

const TalkingPointsList: React.FC<SubtitleListProps> = ({
  handleTalkingPointsRemove,
  handleTalkingPointsReorder,
  talkingPoints,
}) => {
  const [newTalkingPoints, setNewTalkingPoints] = useState<{
    [key: number]: string;
  }>({});
  const [showInput, setShowInput] = useState<boolean>(false);
  const [confirmingIndex, setConfirmingIndex] = useState<number | null>(null);

  const toggleInput = (index: number) => {
    setShowInput(true);
    setConfirmingIndex(index);
  };

  const addNewTalkingPoint = (index: number) => {
    const point = newTalkingPoints[index]?.trim();
    if (!point) {
      return;
    }

    const updatedTalkingPoints = [...talkingPoints];
    updatedTalkingPoints[index].talking_points.push(point);
    handleTalkingPointsReorder(updatedTalkingPoints);

    const newInputs = { ...newTalkingPoints };
    delete newInputs[index];
    setNewTalkingPoints(newInputs);

    setShowInput(false);
    setConfirmingIndex(null);
  };

  const handleInputChange = (index: number, value: string) => {
    setNewTalkingPoints({ ...newTalkingPoints, [index]: value });
  };

  return (
    <Reorder.Group
      axis="y"
      values={talkingPoints}
      onReorder={handleTalkingPointsReorder}
      className="mt-4 px-10 py-12 bg-white border rounded-3xl space-y-10"
    >
      <AnimatePresence>
        {talkingPoints.map((item, index) => (
          <Reorder.Item
            key={item.subtitle_name}
            value={item}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-start gap-4">
              <DraggableIcon className="cursor-grab active:cursor-grabbing mt-3 w-full max-w-fit" />
              <div className="w-full space-y-8">
                <h1 className="w-full bg-[#F5F5F5] p-3 rounded-lg">
                  {item.subtitle_name}
                </h1>
                <div className="space-y-4">
                  {item.talking_points.map((point, pointIndex) => (
                    <div key={pointIndex}>
                      <div className="w-full bg-[#F5F5F5] p-3 rounded-lg">
                        {point}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <X
                size={25}
                className="text-primary-green cursor-pointer mt-3"
                onClick={() => handleTalkingPointsRemove(index)}
              />
            </div>
            <div className="w-full flex flex-col">
              {confirmingIndex === index ? (
                <div className="w-full pl-6 pr-9 mt-1 flex flex-col">
                  <input
                    type="text"
                    className="flex h-[50px] w-full rounded-xl bg-[#F5F5F5] px-4 py-2"
                    placeholder="Enter new talking point"
                    value={newTalkingPoints[index] || ""}
                    onChange={e => handleInputChange(index, e.target.value)}
                  />
                  <button
                    onClick={() => addNewTalkingPoint(index)}
                    className="self-end mt-2 text-[#212833] hover:bg-primary-green/10 sheen flex gap-2 p-2 rounded-lg text-sm items-center font-medium transition-all duration-300"
                  >
                    <Plus size={18} className="text-primary-green" />
                    Confirm
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => toggleInput(index)}
                  className="self-end mr-9 text-[#212833] hover:bg-primary-green/10 sheen flex gap-2 p-2 rounded-lg text-sm items-center font-medium transition-all duration-300"
                >
                  <Plus size={18} className="text-primary-green" />
                  Add new section
                </button>
              )}
            </div>
          </Reorder.Item>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};

export default TalkingPointsList;
