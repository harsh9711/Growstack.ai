import Spinner from "@/components/Spinner";
import { CheckIcon2 } from "@/components/svgs";
import axios from "@/config/axios.config";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { creativityOptions, languageOptions, povOptions, writingToneOptions } from "../constants/options";
import AdvancedOptions from "./AdvancedOptions";
import clsx from "clsx";
import Motion from "@/components/Motion";
export default function IdeasComponent({ currentStep, setCurrentStep }: { currentStep: number; setCurrentStep: any }) {
  const [isPending, setIsPending] = useState(false);
  const [isKeywordPending, setIsKeywordPending] = useState(false);

  const [ideas, setIdeas] = useState<Array<string>>([]);
  const [generatedKeywords, setGeneratedKeywords] = useState<Array<string>>([]);

  //form data settings
  const [topic, setTopic] = useState("");
  const [numTopics, setNumTopics] = useState(3);
  const [maxTopicWords, setMaxTopicWords] = useState(20);
  const [keywords, setKeywords] = useState(10);
  const [numKeywords, setNumKeywords] = useState(10);
  const [showAdvanced, setShowAdvanced] = useState(false);

  //advanced options settings
  const [aiModel, setAiModel] = useState<string>("gpt-4o");
  const [creativity, setCreativity] = useState<string>(creativityOptions[0].value);
  const [writingTone, setWritingTone] = useState<string>(writingToneOptions[0].value);
  const [language, setLanguage] = useState<string>(languageOptions[0].value);
  const [pov, setPov] = useState<string>(povOptions[0].value);

  const generateIdeas = () => {
    setIdeas([]);
    setIsPending(true);
    axios
      .post("/ai/api/v1/wizard/ideas")
      .then(({ data: { data } }) => {
        setIdeas(data.topics);
      })
      .catch((err) => {
        toast.error("Something went wrong!!");
        console.log(err);
      })
      .finally(() => setIsPending(false));
  };

  const generateKeywords = () => {
    setGeneratedKeywords([]);
    setIsKeywordPending(true);
    axios
      .post("/ai/api/v1/wizard/keywords", {
        topic: topic,
        no_of_keywords: numKeywords,
        model: aiModel,
        creativity: creativity,
        tone: writingTone,
        langauge: language,
      })
      .then(({ data: { data, message } }) => {
        setGeneratedKeywords(data.keywords);
        toast.success(message);
      })
      .catch((err) => {
        toast.error("Something went wrong!!");
        console.log(err);
      })
      .finally(() => setIsKeywordPending(false));
  };

  const toggleAdvancedOptions = () => {
    setShowAdvanced((prev) => !prev);
  };

  return (
    <Motion transition={{ duration: 0.5 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <div className="flex gap-5 !mt-10">
        <div className="w-full !bg-white shadow-box p-7 border rounded-3xl max-w-xl">
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <label className="font-medium" htmlFor="topic">
                Topic <span className="text-rose-600">*</span>
              </label>
              <span className="text-primary-black text-opacity-50 text-sm">0/2000</span>
            </div>
            <input
              type="text"
              id="title"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
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
                value={numTopics}
                onChange={(e) => setNumTopics(e.target.value as any)}
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
                value={maxTopicWords}
                onChange={(e) => setMaxTopicWords(e.target.value as any)}
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
                type="number"
                id="keywords"
                name="keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value as any)}
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
                onChange={(e) => setNumKeywords(e.target.value as any)}
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
            )}>
            {isKeywordPending ? <Spinner /> : "Generate keywords"}
          </button>
          {generatedKeywords.length > 0 && (
            <Motion transition={{ duration: 0.5 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
              <div className="flex flex-wrap gap-2 mt-3">
                {generatedKeywords.map((generatedKeyword) => (
                  <div className="bg-gray-100 text-gray-600 p-2 rounded first-letter:uppercase">{generatedKeyword}</div>
                ))}
              </div>
            </Motion>
          )}

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
            onClick={generateIdeas}
            disabled={isPending}
            className={clsx("w-full p-2 h-14 !mt-8 text-white bg-primary-green rounded-xl hover:bg-opacity-90 flex justify-center items-center", isPending && "opacity-80 cursor-not-allowed")}>
            {isPending ? <Spinner /> : "Generate Ideas"}
          </button>
        </div>

        <div className="w-full">
          <div className="bg-primary-green rounded-2xl py-5 px-7 flex items-center gap-4">
            <span className="bg-white h-12 w-12 grid place-content-center rounded-full">{currentStep + 1}</span>
            <h2 className="text-lg font-semibold text-white">Ideas list</h2>
          </div>
          {isPending && ideas.length < 1 && <div className="h-40 grid place-content-center">Please hang on as we generate ideas for you...</div>}
          {ideas.length > 0 && (
            <div>
              <ul className="mt-5">
                {ideas.map((idea, index) => (
                  <li key={index} className="py-5 px-7 mb-3 border rounded-xl bg-white text-lg flex items-center gap-4 cursor-pointer group">
                    <span className="border p-2 rounded-full text-gray-400 group-hover:text-primary-green group-hover:border-primary-green translate-all duration-300">
                      <CheckIcon2 />
                    </span>
                    <span>{idea}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end">
                <button onClick={() => setCurrentStep(1)} className="w-full p-2 h-14 mt-4 text-white sheen bg-primary-green rounded-xl max-w-[150px]">
                  Next step
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Motion>
  );
}
