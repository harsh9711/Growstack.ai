"use client";

import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, ChevronRight, Download, Info, Languages, Save } from "lucide-react";
import Link from "next/link";
import { BsStarFill } from "react-icons/bs";
import Editor from "./components/Editor";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/lib/api";

const Dropdown = ({ label, items, infoIcon, hideLabel, value, onChange }: any) => (
  <div className="space-y-3">
    {!hideLabel && (
      <h2 className="font-medium flex items-center gap-2">
        {label} {!!infoIcon ? <Info size={18} className="text-primary-black text-opacity-50" /> : null}
      </h2>
    )}
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full border-none">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item: any, index: number) => (
          <SelectItem value={item} key={index}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default function AiAppPage({ params: { assistantId } }: { params: { assistantId: string } }) {
  const [assistant, setAssistant] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [userInput, setUserInput] = useState({
    user_prompt: "",
    language:"english",
    model: "gpt-3.5",
    creativity: "Original",
    tone_of_voice: "Casual",
    number_of_results: 1,
    estimated_result_length: 400,
  });

  useEffect(() => {
    const fetchAssistant = async () => {
      try {
        const assistId = window.location.href.split('/').pop();
        const response = await axios.get(`${API_URL}/ai/api/v1/chat-template/${assistId}`);
        const assistantData = response.data.data;
        setAssistant(assistantData);
      } catch (error) {
        console.error("Error fetching assistant data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssistant();
  }, [assistantId]);

  const handleSubmit = async () => {
    console.log(userInput);
    try {
      const response = await axios.get(
        `${API_URL}/ai/api/v1/chat-template/generate/${assistant._id}`,
        {
          params: userInput, // Pass userInput as query parameters
        }
      );
      console.log("Generated Data:", response.data);
      // Handle response data, display results, etc.
    } catch (error) {
      console.error("Error generating template:", error);
    }
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleDropdownChange = (name: any, value: any) => {
    setUserInput((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <div className="flex items-center justify-between mt-10">
        <p className="flex items-center gap-2 text-[#4B465C] text-opacity-50 text-[15px]">
          <Link href="/app/plan/ai-apps" className="hover:text-gray-600 transition-all">
            All apps
          </Link>
          <ChevronRight size={20} /> <span className="text-[#3D817B] font-medium">{assistant.name}</span>
        </p>
        <Link href="/app/plan/ai-apps">
          <button className="text-primary-green hover:bg-primary-green/10 sheen flex gap-2 px-3.5 py-2.5 rounded-full font-semibold items-center">
            <ArrowLeft size={20} /> Back
          </button>
        </Link>
      </div>
      <div className="flex gap-5 mt-6">
        <div className="w-full max-w-[600px] p-8 bg-white rounded-2xl border border-[#EDEFF0] space-y-4">
          <div className="mb-5 border-b border-[#EDEFF0]">
            <div className="flex items-center justify-between pb-5">
              <div className="flex items-center gap-3">
                <img src={assistant.icon} alt="" className="rounded w-[34px] h-[34px]" />
                <h2 className="text-2xl font-semibold capitalize">{assistant.name}</h2>
              </div>
              <BsStarFill size={24} className="text-yellow-300" />
            </div>
            <p className="mb-5 text-md">{assistant.description}</p>
          </div>
          <div className="mb-5 space-y-6">
            <p className="flex items-center gap-2 bg-[#F2F2F2] p-4 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                <path
                  d="M8.63825 1.48828H15.3662L11.117 7.50803H15.3662L5.23886 18.7685L8.70907 11.1199H4.88477L8.63825 1.48828Z"
                  fill="#F9DE6F"
                  stroke="#F9DE6F"
                  strokeWidth="0.791016"
                  strokeMiterlimit="10"
                />
              </svg>
              <span className="text-sm">
                <span>Your balance is </span>
                <span className="font-semibold">Unlimited GPT 3.5 Turbo Words</span>
              </span>
            </p>
            <div className="flex items-center gap-2">
              <Switch />
              <label htmlFor="include-brand" className="text-sm">
                Include your brand
              </label>
            </div>
          </div>
          <div>
            <Dropdown
              label="Language"
              items={["English (USA)", "Spanish", "French"]}
              value={userInput.language}
              onChange={(value: any) => handleDropdownChange("language", value)}
            />
          </div>
          <div className="space-y-3">
            <label className="font-medium flex justify-between" htmlFor="newsletter-description">
              {assistant.inputs[0]?.title}
              <span className="text-primary-black text-opacity-50 text-sm">0/2000</span>
            </label>
            <textarea
              id="newsletter-description"
              rows={4}
              className="w-full p-4 rounded-xl resize-none bg-[#F2F2F2]"
              placeholder={assistant.inputs[0]?.description}
              name="user_prompt"
              value={userInput.user_prompt}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <Dropdown
              label="AI Model"
              items={["GPT 3.5 Turbo", "GPT 3", "GPT 2.5"]}
              value={userInput.model}
              onChange={(value: any) => handleDropdownChange("model", value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Dropdown
              label="Creativity"
              infoIcon
              items={["Original", "Creative"]}
              value={userInput.creativity}
              onChange={(value: any) => handleDropdownChange("creativity", value)}
            />
            <Dropdown
              label="Tone of Voice"
              infoIcon
              items={["Professional", "Friendly", "Casual"]}
              value={userInput.tone_of_voice}
              onChange={(value: any) => handleDropdownChange("tone_of_voice", value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block mb-2 text-sm font-medium" htmlFor="number-of-results">
                Number of Results
              </label>
              <Input
                type="number"
                id="number-of-results"
                name="number_of_results"
                value={userInput.number_of_results}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium" htmlFor="estimated-result-length">
                Estimated Result Length
              </label>
              <Input
                type="number"
                id="estimated-result-length"
                name="estimated_result_length"
                value={userInput.estimated_result_length}
                onChange={handleChange}
              />
            </div>
          </div>
          <button className="w-full h-14 py-2 text-white bg-primary-green rounded-lg !mt-5" onClick={handleSubmit}>
            Generate Template
          </button>
        </div>
        <div className="w-full p-8 bg-white rounded-2xl border border-[#EDEFF0] flex flex-col">
          <div className="flex items-center justify-between mb-5 border-b pb-5">
            <div className="flex items-center gap-2 w-full max-w-fit">
              <Input placeholder="New Document" />
              <Select>
                <SelectTrigger className="w-full border-none">
                  <SelectValue placeholder="All Workbooks" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Workbook">All Workbook</SelectItem>
                  <SelectItem value="Workbook 1">Workbook 1</SelectItem>
                  <SelectItem value="Workbook 2">Workbook 2</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-2 whitespace-nowrap">
                <Switch />
                <label htmlFor="include-brand" className="text-sm text-[#6E7687]">
                  Internet Access
                </label>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <button className="p-2 bg-gray-100 border rounded-lg">
                  <Download size={20} className="text-gray-600" />
                </button>
                <button className="p-2 bg-gray-100 border rounded-lg">
                  <Save size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <Editor />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
