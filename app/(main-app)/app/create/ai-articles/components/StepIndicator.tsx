import React from "react";
import clsx from "clsx";

const StepIndicator = ({ steps, currentStep, setCurrentStep }: { steps: string[]; currentStep: number; setCurrentStep: (value: number) => void }) => {
  return (
    <div className="max-w-fit gap-10 mx-auto flex justify-between mb-6">
      {steps.map((step, index) => (
        <div key={index} className={`flex items-start gap-5 ${index <= currentStep ? "active" : ""}`}>
          <span
            onClick={() => index <= currentStep && setCurrentStep(index)} 
            className={clsx(
              "cursor-pointer h-12 w-12 bg-gray-100 grid place-content-center rounded-full transition-all duration-300",
              index <= currentStep && "bg-primary-green text-white",
              index > currentStep && "!cursor-default opacity-50" 
            )}>
            {index + 1}
          </span>
          <div className="space-y-2 flex flex-col items-center">
            <h1 className={clsx("text-base text-gray-400", index <= currentStep && "!text-primary-green")}>{step}</h1>
            <div className="relative w-32 h-2 bg-[#E4E4E4] rounded-full">
              <div
                className="bg-primary-green absolute inset-0 rounded-full transition-all duration-300"
                style={{
                  width: index < currentStep ? "100%" : index === currentStep ? "50%" : "0%",
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
