import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"; // Adjust the import path based on your project structure
import { User2, Users2 } from "lucide-react";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const ImportContactsDialog = ({ trigger }: { trigger: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[800px] p-0 pb-8">
        <DialogHeader className="px-8 pt-6">
          <DialogTitle>Import contacts</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-5 text-sm mb-3 px-8">
          <p className="leading-relaxed">
            Please upload a CSV-format list of the people you would like to get reviews from. You can use this template CSV to ensure the file structure is
            correct.
          </p>
          <div className="space-y-2">
            <label className="font-medium">Link to client</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select client" defaultValue={"Select client"} />
              </SelectTrigger>
              <SelectContent>
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
          <div className="flex gap-3">
            <span className="font-semibold text-[16px]">Choose CSV file:</span>
            <input type="file" />
          </div>
          <div className="flex gap-2">
            <Checkbox /> Yes, I have permissions to contact these people for marketing purposes in accordance with the terms & conditions.
          </div>
          <div className="flex gap-2">
            <Checkbox /> Yes, I have read and agree with the Privacy Policy and Best Practices
          </div>
          <button className="text-white bg-primary-green rounded-2xl py-2.5 sheen px-5 max-w-fit">Upload</button>

          <h1 className="text-lg font-semibold">Description of CSV fields</h1>
        </div>
        <table>
          <thead>
            <tr className="bg-[#0347370D]">
              <th className="text-left py-4 px-8">First name</th>
              <th className="text-left py-4 px-8">Last name</th>
              <th className="text-left py-4 px-8">Phone number</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#EBEBEB]">
              <td className="py-4 px-8">Contact first name</td>
              <td className="py-4 px-8">Contact last name</td>
              <td className="py-4 px-8">Contact phone number</td>
            </tr>
          </tbody>
        </table>
      </DialogContent>
    </Dialog>
  );
};

export default ImportContactsDialog;
