// TalkingPointsComponent.tsx

import Spinner from "@/components/Spinner";
import axios from "@/config/axios.config";
import clsx from "clsx";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { creativityOptions, languageOptions, povOptions, writingToneOptions } from "../constants/options";
import AdvancedOptions from "./AdvancedOptions";
import Motion from "@/components/Motion";
import { IOutline, ISubtitleTalkingPoints, TKeyword } from "../types";
import { Plus, X } from "lucide-react";
import { Draggable } from "@/components/svgs";

interface TalkingPointsComponentProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  selectedOutlines: IOutline;
  keywords: TKeyword;
  setKeywords: React.Dispatch<React.SetStateAction<TKeyword>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  talkingPoints: ISubtitleTalkingPoints[];
  setTalkingPoints: React.Dispatch<React.SetStateAction<ISubtitleTalkingPoints[]>>;
}

const TalkingPointsComponent: React.FC<TalkingPointsComponentProps> = ({
  currentStep,
  setCurrentStep,
  selectedOutlines,
  keywords,
  setKeywords,
  setTitle,
  title,
  talkingPoints,
  setTalkingPoints,
}) => {
  const [isPending, setIsPending] = useState(false);

  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  const [keywordsInput, setKeywordsInput] = useState<string>("");
  const [numTalkingPoints, setNumTalkingPoints] = useState<number>(3);
  const [numTalkingPointsWords, setNumTalkingPointsWords] = useState<number>(10);

  const [aiModel, setAiModel] = useState<string>("gpt-4o");
  const [creativity, setCreativity] = useState<string>(creativityOptions[0].value);
  const [writingTone, setWritingTone] = useState<string>(writingToneOptions[0].value);
  const [language, setLanguage] = useState<string>(languageOptions[0].value);
  const [pov, setPov] = useState<string>(povOptions[0].value);

  const generateTalkingPoints = () => {
    const data = {
      title: title,
      keywords: keywords,
      no_of_talking_point_per_outline: numTalkingPoints,
      max_takling_point_words: numTalkingPointsWords,
      model: aiModel,
      creativity: creativity,
      tone: writingTone,
      langauge: language,
    };

    setTalkingPoints([] as any);
    setIsPending(true);
    axios
      .post("/ai/api/v1/wizard/talking-points", data)
      .then(({ data: { data } }) => {
        setTalkingPoints(data.subtitles_talking_points);
      })
      .catch((error) => {
        toast.error("Failed to generate Talking Points. Please try again.");
        console.error("Error generating Talking Points:", error);
      })
      .finally(() => setIsPending(false));
  };

  const toggleAdvancedOptions = () => {
    setShowAdvanced((prev) => !prev);
  };

  return (
    <Motion transition={{ duration: 0.5 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <div className="flex gap-5 !mt-10 items-start">
        <div className="w-full !bg-white shadow-box p-7 border rounded-3xl max-w-xl space-y-6">
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <label className="font-medium" htmlFor="title">
                Title <span className="text-rose-600">*</span>
              </label>
              <span className="text-primary-black text-opacity-50 text-sm">0/2000</span>
            </div>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={keywords}
              onChange={(e) => setKeywordsInput(e.target.value)}
              placeholder="Enter keywords separated by commas"
              className="flex h-[50px] w-full rounded-xl bg-[#F5F5F5] px-4 py-2"
            />
          </div>
          <div className="space-y-1.5">
            <label className="font-medium">Article outline</label>
            {selectedOutlines.subtitles.length > 0 && (
              <ul className="mt-4 space-y-4">
                {selectedOutlines.subtitles.map((subtitle, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <Draggable className="cursor-grab active:cursor-grabbing w-full max-w-fit" />
                    <div className="w-full bg-[#F5F5F5] p-3 rounded-lg">{subtitle}</div>
                    <X size={25} className="text-primary-green cursor-pointer" />
                  </li>
                ))}
              </ul>
            )}
            <div className="flex justify-end">
              <button className="text-[#212833] hover:bg-primary-green/10 sheen flex gap-2 p-1.5 rounded-lg text-sm items-center font-medium transition-all duration-300 mt-3">
                <Plus size={18} className="text-primary-green" />
                Add new section
              </button>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="font-medium" htmlFor="num-talkingpoints">
              Number of talking points per outline
            </label>
            <input
              type="number"
              id="num-talkingpoints"
              value={numTalkingPoints}
              onChange={(e) => setNumTalkingPoints(parseInt(e.target.value))}
              className="flex h-[50px] w-full rounded-xl bg-[#F5F5F5] px-4 py-2"
            />
          </div>
          <div className="space-y-1.5">
            <label className="font-medium" htmlFor="num-talkingpoints-words">
              Number of talking points words
            </label>
            <input
              type="number"
              id="num-talkingpoints-words"
              value={numTalkingPointsWords}
              onChange={(e) => setNumTalkingPointsWords(parseInt(e.target.value))}
              className="flex h-[50px] w-full rounded-xl bg-[#F5F5F5] px-4 py-2"
            />
          </div>

          <div className="flex gap-4 items-center !mt-8">
            <div className="bg-gray-200 w-full h-0.5" />
            <button onClick={toggleAdvancedOptions} className="w-full text-primary-green text-base">
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
            onClick={generateTalkingPoints}
            disabled={isPending}
            className={clsx(
              "w-full p-2 h-14 !mt-8 text-white bg-primary-green rounded-xl hover:bg-opacity-90 flex justify-center items-center",
              isPending && "opacity-80 cursor-not-allowed"
            )}>
            {isPending ? <Spinner /> : "Generate talking points"}
          </button>
        </div>
        <div className="w-full">
          <div className="bg-primary-green rounded-2xl py-5 px-7 flex items-center gap-4">
            <span className="bg-white h-12 w-12 grid place-content-center rounded-full">{currentStep + 1}</span>
            <h2 className="text-lg font-semibold text-white">Talking points</h2>
          </div>
          {isPending && talkingPoints.length < 1 && (
            <div className="h-40 grid place-content-center">Please hang on as we generate talking points for you...</div>
          )}
          {talkingPoints.length > 0 && (
            <div className="">
              <ul className="mt-4 px-10 py-12 bg-white border rounded-3xl space-y-10">
                {talkingPoints.map((item: any, index: number) => (
                  <li key={index} className="flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                      <Draggable className="cursor-grab active:cursor-grabbing mt-3 w-full max-w-fit" />
                      <div className="w-full space-y-8">
                        <h1 className="w-full bg-[#F5F5F5] p-3 rounded-lg">{item.subtitle_name}</h1>
                        <div className="space-y-4">
                          {item.talking_points.map((point: any, index: number) => (
                            <div key={index}>
                              <div className="w-full bg-[#F5F5F5] p-3 rounded-lg" key={index}>
                                {point}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <X size={25} className="text-primary-green cursor-pointer mt-3" />
                    </div>
                    <div className="flex justify-end pr-10">
                      <button className="text-[#212833] hover:bg-primary-green/10 sheen flex gap-2 p-2 rounded-lg text-sm items-center font-medium transition-all duration-300">
                        <Plus size={18} className="text-primary-green" />
                        Add new talking points
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end">
                <button onClick={() => setCurrentStep(3)} className="w-full p-2 h-14 mt-4 text-white sheen bg-primary-green rounded-xl max-w-[150px]">
                  Next step
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Motion>
  );
};

export default TalkingPointsComponent;
