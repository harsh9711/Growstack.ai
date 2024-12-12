import React, { useEffect, useState } from "react";
import { dummyData3 } from "../data";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { prepareNodesPayload, validateNodes } from "@/utils/helper";
import { useEdges } from "@xyflow/react";
import PublishConfirmationModal from "../modals/publishmodal/PublishModal";
import SaveFormModal from "../modals/saveformmodal/SaveFormModal";
import {
  onChangeWorkFlowData,
  updateWorkFlowById,
  updateWorkflowStatus,
} from "@/lib/features/workflow/workflow.slice";
import { useSnackbar } from "../snackbar/SnackbarContext";

const TopRightPanel2nd = ({
  setActiveTab,
  activeTab,
  setIsFromTimeline,
}: any) => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const { workFlowData } = useAppSelector(state => state.workflows);
  const { nodes } = useAppSelector(state => state.nodes);
  const edges = useEdges();
  const { success, error } = useSnackbar();
  const [openPublishConfirmationModal, setOpenPublishConfirmationModal] =
    useState(false);

  const handleClick = (index: number) => {
    setActiveTab(index);
    localStorage.setItem("workflowActiveTab", index.toString());
  };

  useEffect(() => {
    const savedTab = localStorage.getItem("workflowActiveTab");
    const isFromTimeline = localStorage.getItem("isFromTimeline");
    if (savedTab) {
      setActiveTab(parseInt(savedTab));
      if (isFromTimeline) {
        setIsFromTimeline(true);
        setTimeout(() => {
          localStorage.removeItem("isFromTimeline");
        }, 5000);
      } else {
        setIsFromTimeline(false);
      }
    } else {
      setActiveTab(0);
    }
  }, [setActiveTab]);

  const handleClosePublishConfirmationModal = () => {
    setOpenPublishConfirmationModal(false);
  };

  const handleOpenPublishConfirmationModal = () => {
    setOpenPublishConfirmationModal(true);
  };

  const handleSaveWorkFlow = async () => {
    try {
      const bodyPayload = {
        name: workFlowData?.name,
        description: workFlowData?.description || "",
        nodes: prepareNodesPayload(nodes, workFlowData._id || ""),
        edges: edges,
      };

      console.log("----bodyPayload---", bodyPayload);

      await dispatch(
        updateWorkFlowById({
          id: workFlowData._id || "",
          // @ts-ignore
          data: bodyPayload,
        })
      );
      success("Workflow saved successfully");
    } catch (e: any) {
      console.log("----error---", e?.message);
      error("Failed to save workflow" + e?.message);
    }
  };

  const handlePublishWorkFlow = async () => {
    try {
      if (nodes.length === 0) {
        setOpenPublishConfirmationModal(false);
        error("Please add at least one node to publish the workflow");
        return;
      }

      const isValidNode = validateNodes(nodes);

      if (!isValidNode) {
        setOpenPublishConfirmationModal(false);
        error(
          "Please fill all the required fields of Node, before publishing the Workflow"
        );
        return;
      }

      const bodyPayload = {
        name: workFlowData?.name,
        description: workFlowData?.description || "",
        nodes: prepareNodesPayload(nodes, workFlowData._id || ""),
        edges: edges,
        status: "published",
      };

      await dispatch(
        updateWorkFlowById({
          id: workFlowData._id || "",
          // @ts-ignore
          data: bodyPayload,
        })
      );
      dispatch(updateWorkflowStatus("published"));
      setOpenPublishConfirmationModal(false);
      success("Workflow published successfully");
    } catch (e: any) {
      console.log("----error---", e?.message);
      error("Failed to save workflow" + e?.message);
    }
  };

  return (
    <div>
      <div className="flex items-center  rounded-lg justify-between w-full max-w-[90%] mx-auto relative p-1">
        <div className="flex justify-center items-center rounded-lg cursor-pointer gap-3">
          <div className="back-btn-box">
            <button
              className="back-btn bg-white h-[40px] w-[50px] shadow-md rounded-[5px] flex items-center justify-center"
              onClick={() => {
                localStorage.setItem("activeTab", "workflows");
                route.push("/app/dashboard");
              }}
            >
              <Image
                src="/images/workflow/back.svg"
                alt="back"
                width={22}
                height={22}
              />
            </button>
          </div>

          <div className="workflow-name-box relative">
            <input
              type="text"
              key="name"
              value={workFlowData?.name || ""}
              placeholder="Enter Workflow Name"
              className="nopan nodrag form-control shadow-none w-full p-3 rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-sm font-medium focus:outline-none"
              onChange={e => {
                dispatch(
                  onChangeWorkFlowData({
                    key: "name",
                    value: e.target.value,
                  })
                );
              }}
            />
            {/* <p className="text-[14px] font-semibold leading-[21px] font-poppins ml-2.5">
          {workFlowData?.name || ""}
        </p> */}

            {/* <button
              className="check-button absolute top-[14px] right-[10px]"
              style={{ display: "block" }}
            >
              <img
                src="/assets/node_icon/single-check.svg"
                alt="single check"
                className="w-[20px]"
              />
            </button>
            <button
              className="cross-button absolute top-[7px] right-[10px]"
              style={{ display: "none" }}
            >
              <img
                src="/assets/node_icon/close-icon.svg"
                alt="single check"
                className="w-[30px]"
              />
            </button> */}
          </div>
        </div>

        <div className="run-btn flex items-center justify-center gap-1">
          {dummyData3.map((item, index) => (
            <button
              key={index.toString()}
              className={`flex justify-center items-center m-2 cursor-pointer px-2.5 py-1.5 rounded-md text-base font-normal ${
                activeTab === index
                  ? "text-white bg-[#2DA771]"
                  : "text-black bg-transparent"
              } shadow-lg disabled:opacity-60 disabled:cursor-not-allowed`}
              onClick={() => handleClick(index)}
              disabled={
                workFlowData?.status !== "published" && item?.text !== "Build"
              }
            >
              {item.text}
            </button>
          ))}
        </div>
        {activeTab === 0 ? (
          <div className="">
            <div className="action-button-box flex items-center gap-2">
              <h3 className="text-[#878787] text-[16px] font-medium capitalize mr-3">
                {workFlowData?.status}
              </h3>
              <Button
                className="w-auto h-auto bg-[#2DA771] shadow-md hover:bg-[#2DA771]"
                onClick={handleSaveWorkFlow}
              >
                Save
              </Button>
              <Button
                className="w-auto h-auto bg-[#2DA771] shadow-md hover:bg-[#2DA771]"
                onClick={handleOpenPublishConfirmationModal}
              >
                Publish
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-[156px]" />
        )}
      </div>

      <PublishConfirmationModal
        openPublishConfirmationModal={openPublishConfirmationModal}
        onClosePublishConfirmationModal={() =>
          handleClosePublishConfirmationModal()
        }
        onPublishNode={handlePublishWorkFlow}
      />
    </div>
  );
};

export default TopRightPanel2nd;
