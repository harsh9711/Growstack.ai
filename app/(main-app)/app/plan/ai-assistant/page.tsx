"use client";
import { useState, useEffect, Fragment } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AssistantCard from "./components/AssistantCard";
import axios from "axios";
import { API_URL } from "@/lib/api";
import { Assistant } from "./types";


export default function AiAssistants() {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${API_URL}/ai/api/v1/assistant?role=${selectedRole}`;
        console.log("Fetching data from:", url); // Log the constructed URL for debugging
        const response = await axios.get(url);
        console.log("Response data:", response.data); // Log the response data
        setAssistants(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedRole]);

  return (
    <Fragment>
      <main className="">
        <div className="flex justify-between items-center mt-8">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">AI assistant</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">Chat with our AI team</p>
          </div>
          <Select onValueChange={setSelectedRole}>
            <SelectTrigger className="w-[250px] bg-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="UI/UX Designer">UI/UX Designer</SelectItem>
                <SelectItem value="Frontend Developer">Frontend Developer</SelectItem>
                <SelectItem value="Backend Developer">Backend Developer</SelectItem>
                <SelectItem value="Project Manager">Project Manager</SelectItem>
                <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                <SelectItem value="DevOps Engineer">DevOps Engineer</SelectItem>
                <SelectItem value="QA Engineer">QA Engineer</SelectItem>
                <SelectItem value="Product Manager">Product Manager</SelectItem>
                <SelectItem value="Business Analyst">Business Analyst</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-6 gap-3 mt-6">
          {assistants.map((assistant, index) => (
            <AssistantCard {...assistant} key={index} />
          ))}
        </div>
      </main>
    </Fragment>
  );
}
