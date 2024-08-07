import { X } from "lucide-react";
import { ModalContent } from "./modalEnums";
import {
  LinkIcon,
  SmileIcon,
  TriangleAlertIcon,
} from "@/components/svgs/icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import { Contact } from "@/types/contacts";
import toast from "react-hot-toast";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";

interface SendSMSProps {
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleModal: (value: ModalContent | null) => void;
  selectedIds: string[];
  contacts: Contact[];
}

interface SMSDataProps {
  contacts: {
    img: string;
    phones: string[];
  }[];
  message: string;
}

const initialSMSData: SMSDataProps = {
  contacts: [],
  message: "",
};

const SendSMS = ({
  setToggleModal,
  handleModal,
  selectedIds,
  contacts,
}: SendSMSProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [proceed, setProceed] = useState<boolean>(false);
  const [smsData, setSMSData] = useState<SMSDataProps>(initialSMSData);

  const getSelectedContactsDetails = () => {
    const selectedContacts = contacts.filter((contact) =>
      selectedIds.includes(contact.id)
    );

    const formattedPhones = selectedContacts.map((contact) => ({
      img: contact.logo,
      phones: contact.phones.map(
        (phone: any) => `+${phone.country_code}${phone.number}`
      ),
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
      setLoading(true);
      const payload = {
        contacts: smsData.contacts.flatMap((ph) => ph.phones),
        message: smsData.message,
      };
      const response = await instance.post(
        `${API_URL}/users/api/v1/sms/send`,
        payload
      );
      console.log("responsexxx", response);
    } catch (error: any) {
      console.error("Error sending SMS:", error);
      toast.error(error);
    }
  };

  const avatars = smsData.contacts.map((contact) => contact.img);

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
      <form className="px-4" onSubmit={handleSubmit}>
        <div className="text-[24px] font-semibold text-header mt-[40px] mb-[25px]">
          Send SMS to following contacts
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
                className="text-[16px] bg-white text-[#034737] border border-[#034737] px-[20px] py-[6px] rounded-md"
                onClick={handleProceed}
              >
                Okay, proceed
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-[14px] text-header mt-[15px] mb-[6px]">
              SMS
            </div>
            <textarea
              placeholder="Enter your SMS"
              className="bg-[#F2F2F2] p-3 h-[120px] block resize-none w-full rounded-t-xl"
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
            <div className="flex bg-[#F2F2F2] p-3 rounded-b-xl">
              <SmileIcon />{" "}
              <span className="ml-2">
                <LinkIcon />
              </span>
            </div>
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
            </div> */}
            {/* <div className="text-[14px] text-header mb-[6px]">Action</div> */}
            {/* <input
              type="text"
              placeholder="Enter a description for the action..."
              className="w-full p-3 rounded-md bg-[#F2F2F2] mt-2 h-[44px]"
              name="action"
            /> */}
            <div className="flex justify-end mt-6 mb-3">
              <button
                type="submit"
                className="text-[16px] bg-white text-[#034737] border border-[#034737] px-[20px] py-[6px] rounded-md"
              >
                Send SMS
              </button>
            </div>
          </>
        )}
      </form>
    </>
  );
};

export default SendSMS;
