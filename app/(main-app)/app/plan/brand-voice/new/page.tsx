"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ChevronRight, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { TbTemplate } from "react-icons/tb";

const tone_options = [
  "Professional",
  "Exciting",
  "Friendly",
  "Witty",
  "Humorous",
  "Convincing",
  "Empathetic",
  "Inspiring",
  "Supportive",
  "Trusting",
  "Playful",
  "Excited",
  "Positive",
  "Negative",
  "Engaging",
  "Worried",
  "Urgent",
  "Passionate",
  "Informative",
  "Funny",
];
const product_options = ["Product", "Service", "Other"];
interface FormField {
  name: string;
  description: string;
  type: string;
}

const NewBrandVoice = () => {
  const [formFields, setFormFields] = useState<FormField[]>([{ name: "", description: "", type: "Product" }]);
  const handleInputChange = (index: number, field: keyof FormField, value: string) => {
    const newFormFields = [...formFields];
    newFormFields[index][field] = value;
    setFormFields(newFormFields);
  };

  const addField = () => {
    setFormFields([...formFields, { name: "", description: "", type: "Product" }]);
  };

  const removeField = (index: number) => {
    setFormFields((prevInputs) => {
      const updatedInputs = [...prevInputs];
      updatedInputs.splice(index, 1);
      return updatedInputs;
    });
  };
  return (
    <main className="space-y-7">
      <div className="flex items-center justify-between mt-10">
        <p className="flex items-center gap-2 text-[#4B465C] text-opacity-50 text-[15px]">
          <Link href="/app/plan/brand-voice" className="hover:text-gray-600 transition-all">
            Brand voice
          </Link>
          <ChevronRight size={20} /> <span className="text-[#3D817B] font-medium">New brand voice</span>
        </p>
        <Link href="/app/plan/brand-voice">
          <button className="text-primary-green hover:bg-primary-green/10 sheen flex gap-2 px-3.5 py-2.5 rounded-full font-semibold items-center">
            <ArrowLeft size={20} /> Back
          </button>
        </Link>
      </div>
      <h1 className="text-lg font-semibold">New brand voice</h1>
      <section className="bg-white rounded-3xl p-6 border">
        <form>
          <div className="space-y-5">
            <h1 className="text-xl font-semibold flex items-center gap-2">
              <TbTemplate /> Brand information
            </h1>
            <div className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-[#EBEBEB] pb-4 pt-8">
              <div className="space-y-2">
                <label className="font-medium">
                  Company / Brand name <span className="text-[#F00]">*</span>
                </label>
                <Input type="text" placeholder="Provide company / brand name" />
              </div>
              <div className="space-y-2">
                <label className="font-medium">
                  Website <span className="text-[#F00]">*</span>
                </label>
                <Input type="url" placeholder="Add company website URL" />
              </div>
              <div className="space-y-2">
                <label className="font-medium">
                  Industry <span className="text-[#F00]">*</span>
                </label>
                <Input type="text" placeholder="List your company / brand industries that you focus on" />
              </div>
              <div className="space-y-2">
                <label className="font-medium">
                  Tagline <span className="text-[#F00]">*</span>
                </label>
                <Input type="text" placeholder="Provide a catchy tagline for your company / brand" />
              </div>

              <div className="space-y-2">
                <label className="font-medium">
                  Target audience <span className="text-[#F00]">*</span>
                </label>
                <Input type="text" placeholder="Describe the primary target audience for your company / brand" />
              </div>
              <div className="space-y-2">
                <label className="font-medium">
                  Tone of voice <span className="text-[#F00]">*</span>
                </label>
                <Select onValueChange={(value) => {}} defaultValue={tone_options[0]}>
                  <SelectTrigger className="w-full border-none h-14">
                    <SelectValue placeholder="Input field" />
                  </SelectTrigger>
                  <SelectContent>
                    {tone_options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="font-medium">
                Company / brand description <span className="text-[#F00]">*</span>
              </label>
              <textarea
                className="h-[128px] w-full bg-[#F2F2F2] rounded-xl block resize-none p-4 text-[15px]"
                placeholder="Provide a brief description of your company / brand"></textarea>
            </div>
            <div className="space-y-2 !mt-8">
              <label className="font-medium text-primary-green">Product or services information</label>

              {formFields.map((field, index) => (
                <div key={index} className="flex gap-3">
                  <Input
                    type="text"
                    placeholder="Provide product / service name"
                    value={field.name}
                    onChange={(e) => handleInputChange(index, "name", e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Provide brief product / service description"
                    value={field.description}
                    onChange={(e) => handleInputChange(index, "description", e.target.value)}
                  />
                  <Select value={field.type} defaultValue={product_options[0]} onValueChange={(value) => handleInputChange(index, "type", value)}>
                    <SelectTrigger className="w-full border-none">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {product_options.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {index === formFields.length - 1 ? (
                    <button type="button" className="bg-primary-green text-white py-3 px-4 hover:bg-opacity-90 rounded-l-3xl rounded-r-lg" onClick={addField}>
                      <Plus />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="bg-red-500 text-white py-3 px-4 hover:bg-opacity-90 rounded-l-3xl rounded-r-lg"
                      onClick={() => removeField(index)}>
                      <Minus />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-x-3 !mt-8">
              <button className="bg-primary-green text-white sheen transition duration-500 px-10 py-3.5 rounded-xl flex items-center gap-2">Create</button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default NewBrandVoice;
