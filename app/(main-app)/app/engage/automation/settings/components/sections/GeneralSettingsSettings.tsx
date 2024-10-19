"use client";

import { timezones } from "@/app/(main-app)/app/publish/scheduler/settings/constants/timezones";
import Motion from "@/components/Motion";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function GeneralSettingsSettings() {
  return (
    <Motion
      transition={{ duration: 0.4 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <div className="mt-8 flex-1 h-full w-full flex flex-col">
        <div className="flex-1 h-full w-full flex justify-center items-center mt-5">
          <div className="w-full max-w-2xl !bg-white border border-[#EDEFF0] rounded-3xl shadow-box p-10">
            <h1 className="text-xl font-semibold border-b border-[#EDEFF0] pb-4">
              Client information
            </h1>
            <div className="mt-4 flex flex-col gap-5">
              <div className="space-y-2">
                <label className="font-medium">Company name </label>
                <Input type="text" placeholder="Company name" />
              </div>
              <div className="space-y-2">
                <label className="font-medium">
                  Country <span className="text-[#F00]">*</span>
                </label>
                <Input type="text" placeholder="All contacts" />
              </div>
              <div className="space-y-2">
                <label className="font-medium">Address line </label>
                <Input type="text" placeholder="Address line" />
              </div>
              <div className="space-y-2">
                <label className="font-medium">
                  Time zone <span className="text-[#F00]">*</span>
                </label>
                <Select>
                  <SelectTrigger className="w-full border-none px-4">
                    <SelectValue placeholder="Select Timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {timezones.map(({ label, value }, i) => (
                        <SelectItem value={value}>{label}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="font-medium">Logo</label>
                <div className="flex items-center gap-2">
                  <Input type="file" id="logo" className="flex items-center" />
                  <label
                    htmlFor="logo"
                    className="bg-[#CECECE] h-12 px-4 py-3 text-primary-black text-opacity-80 min-w-fit rounded-lg"
                  >
                    Choose file
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-4 w-full">
                <button className="py-3.5 h-14 w-full max-w-[200px] px-6 bg-primary-green sheen rounded-xl text-white mt-6 flex items-center justify-center gap-3 whitespace-nowrap">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Motion>
  );
}
