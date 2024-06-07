import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"; // Adjust the import path based on your project structure
import { User2, Users2 } from "lucide-react";
import Image from "next/image";
import ImportContactsDialog from "./ImportContactsDialog";

const EmailCompaignDialog = ({ trigger }: { trigger: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Email and SMS campaigns</DialogTitle>
        </DialogHeader>
        <div className="flex gap-4 text-sm my-3">
          <div className="w-full bg-[#F2F2F2] px-5 py-7 rounded-3xl space-y-3">
            <h2 className="text-xl font-semibold text-center">Email campaign</h2>
            <p className="text-center leading-relaxed">Sent an email campaign to multiple contacts using a CSV or to a single email address.</p>
            <Image src="/assets/email.png" alt="" width={80} height={80} className="mx-auto" />
            <div className="flex gap-3">
              <ImportContactsDialog
                trigger={
                  <button className="w-full px-3 bg-primary-green text-white sheen transition duration-500 py-3 rounded-xl font-semibold flex justify-center items-center gap-2 whitespace-nowrap">
                    <Users2 size={20} className="w-full max-w-fit min-w-fit" />
                    Multiple
                  </button>
                }
              />
              <ImportContactsDialog
                trigger={
                  <button className="w-full px-3 bg-primary-green text-white sheen transition duration-500 py-3 rounded-xl font-semibold flex justify-center items-center gap-2 whitespace-nowrap">
                    <User2 size={20} className="w-full max-w-fit min-w-fit" />
                    Single
                  </button>
                }
              />
            </div>
          </div>
          <div className="w-full bg-[#F2F2F2] px-5 py-7 rounded-3xl space-y-3">
            <h2 className="text-xl font-semibold text-center">SMS campaign</h2>
            <p className="text-center leading-relaxed">Sent an SMS campaign to multiple contacts using a CSV or to a single mobile number.</p>
            <Image src="/assets/sms.png" alt="" width={80} height={80} className="mx-auto" />
            <div className="flex gap-3">
              <ImportContactsDialog
                trigger={
                  <button className="w-full px-3 bg-primary-green text-white sheen transition duration-500 py-3 rounded-xl font-semibold flex justify-center items-center gap-2 whitespace-nowrap">
                    <Users2 size={20} className="w-full max-w-fit min-w-fit" />
                    Multiple
                  </button>
                }
              />
              <ImportContactsDialog
                trigger={
                  <button className="w-full px-3 bg-primary-green text-white sheen transition duration-500 py-3 rounded-xl font-semibold flex justify-center items-center gap-2 whitespace-nowrap">
                    <User2 size={20} className="w-full max-w-fit min-w-fit" />
                    Single
                  </button>
                }
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmailCompaignDialog;
