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

  return (
    <main className="mt-8 px-4">
      <div className="flex gap-8">
        <section className="w-full min-h-[200px] max-w-[450px] bg-white rounded-[20px] p-7 space-y-6">
          <div className="border border-[#DBDBDB] bg-white p-1 rounded-xl">
            <div className="flex relative">
              <div
                className={`w-full h-[40px] flex gap-x-2 justify-center items-center relative cursor-pointer z-[1] transition-all duration-500 text-[16px] ${"!text-white"}`}>
                History
              </div>
              <div className="absolute bottom-0 w-[100%] h-[40px] bg-primary-green custom-transition rounded-lg"></div>
            </div>
          </div>
          {historyLoading ? (
            <div className="w-full h-[100px] flex justify-center items-center">
              <Spinner size={25} color="black" />
            </div>
          ) : history.length > 0 ? (
            <div>{<History history={history} />}</div>
          ) : (
            <div className="w-full h-[100px] text-center">No result</div>
          )}
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
              <div className="relative z-[1] max-w-5xl mx-auto">
                {fileUploadLoading ? (
                  <div className="h-[250px] w-full flex justify-center items-center border border-[#F2F2F2]">
                    <Spinner color="black" size={35} />
                  </div>
                ) : productAI.img_url ? (
                  <>
                    <div className="h-[250px] w-full mt-2 border border-[#F2F2F2]">
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
                    className="text-[16px] w-[95px] flex justify-center bg-primary-green text-white px-[20px] py-[6px] rounded-md mr-[10px]">
                    {loading ? <Spinner /> : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
