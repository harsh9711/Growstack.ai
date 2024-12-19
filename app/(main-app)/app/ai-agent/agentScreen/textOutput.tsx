
import React, { useEffect, useState } from "react";
import {FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { API_URL } from "@/lib/api";

interface DataItem {
  _id: string;
  variableName: string;
  variableType: string;
  variableValue: string;
}

const KeywordInsights = ({ runnerAgentId }: { runnerAgentId: string }) => {
  const [data, setData] = useState<{ result: DataItem[] } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null); // State to track expanded accordion

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("runnerAgentId", runnerAgentId);

        const response = await axios.get(
          `${API_URL}/agents/api/v1/run/status/${runnerAgentId}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        setData(response.data.data);

        if (response.data.data.status === "COMPLETED") {
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, [runnerAgentId]);

  const renderCSVTable = (csvData: string) => {
    const rows = csvData.split("\n");
    const headers = rows[0].split(",").map(header => header.trim());
    const bodyRows = rows.slice(1);

    return (
      <div className="overflow-x-auto h-[300px]">
        <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-100">
              {headers.map((header, index) => (
                <th key={index} className="border border-gray-300 p-2 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bodyRows.map((row, rowIndex) => {
              const cells = parseCSVRow(row);
              return (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  {cells.map((cell, cellIndex) => (
                    <td key={cellIndex} className="border border-gray-300 p-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const parseCSVRow = (row: string) => {
    const regex = /(".*?"|[^",\n]+)(?=\s*,|\s*$)/g;
    return row.match(regex)?.map(cell => cell.replace(/"/g, '').trim()) || [];
  };

  const toggleAccordion = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-xl font-semibold">Output:</h1>
      </div>
      <div className="mt-4">
        {data?.result?.map((item) => (
          <div key={item._id} className="mb-6">
            <h1 className="font-medium text-gray-900">
              <b>{item.variableName}</b>
            </h1>

            <div>
              <button
                type="button"
                onClick={() => toggleAccordion(item._id)}
                className="w-full text-left bg-gray-100 p-2 mt-2 border-b flex justify-between items-center"
              >
                <span>{expanded === item._id ? "Hide" : "Show"} Details</span>
                {expanded === item._id ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {expanded === item._id && (
                <div className="p-4 max-h-60 overflow-y-auto transition-all duration-300 ease-in-out bg-white border border-gray-300 rounded-lg shadow-md">
                  {item.variableType === "CSV" && item.variableValue && renderCSVTable(item.variableValue)}
                  {item.variableType === "STRING" && item.variableValue && (
                    <Markdown remarkPlugins={[remarkGfm]}>{item.variableValue}</Markdown>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeywordInsights;
