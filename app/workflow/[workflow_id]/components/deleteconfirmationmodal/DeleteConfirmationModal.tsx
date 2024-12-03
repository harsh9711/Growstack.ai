import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

interface DeleteConfirmationModalProps {
  openDeleteConfirmationModal: boolean;
  onCloseDeleteConfirmationModal: () => void;
  onDeleteNode: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  openDeleteConfirmationModal,
  onCloseDeleteConfirmationModal,
  onDeleteNode,
}) => {
  return (
    <div>
      <Dialog
        open={openDeleteConfirmationModal}
        onClose={() => onCloseDeleteConfirmationModal()}
        className="relative z-10 bg-white"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-[20px] bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="text-center">
                  <div className="delete_icon_image">
                    <img
                      src="/assets/node_icon/delete_icon.svg"
                      alt="delete icon"
                      className="mx-auto w-[50px]"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <DialogTitle
                      as="h3"
                      className="text-[20px] font-semibold text-[#14171B]"
                    >
                      Are you sure you want to <br /> delete this node?
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-[14px] text-[#14171B] font-normal">
                        Deleting this node will permanently remove it from your
                        system
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white px-4 py-3 flex items-center justify-center gap-3">
                <button
                  type="button"
                  data-autofocus
                  onClick={() => onCloseDeleteConfirmationModal()}
                  className="inline-flex items-center w-[180px] h-[45px] justify-center rounded-[10px] bg-white text-sm font-medium text-[#878787] border-[1px]
                border-[#878787]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="inline-flex items-center w-[180px] h-[45px] justify-center rounded-[10px] bg-[#FF2147] text-sm font-medium text-white"
                  onClick={() => onDeleteNode()}
                >
                  Delete
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DeleteConfirmationModal;
