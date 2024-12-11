import React, { useEffect, useState } from "react";
import { dummyData3 } from "../data";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import PublishConfirmationModal from "../modals/publishmodal/PublishModal";
import SaveFormModal from "../modals/saveformmodal/SaveFormModal";

const TopRightPanel2nd = ({
  setActiveTab,
  activeTab,
  setIsFromTimeline,
}: any) => {
  const route = useRouter();
  const { workFlowData } = useAppSelector(state => state.workflows);
  const [activeIndex, setActiveIndex] = useState(0);
  //PUBLISH MODAL STATE CALL HERE
  const [openPublishConfirmationModal, setOpenPublishConfirmationModal] =
    useState(false);
  //SAVE FORM MODAL STATE CALL HERE
  const [openSaveFormModal, setOpenSaveFormModal] = useState(false);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    setActiveTab(index);
    localStorage.setItem("workflowActiveTab", index.toString());
  };

  useEffect(() => {
    const savedTab = localStorage.getItem("workflowActiveTab");
    if (savedTab) {
      setActiveTab(parseInt(savedTab));
    } else {
      setActiveTab(0);
    }
  }, [setActiveTab]);

  // PUBLISH MODAL OPEN AND CLOSE JS CALL HERE
  const handleClosePublishConfirmationModal = () => {
    setOpenPublishConfirmationModal(false);
  };
  const handleOpenPublishConfirmationModal = () => {
    setOpenPublishConfirmationModal(true);
  };

  // SAVE FORM MODAL OPEN AND CLOSE JS CALL HERE
  const handleCloseSaveFormModal = () => {
    setOpenSaveFormModal(false);
  };
  const handleOpenSaveFormModal = () => {
    setOpenSaveFormModal(true);
  };

  return (
    <div>
      <div className="flex items-center  rounded-lg justify-between w-full max-w-[90%] mx-auto relative p-1">
        <div className="flex justify-center items-center rounded-lg cursor-pointer gap-3">
          <button
            className="back-btn bg-white h-[40px] w-[50px] shadow-md rounded-[5px] flex items-center justify-center"
            onClick={() => {
              route.back();
            }}
          >
            <Image
              src="/images/workflow/back.svg"
              alt="back"
              width={22}
              height={22}
            />
          </button>

          <input
            type="text"
            value={workFlowData?.name || ""}
            placeholder="Enter Workflow Name"
            className="nopan nodrag form-control shadow-none w-full p-3 rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-sm font-medium focus:outline-none"
          />
          {/* <p className="text-[14px] font-semibold leading-[21px] font-poppins ml-2.5">
            {workFlowData?.name || ""}
          </p> */}
        </div>

        <div className="run-btn flex items-center justify-center gap-1">
          {dummyData3.map((item, index) => (
            <button
              key={index.toString()}
              className={`flex justify-center items-center m-2 cursor-pointer px-2.5 py-1.5 rounded-md text-base font-normal ${
                activeTab === index
                  ? "text-white bg-[#2DA771]"
                  : "text-black bg-transparent"
              } shadow-lg`}
              onClick={() => handleClick(index)}
            >
              {item.text}
            </button>
          ))}
        </div>

        <div className="">
          <div className="action-button-box flex items-center gap-2">
            <Button
              className="w-auto h-auto bg-[#2DA771] shadow-md hover:bg-[#2DA771]"
              onClick={handleOpenSaveFormModal}
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
      </div>

      <PublishConfirmationModal
        openPublishConfirmationModal={openPublishConfirmationModal}
        onClosePublishConfirmationModal={() =>
          handleClosePublishConfirmationModal()
        }
        // onPublishNode={handleDeleteNode}
      />

      <SaveFormModal
        openSaveFormModal={openSaveFormModal}
        onCloseSaveFormModal={() => handleCloseSaveFormModal()}
        // onSaveFormNode={handleDeleteNode}
      />
    </div>
  );
};

export default TopRightPanel2nd;
