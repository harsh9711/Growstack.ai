import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";

interface NewChatAlertProps {
  handleNewChat: () => void;
}

const NewChatAlert = ({ handleNewChat }: NewChatAlertProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button type="button" className="bg-primary-green p-3 rounded-[16px] text-white">
          <Plus size={32} />w
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl pt-0">
        <DialogHeader className="border-b border-gray-200 py-4">
          <DialogTitle>New chat</DialogTitle>
        </DialogHeader>
        <div className="">
          <div className="flex">
            <div>Do you want to continue to a new chat?</div>
          </div>
          <div className="flex justify-end mt-8 space-x-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[14px] h-12 border border-red-500 bg-white text-red-500 px-5 rounded-xl">
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                handleNewChat();
                setIsOpen(false);
              }}
              className="text-[14px] h-12 bg-primary-green text-white px-5 rounded-xl">
              Continue
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewChatAlert;
