import React, { MouseEventHandler, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from '@radix-ui/react-dialog';
import { brandVoiceAnalyzeFormSchema, brandVoiceFormSchema } from '@/utils/constant';
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from 'react-hot-toast';
import instance from '@/config/axios.config';
import { API_URL } from '@/lib/api';
import { ArrowLeft, Minus, Plus, } from 'lucide-react';
import UnLink from '@/components/svgs/unLink';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
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
    const [brandVoiceAnalysisResult, setBrandVoiceAnalysisResult] = useState<null | BrandVoiceAnalysisResult>(null);
    const [urlFields, setUrlFields] = useState<string[]>(['']);
    const [chatContent, setChatContent] = useState<string>('');
    const {
        watch,
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm<BrandVoiceAnalyzeSchemaType>({
        resolver: zodResolver(brandVoiceAnalyzeFormSchema),
        reValidateMode: 'onBlur'
    });

    const {
        register: registerBrandVoice,
        handleSubmit: handleSubmitBrandVoice,
        setValue: setValuesBrandVoice,
        watch: watchBrandVoice,
        formState: { errors: errorsBrandVoice },
    } = useForm<BrandVoiceSchemaType>({
        defaultValues: {
            isDefault: false,
            brandVoice: brandVoiceAnalysisResult?.brandVoice || '',
            brandName: '',
        },
        resolver: zodResolver(brandVoiceFormSchema),
        reValidateMode: 'onBlur'
    });


    const handlePrev = () => {
        if (step > 1) setStep(step - 1);
    };


    const handleAddUrlField = () => {
        setUrlFields([...urlFields, '']);
    };

    const handleRemoveUrlField = (index: number) => {
        const updatedFields = urlFields.filter((_, idx) => idx !== index);
        setValue('urls', updatedFields);
        setUrlFields(updatedFields);
    };

    const handleRedoAnalysis = async () => {
        setStep(1);
        const data = getValues();
        await onSubmit(data);
    };


    const onSubmit: SubmitHandler<BrandVoiceAnalyzeSchemaType> = async (data) => {
        setIsAnalyzing(true);
        try {
            const { urls, description, file } = data;
            const currentFile = file?.length > 0 ? file[0] : null;

            const hasFile = currentFile && currentFile.size <= 3.5 * 1024 * 1024;
            const hasUrls = urls && urls.length > 0 && urls.some(url => url.trim() !== '');
            const hasDescription = description && description.trim() !== '';

            if (!hasFile && !hasUrls && !hasDescription) {
                toast.error("Please provide at least one field: URL, description, or file.");
                setIsAnalyzing(false);
                return;
            }

            const formData = new FormData();

            if (hasFile) {
                formData.append('file', currentFile);
            }

            if (hasUrls) {
                formData.append('urls', JSON.stringify(urls));
            }

            if (hasDescription) {
                formData.append('description', description);
            }

            const response = (await instance.post(
                `${API_URL}/users/api/v1/brand-voice/analyze`,
                formData,
            )).data;

            setBrandVoiceAnalysisResult(response.data);
            setValuesBrandVoice('brandVoice', response.data.brandVoice);
            setChatContent(response.data.brandVoice);
            setStep(2);
            toast.success("Successfully analyzed the brand voice");
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error.message);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const onSaveBrandSubmit: SubmitHandler<BrandVoiceSchemaType> = async (data) => {
        setIsSaving(true);
        const { urls, description } = getValues()
        try {
            const requestBody = {
                brand_name: data.brandName,
                websites: urls,
                brand_voice: data.brandVoice,
                description: description,
                document_url: brandVoiceAnalysisResult?.doc_url,
                is_default: data.isDefault,
            };

            await instance.post(`${API_URL}/users/api/v1/brand-voice/save`, requestBody);
            toast.success("Brand voice saved successfully!");
            setIsOpen(false);
            setStep(1);
            onSuccess();
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error.message);
        } finally {
            setIsSaving(false);
        }
    };

    const selectedFile = watch('file');

    console.log(watch('urls'), errors)

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent showCloseButton={true} className="w-[80%] md:w-[85%] max-w-3xl p-0 pb-4 border-0">
                <DialogHeader>
                    <DialogTitle className="px-5">
                        {
                            step === 2 && (
                                <p onClick={() => setStep(1)} className="text-sm pt-3 font-semibold cursor-pointer flex items-center gap-2"><ArrowLeft size={14} /> Go Back</p>
                            )
                        }
                        <div className="bg-white py-3 border-b border-[#EBEBEB] text-black font-inter">
                            <p className="text-lg font-semibold">Add brand voice</p>
                            {
                                step === 1 && (
                                    <p className="text-primary-black/50">Write or paste content that reflects your brand voice. For results, we recommend between 50-500 words.</p>
                                )
                            }
                        </div>
                    </DialogTitle>
                </DialogHeader>
                {step === 1 && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="px-6 flex flex-col gap-4">
                            <div className="space-y-2">
                                <h2 className="text-lg font-medium">Content to analyze</h2>
                                <p className="text-primary-black/50">Add a blog article, social media posts, company mission, websites copy, marketing emails, or any content that matches your desired brand voice.</p>
                            </div>

                            <div className="space-y-2">
                                <label className="font-medium">
                                    Url
                                </label>
                                <div className='flex w-full flex-col items-center gap-2'>
                                    {urlFields.map((_, index) => (
                                        <div className='w-full space-y-2'>
                                            <div key={index} className="flex items-center w-full gap-2">
                                                <Input
                                                    type="text"
                                                    placeholder={`https://www.growstack.ai`}
                                                    {...register(`urls.${index}`)}
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
                                                {
                                                    urlFields.length - 1 === index && (
                                                        <button
                                                            type="button"
                                                            className="flex items-center text-primary-green"
                                                            onClick={handleAddUrlField}
                                                        >
                                                            <Plus className="mr-2" />
                                                        </button>
                                                    )
                                                }

                                            </div>
                                            {errors.urls && errors.urls[index] && (
                                                <p className="text-rose-600 text-sm">{errors.urls[index].message}</p>
                                            )}
                                        </div>

                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="font-medium">
                                    Description
                                </label>
                                <textarea
                                    placeholder="Type company description"
                                    className="h-[200px] w-full bg-[#F2F2F2] rounded-2xl p-3 resize-none"
                                    {...register("description")}
                                />
                                {errors.description && (
                                    <p className="text-rose-600 text-sm">{errors.description.message}</p>
                                )}
                            </div>

                            <div className="mb-4 space-y-2">
                                <label className="font-medium">Please attach a document (if any)</label>
                                <label className='flex h-[50px] w-full rounded-xl bg-[#F5F5F5] px-4 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50'>
                                    <Input
                                        type="file"
                                        placeholder='Upload document'
                                        {...register("file")}
                                        accept=".pdf,.docx"
                                        className="sr-only"
                                    />
                                    <div className='flex justify-between items-center w-full'>
                                        <span className="text-gray-400">
                                            {selectedFile && selectedFile?.length > 0 ? selectedFile[0].name : 'Upload document'}
                                        </span>
                                        <UnLink width='20' height='20' />
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
                )}
                {step === 2 && (
                    <>
                        <form onSubmit={handleSubmitBrandVoice(onSaveBrandSubmit)}>
                            <div className="px-6 flex flex-col gap-4">

                                <div className="space-y-2">
                                    <label className="font-medium">
                                        Name of the brand voice
                                    </label>
                                    <Input
                                        type="text"
                                        placeholder='Name your Brand Voice'
                                        {...registerBrandVoice(`brandName`)}
                                    />
                                    {errorsBrandVoice.brandName && (
                                        <p className="text-rose-600 text-sm">{errorsBrandVoice.brandName.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="font-medium">
                                        Brand voice
                                    </label>
                                    <textarea
                                        placeholder="Our journey began..."
                                        className="h-[300px] w-full bg-[#F2F2F2] rounded-2xl p-3 resize-none"
                                        {...registerBrandVoice("brandVoice")}
                                    />
                                    {errorsBrandVoice.brandVoice && (
                                        <p className="text-rose-600 text-sm">{errorsBrandVoice.brandVoice.message}</p>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    <input
                                        className="mr-2 mt-[0.3rem] h-3.5 w-8 
                    appearance-none rounded-[0.4375rem]
                     bg-primary-black before:pointer-events-none 
                     before:absolute before:h-3.5 before:w-3.5 before:rounded-full 
                     before:bg-transparent before:content-[''] after:absolute after:z-[2] 
                     after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none 
                     after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary-green checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary-white checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                                        type="checkbox"
                                        role="switch"
                                        id="flexSwitchCheckDefault"
                                        {...registerBrandVoice("isDefault")}
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
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default CreateBrandVoice;
