import {
  Handle,
  NodeProps,
  Position,
  useReactFlow,
  Node as FlowNode,
} from "@xyflow/react";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { FanOutNodeProps } from "./types";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { NodeState } from "@/types/workflows";
import { convertNodeData } from "@/utils/dataResolver";
import { addNode, createNode, deleteNodeById, removeNodeById } from "@/lib/features/workflow/node.slice";
import { unwrapResult } from "@reduxjs/toolkit";
import DeleteConfirmationModal from "../deleteconfirmationmodal/DeleteConfirmationModal";
import { useSnackbar } from "../snackbar/SnackbarContext";

const FanOut = ({ data, id, isConnectable }: NodeProps<FanOutNodeProps>) => {
  const nodeMaster = useAppSelector(state =>
    state.masterNode.masterNode.filter(
      node =>
        node.category?.toLowerCase() === "integration" ||
        node.category?.toLowerCase() === "llms" ||
        node.category?.toLowerCase() === "tools"
    )
  );

  const { workFlowData } = useAppSelector(state => state.workflows);

  const dispatch = useAppDispatch();

  const modifiedNodes = nodeMaster?.map(convertNodeData);
  const { success } = useSnackbar();

  const groupedGenerals = modifiedNodes?.reduce(
    (acc: { [key: string]: typeof modifiedNodes }, model) => {
      if (!acc[model.subCategory]) {
        acc[model.subCategory] = [];
      }
      acc[model.subCategory].push(model);
      return acc;
    },
    {}
  );

  const { setNodes } = useReactFlow();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isActionModalShow, setIsActionModalShow] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleButtonClick = () => {
    setShowSearch(!showSearch);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleNodeClick = async (nodeData: NodeState) => {
    try {
      const resultAction = await dispatch(
        createNode({
          workflowId: workFlowData._id,
          nodeMasterId: nodeData.id,
          name: nodeData.data?.label,
          type: nodeData?.type,
          description: nodeData.data?.descriptions || "",
          position: { x: 10, y: 90 },
          isFanoutNode: true,
          parameters: {},
        })
      );

      const result = unwrapResult(resultAction);

      console.log("----result----", result);

      const subFlow = {
        ...nodeData,
        id: result._id,
        position: { x: 10, y: 90 },
        parentId: id,
        extent: "parent",
      };

      setNodes((nds: FlowNode[]) => nds.concat(subFlow as unknown as FlowNode));
      dispatch(addNode(subFlow));
    } catch (error) {
      console.error("Error adding node:", error);
    }
  };


  const handleOpenActionModal = () => {
    setIsActionModalShow(!isActionModalShow);
  };

  const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
    React.useState(false);

  const handleCloseDeleteConfirmationModal = () => {
    setOpenDeleteConfirmationModal(false);
  };
  const handleOpenDeleteConfirmationModal = () => {
    setOpenDeleteConfirmationModal(true);
    setIsActionModalShow(false);
  };

  const handleDeleteNode = () => {
    setNodes(nds => nds.filter(nds => nds.id !== id));
    dispatch(removeNodeById(id));
    dispatch(deleteNodeById(id));
    success("Node delete successfully");
  };


  const filteredGroupedGenerals = Object.entries(groupedGenerals).reduce(
    (acc: { [key: string]: typeof modifiedNodes }, [category, nodes]) => {
      const filteredNodes = nodes.filter(nodeWrapper =>
        nodeWrapper.node.data.label
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      if (filteredNodes.length > 0) {
        acc[category] = filteredNodes;
      }
      return acc;
    },
    {}
  );


  return (
    <div>
      <section className="fanout-sec relative">
        <div className="fanout-box w-[400px] h-[400px] border-[2px] border-dashed border-[#2DA771] rounded-[25px] relative">
          {!showSearch ? (
            <button
              className="add-icon absolute bottom-[-16px] right-0 left-0 mx-auto text-center"
              onClick={handleButtonClick}
            >
              <img
                src="/assets/node_icon/plus-circle.svg"
                alt="plus circle icon"
                className="mx-auto"
              />
            </button>
          ) : (
            <button
              className="cross-icon absolute bottom-[-16px] right-0 left-0 mx-auto text-center"
              onClick={handleButtonClick}
            >
              <img
                src="/assets/node_icon/cross-circle.svg"
                alt="cross circle icon"
                className="mx-auto"
              />
            </button>
          )}

          <div className="fanout-text absolute left-[-34px] top-[26%]">
            <h2 className="text-[14px] text-[#2DA771] font-medium tracking-[3px]">
              Fanout
            </h2>
          </div>

          <div className="fanout-icon absolute left-[-20px] top-[45%] z-10">
            <img src="/assets/node_icon/fanout-icon.svg" alt="fanout icon" />
          </div>
        </div>

        <div className="node-edge absolute top-1/2 transform -translate-y-1/2 right-[-80px] flex items-center">
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

        <div className="node-edge-connector absolute top-1/2 transform -translate-y-1/2 left-[-80px] flex items-center">
          <div className="h-px border-t-2 border-dashed border-[#2DA771] w-[65px] mr-1" />

          <Handle
            id={`${id}-target`}
            type="target"
            position={Position.Left}
            className="w-[10px] h-[10px] bg-[#2DA771]"
            isConnectable={false}
          />
        </div>

        <div
          className="toggle-button-box absolute left-[35%] mx-auto top-[-15px] z-10 cursor-pointer"
        // onClick={handleDropdownClick}
        >
          <img
            src="/assets/node_icon/toggle-switch.svg"
            alt="toggle switch"
            className="w-[30px] mx-auto"
          // style={{ transform: isDropdownOpen ? "rotate(180deg)" : "" }}
          />
        </div>

        <div className="node-delete-modal-box absolute left-[60%] top-[-15px] mx-auto z-10">
          <div className="action-modal-button">
            <button className="cursor-pointer" onClick={handleOpenActionModal}>
              <img
                src="/assets/node_icon/action-icon.svg"
                alt="action icon"
                className="w-[30px]"
              />
            </button>
          </div>

          <div className="modal">
            {isActionModalShow && (
              <div
                ref={dropdownRef}
                className="absolute right-[-126px] top-[26px] mt-2 w-48 bg-white rounded-[15px] border-[1px] border-[#E8E8E8] shadow-2xl z-50"
              >
                <ul className="py-2">
                  <li className="px-4 py-2 cursor-pointer">
                    <button
                      onClick={handleOpenDeleteConfirmationModal}
                      className="delete-button flex items-center gap-2 text-[15px] text-[#212833] font-medium w-full cursor-pointer"
                    >
                      <img src="/assets/node_icon/trash.svg" alt="dots icon" />
                      Delete
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {showSearch && (
          <div className=" nowheel search-box absolute bottom-[-30%] right-0 mx-auto left-0 w-full bg-white border border-[#2DA771] rounded-[20px] p-4">
            <input
              type="text"
              placeholder="Search nodes..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full bg-[#F2F2F2] text-[#14171B] text-sm font-medium focus:outline-none p-3 rounded-[10px]"
            />

            <div className="absolute bg-white border-[1px] left-0 right-0 mx-auto shadow-lg top-full mt-2 w-full rounded-[15px]">
              <ul className="mt-2 max-h-40 overflow-y-auto">
                {Object.entries(filteredGroupedGenerals)?.map(
                  ([category, nodes]) =>
                    nodes.map((nodeWrapper, index) => (
                      <li
                        key={index}
                        className="p-2 mb-2 cursor-pointer"
                        onClick={() => handleNodeClick(nodeWrapper.node)}
                      >
                        {nodeWrapper.node.data.label}
                      </li>
                    ))
                )}
              </ul>
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

export default FanOut;
