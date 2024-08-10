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
  const [keywordInputValue, setKeywordInputValue] = useState<string>("");
  const [talkingPoints, setTalkingPoints] = useState<ISubtitleTalkingPoints[]>([]);
  const [articleTitle, setArticleTitle] = useState<string>("");
  const [outlines, setOutlines] = useState<IOutline[]>([]);
  const [images, setImages] = useState<Array<{ revised_prompt: string; url: string }>>([]);
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
            setImages={setImages}
          />
        );
      case 4:
        return <ResultComponent articleTitle={articleTitle} articleData={articleData} images={images} setImages={setImages} />;
    }
  };

  return (
    <Fragment>
      <main className="">
        <div className="flex justify-between items-center mt-10">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">AI article wizard</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="21" viewBox="0 0 14 21" fill="none">
                <path
                  d="M5.75349 1H12.4815L8.23221 7.01975H12.4815L2.3541 18.2802L5.8243 10.6316H2L5.75349 1Z"
                  fill="#F9DE6F"
                  stroke="#F9DE6F"
                  strokeWidth="0.791016"
                  strokeMiterlimit="10"
                />
              </svg>{" "}
              Your Balance is <span className="font-semibold text-primary-green">10,000 Words</span>{" "}
            </p>
          </div>
        </div>
        <div className="mx-auto p-4">
          <StepIndicator steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />
          {renderComponent()}
        </div>
      </main>
    </Fragment>
  );
}
