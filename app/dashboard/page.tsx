"use client";

import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { Fragment, useEffect, useState } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react"; // Headless UI for dropdown
import { useRouter } from "next/navigation";
import { BsThreeDotsVertical } from "react-icons/bs";
import toast from "react-hot-toast";
import GlobalModal from "@/components/modal/global.modal";
import Link from "next/link";
import Lock from "@/components/svgs/lock";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { ALL_ROUTES } from "@/utils/constant";
import { createWorkFlow } from "@/lib/features/workflow/workflow.slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import WorkflowLoader from "@/app/(main-app)/app/automation-hub/workflow-builder/components/WorkflowLoader";
import {
  ChevronRight,
  CircleHelp,
  Copy,
  LayoutDashboard,
  MessageSquareOff,
  Plus,
  Search,
  Settings,
  Trash2,
  Waypoints,
} from "lucide-react";
type PreBuiltTemplate = {
  _id: number;
  name: string;
  description: string;
  image: string;
  workflow_id: string;
  slug: string;
};

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [preBuiltTemplates, setPreBuiltTemplates] = useState<
    PreBuiltTemplate[]
  >([]);
  const [activeTab, setActiveTab] = useState<string>("templates");
  const { isCurrentPlanFetching } = useSelector(
    (rootState: RootState) => rootState.auth
  );
  const { isLoading } = useAppSelector(state => state.workflows);

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

  const handleCreateWorkflow = async () => {
    try {
      const resultAction = await dispatch(
        createWorkFlow({ name: "Untitled workflow" })
      );
      const result = unwrapResult(resultAction);
      const workflowId = result._id;
      router.push(`${ALL_ROUTES.WORKFLOW_CANVAS_CREATE}/${workflowId}`);
    } catch (error) {
      console.log("---error---", error);
    }
  };
  return (
    <>
      <Fragment>
        <div className="flex-1 flex h-full w-full gap-8 mt-10">
          <div className="w-[25%] mx-4 flex justify-end ">
            <div className="bg-white rounded-3xl border border-[#E8E8E8] h-[430px] px-5 py-8 ">
              <div className="pb-3">
                <button
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 w-[280px]  ${activeTab === "newWorkflows" ? "bg-[#2DA771] text-white" : "text-black"}`}
                  onClick={handleCreateWorkflow}
                >
                  <div className="flex items-center gap-3 px-2 py-2">
                    <Plus />
                    <span>Create New Workflow</span>
                  </div>
                  <ChevronRight />
                </button>
              </div>
              <div className="pb-3">
                <button
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 w-[280px] ${activeTab === "templates" ? "bg-[#2DA771] text-white" : "text-black"}`}
                  onClick={() => setActiveTab("templates")}
                >
                  <div className="flex items-center gap-3 px-3 py-2">
                    <LayoutDashboard />
                    <span>Templates</span>
                  </div>
                  <ChevronRight />
                </button>
              </div>
              <div className="pb-3">
                <button
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 w-[280px] ${activeTab === "workflows" ? "bg-[#2DA771] text-white" : "text-black"}`}
                >
                  <div
                    className="flex items-center gap-3 px-3 py-2"
                    onClick={() => setActiveTab("workflows")}
                  >
                    <Waypoints />
                    <span>My workflows</span>
                  </div>
                  <ChevronRight />
                </button>
              </div>
              <div className="pb-3">
                <button className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 rounded-xl transition-all duration-300 w-[280px]">
                  <div className="flex items-center gap-3 px-3 py-2">
                    <Settings />
                    <span>Settings</span>
                  </div>
                  <ChevronRight />
                </button>
              </div>
              <div className="pb-3">
                <button className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 rounded-xl transition-all duration-300 w-[280px]">
                  <div className="flex items-center gap-3 px-3 py-2">
                    <CircleHelp />
                    <span>Help</span>
                  </div>
                  <ChevronRight />
                </button>
              </div>
            </div>
          </div>
          <main className="w-[75%]">
            <div className="flex justify-between items-center ">
              <div className="space-y-2">
                <h1 className="text-2xl font-semibold">Get started</h1>
                <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
                  Explore pre-built templates, create a new workflow, or import
                  an existing one.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-primary-green/20 transition-all duration-300 px-2">
                <Search color="#9e9e9e" />
                <input
                  type="text"
                  placeholder="Search workflows"
                  className="w-[280px] px-4 py-3 bg-gray-100 "
                />
              </div>
            </div>
            <div className="mt-10">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {isCurrentPlanFetching || preBuiltTemplates.length > 0
                  ? preBuiltTemplates.map(template => (
                      <Card
                        key={template._id}
                        title={template.name}
                        description={template.description}
                        imageSrc={template.image}
                        slug={template.slug}
                        workflow_id={template.workflow_id}
                        setLoading={setLoading}
                        activeTab={activeTab}
                      />
                    ))
                  : Array(5)
                      .fill(null)
                      .map((_, index) => <WorkflowLoader key={index} />)}
              </div>
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
        </div>
      </Fragment>
    </>
  );
}

type CardProps = {
  title: string;
  description: string;
  imageSrc: string;
  slug: string;
  workflow_id: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab: string;
};

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageSrc,
  slug,
  workflow_id,
  setLoading,
  activeTab,
}) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentPlan, user } = useSelector(
    (rootState: RootState) => rootState.auth
  );

  const handleDuplicateClick = async (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleConfirmDuplicate = async () => {
    setIsModalOpen(false);
    const canCreateWorkflow = await checkWorkAccessPermission(false);
    if (!canCreateWorkflow) {
      return;
    }
    setLoading(true);
    try {
      const response = await instance.post(
        `${API_URL}/workflow/api/v1/duplicate/${workflow_id}`
      );
      const newWorkflowId = response.data.data.workflow_id;
      if (newWorkflowId) {
        router.push(
          `/app/automation-hub/workflow-builder/create-workflow?workflow_id=${newWorkflowId}`
        );
      } else {
        console.error("New workflow ID not found in the response");
      }
    } catch (error: any) {
      console.error("Error duplicating workflow:", error);
      toast.error(
        error?.response?.data?.error || "Failed to duplicate workflow"
      );
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleEditClick = async () => {
    // setLoading(true);
    console.log("edit clicked", workflow_id);
    // try {
    //   const response = await instance.post(
    //     `${API_URL}/workflow/api/v1/update/${workflow_id}`
    //   );
    //   const newWorkflowId = response.data.data.workflow_id;
    //   console.log("newWorkflowId", newWorkflowId);
    // } catch (error: any) {
    //   console.error("Error Editing workflow:", error);
    //   toast.error(
    //     error?.response?.data?.error || "Failed to duplicate workflow"
    //   );
    // } finally {
    //   setTimeout(() => {
    //     setLoading(false);
    //   }, 1000);
    // }
  };
  const handleDeleteClick = async () => {
    // setLoading(true);
    // try {
    //   const response = await instance.post(
    //     `${API_URL}/workflow/api/v1/delete/${workflow_id}`
    //   );
    //   const newWorkflowId = response.data.data.workflow_id;
    //   console.log("newWorkflowId", newWorkflowId);
    // } catch (error: any) {
    //   console.error("Error deleting workflow:", error);
    //   toast.error(
    //     error?.response?.data?.error || "Failed to duplicate workflow"
    //   );
    // } finally {
    //   setTimeout(() => {
    //     setLoading(false);
    //   }, 1000);
    // }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [isAddOnModalOpen, setIsAddOnModalOpen] = useState<boolean>(false);

  const checkWorkAccessPermission = async (redirect: boolean = false) => {
    try {
      if (!currentPlan) return;
      if (
        user?.user_type !== "ADMIN" &&
        currentPlan.usage.ai_worfklow_credits <= 0
      ) {
        setIsAddOnModalOpen(true);
        return false;
      } else {
        if (!redirect) {
          return true;
        } else {
          router.push(
            `/app/automation-hub/workflow-builder/workflows/${slug}?workflow_id=${workflow_id}`
          );
        }
      }
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error("Error fetching plan usage:", error);
      return false;
    }
  };

  return (
    <>
      <div
        onClick={() => checkWorkAccessPermission(true)}
        className="relative p-5 bg-white rounded-3xl border border-[#E8E8E8] hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 cursor-pointer space-y-4 min-h-[315px]"
        data-aos="fade-up"
      >
        <div className="relative" data-aos="zoom-in">
          <Image
            src={imageSrc}
            alt={title}
            width={400}
            height={400}
            className="w-full h-40 object-cover rounded-xl cursor-pointer"
          />

          <Menu as="div" className="absolute top-0 right-0 !z-50">
            <MenuButton
              onClick={e => e.stopPropagation()}
              className=" text-gray-500 hover:text-gray-700"
            >
              <BsThreeDotsVertical className="w-6 h-6" />
            </MenuButton>
            <MenuItems className="absolute right-0 mt-2 w-[157px] bg-white border border-gray-200 rounded-xl shadow-lg">
              {activeTab !== "templates" && (
                <>
                  <MenuItem>
                    <button
                      className="px-5 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2 w-full rounded-xl"
                      onClick={handleEditClick}
                    >
                      <Copy size={16} color="#9e9e9e" />
                      Edit
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      className="px-5 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2 w-full rounded-xl"
                      onClick={handleDeleteClick}
                    >
                      <Trash2 size={16} color="#9e9e9e" />
                      Delete
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      className="px-5 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2 w-full rounded-xl"
                      onClick={handleDuplicateClick}
                    >
                      <Copy size={16} color="#9e9e9e" />
                      Duplicate
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      className="px-5 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2 w-full rounded-xl"
                      onClick={handleDuplicateClick}
                    >
                      <MessageSquareOff size={16} color="#9e9e9e" />
                      Unpublish
                    </button>
                  </MenuItem>{" "}
                </>
              )}
              {activeTab === "templates" && (
                <>
                  <MenuItem>
                    <button
                      className="px-5 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2 w-full rounded-xl"
                      onClick={handleDuplicateClick}
                    >
                      <Copy size={16} color="#9e9e9e" />
                      Duplicate
                    </button>
                  </MenuItem>
                </>
              )}
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
            onClick={e => e.stopPropagation()}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50"
            data-aos="fade-in"
          >
            <div
              className="bg-white p-6 rounded-lg w-80 max-w-lg flex flex-col items-center"
              data-aos="zoom-in"
            >
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
      <GlobalModal
        showCloseButton={false}
        open={isAddOnModalOpen}
        setOpen={() => {
          setIsAddOnModalOpen(false);
        }}
      >
        <div className="flex flex-col items-center justify-center px-6 pt-4 pb-8 gap-6 space-x-6">
          <Lock />
          <h3 className="text-center text-[28px] font-semibold">
            You don’t have enough credit.
          </h3>
          <p className="text-center text-gray-700 text-sm md:text-base px-4">
            You don’t have enough credits in your wallet to use this feature. It
            is an add-on, and requires additional credit to access. Please add
            credits to continue.
          </p>
          <div className="flex items-center justify-between gap-3">
            <button
              className="text-red-500 border border-red-500 bg-transparent text-nowrap py-2 px-8 rounded-md transition duration-300"
              onClick={() => setIsAddOnModalOpen(false)}
            >
              Cancel
            </button>
            <Link
              className="bg-primary-green text-white text-nowrap py-2 px-6 rounded-md transition duration-300 hover:bg-green-600"
              href="/account/billings/settings"
            >
              Add Credit
            </Link>
          </div>
        </div>
      </GlobalModal>
    </>
  );
};
