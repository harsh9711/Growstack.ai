import { ChangeEventHandler, useState } from "react";
import ChatInput from "./ChatInput";
import Image from "next/image";
import Toggle from "react-toggle";
import "react-toggle/style.css"; // for ES6 modules
import {
  CircleAlert,
  File,
  Minus,
  MinusIcon,
  Plus,
  PlusIcon,
  Trash,
} from "lucide-react";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import toast from "react-hot-toast";
import FileUploadModal from "./FileUploadModal";
import { Checkbox } from "@/components/ui/checkbox";

type CustomFile = File & { id?: string; name?: string };
interface SearchFilesProps {
  isToggleCheckedForSearch: boolean;
  setIsToggleCheckedForSearch: (value: boolean) => void;
  vectorStoreId: string | null;
  setVectorStoreId: (value: string | null) => void;
  uploadedSerachFiles: CustomFile[];
  setUploadedSerachFiles: (value: CustomFile[]) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (value: boolean) => void;
}

const SearchFiles = ({
  isToggleCheckedForSearch,
  setIsToggleCheckedForSearch,
  vectorStoreId,
  setVectorStoreId,
  uploadedSerachFiles,
  setUploadedSerachFiles,
  isSearchModalOpen,
  setIsSearchModalOpen,
}: SearchFilesProps) => {
  const [isAPILoading, setIsAPILoading] = useState(false);

  const handleSearchFileUpload = async (file: File) => {
    setIsAPILoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const {
        data: { data },
      } = await instance.post(
        `${API_URL}/ai/api/v1/customgpt/upload`,
        formData
      );
      setUploadedSerachFiles([
        ...uploadedSerachFiles,
        { ...file, name: data.filename, id: data.id },
      ]);
      toast.success("File uploaded successfully");
      setIsAPILoading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsAPILoading(false);
    }
  };
  const handleAttachSearchFiles = async () => {
    try {
      const {
        data: {
          data: { vector_store_id },
        },
      } = await instance.post(
        `${API_URL}/ai/api/v1/customgpt/batch-vector-store`,
        {
          file_ids: uploadedSerachFiles.map((file) => file.id),
        }
      );
      setVectorStoreId(vector_store_id);
      setIsSearchModalOpen(false);
      toast.success("Files attached successfully");
    } catch (error) {
      console.error("Error attaching files:", error);
      toast.error("Error attaching files");
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between gap-x-60">
        <div className="mb-4 flex items-center">
          <Toggle
            defaultChecked={isToggleCheckedForSearch}
            icons={false}
            onChange={() =>
              setIsToggleCheckedForSearch(!isToggleCheckedForSearch)
            }
            className="mr-2"
          />
          <span className="text-md flex flex-row gap-x-2 font-medium">
            File Search
            <CircleAlert size={21} />
          </span>
        </div>

        <div className={`flex items-center ml-4 bg-gray-200 px-2 rounded-2xl`}>
          <button
            className={`flex flex-row items-center ${
              !isToggleCheckedForSearch
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer "
            }`}
            onClick={() => setIsSearchModalOpen(true)}
            disabled={!isToggleCheckedForSearch}
          >
            <PlusIcon width={15} height={20} />
            <span className="text-sm">Files</span>
          </button>
          {isSearchModalOpen && (
            <FileUploadModal
              key="file_search"
              onClose={() => setIsSearchModalOpen(false)}
              onFileUpload={(file: File) => handleSearchFileUpload(file)}
              uploadedFiles={uploadedSerachFiles}
              setUploadedFiles={setUploadedSerachFiles}
              isAPILoading={isAPILoading}
              setIsAPILoading={setIsAPILoading}
              type="file_search"
              handleAttachSearchFiles={handleAttachSearchFiles}
            />
          )}
        </div>
      </div>
      {vectorStoreId && (
        <div className="flex items-center bg-gray-100 p-2 rounded-md">
          <File size={24} />
          <span className="text-sm truncate ml-2">{vectorStoreId}</span>
        </div>
      )}
    </>
  );
};

interface CodeIntepreterFilesProps {
  isToggleCheckedForInterpreter: boolean;
  setIsToggleCheckedForInterpreter: (value: boolean) => void;
  uploadedIntepreterFiles: CustomFile[];
  setUploadedIntepreterFiles: (value: CustomFile[]) => void;
}

