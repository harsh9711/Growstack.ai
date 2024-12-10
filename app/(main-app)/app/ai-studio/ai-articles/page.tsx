"use client";

import { Fragment, useState } from "react";
import IdeasComponent from "./components/IdeasComponent";
import ImagesComponent from "./components/ImagesComponent";
import OutlinesComponent from "./components/OutlinesComponent";
import ResultComponent from "./components/ResultComponent";
import StepIndicator from "./components/StepIndicator";
import TalkingPointsComponent from "./components/TalkingPointsComponent";
import { IOutline, ISubtitleTalkingPoints } from "./types";

export default function AiArticles() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = ["Get ideas", "Outlines", "Talking points", "Images"];
  const [selectedOutlines, setSelectedOutlines] = useState<IOutline | any>({});
  const [keywords, setKeywords] = useState<string[]>([]);
  const [score, setScore] = useState<string>("");
  const [keywordInputValue, setKeywordInputValue] = useState<string>("");
  const [talkingPoints, setTalkingPoints] = useState<ISubtitleTalkingPoints[]>(
    []
  );
  const [articleTitle, setArticleTitle] = useState<string>("");
  const [outlines, setOutlines] = useState<IOutline[]>([]);
  const [images, setImages] = useState<
    Array<{ revised_prompt: string; url: string }>
  >([]);
  const [articleData, setArticleData] = useState<string>("");

  const renderComponent = () => {
    switch (currentStep) {
      case 0:
        return (
          <IdeasComponent
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            keywordInputValue={keywordInputValue}
            setKeywordInputValue={setKeywordInputValue}
            keywords={keywords}
            setKeywords={setKeywords}
            articleTitle={articleTitle}
            setArticleTitle={setArticleTitle}
          />
        );
      case 1:
        return (
          <OutlinesComponent
            keywords={keywords}
            articleTitle={articleTitle}
            setArticleTitle={setArticleTitle}
            setKeywords={setKeywords}
            selectedOutlines={selectedOutlines}
            setSelectedOutlines={setSelectedOutlines}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            outlines={outlines}
            setOutlines={setOutlines}
            keywordInputValue={keywordInputValue}
            setKeywordInputValue={setKeywordInputValue}
          />
        );
      case 2:
        return (
          <TalkingPointsComponent
            keywords={keywords}
            articleTitle={articleTitle}
            setArticleTitle={setArticleTitle}
            setKeywords={setKeywords}
            selectedOutlines={selectedOutlines}
            setSelectedOutlines={setSelectedOutlines}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            talkingPoints={talkingPoints}
            setTalkingPoints={setTalkingPoints}
            keywordInputValue={keywordInputValue}
            setKeywordInputValue={setKeywordInputValue}
          />
        );
      case 3:
        return (
          <ImagesComponent
            keywords={keywords}
            articleTitle={articleTitle}
            setArticleTitle={setArticleTitle}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            talkingPoints={talkingPoints}
            articleData={articleData}
            setArticleData={setArticleData}
            images={images}
            setScore={setScore}
            setImages={setImages}
          />
        );
      case 4:
        return (
          <ResultComponent
            articleTitle={articleTitle}
            setScore={setScore}
            keywords={keywords}
            setArticleData={setArticleData}
            articleData={articleData}
            talkingPoints={talkingPoints}
            images={images}
            setImages={setImages}
            score={score}
          />
        );
    }
  };

  return (
    <Fragment>
      <main className="">
        <div className="flex justify-between items-center mt-10">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">AI content wizard</h1>
          </div>
        </div>
        <div className="mx-auto p-4">
          <StepIndicator
            steps={steps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
          {renderComponent()}
        </div>
      </main>
    </Fragment>
  );
}
