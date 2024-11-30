import React, { useState } from "react";

const TimeLineTable = () => {
  const data = [
    {
      id: "#A1B2C3",
      name: "Name",
      status: "Completed",
      date: "March 15, 2023",
    },
    {
      id: "#D4E5F6",
      name: "Name",
      status: "Completed",
      date: "April 22, 2023",
    },
    { id: "#G7H8I9", name: "Name", status: "Pending", date: "May 30, 2023" },
    { id: "#J0K1L2", name: "Name", status: "Completed", date: "June 5, 2023" },
    { id: "#M3N4O5", name: "Name", status: "Completed", date: "July 12, 2023" },
    { id: "#P6Q7R8", name: "Name", status: "Pending", date: "August 19, 2023" },
    {
      id: "#S9T0U1",
      name: "Name",
      status: "Pending",
      date: "September 26, 2023",
    },
    {
      id: "#P6Q7R8",
      name: "Name",
      status: "Completed",
      date: "October 3, 2023",
    },
    {
      id: "#P6Q7R8",
      name: "Name",
      status: "Pending",
      date: "November 10, 2023",
    },
    {
      id: "#P6Q7R8",
      name: "Name",
      status: "Completed",
      date: "December 17, 2023",
    },
    {
      id: "#P6Q7R8",
      name: "Name",
      status: "Completed",
      date: "December 17, 2023",
    },
    {
      id: "#P6Q7R8",
      name: "Name",
      status: "Completed",
      date: "December 17, 2023",
    },
    {
      id: "#P6Q7R8",
      name: "Name",
      status: "Completed",
      date: "December 17, 2023",
    },
    {
      id: "#P6Q7R8",
      name: "Name",
      status: "Completed",
      date: "December 17, 2023",
    },
    {
      id: "#P6Q7R8",
      name: "Name",
      status: "Completed",
      date: "December 17, 2023",
    },
    {
      id: "#P6Q7R8",
      name: "Name",
      status: "Completed",
      date: "December 17, 2023",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Paginate data
  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="p-6 bg-gray-50">
      <div className="w-full max-w-4xl flex justify-start mb-4">
        <div className="flex space-x-8 text-gray-600 justify-center">
          <button className="font-semibold text-green-600 border-b-2 border-green-600 pb-1">
            History
          </button>
          <button className="font-semibold hover:text-green-600">
            Schedule
          </button>
        </div>
      </div>
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
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
          {paginatedData.map((item, index) => (
            <tr
              key={index}
              className={`border-b ${
                index % 2 === 0 ? "bg-white" : "bg-white"
              }`}
            >
              <td className="p-3 text-black">{item.id}</td>
              <td className="p-3 text-black">{item.name}</td>
              <td
                className={`p-3 font-medium ${
                  item.status === "Completed"
                    ? "inline-block text-green-600 bg-green-100 mt-1 rounded-md text-sm"
                    : "inline-block text-yellow-600 bg-yellow-100 mt-1 rounded-md text-sm"
                }`}
              >
                {item.status}
              </td>
              <td className="p-3 text-black">{item.date}</td>
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

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TimeLineTable;
