import Image from "next/image";
import Link from "next/link";
import { Assistant } from "./types";
import "./Assistant.scss";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

export default function AssistantCard({ avatar, name, role, id, summary }: Assistant) {
  return (
    <div className="bg-white border border-[#E8E8E8] rounded-3xl p-5">
      <div className="relative rounded-2xl overflow-hidden group shadow-box cursor-pointer">

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <div className="relative h-[255px]">
                <div className="w-full h-full transform-style-preserve-3d transition-transform duration-500">
                  <div className="absolute inset-0 backface-hidden">
                    <Image
                      src={avatar || "/assets/avatar_placeholder.png"}
                      alt={name}
                      width={200}
                      height={200}
                      className="min-h-[255px] w-full object-cover max-h-[255px]"
                    />
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black z-[1] flex flex-col justify-end text-white p-4 gap-2">
                <div>
                  <p className="text-center text-white font-bold text-opacity-80 text-sm sm:text-base md:text-lg lg:text-xl">
                    {role}
                  </p>
                </div>
              </div>
              </div>
            </TooltipTrigger>
            <TooltipContent  className="bg-white text-black p-4 ">
              <p className="w-[100%]">{summary}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>




      </div>

      <Link href={`/app/ai-studio/ai-assistant/chat/${id}`}>
        <button className="border border-[#2DA771] bg-white text-[#2DA771] h-12 w-full rounded-xl mt-3 hover:bg-[#2DA771] hover:text-white transition-all duration-300">
          Chat now
        </button>
      </Link>
    </div>
  );
}
