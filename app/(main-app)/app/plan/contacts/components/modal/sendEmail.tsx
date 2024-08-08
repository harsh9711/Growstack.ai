import Spinner from "@/components/Spinner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import "@/styles/editor.css";
import { Contact } from "@/types/contacts";
import { AlertTriangle, Mail } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Editor from "../../../ai-apps/[appId]/components/Editor";
import { getCookie } from "cookies-next";

interface SendEmailProps {
  selectedIds: string[];
  contacts: Contact[];
}

interface EmailDataProps {
  subject: string;
  template_id: string;
  contacts: {
    name: string;
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

const SendEmail = ({ selectedIds, contacts }: SendEmailProps) => {
  const [proceed, setProceed] = useState<boolean>(false);
  const [isEmailPermissionGranted, setIsEmailPermissionGranted] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [emailData, setEmailData] = useState<EmailDataProps>(initialEmailData);
  const [pending, setPending] = useState<boolean>(false);
  const [templates, setTemplates] = useState<{ id: string; name: string }[]>([]);

  const getSelectedContactsDetails = () => {
    const selectedContacts = contacts.filter((contact) => selectedIds.includes(contact.id));
    return selectedContacts.map((contact) => ({
      name: contact.name,
      img: contact.logo,
      emails: contact.email,
    }));
  };

  const checkEmailPermissionGranted = async () => {
    setLoading(true);
    try {
      const checkPermission = await instance.get(`${API_URL}/users/api/v1/mails/check-permission`);
      if (!checkPermission.data.success) {
        return setIsEmailPermissionGranted(false);
      } else {
        return setIsEmailPermissionGranted(true);
      }
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkEmailPermissionGranted();
  }, []);

  const grantPermission = async () => {
    try {
      const token = getCookie("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const redirectUrl = `${API_URL}/users/api/v1/mails/auth/gmail?token=${token}`;
      window.location.href = redirectUrl;
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await instance.get(`${API_URL}/users/api/v1/docs?page=1&limit=10&category=text`);
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
      toast.error("No contacts selected. Select at least one contact to proceed.");
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
          username: contact.name,
          emails: contact.emails,
        })),
      };
      setPending(true);
      const response = await instance.post(`/users/api/v1/mails/contacts`, payload);
      setPending(false);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
      }
    } finally {
      setIsOpen(false);
      setPending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="w-[45px] h-[45px] border border-[#EBEBEB] rounded-lg grid place-content-center p-3 hover:bg-primary-light-gray text-primary-black">
          <Mail />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl pt-0 h-fit gap-0">
        <DialogHeader className="flex justify-center border-b border-gray-200 py-4">
          <DialogTitle>Send Email</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="w-full flex justify-center items-center h-40">Loading</div>
        ) : !isEmailPermissionGranted ? (
          <>
            <div className="text-[24px] font-semibold text-header mt-4">Would you like to grant permission to send emails?</div>
            <div className="flex justify-end mt-4 space-x-3">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-[14px] w-[150px] h-12 bg-white text-red-500 border border-red-500 rounded-xl">
                Cancel
              </button>
              <button
                type="button"
                onClick={grantPermission}
                className="text-[16px] w-[150px] h-12 bg-primary-green text-white border border-[#034737] rounded-xl">
                Yes
              </button>
            </div>
          </>
        ) : (
          <div>
            {selectedIds.length < 1 ? (
              <div className="text-[24px] font-semibold text-header mt-4">No contacts have been selected</div>
            ) : (
              <>
                <div className="text-[24px] font-semibold text-header mt-4">Send email to following contacts</div>
                <div className="flex gap-2 items-center relative h-11 my-3">
                  {emailData.contacts.slice(0, 8).map((contact, index) => (
                    <div
                      key={index}
                      className="absolute"
                      style={{
                        left: index * 30,
                        zIndex: emailData.contacts.length - index,
                      }}>
                      {contact.img ? (
                        <div title={contact.name} className="border border-white rounded-full cursor-pointer relative h-11 w-11 overflow-hidden">
                          <Image src={contact.img} alt={contact.name} fill objectFit="cover" />
                        </div>
                      ) : (
                        <div
                          title={contact.name}
                          className="bg-gray-200 border border-white h-11 w-11 rounded-full flex justify-center items-center cursor-pointer">
                          <p className="text-xl text-gray-500">{contact.name.slice(0, 1)}</p>
                        </div>
                      )}
                    </div>
                  ))}
                  {emailData.contacts.length > 8 && (
                    <div
                      title={`+ ${emailData.contacts.length - 8} more`}
                      className="absolute"
                      style={{
                        left: (emailData.contacts.length - 2) * 30,
                        zIndex: emailData.contacts.length - (emailData.contacts.length - 1),
                      }}>
                      <div className="bg-gray-200 border border-white h-11 w-11 rounded-full flex justify-center items-center cursor-pointer">
                        <p className="text-gray-500">+{emailData.contacts.length - 8}</p>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            {!proceed ? (
              <>
                <div className="flex items-center gap-2 mt-4">
                  <AlertTriangle />
                  <span className="text-[14px]">
                    Please note the actions will be performed over a period of time, you can track the progress on the bulk action page.
                  </span>
                </div>
                <div className="flex justify-end mt-5">
                  <button type="button" onClick={handleProceed} className="text-[16px] bg-primary-green text-white px-5 h-12 rounded-xl">
                    Okay, proceed
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="mt-5 space-y-2">
                  <div className="text-[14px]">Email templates</div>
                  <Dropdown label="Select" items={templates} value={emailData.template_id} onChange={handleTemplateChange} />
                </div>
                <div className="mt-5 space-y-2">
                  <div className="text-[14px]">From name</div>
                  <input
                    type="text"
                    placeholder="From name"
                    className="w-full p-3 rounded-xl bg-[#F2F2F2] mt-2 h-[44px]"
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
                    className="w-full p-3 rounded-xl bg-[#F2F2F2] mt-2 h-[44px]"
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

                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    disabled={pending}
                    className="text-[16px] w-[150px] sheen text-white bg-primary-green h-12 px-6 rounded-xl flex justify-center items-center">
                    {pending ? <Spinner /> : "Send Email"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
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
