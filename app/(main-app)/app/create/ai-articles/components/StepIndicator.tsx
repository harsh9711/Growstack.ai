import React from "react";
import clsx from "clsx";
import { Check } from "lucide-react";
import Image from "next/image";
const CircularImage = () => {
  return (
    <div style={styles.circleContainer}>
      <Image src="/ai.svg" alt="ai" width={25} height={25} />
    </div>
  );
};

const styles = {
  circleContainer: {
    width: '50px',    // Adjust the size as needed
    height: '50px',   // Adjust the size as needed
    backgroundColor: 'white',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',   

  },
};
const StepIndicator = ({ steps, currentStep, setCurrentStep }: { steps: string[]; currentStep: number; setCurrentStep: (value: number) => void }) => {
  return (
    <div className="max-w-fit translate-x-28 gap-10 mx-auto flex justify-between mb-6">
      {steps.map((step, index) => (
        <div key={index} className={`flex items-start gap-5 ${index <= currentStep ? "active" : ""}`}>
          <span
            className={clsx(
              "h-12 w-12 bg-gray-100 grid place-content-center rounded-full transition-all duration-300",
              index <= currentStep && "bg-primary-green text-white",
              index > currentStep && "!cursor-default opacity-50"
            )}>
            {index < currentStep ? <Check /> : index + 1}
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
      ))} <CircularImage/>
    </div>
  );
};

export default StepIndicator;
