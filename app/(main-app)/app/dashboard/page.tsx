"use client";

import instance, { automation, CustomAxiosInstance } from "@/config/axios.config";
import Image from "next/image";
import "aos/dist/aos.css";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react"; // Headless UI for dropdown
import { useRouter } from "next/navigation";
import { BsThreeDotsVertical } from "react-icons/bs";
import toast from "react-hot-toast";
import { ALL_ROUTES } from "@/utils/constant";
import { createWorkFlow } from "@/lib/features/workflow/workflow.slice";
import { useAppDispatch } from "@/lib/hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import WorkflowLoader from "@/app/(main-app)/app/automation-hub/workflow-builder/components/WorkflowLoader";
import {
  ChevronRight,
  CircleHelp,
  Copy,
  Edit,
  LayoutDashboard,
  MessageSquareOff,
  Play,
  Plus,
  Search,
  Settings,
  Trash2,
  Waypoints,
} from "lucide-react";
import axios from "axios";
import Aos from "aos";
import ActionWorkflowModal from "@/components/ui/action-workflow-modal";
type PreBuiltTemplate = {
  _id: string;
  name: string;
  description: string;
  image: string;
  workflow_id: string;
  status?: string
};

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [preBuiltTemplates, setPreBuiltTemplates] = useState<
    PreBuiltTemplate[]
  >([]);
  const [activeTab, setActiveTab] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(false);
  const isLoadingRef = useRef(isLoading);
  const hasMoreRef = useRef(hasMore);
  const throttleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const activeTabName = localStorage.getItem("activeTab");
    if (activeTabName) {
      setActiveTab(activeTabName);
      localStorage.removeItem("activeTab");
    } else {
      setActiveTab("templates");
    }
  }, []);

  const getPreBuiltTemplates = async () => {
    try {
      setLoading(true);
      // const response = await axios.get(`http://localhost:8081/workflow?isPrebuilt=true&page=${page}&limit=20`);
      const response = await instance.get(
        `/${automation}/workflow?isPrebuilt=true&page=${page}&limit=20`
      );
      // setPreBuiltTemplates([]);
      // const response = await CustomAxiosInstance().get(
      //   `/workflow?isPrebuilt=true`
      // );
      setPreBuiltTemplates(prevItems => [
        ...(Array.isArray(prevItems) ? prevItems : []),
        ...response?.data?.data,
      ]);
      setHasNextPage(response?.data?.pagination?.hasNextPage);
    } catch (error: any) {
      if (error?.response) {
        toast.error(error?.response?.data?.error);
      } else if (error?.message) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
      console.error("Error fetching pre-built templates:", error);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  const getUserSavedWorkflows = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await instance.get(`/${automation}/workflow?page=${page}&limit=20`);
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setPreBuiltTemplates(prevItems => [
          ...(Array.isArray(prevItems) ? prevItems : []),
          ...response?.data?.data,
        ]);
        setHasNextPage(response?.data?.pagination?.hasNextPage);
      }
    } catch (error: any) {
      if (error?.response) {
        toast.error(error?.response?.data?.error);
      } else if (error?.message) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
      console.error("Error fetching pre-built templates:", error);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoadingRef.current = isLoading;
    hasMoreRef.current = hasMore;
  }, [isLoading, hasMore]);

  useEffect(() => {
    const loadItems = async () => {
      setIsLoading(true);
      if (activeTab === "templates") {
        await getPreBuiltTemplates();
      }
      if (activeTab === "workflows") {
        await getUserSavedWorkflows(page);
      }
    };

    loadItems();
  }, [page, activeTab]);

  const handleScroll = useCallback(() => {
    if (throttleTimer.current) {
      return;
    }

    throttleTimer.current = setTimeout(() => {
      throttleTimer.current = null; // Reset throttle after delay
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        if (!isLoadingRef.current && hasMoreRef.current && hasNextPage) {
          setPage(prevPage => prevPage + 1);
        }
      }
    }, 300);
  }, [hasMoreRef, hasNextPage, isLoadingRef]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage]);

  const handleCreateWorkflow = async () => {
    try {
      localStorage.removeItem("workflowActiveTab");
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

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const fetchSearchResults = useCallback(
    async (query: string): Promise<void> => {
      try {
        setLoading(true);
        const queryParams =
          activeTab === "templates" ? `${query}&isPrebuilt=true` : `${query}`;
        // const response = await axios.get(
        //   `http://localhost:5000/workflow/search?keyword=${query}`
        // );
        const response = await instance.get(
          `/${automation}/workflow/search?keyword=${queryParams}`
        );

        setPreBuiltTemplates(response.data); // Update results with API response
        setHasNextPage(false);
      } catch (error: any) {
        if (error?.response) {
          toast.error(error?.response?.data?.error);
        } else if (error?.message) {
          toast.error(error?.message);
        } else {
          toast.error("Something went wrong");
        }
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    },
    [activeTab]
  );

  const debouncedFetchSearchResults = useCallback(
    debounce(fetchSearchResults, 1500),
    [activeTab]
  );

  const handleSearchInputChange = useCallback(
    (e: any) => {
      const query = e.target.value || "";
      setSearchQuery(query);
      if (query.length > 0) {
        debouncedFetchSearchResults(query);
      } else {
        setPreBuiltTemplates([]);
        if (activeTab === "templates") getPreBuiltTemplates();
        if (activeTab === "workflows") getUserSavedWorkflows();
      }
    },
    [activeTab]
  );

  return (
    <>
      <Fragment>
        <div className="flex-1 px-12 flex h-full w-full gap-8 mt-10">
          <div className="mx-4 flex justify-end ">
            <div className="bg-white rounded-3xl border border-[#E8E8E8] h-[430px] px-5 py-8 ">
              <div className="pb-3">
                <button
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 w-[280px]  ${activeTab === "newWorkflows"
                    ? "bg-[#2DA771] text-white"
                    : "text-black"
                    }`}
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
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 w-[280px] ${activeTab === "templates"
                    ? "bg-[#2DA771] text-white"
                    : "text-black"
                    }`}
                  onClick={() => {
                    setActiveTab("templates");
                    setSearchQuery("");
                    setPreBuiltTemplates([]);
                    setPage(1);
                  }}
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
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 w-[280px] ${activeTab === "workflows"
                    ? "bg-[#2DA771] text-white"
                    : "text-black"
                    }`}
                  onClick={() => {
                    setActiveTab("workflows");
                    setSearchQuery("");
                    setPreBuiltTemplates([]);
                    setPage(1);
                  }}
                >
                  <div className="flex items-center gap-3 px-3 py-2">
                    <Waypoints />
                    <span>My workflows</span>
                  </div>
                  <ChevronRight />
                </button>
              </div>
              {/* Will needed after */}
              {/* <div className="pb-3">
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
              </div> */}
            </div>
          </div>
          <main className="w-full">
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
                  onChange={handleSearchInputChange}
                  value={searchQuery}
                />
              </div>
            </div>
            <div className="mt-10">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {preBuiltTemplates?.length > 0
                  ? preBuiltTemplates?.map(template => (
                    <Card
                      key={template._id}
                      title={template.name}
                      description={template.description}
                      imageSrc={template?.image}
                      workflow_id={template._id}
                      activeTab={activeTab}
                      setLoading={setLoading}
                      refetchWorkflow={getUserSavedWorkflows}
                      setPreBuiltTemplates={setPreBuiltTemplates}
                      status={template?.status}
                    />
                  ))
                  : loading &&
                  Array(5)
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
  workflow_id: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab: string;
  refetchWorkflow: () => void;
  setPreBuiltTemplates: React.Dispatch<
    React.SetStateAction<PreBuiltTemplate[]>
  >;
  status?: string
};

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageSrc,
  workflow_id,
  setLoading,
  activeTab,
  refetchWorkflow,
  setPreBuiltTemplates,
  status
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<{
    isOpen: boolean;
    type: string;
  }>({ isOpen: false, type: "" });
  const [modalText, setModalText] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const handleDuplicateClick = async (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsModalOpen({ isOpen: true, type: "duplicate" });
    setModalText("Are you sure you want to duplicate this workflow?");
    setModalMessage("");
  };

  const handleConfirmDuplicate = async () => {
    setLoading(true);
    try {
      setLoading(true);
      // const response = await instance.post(
      //   `http://localhost:5000/workflow/${workflow_id}/duplicate`
      // );
      const response = await instance.post(
        `/${automation}/workflow/${workflow_id}/duplicate`
      );
      setIsModalOpen({ isOpen: false, type: "duplicate" });
      localStorage.removeItem("workflowActiveTab");
      router.push(`/app/workflow/${response?.data?._id}`);

      // const response = await instance.post(
      //   `/workflow/${workflow_id}/duplicate`
      // );
    } catch (error: any) {
      console.error("Error duplicating workflow:", error);
      if (error?.response) {
        toast.error(error?.response?.data?.error);
      } else if (error?.message) {
        toast.error(error?.message);
      } else {
        toast.error("Failed to duplicate workflow");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = async () => {
    router.push(`${ALL_ROUTES.WORKFLOW_CANVAS_CREATE}/${workflow_id}`);
  };

  const handleRunClick = async () => {
    localStorage.setItem("workflowActiveTab", "1");
    router.push(`${ALL_ROUTES.WORKFLOW_CANVAS_CREATE}/${workflow_id}`);
  };

  const onHandleDeleteClick = () => {
    setIsModalOpen({ isOpen: true, type: "delete" });
    setModalText("Are you sure you want to delete this workflow?");
    setModalMessage(
      "Deleting this workflow will permanently remove it from your system."
    );
  };

  const handleDeleteClick = async () => {
    setLoading(true);
    try {
      // const response = await axios.delete(
      //   `/workflow/${workflow_id}`
      // );
      const response = await instance.delete(`/${automation}/workflow/${workflow_id}`);
      setPreBuiltTemplates(prevItems =>
        prevItems.filter(item => item._id !== workflow_id)
      );
      setIsModalOpen({ isOpen: false, type: "delete" });
    } catch (error: any) {
      if (error?.response) {
        toast.error(error?.response?.data?.error);
      } else if (error?.message) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
      console.error("Error deleting workflow:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnpublishWorkflow = async () => {
    setLoading(true);
    try {
      const response = await instance.patch(
        `/${automation}/workflow/${workflow_id}/status`,
        {
          status: "unpublished",
        }
      );
      setPreBuiltTemplates(prevItems =>
        prevItems.map(item =>
          item._id === workflow_id
            ? { ...item, status: "unpublished" }
            : item
        )
      );
    } catch (error: any) {
      if (error?.response) {
        toast.error(error?.response?.data?.error);
      } else if (error?.message) {
        toast.error(error?.message);
      } else {
        toast.error("Something went wrong");
      }
      console.error("Error unpublish workflow:", error);
    } finally {
      setLoading(false);
      setIsMenuOpen(false); 
    }
  };

  const handleDoubleClick = () => {
    if (activeTab !== "templates") {
      if (status === "published") {
        handleRunClick()
      }
      else if (status === "draft") {
        handleEditClick()
        localStorage.removeItem("workflowActiveTab");
      }
    }
  }

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(prev => !prev); 
  };

  return (
    <>
      <div
        className="relative p-5 bg-white rounded-3xl border border-[#E8E8E8] hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 cursor-pointer space-y-4 min-h-[315px]"
        data-aos="fade-up"
        onDoubleClick={handleDoubleClick}
      >
        <div className="relative z-10" data-aos="zoom-in">
          <Image
            src={
              "https://growstackai.s3.amazonaws.com/assets/social-media-workflow.png"
            }
            alt={title}
            width={400}
            height={400}
            className="w-full h-40 object-cover rounded-xl cursor-pointer"
          />

          <Menu as="div" className="absolute top-0 right-0 !z-[999]">
            <MenuButton
              // onClick={e => e.stopPropagation()}
              onClick={toggleMenu}
              className=" text-gray-500 hover:text-gray-700"
            >
              <BsThreeDotsVertical className="w-6 h-6" />
            </MenuButton>
            {isMenuOpen &&
              <MenuItems className="absolute right-0 mt-2 w-[157px] bg-white border border-gray-200 rounded-xl shadow-lg">
                {activeTab !== "templates" && (
                  <>
                    <MenuItem>
                      <button
                        className="px-5 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2 w-full rounded-xl"
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleEditClick();
                          localStorage.removeItem("workflowActiveTab");
                        }}
                      >
                        <Edit size={16} color="#9e9e9e" />
                        Edit
                      </button>
                    </MenuItem>
                    {status === "published" &&
                      <MenuItem>
                        <button
                          className="px-5 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2 w-full rounded-xl"
                          onClick={e => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleRunClick();
                          }}
                        >
                          <Play size={16} color="#9e9e9e" />
                          Run
                        </button>
                      </MenuItem>}
                    <MenuItem>
                      <button
                        className="px-5 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2 w-full rounded-xl"
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          onHandleDeleteClick();
                        }}
                      >
                        <Trash2 size={16} color="#9e9e9e" />
                        Delete
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        className="px-5 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2 w-full rounded-xl"
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDuplicateClick(e);
                        }}
                      >
                        <Copy size={16} color="#9e9e9e" />
                        Duplicate
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        className="px-5 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2 w-full rounded-xl"
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleUnpublishWorkflow();
                        }}
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
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDuplicateClick(e);
                        }}
                      >
                        <Copy size={16} color="#9e9e9e" />
                        Duplicate
                      </button>
                    </MenuItem>
                  </>
                )}
              </MenuItems>
            }
          </Menu>
        </div>
        <h3
          className="text-xl font-semibold leading-relaxed line-clamp-1 text-ellipsis overflow-hidden"
          title={title}
          data-aos="fade-left"
        >
          {title}
        </h3>
        {activeTab !== "templates" && (
          <p
            className={`!mt-3 p-2 rounded-lg capitalize w-fit leading-relaxed ${status === "draft" ? "text-orange-500 bg-orange-200" : status === "published" ? "text-green-600 bg-green-200" : "text-primary-black bg-gray-200"}`}
          >
            {status}
          </p>
        )}
        <p
          className="leading-relaxed text-primary-black text-opacity-70 line-clamp-2 text-ellipsis overflow-hidden"
          data-aos="fade-right"
        >
          {description}
        </p>
      </div>
      <ActionWorkflowModal
        isOpen={isModalOpen.isOpen}
        onClose={() => setIsModalOpen({ isOpen: false, type: "" })}
        onConfirm={() => {
          if (isModalOpen.type === "duplicate") {
            handleConfirmDuplicate();
          } else if (isModalOpen.type === "delete") {
            handleDeleteClick();
          }
        }}
        title={modalText}
        message={modalMessage}
        type={isModalOpen.type}
      />
    </>
  );
};
