import { MasterCardIcon } from "@/components/svgs";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import CreditCardInput from "./CreditCardInput";

export default function AddPaymentDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-end mt-4">
          <button className="font-medium flex items-center gap-3 px-3 py-4  bg-primary-green text-white sheen transition-all duration-300 rounded-lg">
            {/* <Plus /> */}
        Pay
          </button>
        </div>
      </DialogTrigger>
      {/* <DialogContent className="max-w-[584px]">
        <DialogHeader className="space-y-3">
          <DialogTitle>Add payment method</DialogTitle>
          <DialogDescription>Add your credit card details below. This card will be saved to youraccount and can be removed at any time.</DialogDescription>
        </DialogHeader>
        <div>
          <div className="mt-7 space-y-2">
            <label className="font-medium">Card information</label>
            <CreditCardInput />
          </div>
          <div className="mt-7 space-y-2">
            <label className="font-medium">Name on card</label>
            <Input placeholder="Type Name on card" />
          </div>
          <div className="mt-7 space-y-4">
            <label className="font-medium">Billing address</label>
            <Input placeholder="Country" />
            <Input placeholder="Address line 1" />
            <Input placeholder="Address line 2" />
            <div className="flex gap-4">
              <Input placeholder="City" />
              <Input placeholder="Postal code" />
            </div>
            <Input placeholder="State, country,  province, or region" />
          </div>
          <div className="flex items-center gap-2 text-[15px] mt-6">
            <Checkbox className="bg-[#f2f2f2] border-none h-6 w-6" />
            Set as default payment method
          </div>

          <div className="flex gap-3 mt-4">
            <DialogClose className="w-full">
              <button className="w-full py-3.5 px-4 bg-white border border-[#CF0000] text-[#CF0000] hover:bg-[#cf000009] rounded-xl mt-6">Cancel</button>
            </DialogClose>
            <button className="w-full py-3.5 px-4 bg-primary-green sheen rounded-xl text-white mt-6">Add payment method</button>
          </div>
        </div>
      </DialogContent> */}
    </Dialog>
  );
}
