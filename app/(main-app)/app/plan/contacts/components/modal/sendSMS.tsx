import { X } from "lucide-react";
import { ModalContent } from "./modalEnums";
import {
  LinkIcon,
  SmileIcon,
  TriangleAlertIcon,
} from "@/components/svgs/icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Spinner from "@/components/Spinner";
import { useState } from "react";

interface SendSMSProps {
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleModal: (value: ModalContent | null) => void;
  selectedIds: string[];
}

const SendSMS = ({
  setToggleModal,
  handleModal,
  selectedIds,
}: SendSMSProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [proceed, setProceed] = useState<boolean>(false);

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
        <div className="font-semibold text-[22px] text-header">Send SMS</div>
      </div>
      <div className="px-4">
        <div className="text-[24px] font-semibold text-header mt-[40px] mb-[25px]">
          Send SMS to following contacts
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
        {!proceed ? (
          <>
            <div className="flex gap-2 mt-[24px]">
              <TriangleAlertIcon />{" "}
              <span className="text-[14px] text-[#034737]">
                Please note the actions will be performed over a period of time,
                you can track the progress on the bulk action page.
              </span>
            </div>
            <div className="flex justify-end mt-8 mb-3">
              <button
                type="button"
                className="text-[16px] bg-white text-[#034737] border border-[#034737] px-[20px] py-[6px] rounded-md"
                onClick={() => setProceed(true)}
              >
                Okay, proceed
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-[14px] text-header mt-[15px] mb-[6px]">SMS</div>
            <textarea
              placeholder="Enter your SMS"
              className="bg-[#F2F2F2] p-3 h-[120px] block resize-none w-full rounded-t-xl"
            ></textarea>
            <div className="flex bg-[#F2F2F2] p-3 rounded-b-xl">
              <SmileIcon />{" "}
              <span className="ml-2">
                <LinkIcon />
              </span>
            </div>
            <div className="my-[15px]">
              <RadioGroup
                defaultValue="Add all at once"
                className="w-full flex items-center"
              >
                <div className="flex space-x-2 w-full">
                  <RadioGroupItem value="Add all at once" id="r1" />
                  <label htmlFor="r1">Add all at once</label>
                </div>
                <div className="flex space-x-2 w-full">
                  <RadioGroupItem value="Add all at scheduled time" id="r2" />
                  <label htmlFor="r2">Add all at scheduled time</label>
                </div>
                <div className="flex space-x-2 w-full">
                  <RadioGroupItem value="Add in drip mode" id="r3" />
                  <label htmlFor="r3">Add in drip mode</label>
                </div>
              </RadioGroup>
            </div>
            <div className="text-[14px] text-header mb-[6px]">Action</div>
            <input
              type="text"
              placeholder="Enter a description for the action..."
              className="w-full p-3 rounded-md bg-[#F2F2F2] mt-2 h-[44px]"
              name="action"
            />
            <div className="flex justify-end mt-6 mb-3">
              <button
                type="button"
                className="text-[16px] bg-white text-[#034737] border border-[#034737] px-[20px] py-[6px] rounded-md"
              >
                Send SMS
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SendSMS;
