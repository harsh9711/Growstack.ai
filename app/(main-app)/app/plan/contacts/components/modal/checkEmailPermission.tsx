import { X } from "lucide-react";
import { ModalContent } from "./modalEnums";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import toast from "react-hot-toast";
import { getCookie } from "cookies-next";

interface CheckEmailPermissionProps {
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleModal: (value: ModalContent | null) => void;
}

const CheckEmailPermission = ({
  setToggleModal,
  handleModal,
}: CheckEmailPermissionProps) => {
  const grantPermission = async () => {
    try {
      const token = getCookie("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const redirectUrl = `${API_URL}/users/api/v1/mails/auth/gmail?token=${token}`;
      // Redirect to the constructed URL
      window.location.href = redirectUrl;
    } catch (error: any) {
      console.error("Error granting permission:", error);
      toast.error(error);
    }
  };

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
        <div className="font-semibold text-[22px] text-header">
          Email Permission
        </div>
      </div>
      <div className="px-4">
        <div className="text-[16px] text-header mt-[40px] mb-[25px]">
          Would you like to grant permission to send emails?
        </div>
      </div>
      <div className="flex justify-end mt-6 mb-3 p-2">
        <button
          type="button"
          onClick={() => {
            setToggleModal(false);
            handleModal(null);
          }}
          className="text-[14px] bg-white text-red-500 border border-red-500 px-[20px] py-[6px] rounded-md"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={grantPermission}
          className="text-[16px] ml-2 bg-primary-green text-white border border-[#034737] px-[20px] py-[6px] rounded-md"
        >
          Yes
        </button>
      </div>
    </>
  );
};

export default CheckEmailPermission;
