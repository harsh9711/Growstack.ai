import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Plus } from "lucide-react";
import Image from "next/image";
import AddPaymentDialog from "./AddPaymentDialog";

export default function AddCreditDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full max-w-fit h-12 px-4 py-3 rounded-xl flex gap-3 bg-primary-green text-white sheen transition-all duration-300">
          <Plus size={20} />
          Add to credit balance
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[584px]">
        <DialogHeader>
          <DialogTitle>Add to credit balance</DialogTitle>
        </DialogHeader>
        <div>
          <div className="space-y-2 mt-3">
            <label className="font-semibold">Amount to add</label>
            <div className="border border-primary-green rounded-xl p-2 flex items-center gap-2">
              <DollarSign className="text-primary-green" />
              <input className="h-10 w-full" />
            </div>
            <p className="text-primary-black text-opacity-50">
              Enter an amount between <span>$</span>5 and <span>$</span>250
            </p>
          </div>
          <div className="mt-7 space-y-2">
            <label className="font-semibold">Payment method</label>
            <Select>
              <SelectTrigger className="w-full h-20 px-4">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent defaultValue={paymentsCards[0].cardnumber}>
                <SelectGroup>
                  {paymentsCards.map((card, index) => (
                    <SelectItem key={index} value={card.cardnumber}>
                      <div className="flex items-center gap-4">
                        <Image src={card.icon} alt="" width={200} height={200} className="w-full h-14 object-cover" />
                        <div className="space-y-1">
                          <h1 className="text-lg">{maskCardNumber(card.cardnumber)}</h1>
                          <p className="text-primary-black text-opacity-50 text-left">{card.expires}</p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <AddPaymentDialog />
        </div>
      </DialogContent>
    </Dialog>
  );
}
const maskCardNumber = (cardNumber: string): string => {
  const visibleDigits = 4;
  const maskedPart = "*".repeat(cardNumber.length - visibleDigits);
  const visiblePart = cardNumber.slice(-visibleDigits);
  return maskedPart + visiblePart;
};

const paymentsCards = [
  {
    icon: "/assets/master-card.svg",
    cardnumber: "424242424242424242",
    expires: "Expires 11/2026",
  },
];
