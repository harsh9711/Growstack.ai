import React, { useEffect, useRef, useState } from "react";
import SuggestionDropdown from "./SuggestionDropdown";
import AvtarDropdown from "./AvtarDropdown";
import VoiceDropdown from "./VoiceDropdown";
import { InputType } from "@/types/common";

interface TextAreaProps {
  option: InputType;
  setActiveAction: (params: any) => void;
  index: number;
  suggestionOptions: SuggestionOption[];
  setSuggestionOptions: (params: any) => void;
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

type SubOption = {
  label: string;
  name: string;
  show: boolean;
};

const ShortTextArea: React.FC<TextAreaProps> = ({
  option,
  setActiveAction,
  index,
  suggestionOptions,
  setSuggestionOptions,
}) => {
  const [description, setDescription] = useState<string>(option.variable_value || "");
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setActiveAction((prevState: any) => ({
      ...prevState,
      preset_json: {
        ...prevState.preset_json,
        body: prevState.preset_json.body.map(
          (input: InputType, i: number) => {
            if (i === index && (input.variable_type === "TEXT_AREA" || input.variable_type === "SHORT_TEXT")) {
              return {
                ...input,
                variable_value: description,
              };
            }
            return input;
          }
        ),
      },
    }));
  }, [description]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        textareaRef.current &&
        !textareaRef.current.contains(event.target as Node)
      ) {
        setDropdownVisible(false);
        setSuggestionOptions((prevState : any) =>
          prevState.map((option : any) => ({ ...option, isExpanded: false }))
        );
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTextareaFocus = () => setDropdownVisible(true);

  const handleSubOptionClick = (subOption: SubOption) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const startPos = textarea.selectionStart ?? 0;
      const endPos = textarea.selectionEnd ?? 0;
      const newDescription =
        description.substring(0, startPos) +
        `{$` +
        `{${subOption.name}}}` +
        description.substring(endPos);
      setDescription(newDescription);
  
      const placeholderIndex = newDescription.indexOf(`{${subOption.name}}`);
      const totalPlaceholders = newDescription.split('{').length - 1;
      const newCursorPos = placeholderIndex + subOption.name.length + 2 * (totalPlaceholders - 1);
  
      textarea.setSelectionRange(newCursorPos, newCursorPos);
      textarea.focus();
    }
  };

  const handleVoiceSelect = (voiceId: string) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const existingText = description;
      const voiceIdPattern = /\{[A-Za-z0-9_-]+\}/;
      let newDescription;
      if (voiceIdPattern.test(existingText)) {
        newDescription = existingText.replace(voiceIdPattern, `{${voiceId}}`);
      } else {
        const startPos = textarea.selectionStart ?? 0;
        const endPos = textarea.selectionEnd ?? 0;
        newDescription =
          existingText.substring(0, startPos) +
          `{${voiceId}}` +
          existingText.substring(endPos);
      }

      setDescription(newDescription);
      setTimeout(() => {
        const newCursorPos =
          newDescription.indexOf(`{${voiceId}}`) + voiceId.length + 2;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        textarea.focus();
      }, 0);
    }
  };

  const handleAvatarSelect = (avatarId: string) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const existingText = description;
      const avatarIdPattern = /\{[A-Za-z0-9_-]+\}/;
      let newDescription;
      if (avatarIdPattern.test(existingText)) {
        newDescription = existingText.replace(avatarIdPattern, `{${avatarId}}`);
      } else {
        const startPos = textarea.selectionStart ?? 0;
        const endPos = textarea.selectionEnd ?? 0;
        newDescription =
          existingText.substring(0, startPos) +
          `{${avatarId}}` +
          existingText.substring(endPos);
      }

      setDescription(newDescription);
      setTimeout(() => {
        const newCursorPos =
          newDescription.indexOf(`{${avatarId}}`) + avatarId.length + 2;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
        textarea.focus();
      }, 0);
    }
  };

  return (
    <>
      <div className="font-medium text-xl mb-2 capitalize">
        {option.variable_label}
      </div>
      <textarea
        ref={textareaRef}
        onFocus={handleTextareaFocus}
        id="description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Please write here"
        className="h-[50px] w-full bg-[#F5F5F5] rounded-xl block resize-none p-4 text-[15px]"
      ></textarea>

      {option.variable_label === "avatar_id" ? (
        <AvtarDropdown
          dropdownRef={dropdownRef}
          isDropdownVisible={isDropdownVisible}
          handleSubOptionClick={handleSubOptionClick}
          suggestionOptions={suggestionOptions}
          setSuggestionOptions={setSuggestionOptions}
          onAvatarSelect={handleAvatarSelect}
        />
      ) : option.variable_label === "voice_id" ? (
        <VoiceDropdown
          dropdownRef={dropdownRef}
          isDropdownVisible={isDropdownVisible}
          handleSubOptionClick={handleSubOptionClick}
          suggestionOptions={suggestionOptions}
          setSuggestionOptions={setSuggestionOptions}
          onVoiceSelect={handleVoiceSelect}
        />
      ) : (
        <SuggestionDropdown
          dropdownRef={dropdownRef}
          isDropdownVisible={isDropdownVisible}
          handleSubOptionClick={handleSubOptionClick}
          suggestionOptions={suggestionOptions}
          setSuggestionOptions={setSuggestionOptions}
        />
      )}
    </>
  );
};

export default ShortTextArea;
