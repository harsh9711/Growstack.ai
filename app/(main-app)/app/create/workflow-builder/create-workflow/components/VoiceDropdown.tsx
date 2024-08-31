import { useState, useEffect, useRef } from "react";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import toast from "react-hot-toast";
import CreateVideoDialog from "./AudioBox";

interface SuggestionDropdownProps {
  handleSubOptionClick: (subOption: SubOption) => void;
  setSuggestionOptions: (params: any) => void;
  dropdownRef: any;
  onVoiceSelect: any;
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

const VoiceDropdown = ({
  dropdownRef,
  isDropdownVisible,
  onVoiceSelect,
}: SuggestionDropdownProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [voices, setVoices] = useState<
    Array<{ id: string; name: string; sampleUrl: string }>
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const response = await instance.get(
          `${API_URL}/ai/api/v1/video/voices`
        );
        setVoices(response.data.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching voices");
        setLoading(false);
      }
    };

    fetchVoices();
  }, []);

  const handleVoiceSelect = (voiceId: string) => {
    setSelectedVoice(voiceId);
    onVoiceSelect(voiceId);
  };

  const handleSearchChange = (e: any) => setSearchQuery(e.target.value);

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

          <CreateVideoDialog
            selectedVoice={selectedVoice}
            onVoiceSelect={handleVoiceSelect}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            voices={voices}
            loading={loading}
          />
        </div>
      )}
    </>
  );
};

export default VoiceDropdown;
