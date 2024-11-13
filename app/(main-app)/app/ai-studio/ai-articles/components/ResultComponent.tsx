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
import { ISubtitleTalkingPoints } from "../types";
import { API_URL } from "@/lib/api";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import Dropdown from "@/components/Dropdown";
import { saveAs } from "file-saver";
import downloadPdf from "@/utils/downloadPdf";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StarRating } from "./Star";

interface ResultComponentProps {
  articleTitle: string;
  articleData: string;
  keywords: string[];
  talkingPoints: ISubtitleTalkingPoints[];
  setArticleData: React.Dispatch<React.SetStateAction<string>>;
  images: Array<{ revised_prompt: string; url: string }>;
  setScore: React.Dispatch<React.SetStateAction<string>>;
  score: string;
  setImages: React.Dispatch<
    React.SetStateAction<Array<{ revised_prompt: string; url: string }>>
  >;
}

const ResultComponent: React.FC<ResultComponentProps> = ({
  articleTitle,
  articleData,
  talkingPoints,
  setScore,
  keywords,
  setArticleData,
  score,
  images,
}) => {
  const router = useRouter();
  const [isArticlePending, setIsArticlePending] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const handleShare = async () => {
    setIsPending(true);
    const payload = {
      title: articleTitle,
      article: articleData,
    };
    try {
      const response = await instance.post(
        API_URL + "/ai/api/v1/wizard/generate/cms",
        payload
      );
      toast.success(response.data.message);
      localStorage.setItem("savedArticle", response?.data?.data);
      setInputValue(response?.data?.data);
      setOpen(true);
      handleClickOpen();
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

  const generateArticle = () => {
    const data = {
      title: articleTitle,
      subtitles_with_talking_points: talkingPoints,
      keywords: keywords,
    };

    setArticleData("");
    setIsArticlePending(true);
    instance
      .post("/ai/api/v1/wizard/generate", data)
      .then(response => {
        const {
          data: { data },
        } = response;
        console.log("data", data);

        // setCurrentStep(4);
        setArticleData(data);
      })
      .catch(err => {
        toast.error(err.response.data.message || err.message);
        console.log(err);
      })
      .finally(() => {
        setIsArticlePending(false);
      });
  };

  const stripHtmlTags = (html: string) => {
    const temp = document.createElement("div");
    temp.innerHTML = html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n\n");
    return temp.textContent || temp.innerText || "";
  };

  const handleDownload = async (selectedOption: string) => {
    const plainTextContent = stripHtmlTags(articleData);

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
        downloadPdf(
          formats["Download as PDF"],
          {
            language: "english",
          },
          articleTitle
        );
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
        <Image
          src="/logo/growstack-mini.png"
          alt="Growstack logo"
          width={40}
          height={40}
        />
        <h1 className="text-xl font-semibold">Successfully generated</h1>
        <p className="text-primary-black text-opacity-50 text-base !mt-4 text-center">
          Your article has been successfully generated! Feel free to share it on
          your social media accounts.
        </p>
        <div className="w-full max-w-[150px] mx-auto">
          <button
            onClick={() => window.location.reload()}
            className="w-full p-2 h-14 mt-4 text-white sheen bg-primary-green rounded-xl"
          >
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
              items={["Download as DOC", "Download as PDF"]}
              onChange={(value: any) => handleDownload(value)}
            />
            <div
              onClick={handleShare}
              className="bg-white h-11 w-11 grid place-content-center rounded-lg cursor-pointer"
            >
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
              <div className="flex justify-end">
                <StarRating score={Math.round(parseFloat(score))} size={20} />:{" "}
                {Math.round(parseFloat(score))}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={generateArticle}
                  className="w-full p-2 flex items-center justify-center gap-2 h-14 mt-4 text-white sheen bg-primary-green rounded-xl max-w-[150px]"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 94 84"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M66.1699 41.0721L53.2119 41.0691V18.8491C53.2119 17.0401 51.7449 15.5781 49.9409 15.5781C48.1369 15.5781 46.6699 17.0411 46.6699 18.8491V44.3411C46.6699 46.1491 48.1369 47.6121 49.9409 47.6121H49.9459H66.1689C67.9739 47.6121 69.4389 46.1491 69.4389 44.3421C69.4379 42.5381 67.9729 41.0721 66.1699 41.0721Z"
                      fill="#FFFFFF"
                    />
                    <path
                      d="M81.1068 12.2085C64.8288 -4.0695 38.3408 -4.0695 22.0578 12.2085C14.8738 19.3945 10.6118 28.8005 9.92776 38.8755L5.67375 34.2945C4.44275 32.9725 2.36976 32.8935 1.04676 34.1225C-0.279245 35.3535 -0.355245 37.4265 0.874755 38.7525L10.3498 48.9545C10.9948 49.6485 11.8708 50.0005 12.7498 50.0005C13.5468 50.0005 14.3458 49.7115 14.9768 49.1265L25.1818 39.6505C26.5078 38.4195 26.5838 36.3465 25.3538 35.0225C24.1238 33.6975 22.0508 33.6175 20.7258 34.8505L16.5418 38.7345C17.2418 30.4655 20.7738 22.7565 26.6888 16.8385C40.4158 3.1135 62.7498 3.1135 76.4758 16.8385C90.2008 30.5645 90.2008 52.9005 76.4758 66.6265C69.8278 73.2755 60.9868 76.9375 51.5818 76.9375C42.1818 76.9375 33.3408 73.2765 26.6888 66.6265C25.4088 65.3475 23.3348 65.3475 22.0568 66.6265C20.7788 67.9055 20.7788 69.9805 22.0578 71.2575C29.9478 79.1445 40.4328 83.4865 51.5818 83.4865C62.7348 83.4865 73.2198 79.1435 81.1058 71.2575C97.3858 54.9785 97.3857 28.4875 81.1068 12.2085Z"
                      fill="#FFFFFF"
                    />
                  </svg>
                  Regenerate
                </button>
              </div>
              <div className="flex justify-center items-center gap-2">
                {images.map((image, index) => (
                  <img
                    src={image.url}
                    key={index}
                    alt=""
                    width={300}
                    height={300}
                    className="rounded-2xl cursor-pointer"
                  />
                ))}
              </div>
              <ReactMarkdown
                className="prose"
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
          <div
            className="flex justify-end"
            style={{
              position: "absolute",
              marginTop: "4rem",
              marginLeft: "41rem",
            }}
          >
            {copied && <span className="text-green-600">Copied!</span>}
          </div>

          <div className="flex">
            <input
              readOnly
              className="w-full"
              placeholder="Url"
              value={inputValue}
              onChange={(e: any) => setInputValue(e.target.value)}
            />

            <div
              className="p-3"
              onClick={handleCopy}
              style={{ cursor: "pointer" }}
            >
              <CopyIcon />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-gray-300 px-4 py-2 rounded-md text-gray-700"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="bg-primary-green px-4 py-2 rounded-md text-white ml-3"
              onClick={handlePublish}
            >
              Publish
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResultComponent;
