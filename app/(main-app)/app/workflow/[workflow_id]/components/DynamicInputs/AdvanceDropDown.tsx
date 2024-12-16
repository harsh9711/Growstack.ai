import React, { useState } from "react";
import Tooltip from "../tooltip/Tooltip";
import { DynamicInputProps } from "@/types/workflows";
import { useAppSelector } from "@/lib/hooks";

interface AdvanceDropDownProps {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  sampleUrl: string;
}

const AdvanceDropDown: React.FC<DynamicInputProps> = ({
  param,
  inputKey,
  handleInputChange,
}) => {
  const { voices } = useAppSelector(state => state.avatarVoice);

  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );

  const playAudio = (url: string, id: string) => {
    if (currentAudio && !currentAudio.paused) {
      currentAudio.pause();
      setPlayingVoiceId(null);
      setCurrentAudio(null);
    } else {
      const audio = new Audio(url);
      audio.play();
      setPlayingVoiceId(id);
      setCurrentAudio(audio);
      audio.onended = () => {
        setPlayingVoiceId(null);
        setCurrentAudio(null);
      };
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedVoice(selectedId);
    handleInputChange(inputKey, param.type, selectedId);
  };

  const selectedVoiceData = voices?.find(voice => voice.id === selectedVoice);

  return (
    <div key={inputKey} className="input-box mb-3">
      <div className="label-box flex gap-2 items-center mb-1 relative">
        <label className="text-[12px] text-[#14171B] font-medium">
          {param.label}
          {param.required && <span className="text-[#CF0000]">*</span>}
        </label>
        <Tooltip
          description={param?.description || ""}
          position="bottom-full left-[-23px]"
        />
      </div>
      <div className="input-group">
        <select
          id="voice-options"
          name="voice-options"
          className="form-control outline-0 shadow-none w-full p-3 cursor-pointer rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-[12px] font-medium focus:outline-none"
          onChange={handleSelectChange}
        >
          {voices?.map(voice => (
            <option key={voice.id} value={voice.id}>
              {voice.name}
            </option>
          ))}
        </select>
        {selectedVoiceData && (
          <div className="mt-2 flex items-center justify-between p-2 bg-[#F8F8FA] rounded-lg mb-2 shadow-sm">
            <p className="text-[#14171B] text-sm font-medium">
              {selectedVoiceData.name}
            </p>
            <button
              onClick={() =>
                playAudio(selectedVoiceData.sampleUrl, selectedVoiceData.id)
              }
              className={`bg-[#2DA771] text-white text-sm px-4 py-2 rounded-md hover:bg-[#24965f] focus:outline-none ${playingVoiceId === selectedVoiceData.id ? "bg-[#24965f]" : ""}`}
            >
              {playingVoiceId === selectedVoiceData.id ? "Pause" : "Play"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvanceDropDown;
