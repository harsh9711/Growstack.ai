import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import { Handle, Position, type NodeProps, useReactFlow } from "@xyflow/react";
import { GeneralInputNodeProps, GmailNodeProps } from "../types";
import DynamicInput from "../../DynamicInputs";
import { extractParameterValues } from "@/utils/dataResolver";
import { getVariableName, isSpecialType } from "@/utils/helper";
import Image from "next/image";
import {
  deleteNodeById,
  removeNodeById,
  removeNodeDependency,
  updateNodeById,
  updateNodeDependency,
  updateNodeParameter,
} from "@/lib/features/workflow/node.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  IntegrationResultProps,
  VariableNameProps,
  WorkflowNodeState,
} from "@/types/workflows";
import DeleteConfirmationModal from "../../modals/deletemodal/DeleteModal";
import { useSnackbar } from "../../snackbar/SnackbarContext";
import { authenticateUser } from "@/utils/paraGonAuth";

// const TriggerData = [
//   {
//     title: "New Email Received",
//     info: "Fires when a new email is received in a specified folder (e.g., Inbox).",
//   },
// ];

const ActionData = [
  // {
  //   title: "Search Email",
  //   info: "Search for specific emails in your mail using keywords, sender, subject, or date filters.",
  // },

  {
    title: "Send Email",
    info: "Automatically send an email with customizable subject, body, recipients, and attachments.",
    nodeType: "send_email",
  },

  // {
  //   title: "Create Draft",
  //   info: "Create a draft email with predefined content and attachments, ready for later sending.",
  // },
];

