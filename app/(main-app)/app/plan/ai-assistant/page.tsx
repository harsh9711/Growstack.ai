"use client";
import { useState, useEffect, Fragment } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AssistantCard from "./components/AssistantCard";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import { Assistant } from "./components/types";
import toast from "react-hot-toast";
import ContentLoader from "react-content-loader";

export default function AiAssistants() {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await instance.get(`/ai/api/v1/assistant?category=${selectedRole}`);
        setAssistants(response.data.data);
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedRole]);

  return (
    <Fragment>
      <main className="flex-1 h-full flex flex-col">
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
                <SelectItem value=" ">All</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Regular Use">Regular Use</SelectItem>
                <SelectItem value="Analytics">Analytics</SelectItem>
                <SelectItem value="Research & Strategy">Research & Strategy</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="Customer success">Customer success</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Fun">Fun</SelectItem>
                <SelectItem value="Tech">Tech</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {loading ? (
          <div className="grid grid-cols-6 gap-6 mt-6">
            {Array(15)
              .fill(null)
              .map((_, index) => (
                <AiAssistantSkeletonLoader key={index} />
              ))}
          </div>
        ) : assistants.length < 1 ? (
          <div className="flex flex-col items-center justify-center mt-20 space-y-3">
            <h1 className="text-xl font-semibold">Oops!</h1>
            <h2>
              No assistants with the selected category <span className="font-semibold">"{selectedRole}"</span> found
            </h2>
            <button onClick={() => setSelectedRole("")} className="text-white bg-primary-green h-12 w-40 rounded-xl !mt-7 sheen transition-all duration-300">
              Explore all
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-6 gap-3 mt-6">
            {assistants.map((assistant, index) => (
              <AssistantCard {...assistant} key={index} />
            ))}
          </div>
        )}
      </main>
    </Fragment>
  );
}

const AiAssistantSkeletonLoader: React.FC = () => {
  return (
    <ContentLoader speed={3} width="100%" height="260px" backgroundColor="#f3f3f3" foregroundColor="#ecebeb" className="w-full">
      <rect x="0" y="0" rx="10" ry="10" width="100%" height="200" />
      <rect x="0" y="210" rx="8" ry="8" width="100%" height="50" />
    </ContentLoader>
  );
};
