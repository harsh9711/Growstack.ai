import { SendIcon2 } from "@/components/svgs";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import { BookText, Plus, Trash, X } from "lucide-react";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import { Switch } from "@material-tailwind/react";

type ChatMessageType = {
  thread_id: string;
  message_id: string;
  user_message: string;
  response: string;
  attachments?: [];
  _id?: string;
};

interface ChatInputProps {
  onSend: (response: string) => void;
  addMessage: (
    user_prompt: string,
    response: "",
    loading: boolean,
    images: string[],
    file: { file_type: string; file_id: string; file_name: string }[]
  ) => void;
  chatMessages: ChatMessageType[];
  customeGptData: CustomGptType;
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessageType[]>>;
  setIsToggleEnabled?: Dispatch<SetStateAction<boolean>>;
  isToggleEnabled?: boolean;
  image: string;
}

type CustomGptType = {
  name: string;
  description: string;
  icon: string;
  _id: string;
  assistant_id: string;
};

const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  chatMessages,
  addMessage,
  customeGptData,
  setChatMessages,
  setIsToggleEnabled,
  isToggleEnabled,
  image,
}) => {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isApiCall, setIsApiCall] = useState(false);
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [file, setFile] = useState<
    { file_type: string; file_id: string; file_name: string }[]
  >([]);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.overflow = "auto";
    }
  }, [input]);

  let responsetype = "";
  if (isToggleEnabled) {
    console.log("not enabled");
    responsetype = image;
  } else {
    console.log("enabled ");
    responsetype = "";
  }

  const handleSend = async () => {
    if (input.trim() === "") return;
    setIsApiCall(true);
    const user_prompt = input.trim();
    setInput("");
    addMessage(user_prompt, "", true, imageUrl, file);
    setImageUrl([]);
    setFile([]);
    try {
      if (chatMessages.length === 0) {
        const {
          data: { data },
        } = await instance.post(`${API_URL}/ai/api/v1/customgpt/chat`, {
          user_prompt: input,
          custom_gpt_id: customeGptData._id,
          assistant_id: customeGptData.assistant_id,
          image_attachments: imageUrl.map(url => ({ url })),
          attachments: file,
        });
        setChatMessages([...chatMessages, data]);
        onSend(data.response);
      } else {
        const {
          data: { data },
        } = await instance.post(`${API_URL}/ai/api/v1/customgpt/chat`, {
          user_prompt: input,
          custom_gpt_id: customeGptData._id,
          assistant_id: customeGptData.assistant_id,
          thread_id: chatMessages[0].thread_id,
          image_attachments: imageUrl.map(url => ({ url })),
          attachments: file,
          response_type: responsetype,
        });
        setChatMessages([...chatMessages, data]);
        onSend(data.response);
      }
      setIsApiCall(false);
    } catch (error) {
      setIsApiCall(false);
      console.error(error);
    } finally {
      setIsToggleEnabled && setIsToggleEnabled(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isApiCall && input !== "") {
      e.preventDefault();
      handleSend();
    }
  };

  const handleUploadFile = async (file: File) => {
    const imageFileTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/gif",
    ];
    const pdfFileTypes = ["application/pdf"];
    try {
      if (pdfFileTypes.includes(file.type)) {
        const formData = new FormData();
        formData.append("file", file);
        const {
          data: { data },
        } = await instance.post(
          `${API_URL}/ai/api/v1/customgpt/upload`,
          formData
        );
        setFile(prev => [
          ...prev,
          { file_name: file.name, file_id: data.id, file_type: "FILE" },
        ]);
      } else if (imageFileTypes.includes(file.type)) {
        const formData = new FormData();
        formData.append("document", file);
        const {
          data: {
            data: { fileUrl },
          },
        } = await instance.post(
          `${API_URL}/users/api/v1/file/upload`,
          formData
        );
        setImageUrl(prev => [...prev, fileUrl]);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file");
    }
  };

  return (
    <div
      className={`w-full bg-white shadow-lg flex border gap-2 rounded-2xl overflow-hidden px-4 py-3.5 ${
        imageUrl.length ? "items-end" : "items-center"
      }`}
    >
      <div className="justify-end">
        <input
          type="file"
          id="fileUpload"
          className="hidden"
          disabled={isApiCall}
          onChange={e => {
            if (e.target.files && e.target.files[0]) {
              handleUploadFile(e.target.files[0]);
              e.target.value = "";
            }
          }}
        />
        <label
          htmlFor="fileUpload"
          className={`h-11 w-11 rounded-full flex justify-center items-center bg-[#2DA771] hover:bg-opacity-90 transition-all duration-300 text-white ${
            isApiCall ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <Plus />
        </label>
      </div>
      <div className="flex flex-col w-full">
        {imageUrl.length > 0 && (
          <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1.5 pt-[7px]">
            {imageUrl.map((url: string, index: number) => (
              <div
                key={index}
                className="group relative inline-block text-sm text-token-text-primary"
                onClick={() => {
                  setImageUrl(prev => prev.filter((_, i) => i !== index));
                }}
              >
                <div className="relative overflow-hidden rounded-xl border border-token-border-light bg-token-main-surface-primary">
                  <div className="h-14 w-14">
                    <button className="h-full w-full">
                      <span
                        className="flex items-center h-full w-full justify-center bg-gray-500 dark:bg-gray-700 bg-cover bg-center text-white"
                        style={{ backgroundImage: `url(${url})` }}
                      ></span>
                    </button>
                  </div>
                </div>
                <button
                  className="bg-white absolute right-1 top-1 -translate-y-1/2 translate-x-1/2 rounded-full border  p-0.5  transition-colors hover:opacity-100 group-hover:opacity-100 md:opacity-0"
                  onClick={() => {
                    setImageUrl(prev => prev.filter((_, i) => i !== index));
                  }}
                >
                  <X size={10} />
                </button>
              </div>
            ))}
          </div>
        )}
        {file.length > 0 && (
          <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1.5 pt-[7px]">
            {file.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {file.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-100 p-2 rounded-md"
                  >
                    <BookText size={24} />
                    <span className="text-sm truncate ml-2 mr-2">
                      {file.file_name}
                    </span>
                    <button
                      className="ml-auto focus:outline-none"
                      onClick={() => {
                        setFile(prev => prev.filter((_, i) => i !== index));
                      }}
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <textarea
          ref={textareaRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          className="w-full flex-1 p-2 bg-transparent resize-none overflow-auto min-h-11 max-h-[300px]"
          placeholder="What's in your mind?"
        />
      </div>

      <button
        className={`h-12 w-12 flex justify-center items-center bg-[#2DA771] hover:bg-opacity-90 transition-all duration-300 text-white rounded-xl ${
          isApiCall || input === "" ? "opacity-70 cursor-not-allowed" : ""
        }`}
        onClick={handleSend}
        disabled={isApiCall || input === ""}
      >
        <SendIcon2 />
      </button>
    </div>
  );
};

export default ChatInput;
