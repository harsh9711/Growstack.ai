"use client";

import { SendIcon } from "@/components/svgs";
import Image from "next/image";
import { TbArrowUpRight } from "react-icons/tb";
import { useState } from "react";
import instance from "@/config/axios.config";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";
import { API_URL } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useGeneratedHtml } from "../context/GeneratedHtmlContext";

export default function NewWebsite() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const { setGeneratedHtml } = useGeneratedHtml();
  const router = useRouter();

  const suggestions = [
    "A digital agency landing page",
    "A fashion design landing page",
    "A tech company landing page",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  };

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setLoading(true);

    try {
      const response = await instance.post(
        `${API_URL}/ai/api/v1/generate-website`,
        {
          user_prompt: prompt,
          model: "gpt-4o",
        }
      );

      if (response.data.success) {
        setGeneratedHtml(response.data.data.html);
        router.push(`/app/automation-hub/website-builder/new-website/view`);
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
    <main className="flex-1 h-full w-full flex flex-col justify-center items-center gap-6 mb-24">
      <Image src="/logo/growstack-mini.png" alt="" width={60} height={60} />
      <h1 className="text-3xl font-semibold text-center">
        Create landing page with AI
      </h1>
      <p className="text-center max-w-4xl mx-auto leading-relaxed text-primary-black text-opacity-70">
        Ultimate solution for designing landing pages with the aid of
        cutting-edge AI technology. Say goodbye to hours of coding and designing
        – AIPage.dev is here to transform your ideas into reality with just a
        single prompt.
      </p>
      <div className="bg-white pl-4 pr-2 py-2 rounded-2xl border border-[#E8E8E8] w-full max-w-3xl flex gap-4 shadow-xl shadow-gray-200/60">
        <Image src="/logo/growstack-mini.png" alt="" width={25} height={25} />
        <input
          className="h-11 w-full"
          placeholder="A landing page for cozy bakery"
          value={prompt}
          onChange={handleInputChange}
        />
        <button
          className="bg-primary-green p-3 rounded-2xl grid place-content-center"
          onClick={handleSubmit}
        >
          {loading ? <Spinner /> : <SendIcon />}
        </button>
      </div>
      <h2 className="text-sm text-primary-black text-opacity-60">
        Describe your business
      </h2>
      <div className="flex items-center gap-4">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="cursor-pointer hover:shadow-lg hover:shadow-gray-200 transition duration-300 flex items-center gap-2 bg-white border border-[#EBEBEB] py-3 px-4 rounded-xl text-sm"
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion} <TbArrowUpRight size={22} />
          </div>
        ))}
      </div>
    </main>
  );
}
