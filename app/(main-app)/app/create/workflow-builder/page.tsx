"use client";

import { WorkflowsIcon, WorkflowsIcon2 } from "@/components/svgs";
import { API_URL } from "@/lib/api";
import axios from "axios";
import { Plus, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

export default function WorkflowBuilder() {
  const [workflowId, setWorkflowId] = useState(null);
  const router = useRouter();
  const createWorkflow = async () => {
    try {
      const response = await axios.post(`${API_URL}/workflow/api/v1`);
      const newWorkflowId = response.data.data.workflow_id;
      console.log('Workflow created successfully:', newWorkflowId);
      setWorkflowId(newWorkflowId);
      router.push(`/app/create/workflow-builder/create-workflow?workflow_id=${newWorkflowId}`);
    } catch (error) {
      console.error('Error creating workflow:', error);
      // Handle error (e.g., show an error message)
    }
  };
  return (
    <Fragment>
      <main className="">
        <div className="flex justify-between items-center mt-10">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">Get started</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
              Explore pre-built templates, create a new workflow, or import an existing one.
            </p>
          </div>
        </div>
        <div className="mt-10">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
           <Link href="/app/create/workflow-builder/seo-blog-writer"> 
           <Card
              title="SEO blog writer"
              description="Automate the entire process from keyword research to content creation, you can produce high-quality, search engine-friendly ..."
              imageSrc="/assets/workflow-assets1.svg"
            /></Link>
            <Card
              title="Research lead & generate personalized email"
              description="Personalize outreach of a new lead. This workflow uses GPT, Google Search, and LinkedIn ..."
              imageSrc="/assets/workflow-assets2.svg"
            />
            <Card
              title="Convert Youtube videos into blog posts in your brand voice"
              description="Convert webinars, tutorials, or any Youtube video into SEO-optimized blog posts..."
              imageSrc="/assets/workflow-assets3.svg"
            />
            <Card
              title="SEO keyword research"
              description="Find untapped SEO ranking potential for your website or blog with our SEO keyword research agent. This workflow researches your..."
              imageSrc="/assets/workflow-assets4.svg"
            />
          </div>
          <div className="mt-10">
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
                      Create workflow
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
          </div>
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
  <div className="p-8 bg-white rounded-3xl border border-[#E8E8E8] hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 cursor-pointer space-y-4">
    <Image src={imageSrc} alt={title} width={400} height={400} className="w-full h-32 object-cover rounded-" />
    <h3 className="text-xl font-semibold leading-relaxed">{title}</h3>
    <p className="!mt-3 leading-relaxed text-primary-black text-opacity-70">{description}</p>
  </div>
);
