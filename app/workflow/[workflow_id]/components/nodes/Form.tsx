import React, { useState } from "react";
import { Handle, Position, useReactFlow, type NodeProps } from "@xyflow/react";
import { FormNodeProps, type MarkdownNodeProps } from "./types";
import Image from "next/image";
import DynamicInput, { AddFieldDropdown } from "../inputsFields";
import { SubNodeProps } from "@/types/workflows";
import { removeNodeById } from "@/lib/features/workflow/node.slice";
import { useAppDispatch } from "@/lib/hooks";

const Form = ({ data, id, isConnectable }: NodeProps<FormNodeProps>) => {
  const { parameters, subNodes } = data;

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

  const [showAdvancedOptions, setShowAdvancedOptions] = useState<{
    [key: string]: boolean;
  }>({});
  const [currentSubNodes, setCurrentSubNodes] = useState(
    (subNodes ?? []).filter(node => node.isDefault)
  );

  const [currentParameter, setCurrentParameter] = useState(initialParameters);
  const [nextParameter, setNextParameter] = useState<{ [key: string]: any }>({
    "6": {
      label: "Select Intrest",
      type: "checkbox_field",
      required: true,
      options: ["Sports", "Music", "Reading"],
      description: `select intrest.`,
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

  const convertToUnderscore = (value: string): string => {
    return value.toLowerCase().replace(/\s+/g, "_");
  };

  const handleInputChange = (
    key: string,
    type: string,
    value: string | boolean
  ) => {
    if (typeof value === "boolean") {
      setCurrentParameter(prevState => ({
        ...prevState,
        [key]: {
          ...(prevState?.[key] || {}),
          value: value,
          error: "",
        },
      }));

      setNextParameter(prevState => ({
        ...prevState,
        "6": {
          ...prevState["6"],
          required: value,
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

  //SHOW ADVANCE INPUT FIELDS STATE CALL HERE

  const handleToggleAdvancedOptions = (nodeId: string) => {
    setShowAdvancedOptions(prevState => ({
      ...prevState,
      [nodeId]: !prevState[nodeId],
    }));
  };

  const handleAddSubNode = (node: SubNodeProps) => {
    setCurrentSubNodes([...currentSubNodes, node]);
  };

  const handleDeleteNode = () => {
    setNodes(nds => nds.filter(nds => nds.id !== id));
    dispatch(removeNodeById(id));
  };

  const imageMapping = {
    "Short Text": "short-single.svg",
    "Long Text": "long-single.svg",
    Boolean: "boolean-single.svg",
    Number: "number-single.svg",
    "File Upload": "uploadfile-single.svg",
    CheckList: "checklist-single.svg",
  };

  const options = (subNodes ?? [])
    .filter(node => !node.isDefault)
    .map(node => ({
      value: node.nodeMasterId,
      label: node.name,
      imageUrl:
        imageMapping[node.name as keyof typeof imageMapping] ||
        "add-option-icon.svg",
    }));

 

  return (
    <div>
      <div className="long-text-box" id="large-box">
        <div className="long-text-info-image relative">
          <div className="long-text text-center">
            <h4 className="text-sm font-medium text-[#2DA771]">
              General input
            </h4>
            {/* <span className="text-xs font-medium text-[#14171B]">(Form)</span> */}
            <input
              type="text"
              value={data?.descriptions || ""}
              // onChange={handleDescriptionChange}
              className="form-control shadow-none bg-transparent border-0 text-[#14171B] text-sm font-medium text-center focus:outline-none"
              placeholder="Enter description"
            />
          </div>

          <div className="text-image text-center">
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
              alt="form node image"
              className="w-[140px] mx-auto"
            />

            <img
              src="/assets/node_icon/form-single.svg"
              alt="foreground icon"
              className="w-[40px] mx-auto absolute top-[50%] left-0 right-0"
            />

            <div className="absolute top-[60%] transform -translate-y-1/2 right-[-42px] flex items-center">
              <div className="h-px border-t-2 border-dashed border-[#2DA771] w-14 mr-1" />
              <Handle
                type="source"
                position={Position.Right}
                className="w-6 h-6 bg-white border-2 border-[#2DA771] rounded-full flex items-center justify-center text-[#2DA771] text-lg font-bold transform translate-x-1/2 -translate-y-1/2 p-0 m-0 leading-none"
                onConnect={params => console.log("handle onConnect", params)}
                isConnectable={isConnectable}
              >
                <img
                  src="/assets/node_icon/plus-icon.svg"
                  alt="plus icon"
                  className="w-[17px]"
                />
              </Handle>

              <Handle
                type="source"
                position={Position.Left}
                className="w-[10px] h-[10px] bg-[#2DA771] border-0"
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
              alt="toggle switch icon"
              className="w-[25px] mx-auto"
              style={{ transform: isDropdownOpen ? "rotate(180deg)" : "" }}
            />
          </div>
        </div>

        {isDropdownOpen && (
          <div className="long-text-form bg-white p-4 border-2 border-[#2DA771] rounded-[20px] w-[400px] absolute left-1/2 transform -translate-x-1/2">
            <div className="long-text-heading bg-[#FFE6FF] p-4 rounded-[16px] mb-2">
              <img
                src="/assets/node_icon/form-single.svg"
                alt="form icon"
                className="mb-2"
              />

              <h5 className="text-sm text-[#14171B] font-medium">Form</h5>
            </div>

            {/* <div className="short-text-heading mb-2">
              <h3 className="text-sm text-[#14171B] font-medium">Short Text</h3>
            </div> */}

            <div className="form-box max-h-[500px] overflow-y-scroll">
              {/* {currentParameter &&
                Object.entries(currentParameter)
                  .filter(
                    ([key, param]: any) => param.required || showAdvancedOptions
                  )
                  .map(([key, param]: any) => {
                    return (
                      <DynamicInput
                        key={key}
                        inputKey={key}
                        param={param}
                        handleInputChange={handleInputChange}
                        toggleTooltip={toggleTooltip}
                        visibleTooltip={visibleTooltip}
                      />
                    );
                  })}

              <div className="advance-option-button-box mb-3">
                <button
                  onClick={handleToggleAdvancedOptions}
                  className="w-full text-center bg-transparent border-0 underline text-[12px] text-[#2DA771]"
                >
                  {showAdvancedOptions
                    ? "Hide Advanced Options"
                    : "Show Advanced Options"}
                </button>
              </div> */}

              {currentSubNodes.map((subNode, index) => (
                <div key={index}>
                  <div className="short-text-heading mb-2">
                    <h3 className="text-sm text-[#14171B] font-medium">
                      {subNode.name}
                    </h3>
                  </div>
                  <div className="form-box">
                    {subNode.parameters &&
                      Object.entries(subNode.parameters)
                        .filter(
                          ([key, param]: any) =>
                            param.required ||
                            showAdvancedOptions[subNode.nodeMasterId]
                        )
                        .map(([key, param]: any) => {
                          return (
                            <DynamicInput
                              key={key}
                              inputKey={key}
                              param={param}
                              handleInputChange={() => {}}
                              toggleTooltip={() => {}}
                              visibleTooltip={{}}
                            />
                          );
                        })}
                  </div>
                  <div className="advance-option-button-box mb-3">
                    <button
                      onClick={() =>
                        handleToggleAdvancedOptions(subNode.nodeMasterId)
                      }
                      className="w-full text-center bg-transparent border-0 underline text-[12px] text-[#2DA771]"
                    >
                      {showAdvancedOptions[subNode.nodeMasterId]
                        ? "Hide Advanced Options"
                        : "Show Advanced Options"}
                    </button>
                  </div>
                </div>
              ))}

              {/* <div className="non-default-subnodes-dropdown"> */}
              {/* <select
                  onChange={e => {
                    const selectedNode = subNodes?.find(
                      node => node.nodeMasterId === e.target.value
                    );
                    if (selectedNode) {
                      handleAddSubNode(selectedNode);
                    }
                  }}
                >
                  <option value="">Add Subnode</option>
                  {subNodes &&
                    subNodes
                      .filter(node => !node.isDefault)
                      .map((node, index) => (
                        <option key={index} value={node.nodeMasterId}>
                          {node.name}
                        </option>
                      ))}
                </select> */}

              <AddFieldDropdown
                options={options}
                onSelect={option => {
                  const selectedNode = subNodes?.find(
                    node => node.nodeMasterId === option.value
                  );
                  if (selectedNode) {
                    handleAddSubNode(selectedNode);
                  }
                }}
                inputKey="add-field-dropdown"
              />
              {/* </div> */}

              {/* <div className="topic-box">
                <div className="topic-text w-auto p-3 inline-block rounded-full bg-[#FFE6FF]">
                  <h5 className="text-[12px] font-medium text-[#14171B]">
                    topic
                  </h5>
                </div>
              </div> */}


            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
