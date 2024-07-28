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
import { useState } from "react";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "../../../../../../../styles/phoneInput.css";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import Spinner from "@/components/Spinner";
import toast from "react-hot-toast";
import { ModalContent } from "./modalEnums";

interface AddContactProps {
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleModal: (value: ModalContent | null) => void;
  getContacts: () => void;
}

type PhoneType = {
  country_code: string;
  number: string;
};

interface AddContactDetails {
  logo: string;
  first_name: string;
  last_name: string;
  phones: PhoneType[];
  email: string[];
  contact_type: string;
  time_zone: string;
}

const AddContact = ({
  setToggleModal,
  handleModal,
  getContacts,
}: AddContactProps) => {
  const [contactData, setContactData] = useState<AddContactDetails>({
    logo: "",
    first_name: "",
    last_name: "",
    phones: [{ country_code: "", number: "" }],
    email: [""],
    contact_type: "",
    time_zone: "",
  });
  const [fileUpload, setFileUpload] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePhoneChange = (index: number, value: string, country: any) => {
    const newPhones = [...contactData.phones];
    newPhones[index] = { country_code: country.dialCode, number: value };
    setContactData((prevState) => ({
      ...prevState,
      phones: newPhones,
    }));
  };

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...contactData.email];
    newEmails[index] = value;
    setContactData((prevState) => ({
      ...prevState,
      email: newEmails,
    }));
  };

  const addEmailField = () => {
    setContactData((prevState) => ({
      ...prevState,
      email: [...prevState.email, ""],
    }));
  };

  const addPhoneField = () => {
    setContactData((prevState) => ({
      ...prevState,
      phones: [...prevState.phones, { country_code: "", number: "" }],
    }));
  };

  const removeEmailField = (index: number) => {
    const newEmails = contactData.email.filter((_, i) => i !== index);
    setContactData((prevState) => ({
      ...prevState,
      email: newEmails,
    }));
  };

  const removePhoneField = (index: number) => {
    const newPhones = contactData.phones.filter((_, i) => i !== index);
    setContactData((prevState) => ({
      ...prevState,
      phones: newPhones,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setContactData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("document", file);
      setFileUpload(true);
      try {
        const response = await instance.post(
          `${API_URL}/users/api/v1/file/upload`,
          formData
        );
        setFileUpload(false);
        const fileUrl = response.data.data.fileUrl;
        setContactData((prevState) => ({
          ...prevState,
          logo: fileUrl,
        }));
      } catch (error: any) {
        console.error("Error uploading file:", error);
        toast.error(error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await instance.post(
        `${API_URL}/users/api/v1/contacts/add`,
        contactData
      );
      setLoading(false);
      toast.success(response.data.message);
      setToggleModal(false);
      handleModal(null);
      getContacts();
    } catch (error: any) {
      console.error("Error uploading file:", error);
      toast.error(error);
    }
  };

  return (
    <div className="relative top">
      <div className="fixed w-1/2 bg-white z-40 px-4 py-3 border-b border-gray-300">
        <button
          onClick={() => {
            setToggleModal(false);
            handleModal(null);
          }}
          className="absolute top-1 right-1 rounded-lg transition-opacity p-2 hover:bg-[#ff00001f] hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-5 w-5 text-[#ff00009d]" />
        </button>
        <div className="font-semibold text-[22px] text-header">Contact</div>
      </div>
      <form className="relative top-[60px] px-4 py-3" onSubmit={handleSubmit}>
        <div className="flex">
          <div className="flex justify-center items-center w-[120px] h-[120px] border border-[#F2F2F2] bg-[#F2F2F2] mr-6 rounded-md">
            {fileUpload ? (
              <Spinner />
            ) : contactData.logo ? (
              <img
                src={contactData.logo}
                alt="Logo"
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <PhoneIcon />
            )}
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
              <input
                type="file"
                accept="image/*"
                onChange={uploadFile}
                className="hidden"
                id="upload-logo"
                name="document"
              />
              <label
                htmlFor="upload-logo"
                className="text-[14px] bg-primary-green text-white px-[20px] py-[6px] rounded-md mr-[10px] cursor-pointer"
              >
                Change
              </label>
              <button
                type="button"
                onClick={() =>
                  setContactData((prevState) => ({ ...prevState, logo: "" }))
                }
                className="text-[14px] bg-white text-red-500 border border-red-500 px-[20px] py-[6px] rounded-md"
              >
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
              onChange={handleChange}
              name="first_name"
              value={contactData.first_name}
              required={true}
            />
          </div>
          <div className="flex-1">
            <div className="text-[14px]">Last name</div>
            <input
              type="text"
              placeholder="Add last name"
              className="w-full p-3 rounded-md bg-[#F2F2F2] mt-2 h-[44px]"
              onChange={handleChange}
              name="last_name"
              value={contactData.last_name}
              required={true}
            />
          </div>
        </div>
        <div className="mt-[20px]">
          <div className="text-[14px]">Email</div>
          {contactData.email.map((email, index) => (
            <div className="mb-2" key={index}>
              <input
                type="text"
                placeholder="Add email"
                className="w-full p-3 rounded-md bg-[#F2F2F2] mt-2 h-[44px]"
                onChange={(e) => handleEmailChange(index, e.target.value)}
                name="email"
                value={email}
                required={true}
              />
              {contactData.email.length > 1 && index !== 0 && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeEmailField(index)}
                    className="text-primary-green underline text-xs"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
          <div className="flex justify-end mt-[12px]">
            <button
              type="button"
              onClick={addEmailField}
              className="flex items-center justify-center text-primary-green underline text-xs"
            >
              <Plus />
              Add another email
            </button>
          </div>
        </div>
        <div className="mt-[20px]">
          <div className="text-[14px]">Phone</div>
          {contactData.phones.map((phone, index) => (
            <div className="mb-2" key={index}>
              <PhoneInput
                country={"in"}
                inputClass="w-full p-3 rounded-md bg-[#F2F2F2] mt-2 h-[44px]"
                containerClass="w-full"
                onChange={(value, country) =>
                  handlePhoneChange(index, value, country)
                }
                value={phone.number}
              />
              {contactData.phones.length > 1 && index !== 0 && (
                <div className="flex justify-end ">
                  <button
                    type="button"
                    onClick={() => removePhoneField(index)}
                    className="text-primary-green underline text-xs"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ))}
          <div className="flex justify-end mt-[12px]">
            <button
              type="button"
              onClick={addPhoneField}
              className="flex items-center justify-center text-primary-green underline text-xs"
            >
              <Plus />
              Add another phone number
            </button>
          </div>
        </div>
        <div className="mt-[20px]">
          <div className="text-[14px]">Contact type</div>
          <Dropdown
            label="Choose one"
            items={["Lead", "customer"]}
            value={contactData.contact_type}
            onChange={(value: any) => handleSelectChange("contact_type", value)}
          />
        </div>
        <div className="my-[20px]">
          <div className="text-[14px]">Time zone</div>
          <Dropdown
            label="Choose one"
            items={["GMT+1", "CET", "GMT+2"]}
            value={contactData.time_zone}
            onChange={(value: any) => handleSelectChange("time_zone", value)}
          />
        </div>
        {/* <div className="flex justify-between items-center mb-[20px]">
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
        </div> */}
        <div className="flex justify-end mb-[30px]">
          <button
            disabled={loading}
            type="submit"
            className="text-[14px] w-[95px] bg-primary-green text-white px-[20px] py-[6px] rounded-md mr-[10px]"
          >
            {loading ? <Spinner /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContact;

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

const DividerWithText = () => {
  return (
    <div className="flex items-center text-[#667085] gap-2">
      <div className="h-[2px] w-full bg-[#EFEFF4]" />
      <span className="whitespace-nowrap">Or</span>
      <div className="h-[2px] w-full bg-[#EFEFF4]" />
    </div>
  );
};
