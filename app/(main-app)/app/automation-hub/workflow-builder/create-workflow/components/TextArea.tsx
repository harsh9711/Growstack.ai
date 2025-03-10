import React, { useEffect, useRef, useState } from "react";
import SuggestionDropdown from "./SuggestionDropdown";
import { InputType } from "@/types/common";

interface TextAreaProps {
  option: any;
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

const TextArea = ({
  option,
  setActiveAction,
  index,
  suggestionOptions,
  setSuggestionOptions,
}: TextAreaProps) => {
  const [description, setDescription] = useState<string>(option.variable_value);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setActiveAction((prevState: any) => ({
      ...prevState,
      preset_json: {
        ...prevState.preset_json,
        body: prevState.preset_json.body.map((input: InputType, i: number) => {
          if (i === index && input.variable_type === "TEXT_AREA") {
            return {
              ...input,
              variable_value: description,
            };
          }
          return input;
        }),
      },
    }));
  }, [description]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        textareaRef.current &&
        !textareaRef.current.contains(event.target)
      ) {
        setDropdownVisible(false);
        setSuggestionOptions((prevState: any) =>
          prevState.map((option: any) => ({ ...option, isExpanded: false }))
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
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      const newDescription =
        description.substring(0, startPos) +
        `{$` +
        `{${subOption.name}}}` +
        description.substring(endPos);
      setDescription(newDescription);
      setTimeout(() => {
        textarea.setSelectionRange(
          startPos + subOption.name.length + 5,
          startPos + subOption.name.length + 5
        );
        textarea.focus();
      }, 0);
    }
  };
  return (
    <>
      <div className="nodrag font-medium  text-xl mb-2 capitalize">
        {option.variable_label}
      </div>
      <textarea
        ref={textareaRef}
        onFocus={handleTextareaFocus}
        id="description"
        name="description"
        value={description}
        rows={5}
        onChange={e => setDescription(e.target.value)}
        placeholder={
          option?.input_placeholder
            ? option.input_placeholder
            : "Please write here"
        }
        className="w-full bg-[#F5F5F5] rounded-xl block resize-none p-4 text-[15px]"
      ></textarea>
      <SuggestionDropdown
        dropdownRef={dropdownRef}
        isDropdownVisible={isDropdownVisible}
        handleSubOptionClick={handleSubOptionClick}
        suggestionOptions={suggestionOptions}
        setSuggestionOptions={setSuggestionOptions}
      />
    </>
  );
};

export default TextArea;
