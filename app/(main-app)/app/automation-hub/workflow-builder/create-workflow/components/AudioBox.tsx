import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

interface CreateVideoDialogProps {
  selectedVoice: string | null;
  onVoiceSelect: (voiceId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  voices: Array<{ id: string; name: string; sampleUrl: string }>;
  loading: boolean;
}

const CreateVideoDialog = ({
  selectedVoice,
  onVoiceSelect,
  searchQuery,
  setSearchQuery,
  voices,
  loading,
}: CreateVideoDialogProps) => {
  const [filteredVoices, setFilteredVoices] = useState(voices);
  const [playingSampleUrl, setPlayingSampleUrl] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setFilteredVoices(
      voices.filter(voice =>
        voice.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, voices]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleVoiceSelect = (voiceId: string) => {
    const selectedVoice = voices.find(voice => voice.id === voiceId);
    if (selectedVoice) {
      onVoiceSelect(voiceId);
      toast.success(`Selected voice: ${selectedVoice.name}`);
    }
    setDropdownOpen(false);
  };

  const handlePlaySample = (sampleUrl: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = sampleUrl;
      audioRef.current.play();
    } else {
      const audio = new Audio(sampleUrl);
      audio.play();
      setPlayingSampleUrl(sampleUrl);
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      {loading ? ( // Show loading indicator if data is being fetched
        <div className="text-center">Loading voices...</div>
      ) : (
        <div className="relative z-20">
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 w-full border border-[#DEDEDE] bg-[#F5F5F5] rounded-xl mt-2"
          >
            {filteredVoices.length > 0 ? (
              filteredVoices.map(voice => (
                <div
                  key={voice.id}
                  className={`p-2 flex justify-between items-center cursor-pointer hover:bg-[#EDEDED] ${
                    selectedVoice === voice.id ? "bg-[#D0D0D0]" : ""
                  }`}
                  onClick={() => handleVoiceSelect(voice.id)}
                >
                  <span>{voice.name}</span>
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation();
                      handlePlaySample(voice.sampleUrl);
                    }}
                    className="ml-2"
                    aria-label="Play sample"
                  >
                    <Image
                      src="/music.png"
                      width={20}
                      height={20}
                      alt="music"
                    />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center">No voices found</div>
            )}
          </div>
        </div>
      )}
      <audio ref={audioRef} />
    </div>
  );
};

export default CreateVideoDialog;
