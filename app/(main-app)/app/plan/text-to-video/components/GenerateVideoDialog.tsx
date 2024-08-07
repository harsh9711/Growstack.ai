import Motion from "@/components/Motion";
import Spinner from "@/components/Spinner";
import { GenerateAi } from "@/components/svgs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import { z } from "zod";
import AvatarSelection from "./AvatarSelection";

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
interface Avatar {
  thumbnailUrl: string;
  avatar: string;
  name: string;
  role: string;
  id: string;
}
export default function GenerateVideoDialog() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [videoScript, setVideoScript] = useState("");
  const [outputVideo, setOutputVideo] = useState<VideoStatus | null>();
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const toggleField = (field: keyof FieldsState) => {
    setFields((prevFields) => ({
      ...prevFields,
      [field]: !prevFields[field],
    }));
  };

  const fetchAvatars = async () => {
    try {
      const response = await instance.get(`${API_URL}/ai/api/v1/video/avatars`);
      return response.data;
    } catch (error) {
      toast.error("Error fetching avatars");
      throw error;
    }
  };

  const generateVideo = async (scriptElements: string[]) => {
    if (!selectedAvatar) {
      toast.error("Please select an avatar");
      return;
    }

    try {
      const moments = scriptElements.map((scriptElement) => ({
        transcript: scriptElement,
        avatarId: selectedAvatar.id,
        voiceId: "3b4bd7b2-4ce0-438a-a37b-dce69fdf91ba",
      }));

      const videoData = {
        title: formData.title,
        input: moments,
        thumbnailUrl:selectedAvatar.thumbnailUrl,
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
    }
  };

  const handleSubmit = async () => {
    const validation = formSchema.safeParse(formData);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
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

  const navigateToEditor = () => {
    const videoData = JSON.stringify({
      videoData: { ...outputVideo, videoScript },
    });
    const encodedVideoData = Base64.encode(videoData);
    router.push(`/create/video?data=${encodedVideoData}`);
  };

  useEffect(() => {
    const loadAvatars = async () => {
      try {
        const data = await fetchAvatars();
        console.log(data.data);
        setAssistants(
          data.data.map((item: any) => ({
            id: item.id,
            name: item.name,
            thumbnailUrl: item.thumbnailUrl,
          }))
        );
      } catch (error) {
        // setError('Failed to fetch avatars');
      } finally {
        setLoading(false);
      }
    };

    loadAvatars();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  const handleAvatarSelect = (avatar: Avatar) => {
    setSelectedAvatar(avatar);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full hover-card flex items-center justify-between transition duration-500 ring-1 ring-[#E7E7E7] p-6 rounded-2xl cursor-pointer group">
          <div className="space-y-3">
            <h1 className="text-[18px] font-semibold">
              Generate Video with AI
            </h1>
            <p className="text-primary-neutral">Create your video with AI</p>
          </div>
          <GenerateAi className="text-primary-neutral group-hover:text-primary-green transition duration-300" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[90%] h-[90vh] px-10 py-7">
        <div className="relative w-full space-y-6 text-[15px] h-full flex flex-col">
          <div className=" bg-white border-b pb-6">
            <h1 className="text-2xl font-semibold flex gap-x-3 capitalize items-center">
              Generate video with AI
              <TooltipComponent />
            </h1>
          </div>
          <main className="flex flex-row gap-x-10">
            <div className="w-full max-w-[426px] space-y-4">
              <div className="w-full space-y-2">
                <label
                  htmlFor="objective"
                  className="flex items-center font-semibold gap-x-3"
                >
                  <span className="space-x-2">
                    Title <span className="text-[#F93939]">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Type video title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="border border-[#DEDEDE] bg-[#F5F5F5] h-[48px] w-full rounded-xl outline-none focus:border-primary-green transition-all p-4"
                />
              </div>
              <div className="w-full space-y-2">
                <label
                  htmlFor="objective"
                  className="flex items-center font-semibold gap-x-3"
                >
                  <span className="space-x-2">
                    Objective <span className="text-[#F93939]">*</span>
                  </span>
                </label>
                <textarea
                  name="objective"
                  placeholder="Introduction to financial well-being"
                  value={formData.objective}
                  onChange={handleInputChange}
                  className="border border-[#DEDEDE] bg-[#F5F5F5] resize-none h-[140px] w-full rounded-xl outline-none focus:border-primary-green transition-all p-4"
                ></textarea>
              </div>
              <AnimatePresence>
                <div className="space-y-3">
                  {fields.language && (
                    <motion.input
                      animate={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      type="text"
                      name="language"
                      placeholder="Language"
                      value={formData.language}
                      onChange={handleInputChange}
                      className="border border-[#DEDEDE] bg-[#F5F5F5] h-[48px] w-full rounded-xl outline-none focus:border-primary-green transition-all p-4"
                    />
                  )}

                  {fields.tone && (
                    <motion.input
                      animate={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      type="text"
                      name="tone"
                      placeholder="Tone"
                      value={formData.tone}
                      onChange={handleInputChange}
                      className="border border-[#DEDEDE] bg-[#F5F5F5] h-[48px] w-full rounded-xl outline-none focus:border-primary-green transition-all p-4"
                    />
                  )}

                  {fields.speaker && (
                    <motion.input
                      animate={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      type="text"
                      name="speaker"
                      placeholder="Speaker"
                      value={formData.speaker}
                      onChange={handleInputChange}
                      className="border border-[#DEDEDE] bg-[#F5F5F5] h-[48px] w-full rounded-xl outline-none focus:border-primary-green transition-all p-4"
                    />
                  )}

                  {fields.audience && (
                    <motion.input
                      animate={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      type="text"
                      name="audience"
                      placeholder="Audience"
                      value={formData.audience}
                      onChange={handleInputChange}
                      className="border border-[#DEDEDE] bg-[#F5F5F5] h-[48px] w-full rounded-xl outline-none focus:border-primary-green transition-all p-4"
                    />
                  )}
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    className="border border-[#C3C3C3] py-2 px-3 rounded-xl flex items-center gap-2"
                    onClick={() => toggleField("language")}
                  >
                    {fields.language ? <Minus size={20} /> : <Plus size={20} />}
                    Language
                  </button>
                  <button
                    className="border border-[#C3C3C3] py-2 px-3 rounded-xl flex items-center gap-2"
                    onClick={() => toggleField("tone")}
                  >
                    {fields.tone ? <Minus size={20} /> : <Plus size={20} />}
                    Tone
                  </button>
                  <button
                    className="border border-[#C3C3C3] py-2 px-3 rounded-xl flex items-center gap-2"
                    onClick={() => toggleField("speaker")}
                  >
                    {fields.speaker ? <Minus size={20} /> : <Plus size={20} />}
                    Speaker
                  </button>
                  <button
                    className="border border-[#C3C3C3] py-2 px-3 rounded-xl flex items-center gap-2"
                    onClick={() => toggleField("audience")}
                  >
                    {fields.audience ? <Minus size={20} /> : <Plus size={20} />}
                    Audience
                  </button>
                </div>
              </AnimatePresence>

              <button
                disabled={loading}
                className={clsx(
                  "!mt-6 bg-primary-green text-white py-3.5 w-full rounded-xl flex items-center justify-center",
                  loading && "opacity-80 cursor-not-allowed"
                )}
                onClick={handleSubmit}
              >
                {loading ? <Spinner /> : "Generate Video"}
              </button>
            </div>
            <div className="w-full flex">
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
              ) : outputVideo ? (
                <Motion
                  transition={{ duration: 0.5 }}
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                  classNames="flex flex-col justify-between"
                >
                  <div className="flex flex-col items-center">
                    <h2 className="mb-2">Your video is ready!</h2>
                    <p className="mb-4 text-lg font-semibold">
                      {outputVideo.title}
                    </p>
                    <video controls className="rounded-xl w-full max-w-4xl">
                      <source src={outputVideo.download} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={navigateToEditor}
                      className="bg-primary-green text-white py-3.5 px-4 sheen rounded-xl flex items-center justify-center"
                    >
                      Continue in editor
                    </button>
                  </div>
                </Motion>
              ) : (
                <Motion
                  transition={{ duration: 0.5 }}
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                  classNames="flex-1 w-full h-full grid place-content-center"
                >
                  <div>
                 {selectedAvatar && (
                      <div className=" mb-20">
                        <h2 className=" font-semibold mb-2">
                          Selected Avatar
                        </h2>
                        <img
                          src={selectedAvatar.thumbnailUrl}
                          alt={selectedAvatar.name}
                          className="w-24 h-24 object-cover rounded"
                        />
                        <p>{selectedAvatar.name}</p>
                      </div>
                    )}
                  <div className="flex flex-row w-[1100px] justify-between">
                    <h2 className="font-semibold mb-4">
                      Avatars
                    </h2>
                    <h2>Search Bar</h2>
                    </div>
                    <AvatarSelection
                      avatars={assistants}
                      onSelect={handleAvatarSelect}
                    />
                 
                  </div>
                </Motion>
                //   <Motion
                //   transition={{ duration: 0.5 }}
                //   variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                //   classNames="flex-1 w-full h-full grid place-content-center"
                // >
                //   <div className="flex flex-col justify-center items-center mb-40">
                //     <Image
                //       src="/gifs/empty-box.gif"
                //       alt=""
                //       width={250}
                //       height={250}
                //       unoptimized
                //     />
                //     <h1 className="text-2xl text-center font-semibold">
                //       There's nothing here.
                //     </h1>
                //     <p className="max-w-xl leading-loose text-center mt-3">
                //       Fill out the form 👈 to geneate a video
                //     </p>
                //   </div>
                // </Motion>
              )}
            </div>
          </main>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const TooltipComponent = () => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild className="cursor-pointer">
        <div>
          <HiOutlineQuestionMarkCircle />
        </div>
      </TooltipTrigger>
      <TooltipContent className="border-gradient-blue-to-gray-to-b rounded-[22px] p-0">
        <div className="text-primary-black">{<PopupContent />}</div>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const PopupContent = () => (
  <div className="w-[460px] p-8 font-normal text-base space-y-8">
    <div className="space-y-5">
      <h1 className="text-primary-green text-xl font-semibold">
        Tips for generating video with AI
      </h1>
      <div className="bg-primary-green p-5 text-white rounded-lg leading-normal text-[15px]">
        Your prompt is processed through a third-party service by OpenAI
      </div>
    </div>
    <div className="space-y-5">
      <h1 className="text-primary-black text-xl font-semibold">
        Get a good draft ready
      </h1>
      <p className="text-primary-neutral/60 text-[15px]">
        We recommend you watch this 1-minute video on how to use the video
        assistant to achieve a good first draft.
      </p>
      <Image src="/videos/dummy-video.png" alt="" width={500} height={400} />
    </div>
    <button className="border border-[#C3C3C3] py-3.5 w-full rounded-xl !mt-14 font-semibold text-primary-neutral">
      Learn More
    </button>
  </div>
);
