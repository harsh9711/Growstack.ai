
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { API_URL } from "@/lib/api";
import DotsLoader from "@/components/DotLoader";
import { Dot } from "lucide-react";
import Swal from "sweetalert2";
import rehypeRaw from "rehype-raw";

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

        const response = await axios.get(
          `${API_URL}/agents/api/v1/run/status/${runnerAgentId}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const fetchedData = response.data.data;

        // Only update the state with new data
        if (fetchedData?.result) {
          setData((prevData) => {
            const newItems = fetchedData.result.filter(
              (item: { _id: string; }) => !prevData?.result?.some((prevItem) => prevItem._id === item._id)
            );
            return {
              ...fetchedData,
              result: [...(prevData?.result || []), ...newItems],
            };
          });

          // Optionally toggle accordion for new items
          fetchedData.result.forEach((item: { _id: string; }) => toggleAccordion(item._id));
        }

        // Stop polling if the status is "COMPLETED"
        if (fetchedData.status === "COMPLETED") {
          clearInterval(intervalId);
          setLoading(false);

        }
        else if(fetchedData.status === "FAILED"){
          await Swal.fire({
            title: "Workflow",
            text: "The workflow has failed. Please check the fields and try again.",
            icon: "warning",
            showCancelButton: false,
            confirmButtonText: "Ok",
            cancelButtonText: "No",
          });
          
          clearInterval(intervalId);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data.");
      } finally {
      }
    };

    fetchData(); // Initial fetch

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, [runnerAgentId]);


  const renderCSVTable = (csvData: string) => {
    const rows = csvData.split("\n");
    const headers = rows[0].split(",").map(header => header.trim());
    const bodyRows = rows.slice(1);

    return (
<div className="overflow-x-auto h-[400px]">
  <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
    <thead className="sticky top-0 bg-gray-100 z-10">
      <tr>
        {headers.map((header, index) => (
          <th key={index} className="border border-gray-300 p-3 text-left font-semibold text-gray-700">
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="max-h-[calc(500px-40px)] overflow-y-auto"> {/* Adjusting body height */}
      {bodyRows.map((row, rowIndex) => {
        const cells = parseCSVRow(row);
        return (
          <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
            {cells.map((cell, cellIndex) => (
              <td key={cellIndex} className="border border-gray-300 p-3 text-gray-600">
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

  // if (loading) return <div>Loading...</div>;
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
                className="w-full text-left bg-gray-100 p-2 mt-2 border-b flex justify-between items-center mb-2"
              >
                <span>{expanded === item._id ? "Hide" : "Show"} Details</span>
                {expanded === item._id ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {expanded === item._id && (
                <div className="p-4  overflow-y-auto mt-1 transition-all duration-300 ease-in-out bg-white border border-gray-300 rounded-lg shadow-md">
                  {item.variableType === "CSV" && item.variableValue && renderCSVTable(item.variableValue)}
                  {item.variableType === "STRING" && item.variableValue && (
               <Markdown 
               remarkPlugins={[remarkGfm]} 
               rehypePlugins={[rehypeRaw]}
             >
               {item.variableValue}
             </Markdown>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && <>{'Loading Remaning items '}<DotsLoader /></>}
      </div>
    </div>
  );
};

export default KeywordInsights;
