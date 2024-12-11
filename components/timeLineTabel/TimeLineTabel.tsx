import WorkflowSchedulerModal from "@/app/(main-app)/app/automation-hub/workflow-builder/workflows/[slug]/components/WorkflowSchedulerModal";
import instance, { CustomAxiosInstance } from "@/config/axios.config";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

const TimeLineTable = ({
  workflow_id,
  onViewDetails,
  workflowName,
}: {
  workflowName?: string;
  workflow_id: string;
  onViewDetails?: (executionId: string) => void;
}) => {
  const [historyData, setHistoryData] = useState<any>([]);
  const [scheduleData, setScheduleData] = useState<any>([]);
  const [activeTab, setActiveTab] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [workFlowData, setWorkFlowData] = useState<any>({
    name: "",
    input_configs: [],
    status: "",
    workflow_id: "",
    description: "",
    input_values: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const filteredHistoryData = historyData?.filter(
    (item: any) =>
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredScheduleData = scheduleData?.filter(
    (item: any) =>
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.frequency?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getHistoryData = useCallback(async () => {
    try {
      const getHistory = await instance.get(`/workflow/${workflow_id}/history`);

      // const getHistory = await CustomAxiosInstance().get(
      //   `workflow/${workflow_id}/history`
      // );
      // const getHistory = await axios.get(
      //   `/workflow/${workflow_id}/history`
      // );
      setHistoryData(getHistory?.data);
    } catch {}
  }, []);

  const getScheduleData = useCallback(async () => {
    try {
      const getHistory = await instance.get(
        `/workflow/${workflow_id}/schedules`
      );
      // const getSchedule = await axios.get(
      //   `http://localhost:5000/workflow/${workflow_id}/schedules`
      // );
      setScheduleData(getHistory?.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getHistoryData();
    getScheduleData();
  }, [getHistoryData, getScheduleData]);

  useEffect(() => {
    const handleScheduleUpdate = () => {
      getScheduleData();
    };
    window.addEventListener("schedule-updated", handleScheduleUpdate);
    return () => {
      window.removeEventListener("schedule-updated", handleScheduleUpdate);
    };
  }, [getScheduleData]);

  const handleEditSchedule = async (item: any) => {
    try {
      // Fetch the workflow details to get input_configs

      const workflowResponse = await instance.get(`/workflow/${workflow_id}`);
      // const workflowResponse = await instance.get(
      //   `/workflow/${workflow_id}`
      // );

      // const workflowResponse = await axios.get(
      //   `http://localhost:5000/workflow/${workflow_id}`
      // );

      setWorkFlowData({
        workflow_id: workflow_id,
        frequency: item.frequency,
        dayOfWeek: item.dayOfWeek || [],
        dayOfMonth: item.dayOfMonth,
        time: item.time,
        timezone: item.timezone,
        _id: item._id,

        // Workflow-specific data
        name: workflowResponse.data.name,
        description: workflowResponse.data.description,
        status: workflowResponse.data.status,

        // Map the input configs with their values from the schedule
        input_configs: workflowResponse.data.nodes
          .filter((node: any) => {
            const type = node?.nodeMasterId?.inputType;
            const formType = node?.nodeMasterId?.type;
            return (
              type === "text" ||
              type === "textarea" ||
              type === "checkbox" ||
              type === "switch" ||
              type === "number" ||
              type === "file" ||
              formType === "form"
            );
          })
          .map((node: any) => {
            if (node?.type !== "form") {
              const parameters = node.parameters || {};
              const scheduleValue = item.workflowPayload?.find(
                (payload: any) =>
                  payload.variableName === parameters.variableName
              )?.variableValue;
              return {
                display_name: parameters?.inputLabel || "Untitled Field",
                description: parameters?.description || "",
                placeholder: parameters?.placeholder || "",
                default_value: scheduleValue || "",
                variableName: parameters?.variableName || "",
                type: node?.nodeMasterId?.inputType,
                list_values: parameters?.options || [],
                selected_values: scheduleValue || [],
                required: parameters?.required,
                file_type: parameters?.fileType,
              };
            } else {
              return (
                node?.subNodes?.map((data: any) => {
                  let inputType = "";
                  const getName = node?.nodeMasterId?.subNodes?.find(
                    (subNode: any) =>
                      subNode?.nodeMasterId === data?.nodeMasterId
                  )?.name;

                  if (getName === "Short Text") inputType = "text";
                  else if (getName === "Long Text") inputType = "textarea";
                  else if (getName === "Boolean") inputType = "switch";
                  else if (getName === "Number") inputType = "number";
                  else if (getName === "File Upload") inputType = "file";
                  else if (getName === "CheckList") inputType = "checkbox";
                  else inputType = "text";

                  const formParameters = data.parameters || {};

                  const scheduleValue = item.workflowPayload?.find(
                    (payload: any) =>
                      payload.variableName === formParameters?.variableName
                  )?.variableValue;
                  return {
                    display_name:
                      formParameters?.inputLabel || "Untitled Field",
                    description: formParameters?.description || "",
                    placeholder: formParameters?.placeholder || "",
                    default_value: scheduleValue || "",
                    variableName: formParameters?.variableName || "",
                    type: inputType,
                    selected_values: scheduleValue || [],
                    list_values: formParameters?.options || [],
                    required: formParameters?.required,
                    file_type: formParameters?.fileType,
                  };
                }) || []
              );
            }
          })
          .flat(Infinity),
      });

      setShowModal(true);
    } catch (error) {
      console.error("Error fetching workflow details:", error);
    }
  };

  return (
    <div className="w-full bg-white rounded-xl border border-1  p-4  overflow-hidden">
      <div className="flex space-x-8 text-gray-600 justify-center border-b pb-2">
        <button
          className={`font-semibold  pb-1 ${
            activeTab === 0 ? "text-green-600 border-b-2 border-green-600" : ""
          }`}
          onClick={() => setActiveTab(0)}
        >
          History
        </button>
        <button
          className={`font-semibold pb-1  ${activeTab === 1 ? "text-green-600 border-b-2 border-green-600" : ""}`}
          onClick={() => setActiveTab(1)}
        >
          Schedule
        </button>
      </div>
      <div className="p-6">
        <div className="w-full max-w-4xl flex justify-start mb-4"></div>
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        {activeTab === 0 && (
          <table className="w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="border-b-2">
                <th className="p-3 text-left text-xs font font-normal text-gray-400">
                  Workflow Run ID
                </th>
                <th className="p-3 text-left text-xs font font-normal text-gray-400">
                  Workflow Name
                </th>
                <th className="p-3 text-left text-xs font font-normal text-gray-400">
                  Status
                </th>
                <th className="p-3 text-left text-xs font font-normal text-gray-400">
                  Last Updated At
                </th>
                <th className="p-3 text-left text-xs font font-normal text-gray-400">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredHistoryData?.map((item: any, index: number) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-white" : "bg-white"
                  }`}
                >
                  <td className="p-3 text-black">{item?._id}</td>
                  <td className="p-3 text-black">
                    {workflowName ?? "GrowStack"}
                  </td>
                  <td
                    className={`p-3 font-medium ${
                      item?.status === "completed"
                        ? "inline-block text-green-600 bg-green-100 mt-1 rounded-md text-sm"
                        : item?.status === "in-progress"
                          ? "inline-block text-yellow-600 bg-yellow-100 mt-1 rounded-md text-sm"
                          : "inline-block text-red-600 bg-yellow-100 mt-1 rounded-md text-sm"
                    }`}
                  >
                    {item?.status}
                  </td>
                  <td className="p-3 text-black">
                    {new Date(item?.startTimestamp).toLocaleString("en-US", {
                      dateStyle: "medium", // Example: Nov 27, 2024
                      timeStyle: "short", // Example: 1:45 PM
                      timeZone: "UTC", // Adjust for UTC or any specific timezone
                    })}
                  </td>
                  <td className="p-3">
                    <button
                      className="px-4 py-2 mr-2 text-sm text-green text-green-400 hover:text-white border border-green-400 rounded hover:bg-green-600"
                      onClick={() => onViewDetails?.(item?._id)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 1 && (
          <table className="w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="border-b-2">
                <th className="p-3 text-left text-xs font font-normal text-gray-400">
                  Workflow Name
                </th>
                <th className="p-3 text-left text-xs font font-normal text-gray-400">
                  Status
                </th>
                <th className="p-3 text-left text-xs font font-normal text-gray-400">
                  Next Run At
                </th>
                <th className="p-3 text-left text-xs font font-normal text-gray-400">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredScheduleData?.map((item: any, index: number) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-white" : "bg-white"
                  }`}
                >
                  <td className="p-3 text-black">
                    {workflowName ?? "GrowStack"}
                  </td>
                  <td
                    className={`py-2 font-medium bg-[#C4C4C429] text-black
                        inline-block px-6 mt-2 rounded-md text-sm  
                    `}
                  >
                    {item?.frequency}
                  </td>
                  <td className="p-3 text-black">
                    {new Date(item?.nextRun).toLocaleString("en-US", {
                      dateStyle: "medium", // Example: Nov 27, 2024
                      timeStyle: "short", // Example: 1:45 PM
                      timeZone: item?.timezone || "UTC", // Use dynamic timezone or default to UTC
                    })}
                  </td>
                  <td className="p-3">
                    <button
                      className="px-4 py-1 mr-2 text-sm text-green text-green-400 hover:text-white border border-green-400 rounded hover:bg-green-600"
                      onClick={() => handleEditSchedule(item)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        {/* <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 mx-1 text-sm rounded ${
                currentPage === index + 1
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage(prev => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div> */}
        {showModal && (
          <WorkflowSchedulerModal
            show={showModal}
            setShow={() => {
              setShowModal(false);
            }}
            workFlowData={workFlowData}
            setWorkFlowData={setWorkFlowData}
            timeLineTable="true"
          />
        )}
      </div>
    </div>
  );
};

export default TimeLineTable;
