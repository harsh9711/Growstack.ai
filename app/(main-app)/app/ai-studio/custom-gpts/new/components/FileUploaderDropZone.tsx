import { UploadIcon } from "lucide-react";
import { useDropzone } from "react-dropzone";

interface FileDropZoneProps {
  onFileUpload: (file: File) => void;
  type: string;
}

const FileUploaderDropZone = ({ onFileUpload, type }: FileDropZoneProps) => {
  const onDrop = async (acceptedFiles: File[]) => {
    try {
      onFileUpload(acceptedFiles[0]);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="h-[340px] bg-gray-50 px-2 py-2.5 flex flex-col justify-center items-center mx-auto text-black cursor-pointer space-y-4 rounded-3xl">
      <input {...getInputProps()} />
      <div className="bg-gray-100 h-20 w-20 rounded-xl grid place-content-center">
        <UploadIcon size={40} className="text-gray-500" />
      </div>
      <h2 className="text-black text-xl font-bold">
        Drag your files here or
        <span className="text-primary-green"> click to upload</span>
      </h2>
      <p className="text-[14px]">Information in attached files will be available to this assistant</p>
    </div>
  );
};

export default FileUploaderDropZone;
