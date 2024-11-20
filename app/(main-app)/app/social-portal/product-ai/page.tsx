// pages/index.js
"use client";
import React, { useState, useRef, useEffect } from "react";
import Spinner from "@/components/Spinner";
import Dropzone from "../product-ai/components/Dropzone";
import { Switch } from "@/components/ui/switch";
import toast from "react-hot-toast";
import { FileRejection } from "react-dropzone";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import ResizableRotatableImage from "./dragmove"; // Import the new component
import { CloseIcon, MessageIcon2 } from "@/components/svgs";
interface ProductAI {
  img_url: string | null;
  remove_bg_toggle: boolean;
  user_prompt: string;
  favorites_bg_toggle: boolean;
  numOfImages: number;
}

interface HistoryProps {
  id: string;
  doc_name: string;
  doc_type: string;
  img_url: string;
  updatedAt: string;
}

type LikedImages = { [key: string]: boolean };

export default function Home() {
  const [fileUploadLoading, setFileUploadLoading] = useState(false);
  const [history, setHistory] = useState<HistoryProps[]>([]);
  const [historyLoading, setHistoryLoading] = useState<boolean>(false);
  const [likedImages, setLikedImages] = useState<LikedImages>({});
  const [numOfImages, setNumOfImages] = useState(1);
  const [result, setResult] = useState<string[] | null>(null);
  const [finalUrl, setFinalUrl] = useState<string[]>([]);
  const [scale, setScale] = useState<string>("");
  const [normalizedPosition, setNormalizedPosition] = useState({
    x: 0.1,
    y: 0.1,
  });
  const [normalizedScale, setNormalizedScale] = useState("0.10");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [favImage, setFavImage] = useState<boolean>(false);
  const [productAI, setProductAI] = useState<ProductAI>({
    img_url: null,
    remove_bg_toggle: false,
    user_prompt: "",
    favorites_bg_toggle: false,
    numOfImages: numOfImages | 1
  });
  const initialProductAI: ProductAI = {
    img_url: null,
    remove_bg_toggle: false,
    user_prompt: "",
    favorites_bg_toggle: false,
    numOfImages: numOfImages | 1
  };
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    try {
      const response = await instance.get(
        `${API_URL}/users/api/v1/docs?page=1&limit=10&category=image&favourite=${favImage}`
      );
      const data = response.data.data.docs.map((item: any) => ({
        id: item._id,
        favourite: item.favourite,
        doc_name: item.doc_name,
        doc_type: item.doc_type,
        img_url: item.doc_content.img_url,
        updatedAt: item.updatedAt,
      }));
      setHistory(data);
    } catch (error) {
      console.error("Error fetching history:", error);
      toast.error("Failed to fetch history");
    }
  };
  const updateFavourite = async (imageID: any, booleanValue: boolean) => {
    try {
      const response = await instance.put(
        `${API_URL}/users/api/v1/docs/${imageID.id}`,
        { favourite: booleanValue ? false : true }
      );
    } catch (error) {
      console.error("Error fetching history:", error);
      toast.error("Failed to fetch history");
    } finally {
      fetchHistory();
    }
  };
  const handleSubmit = async (event: React.FormEvent) => {
    console.log("wqertyuiop");

    event.preventDefault();

    const { img_url, user_prompt, remove_bg_toggle, numOfImages } = productAI;
    console.log(
      "img_url, user_prompt, remove_bg_toggle, numOfImages",
      img_url,
      user_prompt,
      remove_bg_toggle,
      numOfImages
    );
    // Log the normalized position and scale in the submit function
    console.log("Normalized Position:", normalizedPosition);
    console.log("Normalized Scale:", normalizedScale);

    if (!img_url) {
      toast.error("Please upload an image.");
      return;
    }

    if (!user_prompt && !remove_bg_toggle) {
      toast.error("Provide a prompt or enable 'Remove background'.");
      return;
    }

    try {
      setLoading(true);
      const response = await instance.post(
        `${API_URL}/ai/api/v1/products/bg-remover`,
        {
          img_url,
          user_prompt,
          remove_bg_toggle,
          numOfImages,
          normalizedPosition, // Send normalized position
          normalizedScale, // Send normalized scale
        }
      );

      const result_url = response.data.data.originalUrls;

      if (result_url) {
        setResult(result_url);
        setFinalUrl(result_url);
      }
      fetchHistory();
      setLoading(false);
    } catch (error) {
      console.error("Error removing background:", error);
      setLoading(false);
      toast.error("Failed to process image");
    }
  };
  const handleDownload = async (image: any) => {
    try {
      setLoading(true);

      // Replace with your own image or API endpoint
      const response = await fetch(image);
      console.log("response", response);

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `GrowStackAIBackdrop.png`; // You can adjust the file name as needed
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
  useEffect(() => {
    fetchHistory();
  }, [favImage]);
  const handleNumOfImagesChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    productAI.numOfImages = Number(event.target.value);
    setNumOfImages(Number(event.target.value));
  };

  const handleLikeDislike = (imageId: any) => {
    setLikedImages(prevState => ({
      ...prevState,
      [imageId]: !prevState[imageId],
    }));
  };

  const handleSwitchChange = () => {
    setProductAI(prevState => ({
      ...prevState,
      remove_bg_toggle: !prevState.remove_bg_toggle,
    }));
  };

  const handleFavoritesSwitchChange = () => {
    setFavImage(favImage ? false : true);
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProductAI(prev => ({ ...prev, user_prompt: e.target.value }));
  };

  const clearImg = () => {
    setProductAI(prev => ({
      ...prev,
      img_url: null,
      remove_bg_toggle: false,
      user_prompt: "",
      favorites_bg_toggle: false,
      numOfImages: 1,
    }));
    setNumOfImages(1);
  };

  const onFileDrop = async (acceptedFiles: File[]) => {
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

  const examples = [
    {
      label: "Beach",
      description: "A sunny beach with soft waves and a blue sky.",
      image: "/assets/AIBeachSkyImage.png",
    },
    {
      label: "Coffee Shop",
      description: "A cozy coffee shop with soft lighting.",
      image: "/assets/AICoffeeShopImage.png",
    },
    {
      label: "Forest",
      description: "A lush forest with tall trees and sunlight.",
      image: "/assets/AIForestImage.png",
    },
  ];

  const handleExampleClick = (exampleDescription: string) => {
    setProductAI(prevState => ({
      ...prevState,
      user_prompt: exampleDescription,
    }));
  };
  const toggleImageSelection = (image: string) => {
    setSelectedImages(prevSelected => {
      if (prevSelected.includes(image)) {
        return prevSelected.filter(img => img !== image);
      } else {
        return [...prevSelected, image];
      }
    });
  };
  const filteredImages = productAI.favorites_bg_toggle
    ? (result?.filter(image => likedImages[image]) ?? [])
    : result;

  return (
    <div className="flex justify-between h-screen">
      {/* Left Sidebar */}
      <aside
        className="bg-white border-r border-gray-200 overflow-y-auto max-h-screen"
        style={{ borderRadius: "20px" }}
      >
        <div className="m-2">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <h2 className="text-m sm:text-lg font-semibold">
                Generate from text
              </h2>
              <h5 className="text-sx sx:text-base mt-2">
                Place your image on the canvas.
              </h5>
              <div>
                {/* Image Preview */}
                {productAI.img_url ? (
                  <ResizableRotatableImage
                    img_url={productAI.img_url}
                    setNormalizedPosition={setNormalizedPosition}
                    setNormalizedScale={setNormalizedScale}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <div
                    className="w-[100%] flex justify-center items-center text-gray-500"
                    style={{
                      height: "300px", // Fixed height for consistency
                      border: "2px solid #ccc",
                      objectFit: "cover", // Adjusts the image to cover the area without overflow
                      borderRadius: "10px", // Optional: Gives a rounded look to the card
                      backgroundImage:
                        "url(https://handypdf.com/resources/formfile/htmls/10003/free-graph-paper-01/bg1.png)",
                      backgroundSize: "contain", // Ensures the background fits within the card
                    }}
                  >
                    No image uploaded
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="pb-2 pt-4 text-sx sx:text-base">
                <p>Describe the scene around your product</p>
              </div>
              <textarea
                className="w-full p-2 text-sm sm:text-base border border-gray-300 rounded-lg"
                placeholder="Describe the scene around your product..."
                value={productAI.user_prompt}
                onChange={handlePromptChange}
              />
            </div>
            <div>
              <div className="text-md sm:text-m mb-2 mt-2">Try an example</div>
              <div className="grid grid-cols-3 gap-2">
                {/* Map through examples */}
                {examples.map((example, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 h-24 cursor-pointer flex justify-center items-center"
                    onClick={() => handleExampleClick(example.description)}
                  >
                    <img src={example.image} className="w-[100%] h-[100%]" />
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <div className="mt-4 flex  space-x-4">
                <label className="block text-sm sm:text-base mb-2">
                  Images to generate:
                </label>
                <select
                  className="p-2 text-sm sm:text-base border border-gray-300 rounded-lg mb-4"
                  value={numOfImages}
                  onChange={handleNumOfImagesChange}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="text-[16px] w-full h-12 flex justify-center items-center bg-primary-green text-white rounded-xl"
              >
                {loading ? <Spinner /> : "Generate Image(s)"}
              </button>
            </div>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col">
        <div className="flex flex-col h-full">
          <div className="flex flex-col items-center mx-4">
            <section className="">
              {finalUrl.length > 0 ? (
                <>
                  <div>
                    <div
                      className="grid grid-cols-2 gap-2"
                      style={{ width: "100%", height: "500px" }}
                    >
                      {finalUrl.map(image => (
                        <div
                        // key={image}
                        // className={`relative group border-2 p-1 cursor-pointer ${
                        //   selectedImages.includes(image)
                        //     ? "border-blue-500"
                        //     : "border-transparent"
                        // }`}
                        // onClick={() => toggleImageSelection(image)}
                        >
                          <img
                            className="w-[300px] h-[300px] object-cover"
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
                      {/* {selectedImages.length === 0 && (
                        <p className="text-red-500 mb-2 mr-4">
                          Please select at least one image to download.
                        </p>
                      )} */}

                      {/* Buttons */}
                      <div className="flex">
                        <button
                          onClick={() => {
                            setResult(null);
                            setProductAI(initialProductAI);
                            setSelectedImages([]);
                            setSelectedImages([]);
                            setFinalUrl([]); // Clear selections on reset
                            setNumOfImages(1);
                            productAI.user_prompt = ""
                          }}
                          className="text-base bg-white text-red-500 border border-red-500 px-5 py-2 mr-4"
                          type="button"
                        >
                          Upload another
                        </button>
                        {/* <button
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
                        </button> */}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="relative z-[1] flex-1 flex flex-col justify-between  bg-white rounded-lg shadow-md w-full max-w-md sm:max-w-lg lg:max-w-xl h-auto">
                  {/* Upload Section */}
                  <div className="p-4 ">
                    <div className="flex flex-col items-center ">
                      {fileUploadLoading ? (
                        <div className="h-[200px] w-full flex justify-center items-center border border-gray-200 rounded-xl">
                          <Spinner color="black" size={35} />
                        </div>
                      ) : productAI.img_url ? (
                        <>
                          <div className="h-[150px] w-full border border-gray-200 rounded-xl">
                            <img
                              src={productAI.img_url}
                              alt="Uploaded Preview"
                              className="w-full h-full object-contain"
                            />
                          </div>

                          <div className="flex justify-end ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 cursor-pointer"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              onClick={clearImg}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </div>

                        </>
                      ) : (
                        <div style={{ height: "200px" }}>
                          <Dropzone onFileDrop={onFileDrop} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Remove Background Section */}
                  <div className="border-t border-gray-300 flex items-center justify-between w-full mt-2">
                    <div className="space-y-1 m-4">
                      <h1 className="text-sm sm:text-m mt-2 font-semibold">
                        Remove background
                      </h1>
                      <p className="text-gray-500 text-xs sm:text-sm">
                        Product images with transparent backgrounds give the
                        best results
                      </p>
                    </div>
                    <Switch
                      className="mr-4"
                      checked={productAI.remove_bg_toggle}
                      onCheckedChange={handleSwitchChange}
                    />
                  </div>
                </div>
              )}
            </section>

            {/* Sample Images Section */}
            {finalUrl.length < 1 && (
              <div className="text-center mt-5">
                <p className="text-gray-600">
                  Or you can try with these photos
                </p>
                <div className="flex justify-center gap-4 mt-4">
                  {[
                    "https://growstackai.s3.amazonaws.com/FRfth7/aiBackgroundBag.png.png",
                    "https://growstackai.s3.amazonaws.com/pJlDeg/aiBackgroundShoe.png.png",
                    "https://growstackai.s3.amazonaws.com/Vh0h8c/aibackgroundChair.png.png",
                  ].map((filename, index) => (
                    <img
                      key={index}
                      src={filename}
                      alt={`Sample Image ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-200 cursor-pointer"
                      onClick={() =>
                        setProductAI(prevState => ({
                          ...prevState,
                          img_url: filename,
                        }))
                      }
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <aside
        className="w-1/4 p-4 bg-white border-l border-gray-200 overflow-y-auto max-h-screen"
        style={{ borderRadius: "20px" }}
      >
        <h2 className="text-lg sm:text-m font-semibold mb-4">Creations</h2>

        <div className="mb-4">
          {/* Upload Image Button */}
          <div
            className="mb-6 flex justify-center items-center"
            style={{ width: "100%", height: "80px" }}
          >
            <label
              htmlFor="imageUpload"
              className="flex items-center justify-center w-full h-full border border-gray-400 rounded-lg text-gray-600 cursor-pointer hover:bg-gray-100 transition"
            >
              Upload new image
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={e => {
                const files = e.target.files;
                if (files) {
                  onFileDrop(Array.from(files));
                }
              }}
              className="hidden"
            />
          </div>
        </div>

        <div className="flex items-center  mb-2">
          <Switch
            checked={favImage}
            onCheckedChange={handleFavoritesSwitchChange}
          />
          <span className="text-sm sx:text-base font-semibold ml-2">
            Favorites only
          </span>
        </div>

        {historyLoading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : history.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 h-[90%]">
            {history.map((image: any) => (
              <div
                key={image.id}
                className="relative bg-gray-200 rounded shadow-md overflow-hidden"
              >
                {/* Display Image */}
                <img
                  src={image.img_url}
                  alt={image.doc_name || "Saved Image"}
                  className="w-full h-36 object-cover"
                />

                {/* Like/Dislike Button */}
                <button
                  className={`absolute top-2 left-2 p-1 rounded-full shadow-md transition-colors duration-200 ${image.favourite ? "text-red-500" : "text-gray-500"
                    } hover:bg-gray-100`}
                  onClick={() => updateFavourite(image, image.favourite)}
                  aria-label={`${likedImages[image.id] ? "Unlike" : "Like"} image with ID ${image.id}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={image.favourite ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                </button>

                {/* Download Tooltip */}
                <div className="absolute bottom-2 right-2">
                  <button
                    className="p-2 rounded-full hover:bg-gray-100 transition"
                    onClick={() => handleDownload(image.img_url)}
                    aria-label="Download image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6 text-gray-600"
                    >
                      <path d="M5 20h14a1 1 0 001-1v-4h-2v3H6v-3H4v4a1 1 0 001 1zm7-3l-5-5h3V4h4v8h3l-5 5z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No images found.</p>
        )}
      </aside>
    </div>
  );
}
