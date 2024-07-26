import { X } from "lucide-react";
import { ModalContent } from "./modalEnums";
import { TriangleAlertIcon } from "@/components/svgs/icons";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Editor from "../../../ai-apps/[appId]/components/Editor";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import "@/styles/editor.css";

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
  const [proceed, setProceed] = useState<boolean>(false);

  const handleEditorChange = () => {};
  return (
    <>
      <div
        className={`${
          proceed ? "fixed w-1/2" : "relative"
        } bg-white z-40 px-4 py-3 border-b border-gray-300`}
      >
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
      <div className={`${proceed ? "relative top-[60px]" : ""} px-4`}>
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
                onClick={() => setProceed(true)}
                className="text-[16px] bg-white text-[#034737] border border-[#034737] px-[20px] py-[6px] rounded-md"
              >
                Okay, proceed
              </button>
            </div>
          </>
        ) : (
          <div className="mt-[10px] pb-3">
            <div className="mt-[20px]">
              <div className="text-[14px]">Email templates</div>
              <Dropdown label="Select" items={["Template 1", "Template 2", "Template 3"]} />
            </div>
            <div className="flex mt-[25px] gap-3">
              <div className="flex-1">
                <div className="text-[14px]">From name</div>
                <input
                  type="text"
                  placeholder="From name"
                  className="w-full p-3 rounded-md bg-[#F2F2F2] mt-2 h-[44px]"
                  name="from_name"
                  required={true}
                />
              </div>
              <div className="flex-1">
                <div className="text-[14px]">From email</div>
                <input
                  type="text"
                  placeholder="From email"
                  className="w-full p-3 rounded-md bg-[#F2F2F2] mt-2 h-[44px]"
                  name="from_email"
                  required={true}
                />
              </div>
            </div>
            <div className="flex-1 mt-[25px]">
              <div className="text-[14px]">Email subject</div>
              <input
                type="text"
                placeholder="Enter email subject"
                className="w-full p-3 rounded-md bg-[#F2F2F2] mt-2 h-[44px]"
                name="first_name"
                required={true}
              />
            </div>
            {/* <div className="w-full p-8 bg-white rounded-2xl border border-[#EDEFF0] flex flex-col"> */}
            <div className="flex-1 mt-[25px] ql-editor-fr px-0 py-0">
              <div className="text-[14px]">Message</div>
              <Editor content={""} onChange={handleEditorChange} />
            </div>
            {/* </div> */}
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
                Send Email
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SendEmail;

const Dropdown = ({ label, items, value, onChange, required = true }: any) => (
  <div className="space-y-3">
    <Select value={value} onValueChange={onChange} required={required}>
      <SelectTrigger className="w-full border-none">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item: any, index: number) => (
          <SelectItem value={item} key={index}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);
