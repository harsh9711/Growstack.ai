"use client";

import { VideoMedia } from "@/components/svgs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { ChevronRight, Plus, Search } from "lucide-react";
import { TbTemplate } from "react-icons/tb";
import PptDialog from "./PptDialog";
import VideoTemplateCard from "./VideoTemplateCard";
import { Template } from "./types";
import Motion from "@/components/Motion";
import Spinner from "@/components/Spinner";
import { GenerateAi } from "@/components/svgs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { API_URL } from "@/lib/api";
import instance from "@/config/axios.config";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Base64 } from "js-base64";
import { Minus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import { z } from "zod";
import AvatarSelection from "./AvatarSelection";
import AudioBox from "./AudioBox";
import { CustomSelect } from "./Select";
import TemplateLoader from "./TemplateLoader";
export interface VideoStatus {
  createdAt: number;
  download: string;
  duration: string;
  id: string;
  lastUpdatedAt: number;
  status: "complete" | "in_progress";
  title: string;
  visibility: "public" | "private";
}

const CreateVideoDialog = ({
  templates,
}: {
  templates: Array<Template> | null;
}) => {
  const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    objective: z.string().min(1, "Objective is required"),
    language: z.string().optional(),
    tone: z.string().optional(),
    speaker: z.string().optional(),
    audience: z.string().optional(),
  });

  type FormSchema = z.infer<typeof formSchema>;

  type FieldsState = {
    objective: boolean;
    language: boolean;
    tone: boolean;
    speaker: boolean;
    audience: boolean;
  };

  interface Avatar {
    thumbnailUrl: string;
    avatar: string;
    name: string;
    role: string;
    id: string;
  }

  interface Voice {
    id: string;
    name: string;
  }

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [videoScript, setVideoScript] = useState("");
  const [outputVideo, setOutputVideo] = useState<VideoStatus | null>(null);
  const [assistants, setAssistants] = useState<Avatar[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [fields, setFields] = useState<FieldsState>({
    objective: false,
    language: false,
    tone: false,
    speaker: false,
    audience: false,
  });
  const [scriptIndex, setScriptIndex] = useState(0);
  const [formData, setFormData] = useState<FormSchema>({
    title: "",
    objective: "",
    language: "",
    tone: "",
    speaker: "",
    audience: "",
  });
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [selectedAvatarId, setSelectedAvatarId] = useState<string | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [voices, setVoices] = useState<
    Array<{ id: string; name: string; sampleUrl: string }>
  >([]);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [playingSampleUrl, setPlayingSampleUrl] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [tone, settone] = useState<string>("");
  const handleVoiceSelect = (voiceId: string) => {
    setSelectedVoice(voiceId);
  };
  useEffect(() => {
    const loadAvatars = async () => {
      try {
        const response = await instance.get(
          `${API_URL}/ai/api/v1/video/avatars`
        );
        setAssistants(
          response.data.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            thumbnailUrl: item.thumbnailUrl,
          }))
        );
      } catch (error) {
        toast.error("Error fetching avatars");
      } finally {
        setLoading(false);
      }
    };

    const loadVoices = async () => {
      try {
        const response = await instance.get(
          `${API_URL}/ai/api/v1/video/voices`
        );
        setVoices(response.data.data);
      } catch (error) {
        toast.error("Error fetching voices");
      }
    };

    loadAvatars();
    loadVoices();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const [generatingVideo, setGeneratingVideo] = useState(false);

  const generateVideo = async (scriptElements: string[]) => {
    if (!selectedAvatar) {
      toast.error("Please select an avatar");
      return;
    }
  
    setGeneratingVideo(true);
    setLoading(true);
  
    try {
      const moments = scriptElements.map((scriptElement) => ({
        transcript: scriptElement,
        avatarId: selectedAvatar.id,
        voiceId: selectedVoice || "",
      }));
  
      const videoData = {
        title: formData.title,
        input: moments,
        thumbnailUrl: selectedAvatar.thumbnailUrl,
      };
  
      const videoResponse = await instance.post(
        `${API_URL}/ai/api/v1/generate/video`,
        videoData
      );
  
      if (videoResponse.data.success) {
        toast.success("Video generation request successful");
        setOutputVideo(videoResponse.data.data);
        setStep(3);
      } else {
        toast.error("Failed to generate video");
        setStep(0);
      }
    } catch (error) {
      toast.error("Error generating video");
      setStep(0);
    } finally {
      setLoading(false);
      setGeneratingVideo(false);
    }
  };
  

  const handleSubmit = async () => {
    const validation = formSchema.safeParse(formData);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }
    if (!selectedAvatar) {
      toast.error("Please select an avatar");
      return;
    }

    setLoading(true);
    setStep(1);

    try {
      const scriptResponse = await instance.post(
        `${API_URL}/ai/api/v1/generate/video/video-script`,
        formData
      );

      if (scriptResponse.data.success) {
        setVideoScript(scriptResponse.data.data.script);
        toast.success(scriptResponse.data.message);
        setStep(2);
        await generateVideo(scriptResponse.data.data.script);
      } else {
        toast.error("Failed to generate script");
        setStep(0);
      }
    } catch (error) {
      toast.error("Error submitting the form");
      setStep(0);
    }
  };

  const handleAvatarSelect = (avatar: Avatar) => {
    setSelectedAvatar(avatar);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      objective: "",
      language: "",
      tone: "",
      speaker: "",
      audience: "",
    });
    setFields({
      objective: false,
      language: false,
      tone: false,
      speaker: false,
      audience: false,
    });
    setVideoScript("");
    setOutputVideo(null);
    setSelectedAvatar(null);
    setSelectedAvatarId(null);
    setSelectedVoice(null);
    setStep(0);
    setLoading(false);
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    setDialogOpen(false);
  };

  const filteredAvatars = assistants.filter((avatar) =>
    avatar.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
 

  return (
    <Dialog>
      <DialogTrigger>
        <button className="bg-primary-green text-white sheen transition duration-500 px-5 py-3.5 rounded-xl flex items-center gap-2">
          <Plus size={20} />
          Create new video with AI
        </button>
      </DialogTrigger>
      <DialogContent
        className="max-w-[90%] h-[90vh] px-10 py-7"
        onCloseAutoFocus={handleClose}
      >
        {loading && (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <TemplateLoader />
    </div>
  )}

        <div className="relative w-full space-y-6 text-[12px] h-full flex flex-col">
          <main className="flex flex-col gap-x-10">
            <div className="w-full flex flex-row gap-y-4 gap-x-10 mb-6 ">
              <div className="flex w-2/3 flex-col gap-y-6 gap-x-4">
                <div className="flex flex-col w-full">
                  <div className="w-full space-y-2">
                    <label
                      htmlFor="title"
                      className="flex items-center font-semibold gap-x-3"
                    >
                      <span className="space-x-2 text-[15px] ">
                        Title <span className="text-[#F93939]">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Type video title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="border border-[#DEDEDE] bg-[#F5F5F5] h-[54px] w-full rounded-xl outline-none focus:border-primary-green transition-all p-4"
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-x-6 w-full">
                  <div className="flex flex-col w-full space-y-2">
                    <label
                      htmlFor="objective"
                      className="flex items-center font-semibold gap-x-3"
                    >
                      <span className="space-x-2 text-[15px] ">
                        Objective <span className="text-[#F93939]">*</span>
                      </span>
                    </label>
                    <textarea
                      name="objective"
                      placeholder="Introduction to financial well-being"
                      value={formData.objective}
                      onChange={handleInputChange}
                      className="border border-[#DEDEDE] bg-[#F5F5F5] resize-none h-[160px] w-full rounded-xl outline-none focus:border-primary-green transition-all p-4"
                    ></textarea>
                  </div>
                  <div className="flex flex-col w-full gap-y-4">
                    <div className="flex flex-col w-full space-y-2">
                      <label
                        htmlFor="speaker"
                        className="flex items-center font-semibold gap-x-3"
                      >
                        <span className="space-x-2 text-[15px] ">Speaker</span>
                      </label>
                      <motion.input
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        type="text"
                        name="speaker"
                        placeholder="Give a name or title to the speaker"
                        value={formData.speaker}
                        onChange={handleInputChange}
                        className="border border-[#DEDEDE] bg-[#F5F5F5] h-[54px] w-full rounded-xl outline-none focus:border-primary-green transition-all p-4"
                      />
                    </div>

                    <div className="flex flex-col w-full space-y-2">
                      <label
                        htmlFor="audience"
                        className="flex items-center font-semibold gap-x-3"
                      >
                        <span className="space-x-2 text-[15px] ">
                          Target Audience{" "}
                        </span>
                      </label>
                      <motion.input
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        type="text"
                        name="audience"
                        placeholder="Who will be watching this video?"
                        value={formData.audience}
                        onChange={handleInputChange}
                        className="border border-[#DEDEDE] bg-[#F5F5F5] h-[54px] w-full rounded-xl outline-none focus:border-primary-green transition-all p-4"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-y-4 w-1/3">
  <div className="flex relative z-30 flex-col gap-y-2 mb-2">
    <label
      htmlFor="language"
      className="flex items-center font-semibold gap-x-3"
    >
      <span className="space-x-2 text-[15px]">Language</span>
    </label>
    <CustomSelect
      placeholder="Select Language"
      options={[
        "English",
        "Spanish",
        "French",
        "German",
        "Chinese",
        "Japanese",
        "Korean",
        "Russian",
        "Portuguese",
        "Italian",
      ]}
      value={selectedLanguage}
      onChange={(value: string) => setSelectedLanguage(value)}
    />
  </div>

  <div className="flex relative z-20 flex-col gap-y-2">
    <label
      htmlFor="tone"
      className="flex items-center font-semibold gap-x-3"
    >
      <span className="space-x-2 text-[15px]">Tone</span>
    </label>
    <CustomSelect
      placeholder="Select Tone"
      options={["Professional", "Casual", "Friendly"]}
      value={tone}
      onChange={(value: string) => settone(value)}
    />
  </div>

  <div className="relative z-10">
    <AudioBox
      selectedVoice={selectedVoice}
      onVoiceSelect={handleVoiceSelect}
    />
  </div>
</div>

            </div>

            <div className="w-full flex relative z-0">
              {loading ? (
                <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
                  <Motion
                    transition={{ duration: 1 }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                  >
                    <div
                      className={clsx(
                        "flex gap-3 items-center py-4 px-6 w-full rounded-lg",
                        step === 1
                          ? "bg-gray-200 text-gray-700"
                          : "bg-green-200 text-green-800"
                      )}
                    >
                      {step > 1 ? <span>✔</span> : <Spinner />}
                      <p className="ml-2">
                        {step === 1
                          ? "Generating a video script..."
                          : "Video script generated"}
                      </p>
                    </div>
                  </Motion>
                  {step > 1 && (
                    <Motion
                      transition={{ duration: 1 }}
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                      }}
                    >
                      <div
                        className={clsx(
                          "flex gap-3 items-center py-4 px-6 w-full rounded-lg mt-2",
                          step === 2
                            ? "bg-gray-200 text-gray-700"
                            : "bg-green-200 text-green-800"
                        )}
                      >
                        {step > 2 ? (
                          <span>✔</span>
                        ) : step === 2 ? (
                          <Spinner />
                        ) : null}
                        <p className="ml-2">
                          {step === 2
                            ? "Generating video with script..."
                            : step > 2
                            ? "Video generation started"
                            : null}
                        </p>
                      </div>
                    </Motion>
                  )}
                  {step > 2 && (
                    <Motion
                      transition={{ duration: 1 }}
                      variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                      }}
                    >
                      <div
                        className={clsx(
                          "flex gap-3 items-center py-4 px-6 w-full rounded-lg mt-2",
                          step === 3
                            ? "bg-gray-200 text-gray-700"
                            : "bg-green-200 text-green-800"
                        )}
                      >
                        {step === 3 ? (
                          <Spinner />
                        ) : step > 3 ? (
                          <span>✔</span>
                        ) : null}
                        <p className="ml-2">
                          {step === 3
                            ? "Generating video, this might take a while..."
                            : step > 3
                            ? "Video generated successfully"
                            : null}
                        </p>
                      </div>
                    </Motion>
                  )}
                </div>
              ) : (
                //  outputVideo ? (
                //   <Motion
                //     transition={{ duration: 0.5 }}
                //     variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                //     classNames="flex flex-col justify-between"
                //   >
                //     <div className="flex flex-col items-center">
                //       <h2 className="mb-2">Your video is ready!</h2>
                //       <p className="mb-4 text-lg font-semibold">
                //         {outputVideo.title}
                //       </p>
                //       <video controls className="rounded-xl w-full max-w-4xl">
                //         <source src={outputVideo.download} type="video/mp4" />
                //         Your browser does not support the video tag.
                //       </video>
                //     </div>
                //     <div className="flex justify-end">
                //       <button
                //         onClick={navigateToEditor}
                //         className="bg-primary-green text-white py-3.5 px-4 sheen rounded-xl flex items-center justify-center"
                //       >
                //         Continue in editor
                //       </button>
                //     </div>
                //   </Motion>
                // ) :
                <Motion
                  transition={{ duration: 0.5 }}
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                  classNames="flex-1 w-full h-full grid relative z-10 place-content-center"
                >
                  <div>
                    {/* {selectedAvatar && (
                      <div className=" mb-0 flex flex-col items-start justify-center">
                        <h2 className=" font-semibold mb-2">Selected Avatar</h2>{" "}
                        <div className="flex flex-col items-center justify-center">
                          <img
                            src={selectedAvatar.thumbnailUrl}
                            alt={selectedAvatar.name}
                            className="w-32 h-32 object-cover rounded"
                          />
                          <p className="">{selectedAvatar.name}</p>
                        </div>
                      </div>
                    )} */}
                    <div className="flex flex-row w-[1640px] justify-between items-center mb-6">
                      <h2 className="text-lg font-semibold mb-4">
                        Select your Avatar
                      </h2>

                      <div className="flex flex-row items-center justify-center gap-x-6">
                        <div className="bg-white border text-[13px] border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3  items-center w-full max-w-[300px]">
                          <Search className="text-gray-500" size={20} />
                          <input
                            type="text"
                            placeholder="Search Avatars..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className=" p-2 rounded"
                          />{" "}
                        </div>
                        <button
                          disabled={loading}
                          className={clsx(
                            " bg-primary-green text-[15px] text-white py-3.5 px-20 w-full rounded-xl flex items-center justify-center",
                            loading && "opacity-80 cursor-not-allowed"
                          )}
                          onClick={handleSubmit}
                        >
                          {loading ? <Spinner /> : "Generate Video"}
                        </button>
                      </div>
                    </div>
                    <AvatarSelection
                      avatars={filteredAvatars}
                      onSelect={handleAvatarSelect}
                    />
                  </div>
                </Motion>
              )}
            </div>
          </main>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateVideoDialog;
