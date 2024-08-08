import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";

interface CreateVideoDialogProps {
  selectedVoice: string | null;
  onVoiceSelect: (voiceId: string) => void;
}

const CreateVideoDialog = ({
  selectedVoice,
  onVoiceSelect,
}: CreateVideoDialogProps) => {
  const [voices, setVoices] = useState<
    Array<{ id: string; name: string; sampleUrl: string }>
  >([]);
  const [playingSampleUrl, setPlayingSampleUrl] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const response = await instance.get(`${API_URL}/ai/api/v1/video/voices`);
        setVoices(response.data.data);
      } catch (error) {
        console.error("Error fetching voices");
      }
    };

    fetchVoices();
  }, []);

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
    onVoiceSelect(voiceId);
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
      <label
        htmlFor="voice"
        className="flex items-center font-semibold gap-x-3"
      >
        <span className="space-x-2 text-[15px] z-0 relative">Voices</span>
      </label>
      <div>
        <div className="relative z-20">
          <button
            ref={buttonRef}
            className="border border-[#DEDEDE] bg-[#F5F5F5] h-full w-full rounded-xl outline-none focus:border-primary-green transition-all p-4 text-left flex justify-between items-center"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            {selectedVoice
              ? voices.find((v) => v.id === selectedVoice)?.name
              : "Select Voice"}
            <span
              className={`ml-2 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`} 
              style={{ display: "inline-block" }}
            >
              <Image src="/arrowe.svg" width={10} height={10} alt="arrow"/>
            </span>
          </button>
          <motion.div
            ref={dropdownRef}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-0 w-full border border-[#DEDEDE] bg-[#F5F5F5] rounded-xl mt-2"
            style={{ display: dropdownOpen ? "block" : "none" }}
          >
            {voices.map((voice) => (
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
                  onClick={(e) => {
                    e.stopPropagation(); 
                    handlePlaySample(voice.sampleUrl);
                  }}
                  className="ml-2"
                  aria-label="Play sample"
                >
                  <Image src="/music.png" width={20} height={20} alt="music" />
                </button>
              </div>
            ))}
          </motion.div>
        </div>

        <audio ref={audioRef} />
      </div>
    </div>
  );
};

export default CreateVideoDialog;
