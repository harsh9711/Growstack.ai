import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import instance, { CustomAxiosInstance } from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import Spinner from "@/components/Spinner";
import { FaFileUpload } from "react-icons/fa";
import axios from "axios";

interface FileUploadProps {
  onFileUploaded: (fileUrl: string, fileExtension: string) => void;
  acceptedFileTypes: string;
}

const fileTypeMappings: { [key: string]: string[] } = {
  image: [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"],
  video: [".mp4", ".avi", ".mov", ".mkv"],
  audio: [".mp3", ".wav", ".aac"],
  pdf: [".pdf"],
  doc: [".doc"],
  docx: [".docx"],
  xls: [".xls"],
  xlsx: [".xlsx"],
  txt: [".txt"],
  csv: [".csv"],
  others: [
    ".doc",
    ".xls",
    ".jpg",
    ".xlsx",
    ".txt",
    ".jpeg",
    ".csv",
    ".png",
    ".gif",
    ".bmp",
    ".webp",
    ".mp4",
    ".avi",
    ".mov",
    ".mkv",
    ".mp3",
    ".wav",
    ".aac",
    ".pdf",
  ], // Customize or leave empty for files not covered by other types
};

const FileUpload: React.FC<any> = ({
  onFileUploaded,
  acceptedFileTypes,
  isUploadedFileUrl,
}) => {
  const [loading, setLoading] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isUploadedFileUrl?.length > 0) setUploadedFileUrl(isUploadedFileUrl);
  }, [isUploadedFileUrl]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError(null);
    const fileExtension = `${acceptedFiles[0].name.split(".").pop()?.toLowerCase()}`;

    console.log("fileExtension", fileExtension);

    const acceptedTypesArray = acceptedFileTypes
      .split(",")
      .map((type: any) => type.trim().toLowerCase());


    if (!acceptedTypesArray.includes(fileExtension)) {
      setError(
        `File type not supported. Please upload one of the following types: ${acceptedTypesArray?.join(",")}`
      );
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    try {
      // const response = await CustomAxiosInstance().post(
      //   `/workflow/upload`,
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );
      const response = await instance.post(
        `/workflow/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const fileUrl = response?.data?.getS3URL;
      setUploadedFileUrl(fileUrl);
      onFileUploaded(fileUrl, fileExtension);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  },[acceptedFileTypes]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary-green transition"
    >
      <input {...getInputProps()} />
      {loading ? (
        <Spinner color="black" size={30} />
      ) : uploadedFileUrl ? (
        <div className="flex flex-col items-center">
          <img
            src={uploadedFileUrl}
            alt="Uploaded File"
            className="w-24 h-24 object-cover rounded"
          />
          <span className="mt-2 px-2 py-1 text-xs font-semibold text-white bg-green-500 rounded-full">
            Uploaded
          </span>
        </div>
      ) : (
        <>
          <FaFileUpload size={40} className="text-primary-green" />
          <p className="mt-2 text-sm text-gray-500">
            Drag & drop your file here, or click to select a file
          </p>
        </>
      )}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FileUpload;
