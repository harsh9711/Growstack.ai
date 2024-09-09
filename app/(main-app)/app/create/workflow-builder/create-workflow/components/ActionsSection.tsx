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
import { CheckBox } from "docx";
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
  const [suggestionOptions, setSuggestionOptions] = useState<
    SuggestionOption[]
  >([]);
  const [selectedRadioValue, setSelectedRadioValue] = useState<string>("Image");
  const [isVideo, setIsVideo] = useState(false);
  const [mediaUrls, setMediaUrls] = useState<any[]>([]);
  const [selectedNetworks, setSelectedNetworks] = React.useState<string[]>([]);

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
              width='24'
              height='24'
              className='flex-shrink-0 rounded-md object-contain min-h-[24px] min-w-[24px]'
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

  return (
    <Motion
      transition={{ duration: 0.5 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <div className='flex items-center gap-4 pb-8'>
        <div className='w-full flex flex-row items-center gap-2'>
          <img
            src={activeAction.icon}
            height='56'
            width='56'
            className='w-10 h-10 rounded-2xl'
          />
          <div className='flex flex-col gap-2 w-full text-xl border-2 p-2.5 rounded-md'>
            {activeAction.name}
          </div>
        </div>
      </div>
      <div>
        {activeAction.preset_json.body.inputs &&
          activeAction.preset_json.body.inputs.map(
            (option: any, index: number) => {
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
                  <div key={index} className='mt-8 '>
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
              if (
                option.input_type === "SHORT_TEXT_AREA" &&
                !option.is_prompt
              ) {
                return (
                  <div key={index} className='mt-8 '>
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
                  <div key={index} className='mt-8'>
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
                  <div key={index} className='mt-8'>
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
                  <div key={index} className='mt-8'>
                    <ScheduleComponent
                      option={option}
                      index={index}
                      setActiveAction={setActiveAction}
                    />
                  </div>
                );
              }
              return null;
            }
          )}
      </div>
      <button
        className='flex items-center justify-center h-15 py-3.5 px-16 bg-primary-green sheen rounded-xl text-white mt-6 w-full text-center'
        disabled={isAPICalling}
        type='button'
        onClick={() => onSaveAction(activeAction)}
      >
        {isAPICalling ? (
          <div className='flex items-center justify-center h-full'>
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
