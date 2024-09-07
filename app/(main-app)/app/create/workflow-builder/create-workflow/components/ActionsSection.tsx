import React, { useEffect, useState } from "react";
import Motion from "@/components/Motion";
import DotsLoader from "@/components/DotLoader";
import { MenuIcon } from "lucide-react";
import SuggestionDropdown from "./SuggestionDropdown";
import Dropdown from "./Dropdown";
import TextArea from "./TextArea";
import ShortTextArea from "./ShortTextArea";
import Boolean from "./Boolean"; // Import Boolean component
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import CheckboxComponent from "./Check";
import ScheduleComponent from "./Schedule";

interface ActionsSectionProps {
  activeAction: any;
  setActiveAction: (params: any) => void;
  onSaveAction: (params: any) => void;
  isAPICalling: boolean;
  actions: any;
  inputConfigs: any;
}

type SubOption = {
  label: string;
  value: string;
  name: string;
  show: boolean;
};

type SuggestionOption = {
  type: string;
  name: string;
  label: string;
  icon: JSX.Element;
  index: number;
  isExpanded: boolean;
  show: boolean;
  subOptions: SubOption[];
};

const ActionsSection = ({
  actions,
  activeAction,
  setActiveAction,
  onSaveAction,
  isAPICalling,
  inputConfigs,
}: ActionsSectionProps) => {
  const [suggestionOptions, setSuggestionOptions] = useState<SuggestionOption[]>([]);
  const [selectedRadioValue, setSelectedRadioValue] = useState<string>("Image");
  const [isVideo, setIsVideo] = useState(false);
  const [mediaUrls, setMediaUrls] = useState<any[]>([]);
  const [selectedNetworks, setSelectedNetworks] = React.useState<string[]>([]);

  // State to manage editable fields
  const [editableFields, setEditableFields] = useState<any>(activeAction.preset_json.body);

  useEffect(() => {
    setSuggestionOptions([
      {
        type: "input",
        name: "Input",
        label: "Input",
        icon: <MenuIcon />,
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
      ...actions
        .slice(0, activeAction.index)
        .map((action: any, index: number) => ({
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
  }, [actions, activeAction.index, inputConfigs]);

  const handleValueChange = (value: string) => {
    setSelectedRadioValue(value);
    setIsVideo(value === "Video");
    setActiveAction((prevAction: any) => ({
      ...prevAction,
      mediaType: value,
    }));
    console.log(value);
  };

  const handleSwitchChange = (network: string, isChecked: boolean) => {
    setSelectedNetworks((prevState) => {
      if (isChecked) {
        return [...prevState, network];
      } else {
        return prevState.filter((item) => item !== network);
      }
    });
  };

  const handleFieldChange = (key: string, value: any) => {
    setEditableFields((prevFields: any) => ({
      ...prevFields,
      [key]: value,
    }));
    setActiveAction((prevAction: any) => ({
      ...prevAction,
      preset_json: {
        ...prevAction.preset_json,
        body: {
          ...prevAction.preset_json.body,
          [key]: value,
        },
      },
    }));
  };
  const formatString = (str: string | undefined, values: Record<string, string>): string => {
    if (typeof str !== 'string') {
      return '';
    }
    
    return str.replace(/\${(.*?)}/g, (_, key) => values[key] || `{${key}}`);
  };
  
  
  
  const formattedText = formatString(editableFields.someField || '', { sender_profile_url: 'http://example.com' });
  return (
    <Motion
      transition={{ duration: 0.5 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <div className="flex flex-col items-start gap-4 pb-8">
        <div className="w-full flex flex-row items-center gap-2">
          <img
            src={activeAction.icon}
            height="56"
            width="56"
            className="w-10 h-10 rounded-2xl"
          />
          <div className="flex flex-col gap-2 w-full text-xl border-2 p-2.5 rounded-xl">
            <div className="text-start items-start font-bold">
              {editableFields?.instruction ? "Instruction" : "URL"}
            </div>
            {editableFields && (
     <div className="bg-gray-100 p-4 rounded-md">
     {Object.entries(editableFields).map(([key, value], index) => (
       <div key={index} className="mb-2">
         <div className="font-bold">{key}:</div>
         <div className="text-gray-700">
           <input
             type="text"
             value={formatString(String(value), { sender_profile_url: 'http://example.com' })}
             onChange={(e) => handleFieldChange(key, e.target.value)}
             className="border p-1 rounded"
           />
         </div>
       </div>
     ))}
   </div>
   
            )}
            {activeAction.label && (
              <div className="text-sm text-gray-600 mt-2">
                {activeAction.label}
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        {activeAction?.preset_json?.body?.inputs?.length > 0 &&
          activeAction.preset_json.body.inputs.map((option: any, index: number) => {
            if (option.input_type === "DROPDOWN") {
              return (
                <div key={index}>
                  <Dropdown
                    option={option}
                    setActiveAction={setActiveAction}
                    index={index}
                  />
                </div>
              );
            }

            if (option.input_type === "TEXT_AREA" && !option.is_prompt) {
              return (
                <div key={index} className="mt-8 ">
                  <TextArea
                    option={option}
                    index={index}
                    suggestionOptions={suggestionOptions}
                    setSuggestionOptions={setSuggestionOptions}
                    setActiveAction={setActiveAction}
                  />
                </div>
              );
            }
            if (option.input_type === "SHORT_TEXT_AREA" && !option.is_prompt) {
              return (
                <div key={index} className="mt-8 ">
                  <ShortTextArea
                    option={option}
                    index={index}
                    suggestionOptions={suggestionOptions}
                    setSuggestionOptions={setSuggestionOptions}
                    setActiveAction={setActiveAction}
                  />
                </div>
              );
            }
            if (option.input_type === "BOOLEAN" && !option.is_prompt) {
              return (
                <div key={index} className="mt-8">
                  <Boolean
                    option={option}
                    index={index}
                    setActiveAction={setActiveAction}
                    suggestionOptions={suggestionOptions}
                    setSuggestionOptions={setSuggestionOptions}
                  />
                </div>
              );
            }

            if (option.input_type === "CHECKBOX" && !option.is_prompt) {
              return (
                <div key={index} className="mt-8">
                  <CheckboxComponent
                    option={option}
                    index={index}
                    setActiveAction={setActiveAction}
                    suggestionOptions={suggestionOptions}
                    setSuggestionOptions={setSuggestionOptions}
                  />
                </div>
              );
            }
            if (option.input_type === "TIME" && !option.is_prompt) {
              return (
                <div key={index} className="mt-8">
                  <ScheduleComponent
                    option={option}
                    index={index}
                    setActiveAction={setActiveAction}
                  />
                </div>
              );
            }
            return null;
          })}
      </div>

      <button
        className="flex items-center justify-center h-15 py-3.5 px-16 bg-primary-green sheen rounded-xl text-white mt-6 w-full text-center"
        disabled={isAPICalling}
        type="button"
        onClick={() => {
          console.log("Button clicked, activeAction:", activeAction); 
          onSaveAction(activeAction);
        }}
      >
        {isAPICalling ? (
          <div className="flex items-center justify-center h-full">
            <DotsLoader />
          </div>
        ) : (
          "Save"
        )}
      </button>
    </Motion>
  );
};

export default ActionsSection;
