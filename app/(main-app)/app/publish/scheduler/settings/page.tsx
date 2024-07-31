"use client";

import { Fragment, useState } from "react";
import BloggerSection from "./sections/BloggerSection";
import FacebookSection from "./sections/FacebookSection";
import GeneralSection from "./sections/GeneralSection";
import GoogleSection from "./sections/GoogleSection";
import InstagramSection from "./sections/InstagramSection";
import LinkedInSection from "./sections/LinkedInSection";
import PinterestSection from "./sections/PinterestSection";
import RedditSection from "./sections/RedditSection";
import TumblrSection from "./sections/TumblrSection";
import TwitterSection from "./sections/TwitterSection";
import { API_URL } from "@/lib/api";
import instance from "@/config/axios.config";
import toast from "react-hot-toast";

export default function page() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  // const tabs = ["General", "Facebook", "Twitter", "Linkedin", "Tumblr", "Pinterest", "GMB", "Reddit", "Instagram", "Blogger"];
  const tabs = ["Facebook", "Twitter", "Linkedin", "Instagram"];
  const [tabName, setTabName] = useState("Facebook");
  const [messagingActive, setMessagingActive] = useState(false);

  const handleOnConnect = async () => {
    try {
      const response = await instance.get(API_URL + '/users/api/v1/social-media/connect');
      console.log('response', response)
      const url = response?.data.data
      if (url) {
        window.location.href = url;
      }
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }

  const renderContent = () => {
    switch (selectedTabIndex) {
      // case 0:
      //   return <GeneralSection />;
      case 0:
        return <FacebookSection setMessagingActive={setMessagingActive} handleOnConnect={handleOnConnect} />;
      case 1:
        return <TwitterSection setMessagingActive={setMessagingActive} handleOnConnect={handleOnConnect} />;
      case 2:
        return <LinkedInSection setMessagingActive={setMessagingActive} handleOnConnect={handleOnConnect} />;
      case 3:
        return <InstagramSection setMessagingActive={setMessagingActive} handleOnConnect={handleOnConnect} />;
      // case 5:
      //   return <TumblrSection />;
      // case 6:
      //   return <PinterestSection />;
      // case 7:
      //   return <GoogleSection />;
      // case 8:
      //   return <RedditSection />;
      // case 9:
      //   return <BloggerSection />;
    }
  };

  const handleAdd = async () => {
    // setIsPending(true);
    try {
      const response = await instance.patch(
        API_URL + `/users/api/v1/social-media/profile/${tabName}`,
        {
          messagingActive,
        }
      );

      toast.success(response.data.message);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error("Profile Upa]date failed:", error);
    } finally {
      // setIsPending(false);
    }
  };

  return (
    <Fragment>
      <main>
        <div className="flex justify-between items-center mt-8">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">Scheduler</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[16px]">
              Settings{" "}
            </p>
          </div>
        </div>
        <section>
          <div className="settings-inset-border translate-y-10 max-w-[1320px] mx-auto bg-[#FBFBFB] p-3 rounded-2xl">
            <div className="w-full flex relative">
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  className={`w-full h-[45px] flex gap-x-2 justify-center items-center relative cursor-pointer z-[1] transition-all duration-500 whitespace-nowrap ${
                    selectedTabIndex === index
                      ? "!text-white"
                      : "!text-primary-grey"
                  }`}
                  onClick={() => {
                    const totalTabs = tabs.length;
                    const percentage = (index / totalTabs) * 100;
                    setSelectedTabIndex(index);
                    setTabUnderlineLeft(percentage);
                    setTabName(tab);
                    setMessagingActive(false);
                  }}
                >
                  {tab}
                </div>
              ))}
              <div
                className="absolute bottom-0 h-[45px] bg-primary-green custom-transition rounded-lg"
                style={{
                  left: `calc(${tabUnderlineLeft}%)`,
                  width: `${100 / tabs.length}%`,
                }}
              ></div>
            </div>
          </div>
          <div className="bg-white rounded-3xl border border-[#EDEFF0] pb-10 px-20 pt-16">
            {renderContent()}
            <div className="flex justify-end gap-4 mt-10">
              <button
                className="py-3.5 px-4 w-full max-w-[120px] bg-primary-green sheen rounded-xl text-white"
                onClick={handleAdd}
              >
                Add
              </button>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
}
