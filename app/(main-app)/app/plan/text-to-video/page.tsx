"use client";
import instance from "@/config/axios.config";
import { MoreHorizontal, Search } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import CreateVideoDialog from "./components/CreateVideoDialog";
import { Template } from "./components/types";
import toast from "react-hot-toast";
import TemplateLoader from "./components/TemplateLoader"; // Import your loading component
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import "@/styles/editor.css";
import ConfirmDialog from "./components/ConfirmDialog";

const outputType = [
  { label: "Download", value: "download" },
  { label: "Delete", value: "delete" },
];

const VideoCard = ({
  _id,
  title,
  thumbnailUrl,
  status,
  editedAt,
  videoUrl,
  onRemove,
}: {
  _id: string;
  title: string;
  thumbnailUrl: string;
  status: string;
  editedAt: string;
  videoUrl: string;
  onRemove: (id: string) => void;
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSelectChange = async (value: string) => {
    if (value === "delete") {
      setIsDialogOpen(true);
    } else if (value === "download") {
      try {
        const response = await fetch(videoUrl);
        if (!response.ok) {
          throw new Error("File not found");
        }

        const blob = await response.blob();

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${_id}.mp4`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);

        toast.success("Download started");
      } catch (error) {
        toast.error("Failed to download video");
        console.error("Download error:", error);
      }
    }
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await instance.delete(`/users/api/v1/docs/${_id}`);
      onRemove(_id);
      toast.success("Video removed");
    } catch (error) {
      toast.error("Failed to remove video");
      console.error("Remove error:", error);
    } finally {
      setIsDeleting(false);
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="flex items-center h-[104px] border border-[#EBEBEB] mt-[20px] px-[20px] transition duration-300 hover:border-primary-green">
      <div className="flex items-center w-full justify-between gap-4">
        <div className="w-[64px] h-[64px]">
          <img
            className="object-cover w-full h-full rounded-2xl"
            src={thumbnailUrl}
            alt="video"
          />
        </div>
        <div className="flex-1 flex items-center">
          <p className="text-[16px] font-medium truncate max-w-[200px]">
            {title}
          </p>
        </div>
        <div className="flex-1 flex justify-center">
          <button className="bg-[#EBEBEB] px-[22px] py-[6px] text-[14px] rounded-[30px]">
            {status}
          </button>
        </div>
        <div className="flex-shrink-0">
          <span className="text-[#151B23] text-[16px] font-normal">
            Edited about{" "}
            {Math.round(
              (new Date().getTime() - new Date(editedAt).getTime()) / 3600000
            )}{" "}
            hours ago
          </span>
        </div>
        <div className="flex-shrink-0 flex items-center gap-4">
          <div className="remove-caret change-bg">
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="p-1 bg-white border-0 h-10 hover:bg-gray-100 rounded-lg">
                <MoreHorizontal size={20} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {outputType.map(({ label, value }) => (
                    <SelectItem value={value} key={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

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
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, []);

  const handleRemove = (id: string) => {
    setTemplates((prevTemplates) =>
      prevTemplates
        ? prevTemplates.filter((template) => template._id !== id)
        : null
    );
  };

  const filteredTemplates = templates?.filter((template) =>
    template.doc_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Fragment>
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
              {/* Add loading skeleton or placeholder here */}
              <TemplateLoader />
            </div>
          ) : filteredTemplates && filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => (
              <VideoCard
                key={template._id}
                title={template.doc_name}
                thumbnailUrl={template.doc_content.video_thumbnailUrl}
                status={template.doc_content.status}
                editedAt={template.updatedAt}
                videoUrl={template.doc_content.video_url}
                onRemove={handleRemove}
                _id={template._id}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 text-2xl font-semibold col-span-4">
              No Videos Available
            </div>
          )}
        </div>
      </main>
    </Fragment>
  );
}
