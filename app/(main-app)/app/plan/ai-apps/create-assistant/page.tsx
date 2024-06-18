"use client"
import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AssistantsTable from "../components/AssistantsDataTable";
import { API_URL } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Plus } from "lucide-react";

export default function CreateAssistantPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    icon: "",
    custom_prompt: "",
  });
  const ValidationSchema = z.object({
    name: z.string().email("Please enter a valid email address"),
    description: z.string().min(8, "Password must be at least 8 characters").max(20, "Password can't exceed 20 characters"),
  });
  const [isPending, setIsPending] = useState(false);

  type ValidationSchemaType = z.infer<typeof ValidationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchemaType>({ resolver: zodResolver(ValidationSchema) });
  
  const onSubmit: SubmitHandler<ValidationSchemaType> = async (data) => {
    setIsPending(true);
    try {
      const { name,description } = data;
      const response = await axios.post(API_URL + "/ai/api/v1/chat-template/create", {  name,description  });
      toast.success(response.data.message);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error("Login failed:", error);
    } finally {
      setIsPending(false);
    }
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mt-5">Create your own assistant</h1>
      <section className="bg-white border border-[#E4E4E4] rounded-3xl p-10 mt-5">
       
        <div className="space-y-5">
          <h1 className="text-xl font-semibold flex items-center gap-2">
            Own assistant generator
          </h1>
          <div className="grid grid-cols-2 gap-8 border-t border-[#EBEBEB] pb-4 pt-8">
            <div className="space-y-2">
              <label className="font-medium">
                Template name<span className="text-[#F00]">*</span>
              </label>
              <Input
                type="text"
                placeholder="Type template name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <label className="font-medium">
                Template description <span className="text-[#F00]">*</span>
              </label>
              <Input
                type="text"
                placeholder="Type template description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="font-medium">
                Template category <span className="text-[#F00]">*</span>
              </label>
              <Select>
                <SelectTrigger className="w-full border-none h-14">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="font-medium">
                Template icon <span className="text-[#F00]">*</span>
              </label>
              <Input
                type="text"
                placeholder="ex:<i class=’fa-solid fa-books’></i>"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="font-medium">
              User input fields <span className="text-[#F00]">*</span>
            </label>
            <div className="flex gap-4 items-center">
              <div className="w-full space-y-2">
                <Input type="text" placeholder="Type input field title (required)" />
              </div>
              <div className="w-full space-y-2">
                <Input type="text" placeholder="Type input field description (required)" />
              </div>
              <div className="w-full space-y-2">
                <Select>
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
                </Select>{" "}
              </div>
              <div className="w-full space-y-2">
                <Select>
                  <SelectTrigger className="w-full border-none h-14">
                    <SelectValue placeholder="Optional" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Optional">Optional</SelectItem>
                    <SelectItem value="Required">Required</SelectItem>
                  </SelectContent>
                </Select>{" "}
              </div>
              <button className="bg-primary-green text-white py-3 px-4 hover:bg-opacity-90 rounded-l-3xl rounded-r-lg">
                <Plus />
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="font-medium">
              Custom prompt <span className="text-[#F00]">*</span>
            </label>
            <textarea
              placeholder="Type your custom prompt"
              className="h-[200px] w-full bg-[#F2F2F2] rounded-2xl p-3 resize-none"
              name="custom_prompt"
              value={formData.custom_prompt}
              onChange={handleChange}
            />
          </div>
        </div>
  
        <div className="flex justify-end gap-4">
          <button
            className="py-3.5 px-6 bg-primary-green sheen rounded-xl text-white mt-6"
            onSubmit={handleSubmit(onSubmit)}   
          >
            Create your own assistant
          </button>
        </div>
      </section>
      <section className="bg-white border border-[#E4E4E4] rounded-3xl p-10 mt-7">
        <AssistantsTable />
      </section>
    </div>
  );
}
