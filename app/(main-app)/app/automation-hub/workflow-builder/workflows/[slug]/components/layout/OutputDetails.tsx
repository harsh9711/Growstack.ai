import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { ChevronDown, ChevronUp } from "lucide-react";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

const AccordionComponent = ({ runSummaryData }: any) => {
  // Convert object to key-value pairs array
  const variables: any = runSummaryData?.variables
    ? Object.entries(runSummaryData.variables).map(([key, value]) => ({
      title: key,
      content: value,
    }))
    : [];

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
  return (
    <>
      {runSummaryData?.status === "completed" && (
        <div className="w-full bg-white border-l-4 border-[#FB8491] rounded-lg shadow-md p-4 relative overflow-hidden">
          {/* Green Left Side Accent */}
          <h2 className="text-lg font-bold mb-4">Output Details</h2>
          <div className="space-y-2">
            {variables.map((item: any, index: number) => (
              <div
                key={index}
                className={`border rounded-lg ${openIndex === index ? "border-blue-400" : "border-gray-200"
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
                  <div className="p-4 border-t border-gray-200">
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkBreaks]}
                        rehypePlugins={[rehypeRaw]}

                      >
                        {/* {formatToMarkdown(item?.content)} */}
                        {JSON.stringify(item?.content)}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AccordionComponent;
