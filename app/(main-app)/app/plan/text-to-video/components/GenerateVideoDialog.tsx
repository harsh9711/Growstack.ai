import Motion from "@/components/Motion";
import Spinner from "@/components/Spinner";
import { GenerateAi } from "@/components/svgs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { API_URL } from "@/lib/api";
import axios from "axios";
import clsx from "clsx";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  objective: z.string().min(1, "Objective is required"),
  language: z.string().optional(),
  tone: z.string().optional(),
  speaker: z.string().optional(),
  audience: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

const TooltipContentComponent = () => (
  <div className="w-[460px] p-8 font-normal text-base space-y-8">
    <div className="space-y-5">
      <h1 className="text-primary-green text-xl font-semibold">Tips for generating video with AI</h1>
      <div className="bg-primary-green p-5 text-white rounded-lg leading-normal text-[15px]">
        Your prompt is processed through a third-party service by OpenAI
      </div>
    </div>
    <div className="space-y-5">
      <h1 className="text-primary-black text-xl font-semibold">Get a good draft ready</h1>
      <p className="text-primary-neutral/60 text-[15px]">
        We recommend you watch this 1-minute video on how to use the video assistant to achieve a good first draft.
      </p>
      <Image src="/videos/dummy-video.png" alt="" width={500} height={400} />
    </div>
    <button className="border border-[#C3C3C3] py-3.5 w-full rounded-xl !mt-14 font-semibold text-primary-neutral">Learn More</button>
  </div>
);

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

