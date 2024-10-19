import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Integrations() {
  return (
    <main>
      <div className="flex justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Integrations</h1>
          <p className="text-primary-black text-opacity-50">
            Use one of our integrations to supercharge your productivity.
          </p>
        </div>
      </div>
      <div className="space-y-4 mt-5">
        <div className="bg-white px-10 py-7 rounded-3xl border border-[#E8E8E8] flex items-center justify-between hover:shadow-xl hover:shadow-gray-100 cursor-pointer transition-all duration-300">
          <div className="flex items-center gap-5">
            <Image src="/assets/calendar.svg" alt="" width={70} height={70} />
            <div className="space-y-2">
              <h1 className="text-lg font-semibold">Calendar Feed</h1>
              <p className="text-primary-black text-opacity-50">
                Use the calendar feed integration to one-way sync all your tasks
                with Google, Apple or Outlook.
              </p>
            </div>
          </div>
          <ChevronRight size={30} className="text-gray-500" />
        </div>
        <div className="bg-white px-8 py-5 rounded-3xl border border-[#E8E8E8] flex items-center justify-between hover:shadow-xl hover:shadow-gray-100 cursor-pointer transition-all duration-300">
          <div className="flex items-center gap-5">
            <Image
              src="/assets/google-calendar.svg"
              alt=""
              width={90}
              height={90}
            />
            <div className="space-y-2">
              <h1 className="text-lg font-semibold">Calendar Feed</h1>
              <p className="text-primary-black text-opacity-50">
                Use the calendar feed integration to one-way sync all your tasks
                with Google, Apple or Outlook.
              </p>
            </div>
          </div>
          <ChevronRight size={30} className="text-gray-500" />
        </div>
        <div className="bg-white px-10 py-7 rounded-3xl border border-[#E8E8E8] flex items-center justify-between hover:shadow-xl hover:shadow-gray-100 cursor-pointer transition-all duration-300">
          <div className="flex items-center gap-5">
            <Image src="/assets/zapier.svg" alt="" width={70} height={70} />
            <div className="space-y-2">
              <h1 className="text-lg font-semibold">Calendar Feed</h1>
              <p className="text-primary-black text-opacity-50">
                Use the calendar feed integration to one-way sync all your tasks
                with Google, Apple or Outlook.
              </p>
            </div>
          </div>
          <ChevronRight size={30} className="text-gray-500" />
        </div>
      </div>
    </main>
  );
}
