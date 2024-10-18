"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { API_URL } from "@/lib/api";
import instance from "@/config/axios.config";
import Spinner from "@/components/Spinner";
import { SendIcon } from "@/components/svgs";

export default function NewEmailDialog({
  generateHtml,
  setGeneratedHtml,
  setLoading,
}: {
  generateHtml: string;
  setGeneratedHtml: (value: string) => void;
  setLoading: (value: boolean) => void;
}) {
  const [prompt, setPrompt] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setGeneratedHtml("");
    setLoading(true);
    try {
      const response = await instance.post(
        `${API_URL}/ai/api/v1/generate-email-template`,
        {
          user_prompt: prompt,
          model: "gpt-4o",
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setGeneratedHtml(response.data.data.html);
      } else {
        toast.error("Failed to generate website");
      }
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
      console.error("Error generating website:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog defaultOpen={!generateHtml}>
      <DialogTrigger asChild>
        <button className="!bg-white shadow-box border h-20 w-20 !rounded-full fixed bottom-10 right-10">
          <Image src="/gifs/magic-tool.gif" alt="" width={100} height={100} />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[986px]">
        <main className="flex-1 h-full w-full flex flex-col justify-center items-center gap-6 mb-24">
          <Image
            src="/logo/growstack.png"
            alt=""
            width={200}
            height={200}
            className="max-h-10 overflow-hidden"
          />
          <h1 className="text-3xl font-semibold text-center">
            Create email with AI
          </h1>
          <p className="text-center max-w-4xl mx-auto leading-relaxed text-primary-black text-opacity-70">
            Lorem ipsum dolor sit amet consectetur. A pharetra vitae at
            scelerisque eu et aliquam id. Sollicitudin suspendisse at elementum
            lorem. In quis quis et.
          </p>
          <div className="!bg-white shadow-box pl-4 pr-2 py-2 !rounded-2xl border border-[#E8E8E8] w-full max-w-3xl flex gap-4 shadow-xl shadow-gray-200/60">
            <Image
              src="/logo/growstack-mini.png"
              alt=""
              width={25}
              height={25}
            />
            <input
              className="h-11 w-full"
              placeholder="An email to welcome new subscribers"
              value={prompt}
              onChange={handleInputChange}
            />
            <DialogClose>
              <button
                className="bg-primary-green p-3 rounded-2xl grid place-content-center"
                onClick={handleSubmit}
              >
                <SendIcon />
              </button>
            </DialogClose>
          </div>
        </main>
      </DialogContent>
    </Dialog>
  );
}
