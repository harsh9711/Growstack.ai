import React, { Fragment } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { logs } from "./data/logs";

export default function MultipostingPage() {
  return (
    <Fragment>
      <main>
        <div className="flex justify-between items-center mt-8">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">Scheduler</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[16px]">Posting debug log </p>
          </div>
        </div>
        <div className="!bg-white border border-[#E8E8E8] shadow-box py-5 pl-16 pr-8 rounded-3xl mt-5">
          <div className="space-y-7 m-5 overflow-y-auto scrollbar-primary max-h-[68vh]">
            {logs.map((log, index) => (
              <div key={index}>
                {log.date} @ {log.time} - {log.description}
              </div>
            ))}
          </div>
        </div>
      </main>
    </Fragment>
  );
}