const CodeIntepreterFiles = ({
  isToggleCheckedForInterpreter,
  setIsToggleCheckedForInterpreter,
  uploadedIntepreterFiles,
  setUploadedIntepreterFiles,
}: CodeIntepreterFilesProps) => {
  const [isInterpreterModalOpen, setIsInterpreterModalOpen] = useState(false);
  const [isAPILoading, setIsAPILoading] = useState(false);

  const handleCodeInterpreterFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const {
        data: { data },
      } = await instance.post(
        `${API_URL}/ai/api/v1/customgpt/upload`,
        formData
      );
      setUploadedIntepreterFiles([
        ...uploadedIntepreterFiles,
        { ...file, name: data.filename, id: data.id },
      ]);
      setIsInterpreterModalOpen(false);
      toast.success("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file");
    }
  };
  const handleRemoveUploadedFile = (id: any) => {
    try {
      const payload = {
        file_id: id,
      };
      instance.delete(`${API_URL}/ai/api/v1/customgpt/file?code=true`, {
        data: { payload },
      });
      setUploadedIntepreterFiles(
        uploadedIntepreterFiles.filter((file) => file.id !== id)
      );
      toast.success("File removed successfully");
    } catch (error) {
      console.error("Error removing file:", error);
      toast.error("Error removing file");
    }
  };
  return (
    <>
      <div className="flex flex-row justify-between gap-x-20">
        <div className="mb-4 flex items-center">
          <Toggle
            defaultChecked={isToggleCheckedForInterpreter}
            icons={false}
            onChange={() =>
              setIsToggleCheckedForInterpreter(!isToggleCheckedForInterpreter)
            }
            className="mr-2"
          />
          <span className="text-md font-medium flex flex-row gap-x-2">
            Code Interpreter
            <CircleAlert size={21} />
          </span>
        </div>
        <div className={`flex items-center ml-4 bg-gray-200 px-2 rounded-2xl`}>
          <button
            className={`flex flex-row items-center ${
              !isToggleCheckedForInterpreter
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer "
            }`}
            onClick={() => setIsInterpreterModalOpen(true)}
          >
            <PlusIcon width={15} height={20} />
            <span className="text-sm">Files</span>
          </button>

          {isInterpreterModalOpen && (
            <FileUploadModal
              key="code_interpreter"
              onClose={() => setIsInterpreterModalOpen(false)}
              onFileUpload={(file: File) =>
                handleCodeInterpreterFileUpload(file)
              }
              uploadedFiles={uploadedIntepreterFiles}
              setUploadedFiles={setUploadedIntepreterFiles}
              isAPILoading={isAPILoading}
              setIsAPILoading={setIsAPILoading}
              type="code_interpreter"
            />
          )}
        </div>
      </div>
      {uploadedIntepreterFiles.length > 0 && (
        <div className="flex flex-col gap-y-4">
          <h2 className="text-md font-semibold">Uploaded Files</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {uploadedIntepreterFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-100 p-2 rounded-md"
              >
                <File size={24} />
                <span className="text-sm truncate ml-2">{file.name}</span>
                <button
                  className="ml-auto focus:outline-none"
                  onClick={() => handleRemoveUploadedFile(file.id)}
                >
                  <Trash size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

interface SidebarProps {
  conversationStarters: string[];
  setConversationStarters: React.Dispatch<React.SetStateAction<string[]>>;
  isToggleCheckedForSearch: boolean;
  setIsToggleCheckedForSearch: (value: boolean) => void;
  isToggleCheckedForInterpreter: boolean;
  setIsToggleCheckedForInterpreter: (value: boolean) => void;
  vectorStoreId: string | null;
  setVectorStoreId: (value: string | null) => void;
  uploadedIntepreterFiles: CustomFile[];
  setUploadedIntepreterFiles: (value: CustomFile[]) => void;
  formData: {
    name: string;
    description: string;
    instructions: string;
  };
  setFormData: (value: {
    name: string;
    description: string;
    instructions: string;
  }) => void;
  uploadedSerachFiles: CustomFile[];
  setUploadedSerachFiles: (value: CustomFile[]) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (value: boolean) => void;
  capabilities: { IMAGE: boolean; WEB_BROWSING: boolean };
  setCapabilities: (value: { IMAGE: boolean; WEB_BROWSING: boolean }) => void;
  iconImage: string | null;
  setIconImage: (value: string | null) => void;
}

export default function Sidebargpt({
  conversationStarters,
  setConversationStarters,
  isToggleCheckedForSearch,
  setIsToggleCheckedForSearch,
  isToggleCheckedForInterpreter,
  vectorStoreId,
  setVectorStoreId,
  uploadedIntepreterFiles,
  setUploadedIntepreterFiles,
  formData,
  setFormData,
  setIsToggleCheckedForInterpreter,
  uploadedSerachFiles,
  setUploadedSerachFiles,
  isSearchModalOpen,
  setIsSearchModalOpen,
  capabilities,
  setCapabilities,
  iconImage,
  setIconImage,
}: SidebarProps) {
  const handleStartersChange = (index: number, e: any) => {
    const newStarters = [...conversationStarters];
    newStarters[index] = e.target.value;
    setConversationStarters(newStarters);
  };

  const handleAddStarterField = () => {
    if (conversationStarters.length < 4) {
      setConversationStarters((prev: string[]) => [...prev, ""]);
    } else {
      toast.error("Maximum 4 conversation starters allowed");
    }
  };

  const handleRemoveStarterField = (index: number) => {
    if (conversationStarters.length > 1) {
      const newStarters = conversationStarters.filter((_, i) => i !== index);
      setConversationStarters(newStarters);
    }
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  const FileUploadComponent = () => {
    return (
      <div className="flex flex-col justify-start">
        <SearchFiles
          isToggleCheckedForSearch={isToggleCheckedForSearch}
          setIsToggleCheckedForSearch={setIsToggleCheckedForSearch}
          vectorStoreId={vectorStoreId}
          setVectorStoreId={setVectorStoreId}
          uploadedSerachFiles={uploadedSerachFiles}
          setUploadedSerachFiles={setUploadedSerachFiles}
          isSearchModalOpen={isSearchModalOpen}
          setIsSearchModalOpen={setIsSearchModalOpen}
        />
        <div className="border-b border-gray-200 pr-4 mt-4 mb-4"></div>
        <CodeIntepreterFiles
          isToggleCheckedForInterpreter={isToggleCheckedForInterpreter}
          setIsToggleCheckedForInterpreter={setIsToggleCheckedForInterpreter}
          uploadedIntepreterFiles={uploadedIntepreterFiles}
          setUploadedIntepreterFiles={setUploadedIntepreterFiles}
        />
      </div>
    );
  };

  const UploadImageSVG = () => {
    const handleUploadFile = async (file: File) => {
      const formData = new FormData();
      formData.append("document", file);
      try {
        const {
          data: {
            data: { fileUrl },
          },
        } = await instance.post(
          `${API_URL}/users/api/v1/file/upload`,
          formData
        );
        setIconImage(fileUrl);
        toast.success("Icon uploaded successfully");
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Error uploading file");
      }
    };
    const handleImageUpload: ChangeEventHandler<HTMLInputElement> = (event) => {
      const file = event.target.files?.[0];
      if (file) {
        handleUploadFile(file);
      }
    };

    const handleFileInputChange: ChangeEventHandler<HTMLInputElement> = (
      event
    ) => {
      handleImageUpload(event);
      event.target.value = "";
    };

    return (
      <div className="text-center">
        <label
          className="flex items-center justify-center mx-auto"
          htmlFor="fileInput"
        >
          <div className="relative w-28 h-28">
            {iconImage ? (
              <img
                src={iconImage}
                alt="Uploaded"
                className="w-full h-full object-cover rounded-full cursor-pointer"
              />
            ) : (
              <svg
                width="112"
                height="112"
                viewBox="0 0 112 112"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer"
              >
                <circle
                  cx="56"
                  cy="56"
                  r="55.5"
                  stroke="black"
                  strokeDasharray="2 2"
                />
                <path
                  d="M56.0001 42.582V69.4154"
                  stroke="#14171B"
                  strokeWidth="3.35417"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M42.5833 56.0013H69.4166"
                  stroke="#14171B"
                  strokeWidth="3.35417"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </label>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileInputChange}
        />
      </div>
    );
  };

  return (
    // <div className="justify-between flex flex-row w-full h-full transition-all duration-500 opacity-100">
    <div className="flex h-screen">
      {/* First Section */}
      <div className="w-1/2 h-full overflow-auto bg-white rounded-2xl border relative">
        <div className="w-full flex flex-col items-center">
          <div className="w-80 flex relative bg-white border shadow-2xl translate-y-10 rounded-2xl overflow-hidden">
            <div
              className={`w-full h-[48px] flex gap-x-2 justify-center items-center relative cursor-pointer z-[1] transition-all duration-500 bg-primary-green !text-white font-medium`}
            >
              Configure
            </div>
          </div>
          <div className="w-full p-4 px-8 mt-4">
            <div className="mt-10 flex flex-col gap-y-4 ">
              <div className="flex flex-col gap-y-4">
                <div className="mx-auto">
                  <UploadImageSVG />
                </div>
                <div className="w-full mx-auto p-4">
                  <form onSubmit={handleSubmit}>
                    {/* Form Fields */}
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-[14px] font-semibold text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Name your GPT"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 text-gray-800 bg-[#F2F2F2] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="description"
                        className="block text-[14px] font-semibold text-gray-700"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        id="description"
                        name="description"
                        placeholder="Add a short description about what this GPT does"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-[#F2F2F2] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="instructions"
                        className="block text-[14px] font-semibold text-gray-700"
                      >
                        Instructions
                      </label>
                      <textarea
                        id="instructions"
                        placeholder="What does this GPT do? How does it behave? What should it avoid doing?"
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 text-black bg-[#F2F2F2] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      ></textarea>
                    </div>

                    <div className="mb-4">
                      <p className="block text-[14px] font-semibold text-gray-700">
                        Tools
                      </p>
                      <div className="border-b border-gray-200 pr-4 mt-2 mb-2"></div>

                      <FileUploadComponent />
                    </div>

                    <div className="mb-4">
                      <p className="block text-[14px] font-semibold text-gray-700">
                        Capabilities
                      </p>
                      <div className="border-b border-gray-200 pr-4 mt-2 mb-2"></div>
                      <div className="flex gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="IMAGE"
                            onClick={() =>
                              setCapabilities({
                                ...capabilities,
                                IMAGE: !capabilities.IMAGE,
                              })
                            }
                          />
                          <label
                            htmlFor="IMAGE"
                            className="text-sm font-medium leading-none cursor-pointer"
                          >
                            Image
                          </label>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="WEB_BROWSING"
                              onClick={() =>
                                setCapabilities({
                                  ...capabilities,
                                  WEB_BROWSING: !capabilities.WEB_BROWSING,
                                })
                              }
                            />
                            <label
                              htmlFor="WEB_BROWSING"
                              className="text-sm font-medium leading-none cursor-pointer"
                            >
                              Web Browsing
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <p className="block text-[14px] font-semibold text-gray-700">
                        Conversation Starters
                      </p>
                      <div className="border-b border-gray-200 pr-4 mt-2 mb-2"></div>
                      {conversationStarters.map((starter, index) => (
                        <div key={index} className="relative flex gap-2 mt-2">
                          <input
                            type="text"
                            placeholder="Add conversation starters"
                            id={`name${index}`}
                            name={`name${index}`}
                            value={starter}
                            onChange={(e) => handleStartersChange(index, e)}
                            className="block w-full px-3 py-2 text-gray-800 bg-[#F2F2F2] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                          <div className="flex gap-2 justify-end items-center">
                            <div
                              onClick={handleAddStarterField}
                              className="w-8 h-8 bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer"
                            >
                              <Plus />
                            </div>
                            {conversationStarters.length > 1 && (
                              <div
                                onClick={() => handleRemoveStarterField(index)}
                                className="w-8 h-8 bg-gray-500 text-white flex items-center justify-center hover:bg-gray-600 transition-colors cursor-pointer"
                              >
                                <Minus />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div className="w-1/2 h-full overflow-auto bg-gray-100 rounded-2xl relative flex flex-col">
        <div className="w-full p-4 px-8 mt-4">
          <div className="mt-4">
            <h2 className="font-bold text-4xl text-center mb-7">Preview</h2>
            <div className="flex justify-center items-center flex-col mb-7">
              <img
                src={iconImage || "/cookie.png"}
                alt="cookie"
                className="rounded-full w-28 h-28"
              />
              <div>
                <h2 className="font-bold text-[18px] text-center">
                  {formData.name}
                </h2>
                <p className="text-[14px] text-center">
                  {formData.description}
                </p>
              </div>
            </div>
            <div>
              <h2 className="font-bold text-xl text-center">
                Your Conversation Starters
              </h2>
              <div className="!min-h-[100px] grid grid-cols-4 gap-4">
                {conversationStarters.map(
                  (starter, index) =>
                    starter !== "" && (
                      <div
                        key={index}
                        className="p-4 border rounded-lg shadow-md bg-white"
                      >
                        <span className="text-sm">{starter}</span>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex-grow flex items-end">
          <div className="w-full px-4 py-2">
            <ChatInput onSend={() => {}} />
          </div>
        </div> */}
      </div>
    </div>
    // </div>
  );
}
