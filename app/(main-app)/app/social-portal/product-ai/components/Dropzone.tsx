"use client";

import Image from "next/image";
import React, { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";

interface Props {
  onFileDrop: (acceptedFiles: File[], rejectedFiles: FileRejection[]) => void;
}
const acceptedFileTypes = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "image/heic": [".heic"],
};

export default function Dropzone({ onFileDrop: onFileDrop }: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length > 0) {
        toast.error("Please upload only image of type JPG/JPEG/PNG/WEBP/HEIC");
      }
      onFileDrop(acceptedFiles, rejectedFiles);
    },
    [onFileDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="b outline-none w-full flex justify-center items-center h-[396px] cursor-pointer"
    >
      <input {...getInputProps()} accept="images/*" />
      {isDragActive ? (
        <p className="text-lg text-center">Drop the files here ...</p>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/assets/file-uploader__upload-icon_margin.svg"
            alt="upload"
            width={120}
            height={120}
          />
          <div className="space-y-2">
            <h1 className="text-2xl text-primary-neutral font-semibold text-center">
              Upload your product image to get started
            </h1>
            <h2 className="text-lg text-center font-semibold !mt-2">
              <span className="text-primary-green">Click to upload</span> or
              drag and drop
            </h2>
            <p className="text-xs text-center text-primary-grey">
              Formats: JPG, JPEG, PNG, WEBP or HEIC (max. 10MB)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
