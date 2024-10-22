import { Switch } from "@/components/ui/switch";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import { CircleAlert, File, Trash } from "lucide-react";
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

interface SearchFilesProps {
  isToggleCheckedForSearch: boolean;
  setIsToggleCheckedForSearch: (value: boolean) => void;
  vectorStoreId: string | null;
  setVectorStoreId: (value: string | null) => void;
  uploadedSerachFiles: CustomFile[];
  setUploadedSerachFiles: (value: CustomFile[]) => void;
}

const SearchFiles = ({
  isToggleCheckedForSearch,
  setIsToggleCheckedForSearch,
  vectorStoreId,
  setVectorStoreId,
  uploadedSerachFiles,
  setUploadedSerachFiles,
}: SearchFilesProps) => {
  const [isAPILoading, setIsAPILoading] = useState(false);

  const handleSearchFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    setIsAPILoading(true);
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
      setIsAPILoading(false);
      toast.success("File uploaded successfully");
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsAPILoading(false);
      toast.error("Error uploading file");
    }
  };

  const handleRemoveUploadedFile = (id: any) => {
    try {
      const updatedFiles = uploadedSerachFiles.filter(file => file.id !== id);
      setUploadedSerachFiles(updatedFiles);
      toast.success("File removed successfully");
    } catch (error) {
      console.error("Error removing file:", error);
      toast.error("Error removing file");
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
          file_ids: uploadedSerachFiles.map(file => file.id),
        }
      );
      setVectorStoreId(vector_store_id);
      toast.success("Files attached successfully");
    } catch (error) {
      console.error("Error attaching files:", error);
      toast.error("Error attaching files");
    }
  };

  return (
    <>
      <div className="flex flex-row justify-between gap-x-20">
        <div className="mb-4 gap-2 flex items-center">
          <Switch
            checked={isToggleCheckedForSearch}
            onCheckedChange={setIsToggleCheckedForSearch}
          />
          <span className="text-md font-medium flex flex-row gap-x-2">
            File Search
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info
                    size={21}
                    className="ml-2 text-primary-black text-opacity-50 cursor-pointer"
                  />
                </TooltipTrigger>
                <TooltipContent className="bg-white">
                  <p>upload pdf file.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {/* <CircleAlert size={21} /> */}
          </span>
        </div>
        <FileUploadModal
          key="file_search"
          disabled={!isToggleCheckedForSearch}
          onFileUpload={(file: File) => handleSearchFileUpload(file)}
          uploadedFiles={uploadedSerachFiles}
          setUploadedFiles={setUploadedSerachFiles}
          isAPILoading={isAPILoading}
          setIsAPILoading={setIsAPILoading}
          type="file_search"
          handleAttachSearchFiles={handleAttachSearchFiles}
        />
      </div>
      {uploadedSerachFiles.length > 0 && (
        <div className="flex flex-col gap-y-4">
          <h2 className="text-md font-semibold">Uploaded Files</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {uploadedSerachFiles.map((file, index) => (
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
      {vectorStoreId && (
        <div className="flex items-center bg-gray-100 p-2 rounded-md">
          <File size={24} />
          <span className="text-sm truncate ml-2">{vectorStoreId}</span>
        </div>
      )}
    </>
  );
};

export default SearchFiles;
