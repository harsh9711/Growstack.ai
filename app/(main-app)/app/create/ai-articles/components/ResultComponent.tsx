"use client";
import React, { useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import DotsLoader from "@/components/DotLoader";
import { CopyIcon, Share2 } from "lucide-react";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/Dropdown";
import { saveAs } from "file-saver";
import downloadPdf from "@/utils/downloadPdf";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ResultComponentProps {
  articleTitle: string;
  articleData: string;
  images: Array<{ revised_prompt: string; url: string }>;
  setImages: React.Dispatch<React.SetStateAction<Array<{ revised_prompt: string; url: string }>>>;
}

const ResultComponent: React.FC<ResultComponentProps> = ({ articleTitle, articleData, images, setImages }) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const handleShare = async () => {
    setIsPending(true);
    const payload = {
      title: articleTitle,
      article: articleData,
    };
    try {
      const response = await instance.post(API_URL + "/ai/api/v1/wizard/generate/cms", payload);
      toast.success(response.data.message);
      localStorage.setItem("savedArticle", response?.data?.data);
      setInputValue(response?.data?.data)
      setOpen(true)
      handleClickOpen()
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

  const stripHtmlTags = (html: string) => {
    const temp = document.createElement("div");
    temp.innerHTML = html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n\n");
    return temp.textContent || temp.innerText || "";
  };

  const handleDownload = async (selectedOption: string) => {
    let plainTextContent = stripHtmlTags(articleData);

    const formats = {
      "Download as DOC": plainTextContent,
      "Download as PDF": plainTextContent,
    };

    switch (selectedOption) {
      case "Download as DOC":
        const docContent = formats["Download as DOC"];
        const docBlob = new Blob([docContent], {
          type: "application/msword;charset=utf-8",
        });
        saveAs(docBlob, `${articleTitle}.doc`);
        break;
      case "Download as PDF":
        downloadPdf(formats["Download as PDF"], {
          language: "english",
        }, articleTitle);
        break;
      default:
        console.error("Unsupported download option");
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePublish = () => {
    router.push(`/app/publish/scheduler/quick-posting`);
    setOpen(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inputValue);
    setCopied(true);

    // Hide the "Copied" message after 1 second
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  return (
    <div className="mt-10">
      <div className="!bg-white shadow-box max-w-2xl mx-auto flex flex-col justify-center items-center p-12 space-y-6">
        <Image src="/logo/growstack-mini.png" alt="Growstack logo" width={40} height={40} />
        <h1 className="text-xl font-semibold">Successfully generated</h1>
        <p className="text-primary-black text-opacity-50 text-base !mt-4 text-center">Your article has been successfully generated! Feel free to share it on your social media accounts.</p>
        <div className="w-full max-w-[150px] mx-auto">
          <button onClick={() => window.location.reload()} className="w-full p-2 h-14 mt-4 text-white sheen bg-primary-green rounded-xl">
            Create New
          </button>
        </div>
      </div>
      <section className="max-w-6xl mx-auto">
        <div className="bg-primary-green rounded-2xl py-6 px-8 flex items-center gap-4 mt-6 justify-between">
          <h2 className="text-lg font-semibold text-white">Final Article</h2>
          <div className="flex flex-row gap-2 items-center">
            <Dropdown
              hideSearch
              label="Download"
              items={[
                "Download as DOC",
                "Download as PDF",
              ]}
              onChange={(value: any) => handleDownload(value)}
            />
            <div onClick={handleShare} className="bg-white h-11 w-11 grid place-content-center rounded-lg cursor-pointer">
              {isPending ? <Spinner color="black" /> : <Share2 />}
            </div>
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
              <ReactMarkdown className="prose"
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[rehypeRaw]}
              >
                {articleData}
              </ReactMarkdown>
            </>
          )}
        </div>
      </section>

      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
          <DialogTitle>Share The Content in Linked In</DialogTitle>
          <div className="flex justify-end" style={{position:'absolute',marginTop:"4rem",marginLeft:"41rem"}}>
          {copied && (
              <span className="text-green-600">Copied!</span>
            )}
          </div>
        
          <div className="flex">
            <input
              readOnly className="w-full"
              placeholder="Url"
              value={inputValue}
              onChange={(e: any) => setInputValue(e.target.value)}

            />
          
            <div className="p-3" onClick={handleCopy} style={{ cursor: "pointer" }} >
              <CopyIcon />
            </div>
          </div>



          <div className="flex justify-end">

            <button
              className="bg-gray-300 px-4 py-2 rounded-md text-gray-700" onClick={handleClose}>Cancel</button>
            <button
              className="bg-primary-green px-4 py-2 rounded-md text-white ml-3" onClick={handlePublish} >Publish</button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResultComponent;
