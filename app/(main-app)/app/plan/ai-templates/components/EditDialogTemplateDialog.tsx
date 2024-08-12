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
import { Edit, Edit2, Minus, Plus } from "lucide-react";
import { Assistant } from "@/types/assistants";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";

type UserInput = {
  title: string;
  description: string;
  type: string;
  icon: string;
  required: string;
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

const EditAssistantDialog = ({ id }: { id: string }) => {
  const router = useRouter();
  const [assistant, setAssistant] = useState<Assistant | null>(null);
  const [inputs, setinputs] = useState<UserInput[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [title, setTitle] = useState("");
  const [idescription, setIdescription] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(ValidationSchema),
  });

  useEffect(() => {
    if (id) {
      const fetchAssistant = async () => {
        try {
          const response = await instance.get(
            `${API_URL}/ai/api/v1/chat-template/${id}`
          );
          const assistantData = response.data.data;

          // Set assistant and inputs states
          setAssistant(assistantData);
          setIsLoading(true);
          setinputs(assistantData.inputs || []);

          // Reset form with fetched data
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
        } catch (error) {
          console.error("Error fetching assistant:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchAssistant();
    }
  }, [id, reset]);

  const addUserInput = () => {
    setinputs((prevInputs) => [
      ...prevInputs,
      { title: "", description: "", type: "", required: "Optional", icon: "" },
    ]);
  };

  const removeUserInput = (index: number) => {
    setinputs((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs.splice(index, 1);
      return updatedInputs;
    });
  };

  const handleInputChange = (
    index: number,
    key: keyof UserInput,
    value: string
  ) => {
    setinputs((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs[index][key] = value;
      return updatedInputs;
    });
  };

  const handleUpdate: SubmitHandler<ValidationSchemaType> = async (data) => {
    setIsPending(true);
    try {
      const changedFields: Partial<Assistant> = {
        name: data.name,
        description: data.description,
        icon: data.icon,
        custom_prompt: data.custom_prompt,
        category: data.category,
        title: data.title, // Include title in changedFields
        inputs, // Ensure inputs are included
      };
      await instance.put(
        `${API_URL}/ai/api/v1/chat-template/${id}`,
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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleIdescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdescription(e.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-300">
          <Edit size={20} />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[1800px]">
        <h1 className="text-2xl font-semibold">Edit Assistant</h1>
        {isLoading ? (
          <section className="grid place-content-center h-[40vh]">Loading...</section>
        ) : (
          assistant && (
            <section className="bg-white rounded-3xl mt-5">
              <form onSubmit={handleSubmit(handleUpdate)}>
                <div className="space-y-5">
                  <h1 className="text-xl font-semibold flex items-center gap-2">Assistant Editor</h1>
                  <div className="grid grid-cols-2 gap-8 border-t border-[#EBEBEB] pb-4 pt-8">
                    <div className="space-y-2">
                      <label className="font-medium">
                        Template Name <span className="text-[#F00]">*</span>
                      </label>
                      <Input type="text" placeholder="Type assistant name" {...register("name")} />
                      {errors.name && <p className="text-rose-600">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="font-medium">
                        Template Description <span className="text-[#F00]">*</span>
                      </label>
                      <Input type="text" placeholder="Type assistant description" {...register("description")} />
                      {errors.description && <p className="text-rose-600">{errors.description.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="font-medium">
                        Template Category <span className="text-[#F00]">*</span>
                      </label>
                      <Select {...register("category")} defaultValue={assistant.category}>
                        <SelectTrigger className="w-full border-none h-14">
                          <SelectValue>{assistant.category}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Articles And Contents">Articles And Contents</SelectItem>
                          <SelectItem value="Blogs Posts">Blogs Posts</SelectItem>
                          <SelectItem value="Commerce">Commerce</SelectItem>
                          <SelectItem value="Emails">Emails</SelectItem>
                          <SelectItem value="Frameworks">Frameworks</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Social Media">Social Media</SelectItem>
                          <SelectItem value="Websites">Websites</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.category && <p className="text-rose-600">{errors.category.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="font-medium">
                        Template Icon <span className="text-[#F00]">*</span>
                      </label>
                      <Input type="text" placeholder="Type assistant icon" {...register("icon")} />
                      {errors.icon && <p className="text-rose-600">{errors.icon.message}</p>}
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
                            onChange={(e) => handleInputChange(index, "title", e.target.value)}
                          />
                        </div>
                        <div className="w-full space-y-2">
                          <Input
                            type="text"
                            placeholder="Type input field description (required)"
                            value={input.description}
                            onChange={(e) => handleInputChange(index, "description", e.target.value)}
                          />
                        </div>
                        <div className="w-full space-y-2">
                          <Select value={input.type} onValueChange={(value) => handleInputChange(index, "type", value)}>
                            <SelectTrigger className="w-full border-none h-14">
                              <SelectValue placeholder="Input field" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Input field">Input field</SelectItem>
                              <SelectItem value="Textarea field">Textarea field</SelectItem>
                              <SelectItem value="Select list field">Select list field</SelectItem>
                              <SelectItem value="Checkbox list field">Checkbox list field</SelectItem>
                              <SelectItem value="Radio buttons field">Radio buttons field</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="w-full space-y-2">
                          <Select value={input.required} onValueChange={(value) => handleInputChange(index, "required", value)}>
                            <SelectTrigger className="w-full border-none h-14">
                              <SelectValue placeholder="Optional" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Optional">Optional</SelectItem>
                              <SelectItem value="Required">Required</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {index === inputs.length - 1 ? (
                          <button
                            type="button"
                            className="bg-primary-green text-white py-3 px-4 hover:bg-opacity-90 rounded-l-3xl rounded-r-lg"
                            onClick={addUserInput}>
                            <Plus />
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="bg-red-500 text-white py-3 px-4 hover:bg-opacity-90 rounded-l-3xl rounded-r-lg"
                            onClick={() => removeUserInput(index)}>
                            <Minus />
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
                    {errors.custom_prompt && <p className="text-rose-600">{errors.custom_prompt.message}</p>}
                  </div>
                  <div className="flex justify-end gap-x-3 !mt-8">
                    <DialogClose>
                      <button className="border text-primary-black px-8 py-4 rounded-xl flex items-center gap-2">Cancel</button>
                    </DialogClose>
                    <button
                      className="bg-primary-green text-white sheen transition duration-500 px-8 py-4 rounded-xl flex items-center gap-2"
                      disabled={isPending}>
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
