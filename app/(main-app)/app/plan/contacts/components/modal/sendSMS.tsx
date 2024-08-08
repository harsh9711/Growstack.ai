import { AlertTriangle, MessageSquareTextIcon, X } from "lucide-react";
import { ModalContent } from "./modalEnums";
import { LinkIcon, SmileIcon, SMSIcon, TriangleAlertIcon } from "@/components/svgs/icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import { Contact } from "@/types/contacts";
import toast from "react-hot-toast";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

interface SendSMSProps {
  selectedIds: string[];
  contacts: Contact[];
}

interface SMSDataProps {
  contacts: {
    img: string;
    phones: string[];
    name: string;
  }[];
  message: string;
}

const initialSMSData: SMSDataProps = {
  contacts: [],
  message: "",
};

const SendSMS = ({ selectedIds, contacts }: SendSMSProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [proceed, setProceed] = useState<boolean>(false);
  const [smsData, setSMSData] = useState<SMSDataProps>(initialSMSData);
  const [isOpen, setIsOpen] = useState(false);

  const getSelectedContactsDetails = () => {
    const selectedContacts = contacts.filter((contact) => selectedIds.includes(contact.id));

    const formattedPhones = selectedContacts.map((contact) => ({
      img: contact.logo,
      phones: contact.phones.map((phone: any) => `+${phone.country_code}${phone.number}`),
      name: contact.name,
    }));

    return formattedPhones;
  };

  useEffect(() => {
    const selectedDetails = getSelectedContactsDetails();
    setSMSData((prevState) => ({
      ...prevState,
      contacts: selectedDetails,
    }));
  }, [selectedIds, contacts]);

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
      setLoading(true);
      const payload = {
        contacts: smsData.contacts.flatMap((ph) => ph.phones),
        message: smsData.message,
      };
      const response = await instance.post(`${API_URL}/users/api/v1/sms/send`, payload);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
      }
    } finally {
      setIsOpen(false);
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="w-[45px] h-[45px] border border-[#EBEBEB] rounded-lg grid place-content-center p-3 hover:bg-primary-light-gray text-primary-black">
          <MessageSquareTextIcon />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl pt-0 h-fit gap-0">
        <DialogHeader className="flex justify-center border-b border-gray-200 py-4">
          <DialogTitle>Send SMS</DialogTitle>
        </DialogHeader>

        <div>
          {selectedIds.length < 1 ? (
            <div className="text-[24px] font-semibold text-header mt-4">No contacts have been selected</div>
          ) : (
            <>
              <div className="text-[24px] font-semibold text-header mt-4">Send SMS to following contacts</div>
              <div className="flex gap-2 items-center relative h-11 my-3">
                {smsData.contacts.slice(0, 8).map((contact, index) => (
                  <div
                    key={index}
                    className="absolute"
                    style={{
                      left: index * 30,
                      zIndex: smsData.contacts.length - index,
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
                {smsData.contacts.length > 8 && (
                  <div
                    title={`+ ${smsData.contacts.length - 8} more`}
                    className="absolute"
                    style={{
                      left: (smsData.contacts.length - 2) * 30,
                      zIndex: smsData.contacts.length - (smsData.contacts.length - 1),
                    }}>
                    <div className="bg-gray-200 border border-white h-11 w-11 rounded-full flex justify-center items-center cursor-pointer">
                      <p className="text-gray-500">+{smsData.contacts.length - 8}</p>
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
              <div className="text-[14px] text-header mb-3">Enter SMS</div>
              <div className="bg-[#F2F2F2] rounded-2xl overflow-hidden">
                <textarea
                  placeholder="Enter your SMS"
                  className="bg-[#F2F2F2] p-3 h-[120px] block resize-none w-full"
                  value={smsData.message}
                  onChange={(e) =>
                    setSMSData((prevState) => ({
                      ...prevState,
                      message: e.target.value,
                    }))
                  }
                  name={"message"}
                  required={true}
                />
                <div className="flex bg-[#F2F2F2] p-3">
                  <SmileIcon />{" "}
                  <span className="ml-2">
                    <LinkIcon />
                  </span>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="text-[16px] w-[150px] sheen text-white bg-primary-green h-12 px-6 rounded-xl flex justify-center items-center">
                  {loading ? <Spinner /> : "Send SMS"}
                </button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SendSMS;
