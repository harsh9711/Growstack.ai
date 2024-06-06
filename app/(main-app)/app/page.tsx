import { ArrowRight, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable } from "./components/Table";

export default function Dashboard() {
  return (
    <main className="text-[14px]">
      <div className="bg-[#EBF0F6] h-80 w-full max-w-[95%] mx-auto absolute top-0 left-0 right-0 rounded-b-[60px]" />
      <div className="max-w-[85%] mx-auto relative z-[1]">
        <div className="flex justify-between items-center mt-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-[15px]">
              23 August - 23 September 2024
              <span>
                <Image src="/icons/calendar-edit.svg" alt="" width={20} height={20} className="select-none" />
              </span>
            </p>
          </div>
          <div className="flex items-center gap-2 relative">
            <Select>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent defaultValue={"daily"}>
                <SelectGroup>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <button className="bg-primary-green py-4 pl-4 pr-5 flex items-center gap-3 rounded-xl text-white">
              <Plus size={22} />
              Create social planner
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-6 mt-10">
          <div className="bg-white py-7 px-8 rounded-3xl flex justify-between items-center shadow-2xl shadow-gray-200">
            <div className="space-y-3">
              <p className="text-[#4B4B4B]">Total balance</p>
              <h1 className="text-[40px] font-semibold">$500.00</h1>
              <p className="text-[#F4360C]">- 122.1M (1%)</p>
            </div>
            <Image src="/icons/dollar.svg" alt="" width={100} height={100} />
          </div>
          <div className="bg-white py-7 px-8 rounded-3xl flex justify-between items-center shadow-2xl shadow-gray-200">
            <div className="space-y-3">
              <p className="text-[#4B4B4B]">Total tokens</p>
              <h1 className="text-[40px] font-semibold">175,000</h1>
              <p className="text-[#F4360C]">- 42.1M (2%)</p>
            </div>
            <Image src="/icons/coin.svg" alt="" width={100} height={100} />
          </div>
          <div className="bg-white py-7 px-8 rounded-3xl flex justify-between items-center shadow-2xl shadow-gray-200">
            <div className="space-y-3">
              <p className="text-[#4B4B4B]">Total tokens</p>
              <h1 className="text-[40px] font-semibold">85,000</h1>
              <p className="text-[#1D8F6D]">+ 21%</p>
            </div>
            <Image src="/icons/payment.svg" alt="" width={100} height={100} />
          </div>
          <div className="bg-white py-7 px-8 rounded-3xl flex justify-between items-center shadow-2xl shadow-gray-200">
            <div className="space-y-3">
              <p className="text-[#4B4B4B]">Total tokens</p>
              <h1 className="text-[40px] font-semibold">$300.00</h1>
              <p className="text-[#1D8F6D]">+ 21%</p>
            </div>
            <Image src="/icons/payment-dollar.svg" alt="" width={100} height={100} />
          </div>
        </div>
        <div className="w-full flex gap-6 mt-10">
          <div className="w-full space-y-6">
            <div className="w-full bg-white border border-[#E8E8E8] rounded-3xl p-6">
              <h1 className="text-lg font-semibold">Revenue Distribution</h1>
              <DataTable />
            </div>
            <div className="w-full bg-white border border-[#E8E8E8] rounded-3xl p-6">
              <h1 className="text-lg font-semibold">Campaigns activity</h1>
              <DataTable />
            </div>
          </div>
          <div className="w-3/5 bg-white p-6 rounded-3xl border borer-[#E8E8E8] space-y-5">
            <div className="space-y-3">
              <h1 className="text-2xl font-semibold text-center">Unlock the power of AI</h1>
              <p className="text-[#6C7275] text-center">Chat with the smartest AI - Experience the power of AI with us</p>
            </div>
            <div className="!mt-6 bg-white border border-[#E8ECEF] rounded-3xl p-4 flex justify-between items-center cursor-pointer transition duration-300 hover:border-primary-green hover:shadow-2xl hover:shadow-primary-green/10">
              <div className="flex gap-4 items-center">
                <Image src="/icons/media.svg" alt="" width={80} height={80} />
                <h2 className="text-[17px]">Text to video </h2>
              </div>
              <button className="p-2 hover:bg-[#f2f2f2] rounded-lg transition">
                <ArrowRight className="text-gray-500" />
              </button>
            </div>
            <div className="bg-white border border-[#E8ECEF] rounded-3xl p-4 flex justify-between items-center cursor-pointer transition duration-300 hover:border-primary-green hover:shadow-2xl hover:shadow-primary-green/10">
              <div className="flex gap-4 items-center">
                <Image src="/icons/chatbot.svg" alt="" width={80} height={80} />
                <h2 className="text-[17px]">Chatbot & virtual assistant</h2>
              </div>
              <button className="p-2 hover:bg-[#f2f2f2] rounded-lg transition">
                <ArrowRight className="text-gray-500" />
              </button>
            </div>
            <div className="bg-white border border-[#E8ECEF] rounded-3xl p-4 flex justify-between items-center cursor-pointer transition duration-300 hover:border-primary-green hover:shadow-2xl hover:shadow-primary-green/10">
              <div className="flex gap-4 items-center">
                <Image src="/icons/social.svg" alt="" width={80} height={80} />
                <h2 className="text-[17px]">Social planner hub </h2>
              </div>
              <button className="p-2 hover:bg-[#f2f2f2] rounded-lg transition">
                <ArrowRight className="text-gray-500" />
              </button>
            </div>
            <div className="bg-white border border-[#E8ECEF] rounded-3xl p-4 flex justify-between items-center cursor-pointer transition duration-300 hover:border-primary-green hover:shadow-2xl hover:shadow-primary-green/10">
              <div className="flex gap-4 items-center">
                <Image src="/icons/web-builder.svg" alt="" width={80} height={80} />
                <h2 className="text-[17px]">AI website landing builder</h2>
              </div>
              <button className="p-2 hover:bg-[#f2f2f2] rounded-lg transition">
                <ArrowRight className="text-gray-500" />
              </button>
            </div>
            <div className="bg-white border border-[#E8ECEF] rounded-3xl p-4 flex justify-between items-center cursor-pointer transition duration-300 hover:border-primary-green hover:shadow-2xl hover:shadow-primary-green/10">
              <div className="flex gap-4 items-center">
                <Image src="/icons/audio.svg" alt="" width={80} height={80} />
                <h2 className="text-[17px]">AI marketing and sales </h2>
              </div>
              <button className="p-2 hover:bg-[#f2f2f2] rounded-lg transition">
                <ArrowRight className="text-gray-500" />
              </button>
            </div>
            <div className="bg-white border border-[#E8ECEF] rounded-3xl p-4 flex justify-between items-center cursor-pointer transition duration-300 hover:border-primary-green hover:shadow-2xl hover:shadow-primary-green/10">
              <div className="flex gap-4 items-center">
                <Image src="/icons/custom-gpts.svg" alt="" width={80} height={80} />
                <h2 className="text-[17px]">Custom GPT apps </h2>
              </div>
              <button className="p-2 hover:bg-[#f2f2f2] rounded-lg transition">
                <ArrowRight className="text-gray-500" />
              </button>
            </div>
            <div className="bg-white border border-[#E8ECEF] rounded-3xl p-4 flex justify-between items-center cursor-pointer transition duration-300 hover:border-primary-green hover:shadow-2xl hover:shadow-primary-green/10">
              <div className="flex gap-4 items-center">
                <Image src="/icons/workflow-builder.svg" alt="" width={80} height={80} />
                <h2 className="text-[17px]">Workflow builder</h2>
              </div>
              <button className="p-2 hover:bg-[#f2f2f2] rounded-lg transition">
                <ArrowRight className="text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
