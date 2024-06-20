import { WorkflowsIcon2 } from "@/components/svgs";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

export default function GetStarted() {
  return (
    <Fragment>
      <main className="">
        <div className="flex justify-between items-center mt-10">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">Get started</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
              Explore pre-built templates, create a new workflow, or import an existing one.
            </p>
          </div>
        </div>
        <div className="w-full py-14 px-5 bg-white rounded-3xl border border-[#E8E8E8] mt-16 max-w-[1600px] mx-auto">
          <div className="flex flex-col justify-center items-center space-y-8">
            <Image src="/logo/growstack-mini.svg" alt="" width={50} height={50} />
            <h2 className="text-3xl font-semibold text-center">Let's build your first workflow</h2>
            <p className="text-primary-black text-opacity-60 max-w-2xl mx-auto text-[16px] leading-relaxed text-center !mt-2">
              You don't have any workflows yet. Explore our template library to get started or build your own from scratch.
            </p>
            <div className="flex gap-4">
              <Link href="/app/create/workflow-builder/create-workflow">
                <button className="bg-primary-green text-white sheen transition duration-500 px-5 py-4 rounded-xl flex items-center gap-2">
                  <Plus size={20} />
                  Create workflow
                </button>
              </Link>
              <Link href="/app/create/workflow-builder/get-started">
                <button className="hover:bg-primary-green/20 text-primary-green sheen transition duration-500 px-5 py-3.5 rounded-xl flex items-center gap-2">
                  <WorkflowsIcon2 className="w-7 h-7 text-primary-green"/>
                  Explore templates
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
}
