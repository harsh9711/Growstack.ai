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
      .refine((value) => value.trim().split(/\s+/).length >= 10, {
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
      setIsPlanUsageLoading(true)
      const response = await instance.get(`${API_URL}/users/api/v1/plan-usage`);
      const data: PlanUsage = response.data.data;
      setPlanUsage(data);
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

    // Update the form data with the new value
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Validate the updated form data
    const validation = formSchema.safeParse({
      ...formData,
      [name]: value,
    });

    if (validation.success) {
      // Clear any previous errors for this field
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    } else {
      // Extract and set the validation errors
      const errors = validation.error.format();
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: errors[name as keyof typeof formData], // Cast to the correct key type
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

      // Form is valid and avatar is selected
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
        // toast.success("Video generation request successful");
        setOutputVideo(videoResponse.data.data);
        setStep(3);
        window.dispatchEvent(
          new CustomEvent("videoGenerationSuccess", {
            detail: videoResponse.data.data,
          })
        );
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
    // if (clicked) {
    //   setLoading(true);
    //   setTimeout(() => {
    //     setLoading(false);
    //   }, 16000);
    // }
    setClicked(false);
    setDialogOpen(false);
    resetForm();
  };

  useEffect(() => {
    fetchPlanUsage();
  }, []);

  const filteredAvatars = assistants.filter((avatar) =>
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
        onClick={(e) => {
          e.stopPropagation();
          if (!planUsage?.usage_amount || planUsage?.usage_amount <= 0) {
            setIsAddOnModalOpen(true)
          } else {
            setDialogOpen(true)
          }
        }}
        className="bg-primary-green text-white sheen transition duration-500 px-5 py-3.5 rounded-xl flex items-center gap-2">
        <Plus size={20} />
        Create new video with AI
      </button>

      <GlobalModal title=" Add Credit to Your Wallet" open={isAddOnModalOpen} setOpen={() => { setIsAddOnModalOpen(false) }}>
        <div className="flex flex-row items-center justify-center px-4 pb-4 space-x-6">
          <p className="text-start text-gray-700 text-sm md:text-base px-4">
            To access this feature, please add credits to your wallet. You need sufficient balance to proceed with the video creation.
          </p>
          <Link
            className="bg-primary-green text-white text-nowrap py-2 px-6 rounded-md transition duration-300 hover:bg-green-600"
            href="/account/billings/settings">
            Add Credit
            
          </Link>
        </div>
      </GlobalModal>


    </div>
  );
};

export default CreateVideoDialog;
