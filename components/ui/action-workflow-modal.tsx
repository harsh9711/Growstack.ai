import { Copy, Trash2 } from "lucide-react";

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  src?: React.ReactNode | string;
  type: string;
}

export default function ActionWorkflowModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type,
}: CommonModalProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
      data-aos="fade-in"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="bg-white p-6 rounded-lg w-[850px] max-w-lg flex flex-col items-center"
        data-aos="zoom-in"
      >
        {type === "delete" && (
          <div className="flex items-center justify-center p-4 rounded-full bg-red-500">
            <Trash2 size={48} color="#fff" className="text-white" />
          </div>
        )}
        {type === "duplicate" && (
          <div className="flex items-center justify-center p-4 rounded-full bg-green-500">
            <Copy size={48} color="#fff" className="text-white" />
          </div>
        )}

        <h2 className=" font-semibold w-[350px] text-center text-[28px] mt-5">
          {title}
        </h2>
        <p className="mt-2 text-center text-[16px]">{message}</p>
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-400 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`${type === "delete" ? "bg-red-500" : "bg-primary-green"} px-4 py-2 rounded-md text-white hover:bg-opacity-90 transition-colors`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
