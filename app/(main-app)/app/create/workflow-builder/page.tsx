"use client";

import { WorkflowsIcon, WorkflowsIcon2 } from "@/components/svgs";
import { API_URL } from "@/lib/api";
import instance from "@/config/axios.config";
import { Plus, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useState, useEffect } from "react";
import WorkflowLoader from "./components/WorkflowLoader";

type PreBuiltTemplate = {
  _id: number;
  name: string;
  description: string;
  image: string;
  workflow_id: string;
  slug: string;
};

export default function WorkflowBuilder() {
  const [workflowId, setWorkflowId] = useState(null);
  const [preBuiltTemplates, setPreBuiltTemplates] = useState<PreBuiltTemplate[]>([]);
  const router = useRouter();
  const getPreBuiltTemplates = async () => {
    try {
      const response = await instance.get(`${API_URL}/workflow/api/v1?pre_built=true`);
      setPreBuiltTemplates(response.data.data);
    } catch (error) {
      console.error("Error fetching pre-built templates:", error);
    }
  };

  useEffect(() => {
    getPreBuiltTemplates();
  }, []);
  return (
    <Fragment>
      <main className="">
        <div className="flex justify-between items-center mt-10">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">Get started</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
              Explore pre-built templates, create a new workflow, or import an existing one.
            </p>
          </div>
          <Link href="/app/create/workflow-builder/workflows">
            <button className="bg-primary-green text-white sheen transition duration-500 px-5 py-4 rounded-xl flex items-center gap-2">
              Explore your workflows
            </button>
          </Link>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {preBuiltTemplates.length > 0
              ? preBuiltTemplates.map((template) => (
                  <Link key={template._id} href={`/app/create/workflow-builder/workflows/${template.slug || "template-workflow"}?workflow_id=${template.workflow_id}`}>
                    <Card title={template.name} description={template.description} imageSrc={template.image} />
                  </Link>
                ))
              : Array(5)
                  .fill(null)
                  .map((_, index) => <WorkflowLoader key={index} />)}
          </div>
          {/* <div className="mt-10">
            <div className="flex items-center gap-4">
              <h2 className="text-[16px] text-primary-black">Or build your own</h2>
              <div className="h-[1px] w-full flex-1 bg-gray-200" />
            </div>
            <div className="flex gap-4 mt-8">
              <div className="w-full p-7 bg-white rounded-3xl border border-[#E8E8E8] space-y-4">
                <div className="bg-[#E8E8E8] p-3.5 rounded-2xl max-w-fit">
                  <WorkflowsIcon className="w-7 h-7" />
                </div>
                <div className="flex justify-between">
                  <div className="space-y-2.5">
                    <h1 className="text-xl font-semibold">New blank workflow</h1>
                    <p>Design a new workflow from scratch.</p>
                  </div>
                  <Link href="/app/create/workflow-builder/create-workflow">
                    <button
                     onClick={createWorkflow} className="bg-primary-green text-white sheen transition duration-500 px-5 py-4 rounded-xl flex items-center gap-2">
                      <Plus size={20} />
                      Eplore your workflows
                    </button>
                  </Link>
                </div>
              </div>
              <div className="w-full p-7 bg-white rounded-3xl border border-[#E8E8E8] space-y-4">
                <div className="bg-[#E8E8E8] p-3.5 rounded-2xl max-w-fit">
                  <WorkflowsIcon2 className="w-7 h-7" />
                </div>
                <div className="flex justify-between">
                  <div className="space-y-2.5">
                    <h1 className="text-xl font-semibold">Import existing workflow</h1>
                    <p>Import or export your workflow in JSON format in the Editor.</p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </main>
    </Fragment>
  );
}

type CardProps = {
  title: string;
  description: string;
  imageSrc: string;
};

const Card: React.FC<CardProps> = ({ title, description, imageSrc }) => (
  <div className="p-8 bg-white rounded-3xl border border-[#E8E8E8] hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 cursor-pointer space-y-4 min-h-[300px]">
    <Image src={imageSrc} alt={title} width={400} height={400} className="w-full h-32 object-cover rounded-xl" />
    <h3 className="text-xl font-semibold leading-relaxed line-clamp-1 text-ellipsis overflow-hidden" title={title}>
      {title}
    </h3>
    <p className="!mt-3 leading-relaxed text-primary-black text-opacity-70 line-clamp-2 text-ellipsis overflow-hidden">{description}</p>
  </div>
);
