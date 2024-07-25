import { X } from "lucide-react";
import { ModalContent } from "./modalEnums";
import { TriangleAlertIcon } from "@/components/svgs/icons";

interface SendEmailProps {
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleModal: (value: ModalContent | null) => void;
  selectedIds: string[];
}

const SendEmail = ({
  setToggleModal,
  handleModal,
  selectedIds,
}: SendEmailProps) => {
  return (
    <>
      <div className="relative bg-white z-40 px-4 py-3 border-b border-gray-300">
        <button
          onClick={() => {
            setToggleModal(false);
            handleModal(null);
          }}
          className="absolute top-1 right-1 rounded-lg transition-opacity p-2 hover:bg-[#ff00001f] hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-5 w-5 text-[#ff00009d]" />
        </button>
        <div className="font-semibold text-[22px] text-header">Send email</div>
      </div>
      <div className="px-4">
        <div className="text-[24px] font-semibold text-header mt-[40px] mb-[25px]">
          Send email to following contacts
        </div>
        <div className="flex gap-2 items-center">
          <div className="rounded-[100%] text-white bg-[#033747] w-[45px] h-[45px] flex items-center justify-center">
            B
          </div>
          <div className="rounded-[100%] text-white bg-[#B970FF] w-[45px] h-[45px] flex items-center justify-center">
            R
          </div>
          <div className="rounded-[100%] text-white bg-[#0474C4] w-[45px] h-[45px] flex items-center justify-center">
            B
          </div>
        </div>
        <div className="flex gap-2 mt-[24px]">
          <TriangleAlertIcon />{" "}
          <span className="text-[14px] text-[#034737]">
            Please note the actions will be performed over a period of time, you
            can track the progress on the bulk action page.
          </span>
        </div>
        <div className="flex justify-end mt-8 mb-3">
          <button
            type="button"
            className="text-[16px] bg-white text-[#034737] border border-[#034737] px-[20px] py-[6px] rounded-md"
          >
            Okay, proceed
          </button>
        </div>
      </div>
    </>
  );
};

export default SendEmail;
