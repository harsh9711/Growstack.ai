"use client";

import React, { Fragment, useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Plus, XCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { BsQuestion } from "react-icons/bs";
import QuickPostsTable from "./components/QuickPostsTable";
import ScheduledPostsTable from "./components/ScheduledPostsTable";
import { API_URL } from "@/lib/api";
import { ChangeEvent } from "react";
import instance from "@/config/axios.config";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";

export default function QuickPosting() {
  const router = useRouter();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const [content, setContent] = useState("");
  const [selectedRadioValue, setSelectedRadioValue] = useState<string>("Image");
  const [mediaUrls, setMediaUrls] = useState<any[]>([]);
  const [isVideo, setIsVideo] = useState(false);
  const [scheduleDate, setScheduleDate] = useState<string>("");
  const [selectedNetworks, setSelectedNetworks] = React.useState<string[]>([]);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const tabs = ["Published", "Scheduled"];
  const [minDateTime, setMinDateTime] = useState('');
  const renderContent = (selectedTabIndex: number) => {
    switch (selectedTabIndex) {
      case 0:
        return <QuickPostsTable />;
      case 1:
        return <ScheduledPostsTable />;
    }
  };

  const handleGetProfileData = async () => {
    try {
      setLoading(true)
      const response = (await instance.get(
        `${API_URL}/users/api/v1/social-media/profile`
      )).data;
      if (!response.success || response.data?.activeSocialAccounts.length === 0) {
        router.push("/app/publish/scheduler/quick-posting/profiles");
      }
    } catch (error) {
      console.log("Error fetching social profile:", error);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    handleGetProfileData();
  }, []);


  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setMinDateTime(`${year}-${month}-${day}`);
  }, []);
  const handleValueChange = (value: string) => {
    setSelectedRadioValue(value);
    if (value === "Image") setIsVideo(false);
    if (value === "Video") {
      setIsVideo(true);
      setMediaUrls([]);
    }
  };

  useEffect(() => {
    const storedArticle = localStorage.getItem("savedArticle");
    const savedArticleImg = localStorage.getItem("savArticalImg");
    if (storedArticle) {
      try {
        const parsedArticle:any = storedArticle;
        setLink(parsedArticle);
      } catch (error) {
        console.error("Error parsing savedArticle:", error);
      }
    }

    if (savedArticleImg) {
      try {
        const parsedArticleImg:any = savedArticleImg;
        setMediaUrls((prevData: any) => [...prevData, parsedArticleImg]);
      } catch (error) {
        console.error("Error parsing savedArticleImg:", error);
      }
    }
    return () => {
      localStorage.removeItem("savedArticle");
      localStorage.removeItem("savArticalImg");
    };
  }, []);


  const handleBrowsImgAndVideo = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const fileInput = event.target;
    const file = fileInput.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("document", file);
      try {
        const response = await instance.post(
          `${API_URL}/users/api/v1/file/upload`,
          formData
        );
        setMediaUrls((prevData: any) => [
          ...prevData,
          response.data.data.fileUrl,
        ]);
      } catch (error) {
        toast.error("Error uploading image and video");
      } finally {
        fileInput.value = "";
      }
    }
  };

  const handlePublish = async () => {
    setLoading(true);
    let utcDateTime = null;
    try {
      const requestData: any = {
        post: content + " " + link,
        platforms: selectedNetworks,
        mediaUrls,
        isVideo,
      };
      requestData.scheduleDate = scheduleDate;

      const response = await instance.post(
        API_URL + "/users/api/v1/social-media/quickpost",
        requestData
      );
      setContent("");
      setIsVideo(false);
      setMediaUrls([]);
      setScheduleDate(""), setSelectedNetworks([]);
      setLink("");
      toast.success(response.data.message);
    } catch (error: any) {
      setSelectedNetworks([]);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error("Profile Update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchChange = (network: string, isChecked: boolean) => {
    setSelectedNetworks((prevState) => {
      if (isChecked) {
        return [...prevState, network];
      } else {
        return prevState.filter((item) => item !== network);
      }
    });
  };

  const handleRemoveMediaUrls = (index: number) => {
    setMediaUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  console.log(mediaUrls)

  return (
    <Fragment>
      {loading ? (
        <div className="flex-1 h-full flex flex-col gap-5 justify-center items-center">
          <Spinner color="black" size={100} />
          Loading...
        </div>
      ) : (
        <div className="flex flex-col h-full flex-1">
          <div className="mt-8">
            <div className="space-y-2 w-full">
              <h1 className="text-2xl font-semibold">Scheduler</h1>
              <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
                Quick posting{" "}
              </p>
            </div>
          </div>
          <div className="flex gap-6 w-full">
            <div className="w-full">
              <section className="w-full bg-white rounded-3xl border border-[#EDEFF0] px-10 py-6 mt-6">
                <h1 className="text-xl font-semibold border-b border-primary-black/10 pb-4">
                  Custom message
                </h1>
                <div className="space-y-3 w-full mt-6">
                  <label className="font-medium">
                    Add content <span className="text-[#F00]">*</span>
                  </label>
                  <textarea
                    placeholder="write something here..."
                    className="h-[129px] w-full bg-[#F2F2F2] rounded-2xl p-3 resize-none"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
              </section>
              <section className="w-full bg-white rounded-3xl border border-[#EDEFF0] px-10 py-6 mt-6">
                <h1 className="text-xl font-semibold border-b border-primary-black/10 pb-4">
                  Enable image / video for posting
                </h1>
                <div className="w-full flex justify-between mt-6">
                  <RadioGroup
                    value={selectedRadioValue}
                    onValueChange={handleValueChange}
                    className="w-full flex items-center max-w-[300px]"
                  >
                    <div className="flex space-x-2 w-full">
                      <RadioGroupItem value="Image" id="r1" />
                      <label htmlFor="r1">Image</label>
                    </div>
                    <div className="flex space-x-2 w-full">
                      <RadioGroupItem value="Video" id="r2" />
                      <label htmlFor="r2">Video</label>
                    </div>
                  </RadioGroup>
                  <label
                    htmlFor="profile-image"
                    className="h-12 w-full max-w-[180px] bg-primary-green py-3 px-4 sheen flex justify-center items-center gap-3 rounded-xl text-white cursor-pointer"
                  >
                    <Plus size={20} />
                    <span className="font-medium">Browse...</span>
                    <input
                      type="file"
                      id="profile-image"
                      accept="image/*,video/*"
                      className="hidden"
                      onChange={handleBrowsImgAndVideo}
                    />
                  </label>
                </div>
                <div className="flex gap-2">
                  {mediaUrls.length > 0 &&
                    mediaUrls?.map((img: any, index: number) => {
                      return (
                        <div className="w-16 h-16 rounded-md ">
                          <div
                            className=" absolute ml-12"
                            style={{ marginTop: 0, cursor: "pointer" }}
                            onClick={() => handleRemoveMediaUrls(index)}
                          >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="10" cy="10" r="10" fill="#FF0000" />
                              <path d="M6.3 13.9001L13.6142 6.58586" stroke="white" stroke-width="2.28571" stroke-linecap="round" stroke-linejoin="round" />
                              <path d="M6.30426 6.30414L13.6546 13.6545" stroke="white" stroke-width="2.28571" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                          </div>
                          <img
                            src={img}
                            alt="img"
                            className="h-full w-full object-cover rounded-md"
                          />
                        </div>
                      );
                    })}
                </div>
              </section>
              <section className="w-full bg-white rounded-3xl border border-[#EDEFF0] px-10 py-6 mt-6">
                <h1 className="text-xl font-semibold border-b border-primary-black/10 pb-4">
                  Link
                </h1>
                <div className="w-full flex justify-between mt-6">
                  <div className="space-y-3 w-full">
                    <label className="flex items-center gap-1 w-1/5 min-w-[400px] font-medium">
                      Link{" "}
                    </label>{" "}
                    <Input
                      type="text"
                      placeholder="Content share link"
                      className="w-full rounded-full"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                    />
                  </div>
                </div>
              </section>
              <section className="w-full bg-white rounded-3xl border border-[#EDEFF0] px-10 py-6 mt-6">
                <h1 className="text-xl font-semibold border-b border-primary-black/10 pb-4">
                  Networks
                </h1>
                <div className="w-full flex justify-between mt-6 pb-6 border-b border-[#EDEFF0]">
                  <label className="font-medium">Facebook</label>
                  <Switch
                    onCheckedChange={(checked) =>
                      handleSwitchChange("facebook", checked)
                    }
                  />
                </div>
                <div className="w-full flex justify-between mt-6 pb-6 border-b border-[#EDEFF0]">
                  <label className="font-medium">Twitter</label>
                  <Switch
                    onCheckedChange={(checked) =>
                      handleSwitchChange("twitter", checked)
                    }
                  />
                </div>
                <div className="w-full flex justify-between mt-6 pb-6 border-b border-[#EDEFF0]">
                  <label className="font-medium">LinkedIn</label>
                  <Switch
                    onCheckedChange={(checked) =>
                      handleSwitchChange("linkedin", checked)
                    }
                  />
                </div>
                <div className="w-full flex justify-between mt-6 pb-6 border-b border-[#EDEFF0]">
                  <label className="font-medium">Instagram</label>
                  <Switch
                    onCheckedChange={(checked) =>
                      handleSwitchChange("instagram", checked)
                    }
                  />
                </div>
              </section>

              <section className="w-full bg-white rounded-3xl border border-[#EDEFF0] px-10 py-6 mt-6">
                <h1 className="text-xl font-semibold border-b border-primary-black/10 pb-4 flex items-center gap-1">
                  Schedule global{" "}
                  <BsQuestion size={24} className="text-primary-green" />
                </h1>
                <div className="w-full flex justify-between mt-6">
                  <div className="space-y-3 w-full">
                    <label className="flex items-center gap-1 w-1/5 min-w-[400px] font-medium">
                      Schedule Date{" "}
                    </label>{" "}
                    <div className="flex gap-4">
                      <div
                        className="flex gap-2 items-center h-14 w-full rounded-full bg-[#F5F5F5] px-4 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm
                    file:font-medium placeholder:text-gray-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="9"
                            stroke="#034737"
                            stroke-width="1.75"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M12 7V12L15 15"
                            stroke="#034737"
                            stroke-width="1.75"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <input
                          type="date"
                          className="w-full bg-transparent outline-none"
                          value={scheduleDate}
                          onChange={(e) => setScheduleDate(e.target.value)}
                          min={minDateTime}
                        />
                      </div>
                      <button
                        onClick={handlePublish}
                        className="h-14 w-full max-w-[140px] bg-primary-green py-3 px-4 sheen flex justify-center items-center gap-3 rounded-xl text-white cursor-pointer"
                      >
                        Publish
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="w-full">
              <section className="w-full bg-white rounded-3xl border border-[#EDEFF0] px-10 py-6 mt-6">
                <div className="w-full flex relative mb-5">
                  {tabs.map((tab, index) => (
                    <div
                      key={index}
                      className={`w-full h-[48px] flex gap-x-2 justify-center items-center relative cursor-pointer z-[1] transition-all duration-500 ${selectedTabIndex === index
                          ? "!text-white"
                          : "!text-primary-grey"
                        }`}
                      onClick={() => {
                        const totalTabs = tabs.length;
                        const percentage = (index / totalTabs) * 100;
                        setSelectedTabIndex(index);
                        setTabUnderlineLeft(percentage);
                      }}
                    >
                      {tab}
                    </div>
                  ))}
                  <div
                    className="absolute bottom-0 h-[48px] bg-primary-green custom-transition rounded-lg"
                    style={{
                      left: `calc(${tabUnderlineLeft}%)`,
                      width: `${100 / tabs.length}%`,
                    }}
                  ></div>
                </div>
                {renderContent(selectedTabIndex)}
              </section>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
