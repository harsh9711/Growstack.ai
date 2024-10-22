import clsx from "clsx";
import { useState } from "react";
import Image from "next/image";

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

const AvatarSelectionSmall = ({ avatars, onSelect }: AvatarSelectionProps) => {
  const [selectedAvatarId, setSelectedAvatarId] = useState<string | null>(null);

  const handleAvatarClick = (avatar: Avatar) => {
    setSelectedAvatarId(avatar.id);
    onSelect(avatar);
  };

  return (
    <div className="w-full grid grid-cols-6 gap-4 relative z-10">
      {avatars.map(avatar => (
        <div
          key={avatar.id}
          onClick={() => handleAvatarClick(avatar)}
          className={clsx(
            "bg-white border border-[#E8E8E8] rounded-2xl cursor-pointer",
            {
              "border-2 shadow-xl border-primary-green text-center":
                avatar.id === selectedAvatarId,
            }
          )}
        >
          <div className="relative w-full h-[50px]">
            {" "}
            {/* Adjust height to ensure proper visibility */}
            <Image
              src={avatar.thumbnailUrl}
              alt={avatar.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform rounded-2xl duration-300"
            />
          </div>
          <button className="bg-white text-black h-10 w-full text-ellipsis overflow-hidden rounded-xl  transition-all duration-300">
            <h1 className="text-[10px] font-medium text-center truncate">
              {avatar.name}
            </h1>
          </button>
        </div>
      ))}
    </div>
  );
};

export default AvatarSelectionSmall;
