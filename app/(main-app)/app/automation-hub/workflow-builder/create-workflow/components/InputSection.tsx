import Motion from "@/components/Motion";
import { InputIcon2 } from "@/components/svgs";
import { ArrowRight, Plus } from "lucide-react";
import React, { Fragment, useState } from "react";
import AddInput from "./layout/AddInput";
import ProvidersDrawer from "./ProvidersDrawer";

interface InputSectionProps {
  inputConfig: any[];
  setInputConfigs: (params: any) => void;
  onSelectAction: (params: any, index: number) => void;
}

export default function InputSection({
  inputConfig,
  setInputConfigs,
  onSelectAction,
}: InputSectionProps) {
  const [addNewInput, setAddNewInput] = useState(false);

  return (
    <Motion
      transition={{ duration: 0.5 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <div className="flex items-center gap-4 border-b border-[#bbbbbb6b] border-dashed pb-8">
        <div className="bg-primary-green p-4 rounded-lg">
          <InputIcon2 className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-medium">Input</h2>
          <span className="text-primary-black text-opacity-50 text-sm">
            Configure and test the input data
          </span>
        </div>
      </div>
      {addNewInput || inputConfig.length ? (
        <AddInput
          setAddNewInput={setAddNewInput}
          inputConfig={inputConfig}
          setInputConfigs={setInputConfigs}
          onSelectAction={onSelectAction}
        />
      ) : (
        <Fragment>
          <div className="mt-8 space-y-3">
            <p className="text-primary-neutral text-xl font-semibold">
              Get started by adding inputs or steps
            </p>
            <p className="text-primary-black text-opacity-70 leading-relaxed text-sm">
              Get started by adding inputs or steps. Use inputs to run your
              workflow dynamically with different values each time. If you don't
              need inputs, you can start adding steps to your workflow in the
              canvas.
            </p>
            <div className="space-y-5 !mt-8">
              <button
                onClick={() => setAddNewInput(true)}
                className="w-full text-center bg-primary-green text-white hover:bg-primary-green/90 transition duration-500 px-5 py-4 rounded-xl flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Add Input
              </button>
              <span className="text-center block">Or</span>
              <ProvidersDrawer
                trigger={
                  <button className="w-full text-center border border-[#E8E8E8] text-primary-green hover:bg-primary-green/10 transition duration-500 px-5 py-4 rounded-xl flex items-center justify-center gap-2">
                    <ArrowRight size={20} />
                    Continue without inputs
                  </button>
                }
                onSelectAction={data => onSelectAction(data, 1)}
              />
            </div>
          </div>
        </Fragment>
      )}
    </Motion>
  );
}
