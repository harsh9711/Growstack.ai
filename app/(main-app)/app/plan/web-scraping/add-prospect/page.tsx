"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AddProspect() {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div className="mt-8 flex-1 h-full w-full flex flex-col">
      <Link href="/app/plan/web-scraping">
        <button className="text-[#212833] hover:bg-primary-green/10 sheen flex gap-2 px-3.5 py-2 rounded-full font-medium items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path
              d="M11.8687 15.6313C12.2104 15.973 12.2104 16.527 11.8687 16.8687C11.527 17.2104 10.973 17.2104 10.6313 16.8687L11.8687 15.6313ZM6.25 11.25L5.63128 11.8687C5.46719 11.7046 5.375 11.4821 5.375 11.25C5.375 11.0179 5.46719 10.7954 5.63128 10.6313L6.25 11.25ZM10.6313 5.63128C10.973 5.28957 11.527 5.28957 11.8687 5.63128C12.2104 5.97299 12.2104 6.52701 11.8687 6.86872L10.6313 5.63128ZM6.25 12.125C5.76675 12.125 5.375 11.7332 5.375 11.25C5.375 10.7667 5.76675 10.375 6.25 10.375L6.25 12.125ZM18.75 22.125C18.2667 22.125 17.875 21.7332 17.875 21.25C17.875 20.7667 18.2667 20.375 18.75 20.375L18.75 22.125ZM10.6313 16.8687L5.63128 11.8687L6.86872 10.6313L11.8687 15.6313L10.6313 16.8687ZM5.63128 10.6313L10.6313 5.63128L11.8687 6.86872L6.86872 11.8687L5.63128 10.6313ZM6.25 10.375L20 10.375L20 12.125L6.25 12.125L6.25 10.375ZM20 10.375C23.2447 10.375 25.875 13.0053 25.875 16.25L24.125 16.25C24.125 13.9718 22.2782 12.125 20 12.125L20 10.375ZM25.875 16.25C25.875 19.4947 23.2447 22.125 20 22.125L20 20.375C22.2782 20.375 24.125 18.5282 24.125 16.25L25.875 16.25ZM20 22.125L18.75 22.125L18.75 20.375L20 20.375L20 22.125Z"
              fill="#212833"
            />
          </svg>{" "}
          Back to prospect accounts
        </button>
      </Link>

      <div className="flex-1 h-full w-full flex justify-center items-center mt-10 mb-20">
        <div className="w-full max-w-3xl !bg-white border border-[#EDEFF0] rounded-3xl shadow-box p-10">
          <h1 className="text-xl font-semibold border-b border-[#EDEFF0] pb-4">Add prospect</h1>
          <div className="mt-4 flex flex-col gap-5">
            <div className="space-y-2">
              <label className="font-medium">
                Business name <span className="text-[#F00]">*</span>
              </label>
              <Input type="text" placeholder="Type your Business name" />
            </div>
            <div className="space-y-2">
              <label className="font-medium">
                Business phone number <span className="text-[#F00]">*</span>
              </label>
              <Input type="text" placeholder="Type your phone number" />
            </div>
            <div className="space-y-2">
              <label className="font-medium">
                Address <span className="text-[#F00]">*</span>
              </label>
              <Input type="text" placeholder="Type Business Address" />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="font-medium">
                  City <span className="text-[#F00]">*</span>
                </label>
                <Input type="text" placeholder="Type City" />
              </div>
              <div className="space-y-2">
                <label className="font-medium">
                  State <span className="text-[#F00]">*</span>
                </label>
                <Input type="text" placeholder="Type State" />
              </div>
              <div className="space-y-2">
                <label className="font-medium">
                  Country <span className="text-[#F00]">*</span>
                </label>
                <Select>
                  <SelectTrigger className="w-full border-none">
                    <SelectValue placeholder="Country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sunday">Sunday</SelectItem>
                    <SelectItem value="monday">Monday</SelectItem>
                    <SelectItem value="wednesday">Wednesday</SelectItem>
                    <SelectItem value="thursday">Thursday</SelectItem>
                    <SelectItem value="friday">Friday</SelectItem>
                    <SelectItem value="saturday">Saturday</SelectItem>
                    <SelectItem value="sunday">Sunday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="font-medium">
                  Zip code <span className="text-[#F00]">*</span>
                </label>
                <Input type="text" placeholder="Type Zip code" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-medium">
                Website <span className="text-[#F00]">*</span>
              </label>
              <Input type="url" placeholder="Type Website URL" />
            </div>

            <div className="flex items-center gap-3">
              <Switch checked={isChecked} onCheckedChange={() => setIsChecked((prev) => !prev)} />
              Do you have a point of contact at this business?
            </div>
            {isChecked ? (
              <>
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="font-medium">First name</label>
                    <Input type="text" placeholder="Type First name" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-medium">Last name</label>
                    <Input type="text" placeholder="Type Last name" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-medium">Email</label>
                    <Input type="text" placeholder="Type Email" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-medium">Phone</label>
                    <Input type="text" placeholder="Type Phone" />
                  </div>
                </div>
              </>
            ) : null}

            <div className="flex justify-end gap-4 w-full">
              <button className="py-3.5 h-14 w-full max-w-[140px] px-6 bg-white border text-primary-green border-primary-green  rounded-xl mt-6">Reset</button>
              <button className="py-3.5 h-14 w-full max-w-[200px] px-6 bg-primary-green sheen rounded-xl text-white mt-6 flex items-center justify-center gap-3 whitespace-nowrap">
                Save Prospect{" "}
                <span className="relative p-2 text-primary-green bg-white rounded-full">
                  <ArrowRight size={20} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
