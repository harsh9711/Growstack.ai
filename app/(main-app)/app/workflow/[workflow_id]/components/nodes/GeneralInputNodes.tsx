import React, { memo, useState, useEffect, useRef, useCallback } from "react";
import { Handle, Position, type NodeProps, useReactFlow } from "@xyflow/react";
import { GeneralInputNodeProps } from "./types";
import DynamicInput from "../DynamicInputs";
import DeleteConfirmationModal from "../modals/deletemodal/DeleteModal";
import { extractParameterValues } from "@/utils/dataResolver";
import {
  addVariable,
  deleteNodeById,
  removeNodeById,
  updateNodeById,
  updateNodeDescription,
  updateNodeParameter,
} from "@/lib/features/workflow/node.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { WorkflowNodeState } from "@/types/workflows";
import { useSnackbar } from "../snackbar/SnackbarContext";
import { getInputType } from "@/utils/helper";

const GeneralInputNodes = memo(
  ({
    data,
    isConnectable,
    id,
    positionAbsoluteX,
    positionAbsoluteY,
  }: NodeProps<GeneralInputNodeProps>) => {
    // const { parameters, nodeMasterId } = data;

    console.log("id-->", id);

    const { setNodes, setEdges } = useReactFlow();
    const dispatch = useAppDispatch();
    const { success } = useSnackbar();
    const { workFlowData } = useAppSelector(state => state.workflows);
    const { isLoading } = useAppSelector(state => state.nodes);
    const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
    const [description, setDescription] = useState(data?.descriptions || "");
    const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
      useState(false);
    const [loadingNode, setLoadingNode] = useState<boolean>(false);

    const node = useAppSelector(state =>
      state.nodes.nodes.find(node => node.id === id)
    );
    // console.log("node-->", JSON.stringify(node, null, 2));
    const [isNextBoxOpen, setIsNextBoxOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownClick = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    const handleInputChange = (key: any, type: any, value: any) => {
      console.log("key-->", key, "type-->", type, "value-->", value);
      dispatch(updateNodeParameter({ nodeId: id, key, type, value }));
    };

    const handleNextClick = async () => {
      if (!node?.data?.parameters) return;
      // const requiredParams = Object.values(node.data.parameters).filter(
      //   param => param.required
      // );
      const requiredParams = Object.entries(node.data.parameters)
        .filter(([key, param]) => key !== "nextParameter" && param.required)
        .map(([key, param]) => param);

      const allRequiredParamsFilled = requiredParams.every(
        param => param?.value
      );

      if (allRequiredParamsFilled) {
        const updatedValue = extractParameterValues(node.data.parameters);
        setLoadingNode(true);
        // console.log("updatedValue-->", updatedValue);

        dispatch(
          addVariable({
            nodeID: id,
            variableName: node?.data?.parameters?.variableName?.value || "",
            workflowID: workFlowData._id || "",
            variableValue:
              updatedValue.defaultValue ||
              updatedValue.fileType ||
              updatedValue.options,
            variableType: "inputType",
          })
        );

        try {
          const bodyPayload = {
            workflowId: workFlowData._id,
            nodeMasterId: node.data.nodeMasterId,
            position: { x: positionAbsoluteX, y: positionAbsoluteY },
            dependencies: [],
            parameters: updatedValue,
          };

          await dispatch(
            updateNodeById({
              id: id,
              data: bodyPayload as unknown as WorkflowNodeState,
            })
          );

          dispatch(
            updateNodeParameter({
              nodeId: id,
              key: "nextParameter",
              label: updatedValue.inputLabel,
              type: getInputType(node?.data?.label),
              value:
                updatedValue?.defaultValue ||
                updatedValue.fileType ||
                updatedValue.options,
              placeholder: updatedValue?.placeholder,
              required: !!updatedValue?.required,
              description: updatedValue?.description,
              error: "",
            })
          );

          success("Node updated successfully");

          setIsNextBoxOpen(true);

          setLoadingNode(false);
        } catch (error: any) {
          console.error("error-->", error?.message);
          setLoadingNode(false);
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
          (edge: any) =>
            edge?.source !== id && edge?.target !== id
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

    // ON CLICK OPEN & CLOSE ACTION MODAL
    const [isActionModalShow, setIsActionModalShow] = useState(false);

    const handleOpenActionModal = () => {
      setIsActionModalShow(!isActionModalShow);
    };

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

    const handleCloseDeleteConfirmationModal = () => {
      setOpenDeleteConfirmationModal(false);
    };
    const handleOpenDeleteConfirmationModal = () => {
      setOpenDeleteConfirmationModal(true);
      setIsActionModalShow(false);
    };


    // console.log("node-->", node);

    return (
      <div>
        <section className="node-box relative">
          <div className="node-top-box relative">
            <div className="node-name-text-description text-center mb-3">
              <h4 className="text-sm font-medium text-[#2DA771]">
                {data?.label || ""}
              </h4>

              <textarea
                value={node?.data?.description || ""}
                onInput={handleInput}
                className="resize-none text-xs text-center font-medium text-[#14171B] bg-transparent border-transparent focus:border-transparent focus:ring-0 focus:outline-none"
                placeholder="Enter description"
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
                  src="/assets/node_icon/node-bg.svg"
                  alt="background icon"
                  className="w-[140px] mx-auto"
                />

                {data?.icon && (
                  <img
                    src={data.icon}
                    alt={data.label}
                    className="w-[30px] absolute left-0 right-0 mx-auto top-1/2 transform  -translate-y-1/2"
                  />
                )}
              </div>

              <div className="node-delete-modal-box absolute left-0 rigt-0 top-[-8px] w-full mx-auto z-10">
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
                      className="absolute right-[-126px] top-[0px] mt-2 w-48 bg-white rounded-[15px] border-[1px] border-[#E8E8E8] shadow-2xl z-50"
                      id="node-action-modal"
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

              <div className="node-edge absolute top-1/2 transform -translate-y-1/2 right-[-70px] flex items-center">
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
              <div className="node-text-heading bg-[#FFE6FF] p-4 rounded-[16px] mb-2">
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
              {!isNextBoxOpen ? (
                <div className="form-box">
                  {node?.data?.parameters &&
                    Object.entries(node.data.parameters)
                      .filter(
                        ([key, param]: any) =>
                          param.required || showAdvancedOptions
                      )
                      .map(([key, param]) => {
                        if (key === "nextParameter") {
                          return null;
                        }
                        return (
                          <DynamicInput
                            key={key}
                            inputKey={key}
                            param={param}
                            handleInputChange={handleInputChange}
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
                      className="bg-[#2DA771] text-white text-sm font-medium p-3 w-full rounded-[10px]"
                      disabled={loadingNode}
                    >
                      {loadingNode ? (
                        <div className="flex justify-center items-center">
                          <div className="loader ease-linear rounded-full border-4 border-gray-200 border-t-4 border-t-[#2DA771] h-6 w-6" />
                        </div>
                      ) : (
                        "Save"
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="form-box">
                  {node?.data?.parameters?.nextParameter && (
                    <DynamicInput
                      key="nextParameter"
                      inputKey="nextParameter"
                      param={node.data.parameters.nextParameter}
                      handleInputChange={() => { }}
                    />
                  )}

                  {node?.data?.parameters?.variableName?.value && (
                    <div className="text-box mb-5">
                      <h4 className="text-[#14171B] flex items-center gap-2 font-medium text-sm">
                        Variable name:{" "}
                        <span className="bg-[#FFE6FF] text-[#14171B] text-[12px] rounded-[20px] font-medium pt-3 pb-3 pr-4 pl-4">
                          {node.data.parameters.variableName.value}
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
              )}
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

export default GeneralInputNodes;
