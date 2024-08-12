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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [videoDuration, setVideoDuration] = useState<{ [key: string]: string }>(
    {}
  );

  useEffect(() => {
    videos.forEach((video) => {
      const videoElement = document.createElement("video");
      videoElement.src = video.videoUrl;

      videoElement.addEventListener("loadedmetadata", () => {
        const totalSeconds = Math.floor(videoElement.duration);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const formattedDuration = `${String(minutes).padStart(2, "0")}:${String(
          seconds
        ).padStart(2, "0")}`;
        setVideoDuration((prev) => ({
          ...prev,
          [video._id]: formattedDuration,
        }));
      });
    });

    return () => {
      // Clean up listeners if necessary
    };
  }, [videos]);

  const handleConfirmDelete = async () => {
    if (!currentVideoId) return;

    setIsDeleting(true);
    try {
      await instance.delete(`/users/api/v1/docs/${currentVideoId}`);
      onRemove(currentVideoId);
      toast.success("Video removed");
    } catch (error) {
      toast.error("Failed to remove video");
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
          toast.error("Failed to download video");
          console.error("Download error:", error);
          setDownloadProgress(null);
        }
      }
    };

    return (
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button
          type="button"
          className="p-1 bg-white border-0 h-10 hover:bg-gray-100 rounded-lg flex items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MoreHorizontal size={20} />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
            <div className="py-1">
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
                    value === selectedValue ? "bg-gray-100" : ""
                  }`}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
        {downloadProgress !== null && (
          <div className="absolute bottom-0 left-0 w-full bg-gray-200 rounded-b-lg">
            <div
              className="bg-blue-500 text-xs font-medium text-white text-center p-0.5 leading-none rounded-b-lg"
              style={{ width: `${downloadProgress}%` }}
            >
              {downloadProgress}%
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="rounded-lg border   mt-5 bg-white min-h-[50vh]">
      <Table className="">
        <TableHeader>
          <TableRow className="bg-[#0347370D]">
            <TableHead>Thumbnail</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Edited At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {videos.map((video) => (
            <TableRow key={video._id}>
              <TableCell onClick={() => onPreview(video.videoUrl)}>
                <img
                  className="object-cover w-[64px] h-[64px] rounded-2xl"
                  src={video.thumbnailUrl}
                  alt="video thumbnail"
                />
              </TableCell>
              <TableCell className="text-[16px] font-medium truncate max-w-[200px]">
                {video.title}
              </TableCell>
              <TableCell className="text-[14px] text-gray-500">
                {videoDuration[video._id] || "Loading..."}
              </TableCell>
              <TableCell
                className={`text-[14px] ${
                  video.status === "Success"
                    ? "text-green-500"
                    : video.status === "Pending"
                    ? "text-yellow-500"
                    : video.status === "Failed"
                    ? "text-red-500"
                    : ""
                }`}
              >
                {video.status}
              </TableCell>
              <TableCell className="text-[16px] text-[#151B23]">
                {(() => {
                  const timeDifference =
                    new Date().getTime() - new Date(video.editedAt).getTime();
                  const totalMinutes = Math.floor(timeDifference / 60000);
                  const totalSeconds = Math.floor(
                    (timeDifference % 60000) / 1000
                  );

                  if (totalMinutes >= 60) {
                    const hours = Math.floor(totalMinutes / 60);
                    return `Created about ${hours} ${
                      hours === 1 ? "hr" : "hrs"
                    } ago`;
                  } else {
                    return `Created about ${totalMinutes} ${
                      totalMinutes === 1 ? "min" : "mins"
                    } and ${totalSeconds} ${
                      totalSeconds === 1 ? "sec" : "secs"
                    } ago`;
                  }
                })()}
              </TableCell>
              <TableCell className="">
                <CustomSelect videoUrl={video.videoUrl} _id={video._id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter></TableFooter>
        {/* <TableCaption>Your video table caption here</TableCaption> */}
      </Table>
      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this video?"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default function TextToVideoPage() {
  const [templates, setTemplates] = useState<Template[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [previewVideoUrl, setPreviewVideoUrl] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

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
      fetchData(); // Refresh the data when the custom event is received
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
      toast.success("Video removed successfully");
      fetchData();
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
      console.error("Error removing video:", error);
    }
  };

  const handlePreview = (url: string) => {
    setPreviewVideoUrl(url);
    setIsPreviewOpen(true);
  };

  const filteredTemplates = templates
    ?.filter((template) =>
      template.doc_name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((template) => ({
      _id: template._id,
      title: template.doc_name,
      thumbnailUrl: template.doc_content.video_thumbnailUrl,
      status: template.doc_content.status,
      editedAt: template.updatedAt,
      videoUrl: template.doc_content.video_url,
    }));

  return (
    <>
      <main>
        <div className="flex justify-between items-center mt-8 ">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">Text to video</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
              My videos
            </p>
          </div>
          <div className="w-full flex justify-end gap-2">
            <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md">
              <Search className="text-gray-500" size={20} />
              <input
                type="search"
                className="outline-none h-[40px] w-full"
                placeholder="Search template"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <CreateVideoDialog templates={templates} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 mt-8">
          {loading ? (
            <div className="grid grid-cols-1 gap-5 mt-8">
              <TemplateLoader />
            </div>
          ) : filteredTemplates && filteredTemplates.length > 0 ? (
            <Suspense fallback={<TemplateLoader />}>
              <VideoTable
                videos={filteredTemplates}
                onRemove={handleRemove}
                onPreview={handlePreview}
              />
            </Suspense>
          ) : (
            <div className="text-center text-gray-500 text-2xl font-semibold col-span-4">
              No Videos Available
            </div>
          )}
        </div>
      </main>
      <VideoPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        videoUrl={previewVideoUrl}
      />
    </>
  );
}
