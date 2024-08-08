import Spinner from "@/components/Spinner";
import { PhoneIcon } from "@/components/svgs/icons";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import { CirclePlusIcon, Plus, XIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../../../../../../../styles/phoneInput.css";

interface AddContactProps {
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
  emails: string[];
  contact_type: string;
  time_zone: string;
}

const AddContact = ({ getContacts }: AddContactProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contactData, setContactData] = useState<AddContactDetails>({
    logo: "",
    first_name: "",
    last_name: "",
    phones: [{ country_code: "", number: "" }],
    emails: [""],
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
    const newEmails = [...contactData.emails];
    newEmails[index] = value;
    setContactData((prevState) => ({
      ...prevState,
      emails: newEmails,
    }));
  };

  const addEmailField = () => {
    setContactData((prevState) => ({
      ...prevState,
      emails: [...prevState.emails, ""],
    }));
  };

  const addPhoneField = () => {
    setContactData((prevState) => ({
      ...prevState,
      phones: [...prevState.phones, { country_code: "", number: "" }],
    }));
  };

  const removeEmailField = (index: number) => {
    const newEmails = contactData.emails.filter((_, i) => i !== index);
    setContactData((prevState) => ({
      ...prevState,
      emails: newEmails,
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
        const response = await instance.post(`${API_URL}/users/api/v1/file/upload`, formData);
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
      const response = await instance.post(`${API_URL}/users/api/v1/contacts/add`, contactData);
      setLoading(false);
      toast.success(response.data.message);
      resetContactData();
      setIsOpen(false);
      getContacts();
    } catch (error: any) {
      console.error("Error uploading file:", error);
      toast.error(error);
    }
  };

  const resetContactData = () => {
    return setContactData({
      logo: "",
      first_name: "",
      last_name: "",
      phones: [{ country_code: "", number: "" }],
      emails: [""],
      contact_type: "",
      time_zone: "",
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="w-[45px] h-[45px] border border-[#EBEBEB] rounded-lg grid place-content-center p-3 hover:bg-primary-light-gray text-primary-black">
          <CirclePlusIcon />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl pt-0 h-full gap-0">
        <DialogHeader className="flex justify-center border-b border-gray-100 py-4">
          <DialogTitle>New Contact</DialogTitle>
        </DialogHeader>
        <form className="relative pt-6 overflow-y-auto" onSubmit={handleSubmit}>
          <div className="flex">
            <div className="flex justify-center items-center w-[120px] h-[120px] border border-[#F2F2F2] bg-[#F2F2F2] mr-6 rounded-xl">
              {fileUpload ? (
                <Spinner />
              ) : contactData.logo ? (
                <img src={contactData.logo} alt="Logo" className="w-full h-full object-cover rounded-xl" />
              ) : (
                <PhoneIcon />
              )}
            </div>
            <div>
              <div className="font-semibold text-[18px] text-header mb-2">Personal Logo</div>
              <div className="text-[14px] text-[#3D3D3D] text-opacity-50">
                The proposed size is 512*512px
                <br />
                no bigger than 2.5mb
              </div>
              <div className="mt-5">
                <input type="file" accept="image/*" onChange={uploadFile} className="hidden" id="upload-logo" name="document" />
                <label
                  htmlFor="upload-logo"
                  className="text-[14px] border border-primary-green bg-primary-green text-white px-[20px] py-[6px] rounded-lg mr-[10px] cursor-pointer">
                  Change
                </label>
                <button
                  type="button"
                  onClick={() => setContactData((prevState) => ({ ...prevState, logo: "" }))}
                  className="text-[14px] bg-white text-red-500 border border-red-500 px-[20px] py-[6px] rounded-lg">
                  Reset
                </button>
              </div>
            </div>
          </div>
          <div className="flex mt-6 gap-3">
            <div className="flex-1">
              <div className="text-[14px]">First name</div>
              <input
                type="text"
                placeholder="Add first name"
                className="w-full p-3 rounded-xl bg-[#F2F2F2] mt-2 h-[50px]"
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
                className="w-full p-3 rounded-xl bg-[#F2F2F2] mt-2 h-[50px]"
                onChange={handleChange}
                name="last_name"
                value={contactData.last_name}
                required={true}
              />
            </div>
          </div>
          <div className="mt-6">
            <div className="text-[14px] mb-2">Email</div>
            {contactData.emails.map((email, index) => (
              <div className="mb-2 w-full rounded-xl bg-[#F2F2F2] items-center flex" key={index}>
                <input
                  type="text"
                  placeholder="Add email"
                  className="w-full p-3 bg-transparent h-[50px]"
                  onChange={(e) => handleEmailChange(index, e.target.value)}
                  name="email"
                  value={email}
                  required={true}
                />
                {contactData.emails.length > 1 && index !== 0 && (
                  <div className="flex justify-end">
                    <button type="button" onClick={() => removeEmailField(index)} className="bg-white p-1 rounded-xl mr-2">
                      <XIcon size={20} className="text-rose-500" />
                    </button>
                  </div>
                )}
              </div>
            ))}
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={addEmailField}
                className="flex gap-1 items-center justify-center text-primary-green bg-primary-green/10 rounded-lg text-sm py-1.5 px-2">
                <Plus size={20} />
                Add another email
              </button>
            </div>
          </div>
          <div className="mt-5">
            <div className="text-[14px] mb-2">Phone</div>
            {contactData.phones.map((phone, index) => (
              <div className="mb-2 w-full rounded-xl bg-[#F2F2F2] items-center flex p-1" key={index}>
                <PhoneInput
                  country={"us"}
                  inputClass="w-full p-3 bg-transparent h-[50px]"
                  containerClass="w-full"
                  onChange={(value, country) => handlePhoneChange(index, value, country)}
                  value={phone.number}
                />
                {contactData.phones.length > 1 && index !== 0 && (
                  <div className="flex justify-end">
                    <button type="button" onClick={() => removePhoneField(index)} className="bg-white p-1 rounded-xl mr-2">
                      <XIcon size={20} className="text-rose-500" />
                    </button>
                  </div>
                )}
              </div>
            ))}
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={addPhoneField}
                className="flex gap-1 items-center justify-center text-primary-green bg-primary-green/10 rounded-lg text-sm py-1.5 px-2">
                <Plus size={20} />
                Add another phone number
              </button>
            </div>
          </div>
          <div className="mt-5">
            <div className="text-[14px] mb-2">Contact type</div>
            <Dropdown
              label="Choose one"
              items={["Lead", "customer"]}
              value={contactData.contact_type}
              onChange={(value: any) => handleSelectChange("contact_type", value)}
            />
          </div>
          <div className="mt-6">
            <div className="text-[14px] mb-2">Time zone</div>
            <Dropdown
              label="Choose one"
              items={["GMT+1", "CET", "GMT+2"]}
              value={contactData.time_zone}
              onChange={(value: any) => handleSelectChange("time_zone", value)}
            />
          </div>
          <div className="flex justify-end mt-5">
            <button
              disabled={loading || fileUpload}
              type="submit"
              className="text-[14px] w-[100px] h-12 bg-primary-green text-white rounded-xl flex justify-center items-center">
              {loading ? <Spinner /> : "Save"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
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
