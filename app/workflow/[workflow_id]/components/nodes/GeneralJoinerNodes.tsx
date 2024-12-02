import React, { memo, useState } from "react";
import { Handle, Position, useReactFlow, type NodeProps } from "@xyflow/react";
import { GeneralInputNodeProps } from "./types";
// import DynamicInput from "../inputsFields";
import DynamicInput from "../DynamicInputs";
import { extractParameterValues } from "@/utils/dataResolver";
import { convertToUnderscore } from "@/utils/helper";
import { useAppDispatch } from "@/lib/hooks";
import { deleteNodeById, removeNodeById } from "@/lib/features/workflow/node.slice";

const GeneralJoinerNodes = memo(
  ({ data, isConnectable, id }: NodeProps<GeneralInputNodeProps>) => {
    const { parameters, nodeMasterId } = data;

    const { setNodes } = useReactFlow();
    const dispatch = useAppDispatch();


    const initialParameters =
      parameters &&
      Object.entries(parameters).reduce(
        (acc: { [key: string]: any }, [key, param]: [string, any]) => {
          acc[key] = {
            ...param,
            value: "",
            error: "",
          };
          return acc;
        },
        {}
      );

    const [currentParameter, setCurrentParameter] = useState(initialParameters);
    const [nextParameter, setNextParameter] = useState<{ [key: string]: any }>({
      "6": {
        label: "Topic",
        type: "text_topic",
        placeholder: "Enter Topic",
        required: false,
        options: [],
        description: `Add Topic`,
        value: "",
        error: "",
      },
    });
    const [variableName, setVariableName] = useState<string | null>(null);
    const [isNextBoxOpen, setIsNextBoxOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [visibleTooltip, setVisibleTooltip] = useState<{
      [key: string]: boolean;
    }>({});

    const toggleTooltip = (index: string, isVisible: boolean) => {
      setVisibleTooltip(prevState => ({
        ...prevState,
        [index]: isVisible,
      }));
    };

    const handleDropdownClick = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    const handleInputChange = (
      key: string,
      type: string,
      value: string | boolean
    ) => {
      // console.log("key-->", key, "type-->", type, "value-->", value);

      if (typeof value === "boolean") {
        setCurrentParameter(prevState => ({
          ...prevState,
          [key]: {
            ...(prevState?.[key] || {}),
            value: value,
            error: "",
          },
        }));

        return;
      }

      setCurrentParameter(prevState => {
        const updatedState = {
          ...prevState,
          [key]: {
            ...(prevState?.[key] || {}),
            value: value,
            error: "",
          },
        };

        if (type === "text_input_label") {
          const variableNameKey = prevState
            ? Object.keys(prevState).find(
              k => prevState[k].type === "text_variable_name"
            )
            : undefined;
          if (variableNameKey) {
            updatedState[variableNameKey] = {
              ...(prevState?.[variableNameKey] || {}),
              value: convertToUnderscore(value),
              error: "",
            };
          }
        }
        if (type === "text_variable_name" || type === "text_input_label") {
          setVariableName(convertToUnderscore(value));
        }
        return updatedState;
      });
    };

    // Move this function on the Global level.
    const handleDeleteNode = () => {
      setNodes(nds => nds.filter(nds => nds.id !== id));
      dispatch(removeNodeById(id));
      dispatch(deleteNodeById(id));
    };

    return (
      <div>
        <div className="short-text-box relative" id="small-box">
          <div className="short-text-info-image relative">
            <div className="short-text text-center">
              <h4 className="text-sm font-medium text-[#2DA771]">
                {data?.label || ""}
              </h4>
              <input
                type="text"
                // value={data?.descriptions || ""}
                // onChange={handleDescriptionChange}
                className="text-xs font-medium text-[#14171B] bg-transparent border-transparent focus:border-transparent focus:ring-0"
                placeholder="Enter description"
              />
            </div>
            <div className="text-image text-center relative">
              <div className="absolute pointer-events-auto border border-[#2DA771] h-[20px] w-[20px] rounded-full flex justify-center items-center bg-white">
                <button
                  onClick={handleDeleteNode}
                  className="text-[#000] p-0 m-0 leading-none"
                >
                  ×
                </button>
              </div>
              <img
                src="/assets/node_icon/node-bg.svg"
                alt="background icon"
                className="w-[140px] mx-auto"
              />
              <img
                src="/assets/node_icon/short-single.svg"
                alt="foreground icon"
                className="w-[30px] mx-auto absolute top-[55px] left-0 right-0"
              />

              <div className="absolute top-1/2 transform -translate-y-1/2 right-[-60px] flex items-center">
                <div className="h-px border-t-2 border-dashed border-[#2DA771] w-[65px] mr-1" />
                <Handle
                  type="source"
                  position={Position.Right}
                  className="w-5 h-5 bg-white border-2 border-[#2DA771] rounded-full flex items-center justify-center text-[#2DA771] text-lg font-bold transform translate-x-1/2 -translate-y-1/2 p-0 m-0 leading-none"
                  onConnect={params => console.log("handle onConnect", params)}
                  isConnectable={isConnectable}
                >
                  +
                </Handle>

                <Handle
                  type="source"
                  position={Position.Left}
                  className="w-[10px] h-[10px] bg-[#2DA771]"
                  isConnectable={false}
                />
              </div>
            </div>

            <div
              className="toggle-button-box absolute right-0 left-0 mx-auto bottom-[-10px] z-10 cursor-pointer"
              onClick={handleDropdownClick}
            >
              <img
                src="/assets/node_icon/toggle-switch.svg"
                alt="toggle switch"
                className="w-[25px] mx-auto"
                style={{ transform: isDropdownOpen ? "rotate(180deg)" : "" }}
              />
            </div>
          </div>

          {isDropdownOpen && (
            <div className="short-text-form bg-white p-4 border-2 border-[#2DA771] rounded-[20px] w-[400px] absolute left-1/2 transform -translate-x-1/2">
              <div className="short-text-heading bg-[#FFE6FF] p-4 rounded-[16px] mb-2">
                {data?.icon && (
                  <img
                    src={data.icon}
                    alt={data.label}
                    className="w-[20px] mb-2"
                  />
                )}

                <h4 className="text-sm font-medium text-[#14171B]">
                  {data?.label || ""}
                </h4>
              </div>
              <div className="form-box">
                {currentParameter &&
                  Object.entries(currentParameter).map(
                    ([key, param]: any) => {
                      return (
                        <DynamicInput
                          key={key}
                          inputKey={key}
                          param={param}
                          handleInputChange={handleInputChange}
                        />
                      );
                    }
                  )}

                {variableName && (
                  <div className="text-box mb-5 mt-5">
                    <span className="bg-[#FFE6FF] text-[#14171B] text-[12px] rounded-[20px] font-medium pt-3 pb-3 pr-4 pl-4">
                      {variableName}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default GeneralJoinerNodes;
