import { ALL_ROUTES } from "@/utils/constant";
import { Search } from "lucide-react";
import Link from "next/link";
import React, { Fragment } from "react";
import { HiOutlineFolderPlus } from "react-icons/hi2";

export default function MyVideos() {
  return (
    <Fragment>
      <main className="">
        <div className="flex justify-between items-center mt-8">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">Text to avatar</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
              My videos
            </p>
          </div>
          <div className="w-full flex justify-end gap-2">
            <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md">
              <Search className="text-gray-500" size={20} />
              <input
                type="search"
                className="outline-none h-[40px] w-full"
                placeholder="Search template"
              />
            </div>
            <Link href={ALL_ROUTES.TEXT_TO_AVATAR_MY_AVATARS}>
              <button className="text-[#2DA771] bg-transparent border border-[#2DA771] h-12 sheen transition duration-500 px-5 py-4 rounded-xl flex items-center gap-2">
                <HiOutlineFolderPlus size={20} />
                New Folder
              </button>
            </Link>
          </div>
        </div>
      </main>
    </Fragment>
  );
}
