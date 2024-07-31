import { X } from "lucide-react";
import { ModalContent } from "./modalEnums";
import { TriangleAlertIcon } from "@/components/svgs/icons";
import { useEffect, useState } from "react";
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
import { Contact } from "@/types/contacts";
import toast from "react-hot-toast";
import instance from "@/config/axios.config";
import Spinner from "@/components/Spinner";
import { API_URL } from "@/lib/api";

interface SendEmailProps {
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleModal: (value: ModalContent | null) => void;
  selectedIds: string[];
  contacts: Contact[];
}

interface EmailDataProps {
  subject: string;
  template_id: string;
  contacts: {
    username: string;
    img: string;
    emails: string[];
  }[];
  message: string;
}

const initialEmailData = {
  subject: "",
  template_id: "",
  contacts: [],
  message: "",
};

const SendEmail = ({
  setToggleModal,
  handleModal,
  selectedIds,
  contacts,
}: SendEmailProps) => {
  const [proceed, setProceed] = useState<boolean>(false);
  const [emailData, setEmailData] = useState<EmailDataProps>(initialEmailData);
  const [loading, setLoading] = useState<boolean>(false);
  const [templates, setTemplates] = useState<{ id: string; name: string }[]>(
    []
  );

  const getSelectedContactsDetails = () => {
    const selectedContacts = contacts.filter((contact) =>
      selectedIds.includes(contact.id)
    );
    return selectedContacts.map((contact) => ({
      username: contact.name,
      img: contact.logo,
      emails: contact.email,
    }));
  };

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await instance.get(
          `${API_URL}/users/api/v1/docs?page=1&limit=10&category=text`
        );
        const data = res.data.data.docs.map((re: any) => ({
          id: re._id,
          name: re.doc_name,
        }));
        setTemplates(data);
      } catch (error) {
        console.error("Error fetching templates:", error);
        toast.error("Failed to fetch email templates.");
      }
    };
    fetchTemplates();
  }, []);

  useEffect(() => {
    const selectedDetails = getSelectedContactsDetails();
    setEmailData((prevState) => ({
      ...prevState,
      contacts: selectedDetails,
    }));
  }, [selectedIds, contacts]);

  const handleEditorChange = (message: string) => {
    setEmailData((prevState) => ({
      ...prevState,
      message,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTemplateChange = (value: string) => {
    setEmailData((prevState) => ({
      ...prevState,
      template_id: value,
    }));
  };

  const handleProceed = () => {
    if (selectedIds.length < 1) {
      toast.error(
        "No selected user detected. Select at least one user to proceed."
      );
      return;
    }
    setProceed(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { subject, template_id } = emailData;
      const payload = {
        subject,
        template_id,
        contacts: emailData.contacts.map((contact) => ({
          username: contact.username,
          emails: contact.emails,
        })),
      };
      setLoading(true);
      const response = await instance.post(
        `/users/api/v1/mails/contacts`,
        payload
      );
      setLoading(false);
      if (response.data.success) {
        toast.success(response.data.message);
        setToggleModal(false);
        handleModal(null);
      }
    } catch (error: any) {
      console.error("Error uploading file:", error);
      toast.error(error);
    }
  };

  const avatars = emailData.contacts.map((contact) => contact.img);
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
          {avatars.map((avatar, index) => (
            <div
              key={index}
              className="rounded-[100%] text-white bg-[#033747] w-[45px] h-[45px] flex items-center justify-center"
            >
              <img
                src={avatar}
                alt={`avatar-${index}`}
                className="rounded-full w-full h-full object-cover"
              />
            </div>
          ))}
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
                onClick={handleProceed}
                className="text-[16px] bg-white text-[#034737] border border-[#034737] px-[20px] py-[6px] rounded-md"
              >
                Okay, proceed
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="mt-[10px] pb-3">
            <div className="mt-[20px]">
              <div className="text-[14px]">Email templates</div>
              <Dropdown
                label="Select"
                items={templates}
                value={emailData.template_id}
                onChange={handleTemplateChange}
              />
            </div>
            <div className="mt-[20px]">
              <div className="text-[14px]">From name</div>
              <input
                type="text"
                placeholder="From name"
                className="w-full p-3 rounded-md bg-[#F2F2F2] mt-2 h-[44px]"
                name="name"
                required={true}
                onChange={handleChange}
              />
            </div>
            <div className="flex-1 mt-[25px]">
              <div className="text-[14px]">Email subject</div>
              <input
                type="text"
                placeholder="Enter email subject"
                className="w-full p-3 rounded-md bg-[#F2F2F2] mt-2 h-[44px]"
                name="subject"
                required={true}
                onChange={handleChange}
              />
            </div>
            {/* <div className="w-full p-8 bg-white rounded-2xl border border-[#EDEFF0] flex flex-col"> */}
            <div className="flex-1 mt-[25px] ql-editor-fr px-0 py-0">
              <div className="text-[14px]">Message</div>
              <Editor content={""} onChange={handleEditorChange} />
            </div>
            {/* </div> */}
            {/* <div className="my-[15px]">
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
              onChange={handleChange}
            /> */}
            <div className="flex justify-end mt-6 mb-3">
              <button
                type="submit"
                disabled={loading}
                className="text-[16px] min-w-[105px] bg-white text-[#034737] border border-[#034737] px-[20px] py-[6px] rounded-md flex justify-center"
              >
                {loading ? <Spinner color="black" /> : "Send Email"}
              </button>
            </div>
          </form>
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
        {items.length > 0 ? (
          items.map((item: any) => (
            <SelectItem value={item.id} key={item.id}>
              {item.name}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="no">{"no item"}</SelectItem>
        )}
      </SelectContent>
    </Select>
  </div>
);