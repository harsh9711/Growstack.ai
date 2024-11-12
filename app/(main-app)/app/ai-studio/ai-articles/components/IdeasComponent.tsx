
import Spinner from "@/components/Spinner";
import { CheckIcon2 } from "@/components/svgs";
import instance from "@/config/axios.config";
import { AnimatePresence } from "framer-motion";
import React, { ChangeEvent, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import {
  creativityOptions,
  languageOptions,
  povOptions,
  writingToneOptions,
} from "../constants/options";
import AdvancedOptions from "./AdvancedOptions";
import clsx from "clsx";
import Motion from "@/components/Motion";

export default function IdeasComponent({
  currentStep,
  setCurrentStep,
  keywordInputValue,
  keywords,
  setKeywordInputValue,
  setKeywords,
  articleTitle,
  setArticleTitle,
}: {
  currentStep: number;
  setCurrentStep: any;
  keywords: string[];
  setKeywords: React.Dispatch<SetStateAction<string[]>>;
  keywordInputValue: string;
  setKeywordInputValue: React.Dispatch<SetStateAction<string>>;
  articleTitle: string;
  setArticleTitle: React.Dispatch<SetStateAction<string>>;
}) {
  const [isPending, setIsPending] = useState(false);
  const [isKeywordPending, setIsKeywordPending] = useState(false);
  const [ideas, setIdeas] = useState<any>([]);
  const [generatedKeywords, setGeneratedKeywords] = useState<any>([]);
  const [viewKeywords, setViewKeywords] = useState(true);

  //form data settings
  const [topic, setTopic] = useState("");
  const [numTopics, setNumTopics] = useState(3);
  const [maxTopicWords, setMaxTopicWords] = useState(20);
  const [numKeywords, setNumKeywords] = useState(10);
  const [showAdvanced, setShowAdvanced] = useState(false);

  //advanced options settings
  const [aiModel, setAiModel] = useState<string>("gpt-4o");
  const [creativity, setCreativity] = useState<string>(
    creativityOptions[0].value
  );
  const [writingTone, setWritingTone] = useState<string>(
    writingToneOptions[0].value
  );
  const [language, setLanguage] = useState<string>(languageOptions[0].value);
  const [pov, setPov] = useState<string>(povOptions[0].value);

  const generateIdeas = () => {
    setIdeas([]);
    setIsPending(true);
    instance
      .post("/ai/api/v1/wizard/ideas", {
        topic: topic,
        no_of_topics: numTopics,
        max_topics_words: maxTopicWords,
        keywords: keywords,
        model: aiModel,
        creativity: creativity,
        tone: writingTone,
        language: language,
      })
      .then(({ data: { data } }) => {
        setIdeas(data.response.topics);
        setViewKeywords(false);
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

  const generateKeywords = () => {
    setGeneratedKeywords([]);
    setIsKeywordPending(true);
    instance
      .post("/ai/api/v1/wizard/keywords", {
        topic: topic,
        no_of_keywords: numKeywords,
        model: aiModel,
        creativity: creativity,
        tone: writingTone,
        language: language,
      })
      .then(({ data: { data, message } }) => {
        console.log(data);
        setGeneratedKeywords(data.response.keywords);
        toast.success(message);
        setViewKeywords(true);
      })
      .catch(err => {
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error(err.message);
        }
      })
      .finally(() => setIsKeywordPending(false));
  };

  const handleKeywordClick = (keyword: string) => {
    setKeywords(prevKeywords => {
      if (prevKeywords.includes(keyword)) {
        return prevKeywords.filter(kw => kw !== keyword);
      }
      return [...prevKeywords, keyword];
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeywordInputValue(value);
    const splitKeywords = value
      .split(",")
      .map(kw => kw.trim())
      .filter(kw => kw);
    setKeywords(splitKeywords);
  };

  const handleKeywordUpdate = (keyword: string) => {
    handleKeywordClick(keyword);
    setKeywordInputValue(prevValue => {
      const newKeywords = keywords.includes(keyword)
        ? keywords.filter(kw => kw !== keyword)
        : [...keywords, keyword];
      return newKeywords.join(", ");
    });
  };

  const handleSelectAll = () => {
    setKeywords(generatedKeywords);
    setKeywordInputValue(generatedKeywords.join(", "));
  };

  const handleUnselectAll = () => {
    setKeywords([]);
    setKeywordInputValue("");
  };

  const allSelected = generatedKeywords.every((keyword:any) =>
    keywords.includes(keyword)
  );
  const notAllSelected = generatedKeywords.some(
    (keyword:any) => !keywords.includes(keyword)
  );

  const toggleAdvancedOptions = () => {
    setShowAdvanced(prev => !prev);
  };

  return (
    <Motion
      transition={{ duration: 0.5 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <div className="flex gap-5 items-start !mt-10">
        <div className="w-full !bg-white shadow-box p-7 border rounded-3xl max-w-xl">
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <label className="font-medium" htmlFor="topic">
                Topic <span className="text-rose-600">*</span>
              </label>
              <span className="text-primary-black text-opacity-50 text-sm">
                {topic.length}/500
              </span>
            </div>
            <input
              type="text"
              id="title"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              maxLength={500}
              placeholder="Enter the topic"
              className="flex h-[50px] w-full rounded-xl bg-[#F5F5F5] px-4 py-2"
            />
          </div>

          <div className="flex mt-4">
            <div className="w-full pr-2">
              <label className="font-medium mb-2" htmlFor="num-topics">
                Number of topics
              </label>
              <input
                type="number"
                id="num-topics"
                name="num-topics"
                min={1}
                value={numTopics}
                onChange={e => setNumTopics(parseInt(e.target.value))}
                className="flex h-[50px] w-full rounded-xl bg-[#F5F5F5] px-4 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="w-full pl-2">
              <label className="font-medium mb-2" htmlFor="max-topic-words">
                Maximum topic words
              </label>
              <input
                type="number"
                id="max-topic-words"
                name="max-topic-words"
                min={1}
                value={maxTopicWords}
                onChange={e => setMaxTopicWords(parseInt(e.target.value))}
                className="flex h-[50px] w-full rounded-xl bg-[#F5F5F5] px-4 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex flex-col items-center mt-4 gap-4">
            <div className="w-full pr-2">
              <label className="font-medium mb-2" htmlFor="keywords">
                Keywords
              </label>
              <input
                type="text"
                id="keywords"
                name="keywords"
                value={keywordInputValue}
                onChange={handleInputChange}
                className="flex h-[50px] w-full rounded-xl bg-[#F5F5F5] px-4 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <span>Or</span>
            <div className="w-full pl-2">
              <label className="font-medium mb-2" htmlFor="num-keywords">
                Number of keywords
              </label>
              <input
                type="number"
                id="num-keywords"
                name="num-keywords"
                value={numKeywords}
                onChange={e => setNumKeywords(parseInt(e.target.value))}
                className="flex h-[50px] w-full rounded-xl bg-[#F5F5F5] px-4 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          <button
            disabled={isKeywordPending}
            onClick={generateKeywords}
            className={clsx(
              "w-full p-2 h-14 !mt-8 text-white bg-black rounded-xl flex justify-center items-center",
              isKeywordPending && "opacity-80 cursor-not-allowed"
            )}
          >
            {isKeywordPending ? <Spinner /> : "Generate keywords"}
          </button>

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
            onClick={generateIdeas}
            disabled={isPending}
            className={clsx(
              "w-full p-2 h-14 !mt-8 text-white bg-primary-green rounded-xl hover:bg-opacity-90 flex justify-center items-center",
              isPending && "opacity-80 cursor-not-allowed"
            )}
          >
            {isPending ? <Spinner /> : "Generate Ideas"}
          </button>
        </div>

        <div className="w-full">
          <div className="bg-primary-green rounded-2xl py-5 px-7 flex items-center gap-4">
            <span className="bg-white h-12 w-12 grid place-content-center rounded-full">
              {currentStep + 1}
            </span>
            <h2 className="text-lg font-semibold text-white">Ideas list</h2>
          </div>

          {viewKeywords &&
            (isKeywordPending && generatedKeywords.length < 1 ? (
              <div className="h-40 grid place-content-center">
                Generating keywords for you...
              </div>
            ) : (
              generatedKeywords.length > 0 && (
                <Motion
                  transition={{ duration: 0.5 }}
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                >
                  <h1 className="text-lg text-center my-6 font-semibold">
                    Choose your keywords
                  </h1>
                  <div className="flex flex-wrap justify-center gap-2 mt-3">
                    {/* {generatedKeywords&&JSON.stringify(generatedKeywords)} */}
                    {generatedKeywords.map((generatedKeyword:any,index:any) => (
                      // <>
                      // {JSON.stringify(generatedKeyword.keyword) && JSON.stringify(generatedKeyword.keyword)}
                      // {JSON.stringify(generatedKeyword.score) && JSON.stringify(generatedKeyword.score)}
                      // </>
                      <div
                        key={generatedKeyword.keyword || generatedKeyword.score }
                        onClick={() => handleKeywordUpdate(generatedKeyword.keyword)}
                        className={clsx(
                          "bg-gray-100 text-gray-600 p-3 rounded-xl first-letter:uppercase cursor-pointer transition-all duration-300",
                          keywords.includes(generatedKeyword.keyword || generatedKeyword.score ) &&
                            "bg-primary-green text-white"
                        )}
                      >
                        {generatedKeyword.keyword } <strong>Score :</strong> {generatedKeyword.score} 
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-4">
                    {!allSelected && (
                      <button
                        onClick={handleSelectAll}
                        className="bg-gray-300 hover:bg-gray-300/90 text-gray-600 py-1.5 px-3 rounded-lg"
                      >
                        Select All
                      </button>
                    )}
                    {!notAllSelected && (
                      <button
                        onClick={handleUnselectAll}
                        className="bg-red-500 hover:bg-red-600 text-white py-1.5 px-3 rounded-lg"
                      >
                        Unselect All
                      </button>
                    )}
                  </div>
                </Motion>
              )
            ))}

          {isPending && ideas.length < 1 ? (
            <div className="h-40 grid place-content-center">
              Generating ideas for you...
            </div>
          ) : (
            ideas.length > 0 &&
            !viewKeywords && (
              <Motion
                transition={{ duration: 0.5 }}
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              >
                <ul className="mt-5">
                  {ideas.map((idea:any, index:any) => (
                    <>
                        <div className="relative">
                      <span
                        className={clsx(
                          "h-6 w-13 bg-gray-100 grid place-content-center rounded-full transition-all duration-300",
                          "bg-primary-green text-white",
                          "absolute top-3 right-3"
                        )}
                      >
                        {idea.score}
                      </span>
                      </div>
                    <li
                      onClick={() => setArticleTitle(idea.topic)}
                      key={index}
                      className={clsx(
                        "py-5 px-7 mb-3 border rounded-xl bg-white text-lg flex items-center gap-4 cursor-pointer group transition-all duration-300",
                        idea.topic === articleTitle && "border-primary-green/70"
                      )}
                    >
                    
                      <span
                        className={clsx(
                          "border p-2 rounded-full text-gray-400 group-hover:text-primary-green group-hover:border-primary-green translate-all duration-300",
                          idea.topic === articleTitle &&
                            "text-primary-green border-primary-green"
                        )}
                      >
                        <CheckIcon2 />
                      </span>
                    
                     <span>{idea.topic}</span>
                    
                    </li></>
                  ))}
                </ul>
                {articleTitle && (
                  <div className="flex justify-end">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="w-full p-2 h-14 mt-4 text-white sheen bg-primary-green rounded-xl max-w-[150px]"
                    >
                      Next step
                    </button>
                  </div>
                )}
              </Motion>
            )
          )}
        </div>
      </div>
    </Motion>
  );
}