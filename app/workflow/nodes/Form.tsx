import React, { useState } from "react";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { type MarkdownNodeProps } from "./types";
import Image from "next/image";
import DynamicInput from "../inputsFields";

const Form = ({ data, id }: NodeProps<MarkdownNodeProps>) => {
  const { parameters } = data;

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

  // const handleNextClick = () => {
  //   const requiredParams = currentParameter ? Object.values(currentParameter).filter(param => param.required) : [];

  //   const allRequiredParamsFilled = requiredParams.every(param => param.value);

  //   if (allRequiredParamsFilled) {
  //     setIsNextBoxOpen(true);
  //   } else {
  //     setCurrentParameter(prevState => {
  //       const updatedState = { ...prevState };

  //       requiredParams.forEach(param => {
  //         const key = prevState ? Object.keys(prevState).find(k => prevState[k] === param) : undefined;
  //         if (key && !param.value) {
  //           updatedState[key] = {
  //             ...(prevState?.[key] ?? {}),
  //             error: "This field is required",
  //           };
  //         }
  //       });

  //       return updatedState;
  //     });
  //   }
  // };

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
  const [isShowAdvanceOption, setIsShowAdvanceOption] = useState(false);
  const toggleVisibility = () => {
    setIsShowAdvanceOption(prevState => !prevState);
  };

  const [selected, setSelected] = useState("Option 1");

  const options = [
    {
      label: "Option 1",
      img: "short-single.svg",
      //   icon: <CheckIcon className="w-5 h-5 text-blue-500" />,
    },
    {
      label: "Option 2",
      img: "long-single.svg",
      //   icon: <ChevronDownIcon className="w-5 h-5 text-green-500" />,
    },
    {
      label: "Option 3",
      img: "boolean-single.svg",
      //   icon: <ChevronDownIcon className="w-5 h-5 text-red-500" />,
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: { label: any }) => {
    setSelected(option.label);
    setIsOpen(false);
  };

  return (
    <div>
      <div className="long-text-box" id="large-box">
        <div className="long-text-info-image relative">
          <div className="long-text text-center">
            <h4 className="text-sm font-medium text-[#2DA771]">
              General input
            </h4>
            <span className="text-xs font-medium text-[#14171B]">(Form)</span>
          </div>

          <div className="text-image text-center">
            <img
              src="/assets/node_icon/form-img.svg"
              alt="form node image"
              className="w-[140px] mx-auto"
            />
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

            <div className="short-text-heading mb-2">
              <h3 className="text-sm text-[#14171B] font-medium">Short Text</h3>
            </div>

            <div className="form-box">
              {currentParameter &&
                Object.entries(currentParameter).map(([key, param]: any) => {
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

              {!isShowAdvanceOption && (
                <div className="advance-option-button-box mb-3">
                  <button
                    onClick={toggleVisibility}
                    className="w-full text-center bg-transparent border-0 underline text-[12px] text-[#2DA771]"
                  >
                    Advance options
                  </button>
                </div>
              )}

              {isShowAdvanceOption && (
                <>
                  <div className="input-box">
                    <div className="relative w-64">
                      <button
                        type="button"
                        className="w-full flex justify-between items-center bg-white border border-gray-300 rounded-md py-2 px-4 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <span>{selected}</span>
                        <img
                          src={`/assets/node_icon/${selected.img}`}
                          alt="node icon"
                        />
                      </button>

                      {/* Dropdown Options */}
                      {isOpen && (
                        <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                          {options.map((option, index) => (
                            <li
                              key={index}
                              className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => handleSelect(option)}
                            >
                              <span>{option.label}</span>
                              {/* {option.icon} */}
                              <img
                                src={`/assets/node_icon/${option.img}`}
                                alt="node icon"
                              />
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </>
              )}

              {isShowAdvanceOption && (
                <div className="advance-option-button-box">
                  <button
                    onClick={toggleVisibility}
                    className="w-full text-center bg-transparent border-0 underline text-[12px] text-[#2DA771]"
                  >
                    Hide Advance options
                  </button>
                </div>
              )}

              <div className="topic-box">
                <div className="topic-text w-auto p-3 inline-block rounded-full bg-[#FFE6FF]">
                  <h5 className="text-[12px] font-medium text-[#14171B]">
                    topic
                  </h5>
                </div>
              </div>
            </div>

            {/* {!isNextBoxOpen ? (
  
            ) : (
              <div className="form-box">
                {nextParameter &&
                  Object.entries(nextParameter).map(([key, param]: any) => (
                    <DynamicInput
                      key={key}
                      inputKey={key}
                      param={param}
                      handleInputChange={handleInputChange}
                      toggleTooltip={toggleTooltip}
                      visibleTooltip={visibleTooltip}
                    />
                  ))}

                {variableName && (
                  <div className="text-box mb-5">
                    <h4 className="text-[#14171B] flex items-center gap-2 font-medium text-sm">
                      Variable name:{" "}
                      <span className="bg-[#FFE6FF] text-[#14171B] text-[12px] rounded-[20px] font-medium pt-3 pb-3 pr-4 pl-4">
                        {variableName}
                      </span>
                    </h4>
                  </div>
                )}

                <div className="submit-button">
                  <button
                    onClick={() => {
                      setIsNextBoxOpen(false);
                    }}
                    className=" bg-transparent border-2 border-[#2DA771] text-[#2DA771] text-sm font-medium p-3 w-full rounded-[10px]"
                  >
                    Edit
                  </button>
                </div>
              </div>
            )} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
