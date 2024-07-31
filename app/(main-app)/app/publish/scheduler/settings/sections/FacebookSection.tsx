import Motion from "@/components/Motion";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { Fragment } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function FacebookSection({ setMessagingActive }: any) {
  return (
    <Fragment>
      <Motion
        transition={{ duration: 0.2 }}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      >
        <div className="flex gap-10 mt-3">
          <div className="w-full">
            <div className="space-y-4">
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
          {/* <div className="w-full">
            <div className="space-y-4 max-w-[400px]">
              <h1 className="text-xl font-semibold text-primary-green">Proxy Settings</h1>
              <div className="flex justify-between items-center space-x-2">
                <label>Enable Proxy</label>
                <Switch />
              </div>
            </div>
          </div> */}
        </div>
        <div className="mt-16 space-y-3">
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
                  <label htmlFor="r1">Facebook APP method</label>
                </div>
                {/* <div className="flex space-x-2 w-full">
                  <RadioGroupItem value="Facebook graph API" id="r2" />
                  <label htmlFor="r2">Facebook graph API</label>
                </div> */}
              </RadioGroup>
              <button className="w-full max-w-fit h-12 px-4 py-3 font-medium border border-primary-green text-primary-green rounded-xl flex gap-3 hover:bg-primary-green hover:text-white sheen transition-all duration-300">
                <Plus size={20} />
                Add Facebook account
              </button>
            </div>
          </div>
        </div>
        {/* <div className="mt-16 space-y-6">
          <h1 className="text-xl font-semibold text-primary-green">Auto post settings</h1>

          <div className="flex items-center">
            <label className="flex items-center gap-1 w-1/5 min-w-[400px] font-medium">Autopost posts to Facebook of this user(s)</label>
            <div className="w-full">
              <Select>
                <SelectTrigger className="w-full h-12 rounded-xl border-0">
                  <SelectValue placeholder="Select Autopost posts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monday">Monday</SelectItem>
                  <SelectItem value="Tuesday">Tuesday</SelectItem>
                  <SelectItem value="Wednesday">Wednesday</SelectItem>
                  <SelectItem value="Thursday">Thursday</SelectItem>
                  <SelectItem value="Friday">Friday</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center">
            <label className="flex items-center gap-1 w-1/5 min-w-[400px] font-medium">Share posting type</label>
            <div className="w-full flex gap-5">
              <Input type="url" placeholder="posting type" className="w-full" />
              <button className="h-12 w-full max-w-[180px] bg-primary-green py-3 px-4 sheen flex justify-center items-center gap-3 rounded-xl text-white cursor-pointer">
                <Plus size={20} />
                <span className="font-medium">Browse...</span>
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <label className="flex items-center gap-1 w-1/5 min-w-[400px] font-medium">URL shortener</label>
            <div className="w-full">
              <Select>
                <SelectTrigger className="w-full h-12 rounded-xl border-0">
                  <SelectValue placeholder="Select URL shortner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Bitly">Bitly</SelectItem>
                  <SelectItem value="Rebrandly">Rebrandly</SelectItem>
                  <SelectItem value="Dub">Dub</SelectItem>
                  <SelectItem value="TinyURL">TinyURL</SelectItem>
                  <SelectItem value="BL.INK">BL.INK</SelectItem>
                  <SelectItem value="Short.io">Short.io</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div> */}
      </Motion>
    </Fragment>
  );
}
