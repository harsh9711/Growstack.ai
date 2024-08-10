import { Switch } from "@/components/ui/switch";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import { CircleAlert, File } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import FileUploadModal from "./FileUploadModal";

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
      } = await instance.post(`${API_URL}/ai/api/v1/customgpt/upload`, formData);
      setUploadedSerachFiles([...uploadedSerachFiles, { ...file, name: data.filename, id: data.id }]);
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
      } = await instance.post(`${API_URL}/ai/api/v1/customgpt/batch-vector-store`, {
        file_ids: uploadedSerachFiles.map((file) => file.id),
      });
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
        <div className="mb-4 gap-2 flex items-center">
          <Switch checked={isToggleCheckedForSearch} onCheckedChange={setIsToggleCheckedForSearch} />
          <span className="text-md flex flex-row gap-x-2 font-medium">
            File Search
            <CircleAlert size={21} />
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
