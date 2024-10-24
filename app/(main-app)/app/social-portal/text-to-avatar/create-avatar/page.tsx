"use client";
import FrameIconSvg from "@/components/svgs/frameicon";
import { use } from "marked";
import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import AvatarSelection from "../components/AvatarSelection";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import toast from "react-hot-toast";
import TemplateLoader from "../components/TemplateLoader";
import AudioBox from "../components/AudioBox";
import { useRouter } from "next/navigation";
import { ArrowBack } from "@/components/svgs";
import { MoreHorizontal, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
} from "@/components/ui/select";
import DownloadCircle from "@/components/svgs/download";
import Delete from "@/components/svgs/delete";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface FormData {
  title: string;
  language: string;
  speaker: string;
  objective: string;
  tone: string;
  voices: string;
  audience: string;
  autoCaptions: boolean;
}

interface FormErrors {
  title: string;
  objective: string;
}

interface Avatar {
  thumbnailUrl: string;
  avatar: string;
  name: string;
  role: string;
  id: string;
}

const CreateScript = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSelectedAvatar, setIsSelectedAvatar] = useState<boolean>(false);
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [assistants, setAssistants] = useState<Avatar[]>([]);
  const [isPreviewScriptPage, setIsPreviewScriptPage] =
    useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    language: "",
    speaker: "",
    objective: "",
    tone: "",
    voices: "",
    audience: "",
    autoCaptions: false,
  });

  const languages = [
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
  ];

  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [scriptResponseData, setScriptResponseData] = useState<string[]>([]);

  const [errors, setErrors] = useState<FormErrors>({
    title: "",
    objective: "",
  });
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAvatarSelect = (avatar: Avatar) => {
    setSelectedAvatar(avatar);
    if (selectedAvatar) {
      setIsSelectedAvatar(true);
    }
  };

  useEffect(() => {
    setLoading(true);
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

    loadAvatars();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSubmitted && progress < 95) {
      interval = setInterval(() => {
        setProgress(prev => (prev < 95 ? prev + 5 : prev)); // Slowly increment progress to 95%
      }, 300);
    }

    return () => clearInterval(interval);
  }, [isSubmitted, progress]);

  const filteredAvatars = assistants.filter(avatar =>
    avatar.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      setFormData({
        ...formData,
        [name]: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async () => {
    let validationErrors: FormErrors = {
      title: "",
      objective: "",
    };

    if (!formData.title) {
      validationErrors.title = "Title is required.";
    }

    if (
      !formData.objective ||
      formData.objective.trim().split(/\s+/).length < 10
    ) {
      validationErrors.objective = "Objective must contain at least 10 words.";
    }

    if (validationErrors.title || validationErrors.objective) {
      setErrors(validationErrors);
    } else {
      setIsSubmitted(true);
      try {
        const scriptResponse = await instance.post(
          `${API_URL}/ai/api/v1/generate/video/video-script`,
          formData
        );
        console.log(formData);

        if (scriptResponse.data.success) {
          // setVideoScript(scriptResponse.data.data.script);
          // await generateVideo(scriptResponse.data.data.script);
          setProgress(100);
          console.log("=====================", scriptResponse.data.data.script);
          setScriptResponseData(scriptResponse.data.data.script);
          setIsPreviewScriptPage(true);
        } else {
          toast.error("Failed to generate script");
        }
      } catch (error) {
        toast.error("Error submitting the form");
      } finally {
        setIsSubmitted(false);
        setProgress(0);
      }
    }
  };

  const handleReset = () => {
    setFormData({
      title: "",
      language: "",
      speaker: "",
      objective: "",
      tone: "",
      voices: "",
      audience: "",
      autoCaptions: false,
    });
    setErrors({
      title: "",
      objective: "",
    });
  };

  const handleVoiceSelect = (voiceId: string) => {
    setSelectedVoice(voiceId);
    formData.voices = voiceId;
  };

  return (
    <>
      {isPreviewScriptPage ? (
        <div>
          <PreviewScriptPage
            isPreviewScriptPage={isPreviewScriptPage}
            setIsPreviewScriptPage={setIsPreviewScriptPage}
            avatarName={selectedAvatar?.name}
            avatarThumbnil={selectedAvatar?.thumbnailUrl}
            usertitle={formData?.title}
            Script={scriptResponseData}
            setIsSelectedAvatar={setIsSelectedAvatar}
            voiceId={formData?.voices}
            avatarId={selectedAvatar?.id}
          />
        </div>
      ) : (
        <div className="grid h-full grid-cols-1 gap-5 mt-5">
          {isSelectedAvatar ? (
            <div>
              {isSubmitted ? (
                <div className="h-[80vh] w-full">
                  <div className="mt-10 h-full flex flex-col items-center justify-center space-y-4">
                    <div className="relative h-[160px] w-[160px] rounded-[17px] overflow-hidden">
                      <img
                        src={selectedAvatar?.thumbnailUrl}
                        alt="Nature"
                        className="object-cover h-full w-full"
                      />
                    </div>

                    <div>
                      <p className="text-[24px] font-semibold text-gray-800">
                        Creating your project
                      </p>
                    </div>

                    <div className="w-full max-w-[542px] bg-[#DDDDDD] rounded-full h-2">
                      <div
                        className="bg-[#034737] h-2 rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>

                    <div>
                      {[
                        `${selectedAvatar?.name} is starting the day!`,
                        `${selectedAvatar?.name} is enjoying a cozy coffee break.`,
                        `${selectedAvatar?.name} is getting ready with a touch of makeup.`,
                        `${selectedAvatar?.name} is practicing the lines for the big moment!`,
                      ].map((message, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <span className="text-[32px] text-[#034737] leading-none">
                            •
                          </span>
                          <p className="text-[16px] text-gray-800">{message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-7 items-center w-full max-h-screen col-span-4">
                  <div className="text-[#14171B] lg:text-[32px] md:text-[30px] text-center font-semibold font-poppins tracking-[0.3%]">
                    Type your script
                  </div>
                  <div className="rounded-[15px] shadow-lg border border-[#E0E0E0] bg-[#FFFFFF]">
                    <div className="md:w-[600px] md:h-[450px] lg:w-[718px] lg:h-[450px] xl:h-[550px] 2xl:w-[818px] 2xl:h-[644px]">
                      <div className="flex flex-col p-5 items-center justify-center w-full h-full">
                        <form
                          className="space-y-4 w-full p-3 h-full overflow-y-auto
                            [&::-webkit-scrollbar]:w-2
                            [&::-webkit-scrollbar-track]:rounded-full
                            [&::-webkit-scrollbar-track]:bg-[#DDDDDD]
                            [&::-webkit-scrollbar-thumb]:rounded-full
                            [&::-webkit-scrollbar-thumb]:bg-[#034737]
                            dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                        >
                          <div className="w-full">
                            <label className="block font-semibold text-[18px]">
                              Title <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="title"
                              value={formData.title}
                              onChange={handleChange}
                              placeholder="Type avatar title"
                              className="mt-1 block p-2 rounded-md border border-[#DEDEDE] h-[44px] w-[98%] bg-[#F5F5F5] shadow-sm sm:text-sm"
                            />
                            {errors.title && (
                              <p className="text-red-500 text-sm">
                                {errors.title}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block font-semibold text-[18px]">
                              Language
                            </label>
                            <select
                              name="language"
                              value={formData.language}
                              onChange={handleChange}
                              className="mt-1 block p-2 cursor-pointer rounded-md border border-[#DEDEDE] h-[44px] w-[98%] bg-[#F5F5F5] shadow-sm sm:text-sm"
                            >
                              <option className="hover:bg-[#EDEDED]" value="">
                                Select language
                              </option>
                              {languages.map((language, index) => (
                                <option
                                  className="hover:bg-[#EDEDED]"
                                  key={index}
                                  value={language}
                                >
                                  {language}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block font-semibold text-[18px]">
                              Speaker
                            </label>
                            <input
                              type="text"
                              name="speaker"
                              value={formData.speaker}
                              onChange={handleChange}
                              placeholder="Give a name or title to speaker"
                              className="mt-1 block p-2 rounded-md border border-[#DEDEDE] h-[44px] w-[98%] bg-[#F5F5F5] shadow-sm sm:text-sm"
                            />
                          </div>

                          <div>
                            <label className="block font-semibold text-[18px]">
                              Objective <span className="text-red-500">*</span>
                            </label>
                            <textarea
                              name="objective"
                              value={formData.objective}
                              onChange={handleChange}
                              placeholder="Introduction to financial well-being"
                              className="mt-1 block p-2 rounded-md border border-[#DEDEDE] h-[163px] w-[98%] bg-[#F5F5F5] shadow-sm sm:text-sm"
                            />
                            {errors.objective && (
                              <p className="text-red-500 text-sm">
                                {errors.objective}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block font-semibold text-[18px]">
                              Tone
                            </label>
                            <select
                              name="tone"
                              value={formData.tone}
                              onChange={handleChange}
                              className="mt-1 block p-2 rounded-md border cursor-pointer border-[#DEDEDE] h-[44px] w-[98%] bg-[#F5F5F5] shadow-sm sm:text-sm"
                            >
                              <option value="" className="hover:bg-[#EDEDED]">
                                Select tone
                              </option>
                              <option
                                value="Professional"
                                className="hover:bg-[#EDEDED]"
                              >
                                Professional
                              </option>
                              <option
                                value="Casual"
                                className="hover:bg-[#EDEDED]"
                              >
                                Casual
                              </option>
                              <option
                                value="Friendly"
                                className="hover:bg-[#EDEDED]"
                              >
                                Friendly
                              </option>
                            </select>
                          </div>

                          <div className="relative z-10">
                            {/* <label className="block font-semibold text-[18px]">
                          Voices
                        </label>
                        <select
                          name="voices"
                          value={formData.voices}
                          onChange={handleChange}
                          className="mt-1 block p-2 rounded-md border cursor-pointer border-[#DEDEDE] h-[44px] w-[98%] bg-[#F5F5F5] shadow-sm sm:text-sm"
                        >
                          <option>Select voice</option>
                        </select> */}
                            <AudioBox
                              selectedVoice={selectedVoice}
                              onVoiceSelect={handleVoiceSelect}
                            />
                          </div>

                          <div>
                            <label className="block font-semibold text-[18px]">
                              Target audience
                            </label>
                            <input
                              type="text"
                              name="audience"
                              value={formData.audience}
                              onChange={handleChange}
                              placeholder="Who will be watching this avatar?"
                              className="mt-1 block p-2 rounded-md border border-[#DEDEDE] h-[44px] w-[98%] bg-[#F5F5F5] shadow-sm sm:text-sm"
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[15px] shadow-lg border border-[#E0E0E0] bg-[#FFFFFF]">
                    <div className="flex items-center justify-center md:w-[600px] lg:w-[718px] 2xl:w-[818px] h-[113px]">
                      <div className="flex flex-row justify-between items-center w-full">
                        <div className="p-5 flex flex-row">
                          <div>
                            <FrameIconSvg />
                          </div>
                          <div className="ml-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                              Auto captions
                            </h2>
                            <p className="text-gray-500 text-sm">
                              Add automatic subtitles to your video
                            </p>
                          </div>
                        </div>
                        <div className="p-5">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              name="autoCaptions"
                              checked={formData.autoCaptions}
                              onChange={handleChange}
                              className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:outline-none peer-focus:ring-0 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#034737]" />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center md:w-[600px] lg:w-[718px] 2xl:w-[818px] h-[50px]">
                    <div className="w-full flex justify-end gap-x-4 items-center">
                      <button
                        type="button"
                        className="h-full w-[150px] rounded-[10px] focus:outline-none border border-[#FF0000] text-[#FF0000] font-medium text-sm px-5 py-2.5"
                        onClick={handleReset}
                      >
                        Reset
                      </button>
                      <button
                        type="button"
                        className="h-full w-[225px] focus:outline-none border bg-[#034737] text-[#FFFFFF] font-medium rounded-[10px] text-sm px-5 py-2.5"
                        onClick={handleSubmit}
                      >
                        <div className="flex flex-1 gap-3">
                          <span className="text-[25px]">+</span>
                          <span className="text-[16px]">Create new avatar</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 mt-8">
              <div className="flex flex-col gap-10 items-center w-full h-[85vh] max-h-screen overflow-hidden col-span-4">
                <div className="text-[#14171B] lg:text-[32px] md:text-[30px] text-center font-semibold font-poppins tracking-[0.3%]">
                  Which avatar will bring your message to life?
                </div>
                {loading ? (
                  <div className="grid grid-cols-1 gap-5 mt-8">
                    <TemplateLoader />
                  </div>
                ) : (
                  <div className="overflow-y-auto">
                    <AvatarSelection
                      avatars={filteredAvatars}
                      onSelect={handleAvatarSelect}
                      selectedAvatarId={selectedAvatar?.id || null}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CreateScript;

interface PreviewScriptPageProps {
  isPreviewScriptPage: boolean;
  setIsPreviewScriptPage: (value: boolean) => void;
  avatarName?: string;
  avatarThumbnil?: string;
  usertitle?: string;
  Script?: string[];
  setIsSelectedAvatar: (value: boolean) => void;
  voiceId?: string;
  avatarId?: string;
}

interface FormattedInput {
  transcript: string;
  avatarId: string;
  voiceId: string;
}

interface FormattedData {
  title: string;
  input: FormattedInput[];
  thumbnailUrl: string;
}

const PreviewScriptPage: React.FC<PreviewScriptPageProps> = ({
  isPreviewScriptPage,
  setIsPreviewScriptPage,
  avatarName,
  avatarThumbnil = "",
  usertitle = "Untitled Video",
  Script = [],
  setIsSelectedAvatar,
  voiceId = "",
  avatarId = "",
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const getScenePair = (
    index: number
  ): { firstPart: string; secondPart: string } => {
    const firstPart = Script?.[index * 2] || "";
    const secondPart = Script?.[index * 2 + 1] || "";
    return { firstPart, secondPart };
  };

  const combinedScript: string[] = [];
  for (let i = 0; i < Script.length; i += 2) {
    combinedScript.push(`${Script[i]} ${Script[i + 1]}`);
  }

  const formattedData: FormattedData = {
    title: usertitle,
    input: combinedScript.map(
      (transcript: string): FormattedInput => ({
        transcript,
        avatarId: avatarId,
        voiceId: voiceId,
      })
    ),
    thumbnailUrl: avatarThumbnil,
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleVideoCreation = async () => {
    setIsModalOpen(true);
    try {
      const response = await instance.post(
        `${API_URL}/ai/api/v1/generate/video`,
        formattedData
      );
  
      toast.success('Video creation started successfully!');
    } catch (error) {
      toast.error('Failed to create video. Please try again.');
    }
  };

  const handleNavigate = () => {
    // router.push("/app/social-portal/text-to-avatar/create-avatar");
    setIsModalOpen(false);
    setIsSelectedAvatar(false);
    setIsPreviewScriptPage(false);
  };
  // onOpenChange={() => setIsModalOpen(false)}
  return (
    <div className="flex flex-col mt-2">
      <Dialog open={isModalOpen}>
        <DialogContent
          showCloseButton
          className="w-[80%] md:w-[85%] max-w-3xl p-0 pb-4 border-0"
        >
          <div className="flex flex-col h-fill w-full p-4 items-center justify-center space-y-5">
            <div className="h-[150px] w-[150px] rounded-[20px]">
              <img
                src={avatarThumbnil}
                className="h-full w-full rounded-[20px] object-cover"
              />
            </div>
            <div>
              <p className="text-[22px] text-[#14171B]">{`${avatarName} is creating your Masterpiece...`}</p>
            </div>
            <div>
              <p className="text-center text-[16px] text-[#b6b6b6]">
                Everything happens on our side, we will send you an email when
                <br></br>your video is ready.
              </p>
            </div>
            <div className="space-x-5">
              <button
                className="rounded-[10px] h-[52px] w-[212px] border-[1px] border-[#14171B]"
                onClick={() => router.push("/app/social-portal/text-to-avatar")}
              >
                Back To AI Text to Avatar
              </button>
              <button
                className="text-white bg-[#034737] rounded-[10px] h-[52px] w-[200px]"
                onClick={handleNavigate}
              >
                Create another video
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div className="w-full h-[65px] bg-[#EBF0F6] rounded-[100px]">
        <div className="h-full w-full flex flex-row justify-between items-center p-3">
          <div>
            <div className="flex flex-row items-center justify-center">
              <button
                className="flex items-center space-x-1 p-1"
                onClick={() => setIsPreviewScriptPage(false)}
              >
                <span>
                  <ArrowBack />
                </span>
                <span className="text-[16px] text-[#212833] font-semibold">
                  Back
                </span>
              </button>

              <div className="h-6 border-[1px] border-[#BFBFBF] mx-2"></div>

              <div className="text-[#14171B] text-[22px]">
                {`${avatarName} talks about ${usertitle}`}
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-row items-center justify-center space-x-2 p-3">
              <button
                className="flex items-center space-x-2 p-3 text-white bg-[#034737] rounded-[10px] h-[40px]"
                onClick={handleVideoCreation}
              >
                <span>
                  <Plus />
                </span>
                <span>Generate avatar</span>
              </button>
              <div>
                <div className="relative inline-flex" ref={dropdownRef}>
                  <button
                    id="hs-dropdown-custom-icon-trigger"
                    aria-haspopup="menu"
                    aria-expanded={isOpen ? "true" : "false"}
                    aria-label="Dropdown"
                    type="button"
                    className="flex bg-[#FFFFFF] rounded-[10px] h-[40px] w-[50px] items-center justify-center"
                    onClick={toggleDropdown}
                  >
                    <MoreHorizontal />
                  </button>

                  <div
                    className={`absolute right-0 z-10 transition-[opacity,margin] duration ${
                      isOpen ? "opacity-100 block" : "opacity-0 hidden"
                    } bg-white shadow-md rounded-lg mt-[50px] w-[150px] dark:bg-neutral-800 dark:border dark:border-neutral-700`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="hs-dropdown-custom-icon-trigger"
                  >
                    <div className="p-1 space-y-0.5 w-[150px]">
                      <button
                        onClick={() => alert("Download clicked")}
                        className="flex space-y-2 items-center px-4 py-2 w-[150px] text-left text-gray-700 hover:bg-gray-100"
                      >
                        <DownloadCircle />
                        Download
                      </button>
                      <button
                        onClick={() => {
                          setIsPreviewScriptPage(false);
                          setIsSelectedAvatar(false);
                        }}
                        className="flex space-y-2 items-center px-4 py-2 w-[150px] text-left hover:bg-gray-100"
                      >
                        <Delete />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-5 px-5 space-x-3 h-[75vh]">
        <div className="w-[500px] h[700px] flex items-center justify-center pt-4 rounded-[10px]">
          <img
            src={avatarThumbnil}
            alt="Avatar"
            className="h-full w-full object-cover rounded-[10px]"
          />
        </div>
        <div className="w-full pt-2">
          <div>
            <div className="w-full max-w-4xl mx-auto space-y-4 p-4">
              {[0, 1, 2, 3].map(sceneIndex => {
                const { firstPart, secondPart } = getScenePair(sceneIndex);

                return (
                  <div key={sceneIndex}>
                    <div className="bg-white rounded-lg shadow-md">
                      <div className="w-[80px] pt-3">
                        <div className="bg-green-800 text-white w-full px-3 py-1 text-sm rounded-r-[30px]">
                          Scene {sceneIndex + 1}
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-gray-700 text-sm">
                          {`${firstPart}${
                            secondPart ? ` ${secondPart.trim()}` : ""
                          }`}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
