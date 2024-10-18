"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Spinner from "@/public/svgs/spinner";
import { useRouter } from "next/navigation";

interface DeleteModalProps {
  show: boolean;
  onHide: (value: boolean) => void;
  handleDeleteHistory: () => void;
  pending: boolean;
}

function DeleteHistoryModal({ show, onHide, handleDeleteHistory, pending }: DeleteModalProps) {
  const router = useRouter();
  return (
    <Dialog open={show} onOpenChange={onHide}>
      <DialogContent className="max-w-xl pt-0">
        <DialogHeader className="py-4 border-b">
          <DialogTitle>Delete History</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <p className="text-gray-500">Are you sure you want to delete workflow History</p>

          <div className="flex justify-end gap-3 w-full">
            <button
              className="h-12 w-full max-w-[100px] px-6 bg-white border text-primary-green border-primary-green rounded-xl mt-6"
              onClick={() => onHide(false)}>
              Cancel
            </button>
            <button
              className="h-12 w-full max-w-[140px] px-6 bg-primary-green sheen rounded-xl text-white mt-6 flex items-center justify-center gap-3 whitespace-nowrap"
              onClick={handleDeleteHistory}>
              {pending && <Spinner />}
              Confirm
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteHistoryModal;
