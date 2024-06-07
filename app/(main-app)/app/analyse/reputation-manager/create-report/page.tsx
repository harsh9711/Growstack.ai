import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { PiWarningFill } from "react-icons/pi";

export default function CreateReputationReport() {
  return (
    <main>
      <div className="flex justify-between items-center mt-8">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Reputation manager</h1>
          <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">Add report</p>
        </div>
        <div className="">
          <Link href="/app/analyse/reputation-manager">
            <button className="text-primary-green hover:bg-primary-green/10 flex gap-2 px-3.5 py-2.5 rounded-full font-semibold items-center">
              <ArrowLeft size={20} /> Back
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-white border border-[#E4E4E4] rounded-3xl p-10 mt-5 mb-20">
        <div className="space-y-5">
          <h1 className="text-2xl font-semibold">General settings</h1>
          <div className="grid grid-cols-2 gap-y-8 gap-x-10 border-t border-[#EBEBEB] pb-4 pt-8">
            <div className="space-y-2">
              <label className="font-medium">
                Which location is this report for? <span className="text-[#F00]">*</span>
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Search for location" />
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
                Name your report <span className="text-[#F00]">*</span>
              </label>
              <Input type="text" placeholder="Name your report" />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remember-me" />
              <label htmlFor="remember-me" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Enable a white-label version of this report?
              </label>
            </div>
            <div className="space-y-2">
              <label className="font-medium">
                Choose a white-label profile <span className="text-[#F00]">*</span>
              </label>
              <Select>
                <SelectTrigger className="w-full">
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
                How often do you want this report to run? <span className="text-[#F00]">*</span>
              </label>
              <Select>
                <SelectTrigger className="w-full">
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
                Run every <span className="text-[#F00]">*</span>
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Interval" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sunday">Sunday</SelectItem>
                  <SelectItem value="monday">Monday</SelectItem>
                  <SelectItem value="wednesday">Wednesday</SelectItem>
                  <SelectItem value="thursday">Thursday</SelectItem>
                  <SelectItem value="friday">Friday</SelectItem>
                  <SelectItem value="saturday">Saturday</SelectItem>
                  <SelectItem value="sunday">Sunday</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="border-t border-[#EBEBEB] pt-8 mt-12">
          <h1 className="text-2xl font-semibold">Business details</h1>
          <div className="grid grid-cols-2 gap-y-8 gap-x-10 mt-8">
            <div className="space-y-2">
              <label className="font-medium">
                Business name <span className="text-[#F00]">*</span>
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Search for location" />
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
                Country <span className="text-[#F00]">*</span>
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Search Country" />
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
                State / Country / Region <span className="text-[#F00]">*</span>
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Search state / country / region" />
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
                Address line <span className="text-[#F00]">*</span>
              </label>
              <Input type="text" placeholder="Type address" />
            </div>
            <div className="space-y-2">
              <label className="font-medium">
                Address line 2<span className="text-[#F00]">*</span>
              </label>
              <Input type="text" placeholder="Type address" />
            </div>

            <div className="flex items-center gap-8">
              <div className="space-y-2 w-full">
                <label className="font-medium">
                  Town / city <span className="text-[#F00]">*</span>
                </label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Search for town / city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 w-3/5">
                <label className="font-medium">
                  Zip code / Postcode <span className="text-[#F00]">*</span>
                </label>
                <Input type="text" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-medium">
                Phone number <span className="text-[#F00]">*</span>
              </label>
              <Input type="text" placeholder="Type your Phone number" />
              <p className="text-primary-black text-opacity-70">Use correct format -e.g, 888-645-0838 oir 02 7010 1123</p>
            </div>
            <div className="space-y-2">
              <label className="font-medium">
                Business category <span className="text-[#F00]">*</span>
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Business category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sunday">Sunday</SelectItem>
                  <SelectItem value="monday">Monday</SelectItem>
                  <SelectItem value="wednesday">Wednesday</SelectItem>
                  <SelectItem value="thursday">Thursday</SelectItem>
                  <SelectItem value="friday">Friday</SelectItem>
                  <SelectItem value="saturday">Saturday</SelectItem>
                  <SelectItem value="sunday">Sunday</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="border-t border-[#EBEBEB] py-8 mt-10 flex gap-10">
          <div className="w-full">
            <h1 className="text-2xl font-semibold">Report connections</h1>
            <p className="text-primary-black text-opacity-50 leading-relaxed mt-2">
              Connect your business profile listing and Facebook page to get daily review updates and to respond to those reviews from within your report.
            </p>
          </div>
          <button className="py-4 px-6 bg-primary-green sheen rounded-xl text-white mt-6 flex gap-3">
            Connect <FaGoogle size={24} /> <FaFacebook size={24} />
          </button>
        </div>
        <div className="border-t border-[#EBEBEB] py-8 flex gap-10">
          <div className="w-full">
            <h1 className="text-2xl font-semibold">Review sources</h1>
            <p className="mt-3 text-[#6A37E3] bg-[#6A37E3]/10 leading-relaxed flex gap-2 py-3 px-4 rounded-lg">
              <PiWarningFill size={20} /> Please enter business details above to allow us to find relevant review sources.
            </p>
          </div>
        </div>
        <div className="border-t border-[#EBEBEB] py-8 flex gap-10">
          <div className="w-full">
            <h1 className="text-2xl font-semibold">Email alerts</h1>
            <p className="text-primary-black text-opacity-50 leading-relaxed mt-2">
              We can send you an email alert when your report is completed. We can also send you an alert with details of any new reviews you have recieved.{" "}
            </p>
            <div className="space-y-2 mt-8">
              <label className="font-medium">Receive an email when this report is completed?</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes Please</SelectItem>
                  <SelectItem value="no">No, thanks</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 mt-8">
              <label className="font-medium">
                Enter your email address(es) <span className="text-[#F00]">*</span>
              </label>
              <textarea className="bg-[#F2F2F2] p-4 h-[300px] block resize-none w-full rounded-2xl"></textarea>
              <p className="text-primary-black text-opacity-70">Enter 1 email address per line: max 5 email addresses</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button className="py-3.5 px-6 bg-white border border-[#CF0000] text-[#CF0000] hover:bg-[#cf0000ab]/10 rounded-xl mt-6">Cancel</button>
          <button className="py-3.5 px-6 bg-primary-green sheen rounded-xl text-white mt-6">Run report</button>
        </div>
      </div>
    </main>
  );
}
