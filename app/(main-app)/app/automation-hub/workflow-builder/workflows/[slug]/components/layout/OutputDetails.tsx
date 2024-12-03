import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { ChevronDown, ChevronUp, Copy, RefreshCw } from "lucide-react";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import toast from "react-hot-toast";
import axios from "axios";

const OutputDetails = ({
  outputDetailsData,
  executionId,
  workflowId,
  onPollingWithNewId,
}: any) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const formatToMarkdown = (text: string) => {
    // First remove the markdown code block syntax if present
    let cleanText = text.replace(/^```markdown\n|\n```$/g, "");
    // Convert escaped newlines to actual newlines
    cleanText = cleanText.replace(/\\n/g, "\n");
    // Format lists as before
    cleanText = cleanText.replace(/(-\s|\d+\.\s)/g, "\n$1");
    cleanText = cleanText.replace(/(\n- |\n\d+\.\s)/g, "\n\n$1");
    return cleanText.trim();
  };

  const handleCopy = (content: string) => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        toast.success("Content copied to clipboard");
      })
      .catch(err => {
        toast.error("Failed to copy content");
        console.error("Failed to copy content: ", err);
      });
  };

  const handleRerun = async (nodeMasterId: string) => {
    try {
      const rerunPartialWorkflow = await axios.post(
        `http://localhost:5000/workflow/${workflowId}/run?previousExecutionId=&${executionId}&startNodeId=${nodeMasterId}`
      );
      if (rerunPartialWorkflow?.data?.executionId) {
        onPollingWithNewId(rerunPartialWorkflow?.data?.executionId);
      }
    } catch {
      // To:Do Error will handle here
    }
  };

  return (
    <>
      {outputDetailsData?.status === "completed" && (
        <div className="w-full bg-white border-l-4 border-[#FB8491] rounded-lg shadow-md p-4 relative overflow-hidden">
          {/* Green Left Side Accent */}
          <h2 className="text-lg font-bold mb-4">Output Details</h2>
          <div className="space-y-2">
            {outputDetailsData?.outputDetails?.map(
              (item: any, index: number) => (
                <div
                  key={index}
                  className={`border rounded-lg ${
                    openIndex === index ? "border-blue-400" : "border-gray-200"
                  }`}
                >
                  {/* Accordion Header */}
                  <div
                    className="flex justify-between items-center p-4 cursor-pointer"
                    onClick={() => toggleAccordion(index)}
                  >
                    <h3 className="text-sm font-medium">{item.title}</h3>
                    {openIndex === index ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronUp size={18} />
                    )}
                  </div>

                  {/* Accordion Content */}
                  {openIndex === index && (
                    <div className=" border-t border-gray-200">
                      <div className="p-4 prose prose-sm max-w-none">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm, remarkBreaks]}
                          rehypePlugins={[rehypeRaw]}
                        >
                          {formatToMarkdown(item?.value)}
                        </ReactMarkdown>
                      </div>
                      <hr className="mt-4" />
                      <div className="flex gap-4 items-center px-4 py-6">
                        <button
                          className=""
                          onClick={() => handleCopy(item?.content)}
                        >
                          <Copy color="#4B465C" />
                        </button>
                        <button
                          className=""
                          onClick={() => handleRerun(item?.nodeMasterId)}
                        >
                          <RefreshCw color="#4B465C" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OutputDetails;
