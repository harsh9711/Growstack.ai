import Motion from "@/components/Motion";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { Fragment, useEffect } from "react";

export default function LinkedinSection({
  setMessagingActive,
  handleOnConnect,
  socialProfileData,
  messagingActive,
}: any) {
  const linkedinAccount = socialProfileData?.find((item: any) => {
    return item.platform === "linkedin";
  });

  useEffect(() => {
    if (linkedinAccount?.messagingActive) {
      setMessagingActive(linkedinAccount?.messagingActive);
    }
  }, [linkedinAccount]);
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
                checked={messagingActive}
                onCheckedChange={(checked) => setMessagingActive(checked)}
              />
            </div>
          </div>
        </div>
        <div className="mt-8 space-y-4 border-b border-[#00000015] pb-9">
          <h1 className="text-xl font-semibold text-primary-green">
            API settings
          </h1>
          <div className="flex items-center">
            <p className="w-full max-w-[400px]">Select authentication type</p>
            <div className="w-full flex justify-between">
              <RadioGroup
                defaultValue="Facebook APP method"
                className="w-full flex items-center"
              >
                <div className="flex space-x-2 w-full">
                  <RadioGroupItem value="Facebook APP method" id="r1" />
                  <label htmlFor="r1">LinkedIn APP method</label>
                </div>
              </RadioGroup>
              <button
                onClick={handleOnConnect}
                className="w-full max-w-fit h-12 px-4 py-3 font-medium border border-primary-green text-primary-green rounded-xl flex gap-3 hover:bg-primary-green hover:text-white sheen transition-all duration-300"
              >
                <Plus size={20} />
                Add LinkedIn account
              </button>
            </div>
          </div>
        </div>
      </Motion>
    </Fragment>
  );
}
