import React, { useState } from "react";
import Image from "next/image";
import { Controls, useReactFlow } from "@xyflow/react";
import { Lock, LockKeyholeOpen, Minus, Plus } from "lucide-react";

const BottomCenterPanel = ({
  onLockIconClick,
  isLockCanvas,
}: {
  onLockIconClick: () => void;
  isLockCanvas: boolean;
}) => {
  // const { zoomIn, zoomOut, fitView, onInteractiveChange } = useReactFlow();
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <div className="flex">
      <div className="h-[44px] w-[44px] border-[1px] border-[#ECECEC] rounded-full flex justify-center items-center shadow-md bg-white mr-2.5">
        <button onClick={onLockIconClick}>
          {!isLockCanvas ? (
            <Lock color="#2DA771" />
          ) : (
            <LockKeyholeOpen color="#2DA771" />
          )}
        </button>
      </div>

      <div className="h-[44px] w-[44px] border-[1px] border-[#ECECEC] rounded-full flex justify-center shadow-md items-center bg-white mr-2.5">
        <button onClick={() => fitView()}>
          <Image
            src="/images/workflow/zoom.svg"
            alt="plus"
            width={18}
            height={18}
            className="cursor-pointer"
          />
        </button>
      </div>

      <div className="flex justify-center items-center border-[1px] border-[#ECECEC] bg-white shadow-md p-[13px] rounded-full mr-2.5">
        <button onClick={() => zoomOut()}>
          <Minus size={18} color="#007539" />
        </button>
      </div>
      <div className="flex justify-center items-center border-[1px] border-[#ECECEC] bg-white shadow-md p-[13px] rounded-full mr-2.5">
        <button onClick={() => zoomIn()}>
          <Plus size={18} color="#007539" />
        </button>
      </div>
    </div>
  );
};

export default BottomCenterPanel;
