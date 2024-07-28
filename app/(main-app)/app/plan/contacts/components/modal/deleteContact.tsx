import { X } from "lucide-react";
import { ModalContent } from "./modalEnums";
import Spinner from "@/components/Spinner";
import { useState } from "react";
import toast from "react-hot-toast";
import { API_URL } from "@/lib/api";
import instance from "@/config/axios.config";

interface DeleteContactProps {
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleModal: (value: ModalContent | null) => void;
  selectedIds: string[];
  getContacts: () => void;
}

const DeleteContact = ({
  setToggleModal,
  handleModal,
  selectedIds,
  getContacts,
}: DeleteContactProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        contact_ids: selectedIds,
        updated_data: {
          delete: true,
        },
      };
      const response = await instance.put(
        `${API_URL}/users/api/v1/contacts/bulk-edit`,
        payload
      );
      setLoading(false);
      setToggleModal(false);
      handleModal(null);
      getContacts();
      toast.success(response.data.message);
    } catch (error: any) {
      console.error("Error uploading file:", error);
      toast.error(error.message || "An error occurred");
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
          Delete Contact
        </div>
      </div>
      <form className=" px-4 py-3" onSubmit={handleSubmit}>
        <div className="flex">
          <div>Are you sure you want to delete?</div>
        </div>
        <div className="flex justify-end mt-8">
          <button
            type="button"
            onClick={() => {
              setToggleModal(false);
              handleModal(null);
            }}
            className="text-[14px] border border-red-500 bg-white text-red-500 px-[20px] py-[6px] rounded-md mr-[10px]"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            type="submit"
            className="text-[14px] w-[95px] bg-primary-green text-white px-[20px] py-[6px] rounded-md mr-[10px]"
          >
            {loading ? <Spinner /> : "Delete"}
          </button>
        </div>
      </form>
    </>
  );
};

export default DeleteContact;
