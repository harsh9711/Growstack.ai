"use client";

import Dropzone from "@/components/Dropzone";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { FileRejection } from "react-dropzone";
import { Ppt } from "@/components/svgs";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function PptDialog() {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  function removeImage(): void {
    setFile(null);
  }

  function onFileDrop(
    acceptedFiles: File[],
    rejectedFiles: FileRejection[]
  ): void {
    // if (isLoaded) {
    //   if (!isSignedIn) {
    //     toast({
    //       title: "Uh oh! Something went wrong. ⚠️",
    //       description: "Login or sign up for a free account to design your room",
    //       action: (
    //         <ToastAction altText="Login" onClick={() => router.push("/auth/signin")}>
    //           Login
    //         </ToastAction>
    //       ),
    //     });
    //     return;
    //   }
    // }
    if (rejectedFiles.length > 0) {
      console.info(rejectedFiles);
      toast({
        description: "Please upload a File less than 5MB. ⚠️",
      });
      return;
    }

    removeImage();

    console.info(acceptedFiles);
    setFile(acceptedFiles[0]);
  }

  function fileSize(size: number): string {
    if (size === 0) {
      return "0 Bytes";
    }

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));

    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full hover-card flex items-center justify-between transition duration-500 ring-1 ring-[#E7E7E7] p-6 rounded-2xl cursor-pointer group">
          <div className="space-y-3">
            <h1 className="text-[18px] font-semibold">Import Power Point</h1>
            <p className="text-primary-neutral">
              Convert slides to scene backgrounds
            </p>
          </div>
          <Ppt className="text-primary-neutral group-hover:text-primary-green transition duration-500" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[964px]">
        <div className="space-y-10">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold text-center">
              Import PowerPoint
            </h1>
            <p className="text-center">
              Each slide will be converted into an image and set as a scene
              background.
            </p>
          </div>
          <div>
            <Dropzone onFileDrop={() => {}} />
          </div>
          <div className="flex justify-center gap-x-3 mt-4">
            <DialogClose>
              <button className="border text-primary-black px-8 py-4 rounded-xl flex items-center gap-2">
                Cancel
              </button>
            </DialogClose>
            <button className="bg-primary-green text-white sheen transition duration-500 px-8 py-4 rounded-xl flex items-center gap-2">
              Import power point
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
