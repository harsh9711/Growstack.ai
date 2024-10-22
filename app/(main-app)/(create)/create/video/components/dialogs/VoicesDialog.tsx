import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronDown, Search } from "lucide-react";
import { FaCirclePlay } from "react-icons/fa6";

export default function VoicesDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer flex gap-4 h-[48px] items-center justify-between rounded-xl bg-[#F5F5F5] px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
          Select voice
          <ChevronDown className="h-4 w-4 opacity-80" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="border-b pb-3 mb-2">
          <DialogTitle>Select Voice</DialogTitle>
        </DialogHeader>
        <h2 className="uppercase font-medium">Other Languages</h2>
        <div className="bg-[#F5F5F5] px-4 py-1 rounded-xl flex gap-3 items-center w-full">
          <Search className="text-gray-500" size={20} />
          <input
            type="search"
            className="bg-transparent outline-none h-[40px] w-full"
            placeholder="Search voices"
          />
        </div>
        {voices.map((voice, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-4 px-6 rounded-xl border transition-all delay-300 hover:bg-primary-green hover:text-white cursor-pointer"
          >
            <div className="space-y-1">
              <h1 className="text-lg font-semibold">
                {voice.langauge} - {voice.style}
              </h1>
              <p className="text-sm">{voice.description}</p>
            </div>
            <FaCirclePlay size={30} />
          </div>
        ))}
        <div className="flex items-center gap-2">
          <Checkbox />
          Apply new voice to all female avatars
        </div>
      </DialogContent>
    </Dialog>
  );
}

const voices = [
  {
    langauge: "Arabic (BH)",
    style: "Natural",
    description: "A gentle voice, suitable for a variety of content types.",
  },
  {
    langauge: "Arabic (BH)",
    style: "Natural",
    description: "A gentle voice, suitable for a variety of content types.",
  },
  {
    langauge: "Arabic (BH)",
    style: "Natural",
    description: "A gentle voice, suitable for a variety of content types.",
  },
  {
    langauge: "Arabic (BH)",
    style: "Natural",
    description: "A gentle voice, suitable for a variety of content types.",
  },
  {
    langauge: "Arabic (BH)",
    style: "Natural",
    description: "A gentle voice, suitable for a variety of content types.",
  },
  {
    langauge: "Arabic (BH)",
    style: "Natural",
    description: "A gentle voice, suitable for a variety of content types.",
  },
];
