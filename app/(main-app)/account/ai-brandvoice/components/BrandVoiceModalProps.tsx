import { useState, useEffect } from "react";
import { API_URL } from "@/lib/api";
import instance from "@/config/axios.config";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { z } from "zod";
import DotsLoader from "@/components/DotLoader";

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
      <DialogContent className="w-[80%] md:w-[85%] max-w-3xl p-0 pb-4 border-0">
        <DialogHeader>
          <DialogTitle className="px-5">
            <div className="bg-white py-3 border-b border-[#EBEBEB] text-black font-inter">
              <p className="text-lg font-semibold">Edit brand voice</p>
            </div>
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

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
            <input
              className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] 
        bg-primary-black before:pointer-events-none before:absolute 
        before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent 
        before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] 
        after:h-5 after:w-5 after:rounded-full after:border-none 
        after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] 
        after:transition-[background-color_0.2s,transform_0.2s] 
        checked:bg-primary-green checked:after:absolute checked:after:z-[2] 
        checked:after:-mt-[3px] checked:after:ml-[1.0625rem] 
        checked:after:h-5 checked:after:w-5 checked:after:rounded-full 
        checked:after:border-none checked:after:bg-primary-white 
        checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] 
        checked:after:transition-[background-color_0.2s,transform_0.2s] 
        hover:cursor-pointer focus:outline-none focus:ring-0 
        focus:before:scale-100 focus:before:opacity-[0.12] 
        focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] 
        focus:before:transition-[box-shadow_0.2s,transform_0.2s] 
        focus:after:absolute focus:after:z-[1] focus:after:block 
        focus:after:h-5 focus:after:w-5 focus:after:rounded-full 
        focus:after:content-[''] checked:focus:border-primary 
        checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] 
        checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] 
        checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] 
        dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary 
        dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] 
        dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              checked={isDefault}
              onChange={e => setIsDefault(e.target.checked)}
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
          </button>
        </div>
      </form>
    </div>
  );
};

export default BrandVoiceModal;
