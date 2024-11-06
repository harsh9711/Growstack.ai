import { useState } from "react";
import Image from "next/image";

interface Avatar {
  thumbnailUrl: string;
  avatar: string;
  name: string;
  role: string;
  id: string;
}

interface AvatarSelectionProps {
  avatars: Avatar[];
  onSelect: (avatar: Avatar) => void;
  selectedAvatarId: string | null;
}

const AvatarSelection = ({ avatars, onSelect, selectedAvatarId }: AvatarSelectionProps) => {
  if (!avatars?.length) return null;

  return (
    <div className="w-full flex flex-wrap gap-4 relative items-center z-10 justify-start ml-10">
      {avatars.map((avatar) => {
        const isSelected = avatar.id === selectedAvatarId;

        return (
          <button
            key={avatar.id}
            type="button"
            onClick={() => onSelect(avatar)}
            className={`
              bg-white border border-[#E8E8E8] rounded-2xl p-2 cursor-pointer
              ${isSelected ? "border-2 shadow-xl border-primary-green text-center" : ""}
            `}
          >
            <div className="relative">
              <div className="relative w-[100px] h-[100px] md:w-[150px] md:h-[150px]">
                <Image
                  src={avatar.thumbnailUrl}
                  alt={avatar.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-2xl transition-transform duration-300 group-hover:scale-110"
                  priority
                />
              </div>
            </div>
            <div className="bg-white text-black h-4 w-full rounded-xl mt-3">
              <h1 className="text-sm md:text-md font-medium text-center">
                {avatar.name}
              </h1>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default AvatarSelection;
