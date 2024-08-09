"use client";
import { useEffect, useState } from "react";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Minus, Plus } from "lucide-react";
import { toneOfVoice } from "../data";
import { usePathname } from "next/navigation";
import { useRouter } from "next-nprogress-bar";

export default function UpdateBrandVoice() {
  const router = useRouter();

  const pathName = usePathname();
  const segments = pathName.split("/");
  const brand_id = segments[segments.length - 1];

  const [brandVoiceData, setBrandVoiceData] = useState([]);

  const [userInputs, setUserInputs] = useState<any[]>([
    { name: "", brief: "", isProducts: "" },
  ]);

  const addUserInput = () => {
    setUserInputs((prevInputs) => [
      ...prevInputs,
      { name: "", brief: "", isProducts: "" },
    ]);
  };

  const removeUserInput = (index: number) => {
    setUserInputs((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs.splice(index, 1);
      return updatedInputs;
    });
  };

  const [formData, setFormData] = useState({
    brand_name: "",
    description: "",
    website: "",
    tagline: "",
    target_audience: "",
    industry: "",
  });

  const [tone_of_voice, setToneOfVoice] = useState("");

  const ValidationSchema = z.object({
    brand_name: z.string().nonempty("Required"),
    website: z.string().nonempty("Required"),
    industry: z.string().nonempty("Required"),
    tagline: z.string().nonempty("Required"),
    target_audience: z.string().nonempty("Required"),
  });

  const [isPending, setIsPending] = useState(false);

  type ValidationSchemaType = z.infer<typeof ValidationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(ValidationSchema),
    defaultValues: {
      brand_name: "",
      website: "",
      industry: "",
      tagline: "",
      target_audience: "",
    },
  });

  const updateBrandVoice: any = brandVoiceData?.find((brand: any) => {
    return brand?._id === brand_id;
  });

  useEffect(() => {
    setValue("brand_name", updateBrandVoice?.brand_name);
    setValue("website", updateBrandVoice?.website);
    setValue("industry", updateBrandVoice?.industry);
    setValue("tagline", updateBrandVoice?.tagline);
    setValue("target_audience", updateBrandVoice?.target_audience);
    setFormData({
      brand_name: updateBrandVoice?.brand_name,
      description: updateBrandVoice?.description,
      website: updateBrandVoice?.website,
      tagline: updateBrandVoice?.tagline,
      target_audience: updateBrandVoice?.target_audience,
      industry: updateBrandVoice?.industry,
    });
    setToneOfVoice(updateBrandVoice?.tone_of_voice);

    // Set the previous products as userInputs
    if (updateBrandVoice?.products) {
      setUserInputs(
        updateBrandVoice.products.map((product: any) => ({
          name: product.name,
          brief: product.brief,
          isProducts: product.isProduct ? "Product" : "Service",
        }))
      );
    }
  }, [updateBrandVoice]);

  const onSubmit: SubmitHandler<ValidationSchemaType> = async (data) => {
    setIsPending(true);
    try {
      const {
        brand_name,
        description,
        tagline,
        industry,
        website,
        target_audience,
      } = formData;

      // Prepare userInputs to be sent with the POST request
      const userInputFields = userInputs.map((input) => ({
        name: input.name,
        brief: input.brief,
        isProduct: input.isProduct === "Product" ? true : false,
      }));

      const response = await instance.put(
        `${API_URL}/users/api/v1/brand-voice/${brand_id}`,
        {
          brand_name,
          description,
          target_audience,
          tagline,
          industry,
          website,
          tone_of_voice,
          products: userInputFields, // Include userInputs in the request body
        }
      );
      if (response.data.success) {
        router.push("/account/brand-voice");
        toast.success(response.data.message);
      }
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error("Request failed:", error);
    } finally {
      setIsPending(false);
    }
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    return setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (selectedCategory: string) => {
    setToneOfVoice(selectedCategory);
  };

  const handleInputChange = (index: number, key: keyof any, value: string) => {
    setUserInputs((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs[index][key] = value;

      return updatedInputs;
    });
  };

  const handleGetBrandVoiceData = async () => {
    try {
      const response = await instance.get(
        `${API_URL}/users/api/v1/brand-voice`
      );
      setBrandVoiceData(response?.data?.data?.docs);
    } catch (error) {
      console.log("Error fetching Documents:", error);
      toast.error("Error fetching Documents data");
    }
  };

  useEffect(() => {
    handleGetBrandVoiceData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mt-5">Update Brand Voice</h1>
      <section className="bg-white border border-[#E4E4E4] rounded-3xl p-10 mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <h1 className="text-xl font-semibold flex items-center gap-2">
              Brand Information
            </h1>
            <div className="grid grid-cols-2 gap-8 border-t border-[#EBEBEB] pb-4 pt-8">
              <div className="space-y-2">
                <label className="font-medium">
                  Company / Brand Name
                  <span className="text-[#F00]">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Type company / brand name"
                  {...register("brand_name")}
                  value={formData.brand_name}
                  onChange={handleChange}
                />
                {errors.brand_name && (
                  <p className="text-rose-600 text-sm">
                    {errors.brand_name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="font-medium">
                  Website <span className="text-[#F00]">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Type Website"
                  {...register("website")}
                  value={formData.website}
                  onChange={handleChange}
                />
                {errors.website && (
                  <p className="text-rose-600 text-sm">
                    {errors.website.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="font-medium">
                  Industry
                  <span className="text-[#F00]">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Type industry name"
                  {...register("industry")}
                  value={formData.industry}
                  onChange={handleChange}
                />
                {errors.industry && (
                  <p className="text-rose-600 text-sm">
                    {errors.industry.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="font-medium">
                  Tagline
                  <span className="text-[#F00]">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Type tagline"
                  {...register("tagline")}
                  value={formData.tagline}
                  onChange={handleChange}
                />
                {errors.tagline && (
                  <p className="text-rose-600 text-sm">
                    {errors.tagline.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="font-medium">
                  Target audience
                  <span className="text-[#F00]">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Type template name"
                  {...register("target_audience")}
                  value={formData.target_audience}
                  onChange={handleChange}
                />
                {errors.target_audience && (
                  <p className="text-rose-600 text-sm">
                    {errors.target_audience.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="font-medium">
                  Tone of voice <span className="text-[#F00]">*</span>
                </label>
                <Select
                  onValueChange={handleCategoryChange}
                  value={tone_of_voice}
                  defaultValue="Blogs Posts"
                >
                  <SelectTrigger className="w-full border-none h-14">
                    <SelectValue
                      placeholder={
                        tone_of_voice ? tone_of_voice : "Select a category"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {toneOfVoice.map(({ value, title }, index) => {
                      return (
                        <SelectItem key={index} value={value}>
                          {title}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-medium">
                Company / Brand description{" "}
                <span className="text-[#F00]">*</span>
              </label>
              <textarea
                placeholder="Type company description"
                className="h-[200px] w-full bg-[#F2F2F2] rounded-2xl p-3 resize-none"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2 !mt-8">
              <label className="font-medium">
                Product or service information{" "}
                <span className="text-[#F00]">*</span>
              </label>
              {userInputs.map((input, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <div className="w-full space-y-2">
                    <Input
                      type="text"
                      placeholder="Provide product / service name"
                      value={input.name}
                      onChange={(e) =>
                        handleInputChange(index, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="w-full space-y-2">
                    <Input
                      type="text"
                      placeholder="Provide brief product / service description"
                      value={input.brief}
                      onChange={(e) =>
                        handleInputChange(index, "brief", e.target.value)
                      }
                    />
                  </div>

                  <div className="w-full space-y-2">
                    <Select
                      value={input.product}
                      onValueChange={(value) =>
                        handleInputChange(index, "isProduct", value)
                      }
                    >
                      <SelectTrigger className="w-full border-none h-14">
                        <SelectValue placeholder="Product" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Product">Product</SelectItem>
                        <SelectItem value="Service">Service</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {index === userInputs.length - 1 ? (
                    <button
                      type="button"
                      className="bg-primary-green text-white py-3 px-4 hover:bg-opacity-90 rounded-l-3xl rounded-r-lg"
                      onClick={addUserInput}
                    >
                      <Plus />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="bg-red-500 text-white py-3 px-4 hover:bg-opacity-90 rounded-l-3xl rounded-r-lg"
                      onClick={() => removeUserInput(index)}
                    >
                      <Minus />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              className="py-3.5 px-6 bg-primary-green sheen rounded-xl text-white mt-6"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
