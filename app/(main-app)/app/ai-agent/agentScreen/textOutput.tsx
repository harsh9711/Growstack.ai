
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { API_URL } from "@/lib/api";
import DotsLoader from "@/components/DotLoader";
import Swal from "sweetalert2";
import rehypeRaw from "rehype-raw";
import instance from "@/config/axios.config";

interface DataItem {
  variableExtras: (variableValue: string, variableExtras: any) => React.ReactNode;
  _id: string;
  variableName: string;
  variableType: string;
  variableValue: string;
  needToSelect: boolean;
}

const KeywordInsights = ({ runnerAgentId }: { runnerAgentId: string }) => {
  const [data, setData] = useState<{ result: DataItem[] } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null); // State to track expanded accordion
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await instance.get(
          `${API_URL}/agents/api/v1/run/status/${runnerAgentId}`
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

        }

        // Stop polling if the status is "COMPLETED"
        if (fetchedData.status === "COMPLETED") {
          clearInterval(intervalId);
          setLoading(false);

        }
        else if (fetchedData.status === "FAILED") {
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

  const handleSubmit = async () => {
    const cleanedRows = selectedRows.map(({ rowIndex, ...rest }) => rest)
    const cleanedRowsdata = cleanedRows.map((row, index) => {
      const job = row.selectedValues[index] || {}; // Handle case where selectedValues might be empty
      return {
        "title": job.title || "No Title Provided", // Fallback if title is missing
        "company_name": job.company_name || "Unknown Company", // Fallback if company_name is missing
        "description": job.description || "No Description Available" // Fallback if description is missing
      };
    });
    const payload = {
      "selectedJobsData": cleanedRowsdata
    }
    const response = await instance.post(
      `${API_URL}/agents/api/v1/run/resume/${runnerAgentId}`, payload
    );
  };
  const renderCSVTable = (csvData: string, extraItems: any) => {
    const rows = csvData.split("\n");
    const headers = rows[0].split(",").map((header) => header.trim());
    const bodyRows = rows.slice(1);
    const handleCheckboxChange = (rowIndex: number, cells: string[]) => {
      // Get the selected fields based on `fieldToSelect`
      const selectedValues = extraItems.fieldToSelect.map((field: string) => {
        const fieldIndex = headers.indexOf(field);
        return { [field]: cells[fieldIndex] };
      });

      // Toggle selection
      setSelectedRows((prevSelected) => {
        if (prevSelected.some((item) => item.rowIndex === rowIndex)) {
          return prevSelected.filter((item) => item.rowIndex !== rowIndex); // Deselect
        } else {
          return [...prevSelected, { rowIndex, selectedValues }]; // Select
        }
      });
    };
    const isLink = (text: string) => {
      const urlRegex = /^(https?:\/\/[^\s]+)/i;
      return urlRegex.test(text);
    };


    return (
      <div className="h-[400px] overflow-visible">
        <div className="max-h-[500px] snap-both overflow-visible">
          <table className=" w-full border-collapse border border-gray-300 mt-4">
            <thead className="sticky top-0 bg-gray-100 ">
              <tr>
                {extraItems?.needToSelect && (
                  <th className="border border-gray-300 p-3"></th>
                )} {/* Add checkbox header */}
                {headers.map((header, index) => (
                  <th
                    key={index}
                    className="border border-gray-300 p-3 text-left font-semibold text-gray-700"
                  >
                    <Markdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {header.replace(/["']/g, "").trim()}

                    </Markdown>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, rowIndex) => {
                const cells = parseCSVRow(row);
                return (
                  <tr
                    key={rowIndex}
                    className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    {extraItems?.needToSelect && (
                      <td className="border border-gray-300 p-3 text-gray-600">
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange(rowIndex, cells)}
                        />
                      </td>
                    )}
                    {cells.map((cell: string, cellIndex: number) => (
                      <td
                        key={cellIndex}
                        className="border border-gray-300 p-3 text-gray-600"
                      >
                        {isLink(cell) ? (
                          <a
                            href={cell}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {cell}
                          </a>
                        ) : (
                          <Markdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                          >
                            {cell}
                          </Markdown>
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>


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
        {data?.result?.map((item: any) => (
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
                <>
                <div className="p-4  overflow-y-auto mt-1 transition-all duration-300 ease-in-out bg-white border border-gray-300 rounded-lg shadow-md">
                  {item.variableType === "CSV" && item.variableValue && renderCSVTable(item.variableValue, item.variableExtras)}
                 
                  {(item.variableType === "STRING" || item.variableType === "LONG_TEXT") && item.variableValue && (
                    <Markdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                    >
                      {item.variableValue}
                    </Markdown>
                  )}
                </div>
                {item?.variableExtras?.needToSelect && (
                    <div className="mt-4">
                      <button type="button"
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </>

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
