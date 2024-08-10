import Motion from "@/components/Motion";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import SuggestionDropdown from "../../../SuggestionDropdown";
import { InputIcon2 } from "@/components/svgs";
import { jsonKeySchema } from "./utils/validations";
import { z } from "zod";

interface PlainTextOutputSectionProps {
  onParamsChange: (params: PlainTextParams) => void;
  outputParams: PlainTextParams | {};
  actions: any;
  inputConfigs: any;
  jsonKeyError: string;
  setJsonKeyError: (value: string) => void;
}

interface PlainTextParams {
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
  show: boolean
};

type SubOption = {
  label: string;
  name: string;
  show: boolean
};

export default function PlainTextOutputSection({ actions, inputConfigs, outputParams, onParamsChange, jsonKeyError, setJsonKeyError }: PlainTextOutputSectionProps) {

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [suggestionOptions, setSuggestionOptions] = useState<SuggestionOption[]>([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const [params, setParams] = useState<PlainTextParams>({
    display_name: (outputParams as PlainTextParams).display_name || "",
    value: (outputParams as PlainTextParams).value || "",
    json_key: (outputParams as PlainTextParams).json_key || "",
  });

  useEffect(() => {
    onParamsChange(params);
  }, [params, onParamsChange]);

  const updateParams = (updates: Partial<PlainTextParams>) => {
    const updatedParams = { ...params, ...updates };
    if (updates.display_name) {
      updatedParams.json_key = updates.display_name.trim().toLowerCase().replace(/\s+/g, "_");
    }
    else if(updates.display_name === ""){
      updatedParams.json_key = ""
    }
    setParams(updatedParams);
    if ('json_key' in updatedParams) {
      try {
        jsonKeySchema.parse(updatedParams.json_key);
        setJsonKeyError('');
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
        type: 'input',
        name: 'Input',
        label: 'Input',
        icon: <InputIcon2 />,
        isExpanded: false,
        index: 0,
        show: true,
        subOptions: inputConfigs.map((inputConfig: any) => ({
          label: inputConfig.variable_name,
          value: inputConfig._id,
          name: inputConfig.variable_name,
          show: true
        }))
      },
      ...actions.map((action: any, index: number) => ({
        type: 'output',
        name: action.name,
        label: action.name,
        index: index + 1,
        isExpanded: false,
        show: true,
        icon: <img src={action.icon} alt={action.name} width="24" height="24" className="flex-shrink-0 rounded-md object-contain min-h-[24px] min-w-[24px]" />,
        subOptions: [{
          label: 'Output',
          value: action.action_id,
          name: `step${index + 1}.output`,
          show: true
        }]
      }))
    ]);
  }, []);

  // Handle clicking outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && textareaRef.current && !textareaRef.current.contains(event.target)) {
        setDropdownVisible(false);
        setSuggestionOptions((prevState) => prevState.map((option) => ({ ...option, isExpanded: false })));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTextareaFocus = () => setDropdownVisible(true);

  const handleSubOptionClick = (subOption: SubOption) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      const newDescription = params.value.substring(0, startPos) + `{$` + `{${subOption.name}}}` + params.value.substring(endPos);
      updateParams({ value: newDescription });
      setTimeout(() => {
        textarea.setSelectionRange(startPos + subOption.name.length + 4, startPos + subOption.name.length + 4);
        textarea.focus();
      }, 0);
    }
  };

  return (
    <Motion transition={{ duration: 0.5 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="font-medium text-sm">Output label</label>
          <Input
            type="text"
            placeholder="Output label"
            onChange={(e) => updateParams({ display_name: e.target.value })}
            value={params.display_name}
          />
        </div>

        <div className="space-y-2">
          <label className="font-medium flex gap-2 items-center">Value </label>
          <textarea
            ref={textareaRef}
            value={params.value}
            onChange={(e) => updateParams({ value: e.target.value })}
            onFocus={handleTextareaFocus}
            placeholder="Reference variables from previous steps using '@' to autocomplete"
            className="bg-[#F2F2F2] p-3 h-[120px] block resize-none w-full rounded-xl"></textarea>
          <SuggestionDropdown dropdownRef={dropdownRef} isDropdownVisible={isDropdownVisible} handleSubOptionClick={handleSubOptionClick} suggestionOptions={suggestionOptions} setSuggestionOptions={setSuggestionOptions} />
        </div>

        <div className="space-y-2">
          <label className="font-medium text-sm">JSON Key </label>
          <Input
            type="text"
            placeholder="Key (e.g. download_link)"
            value={params.json_key}
            onChange={(e) => updateParams({ json_key: e.target.value })}
          />
          <p className="text-red-400 text-xs"> {jsonKeyError}</p>
        </div>
      </div>
    </Motion>
  );
}
