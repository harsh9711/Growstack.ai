import Motion from "@/components/Motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TextEditor from "../Editor";
import Editor from "@/app/(main-app)/app/plan/ai-templates/[appId]/components/Editor";

export default function AiWriterSection() {
  return (
    <Motion transition={{ duration: 0.2 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <div className="flex gap-5 mt-8">
        <div className="w-full !bg-white border border-[#EDEFF0] rounded-3xl shadow-box p-10">
          <h1 className="text-xl font-semibold border-b border-[#EDEFF0] pb-4">Add new bot reply</h1>
          <div className="mt-4 flex flex-col gap-5">
            <div className="space-y-2">
              <label className="font-medium">Use case </label>
              <Select>
                <SelectTrigger className="w-full border-none">
                  <SelectValue placeholder="Select use cases" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>{" "}
            </div>
            <div className="space-y-2">
              <label className="font-medium">Primary keyword</label>
              <Select>
                <SelectTrigger className="w-full border-none">
                  <SelectValue placeholder="Select primary keywords" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>{" "}
            </div>
            <div className="space-y-2">
              <label className="font-medium">
                Variants <span className="text-[#CF0000]">*</span>
              </label>
              <Select>
                <SelectTrigger className="w-full border-none">
                  <SelectValue placeholder="Select variants" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 variant">1 variant</SelectItem>
                  <SelectItem value="2 variants">2 variants</SelectItem>
                  <SelectItem value="3 variants">3 variants</SelectItem>
                  <SelectItem value="4 variants">4 variants</SelectItem>
                  <SelectItem value="5 variants">5 variants</SelectItem>
                </SelectContent>
              </Select>{" "}
            </div>

            <div className="flex justify-end gap-4 w-full">
              <button className="py-3.5 h-14 w-full max-w-[200px] px-6 bg-primary-green sheen rounded-xl text-white mt-6 flex items-center justify-center gap-3 whitespace-nowrap">
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="w-full !bg-white border border-[#EDEFF0] rounded-3xl shadow-box p-10 space-y-5 flex flex-col">
          <h1 className="text-xl font-semibold">Generate AI Content</h1>
          <div className="flex-1 flex flex-col">
            <Editor content="" onChange={() => {}} />
          </div>
        </div>
      </div>
    </Motion>
  );
}
