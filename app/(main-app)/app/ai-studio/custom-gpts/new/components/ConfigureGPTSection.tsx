import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import { ImageIcon, Minus, Plus, XIcon } from "lucide-react";
import { ChangeEventHandler, useState } from "react";
import toast from "react-hot-toast";
import CodeIntepreterFiles from "./CodeInterpretorFiles";
import SearchFiles from "./SearchFiles";
import Image from "next/image";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import CreateForm from "./CreateForm";
type ToolResources = {
  code_interpreter?: {
    file_ids?: string[];
  };
  file_search?: {
    vector_store_ids?: string[];
  };
};

type ConversationPayLoad = {
  name: string;
  description: string;
  instruction: string;
  tools?: { type?: string }[];
  tool_resources?: ToolResources;
  conversation_starter?: string[];
  capabilities?: string[];
  icon?: string;
};

interface ConfigureGPTSectionProps {
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

export default function ConfigureGPTSection({
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
}: ConfigureGPTSectionProps) {
  const handleStartersChange = (index: number, e: any) => {
    const newStarters = [...conversationStarters];
    newStarters[index] = e.target.value;
    setConversationStarters(newStarters);
  };
  const router = useRouter();

  const handleAddStarterField = () => {
    if (conversationStarters.length < 4) {
      setConversationStarters((prev: string[]) => [...prev, ""]);
    } else {
      toast.error("Maximum 4 conversation starters allowed");
    }
  };
  const [isAPICalled, setIsAPICalled] = useState<boolean>(false);

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
    const handleImageUpload: ChangeEventHandler<HTMLInputElement> = event => {
      const file = event.target.files?.[0];
      if (file) {
        handleUploadFile(file);
      }
    };

    const handleFileInputChange: ChangeEventHandler<
      HTMLInputElement
    > = event => {
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
  const handleCreateConversation = async () => {
    try {
      if (!iconImage) {
        toast.error("Please upload an icon image");
        return;
      } else if (!formData.name) {
        toast.error("Please enter the name");
        return;
      } else if (!formData.description) {
        toast.error("Please enter the description");
        return;
      } else if (!formData.instructions) {
        toast.error("Please enter the instructions");
        return;
      }
      setIsAPICalled(true);
      const payload: ConversationPayLoad = {
        name: formData.name,
        description: formData.description,
        instruction: formData.instructions,
        icon: iconImage,
      };
      const tools = [],
        tool_resources: ToolResources = {},
        cap = [];
      if (isToggleCheckedForSearch) {
        tools.push({ type: "file_search" });
        if (vectorStoreId) {
          tool_resources.file_search = { vector_store_ids: [vectorStoreId] };
        }
      }
      if (isToggleCheckedForInterpreter) {
        tools.push({ type: "code_interpreter" });
        if (uploadedIntepreterFiles.length > 0) {
          tool_resources.code_interpreter = {
            file_ids: uploadedIntepreterFiles.map(file => file.id ?? ""),
          };
        }
      }
      if (tools.length) {
        payload.tools = tools;
      }
      if (Object.keys(tool_resources).length) {
        payload.tool_resources = tool_resources;
      }
      if (
        conversationStarters.length > 1 ||
        (conversationStarters.length === 1 && conversationStarters[0] !== "")
      ) {
        payload.conversation_starter = conversationStarters.filter(
          starter => starter !== ""
        );
      }
      if (capabilities.IMAGE || capabilities.WEB_BROWSING) {
        if (capabilities.IMAGE) {
          cap.push("IMAGE");
        }
        if (capabilities.WEB_BROWSING) {
          cap.push("WEB_BROWSING");
        }
        payload.capabilities = cap;
      }
      const {
        data: {
          data: {
            customGptConvo: { custom_gpt_id },
          },
        },
      } = await instance.post(`${API_URL}/ai/api/v1/customgpt/create`, {
        ...payload,
      });
      setIsAPICalled(false);
      toast.success("Conversation created successfully");
      router.push(
        `/app/ai-studio/custom-gpts/gpt/?custom_gpt_id=${custom_gpt_id}`
      );
    } catch (error: any) {
      toast.error("Failed to create conversation");
      console.error(error);
      setIsAPICalled(false);
    }
  };

  return (
    <>
      <div className="flex h-[calc(100vh-248px)]">
        <div className="w-full h-full overflow-auto bg-white rounded-3xl border relative">
          <div
            className="w-[20%] h-[58px] flex gap-x-2 justify-center items-center relative cursor-pointer z-[1] transition-all duration-500 bg-primary-green !text-white font-medium"
            style={{ borderBottomRightRadius: "30px" }}
          >
            <h1>Configure</h1>
          </div>
          <div className="w-full flex flex-col items-center">
            <div className="w-full p-2 px-8">
              <div className="mt-10 flex flex-col gap-y-4 ">
                <div className="flex flex-col gap-y-4">
                  <div className="mx-auto">
                    <UploadImageSVG />
                  </div>
                  <div className="w-full mx-auto p-4">
                    <form onSubmit={handleSubmit}>
                      {/* Form Fields */}
                      <div className="mb-4 space-y-2">
                        <label
                          htmlFor="name"
                          className="block text-[14px] text-gray-700"
                        >
                          Name
                        </label>
                        <Input
                          type="text"
                          placeholder="Name your GPT"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="mb-4 space-y-2">
                        <label
                          htmlFor="description"
                          className="block text-[14px] text-gray-700"
                        >
                          Description
                        </label>
                        <Input
                          type="text"
                          id="description"
                          name="description"
                          placeholder="Add a short description about what this GPT does"
                          value={formData.description}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="mb-4 space-y-2">
                        <label
                          htmlFor="instructions"
                          className="block text-[14px] text-gray-700"
                        >
                          Instructions
                        </label>
                        <textarea
                          id="instructions"
                          placeholder="What does this GPT do? How does it behave? What should it avoid doing?"
                          name="instructions"
                          value={formData.instructions}
                          onChange={handleChange}
                          className="mt-1 block w-full p-4 h-40 text-black bg-[#F2F2F2] border-gray-300 rounded-xl resize-none"
                        ></textarea>
                      </div>

                      <div className="mb-4 space-y-2">
                        <p className="block text-[14px] text-gray-700">Tools</p>
                        <div className="border-b border-gray-200 pr-4 mt-2 mb-2"></div>

                        <FileUploadComponent />
                      </div>

                      <div className="mb-4 space-y-4">
                        <div className="border-b border-gray-200 mt-2 pb-2">
                          <p className="block text-[14px] text-gray-700">
                            Capabilities
                          </p>
                        </div>
                        <div className="flex gap-8">
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

                      <div className="relative !mt-8">
                        <div className="border-b border-gray-200 mt-2 pb-2 mb-4">
                          <p className="block text-[14px] text-gray-700">
                            Conversation Starters
                          </p>
                        </div>
                        {conversationStarters.map((starter, index) => (
                          <div key={index} className="relative gap-2 mt-2 flex">
                            <div className="mb-2 w-full rounded-xl bg-[#F2F2F2] items-center flex">
                              <Input
                                type="text"
                                placeholder="Add conversation starters"
                                id={`name${index}`}
                                name={`name${index}`}
                                value={starter}
                                onChange={e => handleStartersChange(index, e)}
                                className="w-full p-3 bg-transparent h-[50px]"
                              />
                              {/* {conversationStarters.length > 1 && (
                              <div className="flex justify-end">
                                <button type="button" onClick={() => handleRemoveStarterField(index)} className="bg-white p-1 rounded-xl mr-2">
                                  <XIcon size={20} className="text-rose-500" />
                                </button>
                              </div>
                            )} */}
                            </div>
                            {conversationStarters.length > 1 && (
                              <button
                                type="button"
                                className="bg-red-500 text-white py-3 px-4 hover:bg-opacity-90 rounded-l-3xl rounded-r-lg"
                                onClick={() => handleRemoveStarterField(index)}
                              >
                                <Minus />
                              </button>
                            )}
                            {index === conversationStarters.length - 1 &&
                              index > 0 && (
                                <button
                                  type="button"
                                  className="bg-primary-green text-white py-3 px-4 hover:bg-opacity-90 rounded-l-3xl rounded-r-lg"
                                  onClick={handleAddStarterField}
                                >
                                  <Plus />
                                </button>
                              )}
                            {conversationStarters.length === 1 && (
                              <button
                                type="button"
                                className="bg-primary-green text-white py-3 px-4 hover:bg-opacity-90 rounded-l-3xl rounded-r-lg"
                                onClick={handleAddStarterField}
                              >
                                <Plus />
                              </button>
                            )}
                          </div>
                        ))}
                        <div className="flex gap-2 justify-end items-cente mt-5">
                          {/* <div
                          onClick={handleAddStarterField}
                          className="sheen h-12 px-6 rounded-xl bg-primary-green text-white flex gap-x-2 items-center justify-center hover:bg-primary-green transition-colors cursor-pointer">
                          <Plus />
                          Add Conversation Starter
                        </div> */}

                          <CreateForm
                            handleCreateConversation={handleCreateConversation}
                            isAPICalled={isAPICalled}
                            from="CREATE"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-full bg-gray-100 rounded-2xl relative flex flex-col">
          <div className="mt-4 flex-1 flex flex-col px-8 pb-8">
            <h2 className="font-semibold text-xl text-center">Preview</h2>
            <div className="flex-1 flex flex-col justify-center items-center mb-48">
              <div className="flex justify-center items-center flex-col mb-7">
                {iconImage ? (
                  <Image
                    src={iconImage}
                    alt="cookie"
                    width={112}
                    height={112}
                    className="rounded-full w-28 h-28"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-full bg-white grid place-content-center">
                    <ImageIcon size={30} className="text-gray-400" />
                  </div>
                )}
                <div className="mt-5 space-y-3">
                  <h2 className="font-bold text-[18px] text-center">
                    {formData.name ? formData.name : "[Your GPT Name]"}
                  </h2>
                  <p className="text-[14px] text-center">
                    {formData.description
                      ? formData.description
                      : "[Your custom GPT description ie Short & Concise]"}
                  </p>
                </div>
              </div>
              {conversationStarters.some(starter => starter.length > 0) && (
                <div className="w-full">
                  <h2 className="font-bold text-xl text-center">
                    Your Conversation Starters
                  </h2>
                  <div
                    className={clsx(
                      "w-full grid gap-4 mt-6",
                      conversationStarters.length === 1
                        ? "grid-cols-1"
                        : conversationStarters.length === 2
                          ? "grid-cols-2"
                          : conversationStarters.length === 3
                            ? "grid-cols-3"
                            : "grid-cols-4"
                    )}
                  >
                    {conversationStarters.map((starter, index) => (
                      <div
                        key={index}
                        className="text-sm whitespace-pre-line bg-white p-4 border rounded-2xl shadow-md break-words"
                      >
                        {starter}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
