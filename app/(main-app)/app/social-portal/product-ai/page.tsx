/* eslint-disable @next/next/no-img-element */
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
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Moveable from "react-moveable";
import MoveableComponent from "./dragmove";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface Product {
  img_url: string;
  user_prompt: string;
  color: string;
  negative_promt: string;
  remove_bg_toggle: boolean;
  category: string;
  numberOfImages: string;
}

const initialProductValue: Product = {
  img_url: "",
  user_prompt: "",
  color: "",
  negative_promt: "",
  remove_bg_toggle: false,
  category: "general",
  numberOfImages: "",
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
interface Image {
  url: string; // The URL of the image
  ext: string; // The file extension
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
  const { user } = useSelector((rootState: RootState) => rootState.auth);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const [finalUrl, setFinalUrl] = useState<[]>([]);
  const [numberOfImages, setnumberOfImages] = useState<string>("1");

  const fetchHistory = async () => {
    try {
      setHistoryLoading(true);
      const response = await instance.get(
        `${API_URL}/users/api/v1/docs?page=1&limit=10&category=image`
      );
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

  const onFileDrop = async (
    acceptedFiles: File[],
    rejectedFiles: FileRejection[]
  ) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("document", file);

      setFileUploadLoading(true);
      try {
        const response = await instance.post(
          `${API_URL}/users/api/v1/file/upload`,
          formData
        );
        const fileUrl = response.data.data.fileUrl;
        setProductAI(prevState => ({
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
    setProductAI(prevState => ({
      ...prevState,
      remove_bg_toggle: !prevState.remove_bg_toggle,
    }));
  };

  const handlePromptChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = event.target;
    setProductAI(prevState => ({
      ...prevState,
      user_prompt: value,
    }));
  };

  const clearImg = () => {
    setProductAI(prevState => ({
      ...prevState,
      img_url: "",
    }));
  };

  const handleDownloadAll = async () => {
    setLoading(true);

    try {
      for (const image of selectedImages) {
        handleDownload(image);
      }
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setLoading(false); // Set loading to false after all downloads
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      user?.user_type !== "ADMIN" &&
      (planUsage?.usage?.ai_background_generator_credits || 0) <= 0
    ) {
      setIsAddOnModalOpen(true);
      return;
    }

    const {
      img_url,
      user_prompt,
      remove_bg_toggle,
      category,
      negative_promt,
      color,
      numberOfImages,
    } = productAI;
    console.log("productAI", productAI);

    if (!img_url) {
      toast.error("Please upload an image.");
      return;
    }

    if (!user_prompt && !remove_bg_toggle) {
      toast.error("Please provide a prompt or enable 'Remove background'.");
      return;
    }

    const removeBg = async (): Promise<FinalResultProps | null> => {
      try {
        setLoading(true); // Set loading to true at the start
        console.log("numberOfImages", numberOfImages);

        const response = await instance.post(
          `${API_URL}/ai/api/v1/products/bg-remover`,
          {
            img_url,
            user_prompt,
            remove_bg_toggle,
            category,
            negative_promt,
            color,
            numberOfImages,
          }
        );

        console.log("response", response);

        const result_url = response.data.data.originalUrls;

        if (result_url) {
          setResult(result_url);
          setFinalUrl(result_url);
        }

        setLoading(false);
        return result_url;
      } catch (error) {
        console.error("Error removing background:", error);
        setLoading(false); // Ensure loading is stopped if there's an error
        return null;
      }
    };

    // Call removeBg after defining it
    await removeBg();
  };

  const handleDownload = async (image: any) => {
    try {
      setLoading(true);

      // Replace with your own image or API endpoint
      const response = await fetch(image);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `finalresult.png`; // You can adjust the file name as needed
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlanUsage = async () => {
    try {
      const response = await instance.get(`${API_URL}/users/api/v1/plan-usage`);
      const data = response.data.data;
      setPlanUsage(data);

      if (
        user?.user_type !== "ADMIN" &&
        data.usage.ai_background_generator_credits <= 0
      ) {
        setIsAddOnModalOpen(true);
      }
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error("Error fetching plan usage:", error);
    }
  };

  useEffect(() => {
    fetchPlanUsage();
  }, []);
  // Toggle image selection
  const toggleImageSelection = (image: string) => {
    setSelectedImages(prevSelected => {
      if (prevSelected.includes(image)) {
        return prevSelected.filter(img => img !== image);
      } else {
        return [...prevSelected, image];
      }
    });
  };

  // Download selected images
  const downloadImages = () => {
    selectedImages.forEach(imageUrl => {
      const link = document.createElement("a");
      link.href = imageUrl;
      console.log("imageUrl", imageUrl);

      link.download = imageUrl.split("/").pop() || "download.jpg";
      console.log("link.download");

      link.click();
    });
  };
  return (
    <>
      <main className="flex-1 h-full mt-10 flex flex-col">
        <div className="flex-1 flex gap-8">
          <section className="relative mt-1 w-full min-h-[250px] max-w-[450px] bg-white rounded-[20px] overflow-y-auto h-[calc(100vh-175px)]">
            <div className="sticky top-0 px-7 py-4 bg-white">
              <div className=" border border-[#DBDBDB] bg-white p-1 rounded-xl">
                <div className="w-full h-[40px] flex justify-center items-center cursor-pointer transition-all duration-500 text-[16px] !text-white bg-primary-green rounded-lg hover:bg-opacity-90">
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
                <div>
                  <History history={history} />
                </div>
              ) : (
                <div className="w-full h-[100px] text-center">No result</div>
              )}
            </div>
          </section>
          <section className="w-full">
            {finalUrl.length > 0 ? (
              <>
                <div>
                  <div className="grid grid-cols-3 gap-4">
                    {finalUrl.map(image => (
                      <div
                        key={image}
                        className={`relative group border-2 p-1 cursor-pointer ${
                          selectedImages.includes(image)
                            ? "border-blue-500"
                            : "border-transparent"
                        }`}
                        onClick={() => toggleImageSelection(image)}
                      >
                        <img
                          className="w-full h-full object-cover"
                          alt="img-result"
                          src={image}
                        />
                        {selectedImages.includes(image) && (
                          <div className="absolute inset-0 bg-blue-500 opacity-50"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end items-center mb-8 mt-4">
                  <div className="flex flex-col items-end">
                    {/* Message displayed when no images are selected */}
                    {selectedImages.length === 0 && (
                      <p className="text-red-500 mb-2 mr-4">
                        Please select at least one image to download.
                      </p>
                    )}

                    {/* Buttons */}
                    <div className="flex">
                      <button
                        onClick={() => {
                          setResult(null);
                          setProductAI(initialProductValue);
                          setSelectedImages([]);
                          setFinalUrl([]); // Clear selections on reset
                        }}
                        className="text-base bg-white text-red-500 border border-red-500 px-5 py-2 mr-4"
                        type="button"
                      >
                        Upload another
                      </button>
                      <button
                        type="button"
                        onClick={handleDownloadAll}
                        disabled={selectedImages.length === 0} // Disable if no images are selected
                        className={`text-base bg-primary-green text-white px-5 py-2 min-w-[130px] flex justify-center items-center ${
                          selectedImages.length === 0
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {loading ? <Spinner /> : "Download Selected Image"}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white border-gradient-blue-to-gray-to-r rounded-[28px] px-10 pt-1 pb-6 space-y-8"
              >
                <div className="relative z-[1] max-w-5xl mx-auto mt-4">
                  {fileUploadLoading ? (
                    <div className="h-[396px] w-full flex justify-center items-center border border-[#F2F2F2] rounded-xl">
                      <Spinner color="black" size={35} />
                    </div>
                  ) : productAI.img_url ? (
                    <>
                      <div className="h-[200px] w-full border border-[#F2F2F2] rounded-xl">
                        <img
                          src={productAI.img_url}
                          alt="Uploaded Preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex justify-end m-2">
                        <button
                          onClick={clearImg}
                          type="button"
                          className="hover-underline"
                        >
                          <span style={{ textDecoration: "underline" }}>
                            Undo image
                          </span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <Dropzone onFileDrop={onFileDrop} />
                  )}

                  <div className="border-t border-[#EDEEF3] flex items-center justify-between w-full pt-5 pb-10">
                    <div className="space-y-1">
                      <h1 className="text-lg">Remove background</h1>
                      <h1 className="text-primary-grey">
                        Product images with transparent backgrounds give the
                        best results
                      </h1>
                    </div>
                    <Switch
                      checked={productAI.remove_bg_toggle}
                      onCheckedChange={handleSwitchChange}
                    />
                  </div>

                  <div className="text-[14px] text-header mb-[6px]">
                    Enter prompt (optional)
                  </div>
                  <textarea
                    placeholder="I want to ..."
                    className="bg-[#F2F2F2] p-3 h-[120px] block resize-none w-full rounded-xl"
                    value={productAI.user_prompt}
                    onChange={handlePromptChange}
                  ></textarea>
                  {productAI.user_prompt.length >= 3 && (
                    <div className="pt-5">
                      <div className="text-[14px] text-header mb-[6px]">
                        Select number of images (optional)
                      </div>
                      <Select
                        onValueChange={value => {
                          setnumberOfImages(value); // Convert value to number and set it in state
                          productAI.numberOfImages = value; // Also set the value on productAI
                        }}
                        value={numberOfImages} // Binds to the state
                        defaultValue="1"
                      >
                        <SelectTrigger className="w-full border-none h-14">
                          <SelectValue
                            placeholder={
                              numberOfImages
                                ? numberOfImages
                                : "Select a number of images"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {["1", "2", "3", "4"].map(num => (
                            <SelectItem key={num} value={num}>
                              {num}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="flex justify-end mt-6 mb-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="text-[16px] w-[120px] h-12 flex justify-center items-center bg-primary-green text-white rounded-xl"
                    >
                      {loading ? <Spinner /> : "Submit"}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </section>
        </div>
      </main>
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
              className="text-red-500 border border-red-500 bg-transparent text-nowrap py-2 px-8 rounded-md transition duration-300"
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
    </>
  );
}
