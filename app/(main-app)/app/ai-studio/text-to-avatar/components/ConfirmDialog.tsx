// components/ConfirmDialog.tsx
import { Dialog } from "@headlessui/react";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import Spinner from "./ui/spinner";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  isLoading: boolean;
}

const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  isLoading,
}: ConfirmDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      as="div"
      className="fixed inset-0 flex items-center justify-center z-50"
    >
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
      <div className="relative bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <Dialog.Title className="text-lg font-semibold">
          Confirm Action
        </Dialog.Title>
        <Dialog.Description className="mt-2 text-gray-700">
          {message}
        </Dialog.Description>
        <div className="mt-4 flex justify-end gap-2">
          <Button
            onClick={onConfirm}
            className={`bg-red-500 text-white ${isLoading ? "cursor-not-allowed" : "hover:bg-red-600"}`}
            disabled={isLoading}
          >
            {isLoading ? <Spinner size="small" /> : "Delete"}
          </Button>
          <Button onClick={onClose} className="bg-gray-300 hover:bg-gray-400">
            Cancel
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;
