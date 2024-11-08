/* eslint-disable react/display-name */
import { SendIcon2 } from "@/components/svgs";
import autosize from "autosize";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import toast from "react-hot-toast";
import useSpeechRecognition from "../../hooks/UseSpeechRecognition";
import { languageOptions } from "../../ai-articles/constants/options";
import Microphone from "./Microphone";
import Link from "next/link";
import { BrandVoice, ChatResponse } from "@/types/common";
import { parseJsonString, planIdsMap } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { getCookie } from "cookies-next";
import EventSource from "eventsource";
import { X } from "lucide-react";
import { ALL_ROUTES } from "@/utils/constant";
import { PlanName } from "@/types/enums";

interface ChatInputProps {
  selectedBrandVoice?: BrandVoice;
  onSend: (content: string, role: string, imageUrl:string) => void;
  selectedModel: string;
  fetchConversations: () => void;
  removeMessage: () => void;
  selectedConversation: string | null;
  addMessage: (role: string, content: string, loading: boolean) => void;
  setSelectedConversation: React.Dispatch<React.SetStateAction<string | null>>;
  enableSecure?: boolean;
  enableWebBrowsing?: boolean;
  isLimitExceeded?: boolean;
  imageUrl: string | null;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  filename: string | null;
  setFilename: React.Dispatch<React.SetStateAction<string | null>>;
}

interface ChatInputRef {
  handleRegenerate: (chatMessage: string) => void;
}

