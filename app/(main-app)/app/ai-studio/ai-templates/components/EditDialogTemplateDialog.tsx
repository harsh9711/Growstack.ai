"use client";

import React, { useEffect, useState } from "react";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Minus, Plus } from "lucide-react";
import { Assistant } from "@/types/assistants";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { useDropzone } from "react-dropzone";
import { InputFieldType } from "@/types/enums";

type UserInput = {
  title: string;
  description: string;
  type: string;
  icon: string;
  required: string;
  requirement?: boolean;
  field_type?: string;
};

const ValidationSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(200, "Description can't exceed 200 characters"),
  custom_prompt: z
    .string()
    .min(10, "Custom prompt must be at least 10 characters"),
  category: z.string(), // Include category in validation schema
  icon: z.string(), // Include icon in validation schema
  title: z.string(),
  idescription: z.string(),
  type: z.string(),
});

type ValidationSchemaType = z.infer<typeof ValidationSchema>;

interface EditAssistantDialogProps {
  setSelectedRowId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedRowId: string | null;
}

const EditAssistantDialog = ({
  selectedRowId,
  setSelectedRowId,
}: EditAssistantDialogProps) => {
  const [assistant, setAssistant] = useState<Assistant | null>(null);
  const [inputs, setinputs] = useState<UserInput[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [title, setTitle] = useState("");
  const [idescription, setIdescription] = useState("");
  const [iconPreview, setIconPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(ValidationSchema),
  });

  useEffect(() => {
    console.log("selectedRowId:", selectedRowId);

    if (selectedRowId) {
      const fetchAssistant = async () => {
        try {
          setIsLoading(true);
          const response = await instance.get(
            `${API_URL}/ai/api/v1/chat-template/${selectedRowId}`
          );
          const assistantData = response.data.data;
          setAssistant(assistantData);
          setinputs(assistantData.inputs || []);
          reset({
            name: assistantData.name,
            description: assistantData.description,
            custom_prompt: assistantData.custom_prompt,
            category: assistantData.category,
            icon: assistantData.icon,
            title: assistantData.inputs[0].title, // Set the title from the first input
            idescription: assistantData.inputs[0].description, // Set the title from the first input
            type: assistantData.inputs[0].field_type, // Set the title from the first input
          });
          setIconPreview(assistantData.icon); // Set initial preview
        } catch (error) {
          console.error("Error fetching assistant:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchAssistant();
    }
  }, [selectedRowId, reset]);

  const addUserInput = () => {
    setinputs(prevInputs => [
      ...prevInputs,
      { title: "", description: "", type: "", required: "Optional", icon: "" },
    ]);
  };

  const removeUserInput = (index: number) => {
    setinputs(prevInputs => {
      const updatedInputs = [...prevInputs];
      updatedInputs.splice(index, 1);
      return updatedInputs;
    });
  };

  const handleInputChange = (
    index: number,
    key: keyof UserInput,
    value: any
  ) => {
    setinputs(prevInputs => {
      const updatedInputs: any = [...prevInputs];

      updatedInputs[index][key] = value;
      return updatedInputs;
    });
  };

  const initialData: Partial<Assistant> = {
    name: "",
    description: "",
    icon: "",
    custom_prompt: "",
    category: "",
    title: "",
    inputs: [],
  };

  const [formData, setFormData] = useState<Partial<Assistant>>(initialData);

  const [fileUploadLoading, setFileUploadLoading] = useState(false);

  const handleUpdate: SubmitHandler<ValidationSchemaType> = async data => {
    setIsPending(true);

    try {
      const changedFields: Partial<Assistant> = {
        name: data.name,
        description: data.description,
        icon: iconPreview || data.icon, // Use the uploaded icon URL here
        custom_prompt: data.custom_prompt,
        category: data.category,
        title: data.title, // Include title in changedFields
        inputs,
      };

      await instance.put(
        `${API_URL}/ai/api/v1/chat-template/${selectedRowId}`,
        changedFields
      );

      toast.success("Assistant updated successfully");
    } catch (error) {
      console.error("Error updating assistant:", error);
      toast.error("Error updating assistant");
    } finally {
      setIsPending(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: async acceptedFiles => {
      const file = acceptedFiles[0];
      if (file) {
        if (file.size > 1 * 1024 * 1024) {
          toast.error("File size should be less than 1 MB");
          return; // Exit early if the file is too large
        }

        const formData = new FormData();
        formData.append("document", file);

        setFileUploadLoading(true);
        try {
          const response = await instance.post(
            `${API_URL}/users/api/v1/file/upload`,
            formData
          );
          const fileUrl = response.data.data.fileUrl;

          // Set the uploaded file URL as the icon in the form data
          setFormData(prevState => ({
            ...prevState,
            icon: fileUrl,
          }));

          // Optionally, update the iconPreview to display the new icon immediately
          setIconPreview(fileUrl);
        } catch (error) {
          toast.error("File upload failed");
          console.error("Error uploading file:", error);
        } finally {
          setFileUploadLoading(false);
        }
      }
    },
  });

  return (
    <Dialog open={!!selectedRowId} onOpenChange={() => setSelectedRowId(null)}>
      <DialogContent className="max-w-[1400px]">
        <h1 className="text-2xl lg:text-2xl md:text-xl font-semibold">
          Edit Assistant
        </h1>
        {isLoading ? (
          <section className="grid place-content-center h-[40vh]">
            Loading...
          </section>
        ) : (
          assistant && (
            <section className="bg-white rounded-3xl mt-5">
              <form onSubmit={handleSubmit(handleUpdate)}>
                <div className="space-y-5">
                  <h1 className="text-xl lg:text-xl md:text-lg font-semibold flex items-center gap-2">
                    Assistant Editor
                  </h1>
                  <div className="grid grid-cols-2 gap-8 border-t border-[#EBEBEB] pb-4 pt-8">
                    <div className="space-y-2">
                      <label className="font-medium">
                        Template Name <span className="text-[#F00]">*</span>
                      </label>
                      <Input
                        type="text"
                        placeholder="Type assistant name"
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className="text-rose-600">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="font-medium">
                        Template Description{" "}
                        <span className="text-[#F00]">*</span>
                      </label>
                      <Input
                        type="text"
                        placeholder="Type assistant description"
                        {...register("description")}
                      />
                      {errors.description && (
                        <p className="text-rose-600">
                          {errors.description.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="font-medium">
                        Template Category <span className="text-[#F00]">*</span>
                      </label>
                      <Select
                        {...register("category")}
                        defaultValue={assistant.category}
                      >
                        <SelectTrigger className="w-full border-none h-14">
                          <SelectValue>{assistant.category}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Articles And Contents">
                            Articles And Contents
                          </SelectItem>
                          <SelectItem value="Blogs Posts">
                            Blogs Posts
                          </SelectItem>
                          <SelectItem value="Commerce">Commerce</SelectItem>
                          <SelectItem value="Emails">Emails</SelectItem>
                          <SelectItem value="Frameworks">Frameworks</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Social Media">
                            Social Media
                          </SelectItem>
                          <SelectItem value="Academic">Academics</SelectItem>
                          <SelectItem value="Business">Business</SelectItem>
                          <SelectItem value="Websites">Websites</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-rose-600">
                          {errors.category.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="font-medium">
                        Upload Icon <span className="text-[#F00]">*</span>
                      </label>
                      <div
                        {...getRootProps()}
                        className="border-dashed border-2 border-gray-300 p-4"
                      >
                        <input {...getInputProps()} />
                        <p>Drag & drop an image here, or click to select one</p>
                      </div>

                      {iconPreview && (
                        <div className="text-center flex items-center justify-center">
                          <img
                            src={iconPreview}
                            alt="Uploaded icon"
                            className="w-16 h-16 text-center object-contain"
                          />
                        </div>
                      )}

                      {errors.icon && (
                        <p className="text-rose-600">{errors.icon.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2 !mt-8">
                    <label className="font-medium">
                      User input fields <span className="text-[#F00]">*</span>
                    </label>
                    {inputs.map((input, index) => (
                      <div key={index} className="flex gap-4 items-center">
                        <div className="w-full space-y-2">
                          <Input
                            type="text"
                            placeholder="Type input field title (required)"
                            value={input.title}
                            onChange={e =>
                              handleInputChange(index, "title", e.target.value)
                            }
                            className="md:placeholder:text-sm"
                          />
                        </div>
                        <div className="w-full space-y-2">
                          <Select
                            value={input.field_type}
                            onValueChange={value =>
                              handleInputChange(index, "field_type", value)
                            }
                          >
                            <SelectTrigger className="w-full border-none h-14">
                              <SelectValue
                                placeholder={InputFieldType.SHORT_TEXT}
                                className="md:text-sm"
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={InputFieldType.SHORT_TEXT}>
                                Input field
                              </SelectItem>
                              <SelectItem value={InputFieldType.LONG_TEXT}>
                                Textarea field
                              </SelectItem>
                              <SelectItem value={InputFieldType.SELECT_LIST}>
                                Select list field
                              </SelectItem>
                              <SelectItem value={InputFieldType.CHECKBOX}>
                                Checkbox list field
                              </SelectItem>
                              <SelectItem value={InputFieldType.RADIO}>
                                Radio buttons field
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="w-full space-y-2">
                          <Input
                            type="text"
                            placeholder="Type input field description (required)"
                            value={input.description}
                            onChange={e =>
                              handleInputChange(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                            className="md:placeholder:text-sm"
                          />
                        </div>
                        <div className="w-full space-y-2">
                          <Select
                            value={input.required}
                            onValueChange={(value: any) =>
                              handleInputChange(
                                index,
                                "requirement",
                                value == "Required" ? true : false
                              )
                            }
                          >
                            <SelectTrigger className="w-full border-none h-14">
                              <SelectValue
                                placeholder={
                                  input.requirement ? "required" : "optional"
                                }
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Optional">Optional</SelectItem>
                              <SelectItem value="Required">Required</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {inputs.length > 1 && (
                          <button
                            type="button"
                            className="bg-red-500 text-white py-3 px-4 hover:bg-opacity-90 rounded-l-3xl rounded-r-lg"
                            onClick={() => removeUserInput(index)}
                          >
                            <Minus />
                          </button>
                        )}

                        {index === inputs.length - 1 && index > 0 && (
                          <button
                            type="button"
                            className="bg-[#2DA771] text-white py-3 px-4 hover:bg-opacity-90 rounded-l-3xl rounded-r-lg"
                            onClick={addUserInput}
                          >
                            <Plus />
                          </button>
                        )}
                        {inputs.length === 1 && (
                          <button
                            type="button"
                            className="bg-[#2DA771] text-white py-3 px-4 hover:bg-opacity-90 rounded-l-3xl rounded-r-lg"
                            onClick={addUserInput}
                          >
                            <Plus />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <label className="font-medium">
                      Custom Prompt <span className="text-[#F00]">*</span>
                    </label>
                    <textarea
                      placeholder="Type custom prompt"
                      className="h-60 block w-full rounded-2xl bg-[#F5F5F5] p-4 resize-none"
                      {...register("custom_prompt")}
                    />
                    {errors.custom_prompt && (
                      <p className="text-rose-600">
                        {errors.custom_prompt.message}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end gap-x-3 !mt-8">
                    <DialogClose>
                      <button className="border text-primary-black px-8 py-4 rounded-xl flex items-center gap-2 md:px-6 md:py-3 md:text-sm">
                        Cancel
                      </button>
                    </DialogClose>
                    <button
                      className="bg-[#2DA771] text-white sheen transition duration-500 px-8 py-4 rounded-xl flex items-center gap-2 md:px-6 md:py-3 md:text-sm"
                      disabled={isPending}
                    >
                      {isPending ? "Updating..." : "Update Assistant"}
                    </button>
                  </div>
                </div>
              </form>
            </section>
          )
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditAssistantDialog;
