import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import { Handle, Position, type NodeProps, useReactFlow } from "@xyflow/react";
import { GeneralInputNodeProps } from "../types";
import DynamicInput from "../../DynamicInputs";
import { extractParameterValues } from "@/utils/dataResolver";
import { convertToUnderscore } from "@/utils/helper";
import Image from "next/image";
import {
  addVariable,
  deleteNodeById,
  removeNodeById,
  updateNode,
  updateNodeById,
} from "@/lib/features/workflow/node.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { SubNodeProps, WorkflowNodeState } from "@/types/workflows";
import DeleteConfirmationModal from "../../deleteconfirmationmodal/DeleteConfirmationModal";
import { useSnackbar } from "../../snackbar/SnackbarContext";
const GmailNode = memo(
  ({
    data,
    isConnectable,
    id,
    positionAbsoluteX,
    positionAbsoluteY,
  }: NodeProps<GeneralInputNodeProps>) => {
    const { parameters, nodeMasterId } = data;

    const { setNodes } = useReactFlow();
    const dispatch = useAppDispatch();
    const { workFlowData } = useAppSelector(state => state.workflows);
    const { nodes, variables, isLoading } = useAppSelector(
      state => state.nodes
    );

    // console.log("---nodes----", JSON.stringify(variables, null, 2));

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

    const [description, setDescription] = useState(data?.descriptions || "");

    const [currentParameter, setCurrentParameter] = useState(initialParameters);
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
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
    const [variableName, setVariableName] = useState<string>("");
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
            value:
              type === "text_variable_name"
                ? convertToUnderscore(value)
                : value,
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
          const variableValue = convertToUnderscore(value);
          setVariableName(variableValue);
        }
        return updatedState;
      });
    };

    const handleNextClick = async () => {
      if (!currentParameter) return;

      const requiredParams = currentParameter
        ? Object.values(currentParameter).filter(param => param.required)
        : [];

      const allRequiredParamsFilled = requiredParams.every(
        param => param.value
      );

      if (allRequiredParamsFilled) {
        // update variable

        // update node with parameters value
        handleUpdateParameter(id);

        const updatedValue = extractParameterValues(currentParameter);

        dispatch(
          addVariable({
            nodeID: id,
            variableName: variableName,
            workflowID: workFlowData._id || "",
            variableValue:
              updatedValue.defaultValue ||
              updatedValue.fileType ||
              updatedValue.options,
            variableType: "input",
          })
        );
        // console.log("updatedValue-->", updatedValue);

        try {
          const bodyPayload = {
            workflowId: workFlowData._id,
            nodeMasterId,
            position: { x: positionAbsoluteX, y: positionAbsoluteY },
            dependencies: [],
            parameters: updatedValue,
          };

          await dispatch(
            updateNodeById({
              id,
              data: bodyPayload as unknown as WorkflowNodeState,
            })
          );

          setNextParameter({
            "6": {
              label: updatedValue.inputLabel,
              type: getInputType(data?.label),
              placeholder: updatedValue.placeholder,
              required: updatedValue.required,
              options: [],
              description: updatedValue.description,
              value:
                updatedValue.defaultValue ||
                updatedValue.fileType ||
                updatedValue.options,
              error: "",
            },
          });

          setIsNextBoxOpen(true);
        } catch (error: any) {
          console.error("error-->", error?.message);
        }
      } else {
        setCurrentParameter(prevState => {
          const updatedState = { ...prevState };

          requiredParams.forEach(param => {
            const key = prevState
              ? Object.keys(prevState).find(k => prevState[k] === param)
              : undefined;
            if (key && !param.value) {
              updatedState[key] = {
                ...(prevState?.[key] ?? {}),
                error: "This field is required",
              };
            }
          });

          return updatedState;
        });
      }
    };

    const handleToggleAdvancedOptions = () => {
      setShowAdvancedOptions(!showAdvancedOptions);
    };

    const handleDeleteNode = () => {
      setNodes(nds => nds.filter(nds => nds.id !== id));
      dispatch(removeNodeById(id));
      dispatch(deleteNodeById(id));
      success("Node delete successfully");
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

    // TRIGGER DATA JS CALL HERE
    const TriggerData = [
      {
        title: "New Email Received",
        info: "Fires when a new email is received in a specified folder (e.g., Inbox).",
      },
    ];

    // ACTION DATA JS CALL HERE
    const ActionData = [
      {
        title: "Search Email",
        info: "Search for specific emails in your mail using keywords, sender, subject, or date filters.",
      },

      {
        title: "Send Email",
        info: "Automatically send an email with customizable subject, body, recipients, and attachments.",
      },

      {
        title: "Create Draft",
        info: "Create a draft email with predefined content and attachments, ready for later sending.",
      },
    ];

    // IS SIGNUP STATE JS CALL HERE
    const [isSignedUp, setIsSignedUp] = useState(false);

    // ON CLICK OPEN & CLOSE ACTION MODAL
    const [isActionModalShow, setIsActionModalShow] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleOpenActionModal = () => {
      setIsActionModalShow(!isActionModalShow);
    };

    const handleClickOutside = useCallback(
      (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsActionModalShow(false);
        }
      },
      [dropdownRef]
    );

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [handleClickOutside]);

    //ONCLICK OPEN DELETE CONFIRMATION MODAL
    const [openDeleteConfirmationModal, setopenDeleteConfirmationModal] =
      React.useState(false);

    const handleCloseDeleteConfirmationModal = () => {
      setopenDeleteConfirmationModal(false);
    };
    const handleOpenDeleteConfimationModal = () => {
      setopenDeleteConfirmationModal(true);
      setIsActionModalShow(false);
    };

    // SNACKBAR SUCCESS MESSAGE
    const { success } = useSnackbar();

    return (
      <div>
        <section className="node-box relative">
          <div className="node-top-box relative">
            <div className="node-name-text-description text-center mb-3">
              <h4 className="text-sm font-medium text-[#2DA771]">Gmail</h4>

              <textarea
                value={description}
                onChange={handleChange}
                onInput={handleInput}
                className="resize-none text-xs text-center font-medium text-[#14171B] bg-transparent border-transparent focus:border-transparent focus:ring-0 focus:outline-none"
                placeholder="Enter description"
                rows={1}
              />
            </div>

            <div className="node-image-action-box text-center relative">
              <div className="node-image">
                <img
                  src="/assets/node_icon/gmail-node-bg.svg"
                  alt="background icon"
                  className="w-[140px] mx-auto"
                />
                <img
                  src="/assets/node_icon/gmail-single.svg"
                  alt="foreground icon"
                  className="w-[40px] mx-auto absolute top-[50px] left-0 right-0"
                />
              </div>

              <div className="node-delete-modal-box absolute left-0 rigt-0 top-[-10px] w-full mx-auto z-10">
                <div className="action-modal-button">
                  <button
                    className="cursor-pointer"
                    onClick={handleOpenActionModal}
                  >
                    <img
                      src="/assets/node_icon/action-icon.svg"
                      alt="action icon"
                    />
                  </button>
                </div>

                <div className="modal">
                  {isActionModalShow && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-[-126px] top-[0px] mt-2 w-48 bg-white rounded-[15px] border-[1px] border-[#E8E8E8] shadow-2xl z-50"
                    >
                      <ul className="py-2">
                        <li className="px-4 py-2 cursor-pointer">
                          <button
                            onClick={handleOpenDeleteConfimationModal}
                            className="delete-button flex items-center gap-2 text-[15px] text-[#212833] font-medium w-full cursor-pointer"
                          >
                            <img
                              src="/assets/node_icon/trash.svg"
                              alt="dots icon"
                            />
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="node-edge absolute top-1/2 transform -translate-y-1/2 right-[-60px] flex items-center">
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
          </div>

          {isDropdownOpen && (
            <div className="node-inner-wrapper bg-white p-4 border-2 border-[#2DA771] rounded-[20px] w-[400px] absolute left-1/2 transform -translate-x-1/2">
              <div className="heading-button-box rounded-[16px] mb-2 p-4 bg-[#FFE6FF] flex justify-between items-center overflow-hidden">
                <div className="short-text-heading">
                  <img
                    src="/assets/node_icon/gmail-single.svg"
                    alt="node icon"
                    className="w-[20px] mb-2"
                  />

                  <h4 className="text-sm font-medium text-[#14171B]">Gmail</h4>
                </div>

                {isSignedUp ? (
                  <div className="user-connected-info relative">
                    <span className="connected-text relative bg-[#2DA771] p-2 rounded-l-[20px]  w-[100px] inline-block translate-x-[45%] text-[12px] font-medium text-white">
                      Connected
                    </span>

                    <div className="user-mail relative mt-1">
                      <div className="online-status-div absolute w-[6px] h-[6px] bg-[#2DA771] rounded-full left-[-14px] top-[5px]"></div>
                      <p className="text-[11px] text-[#5A5963]">
                        jhonedoe@gmail.com
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="signin-button-box">
                    <button
                      onClick={() => setIsSignedUp(true)}
                      className="p-4 text-white text-[16px] bg-[#2DA771] rounded-[20px] w-[100px]"
                    >
                      Sign In
                    </button>
                  </div>
                )}
              </div>

              <div className="mb-2 search-box flex items-center p-2 rounded-lg border border-[#EBEBEB]  bg-[#F7F7F7]">
                <Image
                  src="/images/workflow/search-normal.svg"
                  alt="Search"
                  width={16}
                  height={16}
                  className="cursor-pointer mr-2.5 text-sm font-normal text-[#5A5963]"
                />
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-[#F7F7F7] w-full focus:outline-none"
                />
              </div>

              <div
                className={`node-content-wrapper relative ${
                  !isSignedUp
                    ? "before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-white before:opacity-[45%]"
                    : ""
                }`}
              >
                <div className="trigger-box">
                  <h3 className="text-[16px] font-medium text-[#14171B] mb-4">
                    Triggers
                  </h3>

                  <div className="trigger-data-box">
                    {TriggerData.map((value, index) => {
                      return (
                        <div
                          className="trigger-info flex items-center gap-4 mb-5"
                          key={index}
                        >
                          <div className="email-icon w-[50px] h-[50px] bg-[#FCE1E4] flex items-center justify-center rounded-full">
                            <img
                              src="/assets/node_icon/gmail-single.svg"
                              alt="email icon"
                              className="w-[25px]"
                            />
                          </div>

                          <div className="content-box w-[80%]">
                            <h3 className="text-[#14171B] text-[14px] ">
                              {value.title}
                            </h3>
                            <p className="text-[12px] text-[#5A5963]">
                              {value.info}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <hr className="w-full mt-5 mb-5 border-[#EBEBEB] border-t-2" />

                <div className="action-box">
                  <h3 className="text-[16px] font-medium text-[#14171B] mb-4">
                    Actions
                  </h3>

                  <div className="action-data-box">
                    {ActionData.map((value, index) => {
                      return (
                        <div
                          className="action-info flex items-center gap-4 mb-5"
                          key={index}
                        >
                          <div className="email-icon w-[50px] h-[50px] bg-[#FCE1E4] flex items-center justify-center rounded-full">
                            <img
                              src="/assets/node_icon/gmail-single.svg"
                              alt="email icon"
                              className="w-[25px]"
                            />
                          </div>

                          <div className="content-box w-[80%]">
                            <h3 className="text-[#14171B] text-[14px] ">
                              {value.title}
                            </h3>
                            <p className="text-[12px] text-[#5A5963]">
                              {value.info}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        <DeleteConfirmationModal
          openDeleteConfirmationModal={openDeleteConfirmationModal}
          onCloseDeleteConfirmationModal={() =>
            handleCloseDeleteConfirmationModal()
          }
          onDeleteNode={handleDeleteNode}
        />
      </div>
    );
  }
);

export default GmailNode;
