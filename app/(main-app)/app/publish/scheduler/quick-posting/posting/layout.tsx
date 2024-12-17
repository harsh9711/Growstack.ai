import React, { Fragment } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <div className="flex flex-col h-full flex-1">
        <div className="mt-8">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">Scheduler</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
              Connect with social media account to schedule your post{" "}
            </p>
          </div>
        </div>
        <div className="flex-1 h-full w-full flex justify-center items-center mb-32">
          {children}
        </div>
      </div>
    </Fragment>
  );
}
