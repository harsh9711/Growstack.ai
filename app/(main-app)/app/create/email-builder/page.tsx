"use client";

import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

export default function EmailBuilder() {
  return (
    <Fragment>
      <main className="">
        <div className="flex justify-between items-center mt-8">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">AI Email builder</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">Manage your projects.</p>
          </div>
          <div className="w-full flex justify-end gap-2">
            <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md">
              <Search className="text-gray-500" size={20} />
              <input type="search" className="outline-none h-[40px] w-full" placeholder="Search GPTs" />
            </div>
            <Link href="/app/plan/custom-gpts/new">
              <button className="bg-primary-green text-white sheen transition duration-500 px-5 py-4 rounded-xl flex items-center gap-2">
                <Plus size={20} />
                Create new AI Email
              </button>
            </Link>
          </div>
        </div>
      </main>
    </Fragment>
  );
}
