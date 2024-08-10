"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
interface Props {
  onFileDrop: (acceptedFiles: File[], rejectedFiles: FileRejection[]) => void;
}
const acceptedFileTypes = {};

export default function Dropzone({ onFileDrop: onFileDrop }: Props) {
  const onDrop = useCallback(onFileDrop, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="border-[2px] rounded-[24px] border-primary-grey/70 border-dashed outline-none w-full flex justify-center items-center h-[326px] max-w-2xl mx-auto cursor-pointer">
      <input {...getInputProps()} accept="images/*" />
      {isDragActive ? (
        <p className="text-lg text-center">Drop the files here ...</p>
      ) : (
        <div className="flex flex-col items-center gap-10">
          <div className="bg-[#4B465C14] w-fit p-3 rounded-lg">
            <Image src="/icons/upload.svg" alt="upload" width={40} height={40} />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl text-primary-neutral font-semibold text-center">Drop files here or click to upload</h1>
            <p className="text-sm text-center text-primary-neutral">You can import from .ppt and .pptx formats.</p>
          </div>
        </div>
      )}
    </div>
  );
}
