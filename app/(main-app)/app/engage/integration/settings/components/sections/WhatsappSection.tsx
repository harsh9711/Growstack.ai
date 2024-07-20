"use client";

import Motion from "@/components/Motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy } from "lucide-react";
import Link from "next/link";

export default function WhatsappSection() {
  return (
    <Motion transition={{ duration: 0.2 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <div className="border border-[#EDEFF0] bg-white rounded-3xl p-6 mt-8">
        <div className="bg-[#C6F0D2] text-[#277A3E] p-4 rounded-lg">Success! You Are Now Connected To Whatsapp Cloud API</div>
        <div className="flex items-start gap-6 mt-4">
          <div className="w-full space-y-4">
            <div className="!bg-white border border-[#EDEFF0] py-5 px-6 rounded-3xl w-full">
              <h1 className="text-xl font-semibold">Webhook config</h1>
              <div className="space-y-3 mt-8">
                <div className="flex items-center">
                  <label className="font-medium">Webhook callback URL </label>
                </div>
                <div className="flex justify-between items-center h-[50px] w-full rounded-xl bg-[#F5F5F5] px-4 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                  *********************
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="cursor-pointer" onClick={() => navigator.clipboard.writeText("You just copied something.")}>
                          <Copy size={18} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="space-y-3 mt-8">
                <div className="flex items-center">
                  <label className="font-medium">Verify token</label>
                </div>
                <div className="flex justify-between items-center h-[50px] w-full rounded-xl bg-[#F5F5F5] px-4 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                  *********************
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="cursor-pointer" onClick={() => navigator.clipboard.writeText("You just copied something.")}>
                          <Copy size={18} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
            <div className="!bg-white border border-[#EDEFF0] py-5 px-6 rounded-3xl w-full">
              <h1 className="text-xl font-semibold">Whatsapp access token</h1>
              <div className="space-y-3 mt-8">
                <div className="flex items-center">
                  <label className="font-medium">Access token</label>
                </div>
                <div className="flex justify-between items-center h-[50px] w-full rounded-xl bg-[#F5F5F5] px-4 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                  *********************
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="cursor-pointer" onClick={() => navigator.clipboard.writeText("You just copied something.")}>
                          <Copy size={18} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
            <div className="!bg-white border border-[#EDEFF0] py-5 px-6 rounded-3xl w-full">
              <h1 className="text-xl font-semibold">Account ID and phone number ID</h1>
              <div className="space-y-3 mt-8">
                <div className="flex items-center">
                  <label className="font-medium">Phone number ID</label>
                </div>
                <div className="flex justify-between items-center h-[50px] w-full rounded-xl bg-[#F5F5F5] px-4 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                  *********************
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="cursor-pointer" onClick={() => navigator.clipboard.writeText("You just copied something.")}>
                          <Copy size={18} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="space-y-3 mt-8">
                <div className="flex items-center">
                  <label className="font-medium">Business Account ID</label>
                </div>
                <div className="flex justify-between items-center h-[50px] w-full rounded-xl bg-[#F5F5F5] px-4 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                  *********************
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="cursor-pointer" onClick={() => navigator.clipboard.writeText("You just copied something.")}>
                          <Copy size={18} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 w-full">
              <button className="py-3.5 h-14 w-full max-w-[180px] px-6 bg-primary-green sheen rounded-xl text-white flex items-center justify-center gap-3 whitespace-nowrap">
                Save
              </button>
            </div>
          </div>
          <div className="w-full space-y-4">
            <div className="!bg-white border border-[#EDEFF0] p-6 rounded-3xl w-full">
              <h1 className="text-xl font-semibold">Get started with whatsapp cloud API</h1>
              <div className="mt-5">
                <ul className="list-decimal translate-x-6 pr-6 space-y-3">
                  <li className="leading-relaxed">
                    Sign up for a developer account and create a new Facebook app by following the instructions provided on the Facebook Developer website:{" "}
                    <Link href="https://developers.facebook.com" target="_blank" rel="noopener noreferrer" className="underline font-medium">
                      Facebook Developer
                    </Link>
                  </li>
                  <li className="leading-relaxed">
                    Once your Facebook app is created, navigate to the app dashboard and find the WhatsApp product section. Click on Setup.
                  </li>
                  <li className="leading-relaxed">
                    In the WhatsApp Configuration, enter the required information including your Webhook Callback URL and Verify Token.
                  </li>
                  <li className="leading-relaxed">Go to Webhook fields and select Messages under Manage to enable message handling.</li>
                </ul>
              </div>
            </div>
            <div className="!bg-white border border-[#EDEFF0] p-6 rounded-3xl w-full">
              <h1 className="text-xl font-semibold">Get your permanent access token</h1>
              <div className="mt-5">
                <ul className="list-decimal translate-x-6 pr-6 space-y-3">
                  <li className="leading-relaxed">
                    Follow The Detailed Process Outlined In The Facebook Docs To Create A Permanent Access Token{" "}
                    <Link
                      href="https://developers.facebook.com/docs/whatsapp/business-management-api/get-started#1--acquire-an-access-token-using-a-system-user-or-facebook-login"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-medium">
                      Facebook Docs
                    </Link>
                    .
                  </li>
                  <li className="leading-relaxed">Once You Have Obtained The Permanent access token Enter It Here </li>
                </ul>
              </div>
            </div>
            <div className="!bg-white border border-[#EDEFF0] p-6 rounded-3xl w-full">
              <h1 className="text-xl font-semibold">Get Your Account ID And Phone Number ID</h1>
              <div className="mt-5">
                <ul className="list-decimal translate-x-6 pr-6 space-y-3">
                  <li className="leading-relaxed">
                    Navigate to the Facebook app, then go to Whatsapp -&gt; API setup. Here, youwill find your Phone Number ID and your WhatsApp Business
                    Account ID.
                  </li>
                  <li className="leading-relaxed">Copy them and enter them here. </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Motion>
  );
}
