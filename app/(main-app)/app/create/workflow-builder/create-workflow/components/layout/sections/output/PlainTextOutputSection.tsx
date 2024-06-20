import Motion from "@/components/Motion";
import { Input } from "@/components/ui/input";

export default function PlainTextOutputSection() {
  return (
    <Motion transition={{ duration: 0.5 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="font-medium text-sm">Output label</label>
          <Input type="text" placeholder="Output label" />
        </div>

        <div className="space-y-2">
          <label className="font-medium flex gap-2 items-center">Value </label>
          <textarea
            placeholder="Reference variables from previous steps using '@' to autocomplete"
            className="bg-[#F2F2F2] p-3 h-[120px] block resize-none w-full rounded-xl"></textarea>
        </div>

        <div className="space-y-2">
          <label className="font-medium text-sm">JSON Key </label>
          <Input type="text" placeholder="Key (e.g. download_link)" />
        </div>
      </div>
    </Motion>
  );
}
