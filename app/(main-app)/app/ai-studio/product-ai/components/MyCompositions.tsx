import Motion from "@/components/Motion";
import { UploadIcon } from "@/components/svgs";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const acceptedFileTypes = {};

function Dropzone({ onFileDrop: onFileDrop }: { onFileDrop: () => void }) {
  const onDrop = useCallback(onFileDrop, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxFiles: 1,
    multiple: false,
  });

  return (
    <div className="border border-[#DFDFDF] p-4 rounded-3xl relative">
      <Image
        src="/icons/crown.svg"
        alt=""
        width={35}
        height={35}
        className="absolute top-3 right-3 z-[2]"
      />
      <div
        {...getRootProps()}
        className="outline-none w-full flex justify-center items-center h-[246px] cursor-pointer relative z-[1]"
      >
        <input {...getInputProps()} accept="images/*" />
        {isDragActive ? (
          <p className="text-lg text-center">Drop the files here ...</p>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="bg-primary-green to-primary-purple w-fit p-4 rounded-xl">
              <UploadIcon className="text-white" />
            </div>
            <div className="space-y-2">
              <h1 className="text-xl text-primary-neutral font-semibold text-center">
                Upload composition image
              </h1>
              <p className="text-sm text-center text-primary-grey/60">
                Formats: JPG, PNG, WEBP or HEIC (max. 10MB)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MyCompositions() {
  return (
    <Motion
      transition={{ duration: 0.5 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      classNames="space-y-6"
    >
      <Dropzone onFileDrop={() => {}} />
      <div className="space-y-3">
        <h1 className="text-2xl text-primary-neutral font-semibold">
          Instructions
        </h1>
        <p className="text-primary-neutral leading-relaxed">
          Compositions set the basic structure of your AI Photoshoot photos,
          while prompts let you customize colors, materials, and surroundings
        </p>
      </div>
      <div className="space-y-3">
        <h1 className="text-lg text-primary-neutral font-semibold leading-relaxed">
          What makes a good composition?
        </h1>
        <p className="text-primary-neutral leading-relaxed">
          <ul className="list-disc translate-x-6 pr-6 leading-relaxed">
            <li>High resolution</li>
            <li>Preferably square image</li>
            <li>Plenty of space for the product</li>
            <li>Clean, uncluttered look</li>
            <li>Angle that fits the product</li>
            <li>Not too dark or too light</li>
          </ul>
        </p>
      </div>
      <p className="text-primary-neutral leading-relaxed">
        Also you can save the best result for reuse it for next photoshoots
      </p>
    </Motion>
  );
}
