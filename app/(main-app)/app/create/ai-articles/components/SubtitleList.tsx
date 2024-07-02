import { X } from "lucide-react";
import React from "react";

interface SubtitleListProps {
  subtitles: string[];
  onRemove: (index: number) => void;
  onReorder: (subtitles: string[]) => void;
}

const SubtitleList: React.FC<SubtitleListProps> = ({ subtitles, onRemove, onReorder }) => {
  return (
    <ul className="mt-4 space-y-4">
      {subtitles.map((subtitle, index) => (
        <li key={index} className="flex items-center gap-4">
          <div className="w-full bg-[#F5F5F5] p-3 rounded-lg">{subtitle}</div>
          <X size={25} className="text-primary-green cursor-pointer" onClick={() => onRemove(index)} />
        </li>
      ))}
    </ul>
  );
};

export default SubtitleList;
