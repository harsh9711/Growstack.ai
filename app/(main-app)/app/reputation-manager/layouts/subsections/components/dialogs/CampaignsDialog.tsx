import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"; // Adjust the import path based on your project structure
import Image from "next/image";

export default function CampaignsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="py-4 px-6 bg-primary-green sheen rounded-xl text-white flex gap-3">Respond</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Respond to review</DialogTitle>
        </DialogHeader>
        <div>
          <div className="border border-[#E1E1E1] p-7 rounded-3xl flex gap-6">
            <div className="w-full max-w-fit flex flex-col justify-between">
              <span className="flex gap-2 font-medium items-center text-lg">
                <Image src="/icons/google.svg" alt="" width={30} height={40} />
                Google
              </span>
              <p className="text-primary-black text-opacity-70 text-sm">Reviewer: Nicola Walsh</p>
            </div>
            <div className="w-full border-l border-[#D8D8D8] flex flex-col justify-between gap-4 pl-6">
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <span className="font-semibold">5 Stars</span>
                </div>
                <span className="font-semibold">13th Mar 2024</span>
              </div>
              <p className="text-[15px] leading-relaxed">Lorem ipsum dolor sit amet consectetur. Nisl laoreet erat a aliquet nisl morbi lectus auctor.</p>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-lg font-semibold">Respond to Nicola Walsh review:</h2>
          </div>
          <div className="mt-8">
            <textarea className="h-[128px] w-full bg-[#F2F2F2] rounded-xl block resize-none p-4 text-[15px]" placeholder="Your reply here"></textarea>
          </div>
          <div className="flex justify-end gap-4">
            <DialogClose asChild>
              <button className="py-3 px-6 bg-white border border-[#CF0000] text-[#CF0000] hover:bg-[#cf0000ab]/1 rounded-xl mt-6">Cancel</button>
            </DialogClose>
            <button className="py-3 px-6 bg-primary-green sheen rounded-xl text-white mt-6">Submit response</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
