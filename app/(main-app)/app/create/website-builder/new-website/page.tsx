import { SendIcon } from "@/components/svgs";
import Image from "next/image";
import { TbArrowUpRight } from "react-icons/tb";

export default function NewWebsite() {
  return (
    <main className="flex-1 h-full w-full flex flex-col justify-center items-center gap-6 mb-24">
      <Image src="/logo/growstack-mini.svg" alt="" width={60} height={60} />
      <h1 className="text-3xl font-semibold text-center">Create landing page with AI</h1>
      <p className="text-center max-w-4xl mx-auto leading-relaxed text-primary-black text-opacity-70">
        Ultimate solution for designing landing pages with the aid of cutting-edge AI technology. Say goodbye to hours of coding and designing – AIPage.dev is
        here to transform your ideas into reality with just a single prompt.
      </p>
      <div className="bg-white pl-4 pr-2 py-2 rounded-2xl border border-[#E8E8E8] w-full max-w-3xl flex gap-4 shadow-xl shadow-gray-200/60">
        <Image src="/logo/growstack-mini.svg" alt="" width={25} height={25} />
        <input className="h-11 w-full" placeholder="A landing page for cozy bakery" />
        <button className="bg-primary-green p-3 rounded-2xl grid place-content-center">
          <SendIcon />
        </button>
      </div>
      <h2 className="text-sm text-primary-black text-opacity-60">Describe your business</h2>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-white border border-[#EBEBEB] py-3 px-4 rounded-xl text-sm">
          A digital agency landing page <TbArrowUpRight size={22}/>
        </div>
        <div className="flex items-center gap-2 bg-white border border-[#EBEBEB] py-3 px-4 rounded-xl text-sm">
          A fashion design landing page <TbArrowUpRight size={22}/>
        </div>
        <div className="flex items-center gap-2 bg-white border border-[#EBEBEB] py-3 px-4 rounded-xl text-sm">
          A tech company landing page <TbArrowUpRight size={22}/>
        </div>
      </div>
    </main>
  );
}
