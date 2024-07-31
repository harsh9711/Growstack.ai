import Motion from "@/components/Motion";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { Fragment } from "react";

export default function InstagramSection({ setMessagingActive, handleOnConnect }: any) {
  return (
    <Fragment>
      <Motion
        transition={{ duration: 0.2 }}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      >
        <div className="mt-3 border-b border-[#00000015] pb-9">
          <div className="space-y-6">
            <h1 className="text-xl font-semibold text-primary-green">
              General settings
            </h1>
            <div className="flex items-center">
              <label className="w-full max-w-[400px]">Enable messaging</label>
              <Switch
                onCheckedChange={(checked) => setMessagingActive(checked)}
              />
            </div>
          </div>
        </div>
        <div className="mt-5 space-y-4 border-b border-[#00000015] pb-9 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-primary-green">
            Instagram API settings
          </h1>

          <button onClick={handleOnConnect} className="w-full max-w-fit h-12 px-4 py-3 font-medium border border-primary-green text-primary-green rounded-xl flex gap-3 hover:bg-primary-green hover:text-white sheen transition-all duration-300">
            <Plus size={20} />
            Add Instagram account
          </button>
        </div>
      </Motion>
    </Fragment>
  );
}
