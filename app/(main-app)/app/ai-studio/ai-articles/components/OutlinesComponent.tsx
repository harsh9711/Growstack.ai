import Motion from "@/components/Motion";
import Spinner from "@/components/Spinner";
import instance from "@/config/axios.config";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import React, { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import {
  creativityOptions,
  languageOptions,
  povOptions,
  writingToneOptions,
} from "../constants/options";
import { IOutline } from "../types";
import AdvancedOptions from "./AdvancedOptions";
import { title } from "process";
import { StarRating } from "./Star";

interface OutlinesComponentProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  selectedOutlines: IOutline;
  setSelectedOutlines: React.Dispatch<React.SetStateAction<IOutline>>;
  keywords: string[];
  setKeywords: React.Dispatch<React.SetStateAction<string[]>>;
  articleTitle: string;
  setArticleTitle: React.Dispatch<React.SetStateAction<string>>;
  outlines: IOutline[];
  setOutlines: React.Dispatch<React.SetStateAction<IOutline[]>>;
  keywordInputValue: string;
  setKeywordInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const OutlinesComponent: React.FC<OutlinesComponentProps> = ({
  currentStep,
  setCurrentStep,
  selectedOutlines,
  setSelectedOutlines,
  keywords,
  setKeywords,
  articleTitle,
  setArticleTitle,
  outlines,
  setOutlines,
  keywordInputValue,
  setKeywordInputValue,
}) => {
  const [isPending, setIsPending] = useState(false);

  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  const [numOutlines, setNumOutlines] = useState<number>(3);
  const [numSubtitles, setNumSubtitles] = useState<number>(10);

  const [aiModel, setAiModel] = useState<string>("gpt-4o");
  const [creativity, setCreativity] = useState<string>(
    creativityOptions[0].value
  );
  const [writingTone, setWritingTone] = useState<string>(
    writingToneOptions[0].value
  );
  const [language, setLanguage] = useState<string>(languageOptions[0].value);
  const [pov, setPov] = useState<string>(povOptions[0].value);

  const generateOutlines = () => {
    const data = {
      title: articleTitle,
      keywords: keywords,
      no_of_outlines: numOutlines,
      no_of_subtitles: numSubtitles,
      model: aiModel,
      creativity: creativity,
      tone: writingTone,
      language: language,
    };

    setOutlines([]);
    setIsPending(true);
    instance
      .post("/ai/api/v1/wizard/outlines", data)
      .then(({ data: { data } }) => {
        setOutlines(data.response.outlines);
      })
      .catch(err => {
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error(err.message);
        }
        console.log(err);
      })
      .finally(() => setIsPending(false));
  };

  const handleKeywordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeywordInputValue(value);
    const splitKeywords = value
      .split(",")
      .map(kw => kw.trim())
      .filter(kw => kw);
    setKeywords(splitKeywords);
  };

  const toggleAdvancedOptions = () => {
    setShowAdvanced(prev => !prev);
  };

  return (
    <Motion
      transition={{ duration: 0.5 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <div className="flex gap-5 !mt-10 items-start">
        <div className="w-full !bg-white shadow-box p-7 border rounded-3xl max-w-xl space-y-6">
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
              maxLength={500}
              placeholder="Enter the title"
              className="flex h-[50px] w-full rounded-xl bg-[#F5F5F5] px-4 py-2"
            />
          </div>
          <div className="space-y-1.5">
            <label className="font-medium" htmlFor="keywords">
              Keywords
            </label>
            <input
              type="text"
              id="keywords"
              value={keywordInputValue}
              onChange={handleKeywordInputChange}
              placeholder="Enter keywords separated by commas"
              className="flex h-[50px] w-full rounded-xl bg-[#F5F5F5] px-4 py-2"
            />
          </div>
          <div className="space-y-1.5">
            <label className="font-medium" htmlFor="num-outlines">
              Number of Outlines
            </label>
            <input
              type="number"
              id="num-outlines"
              value={numOutlines}
              onChange={e => setNumOutlines(parseInt(e.target.value))}
              className="flex h-[50px] w-full rounded-xl bg-[#F5F5F5] px-4 py-2"
            />
          </div>
          <div className="space-y-1.5">
            <label className="font-medium" htmlFor="num-subtitles">
              Number of Subtitles
            </label>
            <input
              type="number"
              id="num-subtitles"
              value={numSubtitles}
              onChange={e => setNumSubtitles(parseInt(e.target.value))}
              className="flex h-[50px] w-full rounded-xl bg-[#F5F5F5] px-4 py-2"
            />
          </div>

          <div className="flex gap-4 items-center !mt-8">
            <div className="bg-gray-200 w-full h-0.5" />
            <button
              onClick={toggleAdvancedOptions}
              className="w-full text-primary-green text-base"
            >
              {showAdvanced ? "Advanced options -" : "Advanced options +"}
            </button>
            <div className="bg-gray-200 w-full h-0.5" />
          </div>

          <AnimatePresence>
            {showAdvanced && (
              <AdvancedOptions
                aiModel={aiModel}
                setAiModel={setAiModel}
                writingTone={writingTone}
                setWritingTone={setWritingTone}
                creativity={creativity}
                setCreativity={setCreativity}
                pov={pov}
                setPov={setPov}
                language={language}
                setLanguage={setLanguage}
              />
            )}
          </AnimatePresence>
          <button
            onClick={generateOutlines}
            disabled={isPending}
            className={clsx(
              "w-full p-2 h-14 !mt-8 text-white bg-primary-green rounded-xl hover:bg-opacity-90 flex justify-center items-center",
              isPending && "opacity-80 cursor-not-allowed"
            )}
          >
            {isPending ? <Spinner /> : "Generate Outlines"}
          </button>
        </div>
        <div className="w-full">
          <div className="bg-primary-green rounded-2xl py-5 px-7 flex items-center gap-4">
            <span className="bg-white h-12 w-12 grid place-content-center rounded-full">
              {currentStep + 1}
            </span>
            <h2 className="text-lg font-semibold text-white">Outline list</h2>
          </div>
          {isPending && outlines.length < 1 && (
            <div className="h-40 grid place-content-center">
              Please hang on as we generate outlines for you...
            </div>
          )}
          {outlines.length > 0 && (
            <div>
              <div className={clsx("mt-4 space-y-2")}>
                {outlines.map((outline: any, index: any) => (
                  <ul
                    key={index}
                    className={clsx(
                      "py-7 px-12 mb-3 border rounded-2xl bg-white flex flex-col gap-4 cursor-pointer list-disc transition-all duration-300",
                      selectedOutlines === outline &&
                        "border border-primary-green text-primary-green"
                    )}
                    onClick={() => setSelectedOutlines(outlines[index])}
                  >
                    <div
                      className="flex justify-end"
                      style={{ textAlign: "right" }}
                    >
                      <StarRating score={outline.score} size={20} />:{" "}
                      {outline.score}
                    </div>
                    {outline.subtitles.map((subtitle: any, index: any) => (
                      <li key={index}>{subtitle}</li>
                    ))}
                  </ul>
                ))}
              </div>
              {selectedOutlines.subtitles && (
                <div className="flex justify-end">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="w-full p-2 h-14 mt-4 text-white sheen bg-primary-green rounded-xl max-w-[150px]"
                  >
                    Next step
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Motion>
  );
};

export default OutlinesComponent;
