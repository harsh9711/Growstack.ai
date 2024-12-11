import React, { useState } from "react";

const RunSummary = ({ runSummaryData }: any) => {
  const [currentPage, setCurrentPage] = useState(1);

  const data = [
    {
      id: 1,
      step: "Name",
      description:
        "Lorem ipsum dolor sit amet consectetur. Felis neque purus auctor consectetur.",
      status: "Completed",
      startTime: "13:07",
      endTime: "15:45",
      startDate: "24-11-2024",
      endDate: "02-12-2024",
      error: "Name",
    },
    {
      id: 2,
      step: "Name",
      description:
        "Lorem ipsum dolor sit amet consectetur. Felis neque purus auctor consectetur.",
      status: "Failed",
      startTime: "13:07",
      endTime: "15:45",
      startDate: "24-11-2024",
      endDate: "02-12-2024",
      error: "Name",
    },
    {
      id: 3,
      step: "Name",
      description:
        "Lorem ipsum dolor sit amet consectetur. Felis neque purus auctor consectetur.",
      status: "In Progress",
      startTime: "13:07",
      endTime: "15:45",
      startDate: "24-11-2024",
      endDate: "02-12-2024",
      error: "Name",
    },
  ];

  const statuses: any = {
    completed: "text-green-600 bg-green-100",
    failed: "text-red-600 bg-red-100",
    "in-progress": "text-yellow-600 bg-yellow-100",
    ready: "text-yellow-600 bg-yellow-100",
    "awaiting-approval": "text-yellow-600 bg-yellow-100",
    "approval-pending": "text-yellow-600 bg-yellow-100",
  };

  function formatTimestamp(isoTimestamp: any, type: any) {
    const date = new Date(isoTimestamp);

    // Check for invalid date
    if (isNaN(date.getTime())) {
      return "-";
    }

    if (type === "time") {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
    }

    if (type === "date") {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    }

    throw new Error("Invalid format type. Use 'time' or 'date'.");
  }

  const pageData = data.slice((currentPage - 1) * 5, currentPage * 5);

  return (
    <div className="w-full border-l-4 border-[#B785FF] bg-white rounded-lg shadow-md space-y-6 p-6 mt-5">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold mb-1">Run Summary</h2>
          <div className="grid grid-cols-4 text-sm text-gray-600 mb-4 space-x-10">
            <div>
              <span className="text-xs font text-gray-400">
                Workflow Run Id
              </span>{" "}
              <div className="font-semibold">{runSummaryData?.id}</div>
            </div>
            <div>
              <span className="text-xs font text-gray-400">Start Time:</span>{" "}
              <div className="font-semibold">
                {formatTimestamp(runSummaryData?.startTimestamp, "time")}
              </div>
            </div>
            <div>
              <span className="text-xs font text-gray-400">End Time:</span>{" "}
              <div className="font-semibold">
                {formatTimestamp(runSummaryData?.endTimestamp, "time")}
              </div>
            </div>
            {runSummaryData?.duration && (
              <div>
                <span className="text-xs font text-gray-400">Duration:</span>{" "}
                <div className="font-semibold">
                  {runSummaryData?.duration?.toFixed(2)}s
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <span
            className={`inline-block  px-4 py-1 rounded-full text-sm ${statuses[runSummaryData?.status] ? statuses[runSummaryData?.status] : "text-yellow-600 bg-yellow-100"}`}
          >
            {runSummaryData?.status}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      {/* <div>
        <p className="text-sm mb-2">77% Workflow Completed</p>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full"
            style={{ width: "77%" }}
          ></div>
        </div>
      </div> */}

      {/* Search and Actions */}
      {/* <div className="flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by action name, step name, or error code..."
          className="w-2/3 p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
        />
        <div className="space-x-2">
          <button className="p-2 bg-gray-100 border border-gray-300 rounded-lg text-sm">
            Filter
          </button>
          <button className="p-2 bg-gray-100 border border-gray-300 rounded-lg text-sm">
            Download
          </button>
        </div>
      </div> */}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-200 text-left text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-500">
              <th className="p-4">Step</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date & Time</th>
              <th className="p-4">Errors</th>
            </tr>
          </thead>
          <tbody>
            {runSummaryData?.nodeExecutions?.map((row: any) => (
              <tr key={row.id} className="border-t">
                <td className="p-4">
                  <p className="font-medium">{row?.nodeId?.name}</p>
                  <p className="text-xs text-gray-500">
                    {row?.nodeId?.description}
                  </p>
                </td>
                <td className="p-4">
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium ${statuses[row.status] ? statuses[row?.status] : "text-yellow-600 bg-yellow-100"}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="p-4">
                  {formatTimestamp(row.startTimeStamp, "time")} -{" "}
                  {formatTimestamp(row.endTimeStamp, "time") ?? "-"} <br />
                  <span className="text-xs text-gray-500">
                    {formatTimestamp(row.startTimeStamp, "date")} -{" "}
                    {formatTimestamp(row.endTimeStamp, "date")}
                  </span>
                </td>
                <td className="p-4">
                  <span>{row?.errorMessage ?? "-"}</span>
                </td>
                {/* <td className="p-4">
                  <p className="font-medium">{row.error}</p>
                  <p className="text-xs text-gray-500">{row.description}</p>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {/* <div className="flex justify-between items-center">
        <button
          className="p-2 bg-gray-100 border border-gray-300 rounded-lg text-sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          Previous
        </button>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`p-2 border rounded-lg text-sm ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 border-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          className="p-2 bg-gray-100 border border-gray-300 rounded-lg text-sm"
          disabled={currentPage === 5}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default RunSummary;
