"use client";
import instance from "@/config/axios.config";
import { Download, MoreHorizontal, Search, Trash } from "lucide-react";
import { Fragment, Suspense, useEffect, useRef, useState } from "react";
import CreateVideoDialog from "./components/CreateVideoDialog";
import { Template } from "./components/types";
import toast from "react-hot-toast";
import TemplateLoader from "./components/TemplateLoader";
import "@/styles/editor.css";
import ConfirmDialog from "./components/ConfirmDialog";
import VideoPreviewModal from "./components/VideoPreview";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { API_URL } from "@/lib/api";
import { ALL_ROUTES } from "@/utils/constant";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import React from "react";
import GroupSvgTextAvatarIcon from "@/components/svgs/groupSVG";
import { useRouter } from "next/navigation";
import avatarImg1 from "../../../../../public/images/text-to-avatar/image.png";
import avatarImg2 from "../../../../../public/images/text-to-avatar/image-1.png";
import avatarImg3 from "../../../../../public/images/text-to-avatar/image-2.png";
import avatarImg4 from "../../../../../public/images/text-to-avatar/image-3.png";
import avatarImg5 from "../../../../../public/images/text-to-avatar/image-4.png";
import Image from "next/image";
import { template } from "lodash";
import Delete from "@/components/svgs/delete";

