import { DraggableIcon } from "@/components/svgs";
import { AnimatePresence, Reorder } from "framer-motion";
import { X } from "lucide-react";
import React from "react";
interface SubtitleListProps {
  subtitles: string[];
  onRemove: (index: number) => void;
  onReorder: (subtitles: string[]) => void;
}

const SubtitleList: React.FC<SubtitleListProps> = ({
  subtitles,
  onRemove,
  onReorder,
}) => {
  return (
    <Reorder.Group
      axis="y"
      values={subtitles}
      onReorder={onReorder}
      className="mt-4 space-y-4"
    >
      <AnimatePresence>
        {subtitles.map((subtitle, index) => (
          <Reorder.Item
            key={subtitle}
            value={subtitle}
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.15 }}
          >
            <div className="flex items-center gap-4">
              <DraggableIcon className="cursor-grab active:cursor-grabbing w-full max-w-fit" />
              <div className="w-full bg-[#F5F5F5] p-3 rounded-lg">
                {subtitle}
              </div>
              <X
                size={25}
                className="text-[#2DA771] cursor-pointer"
                onClick={() => onRemove(index)}
              />
            </div>
          </Reorder.Item>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};

export default SubtitleList;