const TooltipComponent = () => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild className="cursor-pointer">
        <div>
          <HiOutlineQuestionMarkCircle />
        </div>
      </TooltipTrigger>
      <TooltipContent className="border-gradient-blue-to-gray-to-b rounded-[22px] p-0">
        <div className="text-primary-black">{<TooltipContentComponent />}</div>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default function GenerateVideoDialog() {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [outputVideo, setOutputVideo] = useState<VideoStatus | null>(null);

  const [fields, setFields] = useState<FieldsState>({
    objective: false,
    language: false,
    tone: false,
    speaker: false,
    audience: false,
  });

  const [formData, setFormData] = useState<FormSchema>({
    title: "",
    objective: "",
    language: "",
    tone: "",
    speaker: "",
    audience: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const toggleField = (field: keyof FieldsState) => {
    setFields((prevFields) => ({
      ...prevFields,
      [field]: !prevFields[field],
    }));
  };

  const checkVideoStatus = async (videoId: string) => {
    try {
      const statusResponse = await axios.get(`${API_URL}/ai/api/v1/video/status/${videoId}`);
      if (statusResponse.data.data.status === "complete") {
        toast.success("Video generation complete");
        setOutputVideo(statusResponse.data.data);
        setLoading(false);
        setStep(0); // Reset step
      } else {
        setTimeout(() => checkVideoStatus(videoId), 5000); // Check every 5 seconds
      }
    } catch (error) {
      toast.error("Error checking video status");
      setLoading(false);
      setStep(0); // Reset step
    }
  };

  const handleSubmit = async () => {
    const validation = formSchema.safeParse(formData);
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    setLoading(true);
    setStep(1); // Step 1: Generating video script

    try {
      // First API call to generate script
      const scriptResponse = await axios.post(`${API_URL}/ai/api/v1/generate/video/video-script`, formData);
      if (scriptResponse.data.success) {
        toast.success(scriptResponse.data.message);

        setStep(2); // Step 2: Generating video with script

        // Second API call to generate video with the generated script
        const videoData = {
          title: formData.title,
          input: {
            scriptText: scriptResponse.data.data.script, // Use the generated script from the first API call
            avatar: "49dc8f46-8c08-45f1-8608-57069c173827", // Example avatar ID
            background: "light_pink", // Example background setting
          },
          soundtrack: "urban",
        };

        const videoResponse = await axios.post(`${API_URL}/ai/api/v1/generate/video`, videoData);
        if (videoResponse.data.success) {
          toast.success("Video generation request successful");

          setStep(3); // Step 3: Checking video status

          // Third API call to check video status
          checkVideoStatus(videoResponse.data.data.id);
        } else {
          toast.error("Failed to generate video");
          setLoading(false);
          setStep(0); // Reset step
        }
      } else {
        toast.error("Failed to generate script");
        setLoading(false);
        setStep(0); // Reset step
      }
    } catch (error: any) {
      toast.error(error.response.data.message || error.message || "Error submitting the form");
      setLoading(false);
      setStep(0); // Reset step
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full hover-card flex items-center justify-between transition duration-500 ring-1 ring-[#E7E7E7] p-6 rounded-2xl cursor-pointer group">
          <div className="space-y-3">
            <h1 className="text-[18px] font-semibold">Generate Video with AI</h1>
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
          <main className="flex-1 flex">
            <div className="w-full max-w-[426px] space-y-4">
              <div className="w-full space-y-2">
                <label htmlFor="objective" className="flex items-center font-semibold gap-x-3">
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
                <label htmlFor="objective" className="flex items-center font-semibold gap-x-3">
                  <span className="space-x-2">
                    Objective <span className="text-[#F93939]">*</span>
                  </span>
                </label>
                <textarea
                  name="objective"
                  placeholder="Introduction to financial well-being"
                  value={formData.objective}
                  onChange={handleInputChange}
                  className="border border-[#DEDEDE] bg-[#F5F5F5] resize-none h-[140px] w-full rounded-xl outline-none focus:border-primary-green transition-all p-4"></textarea>
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
                  <button className="border border-[#C3C3C3] py-2 px-3 rounded-xl flex items-center gap-2" onClick={() => toggleField("language")}>
                    {fields.language ? <Minus size={20} /> : <Plus size={20} />}
                    Language
                  </button>
                  <button className="border border-[#C3C3C3] py-2 px-3 rounded-xl flex items-center gap-2" onClick={() => toggleField("tone")}>
                    {fields.tone ? <Minus size={20} /> : <Plus size={20} />}
                    Tone
                  </button>
                  <button className="border border-[#C3C3C3] py-2 px-3 rounded-xl flex items-center gap-2" onClick={() => toggleField("speaker")}>
                    {fields.speaker ? <Minus size={20} /> : <Plus size={20} />}
                    Speaker
                  </button>
                  <button className="border border-[#C3C3C3] py-2 px-3 rounded-xl flex items-center gap-2" onClick={() => toggleField("audience")}>
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
                onClick={handleSubmit}>
                {loading ? <Spinner /> : "Generate Video"}
              </button>
            </div>
            <div className="w-full flex">
              {loading ? (
                <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
                  <Motion transition={{ duration: 1 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                    <div
                      className={clsx(
                        "flex gap-3 items-center py-4 px-6 w-full rounded-lg",
                        step === 1 ? "bg-gray-200 text-gray-700" : "bg-green-200 text-green-800"
                      )}>
                      {step > 1 ? <span>✔</span> : <Spinner />}
                      <p className="ml-2">{step === 1 ? "Generating a video script..." : "Video script generated"}</p>
                    </div>
                  </Motion>
                  {step > 1 && (
                    <Motion transition={{ duration: 1 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                      <div
                        className={clsx(
                          "flex gap-3 items-center py-4 px-6 w-full rounded-lg mt-2",
                          step === 2 ? "bg-gray-200 text-gray-700" : "bg-green-200 text-green-800"
                        )}>
                        {step > 2 ? <span>✔</span> : step === 2 ? <Spinner /> : null}
                        <p className="ml-2">{step === 2 ? "Generating video with script..." : step > 2 ? "Video generation started" : null}</p>
                      </div>
                    </Motion>
                  )}
                  {step > 2 && (
                    <Motion transition={{ duration: 1 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                      <div
                        className={clsx(
                          "flex gap-3 items-center py-4 px-6 w-full rounded-lg mt-2",
                          step === 3 ? "bg-gray-200 text-gray-700" : "bg-green-200 text-green-800"
                        )}>
                        {step === 3 ? <Spinner /> : step > 3 ? <span>✔</span> : null}
                        <p className="ml-2">{step === 3 ? "Generating video, this might take a while..." : step > 3 ? "Video generated successfully" : null}</p>
                      </div>
                    </Motion>
                  )}
                </div>
              ) : outputVideo ? (
                <Motion
                  transition={{ duration: 0.5 }}
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                  classNames="flex flex-col justify-between">
                  <div className="flex flex-col items-center">
                    <h2 className="mb-2">Your video is ready!</h2>
                    <p className="mb-4 text-lg font-semibold">{outputVideo.title}</p>
                    <video controls className="rounded-xl w-full max-w-4xl">
                      <source src={outputVideo.download} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <div className="flex justify-end">
                    <button className="bg-primary-green text-white py-3.5 px-4 sheen rounded-xl flex items-center justify-center">Continue in editor</button>
                  </div>
                </Motion>
              ) : (
                <Motion
                  transition={{ duration: 0.5 }}
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                  classNames="flex-1 w-full h-full grid place-content-center">
                  <div className="flex flex-col justify-center items-center mb-40">
                    <Image src="/gifs/empty-box.gif" alt="" width={250} height={250} />
                    <h1 className="text-2xl text-center font-semibold">There's nothing here.</h1>
                    <p className="max-w-xl leading-loose text-center mt-3">Fill out the form 👈 to geneate a video</p>
                  </div>
                </Motion>
              )}
            </div>
          </main>
        </div>
      </DialogContent>
    </Dialog>
  );
}
