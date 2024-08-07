// AvatarSelection.tsx
import clsx from "clsx";
import { useState } from "react";

interface Avatar {
  thumbnailUrl: string;
  avatar: string;
  name: string;
  id: string;
  role:string;
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
    <div className="w-full flex flex-wrap gap-4">
      {avatars.map((avatar) => (
        <div
          key={avatar.id}
          onClick={() => handleAvatarClick(avatar)}
          className={clsx(
            "relative w-24 h-24 cursor-pointer rounded-lg overflow-hidden",
            {
              "border-4 border-primary-green shadow-lg transform translate-y-[-10px]": avatar.id === selectedAvatarId
            }
          )}
        >
          
          <img
            src={avatar.thumbnailUrl}
            alt={avatar.name}
            className="w-full h-full object-cover"
          />  
          <h2 className="">
          {avatar.name}  
          </h2>
        </div>
      ))}
    </div>
  );
};

export default AvatarSelection;
