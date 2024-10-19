import Motion from "@/components/Motion";
import { InputIcon2 } from "@/components/svgs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useRef, useState } from "react";
import SuggestionDropdown from "../../../SuggestionDropdown";
import { jsonKeySchema } from "./utils/validations";
import { z } from "zod";

interface VideoOutputSectionProps {
  onParamsChange: (params: VideoParams) => void;
  outputParams: VideoParams | {};
  actions: any;
  inputConfigs: any;
  jsonKeyError: string;
  setJsonKeyError: (value: string) => void;
}

interface VideoParams {
  display_name: string;
  value: string;
  json_key: string;
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

export default function VideoOutputSection({
  actions,
  inputConfigs,
  outputParams,
  onParamsChange,
  jsonKeyError,
  setJsonKeyError,
}: VideoOutputSectionProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [suggestionOptions, setSuggestionOptions] = useState<
    SuggestionOption[]
  >([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const [params, setParams] = useState<VideoParams>({
    display_name: (outputParams as VideoParams).display_name || "",
    value: (outputParams as VideoParams).value || "",
    json_key: (outputParams as VideoParams).json_key || "",
  });

  useEffect(() => {
    onParamsChange(params);
  }, [params, onParamsChange]);

  const updateParams = (updates: Partial<VideoParams>) => {
    const updatedParams = { ...params, ...updates };
    if (updates.display_name) {
      updatedParams.json_key = updates.display_name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "_");
    } else if (updates.display_name === "") {
      updatedParams.json_key = "";
    }
    setParams(updatedParams);
    if ("json_key" in updatedParams) {
      try {
        jsonKeySchema.parse(updatedParams.json_key);
        setJsonKeyError("");
      } catch (err) {
        if (err instanceof z.ZodError) {
          setJsonKeyError(err.errors[0].message);
        }
      }
    }
  };

  useEffect(() => {
    setSuggestionOptions([
      {
        type: "input",
        name: "Input",
        label: "Input",
        icon: <InputIcon2 />,
        isExpanded: false,
        index: 0,
        show: true,
        subOptions: inputConfigs.map((inputConfig: any) => ({
          label: inputConfig.variable_name,
          value: inputConfig._id,
          name: inputConfig.variable_name,
          show: true,
        })),
      },
      ...actions.map((action: any, index: number) => ({
        type: "output",
        name: action.name,
        label: action.name,
        index: index + 1,
        isExpanded: false,
        show: true,
        icon: (
          <img
            src={action.icon}
            alt={action.name}
            width="24"
            height="24"
            className="flex-shrink-0 rounded-md object-contain min-h-[24px] min-w-[24px]"
          />
        ),
        subOptions: [
          {
            label: "Output",
            value: action.action_id,
            name: `step${index + 1}.output`,
            show: true,
          },
        ],
      })),
    ]);
  }, []);

  // Handle clicking outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setDropdownVisible(false);
        setSuggestionOptions(prevState =>
          prevState.map(option => ({ ...option, isExpanded: false }))
        );
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputFocus = () => setDropdownVisible(true);

  const handleSubOptionClick = (subOption: SubOption) => {
    if (inputRef.current) {
      const input = inputRef.current;
      const startPos = input.selectionStart ?? 0;
      const endPos = input.selectionEnd ?? 0;
      const newDescription =
        params.value.substring(0, startPos) +
        `{$` +
        `{${subOption.name}}}` +
        params.value.substring(endPos);
      updateParams({ value: newDescription });
      setTimeout(() => {
        input.setSelectionRange(
          startPos + subOption.name.length + 4,
          startPos + subOption.name.length + 4
        );
        input.focus();
      }, 0);
    }
  };

  return (
    <Motion
      transition={{ duration: 0.5 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="font-medium text-sm">Output label </label>
          <Input
            type="text"
            placeholder="Output label"
            onChange={e => updateParams({ display_name: e.target.value })}
            value={params.display_name}
          />
        </div>
        <div className="space-y-2">
          <label className="font-medium text-sm">Video URL </label>
          <Input
            type="text"
            placeholder="https://example.com/video.mp3"
            ref={inputRef}
            onChange={e => updateParams({ value: e.target.value })}
            value={params.value}
            onFocus={handleInputFocus}
          />
          <SuggestionDropdown
            dropdownRef={dropdownRef}
            isDropdownVisible={isDropdownVisible}
            handleSubOptionClick={handleSubOptionClick}
            suggestionOptions={suggestionOptions}
            setSuggestionOptions={setSuggestionOptions}
          />
        </div>
        <div className="space-y-2">
          <label className="font-medium text-sm">JSON Key</label>
          <Input
            type="text"
            placeholder="Key (e.g. download_link)"
            value={params.json_key}
            onChange={e => updateParams({ json_key: e.target.value })}
          />
          <p className="text-red-400 text-xs"> {jsonKeyError}</p>
        </div>
      </div>
    </Motion>
  );
}
