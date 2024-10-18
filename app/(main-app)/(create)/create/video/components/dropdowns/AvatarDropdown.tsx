import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Search, UserCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import { avatars } from "../../constants/avatars";
import Image from "next/image";

interface AvatarDropdownProps {
  onAvatarSelect: (avatarId: string) => void;
  setSelectedAvatarId: (avatarId: string) => void;
}

export default function AvatarDropdown({
  onAvatarSelect,
  setSelectedAvatarId,
}: AvatarDropdownProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredAvatars, setFilteredAvatars] = useState(avatars);

  useEffect(() => {
    const filterAvatars = () => {
      const filtered = avatars.filter(avatar =>
        avatar["Avatar Name"].toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAvatars(filtered);
    };

    filterAvatars();
  }, [searchQuery]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-col gap-2 text-[15px] items-center text-white/90 justify-center py-2 w-[70px] hover:bg-[#fff]/20 rounded-md cursor-pointer transition-all duration-300">
          <UserCircle size={23} className="text-white/80" />
          Avatar
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[500px] relative right-10 text-[15px] py-5 px-8 rounded-2xl shadow-2xl shadow-gray-200 space-y-4">
        <h1 className="text-xl font-semibold">Add avatar</h1>
        <div className="bg-[#F5F5F5] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md">
          <Search className="text-gray-500" size={20} />
          <input
            type="search"
            className="bg-transparent outline-none h-[40px] w-full"
            placeholder="Search avatars"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
        <h2 className="text-[17px] font-semibold">All</h2>
        <div className="grid grid-cols-3 gap-4 max-h-[500px] overflow-y-auto hidden-scrollbar">
          {filteredAvatars.map((avatar, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-gray-300 cursor-pointer transition-all duration-300"
              onClick={() => {
                setSelectedAvatarId(avatar.AVATAR_ID);
                onAvatarSelect(avatar.AVATAR_ID);
              }} // Handle avatar selection
            >
              <Image
                src={avatar.Avatar_image}
                alt={avatar["Avatar Name"]}
                width={400}
                height={400}
                className="w-full h-[120px] object-cover overflow-hidden"
              />
              <div className="p-4 py-2 ">
                <h2>{avatar["Avatar Name"]}</h2>
                {/* <p className="text-xs text-gray-400">{avatar.Gender}</p> */}
              </div>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
