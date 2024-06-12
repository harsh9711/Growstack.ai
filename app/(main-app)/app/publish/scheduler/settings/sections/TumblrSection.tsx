import Motion from "@/components/Motion";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { Fragment } from "react";

export default function TumblrSection() {
  return (
    <Fragment>
      <Motion transition={{ duration: 0.2 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
        <div className="mt-3 border-b border-[#00000015] pb-9">
          <div className="space-y-6">
            <h1 className="text-xl font-semibold text-primary-green">General settings</h1>
            <div className="flex items-center">
              <label className="w-full max-w-[400px]">Enable auto posting</label>
              <Switch defaultChecked={true} />
            </div>
          </div>
          <div className="flex mt-8">
            <p className="w-full max-w-[400px]">Post content</p>
            <div className="w-full">
              <div className="w-full flex justify-between">
                <RadioGroup defaultValue="Snippets" className="w-full flex items-center">
                  <div className="flex space-x-2 w-full">
                    <RadioGroupItem value="Snippets" id="r1" />
                    <label htmlFor="r1">Snippets</label>
                  </div>
                  <div className="flex space-x-2 w-full">
                    <RadioGroupItem value="Full" id="r2" />
                    <label htmlFor="r2">Full</label>
                  </div>
                </RadioGroup>
              </div>
              <p className="text-primary-black text-opacity-50 mt-3">
                Choose whether you want to post the full content or just a snippet to your Tumblr page. if you choose snippets, it will post the first 200
                characters from your post.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 space-y-4 border-b border-[#00000015] pb-9">
          <h1 className="text-xl font-semibold text-primary-green">API settings</h1>
          <p className="w-full font-medium">Tumblr application</p>
          <div className="flex items-center gap-4 !mt-7">
            <div className="space-y-3 w-full">
              <label className="flex items-center gap-1 w-1/5 min-w-[400px] font-medium">
                Enter consumer key <span className="text-[#F00]">*</span>
              </label>
              <Input type="text" placeholder="Enter Twitter API key: Enter Twitter API key." className="w-full" />
            </div>
            <div className="space-y-3 w-full">
              <label className="flex items-center gap-1 w-1/5 min-w-[400px] font-medium">
                Enter Secret Key <span className="text-[#F00]">*</span>
              </label>{" "}
              <Input type="text" placeholder="Enter Twitter API Secret." className="w-full" />
            </div>

            <div className="space-y-3 w-full">
              <label className="flex items-center gap-1 w-1/5 min-w-[400px] font-medium">Allowing permissions</label>
              <Input type="text" placeholder="Enter Twitter access token secret." className="w-full" />
            </div>
          </div>
          <div className="w-full flex justify-end">
            <button className="w-full max-w-fit h-12 px-4 py-3 font-medium border border-primary-green text-primary-green rounded-xl flex gap-3 hover:bg-primary-green hover:text-white sheen transition-all duration-300">
              <Plus size={20} />
              Add more
            </button>
          </div>
        </div>
        <div className="mt-10 space-y-6">
          <h1 className="text-xl font-semibold text-primary-green">Auto post settings</h1>

          <div className="flex items-center">
            <label className="flex items-center gap-1 w-1/5 min-w-[400px] font-medium">Autopost posts to Tumblr of this user(s)</label>
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
            <label className="flex items-center gap-1 w-1/5 min-w-[400px] font-medium">Posting type</label>
            <div className="w-full">
              <Select>
                <SelectTrigger className="w-full h-12 rounded-xl border-0">
                  <SelectValue placeholder="Select Posting type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Text">Text</SelectItem>
                  <SelectItem value="Link">Link</SelectItem>
                  <SelectItem value="Photo">Photo</SelectItem>
                </SelectContent>
              </Select>
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
