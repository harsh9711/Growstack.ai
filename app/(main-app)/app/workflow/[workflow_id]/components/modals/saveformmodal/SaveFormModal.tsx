import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { onChangeWorkFlowData } from "@/lib/features/workflow/workflow.slice";

interface SaveFormModalProps {
  openSaveFormModal: boolean;
  onCloseSaveFormModal: () => void;
  onHandleSave: () => void;
}

const SaveFormModal: React.FC<SaveFormModalProps> = ({
  openSaveFormModal,
  onCloseSaveFormModal,
  onHandleSave,
}) => {
  const dispatch = useAppDispatch()
  const { workFlowData } = useAppSelector(state => state.workflows);

  return (
    <div>
      <Dialog
        open={openSaveFormModal}
        onClose={() => { }}
        className="relative z-10 bg-white overflow-hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-[20px] min-w-[30%] max-w-[30%] bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="modal-heading pt-3 pb-3 pl-4 pr-4 border-b-[1px] border-[#E6E6E6] flex items-center justify-between">
                <div className="modal-title">
                  <h3 className="text-[#14171B] text-[16px] font-semibold">
                    Workflow Details
                  </h3>
                </div>

                <div className="close-btn-box">
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => onCloseSaveFormModal()}
                  >
                    <img
                      src="/assets/node_icon/close-icon.svg"
                      alt="close icon"
                    />
                  </button>
                </div>
              </div>

              <div className="modal-form pt-3 pb-3 pl-4 pr-4">
                <form className="form">
                  <div className="input-box mb-3">
                    <div className="label-box mb-1">
                      <label className="font-medium text-[#14171B] text-[14px]">
                        Title
                      </label>
                    </div>

                    <div className="input-group">
                      <input
                        type="text"
                        placeholder="Enter Title"
                        value={workFlowData?.name || ""}
                        className="nopan nodrag form-control shadow-none w-full p-3 rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-sm font-medium focus:outline-none"
                        onChange={e => {
                          dispatch(
                            onChangeWorkFlowData({
                              key: "name",
                              value: e.target.value,
                            })
                          );
                        }}
                      />
                    </div>
                  </div>

                  <div className="input-box mb-3">
                    <div className="label-box mb-1">
                      <label className="font-medium text-[#14171B] text-[14px]">
                        Description
                      </label>
                    </div>

                    <div className="input-group">
                      <textarea
                        value={workFlowData?.description || ""}
                        placeholder="Enter Description"
                        className="nopan nodrag form-control shadow-none w-full p-3 rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-sm font-medium focus:outline-none"
                        rows={5}
                        onChange={e => {
                          dispatch(
                            onChangeWorkFlowData({
                              key: "description",
                              value: e.target.value,
                            })
                          );
                        }}
                      />
                    </div>
                  </div>

                  <div className="bg-white flex items-center justify-end gap-3">
                    <button
                      type="button"
                      data-autofocus
                      onClick={() => onCloseSaveFormModal()}
                      className="inline-flex items-center w-[150px] h-[45px] justify-center rounded-[10px] bg-white text-sm font-medium text-[#F6828F] border-[1px]
                border-[#F6828F]"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center w-[150px] h-[45px] justify-center rounded-[10px] bg-[#2DA771] text-sm font-medium text-white"
                      onClick={onHandleSave}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default SaveFormModal;
