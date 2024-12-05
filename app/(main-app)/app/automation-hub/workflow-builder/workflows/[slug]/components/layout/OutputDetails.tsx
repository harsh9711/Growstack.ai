import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { ChevronDown, ChevronUp, Copy, RefreshCw } from "lucide-react";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import toast from "react-hot-toast";
import axios from "axios";
import { CustomAxiosInstance } from "@/config/axios.config";

const OutputDetails = ({
  outputDetailsData,
  executionId,
  workflowId,
  onPollingWithNewId,
  setApproveOutputDataId,
}: any) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const formatToMarkdown = (text: string) => {
    // First remove the markdown code block syntax if present
    let cleanText = text?.replace(/^```markdown\n|\n```$/g, "");
    // Convert escaped newlines to actual newlines
    cleanText = cleanText?.replace(/\\n/g, "\n");
    // Format lists as before
    cleanText = cleanText?.replace(/(-\s|\d+\.\s)/g, "\n$1");
    cleanText = cleanText?.replace(/(\n- |\n\d+\.\s)/g, "\n\n$1");
    return cleanText?.trim();
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
      const rerunPartialWorkflow = await CustomAxiosInstance().post(
        `/workflow/${workflowId}/run?previousExecutionId=&${executionId}&startNodeId=${nodeMasterId}`
      );
      // const rerunPartialWorkflow = await instance.post(`/workflow/${workflowId}/run?previousExecutionId=&${executionId}&startNodeId=${nodeMasterId}`
      // );
      if (rerunPartialWorkflow?.data?.executionId) {
        onPollingWithNewId(rerunPartialWorkflow?.data?.executionId);
      }
    } catch {
      // To:Do Error will handle here
    }
  };
  const handleReject = async (nodeExecutionId: string) => {
    try {
      const rejectExecution = await CustomAxiosInstance().patch(
        `/workflow/${workflowId}/post/status?nodeExecutionId=${nodeExecutionId}&isApproved=false`
      );
      // const rejectExecution = await instance.patch(
      //   `/workflow/${workflowId}/post/status?nodeExecutionId=${nodeExecutionId}&isApproved=false`
      // );

      // const rejectExecution = await axios.patch(
      //   `/workflow/${workflowId}/post/status?nodeExecutionId=${nodeExecutionId}&isApproved=false`
      // );
      setApproveOutputDataId(rejectExecution?.data);
    } catch (err) {
      console.log("err", err);
    }
  };
  const handleApprove = async (nodeExecutionId: string) => {
    try {
      const approveExecution = await CustomAxiosInstance().patch(
        `/workflow/${workflowId}/post/status?nodeExecutionId=${nodeExecutionId}&isApproved=true`
      );
      setApproveOutputDataId(approveExecution?.data);

      // const approveExecution = await instance.patch(
      //   `/workflow/${workflowId}/post/status?nodeExecutionId=${nodeExecutionId}&isApproved=true`
      // );
      // const approveExecution = await axios.post(
      //   `http://localhost:5000/workflow/${workflowId}/approve?executionId=${executionId}`
      // );
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <>
      {(outputDetailsData?.status === "completed" ||
        outputDetailsData?.status === "awaiting-approval") && (
        <div className="w-full bg-white border-l-4 border-[#FB8491] rounded-lg shadow-md p-4 relative overflow-hidden">
          {/* Green Left Side Accent */}
          <h2 className="text-lg font-bold mb-4">Output Details</h2>
          <div className="space-y-2">
            {outputDetailsData?.outputDetails?.map(
              (item: any, index: number) => {
                return (
                  item.title && (
                    <div
                      key={index}
                      className={`border rounded-lg ${
                        openIndex === index
                          ? "border-blue-400"
                          : "border-gray-200"
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
                              {typeof item?.value === "string"
                                ? formatToMarkdown(item?.value)
                                : "Social Media Post"}
                            </ReactMarkdown>
                          </div>
                          <hr className="mt-4" />
                          <div className="flex justify-between">
                            <div className="flex gap-4 items-center px-4 py-6">
                              <button
                                className=""
                                onClick={() => handleCopy(item?.value)}
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
                            {item?.approvalRequired === "true" &&
                              item?.approvalStatus === "pending" && (
                                <div className="flex gap-4 items-center px-4 py-4">
                                  <button
                                    className="text-red-500 p-5 rounded-xl border border-red-500"
                                    onClick={() => {
                                      handleReject(item?.nodeExecutionId);
                                    }}
                                  >
                                    Reject
                                  </button>
                                  <button
                                    className="text-[#2DA771] p-5 rounded-xl border border-[#2DA771]"
                                    onClick={() => {
                                      handleApprove(item?.nodeExecutionId);
                                    }}
                                  >
                                    Approve
                                  </button>
                                </div>
                              )}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                );
              }
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OutputDetails;
