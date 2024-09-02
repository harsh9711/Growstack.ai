"use client";

import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import WorkflowLoader from "./components/WorkflowLoader";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react"; // Headless UI for dropdown
import { useRouter } from "next/navigation";
import { BsThreeDotsVertical } from "react-icons/bs";

type PreBuiltTemplate = {
  _id: number;
  name: string;
  description: string;
  image: string;
  workflow_id: string;
  slug: string;
};

export default function WorkflowBuilder() {
  const [preBuiltTemplates, setPreBuiltTemplates] = useState<
    PreBuiltTemplate[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const getPreBuiltTemplates = async () => {
    try {
      const response = await instance.get(
        `${API_URL}/workflow/api/v1?pre_built=true`
      );
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
              Explore pre-built templates, create a new workflow, or import an
              existing one.
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
                  <Card
                    key={template._id}
                    title={template.name}
                    description={template.description}
                    imageSrc={template.image}
                    slug={template.slug}
                    workflow_id={template.workflow_id}
                    setLoading={setLoading}
                  />
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
                      onClick={createWorkflow}
                      className="bg-primary-green text-white sheen transition duration-500 px-5 py-4 rounded-xl flex items-center gap-2"
                    >
                      <Plus size={20} />
                      Explore your workflows
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
        {loading && (
       <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
       <div className="relative w-16 h-16">
         {/* Outer ring */}
         <div className="absolute inset-0 border-4 border-t-4 border-gray-300 rounded-full"></div>
         {/* Inner ring with fill color */}
         <div className="absolute inset-0 border-4 border-t-4 border-t-primary-green border-transparent rounded-full animate-spin"></div>
       </div>
     </div>
        )}
      </main>
    </Fragment>
  );
}

type CardProps = {
  title: string;
  description: string;
  imageSrc: string;
  slug: string;
  workflow_id: string; setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const Card: React.FC<CardProps> = ({ title, description, imageSrc, slug, workflow_id, setLoading }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

 

  const handleDuplicateClick = async () => {
    setIsModalOpen(true);
  };

  const handleConfirmDuplicate = async () => {
    setIsModalOpen(false);
    setLoading(true);
    try {
      const response = await instance.post(
        `${API_URL}/workflow/api/v1/duplicate/${workflow_id}`
      );
      console.log(response.data.data);
      const newWorkflowId = response.data.data.workflow_id;

      if (newWorkflowId) {
        router.push(
          `/app/create/workflow-builder/create-workflow?workflow_id=${newWorkflowId}`
        );
      } else {
        console.error("New workflow ID not found in the response");
      }
    } catch (error) {
      console.error("Error duplicating workflow:", error);
    }finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000); 
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
    className="relative p-5 bg-white rounded-3xl border border-[#E8E8E8] hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 cursor-pointer space-y-4 min-h-[315px]"
    data-aos="fade-up"
  >
    <div className="relative" data-aos="zoom-in">
      <Link
        href={`/app/create/workflow-builder/workflows/${slug}?workflow_id=${workflow_id}`}
        passHref
      >
        <Image
          src={imageSrc}
          alt={title}
          width={400}
          height={400}
          className="w-full h-40 object-cover rounded-xl cursor-pointer"
        />
      </Link>

      <Menu as="div" className="absolute top-2 right-2">
        <MenuButton className="p-2 text-gray-500 hover:text-gray-700">
          <BsThreeDotsVertical className="w-6 h-6" />
        </MenuButton>
        <MenuItems className="absolute right-0 mt-2 w-[105px] bg-white border border-gray-200 rounded-md shadow-lg">
          <MenuItem>
            <button
              className=" px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={handleDuplicateClick}
            >
              Duplicate
            </button>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
    <h3
      className="text-xl font-semibold leading-relaxed line-clamp-1 text-ellipsis overflow-hidden"
      title={title}
      data-aos="fade-left"
    >
      {title}
    </h3>
    <p
      className="!mt-3 leading-relaxed text-primary-black text-opacity-70 line-clamp-2 text-ellipsis overflow-hidden"
      data-aos="fade-right"
    >
      {description}
    </p>

    {/* Modal Component */}
    {isModalOpen && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
        data-aos="fade-in"
      >
        <div className="bg-white p-6 rounded-lg w-80 max-w-lg" data-aos="zoom-in">
          <h2 className="text-lg font-semibold">Confirm Duplicate</h2>
          <p className="mt-2">
            Are you sure you want to duplicate this workflow?
          </p>
          <div className="mt-4 flex justify-end gap-4">
            <button
              className="bg-gray-300 px-4 py-2 rounded-md text-gray-700"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              className="bg-primary-green px-4 py-2 rounded-md text-white"
              onClick={handleConfirmDuplicate}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};
