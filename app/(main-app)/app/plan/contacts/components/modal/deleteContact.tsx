import Spinner from "@/components/Spinner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface DeleteContactProps {
  selectedIds: string[];
  getContacts: () => void;
}

const DeleteContact = ({ selectedIds, getContacts }: DeleteContactProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    if (!selectedIds.length) {
      return toast.error("No selected contacts. Select at least one user to proceed.");
    }

    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        contact_ids: selectedIds,
        updated_data: {
          delete: true,
        },
      };
      const response = await instance.put(`${API_URL}/users/api/v1/contacts/bulk-edit`, payload);
      getContacts();
      toast.success(response.data.message);
    } catch (error: any) {
      console.error("Error uploading file:", error);
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="w-[45px] h-[45px] border border-[#EBEBEB] rounded-lg grid place-content-center p-3 hover:bg-primary-light-gray text-primary-black">
          <Trash2 />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl pt-0 gap-0 h-fit">
        <DialogHeader className="flex justify-center border-b border-gray-100 py-4">
          <DialogTitle>Delete Contact</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex mt-4">
            <div>Are you sure you want to delete?</div>
          </div>
          <div className="flex justify-end mt-8 space-x-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[14px] w-[100px] h-12 border border-red-500 bg-white text-red-500 rounded-xl flex justify-center items-center">
              Cancel
            </button>
            <button
              disabled={loading}
              type="submit"
              className="text-[14px] w-[100px] h-12 bg-primary-green text-white rounded-xl flex justify-center items-center">
              {loading ? <Spinner /> : "Delete"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteContact;
