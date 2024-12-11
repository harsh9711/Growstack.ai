import React from "react";

function WorkFlowHeader({ workFlowData, workflowStatsData }: any) {
  return (
    <div className="border-l-4 border-[#27C9AA] mt-6 w-full bg-white p-6 rounded-lg shadow-lg relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4">
        {/* Left Section */}
        <div>
          <h1 className="text-xs font text-gray-400 mb-2">
            Workflow Name & Description:
          </h1>
          <h2 className="text-sm font-semibold text-gray-800 mb-2">
            {workFlowData?.name ?? "Untitled Workflow"}
          </h2>
          <p className="text-sm text-gray-600">{workFlowData?.description}</p>
        </div>

        {/* Right Section */}
        <div>
          <div className="flex gap-6 text-sm text-gray-600 mb-4">
            <div>
              <span className="text-xs font text-gray-400">Workflow ID:</span>{" "}
              <div className="font-semibold">{workFlowData?.workflow_id}</div>
            </div>
            <div>
              <span className="text-xs font text-gray-400">Total Runs:</span>{" "}
              <div className="font-semibold">{workflowStatsData?.totalCount}</div>
            </div>
            <div>
              <span className="text-xs font text-gray-400">
                Avg Run Duration:
              </span>{" "}
              <div className="font-semibold">
                {workflowStatsData?.averageDuration?.toFixed(2)} Seconds
              </div>
            </div>
          </div>

          {/* Execution Status */}
          <div className="flex items-center space-x-4">
            <p className="text-xs font text-gray-400">
              Execution Status Summary :
            </p>
            <p className="text-green-600  text-[14px]">
              Success: {workflowStatsData?.completedCount}
            </p>
            <p className="text-red-600  text-[14px]">
              Failed: {workflowStatsData?.failedCount}
            </p>
            <p className="text-yellow-600  text-[14px]">
              In Progress: {workflowStatsData?.inProgressCount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkFlowHeader;
