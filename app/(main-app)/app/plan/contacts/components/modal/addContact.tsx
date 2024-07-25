import { X, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CallIcon,
  EmailIcon2,
  FbMessageIcon,
  PhoneIcon,
} from "@/components/svgs/icons";
import { MessageIcon } from "@/components/svgs";

interface AddContactProps {
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddContact = ({ setToggleModal }: AddContactProps) => {
  return (
    <div className="relative top">
      <div className="fixed w-1/2 bg-white z-40 px-4 py-3 border-b border-gray-300">
        <button
          onClick={() => setToggleModal(false)}
          className="absolute top-1 right-1 rounded-lg transition-opacity p-2 hover:bg-[#ff00001f] hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-5 w-5 text-[#ff00009d]" />
        </button>
        <div className="font-semibold text-[22px] text-header">Contact</div>
      </div>
      <div className="relative top-[60px] px-4 py-3">
        <div className="flex">
          <div className="flex justify-center items-center w-[120px] h-[120px] border border-[#F2F2F2] bg-[#F2F2F2] mr-6 rounded-md">
            <PhoneIcon />
          </div>
          <div>
            <div className="font-semibold text-[18px] text-header mb-2">
              Personal Logo
            </div>
            <div className="text-[14px] text-[#3D3D3D] text-opacity-50">
              The proposed size is 512*512px
              <br />
              no bigger than 2.5mb
            </div>
            <div className="mt-6">
              <button className="text-[14px] bg-primary-green text-white px-[20px] py-[6px] rounded-md mr-[10px]">
                Change
              </button>
              <button className="text-[14px] bg-white text-red-500 border border-red-500 px-[20px] py-[6px] rounded-md">
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div className="flex mt-[25px] gap-3">
          <div className="flex-1">
            <div className="text-[14px]">First name</div>
            <input
              type="text"
              placeholder="Add first name"
              className="w-full p-3 rounded-md bg-[#F2F2F2] mt-2 h-[44px]"
            />
          </div>
          <div className="flex-1">
            <div className="text-[14px]">Last name</div>
            <input
              type="text"
              placeholder="Add last name"
              className="w-full p-3 rounded-md bg-[#F2F2F2] mt-2 h-[44px]"
            />
          </div>
        </div>
        <div className="mt-[20px]">
          <div className="text-[14px]">Email</div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Add first email"
              className="w-full p-3 rounded-md bg-[#F2F2F2] mt-2 h-[44px]"
            />
            <div className="flex justify-end ">
              <button className="text-primary-green underline text-xs">
                Remove
              </button>
            </div>
          </div>
          <div className="flex justify-end mt-[12px]">
            <button className="flex items-center justify-center text-primary-green underline text-xs">
              <Plus />
              Add another email
            </button>
          </div>
        </div>
        <div className="mt-[20px]">
          <div className="text-[14px]">Phone</div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="+91"
              className="w-full p-3 rounded-md bg-[#F2F2F2] mt-2 h-[44px]"
            />
            <div className="flex justify-end ">
              <button className="text-primary-green underline text-xs">
                Remove
              </button>
            </div>
          </div>
          <div className="flex justify-end mt-[12px]">
            <button className="flex items-center justify-center text-primary-green underline text-xs">
              <Plus />
              Add another phone number
            </button>
          </div>
        </div>
        <div className="mt-[20px]">
          <div className="text-[14px]">Contact type</div>
          <Dropdown
            label="Choose one"
            infoIcon
            items={["Lead 1", "Lead 2", "Lead 3"]}
            value={""}
            onChange={() => {}}
          />
        </div>
        <div className="my-[20px]">
          <div className="text-[14px]">Time zone</div>
          <Dropdown
            label="Choose one"
            infoIcon
            items={["GMT+1", "CET", "GMT+2"]}
            value={""}
            onChange={() => {}}
          />
        </div>
        <div className="flex justify-between items-center mb-[20px]">
          <div className="text-[14px]">DND all channels</div>
          <Checkbox />
        </div>
        <DividerWithText />
        <div className="flex justify-between items-center my-[20px]">
          <div className="flex items-center justify-center text-[14px]">
            <EmailIcon2 />
            <span className="ml-[10px]">Email</span>
          </div>
          <Checkbox />
        </div>
        <div className="flex justify-between items-center mb-[20px]">
          <div className="flex items-center justify-center text-[14px]">
            <MessageIcon />
            <span className="ml-[10px]">Text messages</span>
          </div>
          <Checkbox />
        </div>
        <div className="flex justify-between items-center mb-[20px]">
          <div className="flex items-center justify-center text-[14px]">
            <CallIcon />
            <span className="ml-[10px]">Calls & Voicemails</span>
          </div>
          <Checkbox />
        </div>
        <div className="flex justify-between items-center mb-[20px]">
          <div className="flex items-center justify-center text-[14px]">
            <FbMessageIcon />
            <span className="ml-[10px]">Facebook messages</span>
          </div>
          <Checkbox />
        </div>
        <div className="flex justify-end mb-[30px]">
          <button className="text-[14px] bg-primary-green text-white px-[20px] py-[6px] rounded-md mr-[10px]">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddContact;

const Dropdown = ({ label, items, hideLabel, value, onChange }: any) => (
  <div className="space-y-3">
    <Select value={value} onValueChange={onChange}>
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

const DividerWithText = () => {
  return (
    <div className="flex items-center text-[#667085] gap-2">
      <div className="h-[2px] w-full bg-[#EFEFF4]" />
      <span className="whitespace-nowrap">Or</span>
      <div className="h-[2px] w-full bg-[#EFEFF4]" />
    </div>
  );
};
