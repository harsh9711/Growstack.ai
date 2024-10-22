import { Switch } from "@/components/ui/switch";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import { CircleAlert, File, PlusIcon, Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import FileUploadModal from "./FileUploadModal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

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
        uploadedIntepreterFiles.filter(file => file.id !== id)
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
        <div className="mb-4 gap-2 flex items-center">
          <Switch
            checked={isToggleCheckedForInterpreter}
            onCheckedChange={setIsToggleCheckedForInterpreter}
          />
          <span className="text-md font-medium flex flex-row gap-x-2 ">
            Code Interpreter
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info
                    size={21}
                    className="ml-2 text-primary-black text-opacity-50 cursor-pointer"
                  />
                </TooltipTrigger>
                <TooltipContent
                  className="bg-white"
                  style={{ width: "250px", zIndex: "1000" }}
                >
                  <p style={{ fontSize: "10px !important" }}>
                    The Code Interpreter allows you to run code snippets and
                    analyze data seamlessly within this platform.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
        </div>
        <FileUploadModal
          key="code_interpreter"
          disabled={!isToggleCheckedForInterpreter}
          onFileUpload={(file: File) => handleCodeInterpreterFileUpload(file)}
          uploadedFiles={uploadedIntepreterFiles}
          setUploadedFiles={setUploadedIntepreterFiles}
          isAPILoading={isAPILoading}
          setIsAPILoading={setIsAPILoading}
          type="code_interpreter"
        />
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

export default CodeIntepreterFiles;
