import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogClose,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  brandVoiceAnalyzeFormSchema,
  brandVoiceFormSchema,
  urlRegex,
} from "@/utils/constant";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import { ArrowLeft, Minus, Plus, X } from "lucide-react";
import UnLink from "@/components/svgs/unLink";
import { Switch } from "@/components/ui/switch";
interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess: () => void;
}

interface BrandVoiceAnalysisResult {
  brandVoice: string;
  doc_url: string;
}

type BrandVoiceAnalyzeSchemaType = z.infer<typeof brandVoiceAnalyzeFormSchema>;
type BrandVoiceSchemaType = z.infer<typeof brandVoiceFormSchema>;

const CreateBrandVoice = ({ isOpen, setIsOpen, onSuccess }: Props) => {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [brandVoiceAnalysisResult, setBrandVoiceAnalysisResult] =
    useState<null | BrandVoiceAnalysisResult>(null);
  const [urlFields, setUrlFields] = useState<string[]>([""]);
  const [chatContent, setChatContent] = useState<string>("");
  const {
    watch,
    register,
    handleSubmit,
    getValues,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<BrandVoiceAnalyzeSchemaType>({
    resolver: zodResolver(brandVoiceAnalyzeFormSchema),
    reValidateMode: "onBlur",
  });

  const {
    register: registerBrandVoice,
    handleSubmit: handleSubmitBrandVoice,
    setValue: setValuesBrandVoice,
    watch: watchBrandVoice,
    reset: resetBrandVoice,
    formState: { errors: errorsBrandVoice },
  } = useForm<BrandVoiceSchemaType>({
    defaultValues: {
      isDefault: false,
      brandVoice: brandVoiceAnalysisResult?.brandVoice || "",
      brandName: "",
    },
    resolver: zodResolver(brandVoiceFormSchema),
    reValidateMode: "onBlur",
  });

  const handleAddUrlField = () => {
    setUrlFields([...urlFields, ""]);
  };

  const handleRemoveUrlField = (index: number) => {
    const updatedFields = urlFields.filter((_, idx) => idx !== index);
    setValue("urls", updatedFields);
    setUrlFields(updatedFields);
  };

  const handleRedoAnalysis = async () => {
    setStep(1);
    const data = getValues();
    await onSubmit(data);
  };

  const onSubmit: SubmitHandler<BrandVoiceAnalyzeSchemaType> = async data => {
    setIsAnalyzing(true);
    try {
      const { urls, description, file } = data;
      const currentFile = file?.length > 0 ? file[0] : null;

      const hasFile = currentFile && currentFile.size <= 3.5 * 1024 * 1024;
      const hasUrls =
        urls && urls.length > 0 && urls.some(url => url.trim() !== "");
      const hasDescription = description && description.trim() !== "";

      if (!hasFile && !hasUrls && !hasDescription) {
        toast.error(
          "Please provide at least one field: URL, description, or file."
        );
        setIsAnalyzing(false);
        return;
      }

      const formData = new FormData();

      if (hasFile) {
        formData.append("file", currentFile);
      }

      if (hasUrls) {
        const invalidUrls = urls.filter(url => !urlRegex.test(url.trim()));
        if (invalidUrls.length > 0) {
          invalidUrls.forEach((invalidUrl, index) => {
            setError(`urls.${index}`, {
              type: "manual",
              message: "Invalid URL format",
            });
          });
          toast.error("Please fix the invalid URLs");
          setIsAnalyzing(false);
          return;
        }

        const filteredUrls = urls.filter(url => url.trim() !== "");
        formData.append("urls", JSON.stringify(filteredUrls));
      }

      if (hasDescription) {
        formData.append("description", description);
      }

      const response = (
        await instance.post(
          `${API_URL}/users/api/v1/brand-voice/analyze`,
          formData
        )
      ).data;

      setBrandVoiceAnalysisResult(response.data);
      setValuesBrandVoice("brandVoice", response.data.brand_voice);
      setChatContent(response.data.brandVoice);
      setStep(2);
      toast.success("Successfully analyzed the brand voice");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const onSaveBrandSubmit: SubmitHandler<BrandVoiceSchemaType> = async data => {
    setIsSaving(true);
    const { urls, description } = getValues();
    try {
      const requestBody = {
        brand_name: data.brandName,
        websites: urls,
        brand_voice: data.brandVoice,
        description: description,
        document_url: brandVoiceAnalysisResult?.doc_url,
        is_default: data.isDefault,
      };

      await instance.post(
        `${API_URL}/users/api/v1/brand-voice/save`,
        requestBody
      );
      toast.success("Brand voice saved successfully!");
      setIsOpen(false);
      setStep(1);
      reset();
      resetBrandVoice();
      onSuccess();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const selectedFile = watch("file");

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        showCloseButton={false}
        className="w-[80%] md:w-[85%] max-w-3xl p-0 pb-4 border-0"
      >
        <DialogHeader className="sticky top-0 z-10 bg-white">
          <DialogTitle className="px-5 relative border-b border-[#EBEBEB]">
            {step === 2 && (
              <p
                onClick={() => setStep(1)}
                className="text-sm pt-3 font-semibold cursor-pointer flex items-center gap-2"
              >
                <ArrowLeft size={14} /> Go Back
              </p>
            )}
            <div className="bg-white py-2 text-black font-inter">
              <p className="text-lg font-semibold">Add brand voice</p>
              {step === 1 && (
                <p className="text-primary-black/50 pr-4">
                  Write or paste content that reflects your brand voice. For
                  results, we recommend between 50-500 words.
                </p>
              )}
            </div>
            <div
              onClick={e => {
                e.stopPropagation();
                setIsOpen(false);
                setStep(1);
                reset();
                resetBrandVoice();
              }}
              className="absolute cursor-pointer right-2 top-2 rounded-lg transition-opacity p-2 hover:bg-[#ff00001f] hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <X className="h-5 w-5 text-[#ff00009d]" />
              <span className="sr-only">Close</span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <form
          className={`${step == 1 ? "visible" : "hidden"}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="px-6 flex flex-col gap-4">
            <div className="space-y-2">
              <h2 className="text-lg font-medium">Content to analyze</h2>
              <p className="text-primary-black/50">
                Add a blog article, social media posts, company mission,
                websites copy, marketing emails, or any content that matches
                your desired brand voice.
              </p>
            </div>

            <div className="space-y-2">
              <label className="font-medium">Url</label>
              <div className="flex w-full flex-col items-center gap-2">
                {urlFields.map((_, index) => (
                  <div key={index} className="w-full space-y-2">
                    <div key={index} className="flex items-center w-full gap-2">
                      <Input
                        type="text"
                        placeholder="https://www.growstack.ai"
                        onChange={e => {
                          const updatedUrls = [...urlFields];
                          updatedUrls[index] = e.target.value;
                          setUrlFields(updatedUrls);
                          setValue("urls", updatedUrls);
                          if (!urlRegex.test(e.target.value)) {
                            setError(`urls.${index}`, {
                              type: "manual",
                              message: "Invalid URL format",
                            });
                          } else {
                            clearErrors(`urls.${index}`);
                          }
                        }}
                        disabled={isAnalyzing}
                      />
                      {urlFields.length > 1 && (
                        <button
                          type="button"
                          className="text-red-500"
                          onClick={() => handleRemoveUrlField(index)}
                        >
                          <Minus />
                        </button>
                      )}
                      {urlFields.length - 1 === index && (
                        <button
                          type="button"
                          className="flex items-center text-primary-green"
                          onClick={handleAddUrlField}
                        >
                          <Plus className="mr-2" />
                        </button>
                      )}
                    </div>
                    {errors.urls && errors.urls[index] && (
                      <p className="text-rose-600 text-sm">
                        {errors.urls[index].message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-medium">Description</label>
              <textarea
                placeholder="Type company description"
                className="h-[200px] w-full bg-[#F2F2F2] rounded-2xl p-3 resize-none"
                {...register("description")}
                disabled={isAnalyzing}
              />
              {errors.description && (
                <p className="text-rose-600 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="mb-4 space-y-2">
              <label className="font-medium">
                Please attach a document (if any)
              </label>
              <label className="flex h-[50px] w-full rounded-xl bg-[#F5F5F5] px-4 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50">
                <Input
                  type="file"
                  placeholder="Upload document"
                  {...register("file")}
                  accept=".pdf,.docx"
                  className="sr-only"
                  disabled={isAnalyzing}
                />
                <div className="flex justify-between items-center w-full">
                  <span className="text-gray-400">
                    {selectedFile && selectedFile?.length > 0
                      ? selectedFile[0].name
                      : "Upload document"}
                  </span>
                  <UnLink width="20" height="20" />
                </div>
              </label>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                className="text-red-500 border border-red-500 bg-transparent text-nowrap py-3 px-10 rounded-xl transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary-green text-white sheen transition duration-500 px-5 py-3 rounded-xl flex items-center gap-2"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze brand voice"}
              </button>
            </div>
          </div>
        </form>
        <form
          className={`${step == 2 ? "visible" : "hidden"}`}
          onSubmit={handleSubmitBrandVoice(onSaveBrandSubmit)}
        >
          <div className="px-6 flex flex-col gap-4">
            <div className="space-y-2">
              <label className="font-medium">Name of the brand voice</label>
              <Input
                disabled={isSaving}
                type="text"
                placeholder="Name your Brand Voice"
                {...registerBrandVoice(`brandName`)}
              />
              {errorsBrandVoice.brandName && (
                <p className="text-rose-600 text-sm">
                  {errorsBrandVoice.brandName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="font-medium">Brand voice</label>
              <textarea
                disabled={isSaving}
                placeholder="Our journey began..."
                className="h-[300px] w-full bg-[#F2F2F2] rounded-2xl p-3 resize-none"
                {...registerBrandVoice("brandVoice")}
              />
              {errorsBrandVoice.brandVoice && (
                <p className="text-rose-600 text-sm">
                  {errorsBrandVoice.brandVoice.message}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Switch
                disabled={isSaving}
                checked={watchBrandVoice("isDefault")}
                onCheckedChange={checked => {
                  setValuesBrandVoice("isDefault", checked);
                }}
              />
              Save as the default voice across your teamspace
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                className="text-primary-green border border-primary-green bg-transparent text-nowrap py-3 px-10 rounded-xl transition duration-300"
                onClick={handleRedoAnalysis}
              >
                Redo analysis
              </button>
              <button
                type="submit"
                className="bg-primary-green text-white sheen transition duration-500 px-5 py-3 rounded-xl flex items-center gap-2"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save brand voice"}
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBrandVoice;
