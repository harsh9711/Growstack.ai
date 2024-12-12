import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { ChevronDown, ChevronUp, Copy, RefreshCw } from "lucide-react";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import toast from "react-hot-toast";
import axios from "axios";
import instance, { CustomAxiosInstance } from "@/config/axios.config";

const OutputDetails = ({
  outputDetailsData,
  executionId,
  workflowId,
  onPollingWithNewId,
  setApproveOutputDataId,
}: any) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRejectLoading, setIsRejectLoading] = useState(false);
  const [isApproveLoading, setIsApproveLoading] = useState(false);

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

  const handleRerun = async (nodeMasterId: string) => {
    setIsLoading(true);
    try {
      // const rerunPartialWorkflow = await CustomAxiosInstance().post(
      //   `/workflow/${workflowId}/run?previousExecutionId=&${executionId}&startNodeId=${nodeMasterId}`
      // );
      const rerunPartialWorkflow = await instance.post(
        `/workflow/${workflowId}/run?previousExecutionId=${executionId}&startNodeId=${nodeMasterId}`
      );
      if (rerunPartialWorkflow?.data?.executionId) {
        onPollingWithNewId(rerunPartialWorkflow?.data?.executionId);
      }
    } catch (error: any) {
      if (error?.response) {
        toast.error(error?.response?.data?.error);
      } else if (error?.message) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleReject = async (nodeExecutionId: string) => {
    try {
      setIsRejectLoading(true);
      // const rejectExecution = await CustomAxiosInstance().patch(
      //   `/workflow/${workflowId}/post/status?nodeExecutionId=${nodeExecutionId}&isApproved=false`
      // );
      const rejectExecution = await instance.patch(
        `/workflow/${workflowId}/post/status?nodeExecutionId=${nodeExecutionId}&isApproved=false`
      );
      setApproveOutputDataId(rejectExecution?.data);
    } catch (error: any) {
      if (error?.response) {
        toast.error(error?.response?.data?.error);
      } else if (error?.message) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsRejectLoading(false);
    }
  };
  const handleApprove = async (nodeExecutionId: string) => {
    try {
      setIsApproveLoading(true);
      // const approveExecution = await axios.patch(
      //   `http://localhost:5000/workflow/${workflowId}/post/status?nodeExecutionId=${nodeExecutionId}&isApproved=true`
      // );
      const approveExecution = await instance.patch(
        `/workflow/${workflowId}/post/status?nodeExecutionId=${nodeExecutionId}&isApproved=true`
      );
      setApproveOutputDataId(approveExecution?.data);
    } catch (error: any) {
      if (error?.response) {
        toast.error(error?.response?.data?.error);
      } else if (error?.message) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsApproveLoading(false);
    }
  };

  const handleCopy = (value: any) => {
    if (value !== undefined && value !== null) {
      const textToCopy =
        typeof value === "object"
          ? JSON.stringify(value, null, 2)
          : String(value);
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          console.log("copied");
        })
        .catch(err => {
          console.error("Failed to copy: ", err);
        });
      toast.success("Copied to clipboard");
    } else {
      toast.error("Nothing to copy");
    }
  };

  const renderSocialMediaContent = (content: any) => {
    if (typeof content === "string") {
      return <div>{content}</div>;
    } else if (Array.isArray(content)) {
      return (
        <div>
          {content.map((item, index) => (
            <div key={index}>{renderSocialMediaContent(item)}</div>
          ))}
        </div>
      );
    } else if (typeof content === "object" && content !== null) {
      return (
        <div>
          {Object.entries(content).map(([key, value]) => (
            <div key={key}>
              <strong>{key}: </strong>
              {renderSocialMediaContent(value)}
            </div>
          ))}
        </div>
      );
    } else {
      return <div>Unsupported content type</div>;
    }
  };
  return (
    <>
      <div className="w-full bg-white border-l-4 border-[#FB8491] rounded-lg shadow-md p-4 relative overflow-hidden">
        {/* Green Left Side Accent */}
        <h2 className="text-lg font-bold mb-4">Output Details</h2>
        <div className="space-y-2">
          {outputDetailsData?.outputDetails?.map((item: any, index: number) => {
            return (
              item.title &&
              (item?.status === "completed" ||
                item?.status === "approval-pending") && (
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
                        {(() => {
                          if (
                            item?.nodeType === "linkedin" ||
                            item?.nodeType === "gmail"
                          ) {
                            return (
                              <div>
                                {renderSocialMediaContent(
                                  item?.socialMediaContent
                                )}
                              </div>
                            );
                          }
                          if (typeof item?.value === "string") {
                            // Render string using ReactMarkdown
                            return (
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm, remarkBreaks]}
                                rehypePlugins={[rehypeRaw]}
                              >
                                {formatToMarkdown(item?.value)}
                              </ReactMarkdown>
                            );
                          } else if (Array.isArray(item?.value)) {
                            if (
                              item?.value.every(
                                (val: any) =>
                                  typeof val === "string" &&
                                  val.startsWith("https://")
                              )
                            ) {
                              // Render array of URLs
                              return (
                                <ul>
                                  {item?.value.map(
                                    (url: string, idx: number) => (
                                      <li key={idx}>
                                        <a
                                          href={url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="text-blue-500 underline"
                                        >
                                          {url}
                                        </a>
                                      </li>
                                    )
                                  )}
                                </ul>
                              );
                            } else if (
                              item?.value.every(
                                (val: any) =>
                                  typeof val === "object" && val !== null
                              )
                            ) {
                              // Render array of objects as key-value pairs
                              return (
                                <ul>
                                  {item?.value.map((obj: any, idx: number) => (
                                    <li key={idx} className="mb-2">
                                      {Object.entries(obj).map(
                                        ([key, value]: any) => (
                                          <div key={key}>
                                            <strong>{key}:</strong>{" "}
                                            {JSON.stringify(value)}
                                          </div>
                                        )
                                      )}
                                    </li>
                                  ))}
                                </ul>
                              );
                            } else {
                              // Fallback for mixed content arrays
                              return (
                                <ul>
                                  {item?.value.map((val: any, idx: number) => (
                                    <li key={idx}>{JSON.stringify(val)}</li>
                                  ))}
                                </ul>
                              );
                            }
                          } else if (
                            typeof item?.value === "object" &&
                            item?.value !== null
                          ) {
                            // Render single object as key-value pairs
                            return (
                              <div>
                                {item?.value &&
                                Object?.keys(item?.value)?.length > 0
                                  ? Object?.entries(item?.value)?.map(
                                      ([key, value]: any) => (
                                        <div key={key}>
                                          <strong>{key}:</strong>{" "}
                                          {typeof value === "string" ? (
                                            value.startsWith("http") ? (
                                              <a
                                                href={value}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                              >
                                                {value}
                                              </a>
                                            ) : (
                                              value
                                            )
                                          ) : typeof value === "object" ? (
                                            <div className="ml-4">
                                              {value &&
                                              Object?.keys(value)?.length > 0
                                                ? Object?.entries(value)?.map(
                                                    ([
                                                      nestedKey,
                                                      nestedValue,
                                                    ]: any) => (
                                                      <div key={nestedKey}>
                                                        <strong>
                                                          {nestedKey}:
                                                        </strong>{" "}
                                                        {typeof nestedValue ===
                                                        "string" ? (
                                                          nestedValue.startsWith(
                                                            "http"
                                                          ) ? (
                                                            <a
                                                              href={nestedValue}
                                                              target="_blank"
                                                              rel="noopener noreferrer"
                                                            >
                                                              {nestedValue}
                                                            </a>
                                                          ) : (
                                                            nestedValue
                                                          )
                                                        ) : (
                                                          JSON.stringify(
                                                            nestedValue,
                                                            null,
                                                            2
                                                          )
                                                        )}
                                                      </div>
                                                    )
                                                  )
                                                : null}
                                            </div>
                                          ) : (
                                            JSON.stringify(value, null, 2)
                                          )}
                                        </div>
                                      )
                                    )
                                  : null}
                              </div>
                            );
                          } else {
                            // Fallback: Display JSON stringified value
                            return (
                              <pre>{JSON.stringify(item?.value, null, 2)}</pre>
                            );
                          }
                        })()}
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
                            className={isLoading ? "animate-spin" : ""}
                            style={
                              isLoading
                                ? {
                                    animationDuration: "infinite",
                                    animationTimingFunction: "linear",
                                  }
                                : {}
                            }
                            disabled={
                              isRejectLoading || isLoading || isApproveLoading
                            }
                            onClick={() => handleRerun(item?.nodeMasterId)}
                          >
                            <RefreshCw color="#4B465C" />
                          </button>
                        </div>
                        {item?.approvalRequired === "true" &&
                          item?.approvalStatus === "pending" && (
                            <div className="flex gap-4 items-center px-4 py-4">
                              <button
                                onClick={() => {
                                  handleReject(item?.nodeExecutionId);
                                }}
                                className="text-red-500 p-5 rounded-xl border border-red-500 flex items-center justify-center"
                                disabled={
                                  isRejectLoading ||
                                  isLoading ||
                                  isApproveLoading
                                }
                              >
                                {isRejectLoading ? (
                                  <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  "Reject"
                                )}
                              </button>

                              <button
                                onClick={() => {
                                  handleApprove(item?.nodeExecutionId);
                                }}
                                className="text-[#2DA771] p-5 rounded-xl border border-[#2DA771] flex items-center justify-center"
                                disabled={
                                  isRejectLoading ||
                                  isLoading ||
                                  isApproveLoading
                                }
                              >
                                {isApproveLoading ? (
                                  <div className="w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  "Approve"
                                )}
                              </button>
                            </div>
                          )}
                      </div>
                    </div>
                  )}
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default OutputDetails;
