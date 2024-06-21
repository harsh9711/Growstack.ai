"use client";
import { Assistant } from "@/types/assistants";
import { useState } from "react";
import axios from "axios"; // Added axios import
import { API_URL } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Minus, Plus } from "lucide-react";
import AssistantsTable from "../AssistantsDataTable";
export default function CreateAssistantPageEdit() {
  type UserInput = {
    title: string;
    description: string;
    type: string;
    required: string;
    };
    const [userInputs, setUserInputs] = useState<UserInput[]>([
      { title: "", description: "", type: "", required: "Optional" },
      ]);
      const addUserInput = () => {
      setUserInputs((prevInputs) => [
      ...prevInputs,
      { title: "", description: "", type: "", required: "Optional" },
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
    name: "",
    description: "",
    icon: "",
    custom_prompt: "",
  });

  const [category, setCategory] = useState("");

  const ValidationSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(200, "Description can't exceed 200 characters"),
  });

  const [isPending, setIsPending] = useState(false);

  type ValidationSchemaType = z.infer<typeof ValidationSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(ValidationSchema),
  });

  const [assistants, setAssistants] = useState<Assistant[]>([]); // Initialize with an empty array

  const onSubmit: SubmitHandler<ValidationSchemaType> = async (data) => {
    setIsPending(true);
    try {
      const { name, description, icon, custom_prompt } = formData;

      const response = await axios.post(   ///put
        `${API_URL}/ai/api/v1/chat-template/create`,
        {
          name,
          description,
          icon,
          custom_prompt,
          category,
        }
      );

      toast.success(response.data.message);

      // Update assistants state after successful creation
      setAssistants((prevAssistants) => [
        ...prevAssistants,
        {
          name,
          description,
          status: "active", // Assuming default status
          created_on: {
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
          },
        },
      ]);

      // Clear form data after submission
      setFormData({
        name: "",
        description: "",
        icon: "",
        custom_prompt: "",
      });
      setCategory(""); // Clear category after submission
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };
const handleInputChange = (
index: number,
key: keyof UserInput,
value: string
) => {
setUserInputs((prevInputs) => {
const updatedInputs = [...prevInputs];
updatedInputs[index][key] = value;
return updatedInputs;
});
};
  return (
    <div>
      <h1 className="text-2xl font-semibold mt-5">Create your own assistant</h1>
      <section className="bg-white border border-[#E4E4E4] rounded-3xl p-10 mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  {...register("name")}
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <p>{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="font-medium">
                  Template description{" "}
                  <span className="text-[#F00]">*</span>
                </label>
                <Input
                  type="text"
                  placeholder="Type template description"
                  {...register("description")}
                  value={formData.description}
                  onChange={handleChange}
                />
                {errors.description && (
                  <p>{errors.description.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="font-medium">
                  Template category{" "}
                  <span className="text-[#F00]">*</span>
                </label>
                <Select onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-full border-none h-14">
                    <SelectValue placeholder={category ? category : "Select a category"} />
                  </SelectTrigger>Z
                  <SelectContent>
                    <SelectItem value="Articles And Contents">Articles And Contents</SelectItem>
                    <SelectItem value="Blogs Posts">Blogs Posts</SelectItem>
                    <SelectItem value="Commerce">Commerce</SelectItem>
                    <SelectItem value="Emails">Emails</SelectItem>
                    <SelectItem value="Frameworks">Frameworks</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>  
                    <SelectItem value="Social Media">Social Media</SelectItem>
                    <SelectItem value="Social Media">Websites</SelectItem>
   </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="font-medium">
                  Template icon{" "}
                  <span className="text-[#F00]">*</span>
                </label>
                <Input
                  type="text"
                  placeholder='ex:<i class=”fa-solid fa-books”></i>'
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="space-y-2 !mt-8">
            <label className="font-medium">
                User input fields{" "}
                <span className="text-[#F00]">*</span>
              </label>
        
              {userInputs.map((input, index) => (
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
              <Select
                value={input.type}
                onValueChange={(value) => handleInputChange(index, "type", value)}
              >
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
              <Select
                value={input.required}
                onValueChange={(value) => handleInputChange(index, "required", value)}
              >
                <SelectTrigger className="w-full border-none h-14">
                  <SelectValue placeholder="Optional" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Optional">Optional</SelectItem>
                  <SelectItem value="Required">Required</SelectItem>
                </SelectContent>
              </Select>{" "}
            </div>
            {index === userInputs.length - 1 ? (
              <button
                className="bg-primary-green text-white py-3 px-4 hover:bg-opacity-90 rounded-l-3xl rounded-r-lg"
                onClick={addUserInput}
              >
                <Plus />
              </button>
            ) : (
              <button
                className="bg-red-500 text-white py-3 px-4 hover:bg-opacity-90 rounded-l-3xl rounded-r-lg"
                onClick={() => removeUserInput(index)}
              >
                <Minus />
              </button>
            )}
          </div>
        ))}
  
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
              type="submit"
            >
              Create your own assistant
            </button>
          </div>
        </form>
      </section>
    
    </div>
  );
}
