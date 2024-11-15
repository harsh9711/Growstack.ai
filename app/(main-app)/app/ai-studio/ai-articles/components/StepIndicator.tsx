import React from "react";
import clsx from "clsx";
import { Check } from "lucide-react";

const StepIndicator = ({
  steps,
  currentStep,
  setCurrentStep,
}: {
  steps: string[];
  currentStep: number;
  setCurrentStep: (value: number) => void;
}) => {
  return (
    <div className="max-w-fit gap-10 mx-auto flex justify-between mb-6">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`flex items-start gap-5 ${index <= currentStep ? "active" : ""}`}
        >
          <span
            className={clsx(
              "h-12 w-12 bg-gray-100 grid place-content-center rounded-full transition-all duration-300",
              index <= currentStep && "bg-[#2DA771] text-white",
              index > currentStep && "!cursor-default opacity-50"
            )}
          >
            {index < currentStep ? <Check /> : index + 1}
          </span>
          <div className="space-y-2 flex flex-col items-center">
            <h1
              className={clsx(
                "text-base text-gray-400",
                index <= currentStep && "!text-[#2DA771]"
              )}
            >
              {step}
            </h1>
            <div className="relative w-32 h-2 bg-[#E4E4E4] rounded-full">
              <div
                className="bg-[#2DA771] absolute inset-0 rounded-full transition-all duration-300"
                style={{
                  width:
                    index < currentStep
                      ? "100%"
                      : index === currentStep
                        ? "50%"
                        : "0%",
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
