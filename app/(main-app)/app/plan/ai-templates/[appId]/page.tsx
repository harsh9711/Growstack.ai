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
import React, { Fragment, useEffect, useState } from "react";
import { BsStarFill } from "react-icons/bs";
import Editor from "./components/Editor";
import Spinner from "@/components/Spinner";
import { Switch } from "@/components/ui/switch";
import { Info } from "lucide-react";
import axios from 'axios';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
import { aiModelOptionsTemplate, languageOptions } from "../../../create/ai-articles/constants/options";
import Dropdown from "./components/Dropdown";
import { Plus } from "lucide-react";
import { getCookie } from "cookies-next";
import EventSource from 'eventsource';
import { parseJsonString } from "@/lib/utils";
import downloadPdf from "@/utils/downloadPdf";
import { InputFieldType, PlanName } from "@/types/enums";
import { ALL_ROUTES } from "@/utils/constant";

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { planIdsMap } from "@/lib/utils";
import clsx from "clsx";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";
export default function AiAppPage({
  params: { appTemplateId },
}: {
  params: { appTemplateId: string };
}) {
  const router = useRouter();
  const isEdit = isEditDecument();
  const editDocumentData: any = getSavedDecumentForEdit();
  const dispatch = useDispatch();
  const { user, currentPlan } = useSelector((rootState: RootState) => rootState.auth);

  const filteredAiModelOptions = user?.user_type !== "ADMIN" && currentPlan &&
    planIdsMap[PlanName.AI_ESSENTIALS].some((val) => val === currentPlan.plan_id)
    ? [aiModelOptionsTemplate[0]]
    : aiModelOptionsTemplate;
  const [appTemplate, setAppTemplate] = useState<any>({});
  const [userPrompts, setUserPrompts] = useState<string[]>([]); // Initialize as empty array
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [fileName, setFileName] = useState(""); // State for file name input
  const [loading, setLoading] = useState(true);
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [userInput, setUserInput] = useState({
    user_prompt: "",
    language: "english",
    model: filteredAiModelOptions[0].models[0].value || "",
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





  const [selectedModel, setSelectedModel] = useState<string>(filteredAiModelOptions[0].models[0].value || "");

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
        downloadPdf(plainTextContent, userInput, fileName);
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


  const streamResponse = async (chatId: string) => {
    try {
      const token = getCookie("token");
      const eventSource = new EventSource(`${API_URL}/ai/api/v1/chat-template/generate/stream/${chatId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });

      let accumulatedResponse = '';

      eventSource.onmessage = (event: MessageEvent) => {
        const chunk = event.data;
        const msg = parseJsonString(chunk)?.text || "";
        accumulatedResponse += msg;
        setGeneratedContent(accumulatedResponse);
      };

      eventSource.onerror = (error: MessageEvent) => {
        console.error('EventSource failed:', error);
        eventSource.close();
      };

      eventSource.addEventListener('end', (event: MessageEvent) => {
        console.log('EventSource end:', event);
        eventSource.close();
      });


    } catch (error) {
      console.error('Error setting up EventSource:', error);
      toast.error('Error setting up stream');
    }
  };

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
      await streamResponse(response.data.data.chat_id)
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

  const handleSaveDocument = async (fileType: string) => {
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
      } else if (fileType === "html") {
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

  const validateImageUrl = (url: string) => {
    const imageRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/i;
    return imageRegex.test(url);
  }

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

  const handleModalSelection = (value: string) => {
    if (!currentPlan) return;
    const currentCategory = filteredAiModelOptions.find((category) =>
      category.models.some((model) => model.value === value)
    );

    const currentModal = currentCategory?.models.find(
      (model) => model.value === value
    );

    if (!currentCategory || !currentModal) {
      console.error("Model not found");
      return;
    }

    const freeCategories = ["growStackAiMessagesModel"];

    if (user?.user_type === "ADMIN" || freeCategories.includes(currentCategory.modelCategory)) {
      setSelectedModel(value);
      return;
    }

    let usageLimit = 0;

    if (currentCategory.modelCategory === "smartAiMessagesModel") {
      usageLimit = currentPlan.smart_ai_messages;
    } else if (currentCategory.modelCategory === "fastAiMessagesModel") {
      usageLimit = currentPlan.fast_ai_messages;
    }

    if (usageLimit <= 0) {
      toast.error(`You have no remaining usage for ${currentCategory.label}. Please switch to another model.`);
      return;
    }

    setSelectedModel(value);
  };
  const menuItems = [
    "Copy as Text",
    "Copy as HTML",
  ];
  const downloadItems = [
    "Download as DOC",
    "Download as TXT",
    "Download as PDF",
    "Download as HTML",

  ]
  const saveItems = [
    "Save as DOC",
    "Save as TXT",
    "Save as PDF",
    "Save as HTML",
  ]
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
                {validateImageUrl(appTemplate.icon) ? (
                  <div className="flex items-center justify-center w-16 h-16">
                    <img src={appTemplate.icon} alt="icon" className="rounded-lg object-contain w-full h-full"></img>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    dangerouslySetInnerHTML={{ __html: appTemplate.icon }}
                    className='w-[64px] h-[64px] flex-shrink-0'
                  />
                )}

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
                  href={ALL_ROUTES.BRAND_VOICE}
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
                  {input.field_type !== InputFieldType.CHECKBOX &&
                    input.field_type !== InputFieldType.RADIO &&
                    input.field_type !== InputFieldType.SELECT_LIST && (
                      <span className='text-primary-black text-opacity-50 text-sm'>
                        {userPrompts[index].length}/2000
                      </span>
                    )}
                </label>
                {input.field_type === InputFieldType.CHECKBOX ? (
                  <div className='flex flex-col space-y-2'>
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
                {input.field_type === InputFieldType.RADIO && (
                  <div className='flex flex-col space-y-2'>
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
                {input.field_type === InputFieldType.SELECT_LIST && (
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
                {input.field_type !== InputFieldType.CHECKBOX &&
                  input.field_type !== InputFieldType.RADIO &&
                  input.field_type !== InputFieldType.SELECT_LIST && (
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
            <label>AI Model</label>
            {/* new design dropdown */}
            <Select
              value={selectedModel}
              onValueChange={(value) => {
                handleModalSelection(value); // Existing handler
                handleDropdownChange("model", value); // Your additional handler
              }}
            >
              <SelectTrigger className='h-12 w-full  text-black border-0 rounded-xl flex items-center justify-between px-4'>
                <SelectValue placeholder="Select an option">
                  {selectedModel && (
                    <div className="flex items-center gap-2">
                      <span className="min-w-fit">
                        {filteredAiModelOptions
                          .flatMap((option) => option.models) // Flattening the models array to find the icon
                          .find((model) => model.value === selectedModel)?.icon}
                      </span>
                      {selectedModel}
                    </div>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="max-h-60 overflow-y-auto" style={{ scrollBehavior: 'smooth' }}>
                {filteredAiModelOptions.map(({ label: categoryLabel, models }) => (
                  <SelectGroup key={categoryLabel}>
                    <React.Fragment key={categoryLabel}>
                      <div className="font-bold text-gray-500 px-4 py-2">{categoryLabel}</div>
                      {models.map(({ icon, label, value }) => (
                        <SelectItem key={value} value={value}>
                          <div
                            className={clsx(
                              "flex items-center gap-2",
                              selectedModel === value && "text-primary-green font-medium"
                            )}
                          >
                            <span className="min-w-fit">{icon}</span>
                            {label}
                          </div>
                        </SelectItem>
                      ))}
                    </React.Fragment>
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>

            {/* new design drop down */}

          </div>
          {/* <div>
            <Dropdown
            label="AI Model"
              items={[
                "gpt-3.5-turbo",
                "gpt-4",
                "gpt-4o",
                "claude-3-sonnet-20240229",
                "claude-3-haiku-20240307",
                "gemini-1.5-flash",
                "gemini-1.5-pro",
              ]}
              value={userInput.model}
              onChange={(value: any) => handleDropdownChange("model", value)}
            />
          </div> */}
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
            <div className="flex items-center gap-2 w-80 max-w-lg border rounded-xl">
              <input
                type="text"
                placeholder="Enter file name"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="w-full h-12 px-4 rounded-xl"
              />
            </div>
            <div className="flex items-center gap-3">
              <DropdownMenu key={"menu"}>
                <DropdownMenuTrigger asChild>
                  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.465341" y="0.465341" width="36.9934" height="36.2966" rx="5.78884" fill="#F5F9FC" />
                    <rect x="0.465341" y="0.465341" width="36.9934" height="36.2966" rx="5.78884" stroke="white" stroke-width="0.930681" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5117 14.7489C16.5117 13.3737 16.7919 12.6307 17.2125 12.2101C17.6331 11.7895 18.3762 11.5093 19.7513 11.5093H23.2513C24.6264 11.5093 25.3695 11.7895 25.7901 12.2101C26.2107 12.6307 26.4909 13.3737 26.4909 14.7489V18.2489C26.4909 19.624 26.2107 20.3671 25.7901 20.7877C25.3695 21.2083 24.6264 21.4884 23.2513 21.4884H23.1784V19.7489C23.1784 18.2073 22.8752 16.9087 21.9833 16.0168C21.0914 15.1249 19.7929 14.8218 18.2513 14.8218H16.5117V14.7489ZM14.8242 14.8218V14.7489C14.8242 13.2073 15.1274 11.9087 16.0193 11.0168C16.9112 10.1249 18.2097 9.82178 19.7513 9.82178H23.2513C24.7929 9.82178 26.0914 10.1249 26.9833 11.0168C27.8752 11.9087 28.1784 13.2073 28.1784 14.7489V18.2489C28.1784 19.7904 27.8752 21.089 26.9833 21.9809C26.0914 22.8728 24.7929 23.1759 23.2513 23.1759H23.1784V23.2489C23.1784 24.7904 22.8752 26.089 21.9833 26.9809C21.0914 27.8728 19.7929 28.1759 18.2513 28.1759H14.7513C13.2098 28.1759 11.9112 27.8728 11.0193 26.9809C10.1274 26.089 9.82422 24.7904 9.82422 23.2489V19.7489C9.82422 18.2073 10.1274 16.9087 11.0193 16.0168C11.9112 15.1249 13.2098 14.8218 14.7513 14.8218H14.8242ZM15.668 16.5093L14.7513 16.5093C13.3762 16.5093 12.6331 16.7895 12.2125 17.2101C11.7919 17.6307 11.5117 18.3737 11.5117 19.7489V23.2489C11.5117 24.624 11.7919 25.3671 12.2125 25.7877C12.6331 26.2083 13.3762 26.4884 14.7513 26.4884H18.2513C19.6264 26.4884 20.3695 26.2083 20.7901 25.7877C21.2107 25.3671 21.4909 24.624 21.4909 23.2489V22.3322V19.7489C21.4909 18.3737 21.2107 17.6307 20.7901 17.2101C20.3695 16.7895 19.6264 16.5093 18.2513 16.5093H15.668Z" fill="black" fill-opacity="0.44" />
                  </svg>

                </DropdownMenuTrigger>
                <DropdownMenuContent >
                  {menuItems.map((item, index) => (
                    <button onClick={() => handleDownload(item)}
                      key={index}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray"
                      role="menuitem"
                      id={`menu-item-${index}`} style={{ cursor: "pointer"}}
                    >
                      {item}
                    </button>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu key={"menu"}>
                <DropdownMenuTrigger asChild>
                  <svg width="39" height="38" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1.21339" y="0.465341" width="36.9934" height="36.2966" rx="5.78884" fill="#F5F9FC" />
                    <rect x="1.21339" y="0.465341" width="36.9934" height="36.2966" rx="5.78884" stroke="white" stroke-width="0.930681" />
                    <path opacity="0.7" d="M18.2912 10.3425H20.6179C20.996 10.3425 21.3159 10.6625 21.3159 11.0405V15.9266H23.8462C24.3697 15.9266 24.6314 16.5665 24.2534 16.9446L19.8326 21.3653C19.629 21.5689 19.2509 21.5689 19.0474 21.3653L14.6266 16.9446C14.2485 16.5665 14.5103 15.9266 15.0338 15.9266H17.5932V11.0405C17.5932 10.6625 17.884 10.3425 18.2912 10.3425ZM26.9 21.278V24.5354C26.9 24.9426 26.5801 25.2334 26.202 25.2334H12.7071C12.2999 25.2334 12.0091 24.9426 12.0091 24.5354V21.278C12.0091 20.8999 12.2999 20.58 12.7071 20.58H16.9533L18.3784 22.0051C18.9601 22.6159 19.9199 22.6159 20.5015 22.0051L21.9267 20.58H26.202C26.5801 20.58 26.9 20.8999 26.9 21.278ZM23.2936 23.8374C23.2936 23.5175 23.0318 23.2557 22.7119 23.2557C22.392 23.2557 22.1302 23.5175 22.1302 23.8374C22.1302 24.1573 22.392 24.4191 22.7119 24.4191C23.0318 24.4191 23.2936 24.1573 23.2936 23.8374ZM25.155 23.8374C25.155 23.5175 24.8932 23.2557 24.5733 23.2557C24.2534 23.2557 23.9916 23.5175 23.9916 23.8374C23.9916 24.1573 24.2534 24.4191 24.5733 24.4191C24.8932 24.4191 25.155 24.1573 25.155 23.8374Z" fill="#434345" />
                  </svg>

                </DropdownMenuTrigger>
                <DropdownMenuContent >
                  {downloadItems.map((item, index) => (
                    <button onClick={() => handleDownload(item)}
                      key={index}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      id={`menu-item-${index}`} style={{ cursor: "pointer" }}
                    >
                      {item}
                    </button>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu key={"menu"}>
                <DropdownMenuTrigger asChild>
                  <svg width="39" height="38" viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1.03956" y="0.465341" width="36.9934" height="36.2966" rx="5.78884" fill="#F5F9FC" />
                    <rect x="1.03956" y="0.465341" width="36.9934" height="36.2966" rx="5.78884" stroke="white" stroke-width="0.930681" />
                    <g opacity="0.7" clip-path="url(#clip0_917_10412)">
                      <path d="M28.0275 14.6622L24.2655 10.9002C23.9775 10.6122 23.5815 10.4502 23.1855 10.4502H21.4395V13.6002C21.4395 13.9242 21.1695 14.1942 20.8455 14.1942H15.9135C15.5895 14.1942 15.3195 13.9242 15.3195 13.6002V10.4502H13.0515C12.2055 10.4502 11.5215 11.1342 11.5215 11.9802V26.0202C11.5215 26.8662 12.2055 27.5502 13.0515 27.5502H26.9655C27.8115 27.5502 28.4955 26.8662 28.4955 26.0202V15.7422C28.4775 15.3462 28.3155 14.9502 28.0275 14.6622ZM24.8415 24.0762C24.8415 24.4002 24.5715 24.6702 24.2475 24.6702H15.7335C15.4095 24.6702 15.1395 24.4002 15.1395 24.0762V18.1722C15.1395 17.8482 15.4095 17.5782 15.7335 17.5782H24.2655C24.5895 17.5782 24.8595 17.8482 24.8595 18.1722V24.0762H24.8415Z" fill="#434345" />
                      <path d="M18.9552 13.1862H20.1072C20.2332 13.1862 20.3412 13.0782 20.3412 12.9522V10.6842C20.3412 10.5582 20.2332 10.4502 20.1072 10.4502H18.9552C18.8292 10.4502 18.7212 10.5582 18.7212 10.6842V12.9342C18.7212 13.0782 18.8292 13.1862 18.9552 13.1862ZM22.5012 19.2342H17.4972C17.1552 19.2342 16.8672 19.5042 16.8672 19.8642C16.8672 20.2062 17.1372 20.4942 17.4972 20.4942H22.4832C22.8252 20.4942 23.1132 20.2242 23.1132 19.8642C23.1132 19.5042 22.8432 19.2342 22.5012 19.2342ZM22.5012 21.7902H17.4972C17.1552 21.7902 16.8672 22.0602 16.8672 22.4202C16.8672 22.7622 17.1372 23.0502 17.4972 23.0502H22.4832C22.8252 23.0502 23.1132 22.7802 23.1132 22.4202C23.1132 22.0782 22.8432 21.7902 22.5012 21.7902Z" fill="#434345" />
                    </g>
                    <defs>
                      <clipPath id="clip0_917_10412">
                        <rect width="18" height="18" fill="white" transform="translate(11 10)" />
                      </clipPath>
                    </defs>
                  </svg>

                </DropdownMenuTrigger>
                <DropdownMenuContent >
                  {saveItems.map((item, index) => (
                    <button onClick={() => handleDownload(item)}
                      key={index}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      id={`menu-item-${index}`} style={{ cursor: "pointer" }}
                    >
                      {item}
                    </button>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex items-center gap-2">
                {/* <Dropdown
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
                  value="Copy as Text"
                  onChange={(value: any) => handleDownload(value)}
                /> */}

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