const GmailNode = memo(
  ({
    data,
    isConnectable,
    id,
    positionAbsoluteX,
    positionAbsoluteY,
    parentId,
  }: NodeProps<GmailNodeProps>) => {
    // const { parameters, nodeMasterId } = data;

    const { success } = useSnackbar();
    const { setNodes } = useReactFlow();
    const dispatch = useAppDispatch();
    const { workFlowData } = useAppSelector(state => state.workflows);
    const { nodes, variables, isLoading } = useAppSelector(
      state => state.nodes
    );

    const node = useAppSelector(state =>
      state.nodes.nodes.find(node => node.id === id)
    );

    const [isSignedUp, setIsSignedUp] = useState(false);
    const [isEdit, setIsEdit] = useState(true);

    const [isActionModalShow, setIsActionModalShow] = useState(false);

    const [description, setDescription] = useState(data?.descriptions || "");

    const [connectionLoading, setConnectionLoading] = useState(false);
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeAction, setActiveAction] = useState<string>("");
    const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
      useState(false);
    const [variableNames, setVariableNames] = useState<VariableNameProps[]>([]);
    const [focusedInputKey, setFocusedInputKey] = useState<string | null>(null);

    const [connectedEmail, setConnectedEmail] =
      useState<IntegrationResultProps>({} as IntegrationResultProps);

    const [dependencies, setDependencies] = useState<
      { key: string; nodeId: string }[]
    >([]);

    // ON OUTSIDE CLICK CLOSE ACTION MODAL
    const handleOutsideClick = (e: MouseEvent) => {
      const modal = document.getElementById("node-action-modal");
      if (modal && !modal.contains(e.target as Node)) {
        setIsActionModalShow(false);
      }
    };
    useEffect(() => {
      if (parentId) {
        setDependencies(prevDependencies => {
          const newDependency = { key: "parent", nodeId: parentId };
          const exists = prevDependencies.some(dep => dep.nodeId === parentId);
          if (exists) {
            return prevDependencies;
          }
          return [...prevDependencies, newDependency];
        });
      }

      return () => { };
    }, [parentId]);



    useEffect(() => {
      if (isActionModalShow) {
        document.addEventListener("click", handleOutsideClick);
      } else {
        document.removeEventListener("click", handleOutsideClick);
      }

      return () => document.removeEventListener("click", handleOutsideClick);
    }, [isActionModalShow]);

    const handleDropdownClick = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    const handleInputChange = useCallback(
      (key: any, type: any, value: any, dependency?: string) => {
        console.log(
          "key-->",
          key,
          "type-->",
          type,
          "value-->",
          value,
          "dependencies--->",
          dependency
        );

        dispatch(updateNodeParameter({ nodeId: id, key, type, value }));

        if (!isSpecialType(type)) return;

        if (value && value.includes("$")) {
          const index = nodes.findIndex(nds => nds.id === id);
          const variableName = getVariableName(nodes, index);
          console.log("variableName-->", variableName);
          if (dependency) {
            // setDependencies(prevDependencies => {
            //   const newDependency = { key, nodeId: dependency };
            //   const uniqueDependencies = new Set([
            //     ...prevDependencies,
            //     newDependency,
            //   ]);
            //   return Array.from(uniqueDependencies);
            // });
            dispatch(updateNodeDependency({ nodeId: id, data: { key, nodeId: dependency } }));
          }
          const regex = /\$(?!\s*$).+/;
          if (regex.test(value)) {
            setVariableNames([]);
          } else {
            setVariableNames(
              variableName.filter(
                (name): name is VariableNameProps => name !== null
              )
            );
          }
        } else {
          // setDependencies(pre => pre.filter(dep => dep.key !== key));
          dispatch(removeNodeDependency({ nodeId: id, key }));
          setVariableNames([]);
        }
      },
      [dispatch, id, nodes, dependencies, variableNames]
    );

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

        console.log("Matching Node IDs:", dependencies);

        // dispatch(
        //   addVariable({
        //     nodeID: id,
        //     variableName: node?.data?.parameters?.variableName?.value || "",
        //     workflowID: workFlowData._id || "",
        //     variableValue:
        //       updatedValue.defaultValue ||
        //       updatedValue.fileType ||
        //       updatedValue.options,
        //     variableType: "tools",
        //   })
        // );

        try {
          const bodyPayload = {
            workflowId: workFlowData._id,
            nodeMasterId: node.data.nodeMasterId,
            position: { x: positionAbsoluteX, y: positionAbsoluteY },
            // dependencies: dependencies.map(dps => dps.nodeId),
            dependencies: node.data?.dependencies ? node.data.dependencies?.map(dps => dps.nodeId) : [],
            parameters: updatedValue,
          };

          await dispatch(
            updateNodeById({
              id: id,
              data: bodyPayload as unknown as WorkflowNodeState,
            })
          );
          success("Node updated successfully");
          setIsEdit(false);
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

    const handleToggleAdvancedOptions = () => {
      setShowAdvancedOptions(!showAdvancedOptions);
    };

    const handleDeleteNode = () => {
      setNodes(nds => nds.filter(nds => nds.id !== id));
      dispatch(removeNodeById(id));
      dispatch(deleteNodeById(id));
      // success("The node has been successfully deleted");
      success(`The ${data?.label} node has been successfully deleted`);
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

    const handleOpenActionModal = () => {
      setIsActionModalShow(!isActionModalShow);
    };

    const handleCloseDeleteConfirmationModal = () => {
      setOpenDeleteConfirmationModal(false);
    };

    const handleOpenDeleteConfirmationModal = () => {
      setOpenDeleteConfirmationModal(true);
      setIsActionModalShow(false);
    };

    const handleGmailSignIn = async () => {
      try {
        console.log("gmail sign in");

        if (connectedEmail.enabled) return;

        setConnectionLoading(true);

        const timeoutId = setTimeout(() => {
          setConnectionLoading(false);
          console.log("Authentication timeout, stopping loading state");
        }, 8000);

        const result = await authenticateUser("gmail");
        clearTimeout(timeoutId);

        if (result && result.credentialStatus === "VALID") {
          setConnectedEmail(result);
          setIsSignedUp(true);
        }
      } catch (error) {
        console.log("---error---", error);
      } finally {
        setConnectionLoading(false);
      }
    };

    const handleActiveAction = (action: string) => {
      setActiveAction(action);
    };

    const handleEditClick = () => {
      setIsEdit(!isEdit);
    };

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
                      id="node-action-modal"
                      className="absolute right-[-126px] top-[0px] mt-2 w-48 bg-white rounded-[15px] border-[1px] border-[#E8E8E8] shadow-2xl z-50"
                    >
                      <ul className="py-2">
                        <li className="px-4 py-2 cursor-pointer">
                          <button
                            onClick={handleOpenDeleteConfirmationModal}
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
                    <span className="connected-text absolute top-[-17px] right-[-20px] bg-[#2DA771] p-2 rounded-l-[20px]  w-[100px] inline-block  text-[12px] font-medium text-white">
                      Connected
                    </span>

                    <div className="user-mail relative mt-1 translate-y-[20px]">
                      <div className="online-status-div absolute w-[6px] h-[6px] bg-[#2DA771] rounded-full left-[-14px] top-[5px]"></div>
                      <p className="text-[11px] text-[#5A5963]">
                        {connectedEmail?.providerId || "NO EMAIL"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="signin-button-box">
                    <button
                      onClick={handleGmailSignIn}
                      className="p-4 text-white text-[16px] bg-[#2DA771] rounded-[20px] w-[100px]"
                    >
                      {connectionLoading ? (
                        <div className="flex justify-center items-center">
                          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
                        </div>
                      ) : (
                        "Sign In"
                      )}
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
                className={`node-content-wrapper relative ${!isSignedUp
                  ? "before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-white before:opacity-[45%]"
                  : ""
                  }`}
              >
                {/* <div className="trigger-box">
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
                </div> */}

                <div className="action-box">
                  {!activeAction ? (
                    <>
                      <h3 className="text-[16px] font-medium text-[#14171B] mb-4">
                        Actions
                      </h3>
                      <div className="action-data-box">
                        {ActionData.map((value, index) => {
                          return (
                            <div
                              className="action-info flex items-center gap-4 mb-5 cursor-pointer"
                              key={index}
                              onClick={() => handleActiveAction(value.nodeType)}
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
                    </>
                  ) : (
                    <>
                      {node?.data?.parameters &&
                        Object.entries(node.data.parameters)
                          .filter(
                            ([key, param]: any) =>
                              param.required || showAdvancedOptions
                          )
                          .map(([key, param]) => {
                            return (
                              <DynamicInput
                                key={key}
                                inputKey={key}
                                param={param}
                                handleInputChange={
                                  isEdit ? handleInputChange : () => { }
                                }
                                variableNames={variableNames}
                                focusedInputKey={focusedInputKey}
                                setFocusedInputKey={setFocusedInputKey}
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

                      {isEdit ? (
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
                      ) : (
                        <div className="submit-button">
                          <button
                            onClick={handleEditClick}
                            className=" bg-transparent border-2 border-[#2DA771] text-[#2DA771] text-sm font-medium p-3 w-full rounded-[10px]"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </>
                  )}
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
