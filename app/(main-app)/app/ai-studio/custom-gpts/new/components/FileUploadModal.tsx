import { PlusIcon, Trash } from "lucide-react";
import { useState } from "react";
import FileUploaderDropZone from "./FileUploaderDropZone";
import { API_URL } from "@/lib/api";
import instance from "@/config/axios.config";
import toast from "react-hot-toast";
import Spinner from "../../../../../../../public/svgs/spinner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type CustomFile = File & { id?: string; name?: string };

interface UploadFileModalProps {
  disabled: boolean;
  onFileUpload: (file: File) => void;
  uploadedFiles: CustomFile[];
  setUploadedFiles: (files: File[]) => void;
  isAPILoading: boolean;
  setIsAPILoading: (isLoading: boolean) => void;
  type: string;
  handleAttachSearchFiles?: () => void;
}

const FileUploadModal: React.FC<UploadFileModalProps> = ({
  onFileUpload,
  uploadedFiles,
  setUploadedFiles,
  isAPILoading,
  setIsAPILoading,
  type,
  handleAttachSearchFiles,
  disabled,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const removeFile = async (id: any) => {
    try {
      setIsAPILoading(true);
      const payload = {
        file_id: id,
      };
      await instance.delete(`${API_URL}/ai/api/v1/customgpt/file?code=true`, {
        data: { payload },
      });
      setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
      toast.success("File removed successfully");
      setIsAPILoading(false);
    } catch (error) {
      console.error("Error removing file:", error);
      toast.error("Error removing file");
      setIsAPILoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <button
          disabled={disabled}
          className={`bg-gray-200 px-4 rounded-xl flex flex-row items-center space-x-2 ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer "}`}
        >
          <PlusIcon size={20} />
          <span className="text-sm">Files</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl leading-6 font-semibold text-gray-900 mb-4">
            {type === "file_search"
              ? "Attach files to file search"
              : "Attach files to code intepreter"}
          </DialogTitle>
        </DialogHeader>
        {uploadedFiles.length === 0 && (
          <div>
            <FileUploaderDropZone onFileUpload={onFileUpload} type={type} />
          </div>
        )}
        {isAPILoading && <Spinner />}
        {uploadedFiles.length > 0 && (
          <div>
            <label className="block text-[14px] font-medium text-gray-700">
              Uploaded Files
            </label>
            <div className="border-b border-gray-200 pr-4 mt-3 mb-3"></div>
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between mt-3 bg-gray-100 p-2 rounded-xl"
              >
                <span>{file.name}</span>
                <button
                  onClick={() => removeFile(file.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash size={20} />
                </button>
              </div>
            ))}
            {isAPILoading && (
              <div className="mt-2">
                <Spinner />
              </div>
            )}
            <div className="mt-4 flex justify-end">
              <input
                type="file"
                id="file-input"
                className="hidden"
                onChange={e => {
                  if (e.target.files) {
                    onFileUpload(e.target.files[0]);
                  }
                }}
              />
              <label
                htmlFor="file-input"
                className="flex gap-2 px-4 py-2 h-12 items-center justify-center bg-[#2DA771] text-white font-semibold text-sm rounded-xl cursor-pointer sheen"
              >
                <PlusIcon size={20} /> Add files
              </label>
            </div>
          </div>
        )}
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsModalOpen(false)}
            className="flex  rounded-xl border border-gray-300 shadow-sm px-6 py-2 h-12 items-center justify-center bg-white text-base font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => handleAttachSearchFiles && handleAttachSearchFiles()}
            className="flex rounded-xl border border-transparent shadow-sm px-6 py-2 h-12 items-center justify-center bg-[#2DA771] text-base font-medium text-white sheen"
          >
            Attach
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadModal;
