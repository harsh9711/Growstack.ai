import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
const scheduleData = [
  {
    _id: "#A1BC2",
    name: "Data Backup",
    frequency: "Daily",
    startTimestamp: "2023-03-15T10:00:00Z",
  },
  {
    _id: "#B2CD3",
    name: "Report Generation",
    frequency: "Daily",
    startTimestamp: "2023-03-16T11:30:00Z",
  },
  {
    _id: "#C3DE4",
    name: "User Sync",
    frequency: "Daily",
    startTimestamp: "2023-03-15T12:00:00Z",
  },
  {
    _id: "#D4EF5",
    name: "Server Health Check",
    frequency: "Daily",
    startTimestamp: "2023-03-17T13:15:00Z",
  },
  {
    _id: "#E5FG6",
    name: "Email Campaign",
    frequency: "Daily",
    startTimestamp: "2023-04-01T14:45:00Z",
  },
  {
    _id: "#F6GH7",
    name: "Database Cleanup",
    frequency: "Daily",
    startTimestamp: "2023-03-19T15:30:00Z",
  },
  {
    _id: "#G7HI8",
    name: "Invoice Generation",
    frequency: "Daily",
    startTimestamp: "2023-04-10T16:00:00Z",
  },
];
const TimeLineTable = ({ workflow_id }: { workflow_id: string }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [historyData, setHistoryData] = useState<any>([]);
  const [activeTab, setActiveTab] = useState(0);

  const getHistoryData = useCallback(async () => {
    try {
      // const getHistory = await axios.get(
      //   `http://localhost:5000/workflow/${workflow_id}/history`
      // );
      const getHistory = await axios.get(
        `/workflows/${workflow_id}/history`
      );
      setHistoryData(getHistory?.data);
    } catch { }
  }, []);

  useEffect(() => {
    getHistoryData();
  }, [getHistoryData]);

  return (
    <div className="w-full bg-white rounded-xl border border-1  p-4  overflow-hidden">
      <div className="flex space-x-8 text-gray-600 justify-center border-b pb-2">
        <button
          className={`font-semibold  pb-1 ${activeTab === 0 ? "text-green-600 border-b-2 border-green-600" : ""}`}
          onClick={() => setActiveTab(0)}
        >
          History
        </button>
        <button
          className={`font-semibold hover:text-green-600 ${activeTab === 1 ? "text-green-600 border-b-2 border-green-600" : ""}`}
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
              {historyData.map((item: any, index: number) => (
                <tr
                  key={index}
                  className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-white"
                    }`}
                >
                  <td className="p-3 text-black">{item?._id}</td>
                  <td className="p-3 text-black">
                    {item?.name ?? "GrowStack"}
                  </td>
                  <td
                    className={`p-3 font-medium ${item?.status === "completed"
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
                    <button className="px-4 py-1 mr-2 text-sm text-green text-green-400 border border-[1px] border-green-400 rounded hover:bg-green-600">
                      View Details
                    </button>
                    <button className="px-4 py-1 text-sm text-green text-green-400 border border-[1px] border-green-400  rounded hover:bg-green-600">
                      Re-Run
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
              {scheduleData.map((item: any, index: number) => (
                <tr
                  key={index}
                  className={`border-b ${index % 2 === 0 ? "bg-white" : "bg-white"
                    }`}
                >
                  <td className="p-3 text-black">{item?._id}</td>
                  <td className="p-3 text-black">
                    {item?.name ?? "GrowStack"}
                  </td>
                  <td
                    className={`py-2 font-medium bg-[#C4C4C429] text-black
                        inline-block px-6 mt-2 rounded-md text-sm  
                    `}
                  >
                    {item?.frequency}
                  </td>
                  <td className="p-3 text-black">
                    {new Date(item?.startTimestamp).toLocaleString("en-US", {
                      dateStyle: "medium", // Example: Nov 27, 2024
                      timeStyle: "short", // Example: 1:45 PM
                      timeZone: "UTC", // Adjust for UTC or any specific timezone
                    })}
                  </td>
                  <td className="p-3">
                    <button className="px-4 py-1 mr-2 text-sm text-green text-green-400 border border-[1px] border-green-400 rounded hover:bg-green-600">
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
      </div>
    </div>
  );
};

export default TimeLineTable;
