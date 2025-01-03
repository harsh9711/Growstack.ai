
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { API_URL } from "@/lib/api";
import DotsLoader from "@/components/DotLoader";
import Swal from "sweetalert2";
import rehypeRaw from "rehype-raw";
import instance from "@/config/axios.config";
import LinkedInUI from "./LinkedInUI";
import toast from "react-hot-toast";

interface DataItem {
  variableExtras: {
    needToSelect?: boolean;
    fieldToSelect?: string[];
  };
  _id: string;
  variableName: string;
  variableType: string;
  variableValue: string;
  needToSelect: boolean;
}
interface KeywordInsightsProps {
  runnerAgentId: string;
  setLoader: (loading: boolean) => void;
  setProgressbar: React.Dispatch<React.SetStateAction<number>>;
  setProgressbarPercentage: React.Dispatch<React.SetStateAction<number>>;
}
const KeywordInsights: React.FC<KeywordInsightsProps> = ({ runnerAgentId, setLoader,setProgressbarPercentage }) => {
  const [data, setData] = useState<{ result: DataItem[] } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string[]>([]); // State to track expanded accordion
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [progressbar, setProgressbar] = useState<number>(0)
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchData = async () => {
      setLoader(true)

      try {
        setLoading(true);
        setError(null);

        const response = await instance.get(
          `${API_URL}/agents/api/v1/run/status/${runnerAgentId}`
        );

        const fetchedData = response.data.data;
        setProgressbar(response.data.data.percentageCompletion)
        setProgressbarPercentage(response.data.data.percentageCompletion)

        // Only update the state with new data
        if (fetchedData?.result) {
          setData((prevData) => {
            const newItems = fetchedData.result.filter(
              (item: { _id: string }) =>
                !prevData?.result?.some((prevItem) => prevItem._id === item._id)
            );
            return {
              ...fetchedData,
              result: [...(prevData?.result || []), ...newItems],
            };
          });
        }

        // Stop polling if the status is "COMPLETED" or "FAILED"
        if (fetchedData.status === "COMPLETED") {
          clearInterval(intervalId);
          setLoader(false)
          setLoading(false); // Ensure loading state is reset
        }

        if (fetchedData.status === "FAILED") {
          console.warn("The workflow has failed. Please check the fields and try again.");
          setLoading(false); // Ensure loading state is reset
          clearInterval(intervalId);
          setLoader(false)
          toast.error("Please re-run the agent.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data.");
        clearInterval(intervalId);
        setLoader(false)
        setLoading(false); // Ensure loading state is reset
      } finally {
      }
    };

    fetchData(); // Initial fetch

    intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId); // Cleanup on unmount or dependency change
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
    setLoader(false)

    toast.success("Submitted the resume for re-run.")
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
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="">
          {data?.result?.map((item: any) => (
            <div key={item._id} className="mb-6">
              <h1 className="font-medium text-gray-900">
                <b>{item.variableName}</b>
              </h1>
              <div>
                <div key={item._id}>
                  <button
                    type="button"
                    onClick={() => toggleAccordion(item._id)}
                    className="w-full text-left bg-gray-100 p-2 mt-2 border-b rounded-lg p-2 flex justify-between items-center mb-2"
                  >
                 
                    <span>{expanded.includes(item._id) ? "Hide" : "Show"} Details</span>
                    {expanded.includes(item._id) ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                  {expanded.includes(item._id) && (
                    <>
                      <div className="p-4 overflow-y-auto mt-1 transition-all duration-300 ease-in-out bg-white border border-gray-300 rounded-lg shadow-md">
                        {item.variableType === "CSV" && item.variableValue && renderCSVTable(item.variableValue, item.variableExtras)}

                        {(item.variableType === "STRING" || item.variableType === "LONG_TEXT") && item.variableValue && (
                          <Markdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw]}
                          >
                            {item.variableValue}
                          </Markdown>
                        )}
                        {item.variableType === "LINKEDIN_DATA" && item.variableValue && (
                          <LinkedInUI profileData={item.variableValue} />
                        )}
                      </div>
                      {item?.variableExtras?.needToSelect && (
                        <div className="mt-4">
                          <button
                            type="button"
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
            </div>
          ))}
          {/* <LinkedInUI profileData={profileData} /> */}
          {loading && <>{'Loading Remaning items '}<DotsLoader /></>}
        </div>
      </div>
    </>

  );
};

export default KeywordInsights;
function setLoader(arg0: boolean) {
  throw new Error("Function not implemented.");
}

