import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ChevronRight, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import AssistantsTable from "../components/AssistantsDataTable";
export default function CreateAssistantPage() {
  return (
    <div>
      <div className="flex justify-between items-center mt-8">
        <div className="space-y-2">
          <p className="flex items-center gap-2 text-[#4B465C] text-opacity-50 text-[15px]">
            <Link href="/app/plan/ai-apps" className="hover:text-gray-600 transition-all">
              Ai marketing and sales assistant
            </Link>{" "}
            <ChevronRight size={20} /> <span className="text-[#3D817B]">Create your own assistant</span>
          </p>
        </div>
        <div className="">
          <Link href="/app/plan/ai-apps">
            <button className="text-primary-green hover:bg-primary-green/10 sheen flex gap-2 px-3.5 py-2.5 rounded-full font-semibold items-center">
              <ArrowLeft size={20} /> Back
            </button>
          </Link>
        </div>
      </div>
      <h1 className="text-2xl font-semibold mt-5">Create your own assistant</h1>
      <section className="bg-white border border-[#E4E4E4] rounded-3xl p-10 mt-5">
        <div className="space-y-5">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <Image src="/icons/template.svg" alt="" width={25} height={25} className="select-none" />
            Own assistant generator
          </h1>
          <div className="grid grid-cols-2 gap-8 border-t border-[#EBEBEB] pb-4 pt-8">
            <div className="space-y-2">
              <label className="font-medium">
                Template name<span className="text-[#F00]">*</span>
              </label>
              <Input type="text" placeholder="Type template name" />
            </div>
            <div className="space-y-2">
              <label className="font-medium">
                Template description <span className="text-[#F00]">*</span>
              </label>
              <Input type="text" placeholder="Type template description" />
            </div>

            <div className="space-y-2">
              <label className="font-medium">
                Template category <span className="text-[#F00]">*</span>
              </label>
              <Select>
                <SelectTrigger className="w-full border-none h-14">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="font-medium">
                Template icon <span className="text-[#F00]">*</span>
              </label>
              <Input type="text" placeholder="ex:<i class=’fa-solid fa-books’></i>" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="font-medium">
              User input fields <span className="text-[#F00]">*</span>
            </label>
            <div className="flex gap-4 items-center">
              <div className="w-full space-y-2">
                <Input type="text" placeholder="Type input field title (required)" />
              </div>
              <div className="w-full space-y-2">
                <Input type="text" placeholder="Type input field description (required)" />
              </div>
              <div className="w-full space-y-2">
                <Select>
                  <SelectTrigger className="w-full border-none h-14">
                    <SelectValue placeholder="Input field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Input field">Input field</SelectItem>
                    <SelectItem value="Textarea field">Textarea field</SelectItem>
                    <SelectItem value="Select list field">Select list field</SelectItem>
                    <SelectItem value="Checkbox list field">Checkbox list field</SelectItem>
                    <SelectItem value="Radio buttons field">Radio buttons field</SelectItem>
                  </SelectContent>
                </Select>{" "}
              </div>
              <div className="w-full space-y-2">
                <Select>
                  <SelectTrigger className="w-full border-none h-14">
                    <SelectValue placeholder="Optional" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Optional">Optional</SelectItem>
                    <SelectItem value="Required">Required</SelectItem>
                  </SelectContent>
                </Select>{" "}
              </div>
              <button className="bg-primary-green text-white py-3 px-4 hover:bg-opacity-90 rounded-l-3xl rounded-r-lg">
                <Plus />
              </button>
            </div>
          </div>
          <div className="space-y-2 !mt-8">
            <label className="font-medium">
              Custom prompt <span className="text-[#F00]">*</span>
            </label>
            <textarea placeholder="Type your custom prompt" className="h-[200px] w-full bg-[#F2F2F2] rounded-2xl p-3 resize-none" />
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button className="py-3.5 px-6 bg-primary-green sheen rounded-xl text-white mt-6">Create your own assistant</button>
        </div>
      </section>
      <section className="bg-white border border-[#E4E4E4] rounded-3xl p-10 mt-7">
        <AssistantsTable />
      </section>
      <input type="month" />
    </div>
  );
}
