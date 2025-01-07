import React, { memo, useState, useEffect, useCallback } from "react";
import { Handle, Position, type NodeProps, useReactFlow } from "@xyflow/react";
import { GmailNodeProps } from "../types";
import DynamicInput from "../../DynamicInputs";
import { extractParameterValues } from "@/utils/dataResolver";
import { getVariableName, isSpecialType } from "@/utils/helper";
import {
  deleteNodeById,
  removeNodeById,
  updateNodeById,
  updateNodeDescription,
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
import Accordion from "../../../autoComplete";

const AutoBoundNode = memo(
  ({
    data,
    isConnectable,
    id,
    positionAbsoluteX,
    positionAbsoluteY,
  }: NodeProps<GmailNodeProps>) => {
    const { success } = useSnackbar();
    const { setNodes, setEdges } = useReactFlow();
    const dispatch = useAppDispatch();
    const { workFlowData } = useAppSelector(state => state.workflows);
    const { nodes, isLoading } = useAppSelector(state => state.nodes);

    const node = useAppSelector(state =>
      state.nodes.nodes.find(node => node.id === id)
    );

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
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [connectedEmail, setConnectedEmail] =
      useState<IntegrationResultProps>({} as IntegrationResultProps);

    const [dependencies, setDependencies] = useState<
      { key: string; nodeId: string }[]
    >([]);
    const [previousValue, setPreviousValue] = useState<any>("");

    // ON OUTSIDE CLICK CLOSE ACTION MODAL
    const handleOutsideClick = (e: MouseEvent) => {
      const modal = document.getElementById("node-action-modal");
      if (modal && !modal.contains(e.target as Node)) {
        setIsActionModalShow(false);
      }
    };
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
      (key: any, type: any, value: any, dependency: any) => {
        setPreviousValue(value)
        dispatch(updateNodeParameter({ nodeId: id, key, type, value }));

        if (!isSpecialType(type)) return;

        // const singleDollarRegex = /^\$$/;
        // const validSequenceRegex = /.*\$$/;
        // const invalidPatternRegex = /\$(.*?)\$.*\S/;

        // if (singleDollarRegex.test(value)) {
        //   const index = nodes.findIndex(nds => nds.id === id);
        //   const variableName = getVariableName(nodes, index);
        //   setVariableNames(
        //     variableName.filter(
        //       (name): name is VariableNameProps => name !== null
        //     )
        //   );
        // } else if (
        //   validSequenceRegex.test(value) &&
        //   !invalidPatternRegex.test(value)
        // ) {
        //   const index = nodes.findIndex(nds => nds.id === id);
        //   const variableName = getVariableName(nodes, index);

        //   setVariableNames(
        //     variableName.filter(
        //       (name): name is VariableNameProps => name !== null
        //     )
        //   );
        // } else {
        //   setVariableNames([]);
        // }
        if (value.includes('$')) {
          // Get the last word being typed (after the last space)
          const lastWord = value.split(' ').pop() || '';
          
          // Show variables only if the last word starts with $ and doesn't contain a closing }
          if (lastWord.startsWith('$') && !lastWord.includes('}')) {
            const index = nodes.findIndex(nds => nds.id === id);
            const variableName = getVariableName(nodes, index);
            setVariableNames(
              variableName.filter(
                (name): name is VariableNameProps => name !== null
              )
            );
          } else {
            setVariableNames([]);
          }
        } else {
          setVariableNames([]);
        }
      },
      [dispatch, id, nodes, variableNames, isEdit]
    );

    const handleNextClick = async () => {
      const contactEmail = node?.data?.parameters?.contactEmail?.value;
      const contactLinkedInURL = node?.data?.parameters?.contactLinkedInURL?.value;
      const senderEmail = node?.data?.parameters?.senderEmail?.value;
      const senderLinkedinUrl = node?.data?.parameters?.senderLinkedInURL?.value;


      if (!contactEmail && !contactLinkedInURL ) {
        console.log("error: Either contactEmail or contactLinkedInURL is required");
        setErrorMessage("Either contactEmail or contactLinkedInURL is required");
        return;
      }else {
        setErrorMessage(null); 
      }

      if (!senderEmail && !senderLinkedinUrl) {
        console.log("error: Either senderEmail or senderLinkedinUrl is required")
        setErrorMessage("error: Either senderEmail or senderLinkedinUrl is required");
        return;
      }else {
        setErrorMessage(null); 
      }

      if (!node?.data?.parameters) return;
      const requiredParams = Object.values(node.data.parameters).filter(
        param => param.required
      );
      const allRequiredParamsFilled = requiredParams.every(
        param => param?.value
      );

      if (allRequiredParamsFilled) {
        const updatedValue = extractParameterValues(node.data.parameters);
        try {
          const bodyPayload = {
            workflowId: workFlowData._id,
            nodeMasterId: node.data.nodeMasterId,
            position: { x: positionAbsoluteX, y: positionAbsoluteY },
            dependencies: node.data?.dependencies || [],
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
      setEdges((edges: any[]) => {
        const updatedEdges = edges.filter(
          (edge: any) => edge?.source !== id && edge?.target !== id
        );
        return updatedEdges;
      });
      dispatch(removeNodeById(id));
      dispatch(deleteNodeById(id));
      success(`The ${data?.label} node has been successfully deleted`);
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

    const handleEditClick = () => {
      setIsEdit(!isEdit);
    };

    return (
      <div>
        <section className="node-box relative">
          <div className="node-top-box relative">
            <div className="node-name-text-description text-center mb-3">
              <h4 className="text-sm font-medium text-[#2DA771]">
                {node?.data?.label ?? "Autobound"}
              </h4>

              <textarea
                value={node?.data?.description || ""}
                onInput={handleInput}
                className="resize-none text-xs text-center font-medium text-[#14171B] bg-transparent border-transparent focus:border-transparent focus:ring-0 focus:outline-none"
                placeholder="Enter description"
                rows={1}
                onChange={e => {
                  dispatch(
                    updateNodeDescription({
                      nodeId: id,
                      value: e.target.value,
                    })
                  );
                }}
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
                  src="/svgs/mail.svg"
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

              <div className="node-edge absolute top-1/2 transform -translate-y-1/2 right-[-68px] flex items-center">
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
              <Handle
                id={`${id}-target`}
                type="target"
                position={Position.Left}
                className="w-[10px] h-[10px] bg-[#2DA771]"
                isConnectable={false}
              />
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
                    src="/svgs/mail.svg"
                    alt="node icon"
                    className="w-[20px] mb-2"
                  />

                  <h4 className="text-sm font-medium text-[#14171B]">
                    {node?.data?.label ?? "Autobound"}
                  </h4>
                </div>
              </div>

              <div className={`node-content-wrapper relative `}>
                <div className="action-box">
                  <>
                    <h3 className="text-[16px] font-medium text-[#14171B] mb-4">
                      Actions
                    </h3>
                  </>
                  <>
                    {errorMessage && (
                      <div className="error-message text-red-500 text-sm mt-2">
                        {errorMessage} {/* Display error message */}
                      </div>
                    )}
                    {node?.data?.parameters &&
                      Object.entries(node.data.parameters).map(
                        ([key, param]) => {

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
                        }
                      )}

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
                </div>
              </div>
              <div className="absolute top-0 left-[155%]">
                <Accordion
                  onClick={(e: any) => {
                    handleInputChange(
                      focusedInputKey,
                      "textarea",
                      `${previousValue}${e ? "\${" + e + "}" : ""}`,
                      undefined
                    );
                  }}
                  nodeId={node?.id ?? ""}
                />
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

export default AutoBoundNode;
