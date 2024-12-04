import React from "react";

const workflowDummyData = {
  workflowName: "Google Sheet post posting on Social media",
  description:
    "The Workflow streamlines project management by automating task assignments and tracking progress, ensuring efficient collaboration among team members.",
  workflowID: "#154848",
  totalRuns: 23,
  averageRunDuration: "12 minutes",
  executionStatus: {
    success: 15,
    failed: 5,
    inProgress: 3,
  },
};

function WorkFlowHeader({ workFlowData }: any) {
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
              <div className="font-semibold">{workflowDummyData.totalRuns}</div>
            </div>
            <div>
              <span className="text-xs font text-gray-400">
                Avg Run Duration:
              </span>{" "}
              <div className="font-semibold">
                {workflowDummyData.averageRunDuration}
              </div>
            </div>
          </div>

          {/* Execution Status */}
          <div className="flex items-center space-x-4">
            <p className="text-xs font text-gray-400">
              Execution Status Summary :
            </p>
            <p className="text-green-600  text-[14px]">
              Success: {workflowDummyData.executionStatus.success}
            </p>
            <p className="text-red-600  text-[14px]">
              Failed: {workflowDummyData.executionStatus.failed}
            </p>
            <p className="text-yellow-600  text-[14px]">
              In Progress: {workflowDummyData.executionStatus.inProgress}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkFlowHeader;
