import React from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { onChangeWorkFlowData } from "@/lib/features/workflow/workflow.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

interface PublishConfirmationModalProps {
  openPublishConfirmationModal: boolean;
  onClosePublishConfirmationModal: () => void;
  onPublishNode: () => void;
}

const PublishConfirmationModal: React.FC<PublishConfirmationModalProps> = ({
  openPublishConfirmationModal,
  onClosePublishConfirmationModal,
  onPublishNode,
}) => {
  const dispatch = useAppDispatch();
  const { workFlowData, isLoading } = useAppSelector(state => state.workflows);

  return (
    <div>
      <Dialog
        open={openPublishConfirmationModal}
        onClose={() => { }}
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

                <div className="text-center">
                  <div className="publish_icon_image">
                    <img
                      src="/assets/node_icon/publish_icon.svg"
                      alt="publish icon"
                      className="mx-auto w-[50px]"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <DialogTitle
                      as="h3"
                      className="text-[20px] font-semibold text-[#14171B]"
                    >
                      Are you sure you want to publish?
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-[14px] text-[#14171B] font-normal">
                        You can still edit the workflow after publishing, but
                        make sure everything is ready before proceeding.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white px-4 py-3 flex items-center justify-center gap-3">
                <button
                  type="button"
                  data-autofocus
                  onClick={() => onClosePublishConfirmationModal()}
                  className="inline-flex items-center w-[180px] h-[45px] justify-center rounded-[10px] bg-white text-sm font-medium text-[#F6828F] border-[1px]
                border-[#F6828F]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="inline-flex items-center w-[180px] h-[45px] justify-center rounded-[10px] bg-[#2DA771] text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={onPublishNode}
                  disabled={isLoading || !workFlowData?.name}
                >
                  Publish
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PublishConfirmationModal;
