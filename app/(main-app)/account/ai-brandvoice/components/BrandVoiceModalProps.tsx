import React, { useState, useEffect } from "react";
import { API_URL } from "@/lib/api";
import instance from "@/config/axios.config";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { z } from "zod";
import DotsLoader from "@/components/DotLoader";
import { X } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface BrandVoice {
  _id: string;
  brand_name: string;
  websites: string[];
  brand_voice: string;
  description?: string;
  document_url?: string;
  is_default?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface BrandVoiceModalProps {
  brandId: string;
  onClose: () => void;
}

const brandVoiceSchema = z.object({
  brand_name: z.string().nonempty("Brand name is required"),
  brand_voice: z.string().nonempty("Brand voice is required"),
  description: z.string().nonempty("Description is required"),
});

const BrandVoiceModal: React.FC<BrandVoiceModalProps> = ({
  brandId,
  onClose,
}) => {
  const [brandData, setBrandData] = useState<BrandVoice | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBrandVoice = async () => {
      try {
        const response = await instance.get(
          `${API_URL}/users/api/v1/brand-voice/${brandId}`
        );
        setBrandData(response.data.data);
      } catch (error) {
        console.error("Error fetching brand voice:", error);
        toast.error("Failed to fetch brand voice.");
      } finally {
        setLoading(false);
      }
    };

    if (brandId) fetchBrandVoice();
  }, [brandId]);

  const handleUpdateBrandVoice = async (formData: Partial<BrandVoice>) => {
    if (!brandData?._id) return;

    try {
      await instance.put(
        `${API_URL}/users/api/v1/brand-voice/${brandData._id}`,
        formData
      );
      toast.success("Brand voice updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating brand voice:", error);
      toast.error("Failed to update brand voice.");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full">
        <DotsLoader />
      </div>
    );

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="w-[80%] md:w-[85%] max-w-3xl p-0 pb-4 border-0"
      >
        <DialogHeader className="sticky top-0 z-10 bg-white">
          <DialogTitle className="px-5 border-b border-[#EBEBEB] flex justify-between items-center">
            <div className="bg-white py-3  text-black font-inter">
              <p className="text-lg font-semibold">Edit brand voice</p>
            </div>
            <DialogClose className=" right-2 top-2 rounded-lg transition-opacity p-2 hover:bg-[#ff00001f] hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-5 w-5 text-[#ff00009d]" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        <div className="m-3">
          {brandData ? (
            <BrandVoiceForm
              brandData={brandData}
              onClose={onClose}
              onUpdate={handleUpdateBrandVoice}
            />
          ) : (
            <div>No brand data available</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface BrandVoiceFormProps {
  brandData: BrandVoice;
  onClose: () => void;
  onUpdate: (formData: Partial<BrandVoice>) => void;
}

const BrandVoiceForm: React.FC<BrandVoiceFormProps> = ({
  brandData,
  onClose,
  onUpdate,
}) => {
  const [brandName, setBrandName] = useState<string>(
    brandData.brand_name || ""
  );
  const [websites] = useState<string[]>(brandData.websites || [""]);
  const [brandVoice, setBrandVoice] = useState<string>(
    brandData.brand_voice || ""
  );
  const [description, setDescription] = useState<string>(
    brandData.description || ""
  );
  const [isDefault, setIsDefault] = useState<boolean>(
    brandData.is_default || false
  );

  const [isUpdating, setIsUpdating] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const validatedData = brandVoiceSchema.parse({
        brand_name: brandName,
        brand_voice: brandVoice,
        description,
      });

      const formData: Partial<BrandVoice> = {
        ...validatedData,
        is_default: isDefault,
      };

      await onUpdate(formData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        err.errors.forEach(issue => {
          fieldErrors[issue.path[0]] = issue.message;
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white ">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Brand Name <span className="text-[#F00]">*</span>
          </label>
          <input
            type="text"
            value={brandName}
            onChange={e => setBrandName(e.target.value)}
            className={`border rounded w-full p-2 ${errors.brand_name ? "border-red-500" : ""}`}
          />
          {errors.brand_name && (
            <p className="text-red-500 text-sm">{errors.brand_name}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Websites <span className="text-[#F00]">*</span>
          </label>
          {websites.map((website, index) => (
            <input
              key={index}
              type="url"
              value={website}
              readOnly
              className="border rounded w-full p-2 bg-gray-100 cursor-not-allowed"
            />
          ))}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Brand Voice <span className="text-[#F00]">*</span>
          </label>
          <textarea
            value={brandVoice}
            onChange={e => setBrandVoice(e.target.value)}
            placeholder="Our journey began..."
            className={`h-[300px] w-full bg-[#F2F2F2] rounded-2xl p-3 resize-none ${errors.brand_voice ? "border-red-500" : ""}`}
          />
          {errors.brand_voice && (
            <p className="text-red-500 text-sm">{errors.brand_voice}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Description
          </label>

          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className={`border  h-[200px] bg-[#F2F2F2] rounded-2xl p-3 resize-none w-full  ${errors.description ? "border-red-500" : ""}`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        <div className="mb-4">
          <div className="flex items-center gap-2">
            <Switch
              disabled={isUpdating}
              checked={isDefault}
              onCheckedChange={checked => {
                setIsDefault(checked);
              }}
            />
            Save as the default voice across your teamspace
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="text-red-500 border border-red-500 bg-transparent text-nowrap py-3 px-10 rounded-xl transition duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className=" bg-primary-green text-white sheen transition duration-500 px-10 py-3.5 rounded-xl flex items-center gap-2"
          >
            Update
            {isUpdating && <DotsLoader />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BrandVoiceModal;
