"use client";
import { Input } from "@/components/ui/input";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import { EditorState, convertToRaw } from "draft-js";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { ArrowLeft, ChevronRight, Save, StarIcon } from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { BsStarFill } from "react-icons/bs";
import Editor from "./components/Editor";
import Spinner from "@/components/Spinner";
import { Switch } from "@/components/ui/switch";
import { Info } from "lucide-react";
import axios from 'axios';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  getSavedDecumentForEdit,
  isEditDecument,
} from "@/lib/features/documents/document.selector";
import {
  editDocument,
  savedDecument,
} from "@/lib/features/documents/document.slice";
import { useRouter } from "next-nprogress-bar";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { languageOptions } from "../../../create/ai-articles/constants/options";
import Dropdown from "./components/Dropdown";
import { Plus } from "lucide-react";
import downloadPdf from "@/utils/downloadPdf";

export default function AiAppPage({
  params: { appTemplateId },
}: {
  params: { appTemplateId: string };
}) {
  const router = useRouter();
  const isEdit = isEditDecument();
  const editDocumentData: any = getSavedDecumentForEdit();
  const dispatch = useDispatch();
  const [appTemplate, setAppTemplate] = useState<any>({});
  const [userPrompts, setUserPrompts] = useState<string[]>([]); // Initialize as empty array
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
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
  const [isGeneratedResultPending, setIsGeneratedResultPending] =
    useState(false);
  const [isDocumentSavePending, setIsDocumentSavePending] = useState(false);
  const [allBrandVoices, setAllBrandVoices] = useState<any>([]);
  const [brandName, setBrandName] = useState("");
  const [selectedBrandVoice, setSelectedBrandVoice] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [userInput1Error, setUserInput1Error] = useState("");
  const [userPromptError, setUserPromptError] = useState("");
  const [userInput1, setUserInput1] = useState("");
  const brandNames = allBrandVoices?.map((item: any) => item.brand_name);

  const stripHtmlTags = (html: string) => {
    const temp = document.createElement("div");
    temp.innerHTML = html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n\n");
    return temp.textContent || temp.innerText || "";
  };

  const handleChange = (e: { target: { value: string; name: any } }) => {
    let newValue = parseInt(e.target.value, 10);

    if (newValue < 0) {
      newValue = 0;
    }

    setUserInput({ ...userInput, [e.target.name]: newValue });
  };

  useEffect(() => {
    const findedBrandvoice = allBrandVoices?.find((item: any) => {
      return item.brand_name === brandName;
    });
    setSelectedBrandVoice(findedBrandvoice);
  }, [brandName]);

  useEffect(() => {
    const fetchAppTemplate = async () => {
      try {
        const assistId = window.location.href.split("/").pop();
        const response = await instance.get(
          `${API_URL}/ai/api/v1/chat-template/${assistId}`
        );
        const assistantData = response.data.data;
        setAppTemplate(assistantData);
        setUserPrompts(assistantData.inputs.map(() => ""));
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.error);
        } else {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAppTemplate();
  }, [appTemplateId]);

  useEffect(() => {
    const handleGetAllBrandVoices = async () => {
      try {
        const response = await instance.get(
          `${API_URL}/users/api/v1/brand-voice/all`
        );

        setAllBrandVoices(response?.data?.data);
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.error);
        } else {
          toast.error(error.message);
        }
        console.log("Error fetching Documents:", error);
      }
    };

    handleGetAllBrandVoices();
  }, []);

  useEffect(() => {
    if (isEdit) {
      setFileName(editDocumentData?.doc_name);
      setUserInput1(editDocumentData?.doc_language);
      // setWorkbook(editDocumentData?.workbook);
      setGeneratedContent(editDocumentData?.doc_content);
      dispatch(editDocument(false));
      dispatch(savedDecument(null));
    }
  }, [editDocumentData]);

  const handleDownload = async (selectedOption: string) => {
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
      "Download as HTML": formattedContent,
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
      case "Download as HTML":
          const htmlContent = formats["Download as HTML"];
          const htmlBlob = new Blob([htmlContent], {
            type: "text/html;charset=utf-8",
          });
          saveAs(htmlBlob, `${fileName}.html`);
        break;
      case "Download as TXT":
        const txtBlob = new Blob([formats["Download as TXT"]], {
          type: "text/plain;charset=utf-8",
        });
        saveAs(txtBlob, `${fileName}.txt`);
        break;
      case "Download as PDF":
        downloadPdf(plainTextContent,userInput,fileName);
        break;
      case "Save as PDF":
        handleSaveDocument("pdf");
        break;
      case "Save as DOC":
          handleSaveDocument("doc");
        break;
      case "Save as TXT":
        handleSaveDocument("text");
       break;
      case "Save as HTML":
        handleSaveDocument("html");
        break;
      default:
        console.error("Unsupported download option");
    }
  };

  // const handleDownload = (selectedOption: string) => {
  //   const contentState = editorState.getCurrentContent();
  //   const rawContentState = convertToRaw(contentState);
  //   const formattedContent = generatedContent;
  //   let plainTextContent = stripHtmlTags(formattedContent);

  //   // Prepare different formats
  //   const formats = {
  //     "Copy as Text": generatedContent,
  //     "Copy as HTML": formattedContent,
  //     "Download as DOC": plainTextContent,
  //     "Download as TXT": plainTextContent,
  //     "Download as PDF": plainTextContent,
  //   };

  //   const addTextToPdf = (content: string) => {
  //     const pdfDoc = new jsPDF();

  //     // Add the font to the PDF document
  //     pdfDoc.addFont('fonts/NotoSans-Regular.ttf', 'NotoSans', 'normal');
  //     pdfDoc.setFont('NotoSans');

  //     let yPos = 10;
  //     const pageHeight = pdfDoc.internal.pageSize.height;
  //     const lines = pdfDoc.splitTextToSize(content, 180);

  //     lines.forEach((line: string | string[]) => {
  //       if (yPos + 10 > pageHeight) {
  //         pdfDoc.addPage();
  //         yPos = 10;
  //       }
  //       pdfDoc.text(line, 10, yPos);
  //       yPos += 10;
  //     });

  //     return pdfDoc;
  //   };

  //   switch (selectedOption) {
  //     case "Copy as Text":
  //       navigator.clipboard.writeText(formats["Copy as Text"]);
  //       alert("Text copied to clipboard!");
  //       break;
  //     case "Copy as HTML":
  //       navigator.clipboard.writeText(formats["Copy as HTML"]);
  //       alert("HTML copied to clipboard!");
  //       break;
  //     case "Download as DOC":
  //       const docContent = formats["Download as DOC"];
  //       const docBlob = new Blob([docContent], {
  //         type: "application/msword;charset=utf-8",
  //       });
  //       saveAs(docBlob, `${fileName}.doc`);
  //       break;
  //     case "Download as TXT":
  //       const txtBlob = new Blob([formats["Download as TXT"]], {
  //         type: "text/plain;charset=utf-8",
  //       });
  //       saveAs(txtBlob, `${fileName}.txt`);
  //       break;
  //     case "Download as PDF":
  //       const pdfDoc = addTextToPdf(formats["Download as PDF"]);
  //       pdfDoc.save(`${fileName}.pdf`);
  //       break;
  //     default:
  //       console.error("Unsupported download option");
  //   }
  // };

  const generateResult = async () => {
    if (userInput1.trim() === "") {
      setUserInput1Error("Please Select Language");
      return;
    } else {
      setUserInput1Error("");
    }

    // if (userInput.user_prompt === ""){
    //   setUserPromptError('Please Enter Your Prompt');
    //   return;
    // } else {
    //   setUserPromptError('');
    // }

    setIsGeneratedResultPending(true);
    try {
      const formattedUserPrompt = appTemplate?.inputs
        .map(
          (input: any, index: number) => `${input.title}:${userPrompts[index]}`
        )
        .join(".");
      const response = await instance.post(
        `${API_URL}/ai/api/v1/chat-template/generate/${appTemplate._id}`,
        {
          ...userInput,
          user_prompt: formattedUserPrompt,
          brand_voice: selectedBrandVoice,
        }
      );
      const content = response.data.data;
      setGeneratedContent(content);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    } finally {
      setIsGeneratedResultPending(false);
    }
  };

  const handleEditorChange = (content: string) => {
    setGeneratedContent(content);
  };

  const handleDropdownChange = (field: string, value: any) => {
    setUserInput((prevInput) => ({
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

  const handleSelectChange = (value: string, index: number) => {
    setUserPrompts((prevPrompts) => {
      const updatedPrompts = [...prevPrompts];
      updatedPrompts[index] = value.trim();
      return updatedPrompts;
    });
  };

  const handleSaveDocument = async (fileType : string) => {
    if (!fileName) {
      return toast.error("Please enter document name");
    }
    setIsDocumentSavePending(true);
    try {
      const formattedContent = generatedContent;
      let plainTextContent = stripHtmlTags(formattedContent);
      let tempCategory = ""
      if (fileType === 'text') {
        plainTextContent = stripHtmlTags(formattedContent);
        tempCategory = "text"
      } else if (fileType === 'pdf' || fileType === 'doc') {
        plainTextContent = formattedContent;
        tempCategory = "document"
      }else if(fileType === "html"){
        plainTextContent = formattedContent;
        tempCategory = "website"
      }
      const payload = {
        doc_name: fileName,
        doc_language: userInput1,
        doc_type: fileType.toUpperCase(),
        category: tempCategory,
        doc_content: plainTextContent,
      };
      const response = await instance.post(
        API_URL + `/users/api/v1/docs/save`,
        payload
      );
      router.push(`/account/saved-documents`);
      setFileName("");
      setUserInput1("");
      setGeneratedContent("");

      toast.success(response.data.message);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error("Document Save failed:", error);
    } finally {
      setIsDocumentSavePending(false);
    }
  };

  const handleEditDocument = async () => {
    try {
      const payload = {
        doc_name: fileName,
        doc_language: userInput1,
        doc_type: "TEXT",
        category: "text",
        doc_content: generatedContent,
      };
      const response = await instance.put(
        API_URL + `/users/api/v1/docs/${editDocumentData?._id}`,
        payload
      );
      if (response.data.success) {
        dispatch(editDocument(false));
        router.push(`/account/saved-documents`);
      }
      toast.success(response.data.message);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error("Document Save failed:", error);
    } finally {
    }
  };

  const handleFavorite = async (method: string, templateId: string) => {
    try {
      const response = await instance.put(
        API_URL + `/ai/api/v1/chat-template/fav-apps/${templateId}`,
        { type: method }
      );
      toast.success(response.data.message);

      setAppTemplate((prevTemplateData: any) => ({
        ...prevTemplateData,
        favorite: !prevTemplateData.favorite,
      }));
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error("Error:", error);
    }
  };

  if (!appTemplate) {
    return router.push("/app/ai-templates");
  }

  if (loading) {
    return (
      <div className="flex-1 flex flex-col gap-5 justify-center items-center">
        <Spinner color="black" size={100} />
        Loading...
      </div>
    );
  }

  return (
    <Fragment>
      <div className="flex items-center justify-between mt-10">
        <p className="flex items-center gap-2 text-[#4B465C] text-opacity-50 text-[15px]">
          <Link
            href="/app/plan/ai-templates"
            className="hover:text-gray-600 transition-all"
          >
            All AI templates
          </Link>
          <ChevronRight size={20} />{" "}
          <span className="text-[#3D817B] font-medium">{appTemplate.name}</span>
        </p>
        <Link href="/app/plan/ai-templates">
          <button className="text-primary-green hover:bg-primary-green/10 sheen flex gap-2 px-3.5 py-2.5 rounded-full font-semibold items-center">
            <ArrowLeft size={20} /> Back
          </button>
        </Link>
      </div>
      <div className="flex gap-5 mt-6">
        <div className="w-full h-full max-w-[600px] px-8 pb-8 pt-6 bg-white rounded-2xl border border-[#EDEFF0] space-y-4">
          <div className="mb-5 border-b border-[#EDEFF0]">
            <div className="flex items-center justify-between pb-5">
              <div className="flex flex-row items-center gap-3">
                <div
                  style={{
                    height: "8vh",
                    width: "8vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="rounded"
                  dangerouslySetInnerHTML={{ __html: appTemplate.icon }}
                />

                <h2 className="text-2xl font-semibold capitalize">
                  {appTemplate.name}
                </h2>
              </div>
              <div className="cursor-pointer w-full max-w-fit transition duration-300 hover:scale-125 flex justify-center items-center">
                {appTemplate.favorite ? (
                  <BsStarFill
                    size={24}
                    className="text-yellow-300"
                    onClick={() => handleFavorite("remove", appTemplate._id)}
                  />
                ) : (
                  <StarIcon
                    className="text-[#ADADAD]"
                    onClick={() => handleFavorite("add", appTemplate._id)}
                  />
                )}
              </div>
            </div>
            <p className="mb-5 text-md">{appTemplate.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              checked={isChecked}
              onCheckedChange={() => setIsChecked((prev) => !prev)}
            />
            <label htmlFor="include-brand" className="text-sm">
              Include your brand
            </label>
          </div>
          {/* {isChecked && (
            <div>
              <Dropdown
                label="Select Company / Brand"
                placeholder="Select your Company / Brand"
                items={brandNames}
                value={brandName}
                onChange={(value: any) => {
                  setBrandName(value);
                }}
              />
            </div>
          )} */}

          {isChecked && (
            <div>
              {Array.isArray(brandNames) && brandNames.length > 0 ? (
                <Dropdown
                  label="Select Company / Brand"
                  placeholder="Select your Company / Brand"
                  items={brandNames}
                  value={brandName}
                  onChange={(value: any) => {
                    setBrandName(value);
                  }}
                />
              ) : (
                <Link
                  href="/account/create-brand-voice/"
                  className="flex"
                  style={{ color: "green" }}
                >
                  <Plus size={20} />
                  <strong className="ml-2">Create brand voice</strong>
                </Link>
              )}
            </div>
          )}

          <div>
            <Dropdown
              label="Language"
              items={languageOptions.map((language) => language.label)}
              value={userInput1}
              onChange={(value: any) => {
                handleDropdownChange("language", value);
                setUserInput1(value);
              }}
            />
            {userInput1Error && (
              <p style={{ color: "red" }}>{userInput1Error}</p>
            )}
          </div>

          <div className="space-y-3">
            {appTemplate?.inputs?.map((input: any, index: number) => (
              <div key={index}>
                <label
                  className="font-medium flex justify-between"
                  htmlFor={`user-prompt-${index}`}
                >
                  {input.title}
                  {input.field_type !== "Checkbox list field" &&
                    input.field_type !== "Radio buttons field" &&
                    input.field_type !== "Select list field" && (
                      <span className="text-primary-black text-opacity-50 text-sm">
                        {userPrompts[index].length}/2000
                      </span>
                    )}
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
                            required
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
                            required
                          />
                          <span className="ml-2">{option.trim()}</span>
                        </label>
                      ))}
                  </div>
                )}
                {input.field_type === "Select list field" && (
                  <Dropdown
                    label={input.title}
                    hideLabel
                    items={input.description
                      .split(",")
                      .map((option: string) => option.trim())}
                    value={userPrompts[index]}
                    onChange={(value: any) => handleSelectChange(value, index)}
                    required
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
                      maxLength={2000}
                    ></textarea>
                  )}
                {userPromptError && (
                  <p style={{ color: "red" }}>{userPromptError}</p>
                )}
              </div>
            ))}
          </div>

          <div>
            <Dropdown
              label="AI Model"
              items={[
                "gpt-3.5-turbo",
                "gpt-4",
                "gpt-4o",
                "claude-3-5-sonnet-20240620",
                "claude-3-opus-20240229",
                "claude-3-sonnet-20240229",
                "claude-3-haiku-20240307",
                "gemini-1.5-flash",
                "gemini-1.5-pro",
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
              info={
                "Increase or decrease the creativity level to get various results"
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
              info={"Set result tone of the text as needed"}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label
                className="block mb-2 text-sm font-medium flex items-center"
                htmlFor="number-of-results"
              >
                Number of Results
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info
                        size={18}
                        className="ml-2 text-primary-black text-opacity-50 cursor-pointer"
                      />
                    </TooltipTrigger>
                    <TooltipContent className="bg-white">
                      <p>Maximum supported results is 50</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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
                className="block mb-2 text-sm font-medium flex"
                htmlFor="estimated-result-length"
              >
                Estimated Result Length
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info
                        size={18}
                        className="ml-2 text-primary-black text-opacity-50 cursor-pointer"
                      />
                    </TooltipTrigger>
                    <TooltipContent className="bg-white">
                      <p>
                        Estimated words length for each generated text result
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
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
            className="w-full h-14 py-2 text-white bg-primary-green rounded-xl !mt-7 flex items-center justify-center"
            onClick={generateResult}
          >
            <div className="flex items-center gap-2">
              {!isGeneratedResultPending ? "Generate" : <Spinner />}
            </div>
          </button>
        </div>
        <div className="w-full p-8 bg-white rounded-2xl border border-[#EDEFF0] flex flex-col">
          <div className="flex items-center justify-between mb-5 border-b pb-5">
            <div className="flex items-center gap-2 w-full max-w-lg border rounded-xl">
              <input
                type="text"
                placeholder="Enter file name"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="w-full h-12 px-4 rounded-xl"
              />
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
                    "Download as HTML",
                    "Save as DOC",
                    "Save as TXT",
                    "Save as PDF",
                    "Save as HTML",
                  ]}
                  hideLabel
                  placeholder="Download/Save"
                  value=""
                  onChange={(value: any) => handleDownload(value)}
                />

                {/* <button
                  className='h-11 w-11 grid place-content-center p-2 bg-gray-100 rounded-lg'
                  onClick={isEdit ? handleEditDocument : handleSaveDocument}
                >
                  {isDocumentSavePending ? (
                    <Spinner color="black" />
                  ) : (
                    <Save size={24} className="text-gray-600" />
                  )}
                </button> */}
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
