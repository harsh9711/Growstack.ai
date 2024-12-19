import React, { useState, useRef, useEffect, useCallback } from "react";
import { Handle, Position, useReactFlow, type NodeProps } from "@xyflow/react";
import { FormNodeProps } from "./types";
import { AddFieldDropdown } from "../inputsFields";
import DynamicInput from "../DynamicInputs";
import { SubNodeProps, WorkflowNodeState } from "@/types/workflows";
import {
  addVariable,
  deleteNodeById,
  removeNodeById,
  resetSubNodeParameter,
  updateNodeById,
  updateNodeDescription,
  updateNodeParameter,
  updateSubNodeParameter,
} from "@/lib/features/workflow/node.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { extractParameterValues } from "@/utils/dataResolver";
import DeleteConfirmationModal from "../modals/deletemodal/DeleteModal";
import { useSnackbar } from "../snackbar/SnackbarContext";

interface OptionsProps {
  value: string;
  label: string;
  imageUrl: string;
}

const Form = ({
  data,
  id,
  isConnectable,
  positionAbsoluteX,
  positionAbsoluteY,
}: NodeProps<FormNodeProps>) => {
  const { parameters, subNodes } = data;

  const { nodes, isLoading } = useAppSelector(state => state.nodes);

  // console.log("nodes------>", JSON.stringify(nodes, null, 2));

  const node = useAppSelector(state =>
    state.nodes.nodes.find(node => node.id === id)
  );

  const { setNodes, setEdges } = useReactFlow();
  const dispatch = useAppDispatch();
  const { workFlowData } = useAppSelector(state => state.workflows);

  const initialSubNodes = (node?.data?.subNodes || []).filter(subNode =>
    Object.values(subNode.parameters).some(param => param.value)
  );

  const { success } = useSnackbar();

  const [showAdvancedOptions, setShowAdvancedOptions] = useState<{
    [key: string]: boolean;
  }>({});

  const [currentSubNodes, setCurrentSubNodes] =
    useState<SubNodeProps[]>(initialSubNodes);

  // console.log("currentSubNodes------>", currentSubNodes);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [description, setDescription] = useState(data?.descriptions || "");
  const [isEdit, setIsEdit] = useState(true);

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<{
    [index: number]: boolean;
  }>({});
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isActionModalShow, setIsActionModalShow] = useState(false);
  const [updatedOptions, setUpdatedOptions] = useState<OptionsProps[]>([]);
  const [loadingNodes, setLoadingNodes] = useState<Record<string, any>>({});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpenDeleteModal({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleInputChange = useCallback(
    (key: any, type: any, value: any, nodeMasterId: any) => {
      console.log("key-->", key, "type-->", type, "value-->", value);
      dispatch(
        updateSubNodeParameter({ nodeId: id, key, type, value, nodeMasterId })
      );
    },
    [dispatch, node, id]
  );

  const handleToggleAdvancedOptions = (nodeId: string) => {
    setShowAdvancedOptions(prevState => ({
      ...prevState,
      [nodeId]: !prevState[nodeId],
    }));
  };

  const handleAddSubNode = (node: SubNodeProps) => {
    setCurrentSubNodes([...currentSubNodes, node]);
  };

  const imageMapping = {
    "Short Text": "short-single.svg",
    "Long Text": "long-single.svg",
    Boolean: "boolean-single.svg",
    Number: "number-single.svg",
    "File Upload": "uploadfile-single.svg",
    CheckList: "checklist-single.svg",
  };

  const options = (subNodes ?? []).map(node => ({
    value: node.nodeMasterId,
    label: node.name,
    imageUrl:
      imageMapping[node.name as keyof typeof imageMapping] ||
      "add-option-icon.svg",
  }));

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

  const toggleDropdown = (index: number) => {
    setIsOpenDeleteModal(prevState => {
      const newState = { [index]: !prevState[index] };
      return newState;
    });
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

  const handleDeleteSubNode = async (index: number, nodeMasterId: string) => {
    console.log("Deleting node at index:", index);

    if (!node?.data?.subNodes) return;

    setIsOpenDeleteModal(prevState => ({
      ...prevState,
      [index]: false,
    }));

    setCurrentSubNodes(prevSubNodes =>
      prevSubNodes.filter((subNds, i) => subNds.nodeMasterId !== nodeMasterId)
    );

    dispatch(
      resetSubNodeParameter({
        nodeId: id,
        nodeMasterId: nodeMasterId,
      })
    );
  };

  const handleNextClick = async () => {
    if (!node?.data?.subNodes) return;

    const subNodesToValidate = node.data.subNodes.filter(subNode =>
      currentSubNodes.some(cs => cs.nodeMasterId === subNode.nodeMasterId)
    );

    const allSubNodesValid = subNodesToValidate.every(subNode => {
      const requiredParams = Object.values(subNode.parameters).filter(
        param => param.required
      );
      return requiredParams.every(param => param?.value);
    });

    console.log("allSubNodesValid-->", allSubNodesValid);
    console.log("subNodesToValidate-->", subNodesToValidate);

    if (allSubNodesValid) {
      setLoadingNodes(prevState => ({
        ...prevState,
        [node.data.nodeMasterId]: true,
      }));

      const updatedData = node.data.subNodes.filter(subNode =>
        currentSubNodes.some(cs => cs.nodeMasterId === subNode.nodeMasterId)
      );

      const subNodes = updatedData.map(subNode => ({
        nodeMasterId: subNode.nodeMasterId,
        parameters: extractParameterValues(subNode.parameters),
      }));

      const bodyPayload = {
        workflowId: workFlowData._id,
        nodeMasterId: node.data.nodeMasterId,
        position: { x: positionAbsoluteX, y: positionAbsoluteY },
        dependencies: [],
        subNodes,
      };

      try {
        await dispatch(
          updateNodeById({
            id: id,
            data: bodyPayload as unknown as WorkflowNodeState,
          })
        );

        setIsEdit(false);

        setLoadingNodes(prevState => ({
          ...prevState,
          [node.data.nodeMasterId]: false,
        }));
      } catch (error: any) {
        console.error("error-->", error?.message);
        setLoadingNodes(prevState => ({
          ...prevState,
          [node.data.nodeMasterId]: false,
        }));
      }
    } else {
      subNodesToValidate.forEach(subNode => {
        Object.entries(subNode.parameters).forEach(([key, param]) => {
          if (param.required && !param.value) {
            dispatch(
              updateSubNodeParameter({
                nodeId: id,
                nodeMasterId: subNode.nodeMasterId,
                key: key,
                type: "error",
                value: "This field is required",
              })
            );
          }
        });
      });
    }
  };


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

  const handleUpdateOptions = useCallback(() => {
    setUpdatedOptions(
      options?.filter(
        (subNode: any) =>
          !currentSubNodes.some(cs => cs.nodeMasterId === subNode.value)
      ) || []
    );
  }, [currentSubNodes]);

  useEffect(() => {
    handleUpdateOptions();
  }, [currentSubNodes]);

  return (
    <div>
      <section className="node-box relative">
        <div className="node-top-box relative">
          <div className="node-name-text-description text-center mb-3">
            <h4 className="text-sm font-medium text-[#2DA771]">
              {" "}
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
                  className="w-[40px] mx-auto absolute top-[50px] left-0 right-0"
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
            <div className="node-text-heading bg-[#FFE6FF] p-4 rounded-[16px] mb-2">
              <img
                src="/assets/node_icon/form-single.svg"
                alt="form icon"
                className="mb-2"
              />

              <h5 className="text-sm text-[#14171B] font-medium">Form</h5>
            </div>

            <div className="form-box">
              {node?.data?.subNodes &&
                node?.data?.subNodes
                  ?.filter(subNode =>
                    currentSubNodes.some(
                      cs => cs.nodeMasterId === subNode.nodeMasterId
                    )
                  )
                  ?.map((subNode, index) => (
                    <div key={index}>
                      <div className="short-text-heading flex items-center justify-between gap-4 mb-2">
                        <h3 className="text-sm text-[#14171B] font-medium">
                          {subNode.name}
                        </h3>

                        <div
                          className="relative inline-block"
                          ref={dropdownRef}
                        >
                          <button
                            onClick={() => toggleDropdown(index)}
                            disabled={!isEdit}
                          >
                            <img
                              src="/assets/node_icon/dots-vertical.svg"
                              alt="dots icon"
                            />
                          </button>

                          {isOpenDeleteModal[index] && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-[15px] border-[1px] border-[#E8E8E8] shadow-2xl z-50">
                              <ul className="py-2">
                                <li className="px-4 py-2 cursor-pointer">
                                  <button
                                    onClick={() =>
                                      handleDeleteSubNode(
                                        index,
                                        subNode.nodeMasterId
                                      )
                                    }
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
                                  handleInputChange={
                                    isEdit
                                      ? (key, type, value) =>
                                        handleInputChange(
                                          key,
                                          type,
                                          value,
                                          subNode.nodeMasterId
                                        )
                                      : () => { }
                                  }
                                />
                              );
                            })}

                        {subNode?.parameters?.variableName?.value && (
                          <div className="text-box mb-5">
                            <h4 className="text-[#14171B] flex items-center gap-2 font-medium text-sm">
                              Variable name:{" "}
                              <span className="bg-[#FFE6FF] text-[#14171B] text-[12px] rounded-[20px] font-medium pt-3 pb-3 pr-4 pl-4">
                                {subNode?.parameters.variableName.value}
                              </span>
                            </h4>
                          </div>
                        )}
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

              {currentSubNodes.length > 0 && (
                <div className="submit-button">
                  {isEdit ? (
                    <button
                      onClick={handleNextClick}
                      className="bg-[#2DA771] text-white text-sm font-medium p-3 w-full rounded-[10px]"
                      disabled={
                        node ? loadingNodes[node.data.nodeMasterId] : false
                      }
                    >
                      {node && loadingNodes[node.data.nodeMasterId] ? (
                        <div className="flex justify-center items-center">
                          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
                        </div>
                      ) : (
                        "Save"
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEdit(!isEdit)}
                      className="bg-[#2DA771] text-white text-sm font-medium p-3 w-full rounded-[10px]"
                      disabled={
                        node ? loadingNodes[node.data.nodeMasterId] : false
                      }
                    >
                      Edit
                    </button>
                  )}
                </div>
              )}

              <AddFieldDropdown
                options={updatedOptions}
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
};

export default Form;
function getInputType(label: string): string {
  throw new Error("Function not implemented.");
}
