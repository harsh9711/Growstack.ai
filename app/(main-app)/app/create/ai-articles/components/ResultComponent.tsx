"use client";
import React, { useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import DotsLoader from "@/components/DotLoader";
import { Share2 } from "lucide-react";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";

interface ResultComponentProps {
  articleTitle: string;
  articleData: string;
  images: Array<{ revised_prompt: string; url: string }>;
  setImages: React.Dispatch<React.SetStateAction<Array<{ revised_prompt: string; url: string }>>>;
}

const ResultComponent: React.FC<ResultComponentProps> = ({ articleTitle, articleData, images, setImages }) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const handleShare = async () => {
    setIsPending(true);
    const payload = {
      title: articleTitle,
      article: articleData,
    };
    try {
      const response = await instance.post(API_URL + "/ai/api/v1/wizard/generate/cms", payload);
      toast.success(response.data.message);
      console.log("response.data", response.data.data);
      localStorage.setItem("savedArticle", response?.data?.data);
      router.push(`/app/publish/scheduler/quick-posting`);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="mt-10">
      <div className="!bg-white shadow-box max-w-2xl mx-auto flex flex-col justify-center items-center p-12 space-y-6">
        <Image src="/logo/growstack-mini.png" alt="Growstack logo" width={40} height={40} />
        <h1 className="text-xl font-semibold">Successfully generated</h1>
        <p className="text-primary-black text-opacity-50 text-base !mt-4">You can edit your article in articleDatauments once it is generated.</p>
        <div className="w-full max-w-[150px] mx-auto">
          <button onClick={() => window.location.reload()} className="w-full p-2 h-14 mt-4 text-white sheen bg-primary-green rounded-xl">
            Create New
          </button>
        </div>
      </div>
      <section className="max-w-6xl mx-auto">
        <div className="bg-primary-green rounded-2xl py-6 px-8 flex items-center gap-4 mt-6 justify-between">
          <h2 className="text-lg font-semibold text-white">Final Article</h2>
          <div onClick={handleShare} className="bg-white h-11 w-11 grid place-content-center rounded-lg cursor-pointer">
            {isPending ? <Spinner color="black" /> : <Share2 />}
          </div>
        </div>
        <div className="border !bg-white shadow-box p-10 mt-5 leading-relaxed space-y-3">
          {!articleData ? (
            <div className="flex flex-col items-center justify-center gap-3">
              Your article is being generated
              <DotsLoader />
            </div>
          ) : (
            <>
              <div className="flex justify-center items-center gap-2">
                {images.map((image, index) => (
                  <img src={image.url} key={index} alt="" width={300} height={300} className="rounded-2xl cursor-pointer" />
                ))}
              </div>
              <ReactMarkdown className="prose" remarkPlugins={[remarkGfm]}>
                {articleData}
              </ReactMarkdown>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default ResultComponent;
