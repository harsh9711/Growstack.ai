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
import { Assistant } from "@/types/assistants";
import { toneOfVoice } from "./data";
import { useRouter } from "next-nprogress-bar";

export default function CreateBrandVoice() {
  const router = useRouter();

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
  const svgPattern = /^<svg.*<\/svg>$/;
  const fontAwesomePattern = /^<i class=['"]fa[a-zA-Z0-9\- ]+['"]><\/i>$/;

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
    setError,
    clearErrors,
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(ValidationSchema),
  });

  const [assistants, setAssistants] = useState<Assistant[]>([]); // Initialize with an empty array

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

      const response = await instance.post(
        `${API_URL}/users/api/v1/brand-voice/create`,
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

      // Clear form data after successful submission
      setFormData({
        brand_name: "",
        description: "",
        website: "",
        tagline: "",
        target_audience: "",
        industry: "",
      });
      setToneOfVoice(""); // Clear category after submission
      setUserInputs([{ name: "", brief: "", isProduct: "" }]); // Reset userInputs
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

  return (
    <div>
      <h1 className="text-2xl font-semibold mt-5">New Brand Voice</h1>
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

                  {/* <div className="w-full space-y-2">
                    <Select
                      value={input.type}
                      onValueChange={(value) =>
                        handleInputChange(index, "type", value)
                      }
                    >
                      <SelectTrigger className="w-full border-none h-14">
                        <SelectValue placeholder="Input field" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Input field">Input field</SelectItem>
                        <SelectItem value="Textarea field">
                          Textarea field
                        </SelectItem>
                        <SelectItem value="Select list field">
                          Select list field
                        </SelectItem>
                        <SelectItem value="Checkbox list field">
                          Checkbox list field
                        </SelectItem>
                        <SelectItem value="Radio buttons field">
                          Radio buttons field
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div> */}

                  {/* {(input.type === "Input field" ||
                    input.type === "Textarea field") && (
                    <div className="w-full space-y-2">
                      <Input
                        type="text"
                        placeholder="Type input field description (required)"
                        value={input.description}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  )}

                  {(input.type === "Select list field" ||
                    input.type === "Checkbox list field" ||
                    input.type === "Radio buttons field") && (
                    <div className="w-full space-y-2">
                      <Input
                        type="text"
                        placeholder="Comma separated options"
                        value={input.options || ""}
                        onChange={(e) =>
                          handleInputChange(index, "options", e.target.value)
                        }
                      />
                    </div>
                  )} */}

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
              Create
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