const ChatInput = forwardRef<ChatInputRef, ChatInputProps>(
  (
    {
      selectedBrandVoice,
      onSend,
      fetchConversations,
      selectedConversation,
      selectedModel,
      addMessage,
      setSelectedConversation,
      removeMessage,
      enableWebBrowsing = false,
      enableSecure = false,
      isLimitExceeded = false,
      imageUrl,
      setImageUrl,
      filename,
      setFilename,
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = useState(false);
    const { currentPlan, user } = useSelector(
      (rootState: RootState) => rootState.auth
    );
    const isFreePlan = planIdsMap[PlanName.FREE].some(
      val => val === currentPlan?.plan_id
    );
    const isSubscribed = user?.isSubscribed || false;
    const selectedLanguage = languageOptions[0].value;
    const [open, setOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [input, setInput] = useState("");
    const [isDailyLimitExceeded, setIsDailyLimitExceeded] =
      useState(isLimitExceeded);
    const [showUpload, setShowUpload] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [imageType, setImageType] = useState<string | null>(null);
    const [fileType, setFileType] = useState<string | null>(null);
    const [newConversationId, setNewConversationId] = useState("");
    const [lastPrompt, setLastPrompt] = useState("");
    const [showSecureChatErrorMsg, setShowSecureChatErrorMsg] = useState(false);
    const [error, setError] = useState(false);
    const [emptyPrompt, isEmptyPrompt] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { startRecognition, stopRecognition, textToSpeech } =
      useSpeechRecognition(
        selectedLanguage,
        open,
        (transcript: string) => {
          setInput(transcript);
          handleSend(transcript, true);
        },
        () => {
          setOpen(false);
          setIsAnimating(false);
        }
      );

    useEffect(() => {
      if (textareaRef.current) {
        autosize(textareaRef.current);
        textareaRef.current.style.overflow = "auto";
      }
    }, []);

    useEffect(() => {
      if (textareaRef.current) {
        autosize.update(textareaRef.current);
      }
    }, [input]);

    const handleSend = async (
      user_prompt?: string,
      fromMic: boolean = false
    ) => {

      if (input.trim() === '') {
        isEmptyPrompt('Please enter any prompt...!');
        return;
      }

      isEmptyPrompt('');

      if (user_prompt) {
        user_prompt = user_prompt.trim();
      }
      setShowSecureChatErrorMsg(false);
      const prompt = user_prompt || input.trim();
      if (prompt === "" && !(imageUrl || fileUrl)) return;
      setInput("");
      addMessage("user", prompt, false);
      const temp_img = imageUrl;
      const temp_fil = fileUrl;
      setImageUrl(null);
      setFilename(null);
      setLastPrompt(prompt);
      addMessage("assistant", "", true);
      if (textareaRef.current) {
        autosize.update(textareaRef.current);
      }
      setIsLoading(true);
      try {
        setIsAnimating(false);
        setOpen(false);
        let apiUrl = `${API_URL}/ai/api/v1/conversation/chat?conversation_id=${
          selectedConversation
            ? selectedConversation
            : newConversationId
              ? newConversationId
              : ""
        }&model=${selectedModel}&enableSecure=${enableSecure}`;
        if (enableWebBrowsing) {
          apiUrl += `&webBrowsing=${enableWebBrowsing}`;
        }

        const conversation = await instance.post(apiUrl, {
          user_prompt: prompt,
          image_url: temp_img,
          image_type: imageType,
          file_url: temp_fil,
          file_type: fileType,
          ...(selectedBrandVoice && {
            brand_voice: selectedBrandVoice.brand_voice,
          }),
        });

        if (imageUrl || fileUrl) {
          setImageUrl(null);
          setFileUrl(null);
          setImageType(null);
          setFilename(null);
        }
        const {
          response,
          conversation_id,
          chatId,
          noOfMessagesLeft,
          totalMessages,
        } = conversation.data.data as ChatResponse;

        if (isFreePlan) {
          if (noOfMessagesLeft && totalMessages) {
            if (noOfMessagesLeft < 0) {
              setIsDailyLimitExceeded(true);
              return;
            } else {
              setIsDailyLimitExceeded(false);
            }
          }
        }
        setNewConversationId(conversation_id);
        await streamResponse(chatId, fromMic);
        if (selectedConversation || conversation_id) fetchConversations();

        if (fromMic) {
          setIsAnimating(true);
          setOpen(true);
          await textToSpeech(response);
        }
      } catch (error: any) {
        const errorMsg = error.response?.data.error ?? error.message;

        if (errorMsg === "Please upgrade your plan") {
          setIsDailyLimitExceeded(true);
        }
        if (
          (errorMsg.includes("Your request has been blocked") ||
            errorMsg.includes("Inappropiate Language")) &&
          enableSecure
        ) {
          setShowSecureChatErrorMsg(true);
        } else {
          toast.error(errorMsg);
        }
        removeMessage();
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files ? e.target.files[0] : null;

      if (!file) {
        toast.error("No file selected.");
        setSelectedFile(null);
        return;
      }

      const allowedImageTypes = [
        "image/jpg",
        "image/jpeg",
        "image/png",
        "image/gif",
      ];
      const allowedDocTypes = [
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
        "application/pdf",
      ];

      const isImage = allowedImageTypes.includes(file.type);
      const isDocument = allowedDocTypes.includes(file.type);

      const disallowedDocTypes = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
      ];

      if (disallowedDocTypes.includes(file.type)) {
        toast.error("XLS, XLSX, and CSV files are not supported.");
        setSelectedFile(null);
        return;
      }

      if (!isImage && !isDocument) {
        toast.error(
          "Invalid file type. Only DOC, DOCX, TXT, XLS, XLSX, CSV, PDF, JPG, JPEG, PNG, and GIF files are allowed."
        );
        setSelectedFile(null);
        return;
      }

      const fileSizeMB = file.size / (1024 * 1024);
      const maxFileSize = isImage ? 3.5 : 8;

      if (fileSizeMB > maxFileSize) {
        const limitText = isImage ? "3MB" : "8MB";
        toast.error(`File size should not exceed ${limitText}.`);
        setSelectedFile(null);
        return;
      }

      if (
        isImage &&
        (selectedModel === "gpt-3.5-turbo" || selectedModel === "gpt-4-turbo")
      ) {
        toast.error(
          "Image files are not supported by ChatGPT 3.5 Turbo model."
        );
        setSelectedFile(null);
        return;
      }

      setIsUploading(true);

      const formData = new FormData();
      formData.append("document", file);

      try {
        const response = await instance.post(
          `${API_URL}/users/api/v1/file/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.success) {
          const url = response.data.data.fileUrl;

          if (isImage) {
            setImageUrl(url);
            setImageType(file.type);
            setFileUrl(null);
            setFileType(null);
            setFilename(null);
          } else if (isDocument) {
            const fileTypeMap: { [key: string]: string } = {
              "application/msword": "doc",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                "docx",
              "text/plain": "txt",
              "application/vnd.ms-excel": "xls",
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                "xlsx",
              "text/csv": "csv",
              "application/pdf": "pdf",
            };

            setFileUrl(url);
            setFileType(fileTypeMap[file.type]);
            console.log(fileType);
            setFilename(file.name);
            setImageUrl(null);
            setImageType(null);
          }

          toast.success(`${isImage ? "Image" : "File"} uploaded successfully!`);
          setSelectedFile(null);
          setShowUpload(false);
        } else {
          toast.error(response.data.message || "File upload failed.");
        }
      } catch (error) {
        toast.error("Failed to upload file.");
        setSelectedFile(null);
        setShowUpload(false);
      } finally {
        setIsUploading(false);
      }
    };

    const streamResponse = async (chatId: string, fromMic: boolean) => {
      try {
        const token = getCookie("token");
        const eventSource = new EventSource(
          `${API_URL}/ai/api/v1/conversation/chat/stream/${chatId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        let accumulatedResponse = "";
eventSource.onmessage = (event: MessageEvent) => {
  let imageUrl = "";
  const chunk = event.data;
  const parsedData = parseJsonString(chunk);
  const msg = parsedData?.text || "";
  accumulatedResponse += msg ;
  const imageMarkdownRegex = /!\[.*?\]\((https?:\/\/[^\s]+)\)/;
  const imageMatch = chunk.match(imageMarkdownRegex);

  if (imageMatch && imageMatch[1]) {
    imageUrl = imageMatch[1];
    accumulatedResponse += chunk;
  }
  onSend(accumulatedResponse, "assistant", imageUrl);
};

        eventSource.onerror = (error: MessageEvent) => {
          console.error("EventSource failed:", error);
          if (fromMic) {
            textToSpeech(accumulatedResponse);
          }
          eventSource.close();
          setIsLoading(false);
        };

        eventSource.addEventListener("end", (event: MessageEvent) => {
          if (fromMic) {
            textToSpeech(accumulatedResponse);
          }
          eventSource.close();
          setIsLoading(false);
        });
      } catch (error) {
        console.error("Error setting up EventSource:", error);
        toast.error("Error setting up stream");
      }
    };

    const handleFileUpload = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      addMessage("user", `Uploading file: ${file.name}`, false);
      addMessage("assistant", "", true);

      try {
        const conversation = await instance.post(
          `${API_URL}/ai/api/v1/conversation/upload?conversation_id=${selectedConversation}&model=${selectedModel}&enableSecure=${enableSecure}`,
          formData
        );
        const { response, conversation_id } = conversation.data
          .data as ChatResponse;

        setSelectedConversation(conversation_id);
        onSend(response, "assistant","");
      } catch (error: any) {
        const errorMsg = error.response?.data.error ?? error.message;
        toast.error(errorMsg);
        removeMessage();
      }
    };

    const handleRegenerate = (chartMessage: string) => {
      if (chartMessage) {
        handleSend(chartMessage);
      } else {
        toast.error("No previous prompt to regenerate.");
      }
    };
    useImperativeHandle(ref, () => ({
      handleRegenerate,
    }));
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (isLoading) return;
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    };

    const handleOpenChange = (newOpen: boolean) => {
      setOpen(newOpen);
      if (isAnimating) {
        stopRecognition();
        setIsAnimating(false);
      } else {
        startRecognition();
        setIsAnimating(true);
      }
    };

    const promptInput = (description: string) => {
      const trimmedDescription = description.replace(/\s+/g, " ").trim();
      const newInput = `${input} ${trimmedDescription}`;
      setInput(newInput);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.value = newInput;
          textareaRef.current.focus();
          textareaRef.current.selectionStart =
            textareaRef.current.selectionEnd = newInput.length;
        }
      }, 500);
    };

    if (isDailyLimitExceeded) {
      return (
        <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-center items-center text-center mt-6">
          <h2 className="text-xl font-semibold text-red-500">
            You've Exceeded Your Daily Free Chat Limit
          </h2>

          <p className="mt-4 w-2/3 text-base">
            Come back tomorrow to start chatting again or{" "}
            {isSubscribed ? "upgrade your plan" : "subscribe"} to access all the
            amazing AI features.
          </p>

          <Link
            className="bg-primary-green mt-3 text-nowrap text-white sheen transition duration-500 px-5 py-3.5 rounded-xl flex items-center gap-2"
            href={isSubscribed ? ALL_ROUTES.UPGRADE : ALL_ROUTES.PAYMENT}
          >
            {isSubscribed ? "Upgrade Your Plan" : "Subscribe Now"}
          </Link>
        </div>
      );
    }

    return (
      <>
        <div className="flex p-2 border gap-2 rounded-xl items-end">
          <div
            className="h-full flex items-center justify-center cursor-pointer"
            onClick={() => setShowUpload(true)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 14.0004C10.6583 14.6723 11.5594 15.0509 12.5 15.0509C13.4406 15.0509 14.3417 14.6723 15 14.0004L19 10.0004C20.3807 8.61967 20.3807 6.38109 19 5.00038C17.6193 3.61967 15.3807 3.61967 14 5.00038L13.5 5.50038"
                stroke="#034737"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14 9.99973C13.3417 9.32784 12.4407 8.94922 11.5 8.94922C10.5594 8.94922 9.65832 9.32784 9.00001 9.99973L5.00001 13.9997C3.6193 15.3804 3.6193 17.619 5.00001 18.9997C6.38072 20.3804 8.6193 20.3804 10 18.9997L10.5 18.4997"
                stroke="#034737"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 21V19"
                stroke="#034737"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19 16H21"
                stroke="#034737"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3 8H5"
                stroke="#034737"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8 3V5"
                stroke="#034737"
                stroke-width="1.75"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className="flex flex-col w-full">
            {imageUrl && (
              <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1.5 pt-[7px]">
                <div
                  className="group relative inline-block text-sm text-token-text-primary"
                  onClick={() => setImageUrl(null)}
                >
                  <div className="relative overflow-hidden rounded-xl border border-token-border-light bg-token-main-surface-primary">
                    <div className="h-14 w-14">
                      <button className="h-full w-full">
                        <span
                          className="flex items-center h-full w-full justify-center bg-gray-500 dark:bg-gray-700 bg-cover bg-center text-white"
                          style={{ backgroundImage: `url(${imageUrl})` }}
                        ></span>
                      </button>
                    </div>
                  </div>
                  <button
                    className="bg-white absolute right-1 top-1 -translate-y-1/2 translate-x-1/2 rounded-full border p-0.5 transition-colors hover:opacity-100 group-hover:opacity-100 md:opacity-0"
                    onClick={() => setImageUrl(null)}
                  >
                    <X size={10} />
                  </button>
                </div>
              </div>
            )}
            {filename && (
              <div className="flex flex-row gap-1 aligin-center justify-start">
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 24 24"
                  fill="#355E3B"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13 3L13.7071 2.29289C13.5196 2.10536 13.2652 2 13 2V3ZM19 9H20C20 8.73478 19.8946 8.48043 19.7071 8.29289L19 9ZM13.109 8.45399L14 8V8L13.109 8.45399ZM13.546 8.89101L14 8L13.546 8.89101ZM10 13C10 12.4477 9.55228 12 9 12C8.44772 12 8 12.4477 8 13H10ZM8 16C8 16.5523 8.44772 17 9 17C9.55228 17 10 16.5523 10 16H8ZM8.5 9C7.94772 9 7.5 9.44772 7.5 10C7.5 10.5523 7.94772 11 8.5 11V9ZM9.5 11C10.0523 11 10.5 10.5523 10.5 10C10.5 9.44772 10.0523 9 9.5 9V11ZM8.5 6C7.94772 6 7.5 6.44772 7.5 7C7.5 7.55228 7.94772 8 8.5 8V6ZM9.5 8C10.0523 8 10.5 7.55228 10.5 7C10.5 6.44772 10.0523 6 9.5 6V8ZM17.908 20.782L17.454 19.891L17.454 19.891L17.908 20.782ZM18.782 19.908L19.673 20.362L18.782 19.908ZM5.21799 19.908L4.32698 20.362H4.32698L5.21799 19.908ZM6.09202 20.782L6.54601 19.891L6.54601 19.891L6.09202 20.782ZM6.09202 3.21799L5.63803 2.32698L5.63803 2.32698L6.09202 3.21799ZM5.21799 4.09202L4.32698 3.63803L4.32698 3.63803L5.21799 4.09202ZM12 3V7.4H14V3H12ZM14.6 10H19V8H14.6V10ZM12 7.4C12 7.66353 11.9992 7.92131 12.0169 8.13823C12.0356 8.36682 12.0797 8.63656 12.218 8.90798L14 8C14.0293 8.05751 14.0189 8.08028 14.0103 7.97537C14.0008 7.85878 14 7.69653 14 7.4H12ZM14.6 8C14.3035 8 14.1412 7.99922 14.0246 7.9897C13.9197 7.98113 13.9425 7.9707 14 8L13.092 9.78201C13.3634 9.92031 13.6332 9.96438 13.8618 9.98305C14.0787 10.0008 14.3365 10 14.6 10V8ZM12.218 8.90798C12.4097 9.2843 12.7157 9.59027 13.092 9.78201L14 8V8L12.218 8.90798ZM8 13V16H10V13H8ZM8.5 11H9.5V9H8.5V11ZM8.5 8H9.5V6H8.5V8ZM13 2H8.2V4H13V2ZM4 6.2V17.8H6V6.2H4ZM8.2 22H15.8V20H8.2V22ZM20 17.8V9H18V17.8H20ZM19.7071 8.29289L13.7071 2.29289L12.2929 3.70711L18.2929 9.70711L19.7071 8.29289ZM15.8 22C16.3436 22 16.8114 22.0008 17.195 21.9694C17.5904 21.9371 17.9836 21.8658 18.362 21.673L17.454 19.891C17.4045 19.9162 17.3038 19.9539 17.0322 19.9761C16.7488 19.9992 16.3766 20 15.8 20V22ZM18 17.8C18 18.3766 17.9992 18.7488 17.9761 19.0322C17.9539 19.3038 17.9162 19.4045 17.891 19.454L19.673 20.362C19.8658 19.9836 19.9371 19.5904 19.9694 19.195C20.0008 18.8114 20 18.3436 20 17.8H18ZM18.362 21.673C18.9265 21.3854 19.3854 20.9265 19.673 20.362L17.891 19.454C17.7951 19.6422 17.6422 19.7951 17.454 19.891L18.362 21.673ZM4 17.8C4 18.3436 3.99922 18.8114 4.03057 19.195C4.06287 19.5904 4.13419 19.9836 4.32698 20.362L6.10899 19.454C6.0838 19.4045 6.04612 19.3038 6.02393 19.0322C6.00078 18.7488 6 18.3766 6 17.8H4ZM8.2 20C7.62345 20 7.25117 19.9992 6.96784 19.9761C6.69617 19.9539 6.59545 19.9162 6.54601 19.891L5.63803 21.673C6.01641 21.8658 6.40963 21.9371 6.80497 21.9694C7.18864 22.0008 7.65645 22 8.2 22V20ZM4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673L6.54601 19.891C6.35785 19.7951 6.20487 19.6422 6.10899 19.454L4.32698 20.362ZM8.2 2C7.65645 2 7.18864 1.99922 6.80497 2.03057C6.40963 2.06287 6.01641 2.13419 5.63803 2.32698L6.54601 4.10899C6.59545 4.0838 6.69617 4.04612 6.96784 4.02393C7.25117 4.00078 7.62345 4 8.2 4V2ZM6 6.2C6 5.62345 6.00078 5.25117 6.02393 4.96784C6.04612 4.69617 6.0838 4.59545 6.10899 4.54601L4.32698 3.63803C4.13419 4.01641 4.06287 4.40963 4.03057 4.80497C3.99922 5.18864 4 5.65645 4 6.2H6ZM5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803L6.10899 4.54601C6.20487 4.35785 6.35785 4.20487 6.54601 4.10899L5.63803 2.32698Z" />
                </svg>
                <p className="font-semibold">{filename}</p>
                <button
                  className="bg-gey right-1 top-1 -translate-y-1/2 translate-x-1/2 rounded-full border"
                  onClick={() => setFilename(null)}
                  // style={{color:"red",height:"10px",width:"10px",marginTop:"-8px",borderRadius:"100%",borderColor:"black"}}
                >
                  {/* <X size={10} /> */}
                  <X size={18} />
                </button>
              </div>
            )}

            <textarea
              ref={textareaRef}
              value={input}
              onChange={e => {
                setInput(e.target.value);
                setShowSecureChatErrorMsg(false);
                isEmptyPrompt('');
              }}
              onKeyDown={handleKeyDown}
              rows={1}
              className="w-full flex-1 p-2 bg-transparent resize-none overflow-auto min-h-11 max-h-[300px]"
              placeholder="What's in your mind?"
            />
          </div>
          {showUpload && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-5 rounded-lg shadow-lg relative w-[542px] h-[262px]">
                <button
                  onClick={() => setShowUpload(false)}
                  className="absolute top-1 right-2"
                >
                  <svg
                    height="15px"
                    fill="red"
                    id="Layer_1"
                    version="1.1"
                    viewBox="0 0 512 512"
                    width="15px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
                  </svg>
                </button>

                <div className="flex flex-col items-center p-2 gap-5 justify-center w-full h-full border-2 border-dashed rounded-lg">
                  <div className="flex items-center justify-center bg-gray-100 w-[45px] h-[45px] rounded-sm">
                    <svg
                      fill="#000000"
                      height="30px"
                      width="30px"
                      version="1.1"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384.97 384.97"
                    >
                      <g>
                        <g id="Upload">
                          <path
                            d="M372.939,264.641c-6.641,0-12.03,5.39-12.03,12.03v84.212H24.061v-84.212c0-6.641-5.39-12.03-12.03-12.03
			S0,270.031,0,276.671v96.242c0,6.641,5.39,12.03,12.03,12.03h360.909c6.641,0,12.03-5.39,12.03-12.03v-96.242
			C384.97,270.019,379.58,264.641,372.939,264.641z"
                          />
                          <path
                            d="M117.067,103.507l63.46-62.558v235.71c0,6.641,5.438,12.03,12.151,12.03c6.713,0,12.151-5.39,12.151-12.03V40.95
			l63.46,62.558c4.74,4.704,12.439,4.704,17.179,0c4.74-4.704,4.752-12.319,0-17.011l-84.2-82.997
			c-4.692-4.656-12.584-4.608-17.191,0L99.888,86.496c-4.752,4.704-4.74,12.319,0,17.011
			C104.628,108.211,112.327,108.211,117.067,103.507z"
                          />
                        </g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                        <g></g>
                      </g>
                    </svg>
                  </div>
                  {isUploading && (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-green-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                  <div>
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-full"
                    >
                      {selectedFile && (
                        <div className="flex justify-center w-full">
                          <p className="text-center text-justify">
                            Selected file:
                            <span className="font-bold">
                              {selectedFile.name}
                            </span>
                          </p>
                        </div>
                      )}
                      <p>
                        Select a file to upload from your computer or device
                      </p>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>
                  <div className="h-12 w-52 flex justify-center cursor-pointer items-center bg-primary-green hover:bg-opacity-90 transition-all duration-300 text-white rounded-xl">
                    <label
                      htmlFor="dropzone-file"
                      className="w-full h-full flex justify-center items-center cursor-pointer"
                    >
                      Choose File
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* <ToolsDialog setInput={(description: string) => promptInput(description)} /> */}
          <div className="h-12 w-9 flex justify-center items-center bg-primary-green hover:bg-opacity-90 transition-all duration-300 text-white rounded-xl">
            <Microphone
              open={open}
              isAnimating={isAnimating}
              handleOpenChange={handleOpenChange}
            />
          </div>
          <button
            disabled={isLoading}
            onClick={() => handleSend()}
            className="h-12 w-12 flex justify-center items-center bg-primary-green hover:bg-opacity-90 transition-all duration-300 text-white rounded-xl"
          >
            <SendIcon2 />
          </button>
        </div>
        {
          emptyPrompt && (
          <div className="text-red-500 mt-2 ml-2">
              {emptyPrompt}
          </div>)
        }
        {showSecureChatErrorMsg && (
          <p className="text-destructive mt-3 ml-2 transition duration-500">
            Input contains sensitive or harmful content. Please remove any
            inappropriate material and try again.
          </p>
        )}
        {!input && imageUrl && error && (
          <p className="text-destructive mt-3 ml-2 transition duration-500">
            input Field should not be Empty
          </p>
        )}
      </>
    );
  }
);

export default ChatInput;
