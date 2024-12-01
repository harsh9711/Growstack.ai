import React, { memo, useState } from "react";
import { Handle, Position, type NodeProps, useReactFlow } from "@xyflow/react";
import { ToolsNodeProps } from "./types";
import DynamicInput from "../inputsFields";
import { extractParameterValues } from "@/utils/dataResolver";
import { convertToUnderscore } from "@/utils/helper";
import {
  addVariable,
  deleteNodeById,
  removeNodeById,
  updateNode,
  updateNodeById,
  updateNodeParameter,
} from "@/lib/features/workflow/node.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { WorkflowNodeState } from "@/types/workflows";

const ToolsNodes = memo(
  ({
    data,
    isConnectable,
    id,
    positionAbsoluteX,
    positionAbsoluteY,
  }: NodeProps<ToolsNodeProps>) => {
    const { parameters, nodeMasterId } = data;

    const node = useAppSelector(state =>
      state.nodes.nodes.find(node => node.id === id)
    );

    const { setNodes } = useReactFlow();
    const dispatch = useAppDispatch();
    const { nodes, variables } = useAppSelector(state => state.nodes);
    const { workFlowData } = useAppSelector(state => state.workflows);


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
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
    const [variableName, setVariableName] = useState<string | null>(null);
    const [isNextBoxOpen, setIsNextBoxOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [visibleTooltip, setVisibleTooltip] = useState<{
      [key: string]: boolean;
    }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [description, setDescription] = useState(data?.descriptions || "");




    const handleToggleAdvancedOptions = () => {
      setShowAdvancedOptions(!showAdvancedOptions);
    };

    const getInputType = (label: string) => {
      switch (label) {
        case "Short Text":
          return "text";
        case "Long Text":
          return "text_area";
        case "Number":
          return "number";
        case "Boolean":
          return "checkbox";
        case "File Upload":
          return "button_upload";
        case "Checklist":
          return "select_option";
        default:
          return "text";
      }
    };

    const handleUpdateParameter = (id: string) => {
      let updatedData = nodes.find(node => node.id === id);

      if (updatedData) {
        updatedData = {
          ...updatedData,
          data: {
            ...updatedData.data,
            parameters: currentParameter,
          },
        };

        console.log("---updatedData---", updatedData);
        dispatch(updateNode(updatedData));
      }
    };

    // const handleNextClick = async () => {
    //   if (!currentParameter) return;

    //   const requiredParams = currentParameter
    //     ? Object.values(currentParameter).filter(param => param.required)
    //     : [];

    //   const allRequiredParamsFilled = requiredParams.every(
    //     param => param.value
    //   );

    //   if (allRequiredParamsFilled) {
    //     handleUpdateParameter(id);

    //     const updatedValue = extractParameterValues(currentParameter);

    //     console.log("updatedValue-->", updatedValue);

    //     try {
    //       const bodyPayload = {
    //         workflowId: workflows.workFlowData._id,
    //         nodeMasterId,
    //         position: { x: positionAbsoluteX, y: positionAbsoluteY },
    //         dependencies: [],
    //         parameters: updatedValue,
    //       };

    //       await dispatch(
    //         updateNodeById({
    //           id,
    //           data: bodyPayload as unknown as WorkflowNodeState,
    //         })
    //       );

    //       setNextParameter({
    //         "6": {
    //           label: updatedValue.inputLabel,
    //           type: getInputType(data?.label),
    //           placeholder: updatedValue.placeholder,
    //           required: updatedValue.required,
    //           options: [],
    //           description: updatedValue.description,
    //           value:
    //             updatedValue.defaultValue ||
    //             updatedValue.fileType ||
    //             updatedValue.options,
    //           error: "",
    //         },
    //       });

    //       setIsNextBoxOpen(true);
    //     } catch (error: any) {
    //       console.error("error-->", error?.message);
    //     } finally {
    //       setIsLoading(false);
    //     }
    //   } else {
    //     setCurrentParameter(prevState => {
    //       const updatedState = { ...prevState };

    //       requiredParams.forEach(param => {
    //         const key = prevState
    //           ? Object.keys(prevState).find(k => prevState[k] === param)
    //           : undefined;
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

    // const handleInputChange = (
    //   key: string,
    //   type: string,
    //   value: string | boolean
    // ) => {
    //   // console.log("key-->", key, "type-->", type, "value-->", value);

    //   if (typeof value === "boolean") {
    //     setCurrentParameter(prevState => ({
    //       ...prevState,
    //       [key]: {
    //         ...(prevState?.[key] || {}),
    //         value: value,
    //         error: "",
    //       },
    //     }));

    //     return;
    //   }

    //   setCurrentParameter(prevState => {
    //     const updatedState = {
    //       ...prevState,
    //       [key]: {
    //         ...(prevState?.[key] || {}),
    //         value:
    //           type === "text_variable_name"
    //             ? convertToUnderscore(value)
    //             : value,
    //         error: "",
    //       },
    //     };

    //     if (type === "text_input_label") {
    //       const variableNameKey = prevState
    //         ? Object.keys(prevState).find(
    //           k => prevState[k].type === "text_variable_name"
    //         )
    //         : undefined;
    //       if (variableNameKey) {
    //         updatedState[variableNameKey] = {
    //           ...(prevState?.[variableNameKey] || {}),
    //           value: convertToUnderscore(value),
    //           error: "",
    //         };
    //       }
    //     }
    //     if (type === "text_variable_name" || type === "text_input_label") {
    //       setVariableName(convertToUnderscore(value));
    //     }
    //     return updatedState;
    //   });
    // };



    const handleInputChange = (key: any, type: any, value: any) => {
      console.log("key-->", key, "type-->", type, "value-->", value);
      dispatch(updateNodeParameter({ nodeId: id, key, type, value }));
    };

    const handleNextClick = async () => {
      if (!node?.data?.parameters) return;

      const requiredParams = Object.values(node.data.parameters).filter(
        param => param.required
      );
      const allRequiredParamsFilled = requiredParams.every(
        param => param?.value
      );

      if (allRequiredParamsFilled) {
        const updatedValue = extractParameterValues(node.data.parameters);
        console.log("updatedValue-->", updatedValue);



        const nodeIdsWithMatchingVariables = variables
          .map(variable => {
            const nodeVariableName = variable.variableName;

            const matches = Object.values(updatedValue).some(value => {
              if (typeof value === "string") {
                const matchedVariable = value.match(/\$\{([^\}]+)\}/)?.[1];
                console.log(value, "---matchedVariable---", matchedVariable);
                return matchedVariable === nodeVariableName;
              }
              return false;
            });

            return matches && variable.nodeID !== id ? variable.nodeID : null;
          })
          ?.filter(Boolean);

        console.log("Matching Node IDs:", nodeIdsWithMatchingVariables);

        dispatch(
          addVariable({
            nodeID: id,
            variableName: node?.data?.parameters?.variableName?.value || "",
            workflowID: workFlowData._id || "",
            variableValue:
              updatedValue.defaultValue ||
              updatedValue.fileType ||
              updatedValue.options,
            variableType: "tools",
          })
        );

        try {
          const bodyPayload = {
            workflowId: workFlowData._id,
            nodeMasterId: node.data.nodeMasterId,
            position: { x: positionAbsoluteX, y: positionAbsoluteY },
            dependencies: nodeIdsWithMatchingVariables,
            parameters: updatedValue,
          };

          await dispatch(
            updateNodeById({
              id: id,
              data: bodyPayload as unknown as WorkflowNodeState,
            })
          );
        } catch (error: any) {
          console.error("error-->", error?.message);
        }
      } else {
        requiredParams.forEach(param => {
          const key = node?.data?.parameters
            ? Object.keys(node.data.parameters).find(
              k => node.data.parameters?.[k] === param
            )
            : undefined;
          if (key && !param.value) {
            dispatch(
              updateNodeParameter({
                nodeId: id,
                key: key,
                type: "error",
                value: "This field is required",
              })
            );
          }
        });
      }
    };


    const handleChange = (event: {
      target: { value: React.SetStateAction<string> };
    }) => {
      setDescription(event.target.value);
    };

    const handleInput = (event: { target: any }) => {
      const textarea = event.target;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

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
              <textarea
                value={description}
                onChange={handleChange}
                onInput={handleInput}
                className="resize-none text-xs text-center font-medium text-[#14171B] bg-transparent border-transparent focus:border-transparent focus:ring-0 focus:outline-none"
                placeholder="Enter description"
                rows={1}
                cols={25}
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
                src="/assets/node_icon/tools-node.svg"
                alt="background icon"
                className="w-[140px] mx-auto"
              />

              {data?.icon && (
                <img
                  src={data.icon}
                  alt={data.label}
                  className="w-[30px] mx-auto absolute top-[55px] left-0 right-0"
                />
              )}

              <div className="absolute top-1/2 transform -translate-y-1/2 right-[-60px] flex items-center">
                <div className="h-px border-t-2 border-dashed border-[#2DA771] w-[65px] mr-1" />
                <Handle
                  id={`${id}-source`}
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
              <div className="short-text-heading bg-[#FCF4DD] p-4 rounded-[16px] mb-2">
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
                {node?.data?.parameters &&
                  Object.entries(node.data.parameters).filter(
                    ([key, param]: any) =>
                      param.required || showAdvancedOptions
                  ).map(([key, param]) => {
                    return (
                      <DynamicInput
                        key={key}
                        inputKey={key}
                        param={param}
                        handleInputChange={handleInputChange}
                        toggleTooltip={() => { }}
                        visibleTooltip={{}}
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
                </div>

                <div className="submit-button">
                  <button
                    onClick={handleNextClick}
                    className=" bg-transparent border-2 border-[#2DA771] text-[#2DA771] text-sm font-medium p-3 w-full rounded-[10px]"
                  >
                    {isLoading ? (
                      <div className="flex justify-center items-center">
                        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
                      </div>
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default ToolsNodes;
