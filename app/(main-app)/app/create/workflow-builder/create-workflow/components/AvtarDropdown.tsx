import AvatarSelection from "@/app/(main-app)/app/plan/text-to-video/components/AvatarSelection";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import AvatarSelectionSmall from "./AvatarSelectionSmall";

interface SuggestionDropdownProps {
  handleSubOptionClick: (subOption: SubOption) => void;
  setSuggestionOptions: (params: any) => void;
  dropdownRef: any;
  onAvatarSelect: any;
  suggestionOptions: SuggestionOption[];
  isDropdownVisible: boolean;
}

type SuggestionOption = {
  type: string;
  name: string;
  label: string;
  icon: any;
  index: number;
  isExpanded: boolean;
  subOptions: SubOption[];
  show: boolean;
};

interface Avatar {
  thumbnailUrl: string;
  avatar: string;
  name: string;
  role: string;
  id: string;
}

type SubOption = {
  label: string;
  name: string;
  show: boolean;
};

const AvtarDropdown = ({
  dropdownRef,
  isDropdownVisible,
  handleSubOptionClick,
  setSuggestionOptions,
  suggestionOptions,
  onAvatarSelect,
}: SuggestionDropdownProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [assistants, setAssistants] = useState<Avatar[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleSuggestion = (index: number) => {
    setSuggestionOptions((prevState: SuggestionOption[]) =>
      prevState.map((option, i) => {
        if (i === index) {
          return {
            ...option,
            isExpanded: !option.isExpanded,
          };
        }
        return option;
      })
    );
  };

  const handleSearchChange = (e: any) => setSearchQuery(e.target.value);

  useEffect(() => {
    const loadAvatars = async () => {
      try {
        setLoading(true);
        const response = await instance.get(
          `${API_URL}/ai/api/v1/video/avatars`
        );
        setAssistants(
          response.data.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            thumbnailUrl: item.thumbnailUrl,
          }))
        );
      } catch (error) {
        toast.error("Error fetching avatars");
      } finally {
        setLoading(false);
      }
    };

    loadAvatars();
  }, []);

  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();
    setSuggestionOptions((prevState: SuggestionOption[]) =>
      prevState.map((option) => ({
        ...option,
        show: option.subOptions.some((subOption) =>
          subOption.label.toLowerCase().includes(query)
        ),
        subOptions: option.subOptions.map((subOption) => ({
          ...subOption,
          show: subOption.label.toLowerCase().includes(query),
        })),
      }))
    );
  }, [searchQuery]);

  const handleAvatarSelect = (avatar: Avatar) => {
    setSelectedAvatar(avatar);
    onAvatarSelect(avatar.id);
    toast.success(`Selected avatar: ${avatar.name}`);
  };

  const filteredAvatars = assistants.filter((avatar) =>
    avatar.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {isDropdownVisible && (
        <div
          className="dropdown border border-white shadow-md rounded-xl mt-2 p-4"
          ref={dropdownRef}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded-md w-full mb-2"
            placeholder="Search..."
          />
          <AvatarSelectionSmall
            avatars={filteredAvatars}
            onSelect={handleAvatarSelect}
          />
        </div>
      )}
    </>
  );
};

export default AvtarDropdown;
