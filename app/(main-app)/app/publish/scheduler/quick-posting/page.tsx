import React, { Fragment } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
export default function QuickPosting() {
  return (
    <Fragment>
      <div className="flex flex-col h-full flex-1">
        <div className="mt-8">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">Scheduler</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">Quick posting </p>
          </div>
        </div>
        <div className="flex gap-6 w-full">
          <div className="w-full">
            <section className="w-full bg-white rounded-3xl border border-[#EDEFF0] px-10 py-6 mt-6">
              <h1 className="text-xl font-semibold border-b border-primary-black/10 pb-4">Custom message</h1>
              <div className="space-y-3 w-full mt-6">
                <label className="font-medium">
                  Add content <span className="text-[#F00]">*</span>
                </label>
                <textarea placeholder="write something here..." className="h-[129px] w-full bg-[#F2F2F2] rounded-2xl p-3 resize-none" />
              </div>
            </section>
            <section className="w-full bg-white rounded-3xl border border-[#EDEFF0] px-10 py-6 mt-6">
              <h1 className="text-xl font-semibold border-b border-primary-black/10 pb-4">Enable image / video for posting</h1>
              <div className="w-full flex justify-between mt-6">
                <RadioGroup defaultValue="Image" className="w-full flex items-center max-w-[300px]">
                  <div className="flex space-x-2 w-full">
                    <RadioGroupItem value="Image" id="r1" />
                    <label htmlFor="r1">Image</label>
                  </div>
                  <div className="flex space-x-2 w-full">
                    <RadioGroupItem value="Video" id="r2" />
                    <label htmlFor="r2">Video</label>
                  </div>
                </RadioGroup>
                <button className="h-12 w-full max-w-[180px] bg-primary-green py-3 px-4 sheen flex justify-center items-center gap-3 rounded-xl text-white cursor-pointer">
                  <Plus size={20} />
                  <span className="font-medium">Browse...</span>
                </button>
              </div>
            </section>
            <section className="w-full bg-white rounded-3xl border border-[#EDEFF0] px-10 py-6 mt-6">
              <h1 className="text-xl font-semibold border-b border-primary-black/10 pb-4">Link</h1>
              <div className="w-full flex justify-between mt-6">
                <div className="space-y-3 w-full">
                  <label className="flex items-center gap-1 w-1/5 min-w-[400px] font-medium">Link </label>{" "}
                  <Input type="text" placeholder="Content share link" className="w-full rounded-full" />
                </div>
              </div>
            </section>
          </div>

          <div className="w-full"></div>
        </div>
      </div>
    </Fragment>
  );
}
