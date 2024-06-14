"use client";

import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";
import { gpts } from "./data/gpts";
import Image from "next/image";

export default function Customgpts() {
  return (
    <Fragment>
      <main className="">
        <div className="flex justify-between items-center mt-8">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">AI custom GPT</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">All custom GPTs apps</p>
          </div>
          <div className="w-full flex justify-end gap-2">
            <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md">
              <Search className="text-gray-500" size={20} />
              <input type="search" className="outline-none h-[40px] w-full" placeholder="Search GPTs" />
            </div>
            <Link href="/app/plan/custom-gpts/new">
              <button className="bg-primary-green text-white sheen transition duration-500 px-5 py-4 rounded-xl flex items-center gap-2">
                <Plus size={20} />
                Create new GPT
              </button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5 mt-8">
          {gpts.map(({ description, image, name }, index) => (
            <div
              key={index}
              className="bg-white border border-[#E8E8E8] rounded-2xl p-6 hover:shadow-2xl hover:shadow-gray-200 cursor-pointer transition-all duration-300 flex items-center gap-5">
              <Image src={image} alt="" width={90} height={90} className="rounded-xl" />
              <div className="space-y-2">
                <h1 className="text-lg font-semibold">{name}</h1>
                <p className="text-primary-black text-opacity-50 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </Fragment>
  );
}
