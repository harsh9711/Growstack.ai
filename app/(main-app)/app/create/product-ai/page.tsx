"use client";

import React, { useEffect, useState } from "react";
import Dropzone from "./components/Dropzone";
import { Switch } from "@/components/ui/switch";
import History from "./components/History";
import Image from "next/image";
import { FileRejection } from "react-dropzone";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";
import { historyProps } from "./interface/history";
import GlobalModal from "@/components/modal/global.modal";
import Link from "next/link";
import { PlanUsage } from "@/types/common";
import Lock from "@/components/svgs/lock";

interface Product {
  img_url: string;
  user_prompt: string;
  number_of_images: number;
  color: string;
  negative_promt: string;
  remove_bg_toggle: boolean;
  category: string;
}

const initialProductValue: Product = {
  img_url: "",
  user_prompt: "",
  number_of_images: 0,
  color: "",
  negative_promt: "",
  remove_bg_toggle: false,
  category: "products",
};

interface FinalResultProps {
  name: string;
  ext: string;
  mime: string;
  format: string;
  width: number;
  height: number;
  link: string;
}

export default function Page() {
  const [fileUploadLoading, setFileUploadLoading] = useState<boolean>(false);
  const [productAI, setProductAI] = useState<Product>(initialProductValue);
  const [result, setResult] = useState<FinalResultProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<historyProps[]>([]);
  const [historyLoading, setHistoryLoading] = useState<boolean>(false);
  const [isAddOnModalOpen, setIsAddOnModalOpen] = useState<boolean>(false);
  const [planUsage, setPlanUsage] = useState<PlanUsage | null>(null);

  const fetchHistory = async () => {
    try {
      setHistoryLoading(true);
      const response = await instance.get(`${API_URL}/users/api/v1/docs?page=1&limit=10&category=image`);
      setHistoryLoading(false);
      const data = response.data.data.docs.map((item: any) => ({
        doc_name: item.doc_name,
        doc_type: item.doc_type,
        img_url: item.doc_content.img_url,
        updatedAt: item.updatedAt,
      }));
      setHistory(data);
    } catch (error: any) {
      console.error("Error fetching history:", error);
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const onFileDrop = async (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("document", file);

      setFileUploadLoading(true);
      try {
        const response = await instance.post(`${API_URL}/users/api/v1/file/upload`, formData);
        const fileUrl = response.data.data.fileUrl;
        setProductAI((prevState) => ({
          ...prevState,
          img_url: fileUrl,
        }));
      } catch (error) {
        toast.error("File upload failed");
        console.error("Error uploading file:", error);
      } finally {
        setFileUploadLoading(false);
      }
    }
  };

  const handleSwitchChange = () => {
    setProductAI((prevState) => ({
      ...prevState,
      remove_bg_toggle: !prevState.remove_bg_toggle,
    }));
  };

  const handlePromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setProductAI((prevState) => ({
      ...prevState,
      user_prompt: value,
    }));
  };

  const clearImg = () => {
    setProductAI((prevState) => ({
      ...prevState,
      img_url: "",
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!planUsage?.usage_amount || planUsage?.usage_amount <= 0) {
      setIsAddOnModalOpen(true);
      return;
    }
    const { img_url, user_prompt, remove_bg_toggle, category, negative_promt, color } = productAI;

    if (!img_url) {
      toast.error("Please upload an image.");
      return;
    }

    if (!user_prompt && !remove_bg_toggle) {
      toast.error("Please provide a prompt or enable 'Remove background'.");
      return;
    }

    const removeBg = async (): Promise<FinalResultProps | null> => {
      const response = await instance.post(`${API_URL}/ai/api/v1/products/bg-remover`, {
        img_url,
        category,
      });
      const result_url = response.data.data.result_url;

      if (result_url) {
        const pollStatus = async (): Promise<FinalResultProps | null> => {
          const statusResponse = await instance.post(`${API_URL}/ai/api/v1/products/image/status`, {
            image_url: result_url,
          });
          const res = statusResponse.data;

          if (res.data.status === "DONE") {
            return {
              name: "",
              ext: res.data.result.output_object.ext,
              mime: res.data.result.output_object.mime,
              format: res.data.result.output_object.format,
              width: res.data.result.output_object.width,
              height: res.data.result.output_object.height,
              link: res.data.originalUrl,
            };
          } else if (res.data.status === "PROCESSING") {
            await new Promise((resolve) => setTimeout(resolve, 5000));
            return pollStatus();
          } else {
            throw new Error("Failed to process image");
          }
        };

        return await pollStatus();
      }
      return null;
    };

    const userPrompt = async (img_url: string): Promise<FinalResultProps | null> => {
      const response = await instance.post(`${API_URL}/ai/api/v1/products/image/edit`, {
        user_prompt,
        negative_promt,
        img_url,
        category,
        color,
      });
      const res = response.data.data.output[0];
      return {
        name: "",
        ext: res.ext,
        mime: res.mime,
        format: res.format,
        width: res.width,
        height: res.height,
        link: response.data.data.originalUrls,
      };
    };

    setLoading(true);
    try {
      if (remove_bg_toggle && user_prompt) {
        const bgResult = await removeBg();
        if (bgResult && bgResult.link) {
          const finalResult = await userPrompt(bgResult.link);
          if (finalResult) {
            setLoading(false);
            setResult(finalResult);
          }
        }
      } else if (remove_bg_toggle) {
        const bgRemovedUrl = await removeBg();
        if (bgRemovedUrl) {
          setLoading(false);
          setResult(bgRemovedUrl);
        }
      } else if (user_prompt) {
        const finalResult = await userPrompt(img_url);
        if (finalResult) {
          setLoading(false);
          setResult(finalResult);
        }
      }
    } catch (error: any) {
      console.error("Error processing request:", error);
      toast.error(error.message);
    }
  };

  const handleDownload = () => {
    if (result) {
      setLoading(true);
      fetch(result.link)
        .then((response) => response.blob())
        .then((blob: any) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `finalresult.${result.ext}`;
          document.body.appendChild(link);
          link.click();
          link.remove();
          window.URL.revokeObjectURL(url);
          setLoading(false);
        })
        .catch((error) => console.error("Download error:", error));
    }
  };

  const fetchPlanUsage = async () => {
    try {
      const response = await instance.get(`${API_URL}/users/api/v1/plan-usage`);
      const data = response.data.data;
      setPlanUsage(data);

      if (!data?.usage_amount || data?.usage_amount <= 0) {
        setIsAddOnModalOpen(true)
      }
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error('Error fetching plan usage:', error);
    }
  };

  useEffect(() => {
    fetchPlanUsage();
  }, []);
  return (
    <>
      <main className="flex-1 h-full mt-10 flex flex-col">
        <div className="flex-1 flex gap-8">
          <section className="relative w-full min-h-[200px] max-w-[450px] bg-white rounded-[20px] overflow-y-auto h-[calc(100vh-175px)]">
            <div className="sticky top-0 px-7 py-4 bg-white">
              <div className=" border border-[#DBDBDB] bg-white p-1 rounded-xl">
                <div
                  className={`w-full h-[40px] flex justify-center items-center cursor-pointer transition-all duration-500 text-[16px] !text-white bg-primary-green rounded-lg hover:bg-opacity-90`}>
                  History
                </div>
              </div>
            </div>
            <div className="px-7 p-2">
              {historyLoading ? (
                <div className="w-full h-[100px] flex justify-center items-center">
                  <Spinner size={25} color="black" />
                </div>
              ) : history.length > 0 ? (
                <div>{<History history={history} />}</div>
              ) : (
                <div className="w-full h-[100px] text-center">No result</div>
              )}
            </div>
          </section>
          <section className="w-full">
            {result ? (
              <>
                <div className="h-[65vh] border border-[#F2F2F2]">
                  <img className="w-[100%] h-[100%] object-contain" alt="img-result" src={result.link} />
                </div>
                <div className="flex justify-end mb-[30px] mt-[10px]">
                  <button
                    onClick={() => {
                      setResult(null);
                      setProductAI(initialProductValue);
                    }}
                    className="text-[16px] bg-white text-red-500 border border-red-500 px-[20px] py-[6px]"
                    type="button">
                    Upload another
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="text-[16px] ml-2 bg-primary-green text-white px-[20px] py-[6px] min-w-[130px] flex justify-center items-center">
                    {loading ? <Spinner /> : "Download"}
                  </button>
                </div>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border-gradient-blue-to-gray-to-r rounded-[28px] px-10 pb-6 space-y-8">
                <div className="relative z-[1] max-w-5xl mx-auto mt-4">
                  {fileUploadLoading ? (
                    <div className="h-[396px] w-full flex justify-center items-center border border-[#F2F2F2] rounded-xl">
                      <Spinner color="black" size={35} />
                    </div>
                  ) : productAI.img_url ? (
                    <>
                      <div className="h-[396px] w-full border border-[#F2F2F2] rounded-xl">
                        <img src={productAI.img_url} alt="Logo" className="w-full h-full object-contain" />
                      </div>
                      <div className="flex justify-end m-2">
                        <button onClick={clearImg} type="button" className="hover-underline">
                          <span style={{ textDecoration: "undeline" }}>Undo image</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <Dropzone onFileDrop={onFileDrop} />
                  )}

                  <div className="border-t border-[#EDEEF3] flex items-center justify-between w-full pt-5 pb-10">
                    <div className="space-y-1">
                      <h1 className=" text-lg">Remove background</h1>
                      <h1 className="text-primary-grey">Product images with transparent backgrounds give the best results</h1>
                    </div>
                    <Switch checked={productAI.remove_bg_toggle} onCheckedChange={handleSwitchChange} />
                  </div>
                  <div className="text-[14px] text-header mb-[6px]">Enter prompt (optional)</div>
                  <textarea
                    placeholder="I want to ..."
                    className="bg-[#F2F2F2] p-3 h-[120px] block resize-none w-full rounded-xl"
                    value={productAI.user_prompt}
                    onChange={handlePromptChange}></textarea>
                  <div className="flex justify-end mt-6 mb-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="text-[16px] w-[120px] h-12 flex justify-center items-center bg-primary-green text-white rounded-xl">
                      {loading ? <Spinner /> : "Submit"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </section>
        </div>
      </main>
      <GlobalModal showCloseButton={false} open={isAddOnModalOpen} setOpen={() => { setIsAddOnModalOpen(false) }}>
        <div className="flex flex-col items-center justify-center px-6 pt-4 pb-8 gap-6 space-x-6">
          <Lock/>
          <h3 className="text-center text-[28px] font-semibold">You don’t have enough credit.</h3>
          <p className="text-center text-gray-700 text-sm md:text-base px-4">
            You don’t have enough credits in your wallet to use this feature. It is an add-on, and requires additional credit to access. Please add credits to continue.
          </p>
          <div className="flex items-center justify-between gap-3">  
            <button
              className="text-red-500 border border-red-500 bg-transparent text-nowrap py-2 px-8 rounded-md transition duration-300"
              onClick={()=> setIsAddOnModalOpen(false)}
            >
              Cancel
            </button>
            <Link
              className="bg-primary-green text-white text-nowrap py-2 px-6 rounded-md transition duration-300 hover:bg-green-600"
              href="/account/billings/settings">
              Add Credit
            </Link>
          </div>
        </div>
      </GlobalModal>
    </>

  );
}