const VideoTable: React.FC<{
  videos: Array<{
    _id: string;
    title: string;
    thumbnailUrl: string;
    status: string;
    editedAt: string;
    videoUrl: string;
  }>;
  onRemove: (id: string) => void;
  onPreview: (url: string) => void;
}> = ({ videos, onRemove, onPreview }) => {
  const { user } = useSelector((rootState: RootState) => rootState.auth);
  const isSubscribed = user?.isSubscribed || false;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [videoDuration, setVideoDuration] = useState<{ [key: string]: string }>(
    {}
  );
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<string | null>(null);

  useEffect(() => {
    videos.forEach(video => {
      const videoElement = document.createElement("video");
      videoElement.src = video.videoUrl;

      videoElement.addEventListener("loadedmetadata", () => {
        const totalSeconds = Math.floor(videoElement.duration);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const formattedDuration = `${String(minutes).padStart(2, "0")}:${String(
          seconds
        ).padStart(2, "0")}`;
        setVideoDuration(prev => ({
          ...prev,
          [video._id]: formattedDuration,
        }));
      });
    });

    return () => {};
  }, [videos]);

  const handleConfirmDelete = async () => {
    if (!currentVideoId) return;

    setIsDeleting(true);
    try {
      await instance.delete(`/users/api/v1/docs/${currentVideoId}`);
      onRemove(currentVideoId);
      toast.success("Avatar removed");
    } catch (error) {
      toast.error("Failed to remove avatar");
      console.error("Remove error:", error);
    } finally {
      setIsDeleting(false);
      setIsDialogOpen(false);
    }
  };

  interface OutputType {
    label: string;
    value: string;
    icon: JSX.Element;
  }
  const [planUsage, setPlanUsage] = useState(null);

  const fetchPlanUsage = async () => {
    try {
      const response = await instance.get(`${API_URL}/users/api/v1/plan-usage`);
      const data = response.data.data;
      setPlanUsage(data);

      if (
        user?.user_type !== "ADMIN" &&
        (data?.usage?.no_of_text_to_avatar || 0) <= 0
      ) {
        toast.error("Trial expired");
        window.location.href = isSubscribed
          ? ALL_ROUTES.UPGRADE
          : ALL_ROUTES.PAYMENT;
      }
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error("Error fetching plan usage:", error);
    }
  };

  useEffect(() => {
    fetchPlanUsage();
  }, []);

  const outputType: OutputType[] = [
    { label: "Delete", value: "delete", icon: <span>🗑️</span> },
    { label: "Download", value: "download", icon: <span>📥</span> },
  ];

  const CustomSelect: React.FC<{ videoUrl: string; _id: string }> = ({
    videoUrl,
    _id,
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const [downloadProgress, setDownloadProgress] = useState<number | null>(
      null
    );

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleSelectChange = async (
      value: string,
      videoUrl: string,
      _id: string
    ) => {
      if (value === "delete") {
        setCurrentVideoId(_id);
        setIsDialogOpen(true);
      } else if (value === "download") {
        try {
          const response = await fetch(videoUrl);
          if (!response.ok) {
            throw new Error("File not found");
          }

          const totalSize = +response.headers.get("content-length")!;
          let loadedSize = 0;

          const reader = response.body!.getReader();
          const chunks: Uint8Array[] = [];

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            chunks.push(value);
            loadedSize += value.length;

            setDownloadProgress(Math.round((loadedSize / totalSize) * 100));
          }

          const blob = new Blob(chunks);
          const url = URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = url;
          link.download = `${_id}.mp4`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          setDownloadProgress(null);
          toast.success("Download completed");
        } catch (error) {
          toast.error("Failed to download avatar");
          console.error("Download error:", error);
          setDownloadProgress(null);
        }
      }
    };
    return (
      <div className="relative inline-block text-left" ref={dropdownRef}>
        {outputType.map(({ label, value, icon }) => (
          <button
            key={value}
            onClick={() => {
              // Check if the value is already selected
              if (value === selectedValue) {
                setSelectedValue(null);
                handleSelectChange("", videoUrl, _id);
              } else {
                handleSelectChange(value, videoUrl, _id);
                setSelectedValue(value);
              }
              setIsOpen(false);
            }}
            className={`flex items-center gap-2 px-4 py-2 w-full text-left ${
              value === selectedValue ? "bg-gray-100" : "hover:bg-blue-50"
            }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>
    );
  };

  const timeAgo = (date: string) => {
    const seconds = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / 1000
    );
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) return `${interval} years ago`;
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} months ago`;
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} days ago`;
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} hours ago`;
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes ago`;
    return "Just now";
  };

  const toggleDropdown = (videoId: string) => {
    if (isDropdownOpen === videoId) {
      setIsDropdownOpen(null);
    } else {
      setIsDropdownOpen(videoId);
    }
  };

  const handleDeleteClick = (videoId: string) => {
    setCurrentVideoId(videoId);
    handleConfirmDelete(); // Call the confirm delete handler
  };

  return (
    <div className="w-full flex flex-wrap gap-4 relative items-center z-10 justify-start mt-10">
      {videos.map(video => (
        <div
          key={video._id}
          className="border rounded-[10px] w-[300px] h-[220px] p-4 shadow-lg"
        >
          <div className="relative w-[260px] h-[125px] rounded-[15px]">
            <img
              src={video.thumbnailUrl}
              alt="image"
              className="w-full h-full object-cover rounded-[15px]"
            />
            {video.status === "Pending" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-[15px]">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#034737]"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
            <button
              className="absolute top-2 right-2 bg-white rounded-[10px] p-2 shadow-md"
              onClick={() => toggleDropdown(video._id)}
            >
              <MoreHorizontal />
            </button>
            {isDropdownOpen === video._id && (
              <div className="absolute top-12.5 right-2 w-25 bg-white shadow-lg rounded-lg z-20">
                <ul className="text-sm text-gray-700">
                  <li
                    className="p-2 cursor-pointer flex items-center justify-center "
                    onClick={() => handleDeleteClick(video._id)}
                  >
                    <Delete />
                    Delete
                  </li>
                </ul>
              </div>
            )}
          </div>
          <h3 className="text-[15px] text-[#14171B] mt-2">
            {video.title.charAt(0).toUpperCase() + video.title.slice(1)}
          </h3>
          <p className="text-gray-500 text-sm">{`Edited ${timeAgo(
            video.editedAt
          )}`}</p>
        </div>
      ))}
    </div>
  );
};

export default function TextToVideoPage() {
  const router = useRouter();
  const [templates, setTemplates] = useState<Template[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { user } = useSelector((rootState: RootState) => rootState.auth);
  const isSubscribed = user?.isSubscribed || false;
  const [planUsage, setPlanUsage] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const url = `users/api/v1/docs?page=1&limit=10&category=video`;
      const response = await instance.get<{
        success: boolean;
        message: string;
        data: {
          docs: Template[];
        };
      }>(url);
      setTemplates(response.data.data.docs);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
      setTemplates([]);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const handleVideoGenerationSuccess = () => {
      fetchData();
    };

    window.addEventListener(
      "videoGenerationSuccess",
      handleVideoGenerationSuccess
    );

    return () => {
      window.removeEventListener(
        "videoGenerationSuccess",
        handleVideoGenerationSuccess
      );
    };
  }, []);

  const handleRemove = async (id: string) => {
    try {
      await instance.delete(`/users/api/v1/docs/${id}`);
      toast.success("Avatar removed successfully");
      fetchData();
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
      console.error("Error removing avatar:", error);
    }
  };

  const handlePreview = (url: string) => {
    setPreviewVideoUrl(url);
    setIsPreviewOpen(true);
  };

  const filteredTemplates = templates
    ?.filter(template =>
      template.doc_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map(template => ({
      _id: template._id,
      title: template.doc_name,
      thumbnailUrl: template.doc_content.video_thumbnailUrl,
      status: template.doc_content.status,
      editedAt: template.updatedAt,
      videoUrl: template.doc_content.video_url,
    }));

  const handleNavigation = async () => {
    try {
      const response = await instance.get(`${API_URL}/users/api/v1/plan-usage`);
      const data = response.data.data;

      setPlanUsage(data);

      if (
        user?.user_type !== "ADMIN" &&
        data?.usage?.no_of_text_to_avatar <= 0
      ) {
        toast.error("Trial expired");
        window.location.href = isSubscribed
          ? ALL_ROUTES.UPGRADE
          : ALL_ROUTES.PAYMENT;
        return;
      } else {
        router.push("/app/social-portal/text-to-avatar/create-avatar");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <main>
        <div className="grid grid-cols-1 gap-5 mt-8">
          {loading ? (
            <div className="grid grid-cols-1 gap-5 mt-8">
              <TemplateLoader />
            </div>
          ) : filteredTemplates && filteredTemplates.length > 0 ? (
            <div className="flex flex-col items-center">
              <div className="flex justify-between items-center w-full h-[52px] space-x-4">
                <div className="space-y-1 flex-grow">
                  <h1 className="text-[22px] font-semibold text-gray-800">
                    Text to Avatar
                  </h1>
                  <p className="text-[15px] text-gray-500">
                    Videos made by you!
                  </p>
                </div>

                <div className="flex items-center h-[52px] space-x-4">
                  <div className="relative w-full max-w-md h-[52px]">
                    <div className="bg-white border border-[#EBEBEB] h-[52px] px-4 py-2 rounded-xl flex items-center shadow-sm">
                      <Search className="text-gray-500" size={20} />
                      <input
                        type="search"
                        className="ml-2 outline-none w-full text-gray-700 placeholder-gray-400"
                        placeholder="Search template"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      className="bg-primary-green text-white sheen transition duration-500 px-5 py-3.5 rounded-xl flex items-center md:w-[180px] lg:w-[282px] h-[52px] gap-2"
                      onClick={handleNavigation}
                    >
                      <Plus size={20} />
                      Create new avatar with AI
                    </button>
                  </div>
                </div>
              </div>

              <Suspense fallback={<TemplateLoader />}>
                <VideoTable
                  videos={filteredTemplates}
                  onRemove={handleRemove}
                  onPreview={handlePreview}
                />
              </Suspense>
            </div>
          ) : (
            <div className="flex flex-col gap-10 items-center w-full h-[85vh] max-h-screen overflow-hidden col-span-4">
              <div>
                <h1 className="text-[#14171B] lg:text-[32px] md:text-[30px] leading-[32px] font-poppins tracking-[0.003em]">
                  What's your vision for your video
                </h1>
              </div>
              <div className="rounded-[10px] shadow-lg border border-[#E0E0E0] min-w-[300px] min-h-[428px] w-full h-auto sm:w-[400px] md:w-full md:min-h-[428px] lg:w-[818px] lg:h-[428px] 2xl:w-[1000px] 2xl:h-[600px]">
                <div className="flex flex-col gap-3 p-5 items-center justify-center w-full h-full">
                  <div>
                    <GroupSvgTextAvatarIcon />
                  </div>
                  <div
                    className="text-[22px] text-[#034737] leading-[24px] tracking-[0.003em] cursor-pointer"
                    onClick={handleNavigation}
                  >
                    +Create a video
                  </div>
                  <div className="text-[16px] text-[#b6b6b6] text-center mb-3">
                    "Design Your Unique Avatar for Engaging Masterclasses,
                    Personal<br></br> Branding, and Internal Training!"
                  </div>
                  <div className="flex flex-row gap-3 w-full items-center justify-center">
                    <div className="h-[170px] w-[140px] flex items-center justify-center">
                      <Image src={avatarImg1} alt="avatar1" />
                    </div>
                    <div className="h-[170px] w-[140px] flex items-center justify-center">
                      <Image src={avatarImg2} alt="avatar1" />
                    </div>
                    <div className="h-[170px] w-[140px] flex items-center justify-center">
                      <Image src={avatarImg3} alt="avatar1" />
                    </div>
                    <div className="h-[170px] w-[140px] flex items-center justify-center">
                      <Image src={avatarImg4} alt="avatar1" />
                    </div>
                    <div className="h-[170px] w-[140px] flex items-center justify-center">
                      <Image src={avatarImg5} alt="avatar1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </Fragment>
  );
}
