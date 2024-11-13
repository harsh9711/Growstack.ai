// ImagesComponent.tsx

import Motion from "@/components/Motion";
import Spinner from "@/components/Spinner";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  creativityOptions,
  languageOptions,
  povOptions,
  writingToneOptions,
} from "../constants/options";
import { ISubtitleTalkingPoints } from "../types";
import AdvancedOptions from "./AdvancedOptions";
import ImageDialog from "./dialogs/ImageDialog";

interface ImagesComponentProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  keywords: string[];
  articleTitle: string;
  setScore: any;
  setArticleTitle: React.Dispatch<React.SetStateAction<string>>;
  talkingPoints: ISubtitleTalkingPoints[];
  articleData: string;
  setArticleData: React.Dispatch<React.SetStateAction<string>>;
  images: Array<{ revised_prompt: string; url: string }>;
  setImages: React.Dispatch<
    React.SetStateAction<Array<{ revised_prompt: string; url: string }>>
  >;
}

const ImagesComponent: React.FC<ImagesComponentProps> = ({
  currentStep,
  setCurrentStep,
  keywords,
  articleTitle,
  setArticleTitle,
  talkingPoints,
  articleData,
  setArticleData,
  images,
  setImages,
  setScore,
}) => {
  const [isArticlePending, setIsArticlePending] = useState(false);
  const [isImageGenerationPending, setImageGenerationPending] = useState(false);
  const [description, setDescription] = useState<string>("");
  const [aiModel, setAiModel] = useState<string>("gpt-4o");
  const [creativity, setCreativity] = useState<string>(
    creativityOptions[0].value
  );
  const [writingTone, setWritingTone] = useState<string>(
    writingToneOptions[0].value
  );
  const [language, setLanguage] = useState<string>(languageOptions[0].value);
  const [pov, setPov] = useState<string>(povOptions[0].value);

  const generateImage = () => {
    const data = {
      title: articleTitle,
      image_description: description,
    };
    setImages([]);
    setImageGenerationPending(true);
    instance
      .post("/ai/api/v1/wizard/image", data)
      .then(response => {
        const { data } = response;
        setImages(data.data);
        localStorage.setItem("savArticalImg", data.data[0].url);
      })
      .catch(err => {
        toast.error(err.response.data.message || err.message);
        console.log(err);
      })
      .finally(() => {
        setImageGenerationPending(false);
      });
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
        setCurrentStep(4);
        console.log("data", data);

        setArticleData(data.article);
        setScore(data.score.rank);
      })
      .catch(err => {
        toast.error(err.response.data.message || err.message);
        console.log(err);
      })
      .finally(() => {
        setIsArticlePending(false);
      });
  };

  return (
    <Motion
      transition={{ duration: 0.5 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <div className="flex gap-5 items-start !mt-10">
        <div className="w-full !bg-white shadow-box p-6 border rounded-3xl max-w-xl space-y-6">
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <label className="font-medium" htmlFor="title">
                Title <span className="text-rose-600">*</span>
              </label>
              <span className="text-primary-black text-opacity-50 text-sm">
                {articleTitle.length}/500
              </span>
            </div>
            <input
              type="text"
              id="title"
              value={articleTitle}
              onChange={e => setArticleTitle(e.target.value)}
              placeholder="Enter the title"
              className="flex h-[50px] w-full rounded-xl bg-[#F5F5F5] px-4 py-2"
            />
          </div>
          <div className="space-y-1.5">
            <label className="font-medium" htmlFor="description">
              Image Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              maxLength={500}
              placeholder="Describe what your image is about"
              className="h-[128px] w-full bg-[#F5F5F5] rounded-xl block resize-none p-4 text-[15px]"
            ></textarea>
          </div>
          <div className="flex gap-3 !mt-2">
            <button
              onClick={generateImage}
              disabled={isImageGenerationPending}
              className={clsx(
                "w-full p-2 h-12 !mt-4 text-white bg-primary-green rounded-xl hover:bg-opacity-90 flex justify-center items-center",
                isImageGenerationPending ||
                  (isArticlePending && "opacity-70 cursor-not-allowed")
              )}
            >
              {isImageGenerationPending ? (
                <Spinner />
              ) : images.length > 0 ? (
                "Regenerate Image"
              ) : (
                "Generate Image"
              )}
            </button>
            <button
              onClick={generateArticle}
              disabled={
                (isArticlePending && images.length < 1) ||
                images.length >= 1 ||
                isImageGenerationPending ||
                isArticlePending
              }
              className={clsx(
                "w-full p-2 h-12 !mt-4 text-white bg-primary-green rounded-xl hover:bg-opacity-90 flex justify-center items-center",
                isImageGenerationPending ||
                  (isArticlePending && images.length < 1) ||
                  (isArticlePending && "opacity-70 cursor-not-allowed"),
                images.length >= 1 && "cursor-not-allowed"
              )}
            >
              {isArticlePending && images.length < 1 ? (
                <Spinner />
              ) : (
                "Skip this step"
              )}
            </button>
          </div>
        </div>
        <div className="w-full">
          <div className="bg-primary-green rounded-2xl py-5 px-7 flex items-center gap-4">
            <span className="bg-white h-12 w-12 grid place-content-center rounded-full">
              {currentStep + 1}
            </span>
            <h2 className="text-lg font-semibold text-white">Images List</h2>
          </div>
          {isImageGenerationPending && images.length < 1 && (
            <div className="h-40 grid place-content-center">
              Please hang on as we generate the image for you...
            </div>
          )}
          {images.length > 0 && (
            <div>
              <ul className="mt-5">
                {images.map((image, index) => (
                  <li
                    key={index}
                    className="p-10 mb-3 border rounded-xl bg-white text-lg flex flex-col items-center gap-5"
                  >
                    <div className="space-y-1">
                      <h2 className="font-semibold">Revised prompt</h2>
                      <p className="text-[16px] leading-relaxed">
                        {image.revised_prompt}
                      </p>
                    </div>
                    <ImageDialog imageSrc={image.url} />
                  </li>
                ))}
              </ul>
              <div className="flex justify-end">
                <button
                  onClick={generateArticle}
                  disabled={isArticlePending}
                  className={clsx(
                    "w-full p-2 h-14 mt-4 text-white sheen bg-primary-green rounded-xl max-w-[200px] flex gap-2 items-center justify-center",
                    isArticlePending && "opacity-70"
                  )}
                >
                  {isArticlePending ? <Spinner /> : "Generate Article"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Motion>
  );
};

export default ImagesComponent;
