import clsx from "clsx";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Avatar {
  thumbnailUrl: string;
  avatar: string;
  name: string;
  id: string;
  role: string;
}

interface AvatarSelectionProps {
  avatars: Avatar[];
  onSelect: (avatar: Avatar) => void;
}

const AvatarSelection = ({ avatars, onSelect }: AvatarSelectionProps) => {
  const [selectedAvatarId, setSelectedAvatarId] = useState<string | null>(null);

  const handleAvatarClick = (avatar: Avatar) => {
    setSelectedAvatarId(avatar.id);
    onSelect(avatar);
  };

  return (
    <div className="w-full flex flex-wrap gap-4 relative z-10 justify-center md:justify-start">
      {avatars.map((avatar) => (
        <div
          key={avatar.id}
          onClick={() => handleAvatarClick(avatar)}
          className={clsx(
            "bg-white border border-[#E8E8E8] rounded-2xl p-2 cursor-pointer",
            {
              "border-2 shadow-xl border-primary-green text-center":
                avatar.id === selectedAvatarId,
            }
          )}
        >
          <div className="relative">
            <div className="relative w-[100px] h-[100px] md:w-[150px] md:h-[150px]">
              <Image
                src={avatar.thumbnailUrl}
                alt={avatar.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform rounded-2xl duration-300 group-hover:scale-110"
              />
            </div>
          </div>
          <button className="bg-white text-black h-4 w-full rounded-xl mt-3 transition-all duration-300">
            <h1 className="text-sm md:text-md font-medium text-center">
              {avatar.name}
            </h1>
          </button>
        </div>
      ))}
    </div>


  );
};

export default AvatarSelection;
