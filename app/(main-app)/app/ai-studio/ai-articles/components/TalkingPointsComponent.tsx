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
import AdvancedOptions from "./AdvancedOptions";
import Motion from "@/components/Motion";
import { IOutline, ISubtitleTalkingPoints } from "../types";
import { Plus, X } from "lucide-react";
import SubtitleList from "./SubtitleList";
import TalkingPointsList from "./TalkingPointList";

interface TalkingPointsComponentProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  selectedOutlines: IOutline;
  setSelectedOutlines: React.Dispatch<React.SetStateAction<IOutline>>;
  keywords: string[];
  setKeywords: React.Dispatch<React.SetStateAction<string[]>>;
  talkingPoints: ISubtitleTalkingPoints[];
  setTalkingPoints: React.Dispatch<
    React.SetStateAction<ISubtitleTalkingPoints[]>
  >;
  articleTitle: string;
  setArticleTitle: React.Dispatch<React.SetStateAction<string>>;
  keywordInputValue: string;
  setKeywordInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const TalkingPointsComponent: React.FC<TalkingPointsComponentProps> = ({
  currentStep,
  setCurrentStep,
  selectedOutlines,
  setSelectedOutlines,
  keywords,
  setKeywords,
  talkingPoints,
  setTalkingPoints,
  articleTitle,
  setArticleTitle,
  keywordInputValue,
  setKeywordInputValue,
}) => {
  const [isPending, setIsPending] = useState(false);

  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  const [numTalkingPoints, setNumTalkingPoints] = useState<number>(3);
  const [numTalkingPointsWords, setNumTalkingPointsWords] =
    useState<number>(10);

  const [aiModel, setAiModel] = useState<string>("gpt-4o");
  const [creativity, setCreativity] = useState<string>(
    creativityOptions[0].value
  );
  const [writingTone, setWritingTone] = useState<string>(
    writingToneOptions[0].value
  );
  const [language, setLanguage] = useState<string>(languageOptions[0].value);
  const [pov, setPov] = useState<string>(povOptions[0].value);

  const generateTalkingPoints = () => {
    const data = {
      title: articleTitle,
      keywords: keywords,
      subtitles: selectedOutlines.subtitles.map(subtitle => subtitle),
      no_of_talking_point_per_outline: numTalkingPoints,
      max_takling_point_words: numTalkingPointsWords,
      model: aiModel,
      creativity: creativity,
      tone: writingTone,
      language: language,
    };

    setTalkingPoints([]);
    setIsPending(true);
    instance
      .post("/ai/api/v1/wizard/talking-points", data)
      .then(({ data: { data } }) => {
        setTalkingPoints(data.response.subtitles_talking_points);
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

  const handleReorder = (subtitles: string[]) => {
    setSelectedOutlines({ ...selectedOutlines, subtitles });
  };

  const handleRemove = (index: number) => {
    const updatedSubtitles = selectedOutlines.subtitles.filter(
      (_, i) => i !== index
    );
    setSelectedOutlines({ ...selectedOutlines, subtitles: updatedSubtitles });
  };

  const handleTalkingPointsReorder = (newOrder: ISubtitleTalkingPoints[]) => {
    setTalkingPoints(newOrder);
  };

  const handleTalkingPointsRemove = (indexToRemove: number) => {
    setTalkingPoints(prev =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const [showInput, setShowInput] = useState(false);
  const [newSubtitleName, setNewSubtitleName] = useState("");

  const addNewSection = () => {
    if (newSubtitleName.trim() === "") {
      return;
    }

    const updatedSubtitles = [
      ...selectedOutlines.subtitles,
      newSubtitleName.trim(),
    ];
    handleReorder(updatedSubtitles);
    setNewSubtitleName("");
    setShowInput(false);
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
            <label className="font-medium">Article outline</label>
            {selectedOutlines.subtitles.length > 0 && (
              <SubtitleList
                subtitles={selectedOutlines.subtitles}
                onReorder={handleReorder}
                onRemove={handleRemove}
              />
            )}
            <div className="flex flex-col justify-end">
              {!showInput && (
                <button
                  onClick={() => setShowInput(true)}
                  className="self-end text-[#212833] hover:bg-[#2DA771]/10 sheen flex gap-2 p-1.5 rounded-lg text-sm items-center font-medium transition-all duration-300 mt-3"
                >
                  <Plus size={18} className="text-[#2DA771]" />
                  Add new section
                </button>
              )}
              {showInput && (
                <div className="pl-6 pr-9 mt-2.5 flex flex-col">
                  <input
                    type="text"
                    className="flex h-[50px] w-full rounded-xl bg-[#F5F5F5] px-4 py-2"
                    placeholder="Enter new section title"
                    value={newSubtitleName}
                    onChange={e => setNewSubtitleName(e.target.value)}
                  />
                  <button
                    onClick={addNewSection}
                    className="self-end text-[#212833] hover:bg-[#2DA771]/10 sheen flex gap-2 p-1.5 rounded-lg text-sm items-center font-medium transition-all duration-300 mt-3"
                  >
                    <Plus size={18} className="text-[#2DA771]" />
                    Confirm
                  </button>
                </div>
              )}
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
              onChange={e => setNumTalkingPoints(parseInt(e.target.value))}
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
              onChange={e => setNumTalkingPointsWords(parseInt(e.target.value))}
              className="flex h-[50px] w-full rounded-xl bg-[#F5F5F5] px-4 py-2"
            />
          </div>

          <div className="flex gap-4 items-center !mt-8">
            <div className="bg-gray-200 w-full h-0.5" />
            <button
              onClick={toggleAdvancedOptions}
              className="w-full text-[#2DA771] text-base"
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
            onClick={generateTalkingPoints}
            disabled={isPending}
            className={clsx(
              "w-full p-2 h-14 !mt-8 text-white bg-[#2DA771] rounded-xl hover:bg-opacity-90 flex justify-center items-center",
              isPending && "opacity-80 cursor-not-allowed"
            )}
          >
            {isPending ? <Spinner /> : "Generate talking points"}
          </button>
        </div>
        <div className="w-full">
          <div className="bg-[#2DA771] rounded-2xl py-5 px-7 flex items-center gap-4">
            <span className="bg-white h-12 w-12 grid place-content-center rounded-full">
              {currentStep + 1}
            </span>
            <h2 className="text-lg font-semibold text-white">Talking points</h2>
          </div>
          {isPending && talkingPoints.length < 1 && (
            <div className="h-40 grid place-content-center">
              Please hang on as we generate talking points for you...
            </div>
          )}
          {talkingPoints.length > 0 && (
            <div className="">
              <TalkingPointsList
                handleTalkingPointsRemove={handleTalkingPointsRemove}
                handleTalkingPointsReorder={handleTalkingPointsReorder}
                talkingPoints={talkingPoints}
              />
              <div className="flex justify-end">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="w-full p-2 h-14 mt-4 text-white sheen bg-[#2DA771] rounded-xl max-w-[150px]"
                >
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
