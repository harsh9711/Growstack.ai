// CreateTemplateDialog.js
import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"; // Adjust the import path based on your project structure
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CreateTemplateDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <button className="bg-transparent border border-primary-green hover:bg-primary-green hover:text-white sheen transition duration-500 text-primary-green px-5 py-3 rounded-xl font-semibold flex items-center gap-2 whitespace-nowrap">
          <Plus /> Create a template
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[896px]">
        <DialogHeader>
          <DialogTitle>Create reply template</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {/* Your create template form/content here */}
          <span className="space-x-4">
            <span>Tags:</span>
            <span className="text-primary-green font-medium">Add first name</span>
            <span className="text-primary-green font-medium">Add business name</span>
          </span>
          <div className="mt-4">
            <textarea
              className="h-[128px] w-full bg-[#F2F2F2] border border-[#E1E1E1] rounded-xl block resize-none p-4 text-[15px]"
              placeholder="Thank you {{FirstName}}, for your support and for being a valued customer. We can’t wait to welcome you back soon!"></textarea>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="space-y-2">
              <label className="font-medium">Name template</label>
              <Input type="text" placeholder="Name template" />
            </div>
            <div className="space-y-2">
              <label className="font-medium">Link to client</label>
              <Input type="url" placeholder="Link here" />
            </div>
            <div className="space-y-2">
              <label className="font-medium">All ratings</label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All ratings" defaultValue={"All ratings"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All ratings">All ratings</SelectItem>
                  <SelectItem value="5 stars">5 stars</SelectItem>
                  <SelectItem value="4 stars or above">4 stars or above</SelectItem>
                  <SelectItem value="3 stars or above">3 stars or above</SelectItem>
                  <SelectItem value="2 stars or above">2 stars or above</SelectItem>
                  <SelectItem value="1 stars or above">1 stars or above</SelectItem>
                  <SelectItem value="Recommended">Recommended</SelectItem>
                  <SelectItem value="Not recommended">Not recommended</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
