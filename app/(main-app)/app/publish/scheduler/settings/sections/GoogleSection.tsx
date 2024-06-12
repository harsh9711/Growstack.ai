import Motion from "@/components/Motion";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { Fragment } from "react";

export default function GoogleSection() {
  return (
    <Fragment>
      <Motion transition={{ duration: 0.2 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
        <div className="mt-3 border-b border-[#00000015] pb-9">
          <div className="space-y-6">
            <h1 className="text-xl font-semibold text-primary-green">General settings</h1>
            <div className="flex items-center">
              <label className="w-full max-w-[400px]">Enable autoposting to Google my business</label>
              <Switch defaultChecked={true} />
            </div>
          </div>
        </div>
        <div className="mt-5 space-y-4 border-b border-[#00000015] pb-9 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-primary-green">API settings</h1>

          <button className="w-full max-w-fit h-12 px-4 py-3 font-medium border border-primary-green text-primary-green rounded-xl flex gap-3 hover:bg-primary-green hover:text-white sheen transition-all duration-300">
            <Plus size={20} />
            Add GMB account
          </button>
        </div>
        <div className="mt-10 space-y-6">
          <h1 className="text-xl font-semibold text-primary-green">Auto post settings</h1>

          <div className="flex items-center">
            <label className="flex items-center gap-1 w-1/5 min-w-[400px] font-medium">Autopost Posts to Google My Business of this user(s)</label>
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
            <label className="flex items-center gap-1 w-1/5 min-w-[400px] font-medium">Select GMB button type</label>
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
            <label className="flex items-center gap-1 w-1/5 min-w-[400px] font-medium">Google my business post image</label>
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
        </div>
      </Motion>
    </Fragment>
  );
}
