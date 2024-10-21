"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { Plus, Search } from "lucide-react";
import { Template } from "./types";
import Motion from "@/components/Motion";
import Spinner from "@/components/Spinner";

import { API_URL } from "@/lib/api";
import instance from "@/config/axios.config";
import clsx from "clsx";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import AvatarSelection from "./AvatarSelection";
import AudioBox from "./AudioBox";
import { CustomSelect } from "./Select";
import GlobalModal from "@/components/modal/global.modal";
import { PlanUsage } from "@/types/common";
import Link from "next/link";
import Lock from "@/components/svgs/lock";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
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
    objective: z
      .string()
      .min(1, "Objective is required")
      .refine(value => value.trim().split(/\s+/).length >= 10, {
        message: " Objective must be at least 10 words",
      }),
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
  const { user } = useSelector((rootState: RootState) => rootState.auth);
  const [planUsage, setPlanUsage] = useState<PlanUsage | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [isPlanUsageLoading, setIsPlanUsageLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [videoScript, setVideoScript] = useState("");
  const [outputVideo, setOutputVideo] = useState<VideoStatus | null>(null);
  const [assistants, setAssistants] = useState<Avatar[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [clicked, setClicked] = useState(false);
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
  const [generatingVideo, setGeneratingVideo] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [playingSampleUrl, setPlayingSampleUrl] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [tone, settone] = useState<string>("");
  const [isAddOnModalOpen, setIsAddOnModalOpen] = useState<boolean>(false);
  const handleVoiceSelect = (voiceId: string) => {
    setSelectedVoice(voiceId);
  };
  const [formErrors, setFormErrors] = useState<{
    title?: { _errors: string[] };
    objective?: { _errors: string[] };
    speaker?: { _errors: string[] };
    audience?: { _errors: string[] };
  }>({});

  const fetchPlanUsage = async () => {
    try {
      setIsPlanUsageLoading(true);
      const response = await instance.get(`${API_URL}/users/api/v1/plan-usage`);
      const data: PlanUsage = response.data.data;
      setPlanUsage(data);
      if (user?.user_type !== "ADMIN" && data.usage.no_of_text_to_video <= 0) {
        setIsAddOnModalOpen(true);
      }
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error("Error fetching plan usage:", error);
    } finally {
      setIsPlanUsageLoading(false);
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

    setStep(1);
    try {
      const scriptResponse = await instance.post(
        `${API_URL}/ai/api/v1/generate/video/video-script`,
        formData
      );

      if (scriptResponse.data.success) {
        setVideoScript(scriptResponse.data.data.script);
        await generateVideo(scriptResponse.data.data.script);
      } else {
        toast.error("Failed to generate script");
      }
    } catch (error) {
      toast.error("Error submitting the form");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData(prevData => ({ ...prevData, [name]: value }));

    const validation = formSchema.safeParse({
      ...formData,
      [name]: value,
    });

    if (validation.success) {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        [name]: undefined,
      }));
    } else {
      const errors = validation.error.format();
      setFormErrors(prevErrors => ({
        ...prevErrors,
        [name]: errors[name as keyof typeof formData],
      }));
    }
  };

  const handleButtonClick = async () => {
    setLoading2(true);

    requestAnimationFrame(async () => {
      const validation = formSchema.safeParse(formData);
      if (!validation.success) {
        const errors = validation.error.format();
        setFormErrors(errors);
        toast.error(validation.error.errors[0].message);
        setLoading2(false);
        return;
      }
      if (!selectedAvatar) {
        toast.error("Please select an avatar");
        setLoading2(false);
        return;
      }

      setClicked(true);
      setStep(1);

      try {
        const scriptResponse = await instance.post(
          `${API_URL}/ai/api/v1/generate/video/video-script`,
          formData
        );

        if (scriptResponse.data.success) {
          setVideoScript(scriptResponse.data.data.script);
          await generateVideo(scriptResponse.data.data.script);
        } else {
          toast.error("Failed to generate script");
        }
      } catch (error) {
        toast.error(`Error submitting the form ${error}`);
      } finally {
        setLoading2(false);
        setLoading(true);

        setTimeout(() => {
          setDialogOpen(false);
          resetForm();
        }, 0);
      }
    });
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

  const LoadingOverlay = ({ progress }: { progress: number }) => {
    const [displayText, setDisplayText] = useState("Let AI do the magic");

    useEffect(() => {
      const timer = setTimeout(() => {
        setDisplayText("Your video is getting generated");
      }, 2000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-full max-w-sm bg-gray-200 rounded-lg">
            <div
              className="absolute top-0 left-0 h-full bg-primary-green rounded-lg"
              style={{ width: `${progress}%`, transition: "width 0.5s ease" }}
            />
          </div>
          <Image src="/image.png" width={40} height={40} alt="growstack" />
          <p className="text-white text-lg font-medium transition-opacity duration-1000">
            {displayText}
          </p>
        </div>
      </div>
    );
  };

  const generateVideo = async (scriptElements: string[]) => {
    if (!selectedAvatar) {
      toast.error("Please select an avatar");
      setLoading2(false);
      return;
    }

    setGeneratingVideo(true);
    setLoading(true);

    try {
      const moments = scriptElements.map(scriptElement => ({
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
        setOutputVideo(videoResponse.data.data);
        setStep(3);
        window.dispatchEvent(
          new CustomEvent("videoGenerationSuccess", {
            detail: videoResponse.data.data,
          })
        );
      } else {
        toast.error("Failed to generate avatar");
        setStep(0);
      }
    } catch (error) {
      toast.error("Error generating avatar");
      setStep(0);
    } finally {
      setLoading(false);
      setGeneratingVideo(false);
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
    setClicked(false);
    setDialogOpen(false);
    resetForm();
  };

  useEffect(() => {
    fetchPlanUsage();
  }, []);

  const filteredAvatars = assistants.filter(avatar =>
    avatar.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <LoadingOverlay progress={(step / 3) * 100} />;
  if (error) return <p>{error}</p>;
  const progress = (step / 3) * 100;

  return (
    <div className="relative">
      {" "}
      {loading2 && <LoadingOverlay progress={progress} />}
      <button
        disabled={isPlanUsageLoading}
        onClick={e => {
          e.stopPropagation();
          if (planUsage) {
            if (
              user?.user_type !== "ADMIN" &&
              planUsage.usage.no_of_text_to_avatar <= 0
            ) {
              setIsAddOnModalOpen(true);
            } else {
              setDialogOpen(true);
            }
          }
        }}
        className="bg-primary-green text-white sheen transition duration-500 px-5 py-3.5 rounded-xl flex items-center gap-2"
      >
        <Plus size={20} />
        Create new avatar with AI
      </button>
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
              className="text-red-500 border border-red-500 bg-transparent text-nowrap py-2 px-6 rounded-md transition duration-300"
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
      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="w-full 2xl:max-w-[90%] h-full 2xl:h-[90vh] px-10 py-7 overflow-x-hidden"
          onCloseAutoFocus={handleClose}
        >
          <div className="relative w-full max-w-full space-y-6 text-[12px] h-full flex flex-col overflow-x-hidden">
            <main className="flex flex-col gap-x-10">
              <div className="w-full gap-x-6 flex xl:flex-row  sm:flex-col lg:flex-row md:flex-row flex-col 2xl:flex-row gap-y-4 2xl:gap-x-10 mb-6">
                <div className="flex w-full 2xl:w-2/3 flex-col gap-y-6 gap-x-4">
                  <div className="flex flex-col w-[100%]">
                    <div className=" w-[98%] space-y-2 space-x-2">
                      <label
                        htmlFor="title"
                        className="flex items-center w-[98%] font-semibold gap-x-3"
                      >
                        <span className="space-x-2 text-[15px] ">
                          Title <span className="text-[#F93939]">*</span>
                        </span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        placeholder="Type avatar title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="border border-[#DEDEDE] bg-[#F5F5F5] h-[54px]  w-[98%] rounded-xl outline-none focus:border-primary-green transition-all p-4"
                      />
                      {formErrors.title && (
                        <span className="text-red-500 text-sm">
                          {formErrors.title._errors}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex xl:flex-row md:flex-row flex-row flex-col 2xl:flex-row gap-x-6 w-full space-x-2">
                    <div className="flex flex-col w-[98%] space-y-2">
                      <label
                        htmlFor="objective"
                        className="flex items-center w-full font-semibold gap-x-3"
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
                        className="border border-[#DEDEDE] bg-[#F5F5F5] resize-none h-[160px]  w-[98%] rounded-xl outline-none focus:border-primary-green transition-all p-4"
                      ></textarea>
                      {formErrors.objective && (
                        <span className="text-red-500 text-sm">
                          {formErrors.objective._errors}
                          <br></br>
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col w-full gap-y-4">
                      <div className="flex flex-col w-full space-y-2">
                        <label
                          htmlFor="speaker"
                          className="flex items-center font-semibold gap-x-3"
                        >
                          <span className="space-x-2 text-[15px] ">
                            Speaker
                          </span>
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
                          className="border border-[#DEDEDE] bg-[#F5F5F5] h-[54px] w-[98%] rounded-xl outline-none focus:border-primary-green transition-all p-4"
                        />
                      </div>

                      <div className="flex flex-col w-[98%] space-y-2">
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
                          placeholder="Who will be watching this avatar?"
                          value={formData.audience}
                          onChange={handleInputChange}
                          className="border border-[#DEDEDE] bg-[#F5F5F5] h-[54px] w-[98%] rounded-xl outline-none focus:border-primary-green transition-all p-4"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-y-4 w-[98%] 2xl:w-1/3">
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

              <div className="w-full flex relative z-0 overflow-hidden">
                {loading ? (
                  <div className="flex flex-col items-center w-full 2xl:max-w-3xl mx-auto space-y-4">
                    {/* <LoadingBar progress={progress} /> */}
                  </div>
                ) : (
                  <Motion
                    transition={{ duration: 0.5 }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 },
                    }}
                    classNames="flex w-full h-full grid relative z-10 place-content-center overflow-x-hidden"
                  >
                    <div className="w-full flex xl:flex-col sm:flex-col lg:flex-col md:flex-col flex-col 2xl:flex-col gap-y-4 2xl:gap-x-10 mb-6 overflow-x-hidden">
                      <div className="flex xl:flex-row md:flex-row sm:flex-col lg:flex-row 2xl:flex-row">
                        <div className="flex-1 flex items-center">
                          <h2 className="text-lg font-semibold mb-4 xl:mb-0">
                            Select your Avatar
                          </h2>
                        </div>

                        <div className="flex flex-col xl:flex-row md:flex-row lg:flex-row 2xl:flex-row flex-1 justify-end items-center gap-x-6">
                          <div className="bg-white border text-[13px] border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-[300px] md:width-[100%] mt-1">
                            <Search className="text-gray-500" size={20} />
                            <input
                              type="text"
                              placeholder="Search Avatars..."
                              value={searchQuery}
                              onChange={e => setSearchQuery(e.target.value)}
                              className="p-2 rounded"
                            />
                          </div>

                          <button
                            disabled={loading}
                            style={{ whiteSpace: "nowrap" }}
                            className={clsx(
                              "bg-primary-green text-[12px] text-white py-3.5 px-10 w-full width-[30%] rounded-xl flex items-center justify-center mt-1",
                              {
                                "opacity-80 cursor-not-allowed": loading,
                              }
                            )}
                            onClick={handleButtonClick}
                          >
                            {loading ? (
                              <Spinner />
                            ) : clicked ? (
                              "Avatar Generating..."
                            ) : (
                              "Generate Avatar"
                            )}
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
    </div>
  );
};

export default CreateVideoDialog;
