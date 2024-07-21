"use client";

import { useEffect, useState, Fragment } from "react";
import instance from "@/config/axios.config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  ArrowLeft,
  ChevronRight,
  Download,
  Info,
  Languages,
  Save,
} from "lucide-react";
import Link from "next/link";
import { BsStarFill } from "react-icons/bs";
import Editor from "./components/Editor";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/lib/api";
import { EditorState, convertToRaw } from "draft-js";
import { saveAs } from "file-saver"; // Import file-saver library for downloading files
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { HiOutlineRefresh } from "react-icons/hi";
import TemplateLoader from "../../text-to-video/components/TemplateLoader";
import { FaCircleNotch } from "react-icons/fa";

const Dropdown = ({
  label,
  items,
  infoIcon,
  hideLabel,
  value,
  onChange,
}: any) => (
  <div className="space-y-3">
    {!hideLabel && (
      <h2 className="font-medium flex items-center gap-2">
        {label}{" "}
        {!!infoIcon ? (
          <Info size={18} className="text-primary-black text-opacity-50" />
        ) : null}
      </h2>
    )}
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full border-none">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item: any, index: number) => (
          <SelectItem value={item} key={index}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default function AiAppPage({
  params: { assistantId },
}: {
  params: { assistantId: string };
}) {
  const [assistant, setAssistant] = useState<any>({});
  const [userPrompts, setUserPrompts] = useState<string[]>([]); // Initialize as empty array
  const [editorState, setEditorState] = useState(EditorState.createEmpty()); // Example state for editor content
  const [fileName, setFileName] = useState(""); // State for file name input
  const [loading, setLoading] = useState(true);
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [userInput, setUserInput] = useState({
    user_prompt: "",
    language: "english",
    model: "gpt-3.5-turbo",
    creativity: "Original",
    tone_of_voice: "Casual",
    number_of_results: 1,
    estimated_result_length: 400,
  });
  const [isLoading, setIsLoading] = useState(false);

  const stripHtmlTags = (html: string) => {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  };
  const handleChange = (e: { target: { value: string; name: any } }) => {
    let newValue = parseInt(e.target.value, 10);

    if (newValue < 0) {
      newValue = 0;
    }

    setUserInput({ ...userInput, [e.target.name]: newValue });
  };
  // const handleChange2 = (e: { target: { value: string; }; }) => {
  //   let newValue = parseInt(e.target.value, 10);

  //   if (newValue < 0) {
  //     newValue = 0;
  //   }
  //   setUserInput({ ...userInput, estimated_result_length: newValue });
  // };

  useEffect(() => {
    const fetchAssistant = async () => {
      try {
        const assistId = window.location.href.split("/").pop();
        const response = await instance.get(
          `${API_URL}/ai/api/v1/chat-template/${assistId}`
        );
        const assistantData = response.data.data;
        console.log("check repsonse", response.data.data.inputs[0].field_type);
        console.log(assistantData);
        setAssistant(assistantData);
        setUserPrompts(assistantData.inputs.map(() => ""));
      } catch (error) {
        console.error("Error fetching assistant data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssistant();
  }, [assistantId]);

  const handleDownload = (selectedOption: string) => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const formattedContent = generatedContent;
    let plainTextContent = stripHtmlTags(formattedContent);

    // Prepare different formats
    const formats = {
      "Copy as Text": plainTextContent,
      "Copy as HTML": formattedContent,
      "Download as DOC": plainTextContent,
      "Download as TXT": plainTextContent,
      "Download as PDF": plainTextContent,
    };

    const addTextToPdf = (content: string) => {
      const pdfDoc = new jsPDF();
      let yPos = 10;
      const pageHeight = pdfDoc.internal.pageSize.height;

      const lines = pdfDoc.splitTextToSize(content, 180);
      lines.forEach((line: string | string[]) => {
        if (yPos + 10 > pageHeight) {
          pdfDoc.addPage();
          yPos = 10;
        }
        pdfDoc.text(line, 10, yPos);
        yPos += 10;
      });

      return pdfDoc;
    };

    switch (selectedOption) {
      case "Copy as Text":
        navigator.clipboard.writeText(formats["Copy as Text"]);
        alert("Text copied to clipboard!");
        break;
      case "Copy as HTML":
        navigator.clipboard.writeText(formats["Copy as HTML"]);
        alert("HTML copied to clipboard!");
        break;
      case "Download as DOC":
        const docContent = formats["Download as DOC"];
        const docBlob = new Blob([docContent], {
          type: "application/msword;charset=utf-8",
        });
        saveAs(docBlob, `${fileName}.doc`);
        break;
      case "Download as TXT":
        const txtBlob = new Blob([formats["Download as TXT"]], {
          type: "text/plain;charset=utf-8",
        });
        saveAs(txtBlob, `${fileName}.txt`);
        break;
      case "Download as PDF":
        const pdfDoc = addTextToPdf(formats["Download as PDF"]);
        pdfDoc.save(`${fileName}.pdf`);
        break;
      default:
        console.error("Unsupported download option");
    }
  };

  // const handleSubmit = async () => {
  //   try {
  //     const formattedUserPrompt = assistant.inputs.map((input: any, index: number) => `${input.title}:${userPrompts[index]}`).join(".");

  //     const response = await instance.post(
  //       `${API_URL}/ai/api/v1/chat-template/generate/${assistant._id}`,
  //       {
  //         ...userInput,
  //         user_prompt: formattedUserPrompt,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //       }
  //     );
  //     console.log("Generated Data Article:", response.data);
  //     setGeneratedContent(response.data);

  //   } catch (error) {
  //     console.error("Error generating template:", error);
  //   }
  // };
  // ;
  const handleGenerateClick = () => {
    // Set isLoading to true to indicate loading has started
    setIsLoading(true);

    // Perform your generate action here (e.g., fetch data, compute something)
    // Simulate loading delay (remove this in actual implementation)
    setTimeout(() => {
      // After some action is completed, set isLoading back to false
      setIsLoading(false);
    }, 2000); // Example: Simulating loading for 2 seconds
  };
  const handleSubmit = async () => {
    try {
      const formattedUserPrompt = assistant.inputs
        .map(
          (input: any, index: number) => `${input.title}:${userPrompts[index]}`
        )
        .join(".");
      const response = await instance.post(
        `${API_URL}/ai/api/v1/chat-template/generate/${assistant._id}`,
        {
          ...userInput,
          user_prompt: formattedUserPrompt,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const chatId = response.data.data;
      const eventSource = new EventSource(
        `${API_URL}/ai/api/v1/chat-template/generate/stream/${chatId}`
      );
      let content = "<ol><strong>"; // Start with an ordered list
      eventSource.onerror = (event) => {
        eventSource.close();
      };
      eventSource.onmessage = (event) => {
        let data = event.data;
        console.log(data);

        // Clean up the data to ensure it is properly formatted
        data = data
          .replace(/<li>\s*/g, "<li>") // Remove spaces after <li>
          .replace(/\s*<\/li>/g, "</li><br>") // Add space before </li> by adding a <br> tag
          .replace(/<ol>\s*/g, "<ol>") // Remove spaces after <ol>
          .replace(/\s*<\/ol>/g, "</ol>"); // Remove spaces before </ol>

        // Add the cleaned data to content
        content += data;

        // Set the generated content with the final formatted HTML
        setGeneratedContent(content + "</strong></ol>");
      };
    } catch (error) {
      console.error("Error generating template:", error);
    }
  };

  const handleEditorChange = (content: string) => {
    setGeneratedContent(content);
  };
  const [userInput1, setUserInput1] = useState({
    language: "English (USA)", // Set your default language here
  });
  const handleDropdownChange = (field: string, value: any) => {
    setUserInput1((prevInput) => ({
      ...prevInput,
      [field]: value,
    }));
  };

  const handleUserPromptChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const { value } = e.target;
    setUserPrompts((prevPrompts) => {
      const updatedPrompts = [...prevPrompts];
      updatedPrompts[index] = value;
      return updatedPrompts;
    });
  };
  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const option = e.target.value.trim();
    setUserPrompts((prevPrompts) => {
      const updatedPrompts = [...prevPrompts];
      if (e.target.checked) {
        if (!updatedPrompts[index].includes(option)) {
          updatedPrompts[index] += `${option},`;
        }
      } else {
        updatedPrompts[index] = updatedPrompts[index].replace(`${option},`, "");
      }
      return updatedPrompts;
    });
  };

  const handleRadioChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setUserPrompts((prevPrompts) => {
      const updatedPrompts = [...prevPrompts];
      updatedPrompts[index] = e.target.value.trim();
      return updatedPrompts;
    });
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const { value } = e.target;
    setUserPrompts((prevPrompts) => {
      const updatedPrompts = [...prevPrompts];
      updatedPrompts[index] = value.trim();
      return updatedPrompts;
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  const handleBothActions = () => {
    handleGenerateClick(); // Call ghandleGenerate function
    handleSubmit(); // Call handleSubmit function
  };
  return (
    <Fragment>
      <div className="flex items-center justify-between mt-10">
        <p className="flex items-center gap-2 text-[#4B465C] text-opacity-50 text-[15px]">
          <Link
            href="/app/plan/ai-apps"
            className="hover:text-gray-600 transition-all"
          >
            All apps
          </Link>
          <ChevronRight size={20} />{" "}
          <span className="text-[#3D817B] font-medium">{assistant.name}</span>
        </p>
        <Link href="/app/plan/ai-apps">
          <button className="text-primary-green hover:bg-primary-green/10 sheen flex gap-2 px-3.5 py-2.5 rounded-full font-semibold items-center">
            <ArrowLeft size={20} /> Back
          </button>
        </Link>
      </div>
      <div className="flex gap-5 mt-6">
        <div className="w-full max-w-[600px] p-8 bg-white rounded-2xl border border-[#EDEFF0] space-y-4">
          <div className="mb-5 border-b border-[#EDEFF0]">
            <div className="flex items-center justify-between pb-5">
              <div className="flex flex-row items-center gap-3">
                <div
                  className="rounded"
                  dangerouslySetInnerHTML={{ __html: assistant.icon }}
                />

                <h2 className="text-2xl font-semibold capitalize">
                  {assistant.name}
                </h2>
              </div>
              <BsStarFill size={24} className="text-yellow-300" />
            </div>
            <p className="mb-5 text-md">{assistant.description}</p>
          </div>
          <div className="mb-5 space-y-6">
            <p className="flex items-center gap-2 bg-[#F2F2F2] p-4 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="22"
                viewBox="0 0 21 22"
                fill="none"
              >
                <path
                  d="M8.63825 1.48828H15.3662L11.117 7.50803H15.3662L5.23886 18.7685L8.70907 11.1199H4.88477L8.63825 1.48828Z"
                  fill="#F9DE6F"
                  stroke="#F9DE6F"
                  strokeWidth="0.791016"
                  strokeMiterlimit="10"
                />
              </svg>
              <span className="text-sm">
                <span>Your balance is </span>
                <span className="font-semibold">
                  Unlimited GPT 3.5 Turbo Words
                </span>
              </span>
            </p>
            <div className="flex items-center gap-2">
              <Switch />
              <label htmlFor="include-brand" className="text-sm">
                Include your brand
              </label>
            </div>
          </div>
          <div>
            <Dropdown
              label="Language"
              items={[
                "English (USA)",
                "Spanish",
                "French",
                "German",
                "Italian",
                "Chinese (Simplified)",
                "Chinese (Traditional)",
                "Japanese",
                "Korean",
                "Portuguese",
                "Russian",
                "Arabic",
                "Hindi",
                "Bengali",
                "Urdu",
                "Indonesian",
                "Dutch",
                "Turkish",
                "Vietnamese",
                "Thai",
                "Greek",
                "Swedish",
                "Norwegian",
                "Danish",
                "Finnish",
                "Polish",
                "Czech",
                "Hungarian",
                "Romanian",
                "Hebrew",
                "Malay",
                "Filipino",
                "Swahili",
                "Zulu",
                "Afrikaans",
                "Serbian",
                "Croatian",
                "Bulgarian",
                "Slovak",
                "Slovenian",
                "Lithuanian",
                "Latvian",
                "Estonian",
                "Icelandic",
                "Irish",
                "Welsh",
                "Maltese",
                "Luxembourgish",
                "Catalan",
                "Galician",
                "Basque",
                "Scottish Gaelic",
                "Breton",
                "Corsican",
                "Esperanto",
                "Latin",
              ]}
              value={userInput1.language}
              onChange={(value: any) => handleDropdownChange("language", value)}
            />
          </div>
          <div className="space-y-3">
            {assistant.inputs.map((input: any, index: number) => (
              <div key={index}>
                <label
                  className="font-medium flex justify-between"
                  htmlFor={`user-prompt-${index}`}
                >
                  {input.title}
                  <span className="text-primary-black text-opacity-50 text-sm">
                    0/2000
                  </span>
                </label>
                {input.field_type === "Checkbox list field" ? (
                  <div className="flex flex-col space-y-2">
                    {input.description
                      .split(",")
                      .map((option: string, optionIndex: number) => (
                        <label
                          key={optionIndex}
                          className="flex items-center mt-4"
                        >
                          <input
                            type="checkbox"
                            value={option.trim()}
                            checked={userPrompts[index]?.includes(
                              option.trim()
                            )}
                            onChange={(e) => handleCheckboxChange(e, index)}
                          />
                          <span className="ml-2">{option.trim()}</span>
                        </label>
                      ))}
                  </div>
                ) : null}
                {input.field_type === "Radio buttons field" && (
                  <div className="flex flex-col space-y-2">
                    {input.description
                      .split(",")
                      .map((option: string, optionIndex: number) => (
                        <label
                          key={optionIndex}
                          className="flex items-center mt-4"
                        >
                          <input
                            type="radio"
                            value={option.trim()}
                            checked={userPrompts[index] === option.trim()}
                            onChange={(e) => handleRadioChange(e, index)}
                          />
                          <span className="ml-2">{option.trim()}</span>
                        </label>
                      ))}
                  </div>
                )}
                {input.field_type === "Select list field" && (
                  <Dropdown
                    label={input.title}
                    items={input.description
                      .split(",")
                      .map((option: string) => option.trim())}
                    value={userPrompts[index]}
                    onChange={(value: any) => handleSelectChange(value, index)}
                  />
                )}
                {input.field_type !== "Checkbox list field" &&
                  input.field_type !== "Radio buttons field" &&
                  input.field_type !== "Select list field" && (
                    <textarea
                      id={`user-prompt-${index}`}
                      rows={4}
                      className="w-full p-4 rounded-xl resize-none bg-[#F2F2F2]"
                      placeholder={input.description}
                      value={userPrompts[index]}
                      onChange={(e) => handleUserPromptChange(e, index)}
                    ></textarea>
                  )}
              </div>
            ))}
          </div>

          <div>
            <Dropdown
              label="AI Model"
              items={[
                "gpt-3.5-turbo",
                "gpt-3.5-turbo-instruct",
                "gpt-4",
                "gpt-4-turbo",
                "gpt-4o",
              ]}
              value={userInput.model}
              onChange={(value: any) => handleDropdownChange("model", value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Dropdown
              label="Creativity"
              infoIcon
              items={["Original", "Creative"]}
              value={userInput.creativity}
              onChange={(value: any) =>
                handleDropdownChange("creativity", value)
              }
            />
            <Dropdown
              label="Tone of Voice"
              infoIcon
              items={["Professional", "Friendly", "Casual"]}
              value={userInput.tone_of_voice}
              onChange={(value: any) =>
                handleDropdownChange("tone_of_voice", value)
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="number-of-results"
              >
                Number of Results
              </label>
              <Input
                type="number"
                id="number-of-results"
                name="number_of_results"
                value={userInput.number_of_results}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium"
                htmlFor="estimated-result-length"
              >
                Estimated Result Length
              </label>
              <Input
                type="number"
                id="estimated-result-length"
                name="estimated_result_length"
                value={userInput.estimated_result_length}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            className="w-full h-14 py-2 text-white bg-primary-green rounded-lg mt-5 flex items-center justify-center"
            onClick={handleBothActions}
          >
            <div className="flex items-center gap-2">
              {!isLoading ? (
                "Generate"
              ) : (
                <FaCircleNotch className="h-6 w-6 text-white animate-spin" />
              )}
            </div>
          </button>
        </div>
        <div className="w-full p-8 bg-white rounded-2xl border border-[#EDEFF0] flex flex-col">
          <div className="flex items-center justify-between mb-5 border-b pb-5">
            <div className="flex items-center gap-2 w-full max-w-fit">
              <input
                type="text"
                placeholder="Enter file name"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
              <Select>
                <SelectTrigger className="w-full border-none">
                  <SelectValue placeholder="All Workbooks" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Workbook">All Workbook</SelectItem>
                  <SelectItem value="Workbook 1">Workbook 1</SelectItem>
                  <SelectItem value="Workbook 2">Workbook 2</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Switch />
                <label
                  htmlFor="include-brand"
                  className="text-sm text-[#6E7687]"
                >
                  Internet Access
                </label>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Dropdown
                  label="Download"
                  items={[
                    "Copy as Text",
                    "Copy as HTML",
                    "Download as DOC",
                    "Download as TXT",
                    "Download as PDF",
                  ]}
                  hideLabel
                  value="Copy as Text"
                  onChange={(value: any) => handleDownload(value)}
                />

                <button className="p-2 bg-gray-100 border rounded-lg">
                  <Save size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <Editor content={generatedContent} onChange={handleEditorChange} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
