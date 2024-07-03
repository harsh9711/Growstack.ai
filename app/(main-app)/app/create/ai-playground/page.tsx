import { OpenTabIcon, SendIcon2 } from "@/components/svgs";
import { History, Link, MoreHorizontal, Plus, Settings2 } from "lucide-react";
import Image from "next/image";

export default function AiPlayground() {
  return (
    <div className="flex-1 h-full flex flex-col mt-10">
      <div className="flex-1 h-full flex gap-6">
        <div className="!bg-white border border-[#E8E8E8] shadow-box p-5 space-y-5 h-fit">
          <button className="bg-primary-green p-3 rounded-[16px] text-white">
            <Plus size={32}/>
          </button>
          <button className="bg-primary-green p-3 rounded-[16px] text-white">
            <History size={32}/>
          </button>
        </div>
        <div className="!bg-white border border-[#E8E8E8] shadow-box p-7 w-full flex flex-col justify-between">
          <div>
            <div className="flex justify-between">
              <div></div>
              <div className="flex items-center gap-2">
                <div className="flex gap-4">
                  <span className="bg-gray-100 text-sm py-0.5 px-2 rounded-full text-primary-black text-opacity-70">Synced</span>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded-lg">
                  <Settings2 size={20} />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded-lg">
                  <Plus size={20} />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded-lg">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className="bg-[#F5F5F5] border border-[#E8E8E8] rounded-3xl space-y-5">
            <div className="space-y-5 px-7 pt-7 pb-4">
              <h1 className="flex items-center gap-2">
                <Image src="/brands/meta.svg" alt="" width={20} height={20} /> Meta / llama-3-70b-instruct-groq
              </h1>
              <p className="text-primary-black text-opacity-70 leading-relaxed">
                Llama is a 70 billion parameter open source model by Meta fine-tuned for instruction following purposes served by Groq on their LPU hardware.
              </p>
              <div className="space-y-4 divide-y-[1px]">
                <p className="flex pt-4">
                  <span className="font-semibold w-full max-w-[150px]">Context</span>
                  <span className=" w-full text-primary-black text-opacity-70">8,192 tokens</span>
                </p>
                <p className="flex pt-4">
                  <span className="font-semibold w-full max-w-[150px]">Input pricing</span>
                  <span className=" w-full text-primary-black text-opacity-70">$0.70 / million tokens</span>
                </p>
                <p className="flex pt-4">
                  <span className="font-semibold w-full max-w-[150px]">Output pricing</span>
                  <span className=" w-full text-primary-black text-opacity-70">$0.80 / million tokens</span>
                </p>
              </div>
            </div>
            <div className="flex justify-between bg-white p-5 rounded-b-3xl">
              <div className="flex items-center gap-10">
                <span className="flex items-center gap-2 text-primary-black text-opacity-70 cursor-pointer">
                  Model Page <OpenTabIcon className="w-5 h-5" />
                </span>
                <span className="flex items-center gap-2 text-primary-black text-opacity-70 cursor-pointer">
                  Pricing <OpenTabIcon className="w-5 h-5" />
                </span>
              </div>
              <span className="flex items-center gap-2 text-primary-green cursor-pointer">
                Website <OpenTabIcon className="w-5 h-5" />
              </span>
            </div>
          </div>
          <div className="border border-gray-200 bg-[#F5F5F5] flex items-center gap-3 p-1 pl-4 rounded-xl">
            <Link size={20} className="text-primary-green" />
            <input type="text" placeholder="Type your message..." className=" w-full h-11 rounded-xl bg-transparent" />
            <button className="h-12 w-12 flex justify-center items-center bg-primary-green hover:bg-opacity-90 transition-all duration-300 text-white rounded-xl">
              <SendIcon2 />
            </button>
          </div>
        </div>
        <div className="!bg-white border border-[#E8E8E8] shadow-box p-7 w-full flex flex-col justify-between">
          <div>
            <div className="flex justify-between">
              <div></div>
              <div className="flex items-center gap-2">
                <div className="flex gap-4">
                  <span className="bg-gray-100 text-sm py-0.5 px-2 rounded-full text-primary-black text-opacity-70">Synced</span>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded-lg">
                  <Settings2 size={20} />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded-lg">
                  <Plus size={20} />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded-lg">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className="bg-[#F5F5F5] border border-[#E8E8E8] rounded-3xl space-y-5">
            <div className="space-y-5 px-7 pt-7 pb-4">
              <h1 className="flex items-center gap-2">
                <Image src="/brands/meta.svg" alt="" width={20} height={20} /> Meta / llama-3-70b-instruct-groq
              </h1>
              <p className="text-primary-black text-opacity-70 leading-relaxed">
                Llama is a 70 billion parameter open source model by Meta fine-tuned for instruction following purposes served by Groq on their LPU hardware.
              </p>
              <div className="space-y-4 divide-y-[1px]">
                <p className="flex pt-4">
                  <span className="font-semibold w-full max-w-[150px]">Context</span>
                  <span className=" w-full text-primary-black text-opacity-70">8,192 tokens</span>
                </p>
                <p className="flex pt-4">
                  <span className="font-semibold w-full max-w-[150px]">Input pricing</span>
                  <span className=" w-full text-primary-black text-opacity-70">$0.70 / million tokens</span>
                </p>
                <p className="flex pt-4">
                  <span className="font-semibold w-full max-w-[150px]">Output pricing</span>
                  <span className=" w-full text-primary-black text-opacity-70">$0.80 / million tokens</span>
                </p>
              </div>
            </div>
            <div className="flex justify-between bg-white p-5 rounded-b-3xl">
              <div className="flex items-center gap-10">
                <span className="flex items-center gap-2 text-primary-black text-opacity-70 cursor-pointer">
                  Model Page <OpenTabIcon className="w-5 h-5" />
                </span>
                <span className="flex items-center gap-2 text-primary-black text-opacity-70 cursor-pointer">
                  Pricing <OpenTabIcon className="w-5 h-5" />
                </span>
              </div>
              <span className="flex items-center gap-2 text-primary-green cursor-pointer">
                Website <OpenTabIcon className="w-5 h-5" />
              </span>
            </div>
          </div>
          <div className="border border-gray-200 bg-[#F5F5F5] flex items-center gap-3 p-1 pl-4 rounded-xl">
            <Link size={20} className="text-primary-green" />
            <input type="text" placeholder="Type your message..." className=" w-full h-11 rounded-xl bg-transparent" />
            <button className="h-12 w-12 flex justify-center items-center bg-primary-green hover:bg-opacity-90 transition-all duration-300 text-white rounded-xl">
              <SendIcon2 />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
